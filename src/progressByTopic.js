/**
 * Compute progress per confusion topic from attempts and phrases.
 * Only counts attempts for phrases that include the topic's hint tag.
 * @param {Array<{ phrase_id: string, success_bool: boolean }>} attempts
 * @param {Array<{ phrase_id: string, hint_tags: string[] }>} phrases
 * @param {string[]} topicIds - ordered list of topic ids (e.g. from topic help config)
 * @returns {Array<{ topicId: string, totalAttempts: number, successfulAttempts: number, successRate: number }>}
 */
export function computeProgressByTopic(attempts, phrases, topicIds) {
  const phraseById = new Map(phrases.map((p) => [p.phrase_id, p]));

  return topicIds.map((topicId) => {
    const phraseIdsWithTag = phrases
      .filter((p) => p.hint_tags && p.hint_tags.includes(topicId))
      .map((p) => p.phrase_id);
    const set = new Set(phraseIdsWithTag);

    const relevant = attempts.filter((a) => set.has(a.phrase_id));
    const totalAttempts = relevant.length;
    const successfulAttempts = relevant.filter((a) => a.success_bool).length;
    const successRate = totalAttempts ? successfulAttempts / totalAttempts : 0;

    return {
      topicId,
      totalAttempts,
      successfulAttempts,
      successRate
    };
  });
}
