<script>
  /**
   * Simple sticker-style stand-ins for the illustrations (swap for final art later).
   * kind: 'byte' | 'brain' | 'toolbox' | 'scale'
   */
  let { kind = 'byte' } = $props();
</script>

<svg viewBox="0 0 200 200" role="img" aria-label={kind === 'byte' ? 'Byte the robot' : kind}>
  {#if kind === 'byte'}
    <g stroke="#111" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
      <line x1="100" y1="34" x2="100" y2="16" />
      <circle cx="100" cy="13" r="8" fill="#ff5a36" />
      <rect x="44" y="34" width="112" height="86" rx="22" fill="#6fdcb0" />
      <rect x="60" y="52" width="80" height="48" rx="14" fill="#fffdf7" />
      <circle cx="82" cy="74" r="8" fill="#111" class="eye" />
      <circle cx="118" cy="74" r="8" fill="#111" class="eye" />
      <path d="M86 90 Q100 98 114 90" fill="none" />
      <rect x="34" y="66" width="12" height="24" rx="5" fill="#ffe14d" />
      <rect x="154" y="66" width="12" height="24" rx="5" fill="#ffe14d" />
      <rect x="62" y="126" width="76" height="52" rx="14" fill="#3a5bff" />
      <rect x="84" y="138" width="32" height="20" rx="5" fill="#ffe14d" />
      <path d="M62 140 Q40 146 36 168" fill="none" />
      <path d="M138 140 Q164 132 172 110" fill="none" />
      <circle cx="36" cy="170" r="7" fill="#ff9ecb" />
      <circle cx="172" cy="106" r="7" fill="#ff9ecb" />
    </g>
  {:else if kind === 'brain'}
    {@const pts = [[50,70],[80,45],[118,40],[150,62],[160,100],[140,138],[100,150],[62,135],[42,102],[90,85],[122,92],[96,118]]}
    {@const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[0,9],[1,9],[9,10],[2,10],[3,10],[10,4],[10,11],[9,11],[11,6],[11,5],[8,9],[7,11]]}
    <g stroke="#111" stroke-width="4" stroke-linecap="round">
      {#each edges as [a, b]}<line x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />{/each}
    </g>
    {#each pts as [x, y], i}
      <circle cx={x} cy={y} r={i > 8 ? 11 : 9} fill={['#ffe14d', '#ff9ecb', '#6fdcb0', '#fffdf7'][i % 4]} stroke="#111" stroke-width="4" />
    {/each}
  {:else if kind === 'toolbox'}
    <g stroke="#111" stroke-width="5" stroke-linejoin="round">
      <path d="M74 70 V54 a8 8 0 0 1 8 -8 h36 a8 8 0 0 1 8 8 V70" fill="none" />
      <rect x="28" y="70" width="144" height="96" rx="12" fill="#ff5a36" />
      <rect x="28" y="70" width="144" height="30" rx="8" fill="#ffe14d" />
      <rect x="88" y="92" width="24" height="16" rx="4" fill="#fffdf7" />
      <rect x="44" y="20" width="70" height="38" rx="8" fill="#fffdf7" transform="rotate(-12 79 39)" />
    </g>
    <text x="78" y="46" transform="rotate(-12 79 39)" font-family="Space Mono, monospace" font-weight="700" font-size="16" text-anchor="middle" fill="#111">&gt;_ ask</text>
  {:else}
    <g stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="100" y1="34" x2="100" y2="170" />
      <rect x="64" y="166" width="72" height="14" rx="5" fill="#ffe14d" />
      <line x1="38" y1="58" x2="162" y2="50" />
      <circle cx="100" cy="34" r="9" fill="#ff5a36" />
      <path d="M38 58 L18 112 H62 Z" fill="#fffdf7" />
      <path d="M162 50 L142 104 H186 Z" fill="#fffdf7" />
      <path d="M18 112 a22 12 0 0 0 44 0 Z" fill="#6fdcb0" />
      <path d="M142 104 a22 12 0 0 0 44 0 Z" fill="#ff9ecb" />
    </g>
  {/if}
</svg>

<style>
  svg { width: 100%; height: 100%; display: block; }
  .eye { animation: blink 5s infinite; transform-origin: center; transform-box: fill-box; }
  @keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.1); } }
</style>
