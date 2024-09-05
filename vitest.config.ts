import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, __dirname, '') };

  return {
    plugins: [
      nodePolyfills({
        globals: {
          Buffer: 'build',
          global: 'build',
          process: 'build',
        },
        exclude: ['fs', 'crypto'],
      }),
    ],
    test: {},
  };
});
