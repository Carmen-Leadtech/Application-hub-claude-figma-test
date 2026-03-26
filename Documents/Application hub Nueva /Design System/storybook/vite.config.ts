import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    // Target ES2015 for better compatibility (similar to Material-UI)
    // This ensures the code works in most modern browsers
    target: 'es2015',

    lib: {
      entry: {
        index: 'src/index.ts',
        fileUploader: 'src/fileUploader.ts',
      },
      fileName: (format, entryName) => {
        // Generate file names based on the format
        if (format === 'es') return `${entryName}.esm.js`;
        if (format === 'cjs') return `${entryName}.cjs`;
        return `${entryName}.${format}.js`;
      },
      // Generate both ES modules and CommonJS for maximum compatibility
      formats: ['es', 'cjs'],
    },

    // Do not minify the code - let the consumer do it
    // This allows better debugging and tree-shaking in consumer projects
    minify: false,
    cssMinify: true, // CSS can be minified

    reportCompressedSize: false,

    chunkSizeWarningLimit: 500,

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dropzone',
        '@dnd-kit/core',
        '@dnd-kit/sortable',
        '@dnd-kit/utilities',
        'classnames',
      ],
      output: {
        // Do not use preserveModules with multiple formats to avoid numbered files
        // Single bundles allow component-level tree-shaking
        // Consumers can import: import { Button } from '@npm_leadtech/cv-ui-kit'
        exports: 'named',
        // Avoid excessive code splitting - keep chunks large
        manualChunks: undefined,
        // Configure file names for dynamic chunks
        chunkFileNames: (chunkInfo) => {
          // Keep descriptive names for chunks (like SVG icons)
          return chunkInfo.name + '-[hash].js';
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },

    sourcemap: true,
  },

  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:4]',
      localsConvention: 'camelCase',
    },
  },

  esbuild: {
    legalComments: 'none',
    drop: ['console', 'debugger'],
    // Target ES2015 for compatible transpilation
    target: 'es2015',
    // Do not minify in library build - let the consumer do it
    // This allows better debugging and tree-shaking
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
  },

  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tsconfigPaths(),
    dts({
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
});
