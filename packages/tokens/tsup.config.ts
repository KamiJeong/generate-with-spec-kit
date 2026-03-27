import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tailwind/preset': 'src/tailwind/preset.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  clean: true,
  sourcemap: true
});
