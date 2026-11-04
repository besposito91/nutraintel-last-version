import { createServer } from 'vite';
import { config } from './vite-shared.mjs';

const server = await createServer({
  ...config,
  logLevel: 'error',
  optimizeDeps: { disabled: true, noDiscovery: true, include: [] },
  server: { host: '127.0.0.1', port: 5173 },
});

await server.listen();
console.log(`NutraIntel pronto su ${server.resolvedUrls?.local?.[0] || 'http://127.0.0.1:5173/'}`);
