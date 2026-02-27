const ATTEMPT_KEY = 'clearspeak_attempts';
const REVIEW_KEY = 'clearspeak_review_queue';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadAttempts() {
  return readJson(ATTEMPT_KEY, []);
}

export function saveAttempt(attempt) {
  const attempts = loadAttempts();
  attempts.push(attempt);
  writeJson(ATTEMPT_KEY, attempts);
  return attempts;
}

export function loadReviewQueue() {
  return readJson(REVIEW_KEY, []);
}

export function saveReviewQueue(queue) {
  writeJson(REVIEW_KEY, queue);
}
