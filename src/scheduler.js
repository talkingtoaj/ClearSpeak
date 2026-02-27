const TEN_MINUTES = 10 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export function reviewMoments(now = Date.now()) {
  return [
    now + TEN_MINUTES,
    now + 8 * 60 * 60 * 1000,
    now + DAY
  ];
}

export function schedulePhrase(queue, phraseId, now = Date.now()) {
  const times = reviewMoments(now);
  const next = [...queue];
  for (const dueAt of times) {
    next.push({
      phrase_id: phraseId,
      next_review_time: dueAt,
      stability_score: 1
    });
  }
  return next;
}

export function dueReviews(queue, now = Date.now()) {
  return queue
    .filter((entry) => entry.next_review_time <= now)
    .sort((a, b) => a.next_review_time - b.next_review_time);
}

export function consumeReview(queue, entryToRemove) {
  return queue.filter(
    (entry) =>
      !(entry.phrase_id === entryToRemove.phrase_id && entry.next_review_time === entryToRemove.next_review_time)
  );
}
