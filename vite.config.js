import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, cpSync } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        dir: 'dist',
      },
    },
    outDir: 'dist',
  },

  // ✅ Custom build hook
  plugins: [
    {
      name: 'copy-static-files',
      closeBundle() {
        // Copy manifest.json
        copyFileSync('manifest.json', 'dist/manifest.json');

        // Copy icons folder if it exists
        try {
          cpSync('icons', 'dist/icons', { recursive: true });
        } catch {
          console.log('⚠️ No icons folder found, skipping...');
        }

        console.log('✅ manifest.json and icons copied to dist/');
      },
    },
  ],
});
