# AGENTS.md

## Project
Smart Campus Room Availability Checker: one room (A-101), fictional data,
fixed current time NOW = 540 (09:00), one existing booking [600, 660]
(10:00-11:00). The page only CHECKS availability; it never creates, saves
or changes bookings.

## Structure
- src/App.tsx – UI only: time inputs, blocked checkbox, bookings list,
  result panel. Fixture data NOW and INITIAL_BOOKINGS stay here.
- src/canBook.ts – pure function canBook(start, end, now, blocked, existing)
  returning { available, message }. Booking type is [number, number].
- src/time.ts – shared time helpers toMinutes and formatTime (after refactor).
- src/*.test.ts – Vitest regression tests (after refactor).

## Acceptance criteria (must be preserved exactly)
- AC1: integer minutes, 0 <= start < end <= 1440, start > now
  (start == now is rejected); empty or invalid input is rejected.
- AC2: end - start <= 120 (120 allowed, 121 rejected).
- AC3: a blocked room rejects every request.
- AC4: overlap if start < bEnd && end > bStart; touching endpoints allowed.
- AC5: result is Available / Unavailable; booking data is never mutated.
- AC6: clear message for invalid input; usable on mobile width.

## Forbidden
No login, accounts, backend, server, database, external APIs, payments,
multiple rooms, booking creation or new features. Do not change UI text,
messages, colors or layout unless explicitly asked.

## Engineering rules
- Minimal changes; prefer pure functions.
- At most 2 patterns, each justified by a concrete problem.
  No Singleton, Factory, Strategy, Adapter or class hierarchies without need.
- Do not change the logic or messages of canBook during refactoring.
- Do not mutate fixtures. Do not weaken or delete existing tests.

## Commands
- npm install
- npm run dev
- npm run build
- npm test   (vitest run; added during refactoring)

## Verification and reporting
After every change: run npm run build and npm test, then report the
changed files, the reason for each change and the test output
(number of passed / failed tests).