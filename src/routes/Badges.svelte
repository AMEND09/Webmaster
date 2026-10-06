<script>
  import { badges, rarity } from '../lib/badges.js';
  import { app } from '../lib/store.svelte.js';
  import Sticker from '../lib/components/Sticker.svelte';

  const filters = ['ALL', 'C', 'UC', 'R', 'E', 'L'];
  let filter = $state('ALL');
  let shown = $derived(filter === 'ALL' ? badges : badges.filter((b) => b.r === filter));
  let count = $derived(badges.filter((b) => app.badges[b.id]).length);

  const latest = () => Object.entries(app.badges).sort((a, b) => b[1].localeCompare(a[1]))[0]?.[0];
  let selId = $state(latest() ?? 'glitch-hunter');
  let sel = $derived(badges.find((b) => b.id === selId));
  let owned = $derived(!!app.badges[sel.id]);

  const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }).toUpperCase();
</script>

<div class="page">
  <div class="page-head">
    <div>
      <h1 class="page-title">Sticker book</h1>
      <p class="muted sub">{count} of {badges.length} found. Some hide in lessons, some hide on the site itself.</p>
    </div>
    <div class="filters mono">
      {#each filters as f}
        <button class:on={filter === f} style:background={f === 'ALL' ? (filter === f ? 'var(--ink)' : 'transparent') : rarity[f][0]}
          style:color={f === 'ALL' ? (filter === f ? 'var(--paper)' : 'var(--ink)') : rarity[f][1]}
          onclick={() => (filter = f)} aria-pressed={filter === f} title={f === 'ALL' ? 'All' : rarity[f][2]}>{f}</button>
      {/each}
    </div>
  </div>

  <div class="grid">
    <div class="book card-lg">
      {#each shown as b, i (b.id)}
        {@const own = !!app.badges[b.id]}
        <button class="slot" class:dim={!own} class:cur={b.id === selId} onclick={() => (selId = b.id)}>
          <Sticker badge={b} owned={own} rot={((badges.indexOf(b) * 37) % 9) - 4} highlight={b.id === selId} />
          <span class="n">{own || !b.hidden ? b.name : '???'}</span>
        </button>
      {/each}
    </div>

    <div class="side">
      <div class="detail" style:box-shadow="7px 7px 0 {owned ? '#ff5a36' : 'var(--faint)'}">
        <div class="rtag mono" style:background={rarity[sel.r][0]} style:color={rarity[sel.r][1]}>{rarity[sel.r][2].toUpperCase()}</div>
        <div class="big"><Sticker badge={sel} owned={owned} size={150} rot={-8} tag={false} /></div>
        <div class="display name">{owned || !sel.hidden ? sel.name : '???'}</div>
        <div class="desc">
          {#if owned}{sel.desc}{:else if sel.hidden}This one has a hidden trigger. Keep exploring.{:else}{sel.desc}{/if}
        </div>
        <div class="mono meta">
          {#if owned}<span>EARNED {fmtDate(app.badges[sel.id])}</span>{:else}<span>NOT FOUND YET</span>{/if}
        </div>
      </div>
      <div class="hand psst">psst… the “???” ones each have a hidden trigger</div>
    </div>
  </div>
</div>

<style>
  .sub { font-size: 15px; margin-top: 6px; }
  .filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .filters button { padding: 6px 12px; border: 2px solid var(--ink); border-radius: 999px; font-size: 12px; font-weight: 700; cursor: pointer; }
  .filters button.on { outline: 3px solid var(--tomato); outline-offset: 2px; }
  .grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 30px; align-items: start; }
  .book { padding: 30px 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); row-gap: 30px; column-gap: 8px; min-height: 400px; align-content: start; }
  .slot { display: flex; flex-direction: column; align-items: center; gap: 14px; background: none; border: 0; padding: 6px 0; cursor: pointer; }
  .slot.dim { opacity: .75; }
  .slot:hover :global(.sticker) { transform: rotate(0deg) scale(1.08) !important; }
  .n { font-size: 12px; font-weight: 700; text-align: center; line-height: 1.15; max-width: 110px; }
  .side { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
  .detail {
    background: #141414; color: #f3eee3; border: 3px solid #141414; border-radius: 18px;
    padding: 28px 24px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center;
  }
  :root[data-theme='dark'] .detail { background: #0c0c0f; border-color: #f3eee3; }
  .detail :global(.sticker) { --card: #141414; --ink: #f3eee3; }
  .rtag { font-size: 12px; padding: 4px 10px; border-radius: 6px; }
  .big { margin: 18px 0; }
  .name { font-size: 28px; line-height: 1.1; }
  .desc { font-size: 15px; line-height: 1.5; color: #cfc8b8; }
  .meta { font-size: 12px; color: var(--yellow); }
  .psst { font-size: 21px; color: var(--muted); transform: rotate(-2deg); }

  @media (max-width: 1000px) {
    .grid { grid-template-columns: 1fr; }
    .side { position: static; order: -1; }
    .detail { flex-direction: row; flex-wrap: wrap; text-align: left; align-items: center; gap: 10px 18px; padding: 18px; }
    .big { margin: 8px; }
    .big :global(.sticker) { width: 84px !important; height: 84px !important; font-size: 26px !important; }
    .rtag { order: 3; }
    .name { font-size: 22px; flex: 1; min-width: 150px; }
    .desc, .meta { width: 100%; }
    .psst { display: none; }
  }
  @media (max-width: 600px) {
    .book { grid-template-columns: repeat(3, 1fr); padding: 22px 6px; row-gap: 24px; }
    .book :global(.sticker) { width: 70px !important; height: 70px !important; font-size: 22px !important; }
    .n { font-size: 11px; }
  }
</style>
