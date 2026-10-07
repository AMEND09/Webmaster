<script>
  import { onMount, onDestroy } from 'svelte';
  import { scrubScene } from '../scroll/scene.js';
  import Art from '../components/Art.svelte';

  let { zone, art, lede, cards = [] } = $props();

  let root;
  let teardown;

  onMount(() => {
    teardown = scrubScene(root, (tl, { q }) => {
      tl.from(q('.kicker'), { xPercent: -120, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(q('.icon'), { rotate: -140, scale: 0.4, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, '<0.15')
        .from(q('.title .word > span'), { yPercent: 115, duration: 0.9, stagger: 0.09, ease: 'power3.out' }, '<0.25')
        .fromTo(q('.rule path'), { strokeDashoffset: 231 }, { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, '>-0.15')
        .from(q('.lede'), { y: 18, opacity: 0, duration: 0.6 }, '<0.1')
        // the signature beat: six cards dealt onto the desk, one at a time.
        // 0.42 is the number that matters — long enough that each card is its
        // own event as you scroll, instead of a blur of six.
        .from(q('.topic'), {
          yPercent: 90,
          xPercent: 'random(-18, 18)',
          rotate: 'random(-14, 14)',
          scale: 0.82,
          opacity: 0,
          duration: 1.1,
          stagger: 0.42,
          ease: 'back.out(1.5)',
        }, '>0.1');
    });
  });

  onDestroy(() => teardown?.());
</script>

<section class="scene" bind:this={root}>
  <div class="stage">
    <div class="side">
      <div class="kicker mono" style:background={zone.bg} style:color={zone.fg}>
        CHAPTER {zone.n} · {zone.name.toUpperCase()}
      </div>

      <div class="icon" style:background={zone.tint}><Art kind={art} /></div>

      <h2 class="title">
        {#each zone.tourTitle.split(' ') as w}
          <span class="word"><span>{w}</span></span>
        {/each}
      </h2>

      <svg class="rule" viewBox="0 0 240 14" aria-hidden="true">
        <path d="M5 9 C 62 4, 168 12, 235 6" />
      </svg>

      <p class="lede">{lede}</p>
    </div>

    <ul class="deck">
      {#each cards as c}
        <li class="topic card">
          <a href="#/lesson/{c.id}">
            <span class="mono mins">{c.minutes} MIN</span>
            <span class="t">{c.title}</span>
            <span class="b">{c.blurb}</span>
          </a>
        </li>
      {/each}
    </ul>
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
  .stage {
    width: 100%;
    max-width: var(--max);
    display: grid;
    grid-template-columns: minmax(260px, 0.78fr) 1.22fr;
    gap: clamp(20px, 4vw, 56px);
    align-items: center;
  }

  .side { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
  .kicker {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    padding: 5px 11px;
    border: 2.5px solid var(--hard);
    transform: rotate(-2deg);
  }
  .icon {
    width: clamp(66px, 8vw, 104px);
    height: clamp(66px, 8vw, 104px);
    border: 2.5px solid var(--ink);
    border-radius: 16px;
    padding: 8px;
    box-shadow: 4px 4px 0 var(--ink);
  }
  .icon :global(svg) { width: 100%; height: 100%; display: block; }

  .title {
    font-family: var(--f-display);
    font-size: clamp(28px, 4.2vw, 54px);
    line-height: 1;
    letter-spacing: -1.2px;
  }
  .word { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.05em; }
  .word > span { display: inline-block; }

  .rule { width: min(260px, 100%); height: auto; aspect-ratio: 240 / 14; overflow: visible; }
  .rule path {
    fill: none;
    stroke: var(--tomato);
    stroke-width: 4.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* dash = real path length (~230u), so offset 231 hides and 0 draws */
    stroke-dasharray: 231px;
    /* hidden until the scrubbed timeline draws it — avoids a fully-drawn flash on first paint */
    stroke-dashoffset: 231px;
  }
  @media (prefers-reduced-motion: reduce) {
    .rule path { stroke-dashoffset: 0; }
  }

  .lede { max-width: 42ch; font-size: clamp(13px, 1.3vw, 16px); color: var(--muted); }

  .deck {
    list-style: none; margin: 0; padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(10px, 1.4vw, 18px);
  }
  .topic { will-change: transform; }
  .topic a {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    padding: clamp(11px, 1.3vw, 16px);
    text-decoration: none;
    color: var(--ink);
  }
  .topic { transition: box-shadow .15s ease; }
  .topic:hover { box-shadow: 8px 8px 0 var(--ink); }
  .mins { font-size: 10px; color: var(--muted); letter-spacing: 1px; }
  .t {
    font-family: var(--f-display);
    font-size: clamp(14px, 1.5vw, 18px);
    line-height: 1.1;
    letter-spacing: -0.3px;
  }
  .b {
    font-size: clamp(11px, 1.05vw, 13px);
    line-height: 1.35;
    color: var(--muted);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 980px) {
    .stage { grid-template-columns: 1fr; gap: 18px; align-content: center; }
    .side { gap: 9px; }
    .icon { position: absolute; right: 0; top: 0; }
    .lede { max-width: none; }
    .deck { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .b { -webkit-line-clamp: 2; line-clamp: 2; }
  }
  @media (max-width: 560px) {
    .icon { width: 58px; height: 58px; box-shadow: 3px 3px 0 var(--ink); }
    .deck { gap: 8px; }
    .b { display: none; }
  }
</style>
