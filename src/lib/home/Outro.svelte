<script>
  import { onMount, onDestroy } from 'svelte';
  import { revealOnce } from '../scroll/scene.js';

  let { cta = { href: '#/tour', label: 'Start the tour' } } = $props();

  let root;
  let teardown;

  const ticker = [
    'NEURAL NETWORKS', 'NEXT-WORD PREDICTION', 'PROMPTING', 'DEEPFAKES', 'OVERFITTING',
    'DATA POISONING', 'LINEAR ALGEBRA', 'CONTEXT ENGINEERING', 'ACADEMIC HONESTY',
  ];
  const starColors = ['#ff5a36', '#6fdcb0', '#ff9ecb', '#3a5bff'];

  onMount(() => {
    // Deliberately not pinned. The reader has arrived; the page should not
    // hold them hostage while they try to click something.
    teardown = revealOnce(root, (tl, { q }) => {
      tl.from(q('.big'), { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from(q('.note'), { y: 24, opacity: 0, duration: 0.5 }, '-=0.45')
        .from(q('.ctas > *'), { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');
    });
  });

  onDestroy(() => teardown?.());
</script>

<section class="outro" bind:this={root}>
  <div class="stage">
    <h2 class="big">That is the whole map.<br />Now go poke at it.</h2>
    <p class="note">
      Nineteen lessons, four playable models and a pile of cases to crack.
      Your progress saves to this browser — no sign-up, no email.
    </p>
    <div class="ctas">
      <a class="btn btn-primary" href={cta.href}>{cta.label} →</a>
      <a class="btn" href="#/lessons">Browse all lessons</a>
      <a class="btn btn-dashed" href="#/lab">Play in the lab</a>
    </div>
  </div>

  <div class="ticker" aria-hidden="true">
    <div class="track">
      {#each [0, 1] as _}
        {#each ticker as t, i}<span>{t}</span><span style:color={starColors[i % 4]}>✶</span>{/each}
      {/each}
    </div>
  </div>
</section>

<style>
  .outro { padding: clamp(60px, 14vh, 140px) 0 0; }
  .stage {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 var(--gutter) clamp(50px, 10vh, 110px);
  }
  .big {
    font-family: var(--f-display);
    font-size: clamp(30px, 5.2vw, 64px);
    line-height: 1.02;
    letter-spacing: -1.5px;
  }
  .note { margin-top: 18px; max-width: 52ch; font-size: clamp(14px, 1.4vw, 18px); color: var(--muted); }
  .ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }

  .ticker {
    height: 46px;
    background: #111;
    color: var(--yellow);
    display: flex;
    align-items: center;
    overflow: hidden;
    transform: rotate(-1deg) scale(1.04);
    font-family: var(--f-mono);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.5px;
    white-space: nowrap;
  }
  .track { display: flex; gap: 28px; padding-left: 28px; animation: marquee 40s linear infinite; }
  @keyframes marquee { to { transform: translateX(-50%); } }

  @media (max-width: 900px) {
    .ctas :global(.btn) { flex: 1 1 100%; }
  }
</style>
