import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildHint,
  buildVariation,
  evaluateAttempt,
  flashElement,
  intelligibilityLevel,
  pickCelebrationMessage,
  wordDiff
} from '../src/logic.js';

test('evaluateAttempt succeeds for close match', () => {
  const result = evaluateAttempt('I think so', 'i think so', 0.86);
  assert.equal(result.success, true);
});

test('wordDiff flags missing target words', () => {
  const diff = wordDiff('I think so', 'I sink');
  const missing = diff.find((p) => p.type === 'missing');
  assert.ok(missing);
  assert.equal(missing.target, 'think');
});

test('buildHint returns confusion-table hint first', () => {
  const hint = buildHint('I think so', 'I sink so', []);
  assert.match(hint, /tongue/i);
});

test('buildVariation injects phrase into template', () => {
  const variation = buildVariation('I think so', 1);
  assert.match(variation, /i think so/);
});

test('intelligibility levels map properly', () => {
  assert.equal(intelligibilityLevel(0.3), 'Emerging');
  assert.equal(intelligibilityLevel(0.6), 'Understandable');
  assert.equal(intelligibilityLevel(0.8), 'Clear');
  assert.equal(intelligibilityLevel(0.95), 'Effortless');
});

test('pickCelebrationMessage returns first message at index 0', () => {
  assert.equal(pickCelebrationMessage(0, ['A', 'B', 'C']), 'A');
});

test('pickCelebrationMessage wraps around with modulo', () => {
  assert.equal(pickCelebrationMessage(3, ['A', 'B', 'C']), 'A');
});

test('pickCelebrationMessage returns correct message at index 1', () => {
  assert.equal(pickCelebrationMessage(1, ['A', 'B']), 'B');
});

test('flashElement does not throw on element with classList', () => {
  const classes = new Set();
  const mockEl = {
    classList: {
      remove: (c) => classes.delete(c),
      add: (c) => classes.add(c)
    },
    get offsetWidth() { return 0; }
  };
  assert.doesNotThrow(() => flashElement(mockEl));
  assert.ok(classes.has('flash-yellow'));
});
