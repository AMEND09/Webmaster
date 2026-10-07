<script>
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import Art from '../components/Art.svelte';
  import { holdHeader, releaseHeader } from '../chrome.svelte.js';

  let { cta = { href: '#/tour', label: 'Start the tour' } } = $props();

  let root;
  let tl;

  // The headline, word by word, so each can ride up out of its own mask.
  const line1 = ['Figure', 'out'];
  const line2 = ['before', 'it', 'figures', 'out'];

  onMount(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = gsap.utils.selector(root);

    if (reduced) {
      releaseHeader();
      return;
    }

    holdHeader();

    tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: releaseHeader });

    tl.from(q('.word > span'), { yPercent: 115, duration: 0.85, stagger: 0.055 })
      // kicker drops in with a fade — no rotate here, it already rests at -2deg in CSS
      .from(q('.kicker'), { y: -16, opacity: 0, duration: 0.5 }, 0.15)
      // the underline inks in left-to-right rather than fading on
      .fromTo(q('.ink'), { strokeDashoffset: 191 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.45')
      .from(q('.lede'), { y: 18, opacity: 0, duration: 0.6 }, '-=0.5')
      .from(q('.ctas > *'), { y: 16, opacity: 0, duration: 0.5, stagger: 0.09 }, '-=0.35')
      .from(q('.doodle'), {
        scale: 0,
        rotate: 'random(-40, 40)',
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(2.4)',
      }, '-=0.6')
      .from(q('.cue'), { opacity: 0, y: -8, duration: 0.4 }, '-=0.2');
  });

  onDestroy(() => {
    tl?.kill();
    releaseHeader();
  });
</script>

<section class="intro" bind:this={root}>
  <div class="stage">
    <div class="kicker mono">FOR GRADES 9–12 · FREE · NO ACCOUNT</div>

    <h1>
      <span class="line">
        {#each line1 as w}<span class="word"><span>{w}</span></span>{/each}<span class="word"><span class="mark">AI</span></span>
      </span>
      <span class="line small">
        {#each line2 as w}<span class="word"><span>{w}</span></span>{/each}
      </span>
      <span class="line small">
        <span class="word"><span>your</span></span><span class="uwrap"><span class="word"><span>homework.</span></span><svg class="rule" viewBox="0 0 200 14" aria-hidden="true"><path class="ink" d="M5 9 C 55 3, 130 13, 195 6" /></svg></span>
      </span>
    </h1>

    <p class="lede">
      A plain-English tour of what AI actually is, how it learns, and how to use it
      without letting it do your thinking. Six minutes of reading, no maths required.
    </p>

    <div class="ctas">
      <a class="btn btn-primary" href={cta.href}>{cta.label} →</a>
      <a class="btn" href="#/map">Open the map</a>
    </div>

    <div class="doodles" aria-hidden="true">
      <div class="doodle halo-card">
        <span class="tape"></span>
        <div class="byte"><Art kind="byte" /></div>
        <div class="tag">no maths<br />required</div>
      </div>
    </div>

    <div class="cue mono" aria-hidden="true">SCROLL<span>↓</span></div>
  </div>
</section>

<style>
  .intro {
    position: relative;
    min-height: calc(100svh - var(--nav-h));
    display: grid;
    place-items: center;
    padding: 0 var(--gutter);
  }
  .stage {
    position: relative;
    width: 100%;
    max-width: var(--max);
    padding: 40px 0 70px;
  }

  .kicker {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 1.2px;
    padding: 5px 10px;
    background: var(--mint);
    color: var(--hard);
    border: 2px solid var(--hard);
    transform: rotate(-2deg);
    margin-bottom: 22px;
  }

  h1 {
    font-family: var(--f-display);
    font-size: clamp(38px, 7.4vw, 92px);
    line-height: 0.98;
    letter-spacing: -2px;
    max-width: 15ch;
  }
  .line { display: block; }
  .line.small { font-size: 0.62em; letter-spacing: -1px; }
  /* each word rides up out of its own clipping mask.
     The padding is breathing room so descenders and the AI badge's
     border/shadow don't clip at rest; the negative margins keep layout identical. */
  .word { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0.08em 0.06em 0.1em; margin: -0.08em 0 -0.1em; }
  .word > span { display: inline-block; }
  .mark {
    background: var(--yellow);
    color: var(--hard);
    border: 3px solid var(--hard);
    box-shadow: 5px 5px 0 var(--hard);
    padding: 0 0.12em;
    transform: rotate(-2deg);
  }
  /* anchor for the underline: keeps the word's ride-up mask intact while
     the stroke sits exactly under "homework." at any width */
  .uwrap { position: relative; display: inline-block; vertical-align: bottom; }
  .uwrap .rule {
    position: absolute;
    left: 0;
    width: 100%;
    height: auto;
    aspect-ratio: 200 / 14;
    bottom: -0.1em;
    overflow: visible;
    pointer-events: none;
  }
  .rule .ink {
    fill: none;
    stroke: var(--tomato);
    stroke-width: 5.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* dash = real path length (~190u), so offset 191 hides and 0 draws */
    stroke-dasharray: 191px;
    /* hidden until the timeline inks it in — avoids a fully-drawn flash on first paint */
    stroke-dashoffset: 191px;
  }
  @media (prefers-reduced-motion: reduce) {
    .rule .ink { stroke-dashoffset: 0; }
  }

  .lede {
    margin-top: 24px;
    max-width: 48ch;
    font-size: clamp(15px, 1.5vw, 19px);
    color: var(--muted);
  }
  .ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 28px; }

  /* Right-side cluster: one taped card that holds Byte, the NEW burst and the
     handwritten note together, instead of three stickers drifting apart.
     The card itself is the single `.doodle` so it pops in as one unit. */
  .doodles { position: absolute; top: 6px; right: 0; width: clamp(250px, 27vw, 370px); pointer-events: none; }
  .halo-card {
    position: relative;
    background: var(--card);
    border: 2.5px solid var(--ink);
    border-radius: 20px;
    box-shadow: 7px 7px 0 var(--ink);
    transform: rotate(2deg);
    padding: 20px 20px 12px;
  }
  .tape {
    top: -15px;
    left: 50%;
    width: 112px;
    transform: translateX(-50%) rotate(-5deg);
    border-left: 2px dashed rgba(17, 17, 17, .25);
    border-right: 2px dashed rgba(17, 17, 17, .25);
  }
  .byte { width: 86%; margin: 0 auto; }
  .tag {
    margin-top: 8px;
    font-family: var(--f-hand); font-size: 26px; line-height: 1.05;
    color: var(--blue); transform: rotate(-2deg); text-align: center;
  }

  .cue {
    position: absolute;
    left: 0; bottom: 0;
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; letter-spacing: 2px; color: var(--faint);
  }
  .cue span { animation: nudge 1.8s ease-in-out infinite; }
  @keyframes nudge { 50% { transform: translateY(5px); } }

  @media (max-width: 900px) {
    h1 { letter-spacing: -1px; max-width: none; }
    .lede { font-size: 15px; }
    .ctas { width: 100%; }
    .ctas :global(.btn) { flex: 1 1 160px; }
    .stage { padding-bottom: 84px; }
    /* compact borderless mini-cluster: the card chrome comes off so the solid
       card never covers headline text, but Byte + NEW stay paired */
    .doodles { top: 0; width: 118px; }
    .halo-card { background: transparent; border: none; box-shadow: none; padding: 0; transform: none; }
    .tape { display: none; }
    .byte { width: 100%; opacity: .92; }
    .tag { display: none; }
  }
</style>
