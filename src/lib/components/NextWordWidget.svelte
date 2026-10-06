<script>
  import { nextWordRounds } from '../data/lessons.js';

  let r = $state(0);
  let pick = $state(null);
  let score = $state(0);
  let round = $derived(nextWordRounds[r]);
  let max = $derived(round.options[0][1]);
  let shuffled = $derived([...round.options].sort((a, b) => a[0].localeCompare(b[0])));
  let finished = $derived(r >= nextWordRounds.length - 1 && pick !== null);

  function choose(o) {
    if (pick !== null) return;
    pick = o[0];
    if (o[0] === round.options[0][0]) score++;
  }
  function next() {
    if (r < nextWordRounds.length - 1) { r++; pick = null; }
    else { r = 0; pick = null; score = 0; }
  }
</script>

<div class="nw">
  <div class="top mono"><span>ROUND {r + 1} / {nextWordRounds.length}</span><span>MATCHED THE MODEL: {score}</span></div>
  <div class="ctx display">{round.context} <span class="blank">{pick ?? '___'}</span></div>
  {#if pick === null}
    <p class="hand hint">you're the model. which word comes next?</p>
    <div class="opts">
      {#each shuffled as o}<button class="opt" onclick={() => choose(o)}>{o[0]}</button>{/each}
    </div>
  {:else}
    <div class="bars">
      {#each round.options as [w, p], k}
        <div class="row" class:me={w === pick}>
          <span class="w">{w}</span>
          <div class="bar"><div class="fill" style:width="{(p / max) * 100}%" style:background={k === 0 ? '#3a5bff' : '#ff9ecb'}></div></div>
          <span class="mono p">{Math.round(p * 100)}%</span>
        </div>
      {/each}
    </div>
    <div class="foot">
      <span class="hand verdict">{pick === round.options[0][0] ? 'same pick as the model!' : 'the model would pick “' + round.options[0][0] + '”'}</span>
      <button class="btn btn-sm" onclick={next}>{finished ? 'Play again' : 'Next round →'}</button>
    </div>
  {/if}
</div>

<style>
  .nw { display: flex; flex-direction: column; gap: 16px; }
  .top { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }
  .ctx { font-size: 28px; line-height: 1.2; }
  .blank { background: var(--yellow); color: #111; padding: 0 10px; border: 2.5px solid #111; display: inline-block; transform: rotate(-2deg); }
  .hint { font-size: 20px; color: var(--blue); }
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .opt { padding: 14px; border: 2.5px solid var(--ink); border-radius: 12px; background: var(--card); font-weight: 700; font-size: 16px; cursor: pointer; }
  .opt:hover { background: var(--yellow); color: #111; }
  .bars { display: flex; flex-direction: column; gap: 8px; }
  .row { display: grid; grid-template-columns: 90px minmax(0, 1fr) 48px; gap: 10px; align-items: center; font-weight: 700; padding: 4px 6px; border-radius: 8px; }
  .row.me { outline: 2.5px dashed var(--tomato); }
  .bar { height: 18px; border: 2.5px solid var(--ink); border-radius: 999px; overflow: hidden; background: var(--paper); }
  .fill { height: 100%; transition: width .5s; }
  .p { font-size: 12px; text-align: right; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .verdict { font-size: 20px; color: var(--tomato); }
</style>
