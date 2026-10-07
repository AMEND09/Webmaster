import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: './',
  plugins: [svelte()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
});
