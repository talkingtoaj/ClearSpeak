# PRD: Progress by Confusion Topic & Info Popups

**Product:** ClearSpeak  
**Feature:** Progress section broken down by confusion topic, with (i) icon opening a popup of instructions, examples, and an embedded high-quality YouTube lesson.  
**Status:** Spec for implementation.

---

## 1. Overview

### 1.1 Goal

- Show learners **progress per confusion topic** (e.g. TH sound, R vs L) so they see where they are strong and where to focus.
- Offer **one-click help** per topic via an (i) icon that opens a popup with:
  - Short **instructions** and **examples** for that topic.
  - An **embedded YouTube video** (curated, high-quality pronunciation lesson).

### 1.2 Context

- ClearSpeak phrases use `hint_tags[]` (e.g. `TH_SOUND_HINT`, `R_L_HINT`) and attempts are stored with `phrase_id`. Progress by topic is derived by mapping attempts → phrase → `hint_tags` and aggregating success/failure per tag.
- This PRD defines the UX, data model, content (instructions + video per topic), and implementation work.

---

## 2. User Experience

### 2.1 Progress section (by confusion topic)

- **Location:** In or below the existing “progress strip” (e.g. under “Total attempts” / “Reviews due”), or as a dedicated “Progress by topic” card.
- **Content:** One row per **confusion topic** the app supports (aligned with `hint_tags` and future tags):
  - **Topic label** (e.g. “TH sound”, “R vs L”, “V vs W”).
  - **Progress indicator** for that topic only (e.g. success rate or “X/Y phrases clear” based on attempts on phrases that have that tag).
  - **(i) icon** (info) next to the label or at end of row. Clicking it opens the topic popup (see below).
- **Behaviour:** Progress is computed from stored attempts: for each tag, consider all attempts where the phrase’s `hint_tags` include that tag; show success rate (and optionally attempt count) for that tag only.
- **Empty state:** If a topic has no attempts yet, show “No practice yet” (or similar) and still show the (i) icon so users can learn before practicing.

### 2.2 Info popup (per topic)

- **Trigger:** Click (or keyboard focus + activate) the (i) icon for a given topic.
- **Content:**
  1. **Title:** Same as topic label (e.g. “TH sound”).
  2. **Instructions:** 2–4 short bullet points on how to produce the sound or avoid the confusion (same style as existing in-app hints; can be the same text as the topic’s `HINT_TAGS` copy, or a slightly expanded version).
  3. **Examples:** A few example words or minimal pairs (e.g. “think / sink”, “rice / lice”). Can be the same as in `CONFUSION_HINTS` / `HINT_TAGS`.
  4. **Video:** One embedded YouTube video (iframe) — see section 4 for chosen videos. Player should be responsive and respect reduced motion / accessibility where applicable.
- **Dismissal:** Close button and/or click outside to close. Focus returns to the (i) icon that opened the popup.
- **Accessibility:** Modal or dialog semantics (e.g. `role="dialog"`), focus trap while open, and escape to close.

---

## 3. Data & Logic

### 3.1 Progress by topic

- **Source of truth:** `loadAttempts()` from storage; `PHRASES` from `data.js` (each phrase has `phrase_id`, `hint_tags[]`).
- **Computation:** For each known topic (tag), e.g. `TH_SOUND_HINT`, `R_L_HINT`:
  - Collect all attempts whose `phrase_id` maps to a phrase that has that tag in `hint_tags`.
  - Compute: total attempts, successful attempts (where `success_bool === true`), success rate.
- **Display:** Per topic: label, success rate (e.g. “67%” or “2/3”), optional attempt count, and (i) icon. No new persistence; all derived from existing attempts + phrases.

### 3.2 Topic content (instructions + video)

- **Storage:** A small config in the app (e.g. in `data.js` or a new `topicHelp.js`): one object per topic key (e.g. `TH_SOUND_HINT`), with:
  - `label` (e.g. “TH sound”),
  - `instructions` (short bullets or paragraph),
  - `examples` (array of strings or minimal pairs),
  - `youtubeVideoId` (ID only; embed URL is `https://www.youtube.com/embed/{id}`).
- **Videos:** Chosen for clarity, pedagogy, and relevance to the confusion (see section 4). All IDs are for standard YouTube embed (no autoplay required).

---

## 4. Researched YouTube Videos (by confusion topic)

Videos were selected for clarity, correct articulation explanation, minimal pairs or examples, and suitability for A2–B2 learners. Prefer single, focused lessons per topic.

| Topic key        | Topic label (display) | Recommended YouTube video | Notes |
|------------------|------------------------|----------------------------|--------|
| **TH_SOUND_HINT** | TH sound               | **Rachel's English** — *PERFECT PRONUNCIATION \| 5 Powerful Tips for the TH Sound*<br>**Video ID:** `1Tor0LDdVKY`<br>URL: https://www.youtube.com/watch?v=1Tor0LDdVKY | Strong tips, tongue placement, real-student demos; widely recommended for TH. |
| **R_L_HINT**      | R vs L                 | **Easy ENGLISH with James** — *English Pronunciation - The R vs L sounds (/r/ vs /l/)*<br>**Video ID:** `LgQB2Pr7V20`<br>URL: https://www.youtube.com/watch?v=LgQB2Pr7V20 | 28 min; mouth position, two L types, minimal pairs, test; targets Asian L1s. |
| **V_W_HINT**      | V vs W                 | **English Pro Tips** — *Master the "V" and "W" Sounds in English \| Pronunciation*<br>**Video ID:** `7j44DsQodFs`<br>URL: https://www.youtube.com/watch?v=7j44DsQodFs | Short (~1 min); teeth-on-lip for V, rounded lips for W; minimal pairs (vine/wine, vest/west). |
| **F_V_HINT**      | F vs V                 | **Easy ENGLISH with James** — *English Pronunciation - The F vs V sounds (/f/ vs /v/)*<br>**Video ID:** `zMqYZno5OrY`<br>URL: https://www.youtube.com/watch?v=zMqYZno5OrY | Full lesson; same mouth position, voicing difference; “of” = /v/; minimal pairs. |
| **P_B_HINT**      | P vs B                 | **Speak Better English** — *Speak Better English by Practicing DIFFICULT Minimal Pairs*<br>**Video ID:** `UgjcLdMHKpw`<br>URL: https://www.youtube.com/watch?v=UgjcLdMHKpw | Covers difficult minimal pairs including /p/ vs /b/ (e.g. park/bark, pat/bat). Alternative: *Minimal Pairs \| Pronunciation Practice* — `iBnx_S1Zw9A`. |
| **H_SOUND_HINT**  | H sound                | **Rachel's English** (site) / **YouTube** — *How to Pronounce "H" Sound in English*<br>**Video ID:** `7AMklpPPIT8`<br>URL: https://www.youtube.com/watch?v=7AMklpPPIT8 | Glottal /h/, avoid dropping (e.g. “how” → “ow”); paper test. Alternative: *Pronouncing /h/ – Part 1* — `rXebkI3mnIw`. |
| **VOWEL_LENGTH_HINT** | Short vs long vowels (e.g. ship/sheep) | **English with Lucy** — *❌ STOP Saying SHIP and SHEEP The Same! \| How to Pronounce Ship v Sheep*<br>**Video ID:** `32bpbQYoTKE`<br>URL: https://www.youtube.com/watch?v=32bpbQYoTKE | Short /ɪ/ vs long /iː/; clear contrast. Alternative: *SHIP vs SHEEP? Long and Short "i" Vowels* — `5hBDAUCDXN8`. |
| **NG_HINT**       | NG sound (sing, thing) | **Sounds American** — *Consonant Sound /ŋ/ (NG) as in "thing" – American English Pronunciation*<br>**Video ID:** `5xVq8T88oJw`<br>URL: https://www.youtube.com/watch?v=5xVq8T88oJw | Velar nasal; avoid “sing-g” or “sink”; -ing vs -ink. |

**Implementation note:** Start with topics that already exist in the app (`TH_SOUND_HINT`, `R_L_HINT`). Add rows and (i) popups for `V_W_HINT`, `F_V_HINT`, etc. when those tags are added to phrases and hint config.

---

## 5. Work to be done

### 5.1 Data & content

- [ ] **Define topic help config**  
  Add a structure (e.g. in `data.js` or `src/topicHelp.js`) that lists every supported confusion topic with:
  - `id` (same as hint tag, e.g. `TH_SOUND_HINT`),
  - `label` (e.g. “TH sound”),
  - `instructions` (short bullets or paragraph),
  - `examples` (array of strings or pairs),
  - `youtubeVideoId` (string).
- [ ] **Fill content for TH and R/L**  
  Copy or adapt instructions/examples from existing `HINT_TAGS` and `CONFUSION_HINTS`; add the YouTube IDs from the table above for `TH_SOUND_HINT` and `R_L_HINT`.
- [ ] **Optionally add content for extra topics**  
  When new hint tags are introduced (e.g. V_W, F_V, P_B, H, VOWEL_LENGTH, NG), add corresponding topic help entries and video IDs from section 4.

### 5.2 Progress by topic (logic)

- [ ] **Aggregate attempts by hint tag**  
  In `logic.js` or a small `progressByTopic.js`: given `attempts[]` and `PHRASES`, for each tag that appears in any phrase’s `hint_tags`, compute:
  - `totalAttempts`,
  - `successfulAttempts`,
  - `successRate` (or derived “X/Y clear”).
- [ ] **Expose “topics with progress”**  
  Function or state that returns a list of topic ids with their progress metrics (and optionally attempt count), so the UI can render one row per topic.

### 5.3 UI: progress section

- [ ] **Add “Progress by topic” block**  
  In `index.html`, add a section (e.g. under the current progress strip) with a heading and a list/table of topics. Each row: topic label, progress indicator (e.g. “67%” or “2/3”), and an (i) icon button.
- [ ] **Wire progress data**  
  When rendering the app (e.g. after updating attempts or on load), compute per-topic progress and update the progress-by-topic section. Show “No practice yet” for topics with zero attempts.
- [ ] **Styling**  
  In `styles.css`, style the topic rows and (i) icon so the section is clear and matches the rest of the app.

### 5.4 UI: info popup

- [ ] **Popup/dialog component**  
  Implement a modal/dialog that:
  - Shows title (topic label), instructions, examples, and embedded YouTube iframe (`https://www.youtube.com/embed/{youtubeVideoId}`).
  - Has a close button and “click outside to close” (and optionally Escape).
  - Uses dialog semantics and focus trap; returns focus to the (i) that opened it on close.
- [ ] **Open on (i) click**  
  When the user clicks the (i) for a topic, open the popup with that topic’s content (from the topic help config) and the corresponding video ID.
- [ ] **Responsive video**  
  Embed the iframe in a responsive container (e.g. 16:9 wrapper) so it scales on small screens.
- [ ] **Accessibility**  
  Ensure (i) has an accessible name (e.g. “Help for [topic name]”), and that the dialog is announced and keyboard-usable.

### 5.5 Integration & polish

- [ ] **Single source for “known topics”**  
  Ensure the list of topics (and their order) is driven by the topic help config so adding a new topic only requires adding one config entry (and optionally new phrases with that tag).
- [ ] **Tests**  
  Add tests for: (a) progress-by-topic aggregation (given mock attempts and phrases), (b) that topic help config has required fields and valid video IDs for each topic.

---

## 6. Acceptance criteria

- **Progress by topic:** User sees a list of confusion topics; each topic shows a success rate (or equivalent) based only on attempts for phrases that have that topic’s hint tag; topics with no attempts show a clear “no practice yet” state.
- **(i) icon:** Each topic row has an (i) icon that is clearly clickable and has an accessible name.
- **Popup:** Clicking (i) opens a popup with the topic name, short instructions, examples, and one embedded YouTube video; the video loads and plays when the user presses play.
- **Close:** User can close the popup via button or outside click (and Escape); focus returns to the (i) icon.
- **Data:** Progress is computed from existing attempt storage; no new backend or storage schema required. Topic content (instructions, examples, video ID) lives in app config and can be updated without changing code logic.

---

## 7. Out of scope (this PRD)

- Selecting different videos per user or per L1.
- In-app recording/playback of the learner for comparison with the video.
- Teacher or admin UI for changing videos or instructions.
- Automatic “recommend topic” based on weak progress (can be a later feature).

---

## 8. References

- Existing app: `src/data.js` (`PHRASES`, `HINT_TAGS`, `CONFUSION_HINTS`), `src/app.js` (progress strip, attempts), `src/storage.js` (attempts), `src/logic.js` (evaluation).
- PRD (high-level): `PRD.txt` — Feature 8 (Intelligibility-Oriented Progress UI); this PRD extends progress with per-topic breakdown and help.
