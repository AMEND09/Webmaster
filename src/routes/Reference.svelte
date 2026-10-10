<script>
  const fonts = [
    { n: 'Archivo Black', by: 'Omnibus-Type', href: 'https://fonts.google.com/specimen/Archivo+Black' },
    { n: 'Gochi Hand', by: 'Huerta Tipográfica', href: 'https://fonts.google.com/specimen/Gochi+Hand' },
    { n: 'Space Mono', by: 'Colophon Foundry', href: 'https://fonts.google.com/specimen/Space+Mono' },
    { n: 'Work Sans', by: 'Wei Huang', href: 'https://fonts.google.com/specimen/Work+Sans' },
  ];
  const libs = [
    { n: 'Svelte 5', l: 'MIT License', href: 'https://svelte.dev' },
    { n: 'Vite 6 (build tool)', l: 'MIT License', href: 'https://vite.dev' },
    { n: 'GSAP 3 (animation)', l: 'Standard Free License', href: 'https://gsap.com' },
    { n: 'Lenis (smooth scroll)', l: 'MIT License', href: 'https://github.com/darkroomengineering/lenis' },
  ];
</script>

<div class="page">
  <div class="page-head">
    <div>
      <div class="eyebrow">COMPLIANCE</div>
      <h1 class="page-title">Reference Page</h1>
      <p class="muted sub">Every source used to research, design, and build this site — plus permissions and the required event forms.</p>
    </div>
  </div>

  <section class="card block">
    <h2>Information sources</h2>
    <p>
      All lesson text, quiz questions, detective cases, lab activities, and explanatory copy on this site
      are original writing by the team, covering widely documented public concepts (neural networks,
      next-word prediction, prompting, overfitting, deepfakes, data privacy). All illustrations, icons,
      the robot mascot, and the favicon are original inline SVG artwork drawn by the team for this
      project — no stock or third-party imagery is used anywhere on the site.
    </p>
    <h3>Typefaces — all SIL Open Font License 1.1, served via Google Fonts</h3>
    <ul class="src">
      {#each fonts as f}
        <li><a href={f.href}>{f.n}</a> <span class="muted">by {f.by}</span></li>
      {/each}
    </ul>
    <h3>Software libraries</h3>
    <ul class="src">
      {#each libs as l}
        <li><a href={l.href}>{l.n}</a> <span class="muted">— {l.l}</span></li>
      {/each}
    </ul>
  </section>

  <section class="card block">
    <h2>Copyright &amp; permissions</h2>
    <p>
      No third-party copyrighted text, images, or sound are reproduced on this site, so no written
      permissions are required. The typefaces above are used under the SIL Open Font License 1.1
      and the libraries above under their respective free licenses (linked). Everything else you
      see — copy, code, and artwork — was created by the team during the current school year.
    </p>
  </section>

  <section class="card block">
    <h2>Framework statement</h2>
    <p>
      This site is built with Svelte 5 and Vite from a blank scaffold. Every route, component,
      stylesheet, animation, and illustration was designed and hand-built by the team for this
      event. No pre-built template, theme, or site builder output is used anywhere in the project.
    </p>
  </section>

  <section class="card block">
    <h2>Required documents</h2>
    <div class="docs">
      <a class="btn btn-sm" href="./student-copyright-checklist.pdf">Student Copyright Checklist (PDF)</a>
      <a class="btn btn-sm" href="./work-log.pdf">Work Log (PDF)</a>
    </div>
  </section>
</div>

<style>
  .sub { margin-top: 8px; max-width: 62ch; }
  .block { padding: clamp(18px, 2.5vw, 28px); margin-bottom: 18px; }
  .block h2 {
    font-family: var(--f-display);
    font-size: clamp(19px, 2.2vw, 26px);
    letter-spacing: -0.5px;
    margin: 0 0 10px;
  }
  .block h3 {
    font-family: var(--f-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--muted);
    margin: 20px 0 8px;
  }
  .block p { color: var(--muted); max-width: 72ch; font-size: clamp(14px, 1.35vw, 16px); }
  .src { margin: 0; padding-left: 20px; color: var(--muted); font-size: clamp(13px, 1.25vw, 15px); }
  .src li { margin: 4px 0; }
  .src a { color: var(--ink); font-weight: 600; }
  .docs { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 6px; }
</style>
