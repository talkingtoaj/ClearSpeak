import { CONFUSION_HINTS, HINT_TAGS, VARIATION_TEMPLATES } from './data.js';

export function normalizeText(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function levenshtein(a, b) {
  const aa = normalizeText(a);
  const bb = normalizeText(b);
  const dp = Array.from({ length: aa.length + 1 }, () => new Array(bb.length + 1).fill(0));

  for (let i = 0; i <= aa.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= bb.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= aa.length; i += 1) {
    for (let j = 1; j <= bb.length; j += 1) {
      const cost = aa[i - 1] === bb[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[aa.length][bb.length];
}

export function similarityScore(target, transcript) {
  const t = normalizeText(target);
  const s = normalizeText(transcript);
  if (!t && !s) return 1;
  const distance = levenshtein(t, s);
  return 1 - distance / Math.max(t.length, s.length, 1);
}

export function evaluateAttempt(target, transcript, threshold = 0.86) {
  const score = similarityScore(target, transcript);
  return {
    success: score >= threshold,
    score
  };
}

export function wordDiff(target, transcript) {
  const targetWords = normalizeText(target).split(' ').filter(Boolean);
  const spokenWords = normalizeText(transcript).split(' ').filter(Boolean);
  const m = targetWords.length;
  const n = spokenWords.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (targetWords[i - 1] === spokenWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && targetWords[i - 1] === spokenWords[j - 1]) {
      result.unshift({ type: 'correct', target: targetWords[i - 1], spoken: spokenWords[j - 1] });
      i -= 1;
      j -= 1;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'extra', target: '', spoken: spokenWords[j - 1] });
      j -= 1;
    } else {
      result.unshift({ type: 'missing', target: targetWords[i - 1], spoken: '' });
      i -= 1;
    }
  }

  return result;
}

export function buildHint(target, transcript, hintTags = []) {
  const targetWords = normalizeText(target).split(' ').filter(Boolean);
  const spokenWords = normalizeText(transcript).split(' ').filter(Boolean);
  const len = Math.min(targetWords.length, spokenWords.length);

  for (let i = 0; i < len; i += 1) {
    const key = `${spokenWords[i]}->${targetWords[i]}`;
    if (CONFUSION_HINTS[key]) return CONFUSION_HINTS[key];
  }

  for (const tag of hintTags) {
    if (HINT_TAGS[tag]) return HINT_TAGS[tag];
  }

  return 'Tip: Slow down and stress each word rhythmically, then try once more.';
}

export function buildVariation(phrase, attemptIndex = 0) {
  const template = VARIATION_TEMPLATES[attemptIndex % VARIATION_TEMPLATES.length];
  return template.replace('{phrase}', normalizeText(phrase));
}

export function intelligibilityLevel(successRate) {
  if (successRate >= 0.9) return 'Effortless';
  if (successRate >= 0.75) return 'Clear';
  if (successRate >= 0.5) return 'Understandable';
  return 'Emerging';
}
