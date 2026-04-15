import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import ts from 'typescript';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePattern = /(?:src|tests).*\.[cm]?[jt]sx?$/;

function typescriptTransformPlugin() {
  return {
    name: 'wiki-typescript-transform',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.split(path.sep).join('/');
      if (!normalizedId.startsWith(dirname.split(path.sep).join('/')) || !sourcePattern.test(normalizedId)) {
        return null;
      }

      const output = ts.transpileModule(code, {
        fileName: id,
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.ReactJSX,
          isolatedModules: true,
          importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
        },
      });

      return {
        code: output.outputText,
        map: output.sourceMapText ? JSON.parse(output.sourceMapText) : null,
      };
    },
  };
}

export default defineConfig({
  plugins: [typescriptTransformPlugin(), react()],
  esbuild: {
    include: /\0/,
  },
  resolve: {
    alias: {
      '@wiki': path.resolve(dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
