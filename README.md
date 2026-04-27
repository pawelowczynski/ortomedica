# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Steam macOS compatibility research script

This repository now includes a Python helper script to estimate macOS support for Top Steam games:

```sh
python ./scripts/steam-macos-compatibility.py --limit 500 --delay 1.0 --output steam_top500_macos.csv
```

What it does:
- Downloads SteamSpy `all` dataset and selects Top N games by current CCU.
- Calls Steam Store API (`appdetails`) for each AppID.
- Saves CSV with AppID, names, CCU, macOS support flag, and request status.

Useful options:
- `--limit 500` Number of games to analyze.
- `--delay 1.0` Delay between Store API calls (seconds).
- `--timeout 20` Per-request timeout.
- `--retries 3` Retry count for failed calls.
- `--output steam_top500_macos.csv` Output CSV path.
