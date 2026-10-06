<script>
  import { onDestroy } from 'svelte';
  import { lessons } from '../lib/data/lessons.js';
  import { app, isUnlocked, lessonIndex, recordQuiz, answered, MEDAL_NAME, MEDAL_XP } from '../lib/store.svelte.js';
  import NotFound from './NotFound.svelte';

  // Pages remount on every route change (App.svelte {#key}), so props are read once.
  let { id } = $props();
  // svelte-ignore state_referenced_locally
  const i = lessonIndex(id);
  const lesson = lessons[i];
  const qs = lesson?.quiz ?? [];
  const letters = ['A', 'B', 'C', 'D'];

  let q = $state(0);
  let picked = $state(null);
  let revealed = $state(false);
  let score = $state(0);
  let streak = $state(0);
  let secs = $state(0);
  let result = $state(null);
  const started = Date.now();
  let qStart = Date.now();

  const tick = setInterval(() => { if (!revealed && !result) secs = Math.floor((Date.now() - qStart) / 1000); }, 250);
  onDestroy(() => clearInterval(tick));

  let cur = $derived(qs[q]);
  let pct = $derived((score / qs.length) * 100);
  let fmt = $derived(`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`);

  function lockIn() {
    if (picked === null || revealed) return;
    revealed = true;
    const ok = picked === cur.answer;
    if (ok) { score++; streak++; } else streak = 0;
    answered(ok);
  }

  function next() {
    if (q < qs.length - 1) {
      q++; picked = null; revealed = false; secs = 0; qStart = Date.now();
    } else {
      result = recordQuiz(id, score, (Date.now() - started) / 1000);
    }
  }

  function retake() {
    q = 0; picked = null; revealed = false; score = 0; streak = 0; secs = 0; result = null; qStart = Date.now();
  }

  function onkeydown(e) {
    if (result || !lesson) return;
    const k = e.key.toLowerCase();
    if (!revealed && ['a', 'b', 'c', 'd', '1', '2', '3', '4'].includes(k)) picked = 'abcd1234'.indexOf(k) % 4;
    if (e.key === 'Enter') revealed ? next() : lockIn();
  }
</script>

<svelte:window {onkeydown} />

{#if !lesson}
  <NotFound />
{:else if !isUnlocked(i)}
  <div class="page"><div class="card-lg box"><h1 class="page-title">Locked</h1><p class="muted">Finish “{lessons[i - 1].title}” first.</p><a class="btn btn-primary" href="#/map">Back to the map</a></div></div>
{:else if result}
  {@const m = result.medal}
  <div class="page center">
    <div class="card-lg box result">
      {#if m}
        <div class="bigmedal {m}">{m}</div>
        <div class="eyebrow">{MEDAL_NAME[m].toUpperCase()} MEDAL · {score} / {qs.length}</div>
        <h1 class="page-title">{m === 'G' ? 'Flawless.' : m === 'S' ? 'So close to gold!' : 'You passed!'}</h1>
        {#if result.xp}<div class="xpchip mono">+{result.xp} XP{result.upgraded ? ' · medal upgraded' : ''}</div>{/if}
        {#if result.unlocked}<p class="muted">You unlocked <b>{result.unlocked.title}</b>.</p>{/if}
        {#if result.prev && !result.xp}<p class="muted">Your best is still {MEDAL_NAME[app.medals[id]].toLowerCase()}. Keep trying for the upgrade.</p>{/if}
      {:else}
        <div class="bigmedal none">✕</div>
        <div class="eyebrow">{score} / {qs.length}</div>
        <h1 class="page-title">Not quite yet.</h1>
        <p class="muted">You need 3 of 5 for bronze. Skim the lesson again and come back. Retakes are free.</p>
      {/if}
      <div class="row">
        {#if result.unlocked}
          <a class="btn btn-primary" href="#/lesson/{result.unlocked.id}">Next: {result.unlocked.title} →</a>
        {:else if !m}
          <a class="btn btn-primary" href="#/lesson/{id}">Review the lesson</a>
        {:else if lessons[i + 1]}
          <a class="btn btn-primary" href="#/map">Back to the map →</a>
        {/if}
        {#if m !== 'G'}<button class="btn" onclick={retake}>Retake quiz</button>{/if}
      </div>
    </div>
  </div>
{:else}
  <div class="page quiz">
    <div class="track">
      <div class="trow mono">
        <a href="#/lesson/{id}" class="x" aria-label="Exit quiz">✕</a>
        <span class="tname">QUIZ · {lesson.title.toUpperCase()}</span>
        <span>SCORE SO FAR: {score} / {q + (revealed ? 1 : 0)}</span>
      </div>
      <div class="bar">
        <div class="fill" style:width="{pct}%"></div>
        <div class="tick" style="left:60%"></div>
        <div class="tick" style="left:80%"></div>
      </div>
      <div class="marks mono">
        <div class="mk" style="left:60%"><span class="medal B">B</span>60% · unlocks next</div>
        <div class="mk" style="left:80%"><span class="medal S">S</span>80%</div>
        <div class="mk end"><span class="medal G">G</span>100%</div>
      </div>
      <div class="pills mono">
        <span style:background="#e0a172">B 60%</span><span style:background="#d9dde3">S 80%</span><span style:background="#ffc531">G 100%</span>
      </div>
    </div>

    <div class="qcard card-lg">
      {#if streak >= 2}
        <div class="burst combo"><div>×{streak}<br><span>COMBO</span></div></div>
      {/if}
      <div class="qtop mono"><span class="qn">QUESTION {q + 1} OF {qs.length}</span><span>⏱ {fmt}</span></div>
      <h1 class="qtext">{cur.q}</h1>
      <div class="opts">
        {#each cur.options as o, k}
          {@const state = revealed ? (k === cur.answer ? 'right' : k === picked ? 'wrong' : 'dim') : k === picked ? 'pick' : ''}
          <button class="opt {state}" onclick={() => !revealed && (picked = k)} disabled={revealed} aria-pressed={k === picked}>
            <span class="l">{letters[k]}</span>{o}
          </button>
        {/each}
      </div>
      {#if revealed}
        <div class="explain" class:good={picked === cur.answer}>
          <span class="hand">{picked === cur.answer ? 'nailed it!' : 'not quite —'}</span>
          {cur.explain}
        </div>
      {/if}
      <div class="foot">
        <div class="muted fnote">Score at least bronze to unlock the next lesson. Retake anytime to upgrade your medal.</div>
        {#if revealed}
          <button class="btn btn-primary lock" onclick={next}>{q < qs.length - 1 ? 'Next question →' : 'See my medal →'}</button>
        {:else}
          <button class="btn btn-primary lock" onclick={lockIn} disabled={picked === null}>Lock it in</button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .quiz { display: flex; flex-direction: column; align-items: center; gap: 26px; padding-top: 34px; }
  .track { width: min(880px, 100%); display: flex; flex-direction: column; gap: 10px; }
  .trow { display: flex; justify-content: space-between; font-size: 12px; gap: 12px; }
  .x { display: none; text-decoration: none; font-size: 20px; }
  .bar { position: relative; height: 22px; border: 2.5px solid var(--ink); border-radius: 999px; background: var(--card); }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--mint); border-radius: 999px; transition: width .4s; }
  .tick { position: absolute; top: -6px; bottom: -6px; border-left: 3px dashed var(--ink); }
  .marks { position: relative; height: 44px; font-size: 12px; }
  .mk { position: absolute; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; white-space: nowrap; }
  .mk.end { right: 0; transform: none; }
  .pills { display: none; }

  .qcard { width: min(880px, 100%); padding: 34px 38px; display: flex; flex-direction: column; gap: 24px; position: relative; border-radius: 20px; box-shadow: 8px 8px 0 var(--ink); }
  .combo {
    position: absolute; right: -30px; top: -26px; width: 96px; height: 96px; background: var(--tomato); color: #fff;
    transform: rotate(10deg); font-family: var(--f-display); font-size: 20px; line-height: 1;
    animation: pop .35s cubic-bezier(.3, 1.6, .5, 1);
  }
  .combo span { font-size: 11px; }
  @keyframes pop { from { transform: rotate(10deg) scale(.3); } }
  .qtop { display: flex; gap: 16px; align-items: center; font-size: 13px; }
  .qn { background: var(--ink); color: var(--paper); padding: 5px 10px; border-radius: 6px; }
  .qtext { font-family: var(--f-display); font-size: 32px; line-height: 1.2; letter-spacing: -.5px; }
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .opt {
    display: flex; gap: 12px; align-items: center; padding: 16px; text-align: left;
    border: 2.5px solid var(--ink); border-radius: 14px; background: transparent; font-size: 16px; font-weight: 600; cursor: pointer;
    transition: transform .12s, background .12s;
  }
  .opt:not(.pick):hover:not(:disabled) { background: var(--paper); }
  .l { width: 32px; height: 32px; flex: none; border-radius: 8px; border: 2.5px solid currentColor; display: grid; place-items: center; font-family: var(--f-display); }
  .opt.pick { background: var(--blue); color: #fff; border: 3px solid #111; box-shadow: 4px 4px 0 #111; transform: rotate(-1deg); font-weight: 700; }
  .opt.pick .l, .opt.right .l, .opt.wrong .l { background: #fff; color: #111; border-color: #111; }
  .opt.right { background: var(--mint); color: #111; border: 3px solid #111; box-shadow: 4px 4px 0 #111; font-weight: 700; }
  .opt.wrong { background: var(--pink); color: #111; border: 3px solid #111; text-decoration: line-through; }
  .opt.dim { opacity: .5; }
  .opt:disabled { cursor: default; }
  .explain { padding: 14px 16px; border: 2.5px dashed var(--tomato); border-radius: 12px; font-size: 15px; }
  .explain.good { border-color: var(--mint); }
  .explain .hand { font-size: 22px; color: var(--tomato); margin-right: 6px; }
  .explain.good .hand { color: #1f9e6c; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .fnote { font-size: 14px; max-width: 420px; }

  .center { display: flex; justify-content: center; }
  .box { max-width: 640px; width: 100%; margin: 30px auto; padding: 34px; display: flex; flex-direction: column; gap: 14px; }
  .result { align-items: center; text-align: center; }
  .bigmedal {
    width: 150px; height: 150px; border-radius: 50%; border: 4px solid #111; display: grid; place-items: center;
    font-family: var(--f-display); font-size: 60px; color: #111; transform: rotate(-8deg); margin: 10px 0 14px;
    box-shadow: 0 0 0 8px var(--card), 0 0 0 12px var(--ink);
    animation: pop .5s cubic-bezier(.3, 1.6, .5, 1);
  }
  .bigmedal.G { background: var(--gold); }
  .bigmedal.S { background: var(--silver); }
  .bigmedal.B { background: var(--bronze); }
  .bigmedal.none { background: var(--locked); color: var(--faint); border-style: dashed; }
  .xpchip { font-size: 14px; padding: 6px 12px; background: #111; color: var(--yellow); border-radius: 8px; }
  .row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 10px; }

  @media (max-width: 900px) {
    .quiz { gap: 18px; padding-top: 18px; }
    .x { display: inline; }
    .tname, .marks, .tick { display: none; }
    .trow { align-items: center; }
    .bar { height: 16px; }
    .pills { display: flex; gap: 8px; font-size: 11px; }
    .pills span { padding: 4px 8px; border: 2px solid var(--ink); border-radius: 999px; color: #111; }
    .qcard { padding: 22px 20px; gap: 16px; box-shadow: 6px 6px 0 var(--ink); }
    .combo { right: -8px; top: -22px; width: 72px; height: 72px; font-size: 15px; }
    .qtext { font-size: 23px; }
    .opts { grid-template-columns: 1fr; gap: 10px; }
    .opt { padding: 12px 14px; font-size: 15px; }
    .l { width: 28px; height: 28px; }
    .foot { flex-direction: column; align-items: stretch; }
    .fnote { display: none; }
    .lock { width: 100%; }
  }
</style>
