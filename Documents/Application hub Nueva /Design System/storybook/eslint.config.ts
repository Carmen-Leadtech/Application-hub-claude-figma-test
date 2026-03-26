import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'out/',
      'coverage/',
      'storybook-static/',
      '.yalc/',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      prettier: pluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'vitest',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@testing-library/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'after',
            },
            {
              pattern: './icons/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@storybook/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      semi: ['error', 'always'],
    },
  },
];
