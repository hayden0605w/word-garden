# Spelling and phonics help

Wrong answers automatically show a spelling aid. Correct answers offer an optional
“看拼讀提示” button. Letter hints stay hidden until the answer is checked or the
learner explicitly requests the existing hint.

`source/phonics-data.json` contains reviewed notes for 617 catalog rows (plus a small
number of common inflected forms). Notes distinguish common grapheme patterns,
exceptions and spelling-only grouping. Patterns use explicit word lists; substring
matches never classify an arbitrary unfamiliar word as regular.

For other words, the app shows a spelling-order aid without inventing a phonics rule
or calling the word irregular. English pronunciations can vary by sense and accent;
the full-word recording remains the listening reference.

`node test-phonics.mjs` checks reconstruction, focus letters, curated examples,
fallback escaping, automatic wrong-answer display and optional correct-answer display.
