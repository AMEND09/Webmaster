<script>
  import { fly } from 'svelte/transition';
  import { toasts } from '../store.svelte.js';
  import { badgeById } from '../badges.js';
  import Sticker from './Sticker.svelte';
</script>

<div class="toasts" aria-live="polite">
  {#each toasts as t (t.id)}
    <div class="toast {t.kind}" in:fly={{ y: 30, duration: 250 }} out:fly={{ x: 60, duration: 200 }}>
      {#if t.kind === 'badge'}
        <Sticker badge={badgeById[t.badge]} size={48} rot={-6} tag={false} />
      {:else if t.kind === 'level'}
        <div class="burst lvl">LV</div>
      {/if}
      <div>
        <div class="sub">{t.sub}</div>
        <div class="text">{t.text}</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .toasts {
    position: fixed; right: 20px; bottom: 20px; z-index: 100;
    display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
    pointer-events: none;
  }
  .toast {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 16px; border: 2.5px solid var(--hard); border-radius: 12px;
    box-shadow: 4px 4px 0 var(--hard);
    background: var(--yellow); color: var(--hard);
    transform: rotate(-1.5deg);
  }
  .toast.badge { background: var(--card); color: var(--ink); border-color: var(--ink); box-shadow: 4px 4px 0 var(--tomato); padding: 14px 18px 14px 16px; }
  .toast.level { background: var(--blue); color: #fff; }
  .sub { font-family: var(--f-mono); font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .text { font-family: var(--f-display); font-size: 18px; line-height: 1.1; }
  .lvl { width: 46px; height: 46px; background: var(--yellow); color: var(--hard); font-family: var(--f-display); font-size: 13px; }
  @media (max-width: 900px) {
    .toasts { bottom: 90px; right: 14px; }
  }
</style>
