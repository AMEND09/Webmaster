<script>
  import { lessons } from '../lib/data/lessons.js';
  import { zones } from '../lib/data/zones.js';
  import { cases } from '../lib/data/cases.js';
  import { badges, badgeById } from '../lib/badges.js';
  import {
    app, levelInfo, levelRewards, currentLesson, currentStreak, dayKey, isUnlocked, lessonIndex,
    stepsDone, STEP_XP, MEDAL_XP, MEDAL_NAME, initials, avatarFrame, resetProgress, setTheme,
  } from '../lib/store.svelte.js';
  import Sticker from '../lib/components/Sticker.svelte';

  let lvl = $derived(levelInfo(app.xp));
  let streak = $derived(currentStreak());
  let next = $derived(currentLesson());
  let reward = $derived(levelRewards.find((r) => r.level > lvl.level));
  let editing = $state(!app.name);
  let draft = $state(app.name);

  let zoneRows = $derived(zones.map((z) => {
    const ls = lessons.filter((l) => l.zone === z.id);
    const m = ls.map((l) => app.medals[l.id]).filter(Boolean);
    const count = (k) => m.filter((x) => x === k).length;
    return { z, total: ls.length, done: m.length, g: count('G'), s: count('S'), b: count('B'), locked: !isUnlocked(lessonIndex(ls[0].id)) };
  }));

  let openCase = $derived(cases.find((c) => app.cases[c.id] && !app.cases[c.id].done) ?? cases.find((c) => !app.cases[c.id]?.done));
  let retake = $derived(lessons.find((l) => app.medals[l.id] === 'B') ?? lessons.find((l) => app.medals[l.id] === 'S'));
  let zoneLeft = $derived(next ? lessons.filter((l) => l.zone === next.zone && !app.medals[l.id]).length : 0);
  let casesLeft = $derived(cases.filter((c) => !app.cases[c.id]?.done).length);

  // Monday-first week
  let week = $derived.by(() => {
    const d = new Date();
    const offset = (d.getDay() + 6) % 7;
    const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - offset);
    return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((n, i) => {
      const day = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i);
      return { n, on: app.days.includes(dayKey(day)), today: i === offset };
    });
  });

  let earned = $derived(Object.entries(app.badges).sort((a, b) => b[1].localeCompare(a[1])).map(([id]) => badgeById[id]).filter(Boolean));

  function saveName(e) {
    e.preventDefault();
    app.name = draft.trim().slice(0, 24);
    editing = false;
  }
  function reset() {
    if (confirm('Erase all your XP, medals and badges on this device? This can’t be undone.')) { resetProgress(); draft = ''; editing = true; }
  }
</script>

<div class="page">
  <div class="hello">
    {#if editing}
      <form class="nameform" onsubmit={saveName}>
        <label class="display" for="nm">Hey! What should we call you?</label>
        <div class="nrow">
          <input id="nm" bind:value={draft} placeholder="Your first name" maxlength="24" autocomplete="given-name" />
          <button class="btn btn-sm btn-primary">Save</button>
        </div>
        <span class="muted small">Stays on this device. No account needed.</span>
      </form>
    {:else}
      <h1 class="page-title">Hey {app.name}, welcome {app.xp ? 'back' : 'in'}.</h1>
      <button class="btn-link" onclick={() => { draft = app.name; editing = true; }}>edit name</button>
    {/if}
    {#if streak > 0}<div class="hand streak">{streak}-day streak!</div>{/if}
  </div>

  <div class="grid">
    <div class="levelcard">
      <div class="ring" style:background="conic-gradient(var(--yellow) 0 {(lvl.into / lvl.span) * 100}%, rgba(255,255,255,.25) 0 100%)">
        <div class="inner"><div class="mono">LEVEL</div><div class="display lv">{lvl.level}</div></div>
      </div>
      <div class="mono">{app.xp.toLocaleString()} XP · {lvl.into} / {lvl.span} this level</div>
      <div class="lnote">
        {lvl.toNext} XP to Level {lvl.level + 1}{#if reward && reward.level === lvl.level + 1} and the <b>{reward.name}</b>{/if}
      </div>
      <div class="me">
        <span class="avatar" style:box-shadow={avatarFrame(lvl.level) ? `0 0 0 3px #3a5bff, 0 0 0 6px ${avatarFrame(lvl.level)}` : null}>{initials(app.name)}</span>
        <div class="frames">
          {#each levelRewards as r}
            <span class="fr" class:got={lvl.level >= r.level} style:background={lvl.level >= r.level ? r.color : 'transparent'} title="{r.name} · Level {r.level}"></span>
          {/each}
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card box">
        <div class="display h">Zones</div>
        {#each zoneRows as r}
          <div class="zrow">
            <span>{r.z.name}</span>
            <div class="zbar"><div style:width="{(r.done / r.total) * 100}%" style:background={r.z.bg} class:fill={r.done}></div></div>
            <span class="mono zs" class:dim={r.locked}>{r.locked ? `${r.done}/${r.total} · locked` : `${r.done}/${r.total} · ${r.g}G ${r.s}S ${r.b}B`}</span>
          </div>
        {/each}
      </div>

      <div class="card box">
        <div class="hrow"><span class="display h">Up next</span><span class="mono dim2">{zoneLeft} LESSONS · {casesLeft} CASES LEFT</span></div>
        {#if next}
          <a class="item hot" href="#/lesson/{next.id}">
            <span class="ic play">▶</span>
            <div class="it"><div class="b">{next.title}</div><div class="s">Lesson · {next.minutes} min · {stepsDone(next.id).length}/{next.steps.length} steps</div></div>
            <span class="mono xp">+{next.steps.length * STEP_XP + MEDAL_XP.G} XP</span>
          </a>
        {:else}
          <div class="item hot"><span class="ic play">★</span><div class="it"><div class="b">Every lesson has a medal!</div><div class="s">Go for gold on the rest.</div></div></div>
        {/if}
        {#if openCase}
          {@const cs = app.cases[openCase.id]}
          <a class="item" href="#/detective/{openCase.id}">
            <span class="ic mono">#{openCase.id}</span>
            <div class="it"><div class="b">{cs?.found.length ? 'Finish' : 'Open'}: {openCase.title}</div><div class="s muted">Detective · {3 - (cs?.found.length ?? 0)} clue{3 - (cs?.found.length ?? 0) === 1 ? '' : 's'} left</div></div>
            <span class="mono xp">+{openCase.xp} XP</span>
          </a>
        {/if}
        {#if retake}
          <a class="item" href="#/quiz/{retake.id}">
            <span class="medal {app.medals[retake.id]} ic2">{app.medals[retake.id]}</span>
            <div class="it"><div class="b">Retake: {retake.title} quiz</div><div class="s muted">{MEDAL_NAME[app.medals[retake.id]]} → go for {app.medals[retake.id] === 'B' ? 'silver' : 'gold'}</div></div>
            <span class="mono xp">+{app.medals[retake.id] === 'B' ? MEDAL_XP.S - MEDAL_XP.B : MEDAL_XP.G - MEDAL_XP.S} XP</span>
          </a>
        {/if}
      </div>
    </div>

    <div class="col">
      <div class="card box">
        <div class="display h">This week</div>
        <div class="week mono">
          {#each week as d}
            <div class="day"><span class="sq" class:on={d.on} class:today={d.today}></span>{d.n}</div>
          {/each}
        </div>
        <div class="muted small">Best streak: {app.bestStreak} day{app.bestStreak === 1 ? '' : 's'}</div>
      </div>

      <div class="card box">
        <div class="hrow"><span class="display h">New badges</span><a class="small" href="#/badges">See all</a></div>
        {#if earned.length}
          <div class="bdg">
            {#each earned.slice(0, 3) as b, i}<Sticker badge={b} size={52} rot={[-6, 4, -2][i]} tag={false} />{/each}
          </div>
        {:else}
          <div class="muted small">None yet. Finish a lesson step to grab your first.</div>
        {/if}
        <div class="muted small">{earned.length} of {badges.length} collected</div>
      </div>

      <div class="card box settings">
        <div class="display h">Settings</div>
        <div class="themes">
          {#each [[null, 'Auto'], ['light', 'Light'], ['dark', 'Dark']] as [v, n]}
            <button class="chip" class:on={app.theme === v} onclick={() => setTheme(v)}>{n}</button>
          {/each}
        </div>
        <button class="btn-link danger" onclick={reset}>Reset all progress</button>
      </div>
    </div>
  </div>
</div>

<style>
  .hello { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-top: 2px; }
  .streak { font-size: 24px; color: var(--tomato); transform: rotate(-3deg); }
  .nameform { display: flex; flex-direction: column; gap: 10px; }
  .nameform label { font-size: 32px; letter-spacing: -.5px; }
  .nrow { display: flex; gap: 10px; }
  .nrow input {
    font: 600 17px var(--f-body); padding: 10px 14px; border: 2.5px solid var(--ink); border-radius: 10px; background: var(--card); color: var(--ink); min-width: 0; width: 280px;
  }
  .small { font-size: 13px; }

  .grid { display: grid; grid-template-columns: 330px minmax(0, 1fr) 300px; gap: 24px; padding-top: 24px; align-items: start; }
  .levelcard {
    background: var(--blue); color: #fff; border: 3px solid #111; box-shadow: 6px 6px 0 #111; border-radius: 18px;
    padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center;
  }
  .ring { width: 190px; height: 190px; border-radius: 50%; border: 3px solid #111; display: grid; place-items: center; }
  .inner { width: 140px; height: 140px; border-radius: 50%; background: var(--blue); border: 3px solid #111; display: grid; place-content: center; }
  .inner .mono { font-size: 12px; }
  .lv { font-size: 60px; line-height: 1; }
  .levelcard > .mono { font-size: 14px; }
  .lnote { font-size: 14px; }
  .me { display: flex; align-items: center; gap: 14px; margin-top: 4px; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--pink); color: #111; border: 2.5px solid #111; display: grid; place-items: center; font-family: var(--f-display); }
  .frames { display: flex; gap: 6px; }
  .fr { width: 16px; height: 16px; border-radius: 50%; border: 2px dashed rgba(255, 255, 255, .7); }
  .fr.got { border: 2px solid #111; }

  .col { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
  .box { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .h { font-size: 19px; }
  .hrow { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .dim2 { font-size: 12px; color: var(--muted); }
  .zrow { display: grid; grid-template-columns: 100px minmax(0, 1fr) 120px; gap: 14px; align-items: center; font-weight: 700; font-size: 14px; }
  .zbar { height: 18px; border: 2.5px solid var(--ink); border-radius: 999px; overflow: hidden; background: var(--paper); }
  .zbar > div { height: 100%; }
  .zbar > .fill { border-right: 2.5px solid var(--ink); }
  .zs { font-size: 12px; }
  .zs.dim { color: var(--faint); }
  .item { display: flex; align-items: center; gap: 14px; padding: 12px; border: 2px dashed var(--ink); border-radius: 12px; text-decoration: none; color: var(--ink); }
  .item:hover { transform: translate(-1px, -1px); }
  .item.hot { border: 2.5px solid var(--hard); background: var(--yellow); color: #111; }
  .ic { width: 36px; height: 36px; flex: none; border-radius: 50%; border: 2.5px solid var(--ink); display: grid; place-items: center; font-size: 11px; }
  .ic.play { background: var(--tomato); color: #fff; border-color: #111; font-size: 13px; }
  .ic2 { width: 36px; height: 36px; font-size: 13px; }
  .it { flex: 1; min-width: 0; }
  .b { font-weight: 700; }
  .s { font-size: 13px; }
  .xp { font-size: 13px; white-space: nowrap; }

  .week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center; font-size: 11px; }
  .day { display: flex; flex-direction: column; gap: 5px; align-items: center; }
  .sq { width: 30px; height: 30px; border-radius: 8px; border: 2px dashed var(--ink); }
  .sq.on { background: var(--tomato); border-style: solid; }
  .sq.today { outline: 2px solid var(--yellow); outline-offset: 2px; }
  .bdg { display: flex; gap: 16px; padding: 6px 4px; }
  .themes { display: flex; gap: 6px; }
  .themes .chip { background: transparent; cursor: pointer; }
  .themes .chip.on { background: var(--yellow); color: #111; }
  .danger { color: var(--tomato); align-self: flex-start; }

  @media (max-width: 1150px) {
    .grid { grid-template-columns: 300px minmax(0, 1fr); }
    .grid > .col:last-child { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 800px) {
    .grid { grid-template-columns: 1fr; }
    .grid > .col:last-child { grid-template-columns: 1fr; }
    .zrow { grid-template-columns: 90px minmax(0, 1fr); }
    .zs { grid-column: 1 / -1; margin-top: -8px; }
    .nameform label { font-size: 24px; }
  }
</style>
