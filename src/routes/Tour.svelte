<script>
  import { fly } from 'svelte/transition';
  import { lessons } from '../lib/data/lessons.js';
  import { zones } from '../lib/data/zones.js';
  import { app, addXP, checkBadges } from '../lib/store.svelte.js';
  import { go } from '../lib/router.svelte.js';
  import Art from '../lib/components/Art.svelte';

  const chipColors = [['#3a5bff', '#fff'], ['#6fdcb0', '#111'], ['#ffe14d', '#111'], ['#ff9ecb', '#111'], ['var(--card)', 'var(--ink)']];
  const chipRot = [-2, 1, 0, 2, -1];

  let i = $state(0);
  let dir = $state(1);
  let z = $derived(zones[i]);
  let topics = $derived(lessons.filter((l) => l.zone === z.id));
  let nextZ = $derived(zones[i + 1]);
  let last = $derived(i === zones.length - 1);

  function move(d) {
    const n = i + d;
    if (n < 0) return;
    if (n >= zones.length) return finish();
    dir = d;
    i = n;
  }

  function finish() {
    if (!app.tourDone) {
      app.tourDone = true;
      addXP(50, 'Tour complete');
      checkBadges();
    }
    go('/map');
  }

  function onkeydown(e) {
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft') move(-1);
  }
</script>

<svelte:window {onkeydown} />

<div class="tour">
  <header>
    <a class="logo" href="#/">learn<span>ai</span></a>
    <div class="title">THE INTRO TOUR</div>
    <a class="skip" href="#/map">Skip to the map →</a>
  </header>

  <div class="stage">
    {#if nextZ}
      <div class="behind b2" style:background={zones[i + 2]?.bg ?? 'var(--pink)'}></div>
      <button class="behind b1" style:background={nextZ.bg} style:color={nextZ.fg} onclick={() => move(1)}>
        <span class="mono">{nextZ.n} / UP NEXT</span>
        <span class="display">{nextZ.tourTitle}</span>
      </button>
    {:else}
      <button class="behind b1 mapcard" onclick={finish}>
        <span class="mono">THEN</span>
        <span class="display">The Map</span>
      </button>
    {/if}

    {#key i}
      <article class="slide" in:fly={{ x: 80 * dir, duration: 300 }}>
        <div class="text">
          <div class="num" style:-webkit-text-stroke-color={z.bg === '#ffe14d' ? '#e0b800' : z.bg}>{z.n}</div>
          <h1>{z.tourTitle}</h1>
          <p>{z.tourText}</p>
          <div class="chips">
            {#each topics as t, k}
              <span class="tchip" style:background={chipColors[k % 5][0]} style:color={chipColors[k % 5][1]} style:transform="rotate({chipRot[k % 5]}deg)">{t.title}</span>
            {/each}
          </div>
        </div>
        <div class="art" style:background={z.bg}>
          <div class="frame"><Art kind={['brain', 'toolbox', 'scale'][i]} /></div>
          <div class="tape"></div>
          <div class="hand count" style:color={z.fg}>{topics.length} topics in here →</div>
        </div>
      </article>
    {/key}
  </div>

  <footer>
    <button class="round" onclick={() => move(-1)} disabled={i === 0} aria-label="Previous slide">←</button>
    <div class="dots">
      {#each zones as zz, k}
        <button class="dot" style:background={k <= i ? zz.bg : 'transparent'} onclick={() => { dir = k > i ? 1 : -1; i = k; }} aria-label="Slide {k + 1}"></button>
      {/each}
    </div>
    <div class="hand tip">tip: arrow keys work too</div>
    <div class="spacer"></div>
    <button class="btn btn-primary" onclick={() => move(1)}>
      {last ? (app.tourDone ? 'Open the map →' : 'Finish: +50 XP →') : `Next: ${nextZ.tourTitle} →`}
    </button>
  </footer>
</div>

<style>
  .tour { min-height: 100vh; display: flex; flex-direction: column; max-width: var(--max); margin: 0 auto; overflow: hidden; position: relative; }
  header {
    display: flex; align-items: center; justify-content: space-between; padding: 22px 40px;
    font-family: var(--f-mono); font-size: 13px; font-weight: 700;
  }
  .logo {
    font-family: var(--f-display); font-size: 20px; background: var(--tomato); color: #fff; padding: 1px 10px 3px;
    border: 2.5px solid var(--hard); transform: rotate(-3deg); text-decoration: none;
  }
  .logo span { color: var(--yellow); }
  .title { letter-spacing: 2px; }
  .skip { text-underline-offset: 4px; }

  .stage { position: relative; flex: 1; min-height: 620px; margin: 0 40px; }
  .behind {
    position: absolute; width: 300px; border: 2.5px solid var(--ink); border-radius: 18px;
  }
  .b2 { right: -80px; top: 54px; height: 500px; transform: rotate(9deg); }
  .b1 {
    right: -50px; top: 34px; height: 520px; transform: rotate(4deg);
    padding: 24px 20px 24px 96px; text-align: left; cursor: pointer;
    display: flex; flex-direction: column; gap: 6px; justify-content: flex-start;
    transition: transform .2s;
  }
  .b1:hover { transform: rotate(6deg) translateX(-6px); }
  .b1 .mono { font-size: 12px; }
  .b1 .display { font-size: 30px; line-height: 1.05; }
  .mapcard { background: var(--mint); color: #111; }

  .slide {
    position: relative; width: min(1020px, calc(100% - 140px)); height: 620px;
    background: var(--card); border: 3px solid var(--ink); box-shadow: 8px 8px 0 var(--ink); border-radius: 20px;
    display: grid; grid-template-columns: 1.1fr 1fr; overflow: hidden;
  }
  .text { padding: 44px; display: flex; flex-direction: column; gap: 18px; }
  .num {
    font-family: var(--f-display); font-size: 170px; line-height: .8; color: transparent;
    -webkit-text-stroke: 3px var(--blue); letter-spacing: -6px;
  }
  h1 { font-family: var(--f-display); font-size: 62px; line-height: 1; letter-spacing: -1.5px; }
  .text p { font-size: 18px; color: var(--muted); max-width: 420px; text-wrap: pretty; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
  .tchip { padding: 6px 12px; border: 2px solid var(--hard); border-radius: 999px; font-size: 14px; font-weight: 600; }
  .art { position: relative; border-left: 3px solid var(--ink); }
  .frame {
    position: absolute; inset: 40px; background: var(--card); border: 2.5px solid #111; transform: rotate(-2deg);
    padding: 40px;
  }
  .art .tape { left: 150px; top: 24px; width: 120px; height: 30px; transform: rotate(4deg); }
  .count { position: absolute; right: 20px; bottom: 14px; font-size: 24px; transform: rotate(-5deg); }

  footer { display: flex; align-items: center; gap: 24px; padding: 34px 40px 40px; }
  .round {
    width: 56px; height: 56px; border-radius: 50%; border: 3px solid var(--ink); background: transparent;
    font-size: 22px; font-weight: 700; cursor: pointer;
  }
  .round:disabled { opacity: .35; cursor: default; }
  .dots { display: flex; gap: 8px; flex: 1; max-width: 420px; }
  .dot { flex: 1; height: 12px; border: 2.5px solid var(--ink); border-radius: 999px; padding: 0; cursor: pointer; transition: background .3s; }
  .tip { font-size: 22px; color: var(--muted); }
  .spacer { flex: 1; }

  @media (max-width: 1100px) {
    h1 { font-size: 46px; }
    .num { font-size: 120px; }
  }
  @media (max-width: 900px) {
    header { padding: 18px var(--gutter); }
    .title { display: none; }
    .stage { margin: 0 var(--gutter); min-height: 0; }
    .behind { display: none; }
    .slide { width: 100%; height: auto; grid-template-columns: 1fr; box-shadow: 5px 5px 0 var(--ink); }
    .text { padding: 26px 22px; gap: 12px; }
    .num { font-size: 84px; letter-spacing: -3px; }
    h1 { font-size: 36px; }
    .text p { font-size: 16px; }
    .art { border-left: 0; border-top: 3px solid var(--ink); height: 240px; }
    .frame { inset: 26px 50px; padding: 14px; }
    .art .tape { left: 40%; top: 14px; width: 80px; height: 22px; }
    .count { font-size: 19px; bottom: 4px; }
    footer { flex-wrap: wrap; gap: 14px; padding: 22px var(--gutter) 30px; }
    .tip, .spacer { display: none; }
    .round { width: 48px; height: 48px; }
    footer .btn { width: 100%; }
  }
</style>
