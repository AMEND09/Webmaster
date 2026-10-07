<script>
  import { onMount, onDestroy } from 'svelte';
  import { lessons } from '../lib/data/lessons.js';
  import { zones } from '../lib/data/zones.js';
  import { app, currentLesson } from '../lib/store.svelte.js';
  import { startSmoothScroll, stopSmoothScroll, ScrollTrigger } from '../lib/scroll/smooth.js';
  import Intro from '../lib/home/Intro.svelte';
  import WhatIsAI from '../lib/home/WhatIsAI.svelte';
  import Chapter from '../lib/home/Chapter.svelte';
  import Outro from '../lib/home/Outro.svelte';

  const art = { foundations: 'brain', toolbox: 'toolbox', ethics: 'scale' };
  const lede = {
    foundations: 'Weights, training loops, and why a chatbot sometimes sounds certain about things that are not true.',
    toolbox: 'Prompts that actually work, studying with AI without outsourcing the thinking, and catching it when it is wrong.',
    ethics: 'Deepfakes, honesty, bias, privacy and what it costs to run. The part that decides whether AI helps or hurts.',
  };

  // Six cards per chapter — the deal beat is timed for exactly six.
  const chapters = zones.map((z) => ({
    zone: z,
    art: art[z.id],
    lede: lede[z.id],
    cards: lessons.filter((l) => l.zone === z.id).slice(0, 6),
  }));

  let next = $derived(app.xp > 0 ? currentLesson() : null);
  let cta = $derived(
    next ? { href: `#/lesson/${next.id}`, label: `Continue: ${next.title}` }
         : { href: '#/tour', label: 'Start the tour' },
  );

  onMount(() => {
    window.scrollTo(0, 0);
    startSmoothScroll();

    // Webfonts land after first paint and reflow every headline, which moves
    // every pin start/end. Re-measure once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    // One more pass after the scenes have registered their triggers.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  });

  onDestroy(() => {
    stopSmoothScroll();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);
  });
</script>

<div class="home">
  <Intro {cta} />
  <WhatIsAI />
  {#each chapters as c (c.zone.id)}
    <Chapter zone={c.zone} art={c.art} lede={c.lede} cards={c.cards} />
  {/each}
  <Outro {cta} />
</div>

<style>
  /* No `overflow: hidden` anywhere up the tree — it silently breaks pinning. */
  .home { position: relative; }
</style>
