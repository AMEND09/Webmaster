<script>
  import { route } from '../router.svelte.js';
  import { app, levelInfo, initials, avatarFrame, setTheme, theme } from '../store.svelte.js';
  import { chrome } from '../chrome.svelte.js';

  const links = [
    { n: 'Map', href: '#/map', match: ['map'] },
    { n: 'Lessons', href: '#/lessons', match: ['lessons', 'lesson', 'quiz'] },
    { n: 'Detective', href: '#/detective', match: ['detective'] },
    { n: 'Lab', href: '#/lab', match: ['lab'] },
    { n: 'Badges', href: '#/badges', match: ['badges'] },
  ];
  const tabs = [
    { n: 'Home', href: '#/', match: [''], g: '⌂' },
    { n: 'Map', href: '#/map', match: ['map'], g: '✶' },
    { n: 'Lab', href: '#/lab', match: ['lab', 'lessons', 'lesson', 'quiz'], g: '∿' },
    { n: 'Cases', href: '#/detective', match: ['detective'], g: '?' },
    { n: 'Badges', href: '#/badges', match: ['badges'], g: '★' },
  ];

  let section = $derived(route.parts[0] ?? '');
  let lvl = $derived(levelInfo(app.xp));
  let frame = $derived(avatarFrame(lvl.level));
  let dark = $derived(theme() === 'dark');

  function toggleTheme() {
    setTheme(dark ? 'light' : 'dark');
  }
</script>

<header class="nav" class:held={chrome.headerHeld}>
  <a class="logo" href="#/" aria-label="learnai home">learn<span>ai</span></a>
  <nav class="links" aria-label="Main">
    {#each links as l}
      <a href={l.href} class:active={l.match.includes(section)} aria-current={l.match.includes(section) ? 'page' : undefined}>{l.n}</a>
    {/each}
  </nav>
  <button class="theme" onclick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">{dark ? '☀' : '☾'}</button>
  <a class="xp" href="#/me" title="Your progress"><span>LV {lvl.level}</span>{app.xp.toLocaleString()}<em> XP</em></a>
  <a class="avatar" href="#/me" title="Your progress" style:box-shadow={frame ? `0 0 0 3px var(--paper), 0 0 0 5.5px ${frame}` : null}>{initials(app.name)}</a>
</header>

<nav class="tabs" aria-label="Main (mobile)">
  {#each tabs as t}
    {@const on = t.match.includes(section)}
    <a href={t.href} class:on aria-current={on ? 'page' : undefined}><span class="ico">{t.g}</span>{t.n}</a>
  {/each}
</nav>

<style>
  .nav {
    position: sticky; top: 0; z-index: 50;
    /* The homepage intro holds the header back, then releases it to drop in. */
    transition: transform .55s cubic-bezier(.2, 1.3, .35, 1);
    height: var(--nav-h); display: flex; align-items: center; gap: 28px;
    padding: 0 32px;
    background: var(--paper);
    border-bottom: 2.5px solid var(--ink);
    font-family: var(--f-mono);
  }
  .nav.held { transform: translateY(-110%); }

  .logo {
    font-family: var(--f-display); font-size: 24px; text-decoration: none;
    background: var(--tomato); color: #fff; padding: 1px 12px 4px;
    border: 2.5px solid var(--hard); box-shadow: 3px 3px 0 var(--hard);
    transform: rotate(-3deg); letter-spacing: -.5px; flex: none;
    transition: transform .15s;
  }
  .logo:hover { transform: rotate(2deg) scale(1.04); }
  .logo span { color: var(--yellow); }
  .links { display: flex; gap: 6px; flex: 1; }
  .links a {
    padding: 6px 13px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px;
    border: 2px solid transparent; border-radius: 999px; text-decoration: none; color: var(--ink);
  }
  .links a:hover { border-color: var(--ink); }
  .links a.active { background: var(--yellow); color: var(--hard); border-color: var(--hard); }
  .theme {
    width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--ink); background: var(--card);
    cursor: pointer; font-size: 17px; display: grid; place-items: center; line-height: 1;
  }
  .xp {
    display: flex; align-items: center; gap: 8px; padding: 5px 12px 5px 5px;
    border: 2px solid var(--ink); border-radius: 999px; color: var(--ink);
    font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap;
  }
  .xp em { font-style: normal; }
  .xp span { background: var(--blue); color: #fff; border-radius: 999px; padding: 2px 8px; }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%; flex: none;
    background: var(--pink); border: 2.5px solid var(--ink);
    display: grid; place-items: center; text-decoration: none;
    font-family: var(--f-display); font-size: 14px; color: var(--hard);
  }

  .tabs { display: none; }

  @media (max-width: 900px) {
    .nav { padding: 0 var(--gutter); gap: 10px; border-bottom-width: 2px; }
    .logo { font-size: 20px; padding: 1px 10px 3px; margin-right: auto; box-shadow: none; }
    .links { display: none; }
    .xp { font-size: 11px; padding: 4px 10px 4px 4px; }
    .xp em { display: none; }
    .avatar { width: 36px; height: 36px; font-size: 12px; }
    .theme { width: 34px; height: 34px; font-size: 15px; }
    .tabs {
      display: grid; grid-template-columns: repeat(5, 1fr);
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
      height: 74px; padding-bottom: env(safe-area-inset-bottom);
      background: var(--card); border-top: 2.5px solid var(--ink);
    }
    .tabs a {
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
      font-family: var(--f-mono); font-size: 10px; font-weight: 700; text-transform: uppercase;
      text-decoration: none; color: var(--ink);
    }
    .ico {
      width: 26px; height: 26px; border-radius: 8px; border: 2px solid var(--ink);
      display: grid; place-items: center; font-size: 13px; line-height: 1;
    }
    .tabs a.on .ico { background: var(--yellow); color: var(--hard); }
  }
</style>
