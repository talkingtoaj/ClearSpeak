import test from 'node:test';
import assert from 'node:assert/strict';
import { TOPIC_HELP_ORDER, getTopicHelp } from '../src/topicHelp.js';

// YouTube video IDs are 11 characters, alphanumeric, - and _
const YOUTUBE_ID_REG = /^[A-Za-z0-9_-]{11}$/;

test('TOPIC_HELP_ORDER is a non-empty array of topic ids', () => {
  assert.ok(Array.isArray(TOPIC_HELP_ORDER));
  assert.ok(TOPIC_HELP_ORDER.length >= 1);
  assert.ok(TOPIC_HELP_ORDER.every((id) => typeof id === 'string' && id.length > 0));
});

test('getTopicHelp returns an object for every id in TOPIC_HELP_ORDER', () => {
  for (const id of TOPIC_HELP_ORDER) {
    const topic = getTopicHelp(id);
    assert.ok(topic, `topic help for ${id} should exist`);
    assert.equal(topic.id, id);
  }
});

test('each topic has required fields: id, label, instructions, examples, youtubeVideoId', () => {
  for (const id of TOPIC_HELP_ORDER) {
    const topic = getTopicHelp(id);
    assert.equal(typeof topic.label, 'string');
    assert.ok(topic.label.length > 0);
    assert.equal(typeof topic.instructions, 'string');
    assert.ok(topic.instructions.length > 0);
    assert.ok(Array.isArray(topic.examples));
    assert.equal(typeof topic.youtubeVideoId, 'string');
    assert.ok(topic.youtubeVideoId.length > 0, `${id} must have youtubeVideoId`);
  }
});

test('each topic youtubeVideoId is a valid 11-char YouTube id', () => {
  for (const id of TOPIC_HELP_ORDER) {
    const topic = getTopicHelp(id);
    assert.ok(
      YOUTUBE_ID_REG.test(topic.youtubeVideoId),
      `${id} youtubeVideoId "${topic.youtubeVideoId}" should be 11-char YouTube id`
    );
  }
});

test('getTopicHelp returns undefined for unknown id', () => {
  assert.equal(getTopicHelp('UNKNOWN_TOPIC'), undefined);
});
