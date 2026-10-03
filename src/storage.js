import { normalizeQueue } from './scheduler.js';

const ATTEMPT_KEY = 'clearspeak_attempts';
const REVIEW_KEY = 'clearspeak_review_queue';
const COURSE_INDEX_KEY = 'clearspeak_course_index';

/** Oldest attempts are dropped past this many, so storage can't grow forever */
export const MAX_STORED_ATTEMPTS = 2000;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked (private mode): keep working in memory only.
  }
}

export function loadAttempts() {
  return readJson(ATTEMPT_KEY, []);
}

export function saveAttempt(attempts, attempt) {
  const next = [...attempts, attempt].slice(-MAX_STORED_ATTEMPTS);
  writeJson(ATTEMPT_KEY, next);
  return next;
}

export function loadReviewQueue() {
  return normalizeQueue(readJson(REVIEW_KEY, []));
}

export function saveReviewQueue(queue) {
  writeJson(REVIEW_KEY, queue);
}

export function loadCourseIndex() {
  const index = readJson(COURSE_INDEX_KEY, 0);
  return Number.isInteger(index) && index >= 0 ? index : 0;
}

export function saveCourseIndex(index) {
  writeJson(COURSE_INDEX_KEY, index);
}
