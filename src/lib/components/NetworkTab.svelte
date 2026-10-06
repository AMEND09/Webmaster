<script>
  import { app, award, addXP, checkBadges } from '../store.svelte.js';

  const W1_0 = [[.9, -.4, .7, .2], [-.6, .3, .1, .8], [.4, -.2, .9, -.5]];
  const W2_0 = [[.8, -.7], [-.3, .5], [.9, -.2], [.2, .6]];
  const features = ['whiskers', 'floppy ears', 'fetches'];
  const outNames = ['cat', 'dog'];

  const ins = [[90, 90], [90, 190], [90, 290]];
  const hid = [[300, 60], [300, 150], [300, 240], [300, 330]];
  const outs = [[510, 130], [510, 250]];

  let x = $state([.8, .2, .5]);
  let w1 = $state(W1_0.map((r) => [...r]));
  let w2 = $state(W2_0.map((r) => [...r]));
  let bh = $state(.3);
  let bo = $state([0, 0]);
  let act = $state('ReLU');
  // Groups: 0..2 = input i → hidden, 3..4 = hidden → output k
  let group = $state(0);
  let touched = $state({});

  const f = (v) => (act === 'ReLU' ? Math.max(0, v) : 1 / (1 + Math.exp(-v)));
  let h = $derived(hid.map((_, j) => f(x.reduce((s, xi, i) => s + xi * w1[i][j], 0) + bh)));
  let logits = $derived([0, 1].map((k) => h.reduce((s, hj, j) => s + hj * w2[j][k], 0) + bo[k]));
  let probs = $derived.by(() => {
    const m = Math.max(...logits);
    const e = logits.map((l) => Math.exp(l - m));
    const sum = e[0] + e[1];
    return e.map((v) => v / sum);
  });

  let groupLabel = $derived(group < 3 ? `INPUT ${group + 1} → HIDDEN` : `HIDDEN → ${outNames[group - 3].toUpperCase()}`);
  let weights = $derived(group < 3 ? w1[group] : w2.map((r) => r[group - 3]));

  function setW(j, v) {
    if (group < 3) w1[group][j] = v;
    else w2[j][group - 3] = v;
    const key = `${group}:${j}`;
    touched[key] = true;
    if ([0, 1, 2, 3].every((k) => touched[`${group}:${k}`])) award('weight-lifter');
  }
  function bias() { return group < 3 ? bh : bo[group - 3]; }
  function setBias(v) { if (group < 3) bh = v; else bo[group - 3] = v; }

  function reset() {
    x = [.8, .2, .5]; w1 = W1_0.map((r) => [...r]); w2 = W2_0.map((r) => [...r]); bh = .3; bo = [0, 0]; act = 'ReLU';
  }

  $effect(() => {
    if (probs[1] > 0.7 && !app.lab.mission) {
      app.lab.mission = true;
      award('tinkerer');
      addXP(80, 'Mission complete');
      checkBadges();
    }
  });

  function lineActive(kind, i, j) {
    if (group < 3) return kind === 1 && i === group;
    return kind === 2 && j === group - 3;
  }
  const fmt = (v) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1);
  const fill = (v) => (v >= 0 ? `linear-gradient(90deg, transparent 50%, #3a5bff 50% ${50 + v * 50}%, transparent ${50 + v * 50}%)` : `linear-gradient(90deg, transparent ${50 + v * 50}%, #ff5a36 ${50 + v * 50}% 50%, transparent 50%)`);
</script>

<div class="grid">
  <div class="board card-lg">
    <div class="cols mono"><span>INPUTS</span><span>HIDDEN LAYER</span><span>OUTPUT</span></div>
    <svg viewBox="0 0 620 400" class="net">
      {#each ins as a, i}{#each hid as b, j}
        {@const w = w1[i][j]}
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={w > 0 ? '#3a5bff' : '#ff5a36'} stroke-width={1.5 + Math.abs(w) * 6} stroke-linecap="round" opacity={lineActive(1, i, j) ? 1 : .35} />
      {/each}{/each}
      {#each hid as a, j}{#each outs as b, k}
        {@const w = w2[j][k]}
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={w > 0 ? '#3a5bff' : '#ff5a36'} stroke-width={1.5 + Math.abs(w) * 6} stroke-linecap="round" opacity={lineActive(2, j, k) ? 1 : .35} />
      {/each}{/each}
      {#each ins as p, i}
        <g class="clk" role="button" tabindex="0" aria-label="Edit weights from {features[i]}" onclick={() => (group = i)} onkeydown={(e) => e.key === 'Enter' && (group = i)}>
          <circle cx={p[0]} cy={p[1]} r="28" fill="#6fdcb0" stroke="#141414" stroke-width={group === i ? 5 : 3} />
          <text x={p[0]} y={p[1] + 5} class="val">{x[i].toFixed(1)}</text>
          <text x={p[0]} y={p[1] + 46} class="lab">{features[i]}</text>
        </g>
      {/each}
      {#each hid as p, j}
        <circle cx={p[0]} cy={p[1]} r="28" fill="#fffdf7" stroke="#141414" stroke-width="3" />
        <text x={p[0]} y={p[1] + 5} class="val">{h[j].toFixed(2)}</text>
      {/each}
      {#each outs as p, k}
        <g class="clk" role="button" tabindex="0" aria-label="Edit weights into {outNames[k]}" onclick={() => (group = 3 + k)} onkeydown={(e) => e.key === 'Enter' && (group = 3 + k)}>
          <circle cx={p[0]} cy={p[1]} r="28" fill={probs[k] >= .5 ? '#ffe14d' : '#fffdf7'} stroke="#141414" stroke-width={group === 3 + k ? 5 : 3} />
          <text x={p[0]} y={p[1] + 5} class="val">{probs[k].toFixed(2)}</text>
          <text x={p[0] + 44} y={p[1] - 2} class="out" opacity={probs[k] >= .5 ? 1 : .5}>{outNames[k]}</text>
          <text x={p[0] + 44} y={p[1] + 16} class="pct" opacity={probs[k] >= .5 ? 1 : .5}>{Math.round(probs[k] * 100)}%</text>
        </g>
      {/each}
    </svg>
    <div class="legend">
      <div class="lk">
        <span><i style:background="#3a5bff"></i>positive weight</span>
        <span><i style:background="#ff5a36"></i>negative weight</span>
        <span>thicker = stronger</span>
      </div>
      <div class="hand ripple">drag a slider, watch it ripple →</div>
    </div>
  </div>

  <div class="side">
    <div class="card panel">
      <div class="phead">
        <span class="display">Weights</span>
        <span class="gsel mono">
          <button onclick={() => (group = (group + 4) % 5)} aria-label="Previous layer">‹</button>
          {groupLabel}
          <button onclick={() => (group = (group + 1) % 5)} aria-label="Next layer">›</button>
        </span>
      </div>
      {#each weights as wv, j}
        <label class="wrow mono">
          <span>w{['₁', '₂', '₃', '₄'][j]}</span>
          <input type="range" class="wslider" min="-1" max="1" step="0.1" value={wv} style:background={fill(wv)}
            oninput={(e) => setW(j, +e.currentTarget.value)} aria-label="weight {j + 1}" />
          <span class="num">{fmt(wv)}</span>
        </label>
      {/each}
      <label class="wrow mono brow">
        <span>bias</span>
        <input type="range" class="wslider" min="-1" max="1" step="0.1" value={bias()} style:background={fill(bias()).replaceAll('#3a5bff', '#141414')}
          oninput={(e) => setBias(+e.currentTarget.value)} aria-label="bias" />
        <span class="num">{fmt(bias())}</span>
      </label>
      <div class="acts">
        <span class="muted">Activation</span>
        {#each ['ReLU', 'Sigmoid'] as a}
          <button class="chip" class:on={act === a} onclick={() => (act = a)}>{a}</button>
        {/each}
        <button class="btn-link reset" onclick={reset}>reset</button>
      </div>
    </div>

    <div class="card panel">
      <div class="phead"><span class="display">Inputs</span><span class="mono small">WHAT THE NETWORK SEES</span></div>
      {#each features as name, i}
        <label class="wrow mono irow">
          <span>{name}</span>
          <input type="range" class="slider" min="0" max="1" step="0.1" bind:value={x[i]} style:--pct="{x[i] * 100}%" style:--fill="#6fdcb0" />
          <span class="num">{x[i].toFixed(1)}</span>
        </label>
      {/each}
    </div>

    <div class="mission" class:done={app.lab.mission}>
      <div class="tape"></div>
      <div class="mono">{app.lab.mission ? 'MISSION COMPLETE ✓' : 'MISSION'}</div>
      <div class="display mt">Make the network say <u>dog</u> with more than 70% confidence.</div>
      <div class="tags mono"><span class="t1">+80 XP</span><span class="t2">TINKERER · R</span></div>
    </div>
  </div>
</div>

<style>
  .grid { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 28px; }
  .board { padding: 22px 26px; display: flex; flex-direction: column; }
  .cols { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); padding: 0 70px 0 30px; }
  .net { width: 100%; max-height: 470px; margin-top: 10px; }
  .val { font: 700 14px var(--f-mono); fill: #111; text-anchor: middle; pointer-events: none; }
  .lab { font: 700 12px var(--f-mono); fill: var(--muted); text-anchor: middle; }
  .out { font: 16px var(--f-display); fill: var(--ink); }
  .pct { font: 700 12px var(--f-mono); fill: var(--ink); }
  .clk { cursor: pointer; }
  .clk:focus { outline: none; }
  .clk:focus-visible circle { stroke: var(--blue); }
  .legend { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; flex-wrap: wrap; margin-top: auto; }
  .lk { display: flex; gap: 16px; font-size: 13px; color: var(--muted); flex-wrap: wrap; }
  .lk span { display: flex; align-items: center; gap: 6px; }
  .lk i { width: 22px; height: 5px; border-radius: 3px; }
  .ripple { font-size: 21px; color: var(--blue); transform: rotate(-3deg); }

  .side { display: flex; flex-direction: column; gap: 18px; }
  .panel { padding: 18px; display: flex; flex-direction: column; gap: 13px; }
  .phead { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .phead .display { font-size: 18px; }
  .small { font-size: 11px; color: var(--muted); }
  .gsel { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
  .gsel button { border: 2px solid var(--ink); background: var(--card); border-radius: 6px; width: 22px; height: 22px; line-height: 1; cursor: pointer; font-weight: 700; padding: 0; }
  .wrow { display: grid; grid-template-columns: 34px minmax(0, 1fr) 44px; gap: 10px; align-items: center; font-size: 12px; }
  .irow { grid-template-columns: 96px minmax(0, 1fr) 34px; }
  .num { text-align: right; }
  .brow { padding-top: 10px; border-top: 2px dashed var(--rule); }
  .wslider {
    -webkit-appearance: none; appearance: none; width: 100%; height: 10px; margin: 0;
    border: 2px solid var(--ink); border-radius: 999px; cursor: pointer;
  }
  .wslider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--card); border: 2.5px solid var(--ink); }
  .wslider::-moz-range-thumb { width: 15px; height: 15px; border-radius: 50%; background: var(--card); border: 2.5px solid var(--ink); }
  .wslider:active::-webkit-slider-thumb { background: var(--yellow); }
  .acts { display: flex; gap: 8px; align-items: center; font-size: 13px; font-weight: 600; }
  .acts .chip { background: transparent; cursor: pointer; }
  .acts .chip.on { background: var(--mint); color: #111; }
  .reset { margin-left: auto; font-size: 12px; }

  .mission {
    background: var(--yellow); color: #111; border: 2.5px solid #111; box-shadow: 5px 5px 0 #111; border-radius: 14px;
    padding: 18px; display: flex; flex-direction: column; gap: 8px; transform: rotate(1deg); position: relative;
  }
  .mission.done { background: var(--mint); }
  .mission .tape { right: 30px; top: -12px; width: 80px; height: 24px; background: rgba(255, 255, 255, .6); transform: rotate(6deg); }
  .mission .mono { font-size: 11px; }
  .mt { font-size: 19px; line-height: 1.2; }
  .tags { display: flex; gap: 8px; margin-top: 4px; font-size: 12px; }
  .t1 { background: #111; color: var(--yellow); padding: 4px 8px; border-radius: 6px; }
  .t2 { background: var(--blue); color: #fff; padding: 4px 8px; border-radius: 6px; border: 2px solid #111; }

  @media (max-width: 1100px) { .grid { grid-template-columns: 1fr; } }
  @media (max-width: 600px) {
    .board { padding: 14px 10px; }
    .cols { padding: 0 10px; }
    .ripple { display: none; }
  }
</style>
