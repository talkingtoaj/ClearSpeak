import test from 'node:test';
import assert from 'node:assert/strict';
import { computeProgressByTopic } from '../src/progressByTopic.js';

const PHRASES = [
  { phrase_id: 'p1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p2', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p4', hint_tags: ['TH_SOUND_HINT'] }
];

const TOPIC_IDS = ['TH_SOUND_HINT', 'R_L_HINT'];

test('computeProgressByTopic returns one entry per topic in topic order', () => {
  const attempts = [];
  const result = computeProgressByTopic(attempts, PHRASES, TOPIC_IDS);
  assert.equal(result.length, 2);
  assert.equal(result[0].topicId, 'TH_SOUND_HINT');
  assert.equal(result[1].topicId, 'R_L_HINT');
});

test('computeProgressByTopic for topic with no attempts: total 0, successRate 0', () => {
  const attempts = [];
  const result = computeProgressByTopic(attempts, PHRASES, TOPIC_IDS);
  const th = result.find((r) => r.topicId === 'TH_SOUND_HINT');
  assert.equal(th.totalAttempts, 0);
  assert.equal(th.successfulAttempts, 0);
  assert.equal(th.successRate, 0);
});

test('computeProgressByTopic counts only attempts for phrases with that hint tag', () => {
  const attempts = [
    { phrase_id: 'p1', success_bool: true },
    { phrase_id: 'p1', success_bool: false },
    { phrase_id: 'p2', success_bool: true }
  ];
  const result = computeProgressByTopic(attempts, PHRASES, TOPIC_IDS);
  const th = result.find((r) => r.topicId === 'TH_SOUND_HINT');
  const rl = result.find((r) => r.topicId === 'R_L_HINT');
  assert.equal(th.totalAttempts, 2);
  assert.equal(th.successfulAttempts, 1);
  assert.equal(th.successRate, 0.5);
  assert.equal(rl.totalAttempts, 1);
  assert.equal(rl.successfulAttempts, 1);
  assert.equal(rl.successRate, 1);
});

test('computeProgressByTopic ignores attempts for unknown phrase_id', () => {
  const attempts = [
    { phrase_id: 'p99', success_bool: true }
  ];
  const result = computeProgressByTopic(attempts, PHRASES, TOPIC_IDS);
  const th = result.find((r) => r.topicId === 'TH_SOUND_HINT');
  assert.equal(th.totalAttempts, 0);
});

test('computeProgressByTopic topic with multiple phrases aggregates all', () => {
  const attempts = [
    { phrase_id: 'p1', success_bool: true },
    { phrase_id: 'p4', success_bool: true }
  ];
  const result = computeProgressByTopic(attempts, PHRASES, TOPIC_IDS);
  const th = result.find((r) => r.topicId === 'TH_SOUND_HINT');
  assert.equal(th.totalAttempts, 2);
  assert.equal(th.successfulAttempts, 2);
  assert.equal(th.successRate, 1);
});
