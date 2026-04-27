#!/usr/bin/env python3
"""
Build a Top-N Steam games list and check macOS compatibility.

Data sources:
- SteamSpy: top candidates sorted by current CCU
- Steam Store API: per-app platform support (platforms.mac)
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Any


STEAMSPY_ALL_URL = "https://steamspy.com/api.php?request=all"
STEAM_APPDETAILS_URL = "https://store.steampowered.com/api/appdetails"
DEFAULT_HEADERS = {
    "User-Agent": "orthomedica-steam-macos-research/1.0 (+https://example.com)"
}


@dataclass
class GameResult:
    appid: int
    steamspy_name: str
    store_name: str
    ccu: int
    mac_supported: bool | None
    status: str


def fetch_json(url: str, timeout: float, retries: int, retry_delay: float) -> Any:
    """Fetch JSON with simple retry/backoff."""
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        request = urllib.request.Request(url, headers=DEFAULT_HEADERS)
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                payload = response.read().decode("utf-8")
                return json.loads(payload)
        except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError) as exc:
            last_error = exc
            if attempt < retries:
                time.sleep(retry_delay * attempt)
            else:
                break
    raise RuntimeError(f"Failed to fetch JSON from {url}: {last_error}") from last_error


def get_top_games_from_steamspy(limit: int, timeout: float, retries: int) -> list[tuple[int, str, int]]:
    """Return top games sorted by CCU from SteamSpy 'all' endpoint."""
    data = fetch_json(STEAMSPY_ALL_URL, timeout=timeout, retries=retries, retry_delay=1.0)

    entries: list[tuple[int, str, int]] = []
    for raw_appid, info in data.items():
        try:
            appid = int(raw_appid)
        except (TypeError, ValueError):
            continue

        if not isinstance(info, dict):
            continue

        name = str(info.get("name", "")).strip()
        ccu_raw = info.get("ccu", 0)
        try:
            ccu = int(ccu_raw)
        except (TypeError, ValueError):
            ccu = 0

        entries.append((appid, name, ccu))

    entries.sort(key=lambda x: x[2], reverse=True)
    return entries[:limit]


def fetch_mac_support_for_app(
    appid: int, timeout: float, retries: int
) -> tuple[bool | None, str, str]:
    """
    Fetch platform support for one app.

    Returns:
    - mac_supported: True/False/None (unknown)
    - store_name: name from Store API if available
    - status: ok/not_available/error
    """
    # Do not use "filters=basic" here, because it omits platform metadata.
    params = urllib.parse.urlencode({"appids": appid})
    url = f"{STEAM_APPDETAILS_URL}?{params}"

    try:
        data = fetch_json(url, timeout=timeout, retries=retries, retry_delay=1.0)
    except RuntimeError:
        return None, "", "error"

    app_key = str(appid)
    app_node = data.get(app_key, {})
    if not isinstance(app_node, dict) or not app_node.get("success"):
        return None, "", "not_available"

    app_data = app_node.get("data", {})
    if not isinstance(app_data, dict):
        return None, "", "not_available"

    store_name = str(app_data.get("name", "")).strip()
    platforms = app_data.get("platforms", {})
    if isinstance(platforms, dict):
        mac_supported = bool(platforms.get("mac", False))
        return mac_supported, store_name, "ok"

    return None, store_name, "not_available"


def write_csv(path: str, rows: list[GameResult]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(
            ["rank", "appid", "steamspy_name", "store_name", "ccu", "mac_supported", "status"]
        )
        for idx, row in enumerate(rows, start=1):
            writer.writerow(
                [
                    idx,
                    row.appid,
                    row.steamspy_name,
                    row.store_name,
                    row.ccu,
                    "" if row.mac_supported is None else row.mac_supported,
                    row.status,
                ]
            )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check macOS compatibility for Top-N Steam games by SteamSpy CCU."
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=500,
        help="How many top games to analyze (default: 500).",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Delay in seconds between Steam Store API calls (default: 1.0).",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=20.0,
        help="HTTP timeout in seconds per request (default: 20).",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=3,
        help="Number of retries for failed requests (default: 3).",
    )
    parser.add_argument(
        "--output",
        default="steam_top_games_macos.csv",
        help="Output CSV path (default: steam_top_games_macos.csv).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.limit <= 0:
        print("Error: --limit must be > 0", file=sys.stderr)
        return 1
    if args.delay < 0:
        print("Error: --delay must be >= 0", file=sys.stderr)
        return 1
    if args.retries <= 0:
        print("Error: --retries must be > 0", file=sys.stderr)
        return 1

    print(f"Downloading SteamSpy dataset and selecting top {args.limit} by CCU...")
    top_games = get_top_games_from_steamspy(args.limit, timeout=args.timeout, retries=args.retries)
    print(f"Selected {len(top_games)} games.")

    results: list[GameResult] = []
    for index, (appid, steamspy_name, ccu) in enumerate(top_games, start=1):
        mac_supported, store_name, status = fetch_mac_support_for_app(
            appid, timeout=args.timeout, retries=args.retries
        )
        results.append(
            GameResult(
                appid=appid,
                steamspy_name=steamspy_name,
                store_name=store_name,
                ccu=ccu,
                mac_supported=mac_supported,
                status=status,
            )
        )

        if index % 25 == 0 or index == len(top_games):
            print(f"Processed {index}/{len(top_games)}")

        if index < len(top_games) and args.delay > 0:
            time.sleep(args.delay)

    write_csv(args.output, results)

    valid = [r for r in results if r.mac_supported is not None]
    mac_true = sum(1 for r in valid if r.mac_supported)
    mac_pct = (mac_true / len(valid) * 100.0) if valid else 0.0
    unknown = len(results) - len(valid)

    print("")
    print(f"Saved report to: {args.output}")
    print(f"Checked games: {len(results)}")
    print(f"Games with known platform data: {len(valid)}")
    print(f"macOS supported: {mac_true} ({mac_pct:.2f}%)")
    print(f"Unknown / unavailable in Store API: {unknown}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
