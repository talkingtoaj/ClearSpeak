const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

/** Gap before the next review, indexed by how many reviews in a row were passed */
export const REVIEW_INTERVALS = [10 * MINUTE, DAY, 3 * DAY, 7 * DAY, 21 * DAY, 60 * DAY];

/**
 * Keep one entry per phrase (the earliest due), giving old entries a step.
 * Repairs queues saved by the old scheduler, which stacked duplicates.
 */
export function normalizeQueue(queue = []) {
  const byPhrase = new Map();
  for (const entry of queue) {
    const current = byPhrase.get(entry.phrase_id);
    if (!current || entry.next_review_time < current.next_review_time) {
      byPhrase.set(entry.phrase_id, {
        phrase_id: entry.phrase_id,
        next_review_time: entry.next_review_time,
        step: Number.isInteger(entry.step) ? entry.step : 0
      });
    }
  }
  return [...byPhrase.values()];
}

/**
 * Schedule the next review for a phrase. A pass moves it one step further out;
 * a lapse (failed review) starts it over at the shortest gap.
 */
export function schedulePhrase(queue, phraseId, now = Date.now(), { lapsed = false } = {}) {
  const existing = queue.find((entry) => entry.phrase_id === phraseId);
  const lastStep = REVIEW_INTERVALS.length - 1;
  const step = existing && !lapsed ? Math.min(existing.step + 1, lastStep) : 0;
  const rest = queue.filter((entry) => entry.phrase_id !== phraseId);
  return [...rest, { phrase_id: phraseId, next_review_time: now + REVIEW_INTERVALS[step], step }];
}

export function dueReviews(queue, now = Date.now()) {
  return queue
    .filter((entry) => entry.next_review_time <= now)
    .sort((a, b) => a.next_review_time - b.next_review_time);
}
