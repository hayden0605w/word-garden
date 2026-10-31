# Vocabulary card review — 2026-10-31

All 1,211 catalog rows have an explicit review record in `source/card-review.json`.
The authoring decisions are retained in `source/card-review.tsv` and `source/card-review-retained.txt`.

- Concrete nouns keep an accurate symbol or use a more specific illustration.
- Actions and abstract words use reviewed visual combinations. Chinese scene captions were removed at the user’s request; editorial context remains in the review data.
- Numbers, ordinals, months, weekdays, colors and spatial relationships use distinct diagrams.
- 159 Chinese learning meanings were corrected to common, child-appropriate senses.
- Existing saved cards receive display corrections when their meaning still matches the old built-in meaning. Custom meanings and uploaded pictures are preserved.
- Visual scenes never include the target English spelling.

The same rendering is used by practice, saved cards and the built-in catalog.
`node test-card-review.mjs` checks complete coverage, rendering, distinct dates/numbers,
case-sensitive homographs and preservation of custom content after building the site.

This review concerns learning meanings and visual prompts. It does not certify that
all pronunciation recordings match Free Dictionary API; that separate audit remains incomplete.

## Unified scene update

All 692 former multi-emoji combinations now use an explicitly mapped complete vector scene or an accurate single-subject symbol. Scene drawings share a 280 × 180 canvas and a consistent palette. Existing spatial and numeric diagrams remain. No Chinese captions are rendered inside the image. See `source/scene-plan.json` and `source/scene-art.js`.
