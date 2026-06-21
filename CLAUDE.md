# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost)
npm run build     # Build to dist/
npm run preview   # Preview the build locally
npm run deploy    # Build + push to gh-pages branch (manual deploy)
```

No test runner or linter is configured.

## Architecture

Single-file React SPA: all UI logic lives in [src/App.jsx](src/App.jsx). There are no component files — every view (`HomeView`, `GradeMapView`, `TestView`, `ResultView`, `DashboardView`, `CurriculumView`) is a plain function defined in that one file, along with all inline styles in the `STYLES` object and a `CSS` string for class-based hover/state styles. No external UI library.

**Data flow:**
- [src/bank.js](src/bank.js) is the single aggregation point for all question data. It exports `BANK`, a keyed object `{ "5": { label, sub, grammar: [...], vocab: {...} }, "4": ..., "3": ... }`.
- Grammar data lives in [src/data/g5.js](src/data/g5.js), [g4.js](src/data/g4.js), [g3.js](src/data/g3.js) — each exports an array of target objects.
- Vocabulary data lives in [src/data/v5.js](src/data/v5.js), [v4.js](src/data/v4.js), [v3.js](src/data/v3.js) — each exports an object keyed by unit (`v-basic`, `v-adv`).

**State:**
All state is in the root `EikenApp` component. The active view is a string: `"home" | "gradeMap" | "test" | "result" | "dashboard" | "curriculum"`. Learning records are persisted to `localStorage` under key `eiken_targeted_v1` as `{ [question_id]: { attempts, correct, lastWrong, ts } }`.

**Stats computation:**
`grammarStats` and `vocabStats` are `useMemo` maps keyed by `"<grade>|<key>"`. A grammar target is counted as "習得" (mastered) only when `rate >= 0.85` AND `masteredRatio >= 0.8` — the second condition prevents marking mastery based on a small seen sample.

## Data format

Grammar target (in `g*.js`):
```js
{ key: "be-aff", name: "be動詞（肯定）", struct: "主語 + be動詞 + 補語",
  questions: [{ id: "5_be-aff_1", q: "I ___ a student.", choices: [...], ans: 0, exp: "解説" }] }
```

Vocabulary unit (in `v*.js`):
```js
{ "v-basic": { name: "単語・基礎", questions: [...] }, "v-adv": { name: "単語・応用", questions: [...] } }
```

**Question IDs must be globally unique** — they are the localStorage record keys. Convention: `<grade>_<target-key>_<number>`.

## Deployment

- **GitHub Actions (default):** Push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds and deploys to GitHub Pages automatically.
- **Manual:** `npm run deploy` pushes `dist/` to the `gh-pages` branch.

If the repo name changes, update `base` in [vite.config.js](vite.config.js) and `homepage` in [package.json](package.json) to match — mismatch causes a blank page after deploy.
