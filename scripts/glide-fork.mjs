// The ONE place the vendored Glide fork is wired to its package specifier.
// The kit must run OUR copy (vendor/glide-data-grid), never the npm package:
// every Vite/Vitest config imports this alias (vite root, playground, vitest).
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const glideForkAlias = [
  {
    // Exact match only: the `/dist/index.css` subpath stays a real file path.
    find: /^@glideapps\/glide-data-grid$/,
    replacement: path.resolve(root, 'vendor/glide-data-grid/dist/esm/index.js'),
  },
];
