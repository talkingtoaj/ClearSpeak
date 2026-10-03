# ClearSpeak MVP (PRD Implementation)

Lightweight static web app. Specs live in `docs/` (`prd-mvp.txt` for the core app, `prd-progress-by-topic.md` for the topic progress feature).

## Run

```bash
npm test
npm start
# open http://localhost:3000
```

## What is implemented

1. **ASR Pronunciation Loop**
   - Uses browser `SpeechRecognition` where available.
   - Record button and a live recording indicator make capture state explicit. Recording stops on its own when you stop talking.

2. **Error Highlighting**
   - Word-level diff (`src/logic.js -> wordDiff`) displayed with color coding.

3. **Rule-based Pronunciation Hints**
   - Confusion map (`src/data.js -> CONFUSION_HINTS`) + fallback tag hints.

4. **Double Success Confirmation**
   - Practice mode requires 2 consecutive successful recognitions.

5. **Variation Challenge**
   - After lock-in, a variant sentence is generated from templates.

6. **Spaced Pronunciation Review**
   - One review entry per phrase. Each passed review pushes the next one further out (10m, 1d, 3d, 7d, 21d, 60d); a failed review starts it over at 10m.
   - Queue and course position are stored in localStorage; due count is shown in the progress strip.

7. **Multi-Voice Input**
   - TTS playback with browser voice selector (`speechSynthesis`).

8. **Intelligibility Progress UI**
   - Displays: Emerging / Understandable / Clear / Effortless, based on the last 50 attempts.

## File map

- `index.html` - UI shell
- `styles.css` - styles
- `src/app.js` - app state + UX flow
- `src/logic.js` - pure comparison/hints/progress logic
- `src/scheduler.js` - spaced review scheduling
- `src/storage.js` - localStorage persistence
- `src/data.js` - phrases/hints/templates
- `tests/*.test.js` - node tests
- `scripts/start.mjs` - tiny static server

## Notes

- No backend and no custom ML components (MVP-aligned).
- ASR quality depends on browser and microphone permissions.
