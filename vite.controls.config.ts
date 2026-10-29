import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The lean control-cell bundle. Glide is EXTERNAL on purpose: a host that
 * already runs its own grid imports these renderers and paints them into its
 * runtime (one copy of Glide, one theme, one overlay editor).
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/glide/controls.ts',
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'glide-controls.js' : 'glide-controls.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@glideapps/glide-data-grid',
      ],
    },
  },
});
