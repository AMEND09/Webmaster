# learnai

A sticker-and-zine style AI-literacy site for grades 9–12, built with **Svelte 5 + Vite**. It is a static single-page app with no backend: all progress (XP, medals, badges, detective cases, streak days, name, theme) lives in `localStorage` under the key `learnai:v1`.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ (relative paths, host anywhere)
npm run check    # svelte-check
```

## What's in it

| Route | Screen |
| --- | --- |
| `#/` | Home / landing |
| `#/tour` | Intro slideshow (3 zones, arrow keys work, +50 XP on finish) |
| `#/map` | Skill-tree map, 21 stops; a bronze medal on a quiz unlocks the next stop |
| `#/lessons` | All lessons by zone |
| `#/lesson/:id/:step` | Lesson page (overfitting slider, next-word game, etc.) |
| `#/quiz/:id` | 5-question quiz, bronze 60% / silver 80% / gold 100%, combo counter |
| `#/lab` | Network playground: Network, Convolution and Vectors tabs |
| `#/detective`, `#/detective/:id` | AI Detective case files: flag false claims, check sources, fix the prompt |
| `#/badges` | Sticker book, 24 badges with C / UC / R / E / L rarity, some with hidden triggers |
| `#/me` | Progress dashboard: level, zones, up next, weekly streak, settings, reset |

Light and dark themes follow the OS until the learner picks one (nav toggle or dashboard settings). Below 900px the layout switches to the mobile design with a bottom tab bar.

## Code map

- `src/lib/store.svelte.js`: the persisted state, plus XP, levels, medals, unlocking, streaks and badge awarding
- `src/lib/badges.js`: badge definitions and their unlock rules
- `src/lib/data/lessons.js`, `cases.js`, `zones.js`: all course content
- `src/routes/*`: one component per screen; `src/lib/components/*`: shared pieces and interactive widgets

## Design source

The original Claude Design handoff is kept in `project/` (mockups) and `chats/` (design conversation). Changes from the mockups:
- The League / leaderboard, Prompt Duel and other classmate features were removed because they need a backend.
- The striped illustration placeholders were replaced with simple SVG stand-ins in `src/lib/components/Art.svelte`, to be swapped for the final art.
