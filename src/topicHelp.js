/**
 * Topic help config: label, instructions, examples, and YouTube video ID per confusion topic.
 * Order here drives the "Progress by topic" list and which topics appear.
 */
export const TOPIC_HELP_ORDER = [
  'TH_SOUND_HINT',
  'R_L_HINT',
  'V_W_HINT',
  'F_V_HINT',
  'P_B_HINT',
  'H_SOUND_HINT',
  'VOWEL_LENGTH_HINT',
  'NG_HINT'
];

const TOPIC_HELP = {
  TH_SOUND_HINT: {
    id: 'TH_SOUND_HINT',
    label: 'TH sound',
    instructions: 'Practice “th” slowly: place your tongue lightly between your teeth and push air out. For voiced “th” (this, that), add voice; for unvoiced (think, thank), use only air. Keep your tongue visible instead of using “f” or “t”.',
    examples: ['think / sink', 'this / dis', 'thank / tank'],
    youtubeVideoId: '1Tor0LDdVKY'
  },
  R_L_HINT: {
    id: 'R_L_HINT',
    label: 'R vs L',
    instructions: 'For “r”: round your lips slightly and keep the tongue tip down and back—do not touch the roof of your mouth. For “l”: touch the tongue tip to the ridge behind your top front teeth. Contrast drill: rice/lice, right/light.',
    examples: ['rice / lice', 'right / light', 'correct / collect'],
    youtubeVideoId: 'LgQB2Pr7V20'
  },
  V_W_HINT: {
    id: 'V_W_HINT',
    label: 'V vs W',
    instructions: 'For “v”: place your top teeth on your bottom lip and push air through with voice (buzzing). For “w”: round your lips like a small “oo” and release; no teeth on lip.',
    examples: ['vine / wine', 'vest / west', 'very / wary'],
    youtubeVideoId: '7j44DsQodFs'
  },
  F_V_HINT: {
    id: 'F_V_HINT',
    label: 'F vs V',
    instructions: 'Same mouth position: top teeth on bottom lip. For “f” use only air; for “v” add vocal cord vibration. Word “of” uses “v”, not “f”.',
    examples: ['fan / van', 'safe / save', 'of (with v)'],
    youtubeVideoId: 'zMqYZno5OrY'
  },
  P_B_HINT: {
    id: 'P_B_HINT',
    label: 'P vs B',
    instructions: 'Both use closed lips. For “p”: build pressure and release with a puff of air, no voice. For “b”: add voice when you release. Don’t substitute “b” for “p” at the start of words.',
    examples: ['park / bark', 'pat / bat', 'pig / big'],
    youtubeVideoId: 'UgjcLdMHKpw'
  },
  H_SOUND_HINT: {
    id: 'H_SOUND_HINT',
    label: 'H sound',
    instructions: 'A gentle breath from the throat before the vowel. Don’t drop it (e.g. “how” not “ow”). Don’t make it harsh. Hold paper in front of your mouth—it should move slightly on “h”.',
    examples: ['how / ow', 'have / ave', 'here / ear'],
    youtubeVideoId: '7AMklpPPIT8'
  },
  VOWEL_LENGTH_HINT: {
    id: 'VOWEL_LENGTH_HINT',
    label: 'Short vs long vowels (e.g. ship/sheep)',
    instructions: 'Short “i” (ship, sit): tongue slightly lower, jaw relaxed, sound is brief. Long “ee” (sheep, seat): tongue high and front, sound is longer. Many languages don’t distinguish these—practice minimal pairs.',
    examples: ['ship / sheep', 'sit / seat', 'bit / beat'],
    youtubeVideoId: '32bpbQYoTKE'
  },
  NG_HINT: {
    id: 'NG_HINT',
    label: 'NG sound (sing, thing)',
    instructions: 'Back of the tongue touches the soft palate; air goes through the nose. Don’t add a hard “g” after “-ing” (say “sing” not “sing-g”). Don’t confuse with “nk” (sink vs sing).',
    examples: ['sing / sink', 'thing / think', 'going (one sound)'],
    youtubeVideoId: '5xVq8T88oJw'
  }
};

/**
 * @param {string} id - topic id (e.g. TH_SOUND_HINT)
 * @returns {{ id: string, label: string, instructions: string, examples: string[], youtubeVideoId: string } | undefined}
 */
export function getTopicHelp(id) {
  return TOPIC_HELP[id];
}
