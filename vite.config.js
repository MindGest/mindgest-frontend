import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config = defineConfig({
  plugins: [
    sveltekit({
      output: {
        rollupOptions: {
          sourcemap: true,
          format: 'iife',
          name: 'app',
          file: 'public/build/bundle.js',
          inlineDynamicImports: true
        },
        external: [
          'svelte-material-icons/CalendarAccount.svelte',
          'svelte-material-icons/Eye.svelte',
          'svelte-material-icons/Pencil.svelte',
          'svelte-material-icons/ChartBar.svelte',
          'svelte-material-icons/AccountCircle.svelte',
          'svelte-material-icons/Folder.svelte',
          'http-status-codes',
          'jspdf',
          'jspdf-autotable'
        ]
      }
    })
  ]
});

export default config;
