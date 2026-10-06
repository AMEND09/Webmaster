<script>
  // Drag from "simple" to "wiggly" and watch training vs test error split apart.
  const train = [[80,150],[120,160],[160,110],[200,120],[240,80],[280,95],[320,60],[360,70]];
  const test = [[100,128],[220,128],[300,62]];
  const knots = [[20,200], ...train, [395,45]];
  const line = (x) => 195 - ((x - 20) * 140) / 375;

  let t = $state(85); // 0..100

  // Catmull-Rom through the training points = a model that memorises them.
  function wiggly(x) {
    let k = 0;
    while (k < knots.length - 2 && x > knots[k + 1][0]) k++;
    const p0 = knots[Math.max(0, k - 1)][1], p1 = knots[k][1], p2 = knots[k + 1][1], p3 = knots[Math.min(knots.length - 1, k + 2)][1];
    const u = (x - knots[k][0]) / (knots[k + 1][0] - knots[k][0]);
    return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
  }
  function model(x, s) {
    if (s < 0.35) { const a = s / 0.35; return 125 * (1 - a) + line(x) * a; }
    const a = (s - 0.35) / 0.65;
    return line(x) * (1 - a) + wiggly(x) * a;
  }

  let s = $derived(t / 100);
  let d = $derived.by(() => {
    let out = '';
    for (let x = 20; x <= 395; x += 3) out += `${x === 20 ? 'M' : 'L'}${x},${model(x, s).toFixed(1)} `;
    return out;
  });
  let trainErr = $derived(Math.max(2, Math.round(24 - 26 * s)));
  let testErr = $derived(Math.round(13 + 76 * (s - 0.35) ** 2));
  let verdict = $derived(s < 0.18 ? ['UNDERFIT', '#ff9ecb', 'too simple to see the pattern'] : s < 0.55 ? ['JUST RIGHT', '#6fdcb0', 'learns the trend, not the noise'] : ['OVERFIT!', '#ffe14d', 'aces the homework, flunks the test']);
</script>

<div class="w">
  <div class="plot">
    <svg viewBox="0 0 410 230" preserveAspectRatio="none">
      <path d="M20,195 L395,55" stroke="#8c8576" stroke-width="2.5" stroke-dasharray="6 6" fill="none" />
      <path {d} stroke="#ff5a36" stroke-width="4" fill="none" stroke-linecap="round" />
      <g fill="#3a5bff" stroke="#141414" stroke-width="2">{#each train as [x, y]}<circle cx={x} cy={y} r="7" />{/each}</g>
      <g fill="#fffdf7" stroke="#141414" stroke-width="2.5">{#each test as [x, y]}<circle cx={x} cy={y} r="7" />{/each}</g>
    </svg>
    <label class="range mono">
      <span>SIMPLE</span>
      <input class="slider" type="range" min="0" max="100" bind:value={t} style:--pct="{t}%" aria-label="Model complexity" />
      <span>WIGGLY</span>
    </label>
    <div class="key">
      <span><i class="dot blue"></i>training data</span>
      <span><i class="dot white"></i>new test data</span>
      <span><i class="dash"></i>a sensible fit</span>
    </div>
  </div>
  <div class="side">
    <div class="stat" style:background="#6fdcb0"><div class="mono">TRAINING ERROR</div><div class="display">{trainErr}%</div></div>
    <div class="stat" style:background="#ff9ecb"><div class="mono">TEST ERROR</div><div class="display">{testErr}%</div></div>
    <div class="verdict display" style:background={verdict[1]}>{verdict[0]}</div>
    <div class="hand note">{verdict[2]}</div>
  </div>
</div>

<style>
  .w { display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 24px; }
  .plot { display: flex; flex-direction: column; gap: 14px; }
  svg { width: 100%; height: 230px; background: #f3eee3; border: 2px solid var(--ink); border-radius: 10px; }
  .range { display: flex; align-items: center; gap: 14px; font-size: 12px; }
  .key { display: flex; gap: 18px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
  .key span { display: flex; align-items: center; gap: 6px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #141414; }
  .blue { background: #3a5bff; }
  .white { background: #fffdf7; }
  .dash { width: 16px; border-top: 2.5px dashed #8c8576; }
  .side { display: flex; flex-direction: column; gap: 12px; }
  .stat { border: 2.5px solid #141414; border-radius: 12px; padding: 12px 14px; color: #111; }
  .stat .mono { font-size: 11px; }
  .stat .display { font-size: 38px; line-height: 1.1; }
  .verdict { align-self: flex-start; font-size: 20px; color: #111; padding: 4px 12px; border: 2.5px solid #111; transform: rotate(-5deg); box-shadow: 3px 3px 0 #111; }
  .note { font-size: 19px; line-height: 1.1; color: var(--blue); }
  @media (max-width: 700px) {
    .w { grid-template-columns: 1fr; }
    .side { flex-direction: row; flex-wrap: wrap; align-items: center; }
    .stat { flex: 1; min-width: 120px; }
    .stat .display { font-size: 30px; }
  }
</style>
