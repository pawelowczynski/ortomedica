/**
 * Pobiera opinie z Google Places API (Place Details New).
 *
 * Wymaga w Google Cloud:
 * - włączonego rozliczenia (karta),
 * - włączonego API: Places API (New),
 * - klucza API z ograniczeniem do Places API (najlepiej tylko serwer / localhost).
 *
 * Pole `reviews` jest w SKU „Place Details Enterprise + Atmosphere” (płatne).
 * Konto Maps zwykle ma miesięczny kredyt ($200 US — sprawdź aktualnie w dokumentacji);
 * mały ruch na stronie = często mieści się w limicie, ale nie licz na „zero kosztów”.
 *
 * Place ID (np. ChIJ…): https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Użycie:
 *   npm run fetch-reviews
 * (wczytuje .env z katalogu projektu — Node 22+)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
const placeId = process.env.GOOGLE_PLACE_ID?.trim();

if (!apiKey || !placeId) {
  console.error(
    'Brak GOOGLE_PLACES_API_KEY lub GOOGLE_PLACE_ID.\n' +
      'Skopiuj .env.example → .env i uzupełnij zmienne (Place ID w formacie ChIJ…).',
  );
  process.exit(1);
}

const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

const res = await fetch(url, {
  headers: {
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
    'Content-Type': 'application/json',
  },
});

const raw = await res.text();
if (!res.ok) {
  console.error('Places API error:', res.status, raw);
  process.exit(1);
}

const data = JSON.parse(raw);
const reviews = data.reviews || [];

const out = reviews.map((r) => {
  const text = typeof r.text?.text === 'string' ? r.text.text : '';
  const authorLabel = r.authorAttribution?.displayName || 'Użytkownik Google';
  const rating =
    typeof r.rating === 'number' ? Math.min(5, Math.max(1, Math.round(r.rating))) : 5;
  const timeLabel =
    r.relativePublishTimeDescription || (r.publishTime ? String(r.publishTime).slice(0, 10) : undefined);

  return {
    text,
    authorLabel,
    rating,
    timeLabel,
  };
});

const outPath = path.join(root, 'src/data/googleReviews.generated.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`OK: zapisano ${out.length} opinii → ${path.relative(root, outPath)}`);
if (typeof data.userRatingCount === 'number') {
  console.log(`  (średnia ocena miejsca: ${data.rating ?? '?'} / liczba ocen: ${data.userRatingCount})`);
}
