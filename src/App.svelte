<script>
  import { route } from './lib/router.svelte.js';
  import { award } from './lib/store.svelte.js';
  import Nav from './lib/components/Nav.svelte';
  import Toasts from './lib/components/Toasts.svelte';
  import Home from './routes/Home.svelte';
  import Tour from './routes/Tour.svelte';
  import MapPage from './routes/Map.svelte';
  import Lessons from './routes/Lessons.svelte';
  import Lesson from './routes/Lesson.svelte';
  import Quiz from './routes/Quiz.svelte';
  import Lab from './routes/Lab.svelte';
  import Detective from './routes/Detective.svelte';
  import Case from './routes/Case.svelte';
  import Badges from './routes/Badges.svelte';
  import Dashboard from './routes/Dashboard.svelte';
  import Reference from './routes/Reference.svelte';
  import NotFound from './routes/NotFound.svelte';

  let p = $derived(route.parts);

  // ↑ ↑ ↓ ↓ ← → ← → B A
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  function onkeydown(e) {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = k === konami[pos] ? pos + 1 : k === konami[0] ? 1 : 0;
    if (pos === konami.length) { pos = 0; award('cheat-code'); }
  }
</script>

<svelte:window {onkeydown} />

{#if p[0] !== 'tour'}
  <Nav />
{/if}

<main>
  {#key route.path}
    {#if p.length === 0}
      <Home />
    {:else if p[0] === 'tour'}
      <Tour />
    {:else if p[0] === 'map'}
      <MapPage />
    {:else if p[0] === 'lessons'}
      <Lessons />
    {:else if p[0] === 'lesson' && p[1]}
      <Lesson id={p[1]} step={Number(p[2] ?? 1) - 1} />
    {:else if p[0] === 'quiz' && p[1]}
      <Quiz id={p[1]} />
    {:else if p[0] === 'lab'}
      <Lab />
    {:else if p[0] === 'detective' && p[1]}
      <Case id={p[1]} />
    {:else if p[0] === 'detective'}
      <Detective />
    {:else if p[0] === 'badges'}
      <Badges />
    {:else if p[0] === 'me'}
      <Dashboard />
    {:else if p[0] === 'reference'}
      <Reference />
    {:else}
      <NotFound />
    {/if}
  {/key}
</main>

{#if p[0] !== 'tour'}
  <footer class="sitefoot">
    <a href="#/reference">Reference Page</a>
  </footer>
{/if}

<Toasts />

<style>
  .sitefoot {
    border-top: 2.5px solid var(--ink);
    padding: 18px var(--gutter) 26px;
    text-align: center;
    font-family: var(--f-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
  }
  .sitefoot a { color: var(--ink); }
</style>
