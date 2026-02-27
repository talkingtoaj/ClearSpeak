export const PHRASES = [
  { phrase_id: 'p1', target_text: 'I think so', difficulty_level: 'A2', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p2', target_text: 'I really like rice', difficulty_level: 'A2', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p3', target_text: 'Can you help me', difficulty_level: 'A2', hint_tags: [] },
  { phrase_id: 'p4', target_text: 'This weather is nice', difficulty_level: 'B1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p5', target_text: 'Please call me later', difficulty_level: 'B1', hint_tags: ['R_L_HINT'] }
];

export const CONFUSION_HINTS = {
  'sink->think': 'Tip: English "th" is made by placing your tongue lightly between your teeth and pushing air out.',
  'fink->think': 'Tip: Keep your tongue visible for "th" instead of using an "f" lip sound.',
  'dis->this': 'Tip: Start "this" with voiced "th" — tongue between teeth, then vibrate your voice.',
  'lice->rice': 'Tip: For English "r", round your lips slightly and do not touch the tongue tip to the roof of your mouth.',
  'light->right': 'Tip: "r" and "l" need different tongue shapes. Keep tongue back for "r".',
  'claw->call': 'Tip: Hold the vowel in "call" a little longer; avoid adding an extra final sound.'
};

export const HINT_TAGS = {
  TH_SOUND_HINT: 'Tip: Practice “th” slowly: tongue out slightly, soft airflow, then add voice for words like “this.”',
  R_L_HINT: 'Tip: Contrast drill: “rice/lice”, “right/light”. Keep tongue back for “r”, tongue tip up for “l”.'
};

export const VARIATION_TEMPLATES = [
  '{phrase} today',
  'Honestly, {phrase}',
  '{phrase} for now',
  'In this case, {phrase}'
];
