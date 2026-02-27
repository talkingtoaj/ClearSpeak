import { PHRASES } from './data.js';
import {
  buildHint,
  buildVariation,
  evaluateAttempt,
  intelligibilityLevel,
  normalizeText,
  wordDiff
} from './logic.js';
import { consumeReview, dueReviews, schedulePhrase } from './scheduler.js';
import { loadAttempts, loadReviewQueue, saveAttempt, saveReviewQueue } from './storage.js';

const ui = {
  modeLabel: document.getElementById('modeLabel'),
  targetText: document.getElementById('targetText'),
  spokenText: document.getElementById('spokenText'),
  feedbackBox: document.getElementById('feedbackBox'),
  legend: document.getElementById('legend'),
  hintText: document.getElementById('hintText'),
  statusText: document.getElementById('statusText'),
  streakText: document.getElementById('streakText'),
  playBtn: document.getElementById('playBtn'),
  recordBtn: document.getElementById('recordBtn'),
  stopBtn: document.getElementById('stopBtn'),
  recordingBadge: document.getElementById('recordingBadge'),
  voiceSelect: document.getElementById('voiceSelect'),
  progressBar: document.getElementById('progressBar'),
  progressSummary: document.getElementById('progressSummary'),
  intelligibilityText: document.getElementById('intelligibilityText'),
  totalAttempts: document.getElementById('totalAttempts'),
  reviewsDue: document.getElementById('reviewsDue')
};

const CELEBRATION_MESSAGES = [
  'Great job! That was clearly recognized.',
  'Nice work! Your pronunciation came through well.',
  'Excellent! You sounded clear on that attempt.',
  'Strong attempt — that was understood correctly.'
];

const LEVEL_EXPLANATIONS = {
  Emerging: 'Emerging — early stage, keep practicing to build consistency.',
  Understandable: 'Understandable — listeners likely catch your meaning with occasional effort.',
  Clear: 'Clear — most listeners should understand you easily.',
  Effortless: 'Effortless — your speech is consistently easy to understand.'
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

const state = {
  phraseIndex: 0,
  mode: 'practice',
  currentPhrase: PHRASES[0],
  variationText: '',
  successStreak: 0,
  attemptCount: 0,
  attempts: loadAttempts(),
  reviewQueue: loadReviewQueue(),
  reviewEntry: null,
  recording: false,
  celebrationIndex: 0
};

function requiredSuccesses() {
  return state.mode === 'practice' ? 2 : 1;
}

function currentTarget() {
  return state.mode === 'variation' ? state.variationText : state.currentPhrase.target_text;
}

function setRecordingUI(isRecording) {
  state.recording = isRecording;
  ui.recordBtn.disabled = isRecording;
  ui.stopBtn.disabled = !isRecording;
  ui.recordingBadge.textContent = isRecording ? 'Recording… speak now' : 'Not recording';
  ui.recordingBadge.className = `recording-badge ${isRecording ? 'live' : 'idle'}`;
}

function progressColor(percent) {
  if (percent >= 85) return '#0f9d58';
  if (percent >= 65) return '#2a64f6';
  if (percent >= 45) return '#d97706';
  return '#c2410c';
}

function refreshProgress() {
  const successes = state.attempts.filter((a) => a.success_bool).length;
  const successRate = state.attempts.length ? successes / state.attempts.length : 0;
  const percent = Math.round(successRate * 100);
  const level = intelligibilityLevel(successRate);

  ui.totalAttempts.textContent = String(state.attempts.length);
  ui.reviewsDue.textContent = String(dueReviews(state.reviewQueue).length);
  ui.progressBar.style.width = `${percent}%`;
  ui.progressBar.style.background = progressColor(percent);
  ui.progressSummary.textContent = `Current clarity score: ${percent}%`;
  ui.intelligibilityText.textContent = `Level: ${LEVEL_EXPLANATIONS[level]}`;
}

function renderWordFeedback(target, transcript, isSuccess) {
  if (isSuccess) {
    const message = CELEBRATION_MESSAGES[state.celebrationIndex % CELEBRATION_MESSAGES.length];
    state.celebrationIndex += 1;
    ui.feedbackBox.textContent = `✅ ${message}`;
    ui.legend.classList.add('hidden');
    return;
  }

  const parts = wordDiff(target, transcript);
  ui.feedbackBox.innerHTML = parts
    .map((part) => {
      if (part.type === 'correct') return `<span class="diff-correct">${part.target}</span>`;
      if (part.type === 'missing') return `<span class="diff-missing">[${part.target}]</span>`;
      return `<span class="diff-extra">(${part.spoken})</span>`;
    })
    .join(' ');
  ui.legend.classList.remove('hidden');
}

function setTaskFromQueueOrCourse() {
  const due = dueReviews(state.reviewQueue);
  if (due.length > 0) {
    state.mode = 'review';
    state.reviewEntry = due[0];
    state.currentPhrase = PHRASES.find((p) => p.phrase_id === due[0].phrase_id) || PHRASES[0];
    ui.modeLabel.textContent = 'Quick Review Check';
    ui.statusText.textContent = 'Quick check: can you still say this clearly?';
    state.successStreak = 0;
    state.attemptCount = 0;
    return;
  }

  state.mode = 'practice';
  state.reviewEntry = null;
  state.currentPhrase = PHRASES[state.phraseIndex % PHRASES.length];
  state.successStreak = 0;
  state.attemptCount = 0;
  ui.modeLabel.textContent = 'Practice Phrase';
  ui.statusText.textContent = '';
}

function renderTarget() {
  ui.targetText.textContent = currentTarget();
  ui.spokenText.textContent = '(waiting)';
  ui.feedbackBox.textContent = 'Your detailed word feedback appears here after each attempt.';
  ui.legend.classList.add('hidden');
  ui.streakText.textContent = '';
}

function completePhraseCycle() {
  if (state.mode === 'variation') {
    state.reviewQueue = schedulePhrase(state.reviewQueue, state.currentPhrase.phrase_id);
    saveReviewQueue(state.reviewQueue);
    state.phraseIndex += 1;
    setTaskFromQueueOrCourse();
    renderTarget();
    refreshProgress();
    return;
  }

  if (state.mode === 'review') {
    state.reviewQueue = consumeReview(state.reviewQueue, state.reviewEntry);
    state.reviewQueue = schedulePhrase(state.reviewQueue, state.currentPhrase.phrase_id);
    saveReviewQueue(state.reviewQueue);
    setTaskFromQueueOrCourse();
    renderTarget();
    refreshProgress();
  }
}

function startVariationChallenge() {
  state.mode = 'variation';
  state.successStreak = 0;
  state.variationText = buildVariation(state.currentPhrase.target_text, state.phraseIndex);
  ui.modeLabel.textContent = 'Variation Challenge';
  ui.statusText.textContent = 'Great. Now say this new sentence variation once.';
  renderTarget();
}

function logAttempt(transcript, success) {
  const attempt = {
    user_id: 'local-user',
    phrase_id: state.currentPhrase.phrase_id,
    timestamp: Date.now(),
    transcript: normalizeText(transcript),
    success_bool: success,
    attempt_count: state.attemptCount
  };
  state.attempts = saveAttempt(attempt);
  refreshProgress();
}

function processTranscript(transcript) {
  const target = currentTarget();
  ui.spokenText.textContent = transcript || '(empty)';

  state.attemptCount += 1;
  const threshold = state.mode === 'practice' ? 0.86 : 0.82;
  const result = evaluateAttempt(target, transcript, threshold);

  renderWordFeedback(target, transcript, result.success);
  ui.hintText.textContent = result.success
    ? 'Tip: Keep this mouth movement and rhythm for similar phrases.'
    : buildHint(target, transcript, state.currentPhrase.hint_tags);

  logAttempt(transcript, result.success);

  if (result.success) {
    state.successStreak += 1;
    if (state.successStreak >= requiredSuccesses()) {
      if (state.mode === 'practice') {
        ui.statusText.textContent = 'Locked in ✔ Next step: variation challenge.';
        startVariationChallenge();
      } else {
        ui.statusText.textContent = 'Success ✔ Moving to next item.';
        completePhraseCycle();
      }
    } else {
      ui.statusText.textContent = 'Recognized ✔ Say it once more to lock it in.';
    }
  } else {
    state.successStreak = 0;
    ui.statusText.textContent = `Not yet (${Math.round(result.score * 100)}% match). Try again.`;
  }

  ui.streakText.textContent = `Current lock-in streak: ${state.successStreak}/${requiredSuccesses()}`;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const selected = ui.voiceSelect.value;
  const voices = speechSynthesis.getVoices();
  const chosen = voices.find((v) => v.voiceURI === selected);
  if (chosen) utterance.voice = chosen;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function populateVoices() {
  const voices = speechSynthesis.getVoices();
  ui.voiceSelect.innerHTML = voices
    .map((v) => `<option value="${v.voiceURI}">${v.name} (${v.lang})</option>`)
    .join('');
}

ui.playBtn.addEventListener('click', () => speak(currentTarget()));

ui.recordBtn.addEventListener('click', () => {
  if (!recognition) {
    ui.statusText.textContent = 'Speech recognition is not available in this browser.';
    return;
  }
  setRecordingUI(true);
  ui.statusText.textContent = 'Recording... speak clearly, then click Stop.';
  recognition.start();
});

ui.stopBtn.addEventListener('click', () => {
  if (!recognition || !state.recording) return;
  recognition.stop();
  ui.statusText.textContent = 'Processing your attempt...';
});

if (recognition) {
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processTranscript(transcript);
  };

  recognition.onend = () => {
    setRecordingUI(false);
  };

  recognition.onerror = () => {
    setRecordingUI(false);
    ui.statusText.textContent = 'Could not capture speech. Please try again.';
  };
}

if (window.speechSynthesis) {
  populateVoices();
  speechSynthesis.onvoiceschanged = populateVoices;
}

setTaskFromQueueOrCourse();
renderTarget();
refreshProgress();
setRecordingUI(false);
