import { preview } from 'vite';
import { config } from './vite-shared.mjs';

const server = await preview({
  ...config,
  preview: { host: '127.0.0.1', port: 4173 },
});

server.printUrls();
