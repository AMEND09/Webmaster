<script>
  // Slide a 3×3 kernel over a tiny drawing and see what it picks up.
  const N = 12;
  const pics = {
    smiley: [
      '............', '...######...', '..#......#..', '.#........#.', '.#..#..#..#.', '.#........#.',
      '.#.#....#.#.', '.#..####..#.', '.#........#.', '..#......#..', '...######...', '............',
    ],
    letter: [
      '............', '.....##.....', '....#..#....', '....#..#....', '...#....#...', '...#....#...',
      '..########..', '..#......#..', '.#........#.', '.#........#.', '.#........#.', '............',
    ],
    stripes: [
      '............', '..##..##..##', '..##..##..##', '..##..##..##', '..##..##..##', '..##..##..##',
      '............', '############', '............', '############', '............', '............',
    ],
  };
  const kernels = {
    'Edges': [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    'Vertical lines': [[-1, 2, -1], [-1, 2, -1], [-1, 2, -1]],
    'Horizontal lines': [[-1, -1, -1], [2, 2, 2], [-1, -1, -1]],
    'Blur': [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  };

  const toGrid = (rows) => rows.map((r) => [...r].map((c) => (c === '#' ? 1 : 0)));
  let img = $state(toGrid(pics.smiley));
  let kname = $state('Edges');
  let k = $derived(kernels[kname]);
  let hover = $state(null);
  let painting = $state(null);

  let out = $derived.by(() => {
    const ksum = kname === 'Blur' ? 9 : 1;
    const o = [];
    for (let y = 0; y < N - 2; y++) {
      const row = [];
      for (let x = 0; x < N - 2; x++) {
        let s = 0;
        for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) s += img[y + dy][x + dx] * k[dy][dx];
        row.push(s / ksum);
      }
      o.push(row);
    }
    return o;
  });
  let maxAbs = $derived(Math.max(1, ...out.flat().map(Math.abs)));

  function color(v) {
    const a = Math.min(1, Math.abs(v) / maxAbs);
    return v >= 0 ? `rgba(58,91,255,${a})` : `rgba(255,90,54,${a})`;
  }
  function inField(y, x) {
    return hover && y >= hover[0] && y < hover[0] + 3 && x >= hover[1] && x < hover[1] + 3;
  }
  function paint(y, x) { if (painting !== null) img[y][x] = painting; }
</script>

<svelte:window onpointerup={() => (painting = null)} />

<div class="conv">
  <div class="card-lg panel">
    <div class="ph"><span class="display">Your image</span><span class="mono hint">CLICK OR DRAG TO DRAW</span></div>
    <div class="pix in" style:--n={N}>
      {#each img as row, y}{#each row as v, x}
        <button class="px" class:on={v} class:field={inField(y, x)} aria-label="pixel {x},{y}"
          onpointerdown={(e) => { e.preventDefault(); painting = v ? 0 : 1; img[y][x] = painting; }}
          onpointerenter={() => paint(y, x)}></button>
      {/each}{/each}
    </div>
    <div class="row">
      {#each Object.keys(pics) as p}<button class="chip" onclick={() => (img = toGrid(pics[p]))}>{p}</button>{/each}
      <button class="chip" onclick={() => (img = toGrid(Array(N).fill('.'.repeat(N))))}>clear</button>
    </div>
  </div>

  <div class="mid">
    <div class="card panel kpanel">
      <div class="display">Kernel</div>
      <div class="kgrid mono">{#each k.flat() as v}<span class:neg={v < 0} class:pos={v > 0}>{v}</span>{/each}</div>
      <div class="kopts">
        {#each Object.keys(kernels) as n}<button class="chip" class:on={kname === n} onclick={() => (kname = n)}>{n}</button>{/each}
      </div>
    </div>
    <div class="hand arrow">slides over every<br>3×3 patch →</div>
  </div>

  <div class="card-lg panel">
    <div class="ph"><span class="display">Feature map</span><span class="mono hint">HOVER A SQUARE</span></div>
    <div class="pix outp" style:--n={N - 2} role="presentation" onpointerleave={() => (hover = null)}>
      {#each out as row, y}{#each row as v, x}
        <div class="px o" style:background="linear-gradient({color(v)}, {color(v)}), var(--card)" class:hov={hover && hover[0] === y && hover[1] === x} onpointerenter={() => (hover = [y, x])} role="presentation"></div>
      {/each}{/each}
    </div>
    <div class="mono val">{hover ? `value here: ${out[hover[0]][hover[1]].toFixed(2)}` : 'blue = strong match · red = opposite'}</div>
  </div>
</div>
<p class="muted explainer">This is what the first layers of an image model do: lots of little kernels, each tuned to one pattern (edges, lines, corners). Deeper layers combine those maps into bigger ideas like “eye” or “whisker”. The model learns the kernel numbers itself during training.</p>

<style>
  .conv { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
  .panel { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
  .ph { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .ph .display { font-size: 18px; }
  .hint { font-size: 10px; color: var(--muted); }
  .pix { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 2px; aspect-ratio: 1; background: var(--ink); border: 2.5px solid var(--ink); border-radius: 8px; overflow: hidden; touch-action: none; }
  .px { border: 0; padding: 0; background: var(--card); cursor: crosshair; }
  .px.on { background: var(--ink); }
  .in .px.field { box-shadow: inset 0 0 0 3px var(--yellow); }
  .outp { background: var(--rule); }
  .px.o { cursor: default; }
  .px.hov { outline: 3px solid var(--yellow); outline-offset: -3px; }
  .row { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip { background: transparent; cursor: pointer; font-size: 12px; }
  .chip.on { background: var(--yellow); color: #111; }
  .mid { display: flex; flex-direction: column; gap: 14px; align-items: center; width: 200px; }
  .kpanel { width: 100%; }
  .kpanel .display { font-size: 18px; }
  .kgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .kgrid span { aspect-ratio: 1; display: grid; place-items: center; border: 2px solid var(--ink); border-radius: 6px; font-size: 15px; }
  .kgrid .neg { background: var(--pink); color: #111; }
  .kgrid .pos { background: #c3cdff; color: #111; }
  .kopts { display: flex; flex-wrap: wrap; gap: 6px; }
  .arrow { font-size: 20px; color: var(--blue); transform: rotate(-3deg); text-align: center; line-height: 1.1; }
  .val { font-size: 11px; color: var(--muted); }
  .explainer { max-width: 760px; margin-top: 22px; font-size: 15px; }
  @media (max-width: 1000px) {
    .conv { grid-template-columns: 1fr; }
    .mid { width: 100%; }
    .arrow { display: none; }
    .pix { max-width: 380px; width: 100%; margin: 0 auto; }
  }
</style>
