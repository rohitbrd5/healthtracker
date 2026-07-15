# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A demo **Health Tracker** single-page app built with React + TypeScript, bundled by Vite, styled with Tailwind CSS, and tested with Vitest. There is **no backend** — all data persists in the browser via `localStorage`. The app tracks daily steps, computes calories burned (4 kcal per 1000 steps), and shows daily + trailing-7-day weekly summaries. It also renders a **daily goal progress** doughnut chart (goal: 5000 steps) whose completed arc changes color with progress.

## Commands

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # Type-check (tsc --noEmit) then production build (vite build)
npm run lint       # ESLint (flat config)
npm run preview    # Preview the production build
npm run test       # Vitest in watch mode
npm run test:run   # Vitest, single run (CI-friendly)
```

Run a subset of tests:
```bash
npx vitest run src/utils/health.test.ts   # by file
npx vitest run -t "calculateCalories"      # by test name
```

Note: `build` and `test` require the dev-only test packages (`jsdom`, `@testing-library/react`, `@testing-library/jest-dom`). If `node_modules` is missing them, run `npm install` first — `npm run dev` works without them.

## Architecture

Entry chain: `index.html` → `src/main.tsx` → `src/App.tsx` (renders dashboard UI). `src/index.css` holds the Tailwind directives and is imported by `main.tsx`.

Business logic is deliberately split from the UI so it stays unit-testable:

- **`src/utils/health.ts`** — pure, framework-free functions and the `StepEntry` type (`{ date: string; steps: number; calories: number }`). Exports `calculateCalories`, `getDateKey`, `getDailyEntries`, `getWeeklyEntries` (inclusive trailing 7-day window), `sumSteps`, `sumCalories`. This is the unit-test surface; no React or DOM imports.
- **`src/services/storage.ts`** — the only module touching `localStorage`. `loadEntries()` / `saveEntries()` read/write the `healthTrackerData` key as a JSON array of `StepEntry`, tolerating missing/corrupt data by returning `[]`.
- **`src/App.tsx`** — owns the single `entries: StepEntry[]` state. On mount it loads from storage; on form submit it appends a new `StepEntry` (date = today's key, calories computed via `calculateCalories`) and persists. Daily/weekly views are derived with the `getDailyEntries` / `getWeeklyEntries` selectors — the component holds no separate totals state. It composes `StepsInput`, `StepsProgressChart`, and `Summary`.
- **`src/components/StepsProgressChart.tsx`** — renders the daily goal doughnut with Chart.js + react-chartjs-2. Exports `STEPS_GOAL = 5000` and `getProgressColor(steps)`. The completed arc fills toward the goal; its color is driven by `dailySteps`:
  - `0–2499` steps → Orange `#F97316`
  - `2500–4999` steps → Yellow `#EAB308`
  - `5000+` steps → Green `#22C55E`
  The remainder is drawn as a gray track (`#E5E7EB`). Register `ArcElement` + `Tooltip` from `chart.js` at module load.
- **`src/components/StepsInput.tsx`** — the steps entry form. Calls `onAddSteps(steps: number)` on submit; owns no app state.
- **`src/components/Summary.tsx`** — presentational daily stat cards (Daily Steps / Calories Burned) and the Weekly Summary card. Receives all values via props.

## Tests

- `src/utils/health.test.ts` — pure unit tests for the logic in `health.ts`.
- `src/components/StepsProgressChart.test.tsx` — unit tests for `getProgressColor` / `STEPS_GOAL` plus a render test (the `Doughnut` is mocked; jsdom has no canvas).
- `src/components/StepsInput.test.tsx` — form submits call `onAddSteps`; invalid input is ignored.
- `src/components/Summary.test.tsx` — daily stat cards and weekly summary render from props.
- `src/App.test.tsx` — component test rendering `App`, exercising the form and asserting localStorage persistence.
- `src/test/setup.ts` — Vitest setup file (imports `@testing-library/jest-dom`); referenced by `vite.config.ts`'s `test.setupFiles`. Vitest runs in the `jsdom` environment with globals enabled.

## Configuration Gotchas

- `package.json` sets `"type": "module"`, so **config files must use ESM** (`export default`). `tailwind.config.js` and `postcss.config.js` are already ESM — do not convert them back to `module.exports`, which would throw under ESM.
- The chart (`StepsProgressChart.tsx`) uses **`chart.js`** and **`react-chartjs-2`**, which are **runtime `dependencies`** (not dev). `npm run dev` needs them; `npm install` installs both.
- The build uses `tsc --noEmit` (not `tsc -b`): the project uses a single non-composite `tsconfig.json` that includes `src` and `vite.config.ts`. Don't re-introduce project references / composite mode unless you also add the matching `tsconfig.*.json` files.
- `tsconfig.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters` — unused imports/vars fail the build.
