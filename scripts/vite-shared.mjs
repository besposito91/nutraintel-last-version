
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));

const copyPublicFolders = () => ({
  name: 'copy-public-folders',
  apply: 'build',
  closeBundle() {
    const outputDir = resolve(root, 'dist');

    for (const folder of ['public', 'public-site']) {
      const sourceDir = resolve(root, folder);

      if (existsSync(sourceDir)) {
        cpSync(sourceDir, outputDir, { recursive: true });
        console.log(`Cartella ${folder} copiata in dist.`);
      }
    }
  },
});

export const config = {
  configFile: false,
  root,
  publicDir: 'public-site',
  plugins: [react(), copyPublicFolders()],
  base: './',
  optimizeDeps: { noDiscovery: true, include: [] },
};
