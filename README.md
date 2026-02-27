# ClearSpeak MVP (PRD Implementation)

Implementation in this folder follows `PRD.txt` with a lightweight static web app.

## Run

```bash
cd ~/tmp/pronunce-asr
npm test
npm start
# open http://localhost:3000
```

## What is implemented

1. **ASR Pronunciation Loop**
   - Uses browser `SpeechRecognition` where available.
   - Record/Stop controls and a live recording indicator make capture state explicit.

2. **Error Highlighting**
   - Word-level diff (`src/logic.js -> wordDiff`) displayed with color coding.

3. **Rule-based Pronunciation Hints**
   - Confusion map (`src/data.js -> CONFUSION_HINTS`) + fallback tag hints.

4. **Double Success Confirmation**
   - Practice mode requires 2 consecutive successful recognitions.

5. **Variation Challenge**
   - After lock-in, a variant sentence is generated from templates.

6. **Spaced Pronunciation Review**
   - Successful phrase schedules reviews at +10m, +8h (next session proxy), +24h.
   - Queue is stored in localStorage and shown as due count.

7. **Multi-Voice Input**
   - TTS playback with browser voice selector (`speechSynthesis`).

8. **Intelligibility Progress UI**
   - Displays: Emerging / Understandable / Clear / Effortless.

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
