<script>
  import { lessons } from '../lib/data/lessons.js';
  import { zoneById } from '../lib/data/zones.js';
  import { app, isUnlocked, lessonIndex, stepsDone, completeStep, STEP_XP, MEDAL_NAME } from '../lib/store.svelte.js';
  import { go } from '../lib/router.svelte.js';
  import OverfitWidget from '../lib/components/OverfitWidget.svelte';
  import NextWordWidget from '../lib/components/NextWordWidget.svelte';
  import NotFound from './NotFound.svelte';

  // Pages remount on every route change (App.svelte {#key}), so props are read once.
  let { id, step = 0 } = $props();

  // svelte-ignore state_referenced_locally
  const i = lessonIndex(id);
  const lesson = lessons[i];
  const zone = lesson && zoneById[lesson.zone];
  const nextLesson = lessons[i + 1];
  // svelte-ignore state_referenced_locally
  const s = lesson ? Math.min(Math.max(0, step || 0), lesson.steps.length - 1) : 0;
  const st = lesson?.steps[s];
  const last = lesson && s === lesson.steps.length - 1;

  let done = $derived(lesson ? stepsDone(id) : []);
  let medal = $derived(lesson ? app.medals[id] : null);

  function next() {
    completeStep(id, s);
    go(last ? `/quiz/${id}` : `/lesson/${id}/${s + 2}`);
  }
</script>

{#if !lesson}
  <NotFound />
{:else if !isUnlocked(i)}
  <div class="page locked">
    <div class="card-lg lockbox">
      <div class="eyebrow">{zone.name} · LOCKED</div>
      <h1 class="page-title">{lesson.title}</h1>
      <p class="muted">Earn at least a bronze medal on “{lessons[i - 1].title}” to unlock this stop.</p>
      <div class="row">
        <a class="btn btn-primary" href="#/lesson/{lessons[i - 1].id}">Go to {lessons[i - 1].title} →</a>
        <a class="btn" href="#/map">Back to the map</a>
      </div>
    </div>
  </div>
{:else}
  <div class="page grid">
    <aside>
      <div class="card side">
        <div class="shead" style:background={zone.bg} style:color={zone.fg}>
          <div class="mono">ZONE {zone.n} · {zone.name.toUpperCase()}</div>
          <div class="display">{lesson.title}</div>
        </div>
        <nav class="steps">
          {#each lesson.steps as stp, k}
            {@const isDone = done.includes(k)}
            <a href="#/lesson/{id}/{k + 1}" class="srow" class:cur={k === s}>
              {#if k === s}<span class="ic play">▶</span>{:else if isDone}<span class="ic ok">✓</span>{:else}<span class="ic"></span>{/if}
              {stp.title}
            </a>
          {/each}
          <a href="#/quiz/{id}" class="srow quiz" class:dim={!medal && done.length < lesson.steps.length}>
            {#if medal}<span class="medal {medal}">{medal}</span>{:else}<span class="ic dash"></span>{/if}
            Quiz: {lesson.title}
          </a>
        </nav>
      </div>
      {#if nextLesson && !medal}
        <div class="hand aside-note">pass the quiz to unlock “{nextLesson.title}” ↓</div>
      {:else if medal}
        <div class="hand aside-note">{MEDAL_NAME[medal].toLowerCase()} medal! {medal !== 'G' ? 'retake for gold?' : 'flawless.'}</div>
      {/if}
    </aside>

    <article>
      <div class="eyebrow">{zone.name} / {lesson.title} / STEP {s + 1} OF {lesson.steps.length}</div>
      <h1>
        {#if s === 0}
          {lesson.headline[0]}<span class="hl">{lesson.headline[1]}</span>{lesson.headline[2]}
        {:else}
          {st.title}
        {/if}
      </h1>
      <div class="body">
        {#each st.body as para}<p>{para}</p>{/each}
      </div>

      {#if st.interactive}
        <div class="try card-lg">
          <div class="try-tag mono">TRY IT</div>
          {#if st.interactive === 'overfit'}
            <OverfitWidget />
          {:else if st.interactive === 'nextword'}
            <NextWordWidget />
          {:else if st.interactive === 'playground'}
            <div class="launch">
              <svg viewBox="0 0 220 120" class="mini" aria-hidden="true">
                {#each [20, 60, 100] as y1}{#each [15, 45, 75, 105] as y2}<line x1="30" y1={y1} x2="110" y2={y2} stroke={(y1 + y2) % 3 ? '#3a5bff' : '#ff5a36'} stroke-width={2 + ((y1 * y2) % 5)} />{/each}{/each}
                {#each [15, 45, 75, 105] as y1}{#each [40, 80] as y2}<line x1="110" y1={y1} x2="190" y2={y2} stroke={(y1 + y2) % 2 ? '#ff5a36' : '#3a5bff'} stroke-width={2 + ((y1 + y2) % 4)} />{/each}{/each}
                {#each [20, 60, 100] as y}<circle cx="30" cy={y} r="11" fill="#6fdcb0" stroke="#141414" stroke-width="3" />{/each}
                {#each [15, 45, 75, 105] as y}<circle cx="110" cy={y} r="11" fill="#fffdf7" stroke="#141414" stroke-width="3" />{/each}
                {#each [40, 80] as y, k}<circle cx="190" cy={y} r="11" fill={k ? '#fffdf7' : '#ffe14d'} stroke="#141414" stroke-width="3" />{/each}
              </svg>
              <div>
                <div class="display lt">Network playground</div>
                <p class="muted">Drag the weights of a real (tiny) neural network and watch its guess change. Mission: make it say “dog”.</p>
                <a class="btn btn-sm btn-primary" href="#/lab">Open the playground →</a>
              </div>
            </div>
          {:else if st.interactive === 'detective'}
            <div class="launch">
              <div class="folder mono">CASE FILE<br>#07</div>
              <div>
                <div class="display lt">The Confident Chatbot</div>
                <p class="muted">A chatbot wrote a paragraph with three mistakes hiding in it. Find them, check the sources, then fix the prompt.</p>
                <a class="btn btn-sm btn-primary" href="#/detective/07">Open the case →</a>
              </div>
            </div>
          {/if}
        </div>
      {/if}

      {#if st.keyPoints?.length}
        <div class="keys">
          <div class="mono kh">KEY POINTS</div>
          <ul>{#each st.keyPoints as k}<li>{k}</li>{/each}</ul>
          {#if st.note}<div class="hand knote">{st.note}</div>{/if}
        </div>
      {/if}

      <div class="actions">
        <button class="btn btn-primary" onclick={next}>
          {last ? 'Next: check yourself →' : `Next: ${lesson.steps[s + 1].title} →`}
        </button>
        {#if !done.includes(s)}<span class="xpchip mono">+{STEP_XP} XP</span>{/if}
        {#if s > 0}<a class="btn-link" href="#/lesson/{id}/{s}">← back</a>{/if}
      </div>
    </article>
  </div>
{/if}

<style>
  .grid { display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 36px; padding-top: 32px; }
  aside { display: flex; flex-direction: column; gap: 16px; }
  .side { overflow: hidden; position: sticky; top: 96px; }
  .shead { padding: 12px 16px; border-bottom: 2.5px solid var(--ink); }
  .shead .mono { font-size: 11px; }
  .shead .display { font-size: 20px; margin-top: 2px; line-height: 1.15; }
  .steps { padding: 10px; display: flex; flex-direction: column; gap: 4px; font-size: 14px; font-weight: 600; }
  .srow { display: flex; gap: 10px; align-items: center; padding: 10px; text-decoration: none; border: 2px solid transparent; border-radius: 10px; line-height: 1.25; }
  .srow:hover { border-color: var(--ink); }
  .srow.cur { background: var(--yellow); border-color: var(--hard); color: var(--hard); }
  .srow.dim { color: var(--faint); }
  .ic { width: 24px; height: 24px; flex: none; border-radius: 50%; border: 2px solid var(--ink); display: grid; place-items: center; font-size: 13px; }
  .ic.ok { background: var(--mint); color: #111; }
  .ic.play { background: var(--tomato); border-color: var(--hard); color: #fff; font-size: 10px; }
  .ic.dash { border: 2px dashed var(--faint); }
  .aside-note { font-size: 21px; color: var(--muted); transform: rotate(-2deg); padding: 0 8px; line-height: 1.15; }

  article { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
  h1 { font-family: var(--f-display); font-size: 44px; line-height: 1.05; letter-spacing: -1px; max-width: 820px; }
  .hl { background: var(--pink); color: #111; padding: 0 8px; }
  .body { display: flex; flex-direction: column; gap: 14px; max-width: 760px; }
  .body p { font-size: 17px; line-height: 1.6; color: var(--muted); text-wrap: pretty; }
  .body p:first-child { color: var(--ink); }

  .try { position: relative; padding: 22px; margin-top: 10px; }
  .try-tag {
    position: absolute; left: -14px; top: -16px; font-size: 12px; background: var(--tomato); color: #fff;
    padding: 5px 10px; border: 2px solid #111; transform: rotate(-4deg); z-index: 1;
  }
  .launch { display: flex; gap: 24px; align-items: center; }
  .launch p { margin: 6px 0 14px; font-size: 15px; }
  .lt { font-size: 22px; }
  .mini { width: 220px; flex: none; background: #f3eee3; border: 2px solid var(--ink); border-radius: 10px; padding: 6px; }
  .folder {
    width: 160px; height: 120px; flex: none; background: #f2d9a0; color: #111; border: 3px solid #141414; border-radius: 4px 14px 14px 14px;
    display: grid; place-items: center; text-align: center; font-size: 16px; transform: rotate(-3deg); box-shadow: 4px 4px 0 #141414;
  }

  .keys { position: relative; border: 2.5px dashed var(--ink); border-radius: 14px; padding: 16px 20px; max-width: 760px; }
  .kh { font-size: 11px; color: var(--muted); }
  .keys ul { margin: 8px 0 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; font-weight: 600; }
  .knote { position: absolute; right: 14px; bottom: -16px; background: var(--paper); padding: 0 8px; font-size: 20px; color: var(--blue); transform: rotate(-3deg); }

  .actions { display: flex; align-items: center; gap: 16px; margin-top: 8px; flex-wrap: wrap; }
  .xpchip { font-size: 13px; padding: 6px 10px; border: 2px dashed var(--ink); border-radius: 8px; }

  .lockbox { max-width: 640px; margin: 40px auto; padding: 34px; display: flex; flex-direction: column; gap: 14px; }
  .row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 8px; }

  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr; gap: 20px; padding-top: 20px; }
    aside { order: 2; }
    .side { position: static; }
    h1 { font-size: 32px; }
    .body p { font-size: 16px; }
    .launch { flex-direction: column; align-items: flex-start; }
    .mini { width: 100%; max-width: 260px; }
    .actions .btn { flex: 1; }
  }
</style>
