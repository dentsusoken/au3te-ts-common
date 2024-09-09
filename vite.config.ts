import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: {
        api: './lib/api/index.ts',
        conf: './lib/conf/index.ts',
        endpoint: './lib/endpoint/index.ts',
        schemas: './lib/schemas/index.ts',
        utils: './lib/utils/index.ts',
      },
      name: 'au3te-ts-common',
      fileName: (format, entry) => {
        const ext = format === 'es' ? 'js' : format;
        return `${entry}/index.${ext}`;
      },
    },
  },
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: 'build',
        global: 'build',
        process: 'build',
      },
      overrides: {
        fs: 'memfs',
      },
    }),
  ],
});
