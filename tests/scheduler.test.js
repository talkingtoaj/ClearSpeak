import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeReview, dueReviews, reviewMoments, schedulePhrase } from '../src/scheduler.js';

test('reviewMoments creates three spaced times', () => {
  const base = 1_000_000;
  const [a, b, c] = reviewMoments(base);
  assert.equal(a, base + 10 * 60 * 1000);
  assert.equal(c, base + 24 * 60 * 60 * 1000);
  assert.ok(b > a && b < c);
});

test('schedulePhrase appends three queue entries', () => {
  const next = schedulePhrase([], 'p1', 0);
  assert.equal(next.length, 3);
  assert.equal(next[0].phrase_id, 'p1');
});

test('dueReviews returns only due entries ordered by time', () => {
  const queue = [
    { phrase_id: 'p1', next_review_time: 200, stability_score: 1 },
    { phrase_id: 'p2', next_review_time: 100, stability_score: 1 },
    { phrase_id: 'p3', next_review_time: 300, stability_score: 1 }
  ];
  const due = dueReviews(queue, 220);
  assert.deepEqual(due.map((d) => d.phrase_id), ['p2', 'p1']);
});

test('consumeReview removes exact matching review entry', () => {
  const queue = [
    { phrase_id: 'p1', next_review_time: 100, stability_score: 1 },
    { phrase_id: 'p1', next_review_time: 150, stability_score: 1 }
  ];
  const next = consumeReview(queue, { phrase_id: 'p1', next_review_time: 100 });
  assert.equal(next.length, 1);
  assert.equal(next[0].next_review_time, 150);
});
