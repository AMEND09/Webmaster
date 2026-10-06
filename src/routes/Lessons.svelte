<script>
  import { lessons } from '../lib/data/lessons.js';
  import { zones } from '../lib/data/zones.js';
  import { app, isUnlocked, currentLesson, stepsDone } from '../lib/store.svelte.js';
  import GlitchPixel from '../lib/components/GlitchPixel.svelte';

  let current = $derived(currentLesson());
</script>

<div class="page">
  <div class="page-head">
    <div>
      <div class="eyebrow">ALL 21 STOPS</div>
      <h1 class="page-title">Lessons</h1>
    </div>
    <div class="extras">
      <a class="btn btn-sm" href="#/lab">Network playground</a>
      <a class="btn btn-sm" href="#/detective">AI Detective</a>
    </div>
  </div>

  <div class="zones">
    {#each zones as z}
      <section class="card zone">
        <div class="zhead" style:background={z.bg} style:color={z.fg}>
          <span class="mono">ZONE {z.n}</span>
          <h2 class="display">{z.name}</h2>
        </div>
        <ol>
          {#each lessons.filter((l) => l.zone === z.id) as l}
            {@const i = lessons.indexOf(l)}
            {@const open = isUnlocked(i)}
            {@const medal = app.medals[l.id]}
            {@const now = l === current}
            <li class:now class:locked={!open}>
              {#if medal}
                <span class="medal {medal}">{medal}</span>
              {:else if now}
                <span class="dot now">▶</span>
              {:else}
                <span class="dot" class:dash={!open}></span>
              {/if}
              <div class="info">
                {#if open}
                  <a class="ltitle" href="#/lesson/{l.id}">{l.title}</a>
                {:else}
                  <span class="ltitle">{l.title}</span>
                {/if}
                <span class="blurb">{l.blurb}</span>
              </div>
              <span class="meta mono">
                {#if open}{stepsDone(l.id).length}/{l.steps.length} · {l.minutes}m{:else}LOCKED{/if}
              </span>
            </li>
          {/each}
        </ol>
      </section>
    {/each}
  </div>
  <div class="pixel-home"><GlitchPixel style="right:18px;bottom:-30px" /></div>
</div>

<style>
  .extras { display: flex; gap: 12px; flex-wrap: wrap; }
  .zones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: start; }
  .zone { overflow: hidden; }
  .zhead { padding: 12px 16px; border-bottom: 2.5px solid var(--ink); }
  .zhead .mono { font-size: 11px; }
  .zhead h2 { font-size: 24px; line-height: 1.1; }
  ol { list-style: none; margin: 0; padding: 10px; display: flex; flex-direction: column; gap: 4px; }
  li { display: flex; gap: 12px; align-items: flex-start; padding: 10px; border-radius: 10px; border: 2px solid transparent; }
  li.now { background: var(--yellow); color: var(--hard); border-color: var(--hard); }
  li.now .blurb { color: #3b3833; }
  li.locked { color: var(--faint); }
  .dot { width: 26px; height: 26px; flex: none; border-radius: 50%; border: 2.5px solid var(--ink); display: grid; place-items: center; font-size: 10px; }
  .dot.dash { border: 2px dashed var(--faint); }
  .dot.now { background: var(--tomato); color: #fff; border-color: var(--hard); }
  .info { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .ltitle { font-weight: 700; font-size: 15px; text-decoration: none; }
  a.ltitle:hover { text-decoration: underline; }
  .blurb { font-size: 13px; color: var(--muted); line-height: 1.35; }
  li.locked .blurb { color: var(--faint); }
  .meta { font-size: 11px; white-space: nowrap; padding-top: 3px; }
  .pixel-home { position: relative; }

  @media (max-width: 1100px) { .zones { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 700px) { .zones { grid-template-columns: 1fr; } }
</style>
