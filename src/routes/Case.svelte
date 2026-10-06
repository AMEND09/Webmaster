<script>
  import { cases } from '../lib/data/cases.js';
  import { zoneById } from '../lib/data/zones.js';
  import { app, caseState, addXP, award, checkBadges, toast } from '../lib/store.svelte.js';
  import NotFound from './NotFound.svelte';

  // Pages remount on every route change (App.svelte {#key}), so props are read once.
  let { id } = $props();
  const c = cases.find((x) => x.id === id);
  // svelte-ignore state_referenced_locally
  const st = c ? caseState(id) : null;

  // Index claims (object segments) so state can refer to them by number.
  const segs = c ? c.response.map((s, i) => (typeof s === 'string' ? { text: s, i } : { ...s, i, claim: true })) : [];
  const falseIdx = segs.filter((s) => s.claim && !s.ok).map((s) => s.i);
  const total = falseIdx.length;

  let sel = $state(null);
  let hinted = $state(null);
  let feedback = $state('');
  let pick = $state(st?.fixed ? c.fixOptions.findIndex((o) => o.best) : null);
  let source = $state(null);

  let found = $derived(st ? st.found : []);
  let step = $derived(found.length >= total ? 2 : 1);
  let clues = $derived(falseIdx.map((i) => (found.includes(i) ? segs[i] : null)));

  function select(s) {
    sel = sel === s.i ? null : s.i;
    feedback = '';
  }

  function flag() {
    if (sel === null) { feedback = 'Click a sentence in the answer first, then flag it.'; return; }
    const s = segs[sel];
    if (found.includes(sel)) { feedback = 'Already flagged that one.'; return; }
    if (!s.ok) {
      st.found.push(sel);
      if (hinted === sel) hinted = null;
      feedback = '';
      if (st.found.length === total) toast({ kind: 'xp', text: 'All 3 found!', sub: 'Now fix the prompt' });
    } else {
      feedback = 'That one actually checks out. Try “Check a source” if you’re not sure.';
    }
    sel = null;
  }

  function check() {
    if (sel === null) { feedback = 'Click a sentence first, then check its source.'; return; }
    source = segs[sel];
    if (!st.checked.includes(sel)) st.checked.push(sel);
    feedback = '';
  }

  function hint() {
    const next = falseIdx.find((i) => !found.includes(i));
    if (next === undefined) return;
    st.hints++;
    app.xp = Math.max(0, app.xp - 10);
    hinted = next;
    toast({ kind: 'xp', text: '−10 XP', sub: 'Hint used' });
  }

  function choose(k) {
    if (st.fixed) return;
    pick = k;
    if (c.fixOptions[k].best) {
      const first = !st.done;
      st.fixed = true;
      st.done = true;
      if (first) {
        addXP(c.xp, `Case #${c.id} closed`);
        if (st.hints === 0) award('sharp-eye');
      }
      checkBadges();
    }
  }

  function restart() {
    Object.assign(st, { found: [], checked: [], hints: st.hints, fixed: false, done: st.done });
    pick = null; sel = null; source = null; hinted = null; feedback = '';
  }
</script>

{#if !c}
  <NotFound />
{:else}
  <div class="page">
    <div class="page-head head">
      <div>
        <div class="eyebrow">CASE FILE #{c.id} · {zoneById[c.zone]?.name.toUpperCase() ?? ''}</div>
        <h1 class="page-title">{c.title}</h1>
      </div>
      <div class="steps mono">
        <span class:on={step === 1} class:done={step === 2}>STEP 1 · SPOT</span>
        <span class:on={step === 2}>STEP 2 · FIX THE PROMPT</span>
      </div>
    </div>

    <div class="grid">
      <div class="folder">
        <div class="ftab mono">EVIDENCE</div>
        <div class="ask">{c.prompt}</div>
        <div class="reply">
          <div class="bot mono">AI</div>
          <div class="bubble">
            {#each segs as s}
              {#if s.claim}
                {@const isFound = found.includes(s.i)}
                <button class="claim" class:sel={sel === s.i} class:found={isFound} class:hint={hinted === s.i}
                  onclick={() => select(s)} disabled={step === 2}>{s.text}{#if isFound}<span class="note hand">{s.note}</span>{/if}</button>
              {:else}{s.text}{/if}
            {/each}
          </div>
        </div>

        {#if step === 1}
          {#if feedback}<div class="feedback hand">{feedback}</div>{/if}
          <div class="actions">
            <button class="btn btn-sm btn-primary" onclick={flag}>Flag a claim</button>
            <button class="btn btn-sm" onclick={check}>Check a source</button>
            <button class="btn btn-sm btn-dashed" onclick={hint}>Hint (−10 XP)</button>
          </div>
        {:else}
          <div class="fix">
            <div class="mono fixh">WHICH PROMPT WOULD STOP THIS FROM HAPPENING?</div>
            {#each c.fixOptions as o, k}
              {@const state = pick === k ? (o.best ? 'right' : 'wrong') : ''}
              <button class="fopt {state}" onclick={() => choose(k)} disabled={st.fixed && pick !== k}>
                <span class="fl mono">{['A', 'B', 'C'][k]}</span>
                <span>“{o.text}”{#if pick === k}<span class="why">{o.why}</span>{/if}</span>
              </button>
            {/each}
            {#if st.done}
              <div class="solved">
                <span class="stamp">CASE CLOSED</span>
                <a class="btn btn-sm btn-primary" href="#/detective">More cases →</a>
                <button class="btn-link" onclick={restart}>replay</button>
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <div class="side">
        <div class="card score">
          <div class="display big">{found.length}<span>/{total}</span></div>
          <div>
            <div class="display sl">mistakes found</div>
            <div class="muted sm">{found.length === total ? 'Nice work, detective.' : found.length === total - 1 ? 'One more is hiding in plain sight.' : 'Read every claim like it’s on trial.'}</div>
          </div>
        </div>

        <div class="cork">
          {#each clues as cl, k}
            {#if cl}
              <div class="pin-card" style:transform="rotate({[-2, 1.5, -1][k % 3]}deg)">
                <div class="pin" style:background={['#ff5a36', '#3a5bff', '#6fdcb0'][k % 3]}></div>
                <div class="mono cl" style:color={['#ff5a36', '#3a5bff', '#1f9e6c'][k % 3]}>CLUE {k + 1}</div>
                <div class="ct">{cl.clue}</div>
              </div>
            {:else}
              <div class="pin-card empty mono">CLUE {k + 1} · ???</div>
            {/if}
          {/each}
        </div>

        {#if source}
          <div class="card srccard">
            <div class="mono sh">SOURCE CHECK {source.ok ? '· CHECKS OUT ✓' : '· UH-OH ✕'}</div>
            <div class="sq">“{source.text}”</div>
            <div class="st">{source.source}</div>
          </div>
        {/if}

        <div class="hand aside">{step === 1 ? 'then you’ll rewrite the prompt so the AI cites its sources' : 'good prompts ask for sources and permission to say “I don’t know”'}</div>
      </div>
    </div>
  </div>
{/if}

<style>
  .head { margin-bottom: 44px; }
  .steps { display: flex; gap: 10px; font-size: 13px; flex-wrap: wrap; }
  .steps span { padding: 8px 12px; border: 2.5px dashed var(--faint); border-radius: 10px; color: var(--faint); }
  .steps span.on { border: 2.5px solid var(--ink); background: var(--card); color: var(--ink); }
  .steps span.done { border: 2.5px solid var(--ink); color: var(--ink); text-decoration: line-through; }

  .grid { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 30px; align-items: start; }
  .folder {
    position: relative; background: #f2d9a0; color: #141414; border: 3px solid #141414; box-shadow: 7px 7px 0 var(--ink);
    border-radius: 6px 18px 18px 18px; padding: 26px; display: flex; flex-direction: column; gap: 18px; min-height: 560px;
  }
  .ftab {
    position: absolute; left: -3px; top: -34px; width: 180px; height: 34px; background: #f2d9a0; border: 3px solid #141414; border-bottom: 0;
    border-radius: 12px 12px 0 0; display: grid; place-items: center; font-size: 12px;
  }
  .ask {
    align-self: flex-end; max-width: 440px; background: #3a5bff; color: #fff; border: 2.5px solid #111;
    border-radius: 16px 16px 4px 16px; padding: 12px 16px; font-size: 15px; line-height: 1.45;
  }
  .reply { display: flex; gap: 12px; align-items: flex-start; }
  .bot { width: 40px; height: 40px; flex: none; border-radius: 10px; background: #fffdf7; border: 2.5px solid #111; display: grid; place-items: center; font-size: 12px; }
  .bubble { background: #fffdf7; border: 2.5px solid #111; border-radius: 16px 16px 16px 4px; padding: 18px 20px 30px; font-size: 17px; line-height: 2.5; max-width: 640px; }
  .claim {
    position: relative; display: inline; padding: 0 2px; border: 0; background: none; font: inherit; color: inherit; text-align: left; cursor: pointer;
    border-bottom: 2px dotted #8c8576; line-height: inherit;
  }
  .claim:hover:not(:disabled) { background: rgba(255, 225, 77, .5); }
  .claim:disabled { cursor: default; }
  .claim.sel { background: #ffe14d; border-bottom: 2px solid #111; }
  .claim.found { outline: 3px solid #ff5a36; outline-offset: 3px; border-radius: 30px; border-bottom: 0; padding: 0 4px; }
  .claim.hint { animation: hint 1s ease-in-out infinite; }
  @keyframes hint { 50% { background: rgba(255, 90, 54, .25); } }
  .note {
    position: absolute; left: 30%; top: 88%; white-space: nowrap; pointer-events: none; z-index: 1;
    font-size: 20px; color: #ff5a36; transform: rotate(-5deg); line-height: 1;
    background: rgba(255, 253, 247, .9); padding: 0 4px; border-radius: 4px;
  }
  .feedback { font-size: 20px; color: #3a5bff; }
  .actions { margin-top: auto; display: flex; gap: 10px; flex-wrap: wrap; }
  .actions .btn:not(.btn-primary) { background: #fffdf7; color: #111; border-color: #111; }
  .actions .btn-dashed { background: transparent !important; }

  .fix { margin-top: auto; display: flex; flex-direction: column; gap: 10px; }
  .fixh { font-size: 12px; }
  .fopt {
    display: flex; gap: 12px; align-items: flex-start; text-align: left; padding: 12px 14px; cursor: pointer;
    background: #fffdf7; color: #111; border: 2.5px solid #111; border-radius: 12px; font-size: 15px; line-height: 1.4;
  }
  .fopt:hover:not(:disabled) { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 #111; }
  .fopt.right { background: #6fdcb0; box-shadow: 4px 4px 0 #111; }
  .fopt.wrong { background: #ff9ecb; }
  .fopt:disabled { opacity: .5; cursor: default; }
  .fl { width: 26px; height: 26px; flex: none; border: 2px solid #111; border-radius: 6px; display: grid; place-items: center; font-size: 12px; background: #fff; }
  .why { display: block; margin-top: 6px; font-size: 13px; font-weight: 600; }
  .solved { display: flex; align-items: center; gap: 16px; margin-top: 8px; flex-wrap: wrap; }
  .stamp { font-family: var(--f-display); font-size: 22px; color: #ff5a36; border: 3px solid #ff5a36; padding: 2px 12px; transform: rotate(-6deg); letter-spacing: 2px; }

  .side { display: flex; flex-direction: column; gap: 18px; }
  .score { padding: 18px; display: flex; align-items: center; gap: 16px; }
  .big { font-size: 56px; line-height: 1; }
  .big span { font-size: 28px; color: var(--faint); }
  .sl { font-size: 18px; }
  .sm { font-size: 14px; }
  .cork {
    background: #c9a77a; border: 2.5px solid var(--ink); border-radius: 14px; padding: 22px 18px; display: flex; flex-direction: column; gap: 16px;
    background-image: radial-gradient(rgba(0, 0, 0, .12) 1px, transparent 1.5px); background-size: 6px 6px;
  }
  .pin-card { position: relative; background: #fffdf7; color: #111; padding: 14px 16px; border: 2px solid #111; }
  .pin { position: absolute; left: 50%; top: -9px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; border: 2px solid #111; }
  .cl { font-size: 11px; }
  .ct { font-size: 15px; font-weight: 600; line-height: 1.35; }
  .pin-card.empty { background: transparent; border: 2.5px dashed #111; text-align: center; font-size: 13px; transform: rotate(-1deg); }
  .srccard { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
  .sh { font-size: 11px; color: var(--blue); }
  .sq { font-weight: 700; font-size: 14px; }
  .st { font-size: 14px; color: var(--muted); }
  .aside { font-size: 21px; color: var(--muted); transform: rotate(-2deg); line-height: 1.15; }

  @media (max-width: 1000px) {
    .grid { grid-template-columns: 1fr; }
    .folder { min-height: 0; padding: 20px 16px; }
    .bubble { font-size: 16px; padding: 14px 14px 26px; line-height: 2.2; }
    .bot { display: none; }
  }
</style>
