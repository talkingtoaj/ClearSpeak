export const PHRASES = [
  // A1 — very short, high frequency
  { phrase_id: 'p01', target_text: 'Thank you', difficulty_level: 'A1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p02', target_text: 'Very good', difficulty_level: 'A1', hint_tags: ['V_W_HINT'] },
  { phrase_id: 'p03', target_text: 'We want water', difficulty_level: 'A1', hint_tags: ['V_W_HINT'] },
  { phrase_id: 'p04', target_text: 'Red and blue', difficulty_level: 'A1', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p05', target_text: 'Right here', difficulty_level: 'A1', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p06', target_text: 'Help me', difficulty_level: 'A1', hint_tags: ['H_SOUND_HINT'] },
  { phrase_id: 'p07', target_text: 'Please', difficulty_level: 'A1', hint_tags: ['P_B_HINT'] },
  { phrase_id: 'p08', target_text: 'This one', difficulty_level: 'A1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p09', target_text: 'How are you', difficulty_level: 'A1', hint_tags: ['H_SOUND_HINT'] },
  // A2 — simple sentences (semantic pairs where possible)
  { phrase_id: 'p10', target_text: 'I think so', difficulty_level: 'A2', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p11', target_text: 'Have a think', difficulty_level: 'A2', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p12', target_text: 'I really like rice', difficulty_level: 'A2', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p13', target_text: 'Right or left', difficulty_level: 'A2', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p14', target_text: 'Very nice', difficulty_level: 'A2', hint_tags: ['V_W_HINT'] },
  { phrase_id: 'p15', target_text: 'We went there', difficulty_level: 'A2', hint_tags: ['V_W_HINT'] },
  { phrase_id: 'p16', target_text: 'No problem', difficulty_level: 'A2', hint_tags: ['P_B_HINT'] },
  { phrase_id: 'p17', target_text: 'Leave it here', difficulty_level: 'A2', hint_tags: ['F_V_HINT', 'H_SOUND_HINT'] },
  { phrase_id: 'p18', target_text: 'Can you help me', difficulty_level: 'A2', hint_tags: ['H_SOUND_HINT'] },
  { phrase_id: 'p19', target_text: 'Something to drink', difficulty_level: 'A2', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p20', target_text: 'The sheep is big', difficulty_level: 'A2', hint_tags: ['VOWEL_LENGTH_HINT'] },
  { phrase_id: 'p21', target_text: 'The ship is here', difficulty_level: 'A2', hint_tags: ['VOWEL_LENGTH_HINT'] },
  { phrase_id: 'p22', target_text: 'Sing a song', difficulty_level: 'A2', hint_tags: ['NG_HINT'] },
  // B1 — longer / natural
  { phrase_id: 'p23', target_text: 'This weather is nice', difficulty_level: 'B1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p24', target_text: 'Please call me later', difficulty_level: 'B1', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p25', target_text: 'Thank you for your help', difficulty_level: 'B1', hint_tags: ['TH_SOUND_HINT', 'H_SOUND_HINT'] },
  { phrase_id: 'p26', target_text: 'Every week', difficulty_level: 'B1', hint_tags: ['V_W_HINT'] },
  { phrase_id: 'p27', target_text: 'I live here', difficulty_level: 'B1', hint_tags: ['F_V_HINT'] },
  { phrase_id: 'p28', target_text: 'Park the car', difficulty_level: 'B1', hint_tags: ['P_B_HINT'] },
  { phrase_id: 'p29', target_text: 'Nothing for now', difficulty_level: 'B1', hint_tags: ['TH_SOUND_HINT'] },
  { phrase_id: 'p30', target_text: 'Going home', difficulty_level: 'B1', hint_tags: ['NG_HINT'] },
  { phrase_id: 'p31', target_text: 'Really correct', difficulty_level: 'B1', hint_tags: ['R_L_HINT'] },
  { phrase_id: 'p32', target_text: 'Have a good day', difficulty_level: 'B1', hint_tags: ['H_SOUND_HINT'] },
  { phrase_id: 'p33', target_text: 'Both of them', difficulty_level: 'B1', hint_tags: ['TH_SOUND_HINT'] }
];

export const CONFUSION_HINTS = {
  // TH sound
  'sink->think': 'Tip: English "th" is made by placing your tongue lightly between your teeth and pushing air out.',
  'fink->think': 'Tip: Keep your tongue visible for "th" instead of using an "f" lip sound.',
  'tink->think': 'Tip: Use "th" with tongue between teeth, not "t".',
  'tank->thank': 'Tip: "Thank" starts with "th" — tongue between teeth, then air.',
  'dis->this': 'Tip: Start "this" with voiced "th" — tongue between teeth, then vibrate your voice.',
  'dat->that': 'Tip: "That" uses voiced "th". Tongue between teeth, add voice.',
  'wit->with': 'Tip: End "with" with voiced "th", not "t".',
  'sumting->something': 'Tip: "Something" has "th" in the middle — tongue between teeth.',
  'noding->nothing': 'Tip: "Nothing" has "th" — tongue between teeth.',
  'bof->both': 'Tip: "Both" ends with voiceless "th".',
  'dem->them': 'Tip: "Them" uses voiced "th". Tongue between teeth, add voice.',
  // R vs L
  'lice->rice': 'Tip: For English "r", round your lips slightly and do not touch the tongue tip to the roof of your mouth.',
  'light->right': 'Tip: "r" and "l" need different tongue shapes. Keep tongue back for "r".',
  'collect->correct': 'Tip: "Correct" has "r" — tongue back, lips rounded; not "l".',
  'lane->rain': 'Tip: "Rain" starts with "r". Round lips, tongue back.',
  'law->raw': 'Tip: "Raw" has "r" at the start. Keep tongue back.',
  'claw->call': 'Tip: Hold the vowel in "call" a little longer; avoid adding an extra final sound.',
  'lip->rip': 'Tip: "Rip" starts with "r" — tongue back, rounded lips.',
  'lock->rock': 'Tip: "Rock" has "r". Don\'t use "l" — tongue tip up for "l".',
  // V vs W
  'wery->very': 'Tip: "Very" starts with "v" — top teeth on bottom lip, buzz.',
  've->we': 'Tip: "We" starts with "w" — round your lips, no teeth on lip.',
  'wine->vine': 'Tip: "Vine" has "v" — teeth on bottom lip, voice.',
  'west->vest': 'Tip: "Vest" has "v" — teeth on lip, buzz.',
  'wanted->vanted': 'Tip: "Want" has "w" — round lips like "oo".',
  // F vs V
  'leafe->leave': 'Tip: "Leave" has "v" — same lip position as "f" but add voice.',
  'lif->live': 'Tip: "Live" has "v" — teeth on lip, vibrate.',
  'fery->very': 'Tip: "Very" uses "v" (voice), not "f" (no voice).',
  'foice->voice': 'Tip: "Voice" starts with "v" — add vocal vibration.',
  'off->of': 'Tip: "Of" is pronounced with "v", not "f".',
  // P vs B
  'bark->park': 'Tip: "Park" starts with "p" — puff of air, no voice.',
  'bat->pat': 'Tip: "Pat" has "p" — burst of air, no vocal buzz.',
  'big->pig': 'Tip: "Pig" starts with "p" — no voice on the first sound.',
  'blease->please': 'Tip: "Please" starts with "p" — puff of air.',
  'broblem->problem': 'Tip: "Problem" starts with "p" — no voice.',
  'barking->parking': 'Tip: "Parking" has "p" — puff, not "b".',
  // H sound
  'elp->help': 'Tip: "Help" starts with a light "h" breath before "elp".',
  'ere->here': 'Tip: "Here" starts with "h" — gentle breath from throat.',
  'ow->how': 'Tip: "How" starts with "h". Don\'t drop it.',
  'ave->have': 'Tip: "Have" starts with "h" — light breath, then "av".',
  // Vowel length (ship/sheep, sit/seat)
  'ship->sheep': 'Tip: "Sheep" has long "ee" — hold it longer; "ship" has short "i".',
  'sit->seat': 'Tip: "Seat" has long "ee"; "sit" has short "i".',
  'bit->beat': 'Tip: "Beat" has long "ee"; "bit" has short "i".',
  'full->fool': 'Tip: "Fool" has long "oo"; "full" has short "u".',
  // NG sound
  'sink->sing': 'Tip: "Sing" ends with "ng" — back of tongue up, air through nose; no "k" sound.',
  'tink->thing': 'Tip: "Thing" has "ng" at the end — nasal, no "k".',
  'goin->going': 'Tip: "Going" ends with "ng" — one sound, not "n" + "g".'
};

export const HINT_TAGS = {
  TH_SOUND_HINT: 'Tip: Practice "th" slowly: tongue out slightly, soft airflow, then add voice for words like "this."',
  R_L_HINT: 'Tip: Contrast drill: "rice/lice", "right/light". Keep tongue back for "r", tongue tip up for "l".',
  V_W_HINT: 'Tip: "V" = teeth on bottom lip, buzz. "W" = rounded lips, no teeth. Practice: vine/wine, very/wary.',
  F_V_HINT: 'Tip: Same lip position for "f" and "v". "F" is just air; "v" adds voice. Word "of" uses "v".',
  P_B_HINT: 'Tip: "P" = puff of air, no voice. "B" = add voice. Don\'t say "b" for "p" (e.g. park, please).',
  H_SOUND_HINT: 'Tip: Light breath from the throat before the vowel. Don\'t drop "h" in how, have, here, help.',
  VOWEL_LENGTH_HINT: 'Tip: Short "i" (ship, sit) is brief; long "ee" (sheep, seat) is longer. Practice the pair.',
  NG_HINT: 'Tip: Back of tongue to soft palate, air through nose. Don\'t add "g" after -ing (sing, not sing-g).'
};

export const VARIATION_TEMPLATES = [
  '{phrase} today',
  'Honestly, {phrase}',
  '{phrase} for now',
  'In this case, {phrase}'
];
