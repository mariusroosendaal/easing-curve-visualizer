# Changelog

## [1.0.1] - 2026-05-09

### Fixed

- Validate that `msg.values` is an array of four finite numbers before use in `code.ts`
- Validate that x1 and x2 are within [0, 1] — required by the CSS `cubic-bezier()` spec — with an error message in both the UI and `code.ts`
- Wrap the `onmessage` handler in `try/catch` so unexpected errors surface via `figma.notify` instead of failing silently
- Disable the "Create curve" button when the input is empty or invalid
- Remove stale change-description comments and commented-out `cornerRadius` line

## [1.0.0] - 2026-05-08

### Changed

- **UI** — Updated to Figma UI3.
- Bezier input has an associated label and shows validation errors inline on the field (was a separate error line below)
