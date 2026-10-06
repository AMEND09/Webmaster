<script>
  import { rarity } from '../badges.js';

  /** A circular badge sticker with rarity tag. */
  let { badge, owned = true, size = 84, rot = 0, tag = true, highlight = false } = $props();

  let r = $derived(rarity[badge.r]);
  let hiddenLocked = $derived(!owned && badge.hidden);
</script>

<div
  class="sticker"
  class:locked={!owned}
  style:width="{size}px"
  style:height="{size}px"
  style:font-size="{Math.round(size * 0.31)}px"
  style:background={owned ? r[0] : 'var(--locked)'}
  style:color={owned ? r[1] : 'var(--faint)'}
  style:transform="rotate({rot}deg)"
  style:box-shadow="0 0 0 {Math.max(3, size * 0.06)}px var(--card), 0 0 0 {Math.max(5, size * 0.09)}px {highlight ? 'var(--tomato)' : 'var(--ink)'}"
>
  {hiddenLocked ? '?' : badge.g}
  {#if tag}
    <span class="tag" style:background={r[0]} style:color={r[1]}>{badge.r}</span>
  {/if}
</div>

<style>
  .sticker {
    position: relative; flex: none;
    border-radius: 50%;
    border: 3px solid var(--ink);
    display: grid; place-items: center;
    font-family: var(--f-display);
    line-height: 1;
    transition: transform .2s;
  }
  .sticker.locked { border-style: dashed; }
  .tag {
    position: absolute; right: -12px; bottom: -6px;
    font-family: var(--f-mono); font-size: 10px; font-weight: 700;
    padding: 2px 5px; border: 2px solid var(--ink); border-radius: 6px;
    line-height: 1.2;
  }
</style>
