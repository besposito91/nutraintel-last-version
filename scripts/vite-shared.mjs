import react from '@vitejs/plugin-react';

export const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');

export const config = {
  configFile: false,
  root,
  publicDir: 'public-site',
  plugins: [react()],
  base: './',
  optimizeDeps: { noDiscovery: true, include: [] },
};
