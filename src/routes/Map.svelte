<script>
  import { lessons } from '../lib/data/lessons.js';
  import { zones, zoneById } from '../lib/data/zones.js';
  import { app, isUnlocked, currentLesson, MEDAL_XP, STEP_XP, MEDAL_NAME } from '../lib/store.svelte.js';
  import { go } from '../lib/router.svelte.js';

  // Board coordinates (node centres) on a 1180×620 canvas, one snake per zone.
  const pts = [[120,540],[280,465],[120,390],[280,315],[120,240],[280,165],[150,90],[500,90],[660,165],[500,240],[660,315],[500,390],[660,465],[500,540],[880,540],[1040,465],[880,390],[1040,315],[880,240],[1040,165],[900,90]];
  const path = 'M' + pts.map((p) => p.join(',')).join(' L');
  const fill = { G: '#ffc531', S: '#d9dde3', B: '#e0a172', now: '#ff5a36', open: 'var(--card)', lock: 'var(--locked)' };

  let current = $derived(currentLesson());
  let nodes = $derived(lessons.map((l, i) => {
    const medal = app.medals[l.id];
    const s = medal ?? (l === current ? 'now' : isUnlocked(i) ? 'open' : 'lock');
    return { l, i, s, x: pts[i][0], y: pts[i][1] };
  }));
  let selectedId = $state(null);
  let sel = $derived(nodes.find((n) => n.l.id === (selectedId ?? current?.id)) ?? null);

  let w = $state(1180);
  let scale = $derived(Math.min(1, w / 1180));

  const xpFor = (l) => l.steps.length * STEP_XP + MEDAL_XP.G;

  function open(n) {
    if (n.s === 'lock') { selectedId = n.l.id; return; }
    if (selectedId === n.l.id || (!selectedId && n.s === 'now')) go(`/lesson/${n.l.id}`);
    else selectedId = n.l.id;
  }

  // Mobile: vertical zig-zag
  let mw = $state(340);
  let mobile = $derived.by(() => {
    let y = 30;
    const out = [];
    lessons.forEach((l, i) => {
      if (i === 0 || lessons[i - 1].zone !== l.zone) { y += 50; out.push({ header: zoneById[l.zone], y: y - 50 }); }
      out.push({ ...nodes[i], mx: i % 2 ? mw * 0.7 : mw * 0.3, my: y + 26 });
      y += 86;
    });
    return { items: out, h: y + 10 };
  });
  let mpath = $derived('M' + mobile.items.filter((n) => !n.header).map((n) => `${n.mx},${n.my}`).join(' L'));
</script>

<div class="page">
  <div class="page-head">
    <div>
      <h1 class="page-title">The Map</h1>
      <p class="muted sub">Pass a lesson's quiz to unlock the next stop. Better score, shinier medal.</p>
    </div>
    <div class="legend mono">
      <span><i style:background="#ffc531"></i>GOLD</span>
      <span><i style:background="#d9dde3"></i>SILVER</span>
      <span><i style:background="#e0a172"></i>BRONZE</span>
      <span><i style:background="#ff5a36"></i>YOU ARE HERE</span>
      <span><i class="dashed"></i>LOCKED</span>
    </div>
  </div>

  <!-- Desktop board -->
  <div class="board-wrap" bind:clientWidth={w} style:height="{620 * scale + 8}px">
    <div class="board card-lg" style:transform="scale({scale})">
      <div class="blob" style="left:14px;width:370px;background:var(--tint-blue);border-radius:60% 40% 55% 45% / 45% 55% 45% 55%"></div>
      <div class="blob" style="left:400px;width:370px;background:var(--tint-yellow);border-radius:45% 55% 40% 60% / 55% 45% 55% 45%"></div>
      <div class="blob" style="left:790px;width:376px;background:var(--tint-pink);border-radius:55% 45% 60% 40% / 40% 60% 40% 60%"></div>
      <svg width="1180" height="620" class="trail"><path d={path} /></svg>
      <div class="zlabel" style="left:24px;top:22px;background:#3a5bff;color:#fff;transform:rotate(-3deg)">01 FOUNDATIONS</div>
      <div class="zlabel" style="left:740px;top:574px;background:#ffe14d;transform:rotate(2deg)">02 TOOLBOX</div>
      <div class="zlabel" style="left:1050px;top:574px;background:#ff9ecb;transform:rotate(-2deg)">03 ETHICS</div>

      {#each nodes as n (n.l.id)}
        <button
          class="node {n.s}"
          class:sel={sel === n}
          style:left="{n.x - 30}px" style:top="{n.y - 30}px" style:background={fill[n.s]}
          onclick={() => open(n)}
          aria-label="{n.l.title}{n.s === 'lock' ? ' (locked)' : ''}"
        >{n.s === 'now' ? '▶' : ['G', 'S', 'B'].includes(n.s) ? n.s : ''}</button>
        <div class="nlabel" class:locked={n.s === 'lock'} style:left="{n.x - 60}px" style:top="{n.y + 34}px">{n.l.title}</div>
      {/each}

      {#if current}
        {@const c = nodes.find((n) => n.l === current)}
        <div class="you mono" style:left="{c.x + 26}px" style:top="{c.y - 44}px">YOU</div>
      {/if}

      {#if sel}
        {@const left = sel.x > 1000 ? sel.x - 192 : sel.x + 42}
        {@const top = Math.min(sel.y + 31, 440)}
        <div class="popcard card" style:left="{left}px" style:top="{top}px">
          <div class="mono kind" class:lockc={sel.s === 'lock'}>
            {sel.s === 'now' ? 'UP NEXT' : sel.s === 'lock' ? 'LOCKED' : sel.s === 'open' ? 'OPEN' : `${MEDAL_NAME[sel.s].toUpperCase()} MEDAL`}
          </div>
          <div class="display ptitle">{sel.l.title}</div>
          {#if sel.s === 'lock'}
            <div class="pmeta">Pass “{lessons[sel.i - 1].title}” to unlock.</div>
          {:else}
            <div class="pmeta">{sel.l.minutes} min · +{xpFor(sel.l)} XP</div>
            <a class="pbtn" href="#/lesson/{sel.l.id}">{sel.s === 'now' || sel.s === 'open' ? 'Start' : 'Review'}</a>
            {#if ['B', 'S'].includes(sel.s)}<a class="pbtn alt" href="#/quiz/{sel.l.id}">Retake quiz</a>{/if}
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <!-- Mobile trail -->
  <div class="mtrail" bind:clientWidth={mw} style:height="{mobile.h}px">
    <svg width={mw} height={mobile.h} class="trail"><path d={mpath} /></svg>
    {#each mobile.items as it}
      {#if it.header}
        <div class="zlabel mz" style:top="{it.y + 8}px" style:background={it.header.bg} style:color={it.header.fg}>{it.header.n} {it.header.name.toUpperCase()}</div>
      {:else}
        {@const right = it.i % 2 === 1}
        <a class="node m {it.s}" href={it.s === 'lock' ? undefined : `#/lesson/${it.l.id}`}
          style:left="{it.mx - 26}px" style:top="{it.my - 26}px" style:background={fill[it.s]}
          aria-label="{it.l.title}{it.s === 'lock' ? ' (locked)' : ''}">{it.s === 'now' ? '▶' : ['G', 'S', 'B'].includes(it.s) ? it.s : ''}</a>
        {#if it.s === 'now'}
          <a class="here card" href="#/lesson/{it.l.id}" style:top="{it.my - 34}px" style={right ? `right:${mw - it.mx + 40}px` : `left:${it.mx + 40}px`}>
            <span class="mono">YOU ARE HERE</span>
            <span class="display">{it.l.title}</span>
            <span class="muted">+{xpFor(it.l)} XP</span>
          </a>
        {:else}
          <div class="mlabel" class:locked={it.s === 'lock'} style:top="{it.my - 10}px"
            style={right ? `right:${mw - it.mx + 38}px;text-align:right` : `left:${it.mx + 38}px`}>{it.l.title}</div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

<style>
  .sub { font-size: 15px; margin-top: 6px; }
  .legend { display: flex; gap: 14px; font-size: 12px; align-items: center; flex-wrap: wrap; }
  .legend span { display: flex; align-items: center; gap: 6px; }
  .legend i { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--ink); }
  .legend i.dashed { background: var(--locked); border-style: dashed; }

  .board-wrap { position: relative; }
  .board { position: absolute; left: 0; top: 0; width: 1180px; height: 620px; overflow: hidden; transform-origin: 0 0; }
  .blob { position: absolute; top: 14px; height: 592px; }
  .trail { position: absolute; inset: 0; pointer-events: none; }
  .trail path { fill: none; stroke: var(--ink); stroke-width: 3; stroke-dasharray: 2 10; stroke-linecap: round; stroke-linejoin: round; }
  .zlabel { position: absolute; font-family: var(--f-mono); font-size: 11px; font-weight: 700; color: #111; padding: 4px 8px; border: 2px solid #111; }

  .node {
    position: absolute; width: 60px; height: 60px; border-radius: 50%; padding: 0;
    border: 3px solid var(--ink); box-shadow: 3px 3px 0 var(--ink);
    display: grid; place-items: center; cursor: pointer;
    font-family: var(--f-display); font-size: 20px; color: #111; text-decoration: none;
    transition: transform .15s;
  }
  .node:hover { transform: scale(1.08) rotate(-4deg); }
  .node.now { color: #fff; box-shadow: 0 0 0 6px rgba(255, 90, 54, .25); animation: pulse 2s infinite; }
  .node.lock { border-style: dashed; box-shadow: none; cursor: help; }
  .node.sel:not(.now) { outline: 3px solid var(--tomato); outline-offset: 4px; }
  @keyframes pulse { 50% { box-shadow: 0 0 0 12px rgba(255, 90, 54, .12); } }
  .nlabel { position: absolute; width: 120px; text-align: center; font-size: 12px; font-weight: 700; line-height: 1.15; pointer-events: none; }
  .nlabel.locked, .mlabel.locked { color: var(--faint); }
  .you { position: absolute; font-size: 11px; background: #111; color: #fff; padding: 3px 7px; border-radius: 4px; pointer-events: none; }

  .popcard {
    position: absolute; z-index: 3; width: 150px; padding: 12px; box-shadow: 4px 4px 0 var(--ink); border-radius: 12px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .kind { font-size: 10px; color: var(--tomato); }
  .kind.lockc { color: var(--faint); }
  .ptitle { font-size: 15px; line-height: 1.1; }
  .pmeta { font-size: 12px; color: var(--muted); }
  .pbtn {
    text-align: center; padding: 7px; background: var(--tomato); color: #fff; border: 2px solid #111; border-radius: 8px;
    font-family: var(--f-display); font-size: 13px; text-decoration: none;
  }
  .pbtn.alt { background: var(--card); color: var(--ink); border-color: var(--ink); border-style: dashed; }

  .mtrail { display: none; }

  @media (max-width: 900px) {
    .legend { display: none; }
    .board-wrap { display: none; }
    .mtrail {
      display: block; position: relative; margin: 0 -6px;
      background: var(--tint-blue); border-radius: 40% 60% 45% 55% / 4% 4% 4% 4%;
    }
    .mz { left: 50%; transform: translateX(-50%) rotate(-2deg); z-index: 1; }
    .node.m { width: 52px; height: 52px; font-size: 17px; }
    .mlabel { position: absolute; font-size: 13px; font-weight: 700; max-width: 40%; line-height: 1.15; }
    .here {
      position: absolute; z-index: 2; width: 160px; padding: 10px 12px; box-shadow: 4px 4px 0 var(--ink); border-radius: 12px;
      display: flex; flex-direction: column; text-decoration: none; color: var(--ink);
    }
    .here .mono { font-size: 10px; color: var(--tomato); }
    .here .display { font-size: 14px; line-height: 1.15; }
    .here .muted { font-size: 11px; }
  }
</style>
