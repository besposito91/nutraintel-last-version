import { build, preview } from 'vite';
import { config } from './vite-shared.mjs';

// Preview the production bundle so the local site behaves like the deployed
// version and Windows never receives an incompatible CommonJS JSX runtime.
await build({
  ...config,
  logLevel: 'error',
  build: {
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 60000,
    watch: {},
  },
});

const server = await preview({
  ...config,
  logLevel: 'error',
  preview: { host: '127.0.0.1', port: 5173, strictPort: true },
});

console.log('NutraIntel pronto su http://127.0.0.1:5173/');
console.log('Le modifiche vengono ricompilate automaticamente; aggiorna la pagina per vederle.');
server.printUrls();
