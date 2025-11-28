import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, __dirname, '') };

  return {
    plugins: [],
    test: {},
  };
});
