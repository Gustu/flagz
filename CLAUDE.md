# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Flagz** is a React-based world flag quiz game with a Polish-language UI. The entire application lives in a single JSX file (`flagi-europy_1.jsx`) — there is no build system, bundler, or test suite configured yet.

## Commands

There are no build, lint, or test commands. The `package.json` is a minimal scaffold with no dependencies or useful scripts.

To run, this component needs to be imported into a React app (it exports a default `App` component).

## Architecture

The app is a single-component React app (`flagi-europy_1.jsx`) with all logic, state, styles, and animations co-located:

- **Data**: `ALL_COUNTRIES` array (~195 countries with ISO codes, Polish names, and `tier` field 1/2/3). `SPEECH_ALIASES` map for voice recognition of alternate country names.
- **Tier system**: Countries are grouped into 3 tiers:
  - Tier 1 (~42): Most popular/well-known (major EU, world powers, Poland's neighbors)
  - Tier 2 (~53): Moderately known (smaller EU, Balkans, major Asian/African/South American)
  - Tier 3 (~100): Less commonly known (small island nations, smaller African, Central Asian)
  - User selects max tier in menu; `activeCountries` is derived via `useMemo` filter
- **Game modes** (managed via `mode` state in root `App` component):
  - `menu` — main menu with tier selector, voice toggle, and mode selection
  - `quiz` — flag quiz with `easy` (multiple choice) and `hard` (say aloud / parent-judged) difficulty
  - `letters` — select all flags starting with a given letter
  - `grid` — self-paced review of all active flags with self-judging
  - `browse` — searchable reference gallery
- **Voice recognition**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) via custom `useSpeechRecognition` hook. Polish language (`pl-PL`). Fuzzy matching via Levenshtein distance + alias lookup. Graceful degradation when unsupported. Used in easy quiz, hard quiz, and grid modes.
- **Styling**: Inline styles + `<style>` block with keyframe animations. Google Fonts (Playfair Display, DM Sans). Dark theme with gold (#c9a84c) accents.
- **State management**: All state in `useState`/`useMemo` hooks in root component. No external libraries.
- **Constants**: `QUIZ_LENGTH = 10`, `LETTERS_ROUNDS = 6`, `GRID_SIZE = 6`.
- **Flag rendering**: Unicode regional indicator emoji via `flagEmoji()` helper.
- **Dynamic computation**: `byLetter` and `goodLetters` are `useMemo`-derived from `activeCountries`. `buildLetterRound()` takes these as parameters.

## Language

All user-facing text is in Polish.
