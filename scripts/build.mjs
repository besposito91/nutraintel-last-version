import { build } from 'vite';
import { config } from './vite-shared.mjs';

await build({
  ...config,
  build: {
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 60000,
  },
});
