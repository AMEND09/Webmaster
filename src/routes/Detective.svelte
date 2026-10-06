<script>
  import { cases } from '../lib/data/cases.js';
  import { zoneById } from '../lib/data/zones.js';
  import { app } from '../lib/store.svelte.js';

  const tilt = [-1.5, 1, -0.5];
</script>

<div class="page">
  <div class="page-head">
    <div>
      <div class="eyebrow">AI DETECTIVE</div>
      <h1 class="page-title">Case files</h1>
      <p class="muted sub">A chatbot wrote something confident. Some of it is wrong. Find the mistakes, check the sources, then fix the prompt.</p>
    </div>
  </div>

  <div class="files">
    {#each cases as c, i}
      {@const st = app.cases[c.id]}
      {@const found = st?.found.length ?? 0}
      <a class="file" href="#/detective/{c.id}" style:transform="rotate({tilt[i % 3]}deg)">
        <div class="tab mono">CASE #{c.id}</div>
        <div class="paper">
          <div class="mono zone">{zoneById[c.zone]?.name.toUpperCase() ?? 'TOOLBOX'}</div>
          <div class="display ttl">{c.title}</div>
          <div class="ask">“{c.prompt}”</div>
          <div class="foot">
            {#if st?.done}
              <span class="stamp">SOLVED</span>
            {:else if found}
              <span class="mono prog">{found}/3 FOUND · IN PROGRESS</span>
            {:else}
              <span class="mono prog">NEW · +{c.xp} XP</span>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .sub { font-size: 15px; margin-top: 6px; max-width: 620px; }
  .files { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px; padding-top: 30px; }
  .file { position: relative; text-decoration: none; color: #111; transition: transform .15s; }
  .file:hover { transform: rotate(0deg) translateY(-4px) !important; }
  .tab {
    position: absolute; left: -3px; top: -34px; width: 150px; height: 34px; background: #f2d9a0; border: 3px solid #141414; border-bottom: 0;
    border-radius: 12px 12px 0 0; display: grid; place-items: center; font-size: 12px;
  }
  .paper {
    background: #f2d9a0; border: 3px solid #141414; box-shadow: 7px 7px 0 var(--ink); border-radius: 4px 18px 18px 18px;
    padding: 22px; display: flex; flex-direction: column; gap: 10px; min-height: 250px;
  }
  .zone { font-size: 11px; color: #5b564c; }
  .ttl { font-size: 26px; line-height: 1.1; }
  .ask { background: #3a5bff; color: #fff; border: 2.5px solid #111; border-radius: 14px 14px 4px 14px; padding: 10px 14px; font-size: 14px; align-self: flex-start; }
  .foot { margin-top: auto; }
  .prog { font-size: 12px; }
  .stamp {
    display: inline-block; font-family: var(--f-display); font-size: 22px; color: #ff5a36; border: 3px solid #ff5a36; padding: 2px 12px;
    transform: rotate(-8deg); letter-spacing: 2px;
  }
  @media (max-width: 1000px) { .files { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 640px) { .files { grid-template-columns: 1fr; gap: 50px; } }
</style>
