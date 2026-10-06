<script>
  import { lessons } from '../lib/data/lessons.js';
  import { zones } from '../lib/data/zones.js';
  import { app, currentLesson, currentStreak, isUnlocked, lessonIndex } from '../lib/store.svelte.js';
  import Art from '../lib/components/Art.svelte';

  let next = $derived(currentLesson());
  let started = $derived(app.xp > 0);
  let streak = $derived(currentStreak());

  const ticker = ['NEURAL NETWORKS', 'NEXT-WORD PREDICTION', 'PROMPTING', 'DEEPFAKES', 'OVERFITTING', 'DATA POISONING', 'LINEAR ALGEBRA', 'CONTEXT ENGINEERING', 'ACADEMIC HONESTY'];
  const starColors = ['#ff5a36', '#6fdcb0', '#ff9ecb', '#3a5bff'];

  function zoneStatus(z) {
    const ls = lessons.filter((l) => l.zone === z.id);
    const done = ls.filter((l) => app.medals[l.id]).length;
    if (!isUnlocked(lessonIndex(ls[0].id))) return 'locked';
    return `${done} of ${ls.length} done`;
  }
</script>

<div class="home">
  <section class="hero">
    <div class="copy">
      <div class="kicker">FOR GRADES 9–12 · FREE</div>
      <h1>Figure out <span class="ai">AI</span> before it figures out your <span class="wavy">homework.</span></h1>
      <p class="lede">Bite-size lessons, hands-on models and games that show how AI works, how to use it well, and how to use it fairly.</p>
      <div class="ctas">
        {#if started && next}
          <a class="btn btn-primary" href="#/lesson/{next.id}">Continue: {next.title} →</a>
        {:else}
          <a class="btn btn-primary" href="#/tour">Start the tour →</a>
        {/if}
        <a class="btn secondary" href="#/map">Open the map</a>
        {#if !app.tourDone}
          <div class="hand note">← 3-min intro,<br>promise</div>
        {/if}
      </div>
    </div>

    <div class="collage" aria-hidden="true">
      <div class="polaroid">
        <div class="photo"><Art kind="byte" /></div>
        <div class="hand caption">{started ? 'keep going!' : 'meet Byte, your guide'}</div>
      </div>
      <div class="tape t1"></div>
      <div class="cutout">
        <div><span class="c-how">How</span><span class="c-does">DOES</span></div>
        <div><span class="c-ai">AI</span><span class="c-think">think?</span></div>
      </div>
      {#if started && streak > 1}
        <div class="burst xp">{streak}-DAY<br><span>STREAK</span></div>
      {:else}
        <div class="burst xp">+50<br><span>XP</span></div>
      {/if}
      <a class="legend" href="#/badges" aria-hidden="false" tabindex="-1">LEGENDARY<br>BADGES<br>HIDDEN<br>INSIDE</a>
    </div>
  </section>

  <section class="zones">
    {#each zones as z, i}
      {@const ls = lessons.filter((l) => l.zone === z.id)}
      <a class="zone card" class:tilt={i === 1} href="#/map">
        <div class="zhead" style:background={z.bg} style:color={z.fg}>
          <span class="display">{z.name}</span><span class="mono">ZONE {z.n}</span>
        </div>
        <div class="zbody">
          {#each ls.slice(0, 4) as l}<span class="chip">{l.title}</span>{/each}
          <span class="zstat mono">{zoneStatus(z)}</span>
        </div>
      </a>
    {/each}
  </section>

  <div class="ticker" aria-hidden="true">
    <div class="track">
      {#each [0, 1] as _}
        {#each ticker as t, i}<span>{t}</span><span style:color={starColors[i % 4]}>✶</span>{/each}
      {/each}
    </div>
  </div>
</div>

<style>
  .home { max-width: var(--max); margin: 0 auto; overflow: hidden; padding-bottom: 24px; }
  .hero {
    display: grid; grid-template-columns: 1.35fr 1fr; gap: 24px;
    padding: 36px 56px 0; min-height: 500px;
  }
  .copy { display: flex; flex-direction: column; gap: 18px; }
  .kicker {
    align-self: flex-start; white-space: nowrap;
    font-family: var(--f-mono); font-size: 12px; font-weight: 700; letter-spacing: 1px;
    padding: 5px 10px; background: var(--mint); color: var(--hard); border: 2px solid var(--hard);
    transform: rotate(-2deg);
  }
  h1 { font-family: var(--f-display); font-size: 54px; line-height: 1.02; letter-spacing: -1.5px; }
  .ai {
    background: var(--yellow); color: var(--hard); padding: 0 12px; display: inline-block;
    transform: rotate(-2deg); border: 3px solid var(--hard); box-shadow: 4px 4px 0 var(--hard);
  }
  .wavy { text-decoration: underline wavy var(--tomato) 5px; text-underline-offset: 12px; }
  .lede { max-width: 470px; font-size: 18px; color: var(--muted); }
  .ctas { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-top: 4px; }
  .note { font-size: 21px; color: var(--blue); transform: rotate(-4deg); line-height: 1; }

  .collage { position: relative; min-height: 420px; }
  .polaroid {
    position: absolute; left: 40px; top: 6px; width: 300px; height: 360px;
    background: var(--card); border: 2.5px solid var(--ink);
    padding: 14px 14px 58px; transform: rotate(3deg); box-shadow: 6px 6px 0 var(--ink);
  }
  .photo { width: 100%; height: 100%; background: var(--tint-blue); border: 2px solid var(--ink); padding: 26px; }
  .caption { position: absolute; left: 0; right: 0; bottom: 12px; text-align: center; font-size: 24px; }
  .t1 { left: 190px; top: -6px; width: 110px; transform: rotate(-5deg); }
  .cutout {
    position: absolute; right: -10px; top: 40px; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
    transform: rotate(6deg);
  }
  .cutout > div { display: flex; gap: 6px; align-items: center; }
  .c-how { background: #111; color: #fff; font-family: Georgia, serif; font-style: italic; font-size: 26px; padding: 2px 10px; }
  .c-does { background: var(--yellow); color: #111; font-family: var(--f-mono); font-weight: 700; font-size: 24px; padding: 2px 8px; border: 2px solid #111; transform: rotate(-4deg); }
  .c-ai { background: var(--blue); color: #fff; font-family: var(--f-display); font-size: 30px; padding: 0 10px; }
  .c-think { background: var(--pink); color: #111; font-family: var(--f-hand); font-size: 32px; padding: 0 10px; border: 2px solid #111; transform: rotate(3deg); }
  .xp {
    position: absolute; left: -30px; top: 140px; width: 130px; height: 130px;
    background: var(--yellow); color: #111; transform: rotate(-12deg);
    font-family: var(--f-display); font-size: 22px; line-height: 1;
    animation: wobble 4s ease-in-out infinite;
  }
  .xp span { font-size: 14px; }
  @keyframes wobble { 50% { transform: rotate(-4deg) scale(1.05); } }
  .legend {
    position: absolute; right: 20px; bottom: 30px; width: 120px; height: 120px; border-radius: 50%;
    background: var(--purple); border: 3px solid #111; box-shadow: 0 0 0 5px var(--card), 0 0 0 7.5px #111;
    display: grid; place-items: center; transform: rotate(10deg); text-decoration: none;
    font-family: var(--f-mono); font-weight: 700; font-size: 11px; line-height: 1.3; color: #fff; text-align: center; letter-spacing: .5px;
    transition: transform .3s;
  }
  .legend:hover { transform: rotate(370deg); }

  .zones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; padding: 0 56px; }
  .zone { overflow: hidden; text-decoration: none; color: var(--ink); transition: transform .15s; }
  .zone.tilt { transform: rotate(-1deg); }
  .zone:hover { transform: rotate(1deg) translateY(-3px); }
  .zhead { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 16px; border-bottom: 2.5px solid var(--ink); }
  .zhead .display { font-size: 20px; }
  .zhead .mono { font-size: 11px; }
  .zbody { padding: 14px 16px; display: flex; flex-wrap: wrap; gap: 6px; }
  .zstat { width: 100%; font-size: 11px; color: var(--muted); margin-top: 4px; text-transform: uppercase; }

  .ticker {
    margin-top: 48px; height: 44px; background: #111; color: var(--yellow);
    display: flex; align-items: center; overflow: hidden;
    transform: rotate(-1deg) scale(1.03);
    font-family: var(--f-mono); font-weight: 700; font-size: 14px; letter-spacing: 1.5px; white-space: nowrap;
  }
  .track { display: flex; gap: 28px; padding-left: 28px; animation: marquee 40s linear infinite; }
  @keyframes marquee { to { transform: translateX(-50%); } }

  @media (max-width: 1100px) {
    h1 { font-size: 46px; }
    .hero { padding: 28px var(--gutter) 0; }
    .zones { padding: 0 var(--gutter); }
  }
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; min-height: 0; gap: 10px; padding-top: 26px; }
    .kicker { display: none; }
    h1 { font-size: 40px; letter-spacing: -1px; }
    .ai { padding: 0 8px; border-width: 2.5px; box-shadow: none; }
    .wavy { text-decoration-thickness: 3px; text-underline-offset: 8px; }
    .lede { font-size: 15px; }
    .ctas .btn { width: 100%; font-size: 16px; }
    .ctas .btn.secondary, .note { display: none; }
    .collage { min-height: 210px; margin-top: 18px; }
    .polaroid { left: 30px; top: 0; width: 200px; height: 190px; padding: 10px 10px 36px; transform: rotate(-3deg); box-shadow: 4px 4px 0 var(--ink); }
    .photo { padding: 8px; }
    .caption { font-size: 18px; bottom: 6px; }
    .t1 { left: 100px; top: -10px; width: 70px; height: 20px; }
    .cutout { display: none; }
    .xp { left: auto; right: 0; top: 40px; width: 100px; height: 100px; font-size: 15px; transform: rotate(12deg); }
    .legend { display: none; }
    .zones { display: flex; overflow-x: auto; gap: 10px; padding: 10px var(--gutter) 10px; scroll-snap-type: x mandatory; }
    .zone { flex: none; width: 220px; scroll-snap-align: start; box-shadow: 3px 3px 0 var(--ink); }
    .zone.tilt { transform: none; }
    .ticker { margin-top: 28px; }
  }
</style>
