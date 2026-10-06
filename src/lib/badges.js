// Rarity colours: [background, text, full name]
export const rarity = {
  C: ['#d6d0c2', '#111', 'Common'],
  UC: ['#6fdcb0', '#111', 'Uncommon'],
  R: ['#3a5bff', '#fff', 'Rare'],
  E: ['#9b6bff', '#fff', 'Epic'],
  L: ['#ffc531', '#111', 'Legendary'],
};

const medalsIn = (s, zone, lessons) => lessons.filter((l) => l.zone === zone).every((l) => s.medals[l.id]);

// `check(state, lessons)` badges are evaluated after every action.
// Badges without `check` are awarded directly by the event that triggers them.
// `hidden` badges show as "???" until found.
export const badges = [
  { id: 'first-steps', name: 'First Steps', r: 'C', g: '01', desc: 'Finished your very first lesson step.', check: (s) => Object.keys(s.steps).length > 0 },
  { id: 'tour-guide', name: 'Tour Guide', r: 'C', g: '→', desc: 'Made it all the way through the intro tour.', check: (s) => s.tourDone },
  { id: 'night-owl', name: 'Night Owl', r: 'C', g: '☾', hidden: true, desc: 'Studied between midnight and 5 a.m. Go to bed!' },
  { id: 'water-saver', name: 'Water Saver', r: 'C', g: '≈', desc: 'Earned a medal in Water use.', check: (s) => !!s.medals['water-use'] },
  { id: 'dark-side', name: 'Dark Side', r: 'C', g: '◑', hidden: true, desc: 'Flipped the lights off. Welcome to dark mode.' },
  { id: 'prompt-pro', name: 'Prompt Pro', r: 'UC', g: '>_', desc: 'Got gold in Writing clear prompts.', check: (s) => s.medals['clear-prompts'] === 'G' },
  { id: 'fact-checker', name: 'Fact Checker', r: 'UC', g: '✓', desc: 'Closed your first AI Detective case.', check: (s) => Object.values(s.cases).some((c) => c.done) },
  { id: 'streak-7', name: 'Streak ×7', r: 'UC', g: '7', desc: 'Studied seven days in a row.', check: (s) => s.bestStreak >= 7 },
  { id: 'comeback', name: 'Comeback Kid', r: 'UC', g: '↑', desc: 'Retook a quiz and upgraded your medal.' },
  { id: 'lab-rat', name: 'Lab Rat', r: 'UC', g: '⚗', desc: 'Opened every tab in the Network playground.', check: (s) => s.lab.tabs.length >= 3 },
  { id: 'weight-lifter', name: 'Weight Lifter', r: 'R', g: 'W', desc: 'Moved every weight in one layer of the network.' },
  { id: 'tinkerer', name: 'Tinkerer', r: 'R', g: '∿', desc: 'Made the network say dog with more than 70% confidence.' },
  { id: 'source-sleuth', name: 'Source Sleuth', r: 'R', g: '§', desc: 'Closed every AI Detective case.', check: (s, l, cases) => cases.every((c) => s.cases[c.id]?.done) },
  { id: 'combo-5', name: 'Combo ×5', r: 'R', g: '×5', hidden: true, desc: 'Five right answers in a row. On fire.' },
  { id: 'zone-foundations', name: 'Foundations Cleared', r: 'R', g: 'F', desc: 'Medal on every Foundations lesson.', check: (s, l) => medalsIn(s, 'foundations', l) },
  { id: 'zone-toolbox', name: 'Toolbox Cleared', r: 'R', g: 'T', desc: 'Medal on every Toolbox lesson.', check: (s, l) => medalsIn(s, 'toolbox', l) },
  { id: 'zone-ethics', name: 'Ethics Cleared', r: 'R', g: 'E', desc: 'Medal on every Ethics lesson.', check: (s, l) => medalsIn(s, 'ethics', l) },
  { id: 'gold-rush', name: 'Gold Rush', r: 'E', g: 'Au', desc: 'Collected five gold medals.', check: (s) => Object.values(s.medals).filter((m) => m === 'G').length >= 5 },
  { id: 'deepfake-spotter', name: 'Deepfake Spotter', r: 'E', g: '◐', desc: 'Got gold in Deepfakes.', check: (s) => s.medals.deepfakes === 'G' },
  { id: 'sharp-eye', name: 'Sharp Eye', r: 'E', g: '◎', desc: 'Closed a detective case without using a single hint.' },
  { id: 'quick-draw', name: 'Quick Draw', r: 'E', g: '⚡', hidden: true, desc: 'Gold on a quiz in under 60 seconds.' },
  { id: 'glitch-hunter', name: 'Glitch Hunter', r: 'L', g: '!?', hidden: true, desc: 'You found the broken pixel hiding somewhere on the site and clicked it.' },
  { id: 'cheat-code', name: 'Cheat Code', r: 'L', g: '↑↑', hidden: true, desc: 'Typed a very old cheat code. ↑ ↑ ↓ ↓ ← → ← → B A' },
  { id: 'perfectionist', name: 'Perfectionist', r: 'L', g: '★', desc: 'Gold on every single quiz.', check: (s, l) => l.every((x) => s.medals[x.id] === 'G') },
];

export const badgeById = Object.fromEntries(badges.map((b) => [b.id, b]));
