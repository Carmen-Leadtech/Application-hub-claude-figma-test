#!/usr/bin/env node

/**
 * Design Tokens Builder
 *
 * Uses Style Dictionary + @tokens-studio/sd-transforms to convert
 * design-system-tokens.json (Figma Variables export) into CSS custom properties.
 *
 * Usage: tsx scripts/build-tokens.ts
 */

import { register, getTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import type { PreprocessedTokens } from 'style-dictionary/types';
import { createPropertyFormatter } from 'style-dictionary/utils';

import {
  cleanAnnotations,
  readableCssName,
  fontWeightToNumeric,
  assignTokenCategories,
} from './build-tokens.transforms';

// Register sd-transforms: strips $themes/$metadata, aligns types, and
// with excludeParentKeys removes Figma collection/mode wrappers so that
// short references like {brand.dark.50} resolve correctly.
register(StyleDictionary, {
  excludeParentKeys: true,
});

// ============================================================================
// Preprocessor: Clean annotations and remove non-token sets
// ============================================================================

StyleDictionary.registerPreprocessor({
  name: 'filter-and-clean-tokens',
  preprocessor: (dictionary: PreprocessedTokens): PreprocessedTokens => {
    // 1. Remove non-token sets (Screen resolutions, etc.)
    const filtered: PreprocessedTokens = {};
    for (const [key, value] of Object.entries(dictionary)) {
      if (key.toLowerCase().includes('screen resolutions')) continue;
      filtered[key] = value;
    }

    // 2. Tag tokens with $extensions.category based on source set
    const categorized = assignTokenCategories(filtered);

    // 3. Clean parenthetical annotations from keys and reference values
    return cleanAnnotations(categorized) as PreprocessedTokens;
  },
});

// ============================================================================
// Name Transform: Readable CSS variable names
// ============================================================================

StyleDictionary.registerTransform({
  name: 'name/readable-css',
  type: 'name',
  transform: (token) => readableCssName(token.path),
});

// ============================================================================
// Value Transform: font-weight names → numeric CSS values
// Figma exports font weights as $type:"text" so ts/typography/fontWeight
// doesn't match them. We detect them by path instead.
// ============================================================================

StyleDictionary.registerTransform({
  name: 'value/font-weight-numeric',
  type: 'value',
  filter: (token) => token.path.includes('font-weight'),
  transform: (token) => fontWeightToNumeric(String(token.$value)),
});

// ============================================================================
// Value Transform: number type → px
// Figma Variables exports sizes as $type:"number" instead of "dimension",
// so the built-in ts/size/px transform doesn't match them.
// ============================================================================

StyleDictionary.registerTransform({
  name: 'value/number-to-px',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'number' && typeof token.original.$value === 'number',
  transform: (token) => `${token.$value}px`,
});

// ============================================================================
// Custom Format: Two :root blocks (primitive + semantic)
// ============================================================================

StyleDictionary.registerFormat({
  name: 'css/variables-two-roots',
  format: ({ dictionary, options }) => {
    const outputReferences = options?.outputReferences ?? false;

    const formatProperty = createPropertyFormatter({
      format: 'css',
      dictionary,
      outputReferences,
      usesDtcg: true,
    });

    const primitiveLines: string[] = [];
    const semanticLines: string[] = [];

    for (const token of dictionary.allTokens) {
      const line = formatProperty(token).replace(/\n$/, '');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const category = (token as any).$extensions?.category;

      if (category === 'primitive') {
        primitiveLines.push(line);
      } else {
        semanticLines.push(line);
      }
    }

    return [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      '',
      '/* Primitive design tokens */',
      ':root {',
      ...primitiveLines,
      '}',
      '',
      '/* Semantic design tokens */',
      ':root {',
      ...semanticLines,
      '}',
      '',
    ].join('\n');
  },
});

// ============================================================================
// Build Configuration
// ============================================================================

const sd = new StyleDictionary({
  source: ['src/styles/design-system-tokens/design-system-tokens.json'],
  preprocessors: ['filter-and-clean-tokens', 'tokens-studio'],
  platforms: {
    css: {
      transforms: [
        ...getTransforms({ platform: 'css' }),
        'color/css',
        'name/readable-css',
        'value/font-weight-numeric',
        'value/number-to-px',
      ],
      buildPath: 'src/styles/design-system-tokens/',
      files: [
        {
          destination: 'design-system-tokens.css',
          format: 'css/variables-two-roots',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✅ Design tokens CSS generated successfully.');
