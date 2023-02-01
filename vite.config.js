import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config = defineConfig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
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
  }
});

export default config;
