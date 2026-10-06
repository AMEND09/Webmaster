// All learner progress lives here and is mirrored to localStorage.
import { lessons } from './data/lessons.js';
import { cases } from './data/cases.js';
import { badges, badgeById } from './badges.js';

const KEY = 'learnai:v1';

export const STEP_XP = 20;
export const MEDAL_XP = { B: 60, S: 90, G: 120 };
export const MEDAL_NAME = { B: 'Bronze', S: 'Silver', G: 'Gold' };
const MEDAL_RANK = { B: 1, S: 2, G: 3 };

function fresh() {
  return {
    name: '',
    theme: null, // null = follow the OS
    xp: 0,
    steps: {}, // lessonId -> [completed step indexes]
    medals: {}, // lessonId -> 'B' | 'S' | 'G'
    best: {}, // lessonId -> best score out of 5
    cases: {}, // caseId -> { found: [], checked: [], hints: 0, fixed: false, done: false }
    badges: {}, // badgeId -> ISO date earned
    seen: [], // badge ids the learner has already looked at
    days: [], // YYYY-MM-DD days with study activity
    bestStreak: 0,
    combo: 0,
    tourDone: false,
    lab: { tabs: [], mission: false },
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const base = fresh();
      return { ...base, ...saved, lab: { ...base.lab, ...(saved.lab || {}) } };
    }
  } catch {
    /* storage unavailable or corrupt: start fresh */
  }
  return fresh();
}

export const app = $state(load());

const mq = matchMedia('(prefers-color-scheme: dark)');
const sys = $state({ dark: mq.matches });
mq.addEventListener('change', (e) => (sys.dark = e.matches));

/** The theme actually in use: the saved choice, or the OS preference. */
export function theme() {
  return app.theme ?? (sys.dark ? 'dark' : 'light');
}

/** Transient UI notifications (XP pops, badge unlocks). Not persisted. */
export const toasts = $state([]);
let toastId = 0;

export function toast(t) {
  const id = ++toastId;
  toasts.push({ id, ...t });
  if (toasts.length > 4) toasts.splice(0, toasts.length - 4);
  setTimeout(() => {
    const i = toasts.findIndex((x) => x.id === id);
    if (i >= 0) toasts.splice(i, 1);
  }, t.kind === 'badge' ? 4200 : 2400);
}

$effect.root(() => {
  $effect(() => {
    const json = JSON.stringify(app);
    try { localStorage.setItem(KEY, json); } catch { /* ignore quota / private mode */ }
  });
  $effect(() => {
    document.documentElement.dataset.theme = theme();
  });
});

/* ---------------- dates & streaks ---------------- */

export function dayKey(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function currentStreak() {
  const set = new Set(app.days);
  const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1); // streak survives until you miss a full day
  let n = 0;
  while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

function markActive() {
  const k = dayKey();
  if (!app.days.includes(k)) app.days.push(k);
  app.bestStreak = Math.max(app.bestStreak, currentStreak());
  const h = new Date().getHours();
  if (h < 5) award('night-owl');
}

/* ---------------- levels ---------------- */

const need = (lvl) => 100 + 50 * (lvl - 1); // XP to go from lvl to lvl+1

export function levelInfo(xp = app.xp) {
  let level = 1, floor = 0;
  while (xp >= floor + need(level)) { floor += need(level); level++; }
  return { level, into: xp - floor, span: need(level), toNext: floor + need(level) - xp };
}

export const levelRewards = [
  { level: 2, name: 'Mint frame', color: '#6fdcb0' },
  { level: 4, name: 'Electric frame', color: '#3a5bff' },
  { level: 6, name: 'Tomato frame', color: '#ff5a36' },
  { level: 8, name: 'Circuit Board frame', color: '#9b6bff' },
  { level: 10, name: 'Gold frame', color: '#ffc531' },
];

export function avatarFrame(level = levelInfo().level) {
  let c = null;
  for (const r of levelRewards) if (level >= r.level) c = r.color;
  return c;
}

export function initials(name = app.name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'ME';
  return (parts[0][0] + (parts[1]?.[0] ?? parts[0][1] ?? '')).toUpperCase();
}

/* ---------------- xp & badges ---------------- */

export function addXP(n, label) {
  if (n <= 0) return;
  const before = levelInfo().level;
  app.xp += n;
  markActive();
  toast({ kind: 'xp', text: `+${n} XP`, sub: label });
  const after = levelInfo().level;
  if (after > before) toast({ kind: 'level', text: `Level ${after}!`, sub: 'Keep climbing' });
  checkBadges();
}

export function award(id) {
  if (app.badges[id] || !badgeById[id]) return;
  app.badges[id] = new Date().toISOString();
  toast({ kind: 'badge', badge: id, text: badgeById[id].name, sub: 'New sticker!' });
}

export function checkBadges() {
  for (const b of badges) if (b.check && !app.badges[b.id] && b.check(app, lessons, cases)) award(b.id);
}

/* ---------------- lessons ---------------- */

export function lessonIndex(id) {
  return lessons.findIndex((l) => l.id === id);
}

export function isUnlocked(i) {
  return i === 0 || !!app.medals[lessons[i - 1]?.id];
}

/** The first unlocked lesson without a medal (or null when everything is done). */
export function currentLesson() {
  for (let i = 0; i < lessons.length; i++) if (!app.medals[lessons[i].id]) return lessons[i];
  return null;
}

export function stepsDone(id) {
  return app.steps[id] ?? [];
}

export function completeStep(id, idx) {
  if (!app.steps[id]) app.steps[id] = [];
  if (app.steps[id].includes(idx)) return;
  app.steps[id].push(idx);
  addXP(STEP_XP, 'Step complete');
}

export function medalFor(score, total = 5) {
  const pct = score / total;
  if (pct >= 1) return 'G';
  if (pct >= 0.8) return 'S';
  if (pct >= 0.6) return 'B';
  return null;
}

/** Records a quiz result; returns { medal, xp, upgraded, unlocked }. */
export function recordQuiz(id, score, seconds) {
  const medal = medalFor(score);
  const prev = app.medals[id];
  app.best[id] = Math.max(app.best[id] ?? 0, score);
  let xp = 0, upgraded = false, unlocked = null;
  if (medal && (!prev || MEDAL_RANK[medal] > MEDAL_RANK[prev])) {
    xp = MEDAL_XP[medal] - (prev ? MEDAL_XP[prev] : 0);
    upgraded = !!prev;
    app.medals[id] = medal;
    if (!prev) unlocked = lessons[lessonIndex(id) + 1] ?? null;
  }
  if (upgraded) award('comeback');
  if (medal === 'G' && seconds < 60) award('quick-draw');
  if (xp) addXP(xp, `${MEDAL_NAME[medal]} medal`);
  else markActive();
  checkBadges();
  return { medal, xp, upgraded, unlocked, prev };
}

export function answered(correct) {
  app.combo = correct ? app.combo + 1 : 0;
  if (app.combo >= 5) award('combo-5');
}

/* ---------------- detective ---------------- */

export function caseState(id) {
  if (!app.cases[id]) app.cases[id] = { found: [], checked: [], hints: 0, fixed: false, done: false };
  return app.cases[id]; // re-read so we get the reactive proxy
}

/* ---------------- misc ---------------- */

export function setTheme(t) {
  app.theme = t;
  if (t === 'dark') award('dark-side');
}

export function resetProgress() {
  const theme = app.theme;
  Object.assign(app, fresh(), { theme });
}
