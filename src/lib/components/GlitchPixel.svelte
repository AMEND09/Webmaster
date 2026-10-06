<script>
  import { app, award } from '../store.svelte.js';

  /** The hidden "broken pixel" behind the Glitch Hunter badge. */
  let { style = '' } = $props();
</script>

{#if !app.badges['glitch-hunter']}
  <button class="px" {style} aria-label="A strange pixel" onclick={() => award('glitch-hunter')}></button>
{/if}

<style>
  .px {
    position: absolute; width: 6px; height: 6px; padding: 0; border: 0;
    background: #00ff9c; cursor: crosshair; z-index: 5;
    animation: glitch 2.6s steps(1) infinite;
  }
  .px::after { content: ''; position: absolute; inset: -10px; } /* friendlier hit area */
  @keyframes glitch {
    0%, 86% { background: #00ff9c; transform: none; }
    88% { background: #ff00e6; transform: translate(2px, -1px); }
    91% { background: #00e1ff; transform: translate(-2px, 1px); }
    94% { background: #00ff9c; transform: none; }
  }
</style>
