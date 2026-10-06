# Hogwarts Explorer: Your Magical First-Year Guide
An independent, unofficial, magical-school-inspired exploration app with original visuals and affinities (Ember, Grove, Gale, Tide).

## Features
Landing page, 5-question affinity quiz with personalized reveal, interactive castle map (search, filter, zoom, legend, locked/available/visited/discovered/secret states), 9 locations, 5 challenge types (multiple choice, true/false, riddle, matching, knowledge), XP and 5 levels, 8 badges with requirements, discovery journal, hidden secret (a faint glyph near the Courtyard unlocks the Whispering Passage), daily challenge and streak, offline Magical Guide, dashboard with dynamic recommendations, mobile bottom nav.

## Tech stack
React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide, Zustand (persisted to localStorage).

## Run
```
npm install
npm run dev
```
Build: `npm run build` then `npm run preview`.

## Environment variables
None required. All data persists in localStorage (key `hogwarts-explorer-v1`). The Guide runs on a local intent engine, so no API is needed. Supabase is not wired in.

## Demo (3 minutes)
1. Landing: Begin your journey. 2. Take the quiz, reveal your affinity (+20 XP). 3. Map: Great Hall, Explore (+20 XP, First Steps badge). 4. Start challenge, answer, see +25 XP (+30 daily bonus). 5. Explore the Courtyard, then tap the faint glyph at the bottom of the map: Secret discovered (+50 XP), passage appears. 6. Guide: ask "Where should I explore?". 7. Profile: dashboard, badges, journal, next adventure.

## Architecture
`src/data` seed data and rules, `src/store.ts` state, XP, badges and rewards, `src/services/guide.ts` Guide and recommendations, `src/pages` screens, `src/App.tsx` layout, routing and reward overlay.
