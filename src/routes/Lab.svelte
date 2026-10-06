<script>
  import { app, checkBadges } from '../lib/store.svelte.js';
  import NetworkTab from '../lib/components/NetworkTab.svelte';
  import ConvTab from '../lib/components/ConvTab.svelte';
  import VectorsTab from '../lib/components/VectorsTab.svelte';

  const tabs = ['Network', 'Convolution', 'Vectors'];
  let tab = $state('Network');

  $effect(() => {
    if (!app.lab.tabs.includes(tab)) {
      app.lab.tabs.push(tab);
      checkBadges();
    }
  });
</script>

<div class="page">
  <div class="page-head">
    <div>
      <div class="eyebrow">FOUNDATIONS / NEURAL NETWORKS</div>
      <h1 class="page-title">Network playground</h1>
    </div>
    <div class="tabs mono" role="tablist">
      {#each tabs as t}
        <button role="tab" aria-selected={tab === t} class:on={tab === t} onclick={() => (tab = t)}>{t}</button>
      {/each}
    </div>
  </div>

  {#if tab === 'Network'}
    <NetworkTab />
  {:else if tab === 'Convolution'}
    <ConvTab />
  {:else}
    <VectorsTab />
  {/if}
</div>

<style>
  .tabs { display: flex; border: 2.5px solid var(--ink); border-radius: 12px; overflow: hidden; background: var(--card); }
  .tabs button { padding: 9px 16px; border: 0; background: transparent; font-size: 13px; font-weight: 700; cursor: pointer; }
  .tabs button + button { border-left: 2.5px solid var(--ink); }
  .tabs button.on { background: var(--ink); color: var(--paper); }
  @media (max-width: 600px) {
    .tabs { width: 100%; }
    .tabs button { flex: 1; padding: 9px 6px; font-size: 12px; }
  }
</style>
