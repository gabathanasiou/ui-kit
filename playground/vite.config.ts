import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/* Playground dev server — imports the kit SOURCE (../src/index.ts) directly,
   so kit changes are live without building. Run from the kit root:
   `npx vite playground` (or `npm run playground`). Tailwind v4 + the kit
   tokens.css reproduce the app's rendering exactly (the kit ships Tailwind
   classes the consumer provides). */
export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', '@radix-ui/react-dropdown-menu', '@radix-ui/react-dialog', '@floating-ui/react-dom'],
  },
});
