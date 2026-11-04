import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Bundle classico (IIFE) senza attributi crossorigin: funziona anche
// dentro iframe sandbox / origin opache e su hosting statici semplici.
const classicScript = () => ({
  name: 'classic-script',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '')
      .replace(/ crossorigin(?=[ >])/g, '')
      .replace('</body>', (m) => m);
  },
  generateBundle(_, bundle) {
    const js = Object.keys(bundle).find((f) => f.endsWith('.js'));
    const htmlAsset = bundle['index.html'];
    if (js && htmlAsset) {
      htmlAsset.source = String(htmlAsset.source).replace('</body>', `  <script defer src="./${js}"></script>\n  </body>`);
    }
  },
});

export default defineConfig({
  plugins: [react(), classicScript()],
  base: './',
  build: { cssCodeSplit: false, modulePreload: false, assetsInlineLimit: 60000, rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } } },
});

