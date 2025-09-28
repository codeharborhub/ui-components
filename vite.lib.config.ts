import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        'src/main.tsx',
        'src/App.tsx', 
        'src/pages/**/*',
        'src/hooks/**/*',
        '**/*.stories.tsx',
        '**/*.test.*'
      ]
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/ui/index.ts'),
      name: 'UIComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});