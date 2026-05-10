# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (Vite, hot reload)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Deploy is automatic on Vercel on push to main. No CI, no tests.

## Architecture

**Single-file app** — nearly all code lives in `src/App.jsx` (~300 KB). There is no component split, no routing library, no CSS files.

### Data layer (top of App.jsx)

All content is hardcoded as `const` arrays/objects:

| Constant | Content |
|---|---|
| `SURAHS` | 15+ surahs — each verse is `[arabic, phonetic, french]` |
| `NAMES` | 99 Names of Allah with descriptions |
| `DHIKR` / `ROUTINES` | Dhikr formulas and morning/evening routines |
| `DOUA_GENERAL`, `DOUA_PROPHETS`, `DOUA_QUOTIDIEN` | Invocation collections |
| `SAHABA` | Companions of the Prophet profiles |
| `HADITHS_AKHIRAH`, `HADITHS_IMPORTANTS` | Hadith collections |

### UI layer (bottom of App.jsx)

**Theme:** a single `const C = {...}` object holds all colors. Dark green (`#063a23`) + gold (`#c9a876`) palette. All styling is inline — no CSS files, no utility classes.

**Reusable primitives:** `Card`, `Tab`, `SubTab`, `ArabicLine`, `SectionHeader`, `Ornament`, `ImageBanner`.

**SVG scenes:** `HaramScene`, `NabawiScene`, `KaabaScene` — inline SVG illustrations used in header banners.

**Main component state (App):**
- `tab` — active top-level tab (one of 8 values below)
- `coursTab`, `dhikrTab`, `douaTab` — sub-tab within each section
- `openSurah`, `surahAutoPlay`, `reciter` — surah audio player state
- `prayerTimes`, `prayerCoords`, `prayerMethod` — prayer times from API
- `allCounts` — tasbih counters (persisted in localStorage)
- `calYear`, `calSelectedDate` — Hijri calendar state

### 8 tabs

`sourates` · `noms` · `dhikr` · `doua` · `cours` · `compteur` · `prieres` · `calendrier`

### External APIs

- **everyayah.com** — Quran audio per reciter (`/{reciter}/{surahNum}.mp3`)
- **api.aladhan.com** — Prayer times by GPS coords + calculation method
- **api.bigdatacloud.net** — Reverse geocoding (city name from coords)

### PWA / Service Worker

`public/sw.js` handles scheduled adhan push notifications. Communication via `navigator.serviceWorker.controller.postMessage()` with message types: `SCHEDULE_PRAYERS`, `CLEAR_SCHEDULE`, `TEST_NOTIFICATION`, `PING`.

## Key conventions

- **No TypeScript, no tests, no linter config** — keep changes consistent with existing JSX style.
- Adding content (new surah, doua, hadith) = add an object to the relevant `const` array at the top of `App.jsx`.
- Adding a new tab = add to the `tabs` array near line 4298 and add a conditional render block in the return.
- Never split into multiple files unless explicitly asked — the single-file constraint is intentional.
