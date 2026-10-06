<script>
  // A toy 2-D "embedding": similar words sit close together, and directions mean something.
  const words = {
    man: [2, 1], woman: [2, 4], king: [7, 1.5], queen: [7, 4.5], prince: [5, 1.2], princess: [5, 4.3],
    dog: [-6, -4], puppy: [-7, -5.5], cat: [-3, -4.5], kitten: [-4, -6],
    pizza: [3, -6], burger: [4.8, -5], taco: [1.8, -7.4],
  };
  const analogies = [['king', 'man', 'woman'], ['puppy', 'dog', 'cat'], ['princess', 'woman', 'man']];

  const S = 26, OX = 260, OY = 230; // plot scale + origin
  const px = ([x, y]) => [OX + x * S, OY - y * S];

  let picked = $state([]);
  let analogy = $state(null);

  function tap(w) {
    analogy = null;
    picked = picked.includes(w) ? picked.filter((p) => p !== w) : [...picked.slice(-1), w];
  }
  const cos = (a, b) => (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b));
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  let sim = $derived(picked.length === 2 ? cos(words[picked[0]], words[picked[1]]) : null);
  let result = $derived.by(() => {
    if (!analogy) return null;
    const [a, b, c] = analogy;
    const v = [words[a][0] - words[b][0] + words[c][0], words[a][1] - words[b][1] + words[c][1]];
    const best = Object.keys(words).filter((w) => !analogy.includes(w)).sort((p, q) => dist(words[p], v) - dist(words[q], v))[0];
    return { v, best };
  });
</script>

<div class="vec">
  <div class="card-lg plotcard">
    <svg viewBox="0 0 520 440" class="plot">
      <line x1="0" y1={OY} x2="520" y2={OY} class="axis" />
      <line x1={OX} y1="0" x2={OX} y2="440" class="axis" />
      {#if picked.length === 2}
        {@const a = px(words[picked[0]])}
        {@const b = px(words[picked[1]])}
        <line x1={OX} y1={OY} x2={a[0]} y2={a[1]} class="arrow blue" />
        <line x1={OX} y1={OY} x2={b[0]} y2={b[1]} class="arrow blue" />
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} class="dash" />
      {/if}
      {#if result}
        {@const [a, b, c] = analogy}
        {@const pa = px(words[a])}
        {@const pb = px(words[b])}
        {@const pc = px(words[c])}
        {@const pv = px(result.v)}
        <line x1={pb[0]} y1={pb[1]} x2={pa[0]} y2={pa[1]} class="arrow tomato" />
        <line x1={pc[0]} y1={pc[1]} x2={pv[0]} y2={pv[1]} class="arrow tomato" />
        <circle cx={pv[0]} cy={pv[1]} r="16" class="target" />
      {/if}
      {#each Object.entries(words) as [w, p]}
        {@const [x, y] = px(p)}
        <g class="pt" role="button" tabindex="0" aria-label={w} aria-pressed={picked.includes(w)} onclick={() => tap(w)} onkeydown={(e) => e.key === 'Enter' && tap(w)}>
          <circle cx={x} cy={y} r="9" class:sel={picked.includes(w) || result?.best === w} />
          <text x={x + 13} y={y + 5}>{w}</text>
        </g>
      {/each}
    </svg>
  </div>

  <div class="side">
    <div class="card panel">
      <div class="display h">Compare two words</div>
      <p class="muted">Tap two dots. Words used in similar ways end up pointing in similar directions.</p>
      {#if sim !== null}
        <div class="simrow">
          <span class="chip">{picked[0]}</span><span class="mono">vs</span><span class="chip">{picked[1]}</span>
        </div>
        <div class="meter"><div class="mfill" style:width="{((sim + 1) / 2) * 100}%"></div></div>
        <div class="mono simval">SIMILARITY {sim.toFixed(2)} <span class="muted">(−1 to 1)</span></div>
      {:else}
        <div class="mono pick">{picked.length ? `${picked[0]} + ?` : 'NOTHING PICKED YET'}</div>
      {/if}
    </div>

    <div class="card panel">
      <div class="display h">Word math</div>
      {#each analogies as an}
        <button class="eq mono" class:on={analogy === an} onclick={() => { analogy = an; picked = []; }}>
          {an[0]} − {an[1]} + {an[2]} = {analogy === an && result ? result.best : '?'}
        </button>
      {/each}
      <div class="hand note">directions carry meaning!</div>
    </div>
  </div>
</div>
<p class="muted explainer">Real models use hundreds or thousands of dimensions instead of two, and they learn the positions from billions of sentences. But the idea is the same: meaning becomes geometry, which is why linear algebra shows up everywhere in AI.</p>

<style>
  .vec { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 28px; }
  .plotcard { padding: 14px; }
  .plot { width: 100%; display: block; }
  .axis { stroke: var(--rule); stroke-width: 2; }
  .arrow { stroke-width: 4; stroke-linecap: round; }
  .arrow.blue { stroke: var(--blue); }
  .arrow.tomato { stroke: var(--tomato); stroke-dasharray: 2 8; }
  .dash { stroke: var(--ink); stroke-width: 2; stroke-dasharray: 5 5; }
  .target { fill: none; stroke: var(--tomato); stroke-width: 3; }
  .pt { cursor: pointer; }
  .pt:focus { outline: none; }
  .pt circle { fill: var(--card); stroke: var(--ink); stroke-width: 3; transition: r .15s; }
  .pt:hover circle, .pt:focus-visible circle { r: 12; }
  .pt circle.sel { fill: var(--yellow); }
  .pt text { font: 700 14px var(--f-body); fill: var(--ink); }
  .side { display: flex; flex-direction: column; gap: 18px; }
  .panel { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
  .h { font-size: 18px; }
  .panel p { font-size: 14px; }
  .simrow { display: flex; gap: 8px; align-items: center; }
  .meter { height: 18px; border: 2.5px solid var(--ink); border-radius: 999px; overflow: hidden; background: var(--paper); }
  .mfill { height: 100%; background: var(--mint); border-right: 2.5px solid var(--ink); transition: width .4s; }
  .simval, .pick { font-size: 12px; }
  .eq { text-align: left; padding: 10px 12px; border: 2.5px solid var(--ink); border-radius: 10px; background: transparent; cursor: pointer; font-size: 13px; }
  .eq.on { background: var(--yellow); color: #111; border-color: #111; }
  .note { font-size: 19px; color: var(--blue); transform: rotate(-2deg); }
  .explainer { max-width: 760px; margin-top: 22px; font-size: 15px; }
  @media (max-width: 1000px) { .vec { grid-template-columns: 1fr; } }
</style>
