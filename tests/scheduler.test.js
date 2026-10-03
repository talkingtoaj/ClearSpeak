import test from 'node:test';
import assert from 'node:assert/strict';
import { dueReviews, normalizeQueue, REVIEW_INTERVALS, schedulePhrase } from '../src/scheduler.js';

test('schedulePhrase adds one entry at the first interval for a new phrase', () => {
  const next = schedulePhrase([], 'p1', 0);
  assert.deepEqual(next, [{ phrase_id: 'p1', next_review_time: REVIEW_INTERVALS[0], step: 0 }]);
});

test('passing a review replaces the entry and moves one step further out', () => {
  let queue = schedulePhrase([], 'p1', 0);
  queue = schedulePhrase(queue, 'p1', 1000);
  assert.equal(queue.length, 1);
  assert.equal(queue[0].step, 1);
  assert.equal(queue[0].next_review_time, 1000 + REVIEW_INTERVALS[1]);
});

test('step stops growing at the last interval', () => {
  let queue = [];
  for (let i = 0; i < REVIEW_INTERVALS.length + 3; i += 1) queue = schedulePhrase(queue, 'p1', 0);
  assert.equal(queue.length, 1);
  assert.equal(queue[0].step, REVIEW_INTERVALS.length - 1);
});

test('a lapsed review resets the phrase to the first interval', () => {
  const queue = [{ phrase_id: 'p1', next_review_time: 0, step: 3 }];
  const next = schedulePhrase(queue, 'p1', 500, { lapsed: true });
  assert.deepEqual(next, [{ phrase_id: 'p1', next_review_time: 500 + REVIEW_INTERVALS[0], step: 0 }]);
});

test('scheduling one phrase leaves other phrases alone', () => {
  const queue = [{ phrase_id: 'p2', next_review_time: 42, step: 2 }];
  const next = schedulePhrase(queue, 'p1', 0);
  assert.deepEqual(next.find((e) => e.phrase_id === 'p2'), queue[0]);
});

test('normalizeQueue collapses old duplicate entries to the earliest per phrase', () => {
  const old = [
    { phrase_id: 'p1', next_review_time: 300, stability_score: 1 },
    { phrase_id: 'p1', next_review_time: 100, stability_score: 1 },
    { phrase_id: 'p2', next_review_time: 200, stability_score: 1 }
  ];
  assert.deepEqual(normalizeQueue(old), [
    { phrase_id: 'p1', next_review_time: 100, step: 0 },
    { phrase_id: 'p2', next_review_time: 200, step: 0 }
  ]);
});

test('dueReviews returns only due entries ordered by time', () => {
  const queue = [
    { phrase_id: 'p1', next_review_time: 200, step: 0 },
    { phrase_id: 'p2', next_review_time: 100, step: 0 },
    { phrase_id: 'p3', next_review_time: 300, step: 0 }
  ];
  const due = dueReviews(queue, 220);
  assert.deepEqual(due.map((d) => d.phrase_id), ['p2', 'p1']);
});
