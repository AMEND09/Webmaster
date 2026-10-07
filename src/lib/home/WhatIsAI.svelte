<script>
  import { onMount, onDestroy } from 'svelte';
  import { scrubScene } from '../scroll/scene.js';

  let root;
  let teardown;

  const examples = [
    'finishes your sentence',
    'flags a tumour on a scan',
    'picks the next video',
    'draws a cat astronaut',
    'translates Urdu → English',
    'sorts spam from real mail',
  ];

  onMount(() => {
    teardown = scrubScene(root, (tl, { q }) => {
      tl.from(q('.head .word > span'), { yPercent: 115, duration: 1, stagger: 0.08, ease: 'power3.out' })
        .from(q('.swipe'), { scaleX: 0, duration: 0.8, ease: 'power2.inOut' }, '>-0.2')
        .from(q('.sub'), { y: 20, opacity: 0, duration: 0.7 }, '<0.2')
        .from(q('.chip'), {
          scale: 0,
          y: 'random(-50, 50)',
          rotate: 'random(-25, 25)',
          opacity: 0,
          duration: 0.8,
          stagger: 0.13,
          ease: 'back.out(2.2)',
        }, '>-0.1')
        .from(q('.card-old'), { xPercent: -130, rotate: -9, opacity: 0, duration: 1, ease: 'power3.out' }, '>0.1')
        .from(q('.card-new'), { xPercent: 130, rotate: 9, opacity: 0, duration: 1, ease: 'power3.out' }, '<')
        // the strike wipes in left-to-right (a clip reveal, not a dash draw:
        // dash units go haywire under a stretched viewBox, clip can't).
        // ease is linear on purpose: under scrub the line should track the scroll 1:1.
        .fromTo(q('.strike'),
          { clipPath: 'inset(-8% 100% -8% 0%)' },
          { clipPath: 'inset(-8% 0% -8% 0%)', duration: 0.9, ease: 'none' }, '>0.15')
        .from(q('.verdict'), { opacity: 0, y: 10, duration: 0.5 }, '>');
    });
  });

  onDestroy(() => teardown?.());
</script>

<section class="scene" bind:this={root}>
  <div class="stage">
    <h2 class="head">
      <span class="word"><span>So…</span></span>
      <span class="word"><span>what</span></span>
      <span class="word"><span>is</span></span>
      <span class="word"><span>AI?</span></span>
    </h2>

    <p class="sub">
      Not a brain in a box. It is software that
      <span class="hl"><span class="swipe" aria-hidden="true"></span><em>learns patterns from examples</em></span>
      instead of following rules a person typed out by hand.
    </p>

    <ul class="chips">
      {#each examples as e}
        <li class="chip">{e}</li>
      {/each}
    </ul>

    <div class="compare">
      <div class="col card-old">
        <div class="card pane">
          <div class="tagline mono">THE OLD WAY</div>
          <h3>Someone writes the rules</h3>
          <p>“If the subject line says <em>free money</em>, call it spam.” A human thinks of every case, by hand, forever.</p>
          <svg class="strike" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 90 Q44 48 94 10" />
          </svg>
        </div>
      </div>

      <div class="col card-new">
        <div class="card pane new">
          <div class="tagline mono">WHAT AI DOES</div>
          <h3>It works the rules out</h3>
          <p>“Here are 100,000 emails people marked spam.” The model finds what they have in common — including things nobody thought to write down.</p>
        </div>
      </div>
    </div>

    <p class="verdict hand">that shift is the whole trick ↑</p>
  </div>
</section>

<style>
  .scene {
    position: relative;
    min-height: 100svh;
    height: 100svh;
    display: grid;
    place-items: center;
    padding: var(--nav-h) var(--gutter) 0;
    overflow: clip;
  }
  .stage { width: 100%; max-width: var(--max); }

  .head {
    font-family: var(--f-display);
    font-size: clamp(34px, 6vw, 76px);
    line-height: 1;
    letter-spacing: -1.5px;
  }
  .word { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.04em; }
  .word > span { display: inline-block; }

  .sub {
    margin-top: 16px;
    max-width: 56ch;
    font-size: clamp(15px, 1.6vw, 20px);
    color: var(--muted);
  }
  .hl { position: relative; display: inline-block; }
  .hl em { position: relative; font-style: normal; font-weight: 700; color: var(--ink); }
  /* highlighter swipe: a block of colour painted left to right, behind the words */
  .swipe {
    position: absolute;
    left: -0.2em; right: -0.2em; top: 0.05em; bottom: -0.05em;
    background: var(--yellow);
    transform-origin: left center;
    border-radius: 2px;
  }

  .chips {
    list-style: none; margin: 22px 0 0; padding: 0;
    display: flex; flex-wrap: wrap; gap: 9px;
  }
  .chip {
    padding: 6px 13px;
    border: 2.5px solid var(--ink);
    border-radius: 999px;
    background: var(--card);
    font-family: var(--f-mono);
    font-size: clamp(11px, 1.1vw, 13px);
    font-weight: 700;
    white-space: nowrap;
  }
  .chip:nth-child(3n + 1) { background: var(--tint-blue); }
  .chip:nth-child(3n + 2) { background: var(--tint-pink); }

  .compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(14px, 2vw, 26px);
    margin-top: clamp(18px, 3vh, 34px);
  }
  .pane { position: relative; padding: clamp(14px, 2vw, 22px); height: 100%; }
  .pane.new { background: var(--tint-blue); }
  .tagline { font-size: 10px; letter-spacing: 1.4px; color: var(--muted); }
  .pane h3 {
    font-family: var(--f-display);
    font-size: clamp(16px, 2vw, 24px);
    margin: 6px 0 8px;
    letter-spacing: -0.4px;
  }
  .pane p { font-size: clamp(12.5px, 1.25vw, 15px); color: var(--muted); }
  .pane p em { font-style: italic; color: var(--ink); }

  /* Full-bleed diagonal: straight lines can't warp under non-uniform scaling,
     so the strike always spans the card and only its angle flexes with aspect.
     The svg bleeds past the card edges so the round caps never clip.
     Hidden/revealed with clip-path (dash lengths misbehave in a stretched
     viewBox, so the draw is a wipe — the path's x increases monotonically,
     so a left-to-right wipe reads as drawing). */
  .strike { position: absolute; inset: -4%; width: 108%; height: 108%; pointer-events: none; overflow: visible; clip-path: inset(-8% 100% -8% 0%); }
  .strike path {
    fill: none;
    stroke: var(--tomato);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* constant marker weight at any card size */
    vector-effect: non-scaling-stroke;
  }
  @media (prefers-reduced-motion: reduce) {
    .strike { clip-path: inset(-8% 0 -8% 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .strike path { stroke-dashoffset: 0; }
  }

  .verdict {
    margin-top: 14px;
    text-align: right;
    font-size: clamp(18px, 2vw, 24px);
    color: var(--blue);
    transform: rotate(-1.5deg);
  }

  @media (max-width: 760px) {
    .chips { gap: 7px; }
    .chip { padding: 5px 10px; }
    .compare { grid-template-columns: 1fr; }
    .verdict { display: none; }
  }
</style>
