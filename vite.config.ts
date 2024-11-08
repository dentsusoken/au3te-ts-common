import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: './lib/index.ts',
        api: './lib/api/index.ts',
        conf: './lib/conf/index.ts',
        handler: './lib/handler/index.ts',
        'schemas/common': './lib/schemas/common/index.ts',
        'schemas/par': './lib/schemas/par/index.ts',
        'schemas/authorization': './lib/schemas/authorization/index.ts',
        'schemas/authorization-fail':
          './lib/schemas/authorization-fail/index.ts',
        'schemas/authorization-issue':
          './lib/schemas/authorization-issue/index.ts',
        'schemas/authorization-decision':
          './lib/schemas/authorization-decision/index.ts',
        'schemas/token': './lib/schemas/token/index.ts',
        'schemas/token-issue': './lib/schemas/token-issue/index.ts',
        'schemas/token-fail': './lib/schemas/token-fail/index.ts',
        'schemas/service-configuration':
          './lib/schemas/service-configuration/index.ts',
        'schemas/credential-metadata':
          './lib/schemas/credential-metadata/index.ts',
        'page-model/authorization': './lib/page-model/authorization/index.ts',
        utils: './lib/utils/index.ts',
        user: './lib/user/index.ts',
      },
      name: 'au3te-ts-common',
      fileName: (format, entry) => {
        const ext = format === 'es' ? 'js' : format;
        const indexFile = `index.${ext}`;

        return entry === 'main' ? indexFile : `${entry}/${indexFile}`;
        //return `${dir}/index.${ext}`;
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
