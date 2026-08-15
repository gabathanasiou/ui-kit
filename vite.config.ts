import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      output: {
        banner: '"use client";',
      },
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-dom/server',
        'react/jsx-runtime',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        'lucide-react',
        '@floating-ui/react-dom',
        '@tiptap/react',
        '@tiptap/pm',
        '@tiptap/pm/state',
        '@tiptap/suggestion',
        '@tiptap/starter-kit',
        '@tiptap/extension-color',
        '@tiptap/extension-link',
        '@tiptap/extension-mention',
        '@tiptap/extension-placeholder',
        '@tiptap/extension-text-style',
        '@tiptap/extension-underline',
      ],
    },
  },
});
