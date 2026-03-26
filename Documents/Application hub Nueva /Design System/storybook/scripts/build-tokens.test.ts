// @vitest-environment node
/// <reference types="vitest/globals" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  cleanAnnotations,
  cleanSegment,
  readableCssName,
  fontWeightToNumeric,
  FONT_WEIGHT_MAP,
  isPrimitiveTokenSet,
  assignTokenCategories,
} from './build-tokens.transforms';

// ============================================================================
// cleanAnnotations
// ============================================================================

describe('cleanAnnotations', () => {
  it('strips annotations from reference strings', () => {
    expect(cleanAnnotations('{interactivity.states.default (brand)}')).toBe(
      '{interactivity.states.default}'
    );
  });

  it('strips multiple annotations from the same string', () => {
    expect(cleanAnnotations('{a (x)} and {b (y)}')).toBe('{a} and {b}');
  });

  it('leaves non-reference strings untouched', () => {
    expect(cleanAnnotations('#ff0000')).toBe('#ff0000');
    expect(cleanAnnotations('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    expect(cleanAnnotations('16px')).toBe('16px');
  });

  it('strips annotations from object keys', () => {
    const input = { 'default (brand)': '#000', 'hover (brand)': '#111' };
    expect(cleanAnnotations(input)).toEqual({ default: '#000', hover: '#111' });
  });

  it('recursively processes nested objects', () => {
    const input = {
      'states (brand)': {
        default: { $value: '{brand.dark.50 (brand)}' },
      },
    };
    const expected = {
      states: {
        default: { $value: '{brand.dark.50}' },
      },
    };
    expect(cleanAnnotations(input)).toEqual(expected);
  });

  it('handles arrays', () => {
    expect(cleanAnnotations(['{a (x)}', '{b (y)}'])).toEqual(['{a}', '{b}']);
  });

  it('passes through primitives unchanged', () => {
    expect(cleanAnnotations(42)).toBe(42);
    expect(cleanAnnotations(null)).toBe(null);
    expect(cleanAnnotations(true)).toBe(true);
    expect(cleanAnnotations(undefined)).toBe(undefined);
  });
});

// ============================================================================
// cleanSegment
// ============================================================================

describe('cleanSegment', () => {
  it('lowercases and trims', () => {
    expect(cleanSegment('  Brand  ')).toBe('brand');
  });

  it('replaces whitespace with hyphens', () => {
    expect(cleanSegment('Font Family')).toBe('font-family');
  });

  it('strips parenthetical annotations', () => {
    expect(cleanSegment('default (brand)')).toBe('default');
  });

  it('handles combined cases', () => {
    expect(cleanSegment('  Corner Radius (primary)  ')).toBe('corner-radius');
  });
});

// ============================================================================
// readableCssName
// ============================================================================

describe('readableCssName', () => {
  describe('size primitives', () => {
    it('maps numeric keys to size-{n}', () => {
      expect(readableCssName(['0'])).toBe('size-0');
      expect(readableCssName(['4'])).toBe('size-4');
      expect(readableCssName(['16'])).toBe('size-16');
      expect(readableCssName(['256'])).toBe('size-256');
    });
  });

  describe('icon sizes', () => {
    it('maps known icon size keys to icon-size-{name}', () => {
      expect(readableCssName(['xs'])).toBe('icon-size-xs');
      expect(readableCssName(['s'])).toBe('icon-size-s');
      expect(readableCssName(['l'])).toBe('icon-size-l');
      expect(readableCssName(['xl'])).toBe('icon-size-xl');
    });

    it('strips -default suffix from icon sizes', () => {
      expect(readableCssName(['m-default'])).toBe('icon-size-m');
    });
  });

  describe('semantic colors', () => {
    it('prefixes background tokens with color-', () => {
      expect(readableCssName(['background', 'brand'])).toBe('color-background-brand');
      expect(readableCssName(['background', 'default'])).toBe('color-background-default');
    });

    it('prefixes text tokens with color-', () => {
      expect(readableCssName(['text', 'default'])).toBe('color-text-default');
      expect(readableCssName(['text', 'secondary'])).toBe('color-text-secondary');
    });

    it('prefixes border tokens with color-', () => {
      expect(readableCssName(['border', 'brand'])).toBe('color-border-brand');
      expect(readableCssName(['border', 'weaker'])).toBe('color-border-weaker');
    });

    it('prefixes fill tokens with color-', () => {
      expect(readableCssName(['fill', 'common', 'brand'])).toBe('color-fill-common-brand');
    });
  });

  describe('semantic icon colors', () => {
    it('prefixes icons sub-paths with color-', () => {
      expect(readableCssName(['icons', 'brand'])).toBe('color-icons-brand');
      expect(readableCssName(['icons', 'system-error'])).toBe('color-icons-system-error');
    });
  });

  describe('spacing', () => {
    it('maps "common" to spacing-{rest}', () => {
      expect(readableCssName(['common', 'xs'])).toBe('spacing-xs');
      expect(readableCssName(['common', 'm'])).toBe('spacing-m');
      expect(readableCssName(['common', 'xxs-exception'])).toBe('spacing-xxs-exception');
    });

    it('maps "larger" to spacing- with deduplication', () => {
      expect(readableCssName(['larger', 'larger-1'])).toBe('spacing-larger-1');
      expect(readableCssName(['larger', 'larger-26'])).toBe('spacing-larger-26');
    });
  });

  describe('corner radius', () => {
    it('keeps corner-radius prefix', () => {
      expect(readableCssName(['corner-radius', 'xs'])).toBe('corner-radius-xs');
      expect(readableCssName(['corner-radius', 'm'])).toBe('corner-radius-m');
    });

    it('strips -default suffix from size indicators', () => {
      expect(readableCssName(['corner-radius', 's-default'])).toBe('corner-radius-s');
    });

    it('does not strip -default from non-size segments', () => {
      // Only strips when it matches known size patterns (xs|s|m|l|xl|xxl)
      expect(readableCssName(['corner-radius', 'foo-default'])).toBe('corner-radius-foo-default');
    });
  });

  describe('default passthrough', () => {
    it('joins path segments for brand color primitives', () => {
      expect(readableCssName(['brand', 'light', '10'])).toBe('brand-light-10');
      expect(readableCssName(['brand', 'dark', '50'])).toBe('brand-dark-50');
    });

    it('joins path segments for neutrals', () => {
      expect(readableCssName(['neutrals', 'white', '00'])).toBe('neutrals-white-00');
      expect(readableCssName(['neutrals', 'dark', '70'])).toBe('neutrals-dark-70');
    });

    it('joins path segments for system colors', () => {
      expect(readableCssName(['system', 'error', '50'])).toBe('system-error-50');
    });

    it('joins path segments for typography primitives', () => {
      expect(readableCssName(['font-family', 'heading'])).toBe('font-family-heading');
      expect(readableCssName(['font-weight', 'strong'])).toBe('font-weight-strong');
    });

    it('joins path segments for font sizes', () => {
      expect(readableCssName(['font-size', 'titles', 'xl'])).toBe('font-size-titles-xl');
      expect(readableCssName(['font-size', 'body', 'm-default'])).toBe('font-size-body-m-default');
    });

    it('joins path segments for line heights', () => {
      expect(readableCssName(['line-height', 'titles', 'xl'])).toBe('line-height-titles-xl');
    });

    it('joins path segments for interactivity states', () => {
      expect(readableCssName(['interactivity', 'states', 'default'])).toBe(
        'interactivity-states-default'
      );
    });
  });
});

// ============================================================================
// fontWeightToNumeric
// ============================================================================

describe('fontWeightToNumeric', () => {
  it('maps common weight names to numeric values', () => {
    expect(fontWeightToNumeric('Thin')).toBe('100');
    expect(fontWeightToNumeric('Light')).toBe('300');
    expect(fontWeightToNumeric('Regular')).toBe('400');
    expect(fontWeightToNumeric('Medium')).toBe('500');
    expect(fontWeightToNumeric('Bold')).toBe('700');
    expect(fontWeightToNumeric('Black')).toBe('900');
  });

  it('handles compound names with spaces and hyphens', () => {
    expect(fontWeightToNumeric('Semi Bold')).toBe('600');
    expect(fontWeightToNumeric('semi-bold')).toBe('600');
    expect(fontWeightToNumeric('Extra Bold')).toBe('800');
    expect(fontWeightToNumeric('extra-light')).toBe('200');
  });

  it('is case-insensitive', () => {
    expect(fontWeightToNumeric('MEDIUM')).toBe('500');
    expect(fontWeightToNumeric('medium')).toBe('500');
    expect(fontWeightToNumeric('Medium')).toBe('500');
  });

  it('returns the original value for unknown weights', () => {
    expect(fontWeightToNumeric('Custom')).toBe('Custom');
    expect(fontWeightToNumeric('500')).toBe('500');
  });

  it('covers all entries in FONT_WEIGHT_MAP', () => {
    for (const [name, expected] of Object.entries(FONT_WEIGHT_MAP)) {
      expect(fontWeightToNumeric(name)).toBe(expected);
    }
  });
});

// ============================================================================
// isPrimitiveTokenSet
// ============================================================================

describe('isPrimitiveTokenSet', () => {
  it('returns true for Color Primitives keys', () => {
    expect(isPrimitiveTokenSet('Color Primitives/Mode 1')).toBe(true);
    expect(isPrimitiveTokenSet('Color Primitives/Dark')).toBe(true);
  });

  it('returns true for Size Primitives keys', () => {
    expect(isPrimitiveTokenSet('Size Primitives/Mode 1')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isPrimitiveTokenSet('color primitives/mode 1')).toBe(true);
    expect(isPrimitiveTokenSet('SIZE PRIMITIVES/MODE 1')).toBe(true);
  });

  it('returns false for semantic token set keys', () => {
    expect(isPrimitiveTokenSet('COLORS/Mode 1')).toBe(false);
    expect(isPrimitiveTokenSet('TYPOGRAPHY/Mode 1')).toBe(false);
    expect(isPrimitiveTokenSet('SPACING/Mode 1')).toBe(false);
    expect(isPrimitiveTokenSet('CORNER RADIUS/Mode 1')).toBe(false);
    expect(isPrimitiveTokenSet('ICONS/Mode 1')).toBe(false);
  });

  it('returns false for meta keys', () => {
    expect(isPrimitiveTokenSet('$themes')).toBe(false);
    expect(isPrimitiveTokenSet('$metadata')).toBe(false);
  });
});

// ============================================================================
// assignTokenCategories
// ============================================================================

describe('assignTokenCategories', () => {
  it('tags tokens under primitive set keys with category "primitive"', () => {
    const input = {
      'Color Primitives/Mode 1': {
        brand: { $value: '#006dcc', $type: 'color' },
      },
    };
    const result = assignTokenCategories(input) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(result['Color Primitives/Mode 1'].brand.$extensions.category).toBe('primitive');
  });

  it('tags tokens under semantic set keys with category "semantic"', () => {
    const input = {
      'COLORS/Mode 1': {
        background: {
          brand: { $value: '{brand.dark.50}', $type: 'color' },
        },
      },
    };
    const result = assignTokenCategories(input) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(result['COLORS/Mode 1'].background.brand.$extensions.category).toBe('semantic');
  });

  it('preserves existing $extensions properties', () => {
    const input = {
      'COLORS/Mode 1': {
        bg: {
          $value: '{x}',
          $type: 'color',
          $extensions: { 'com.figma.scopes': ['FRAME_FILL'] },
        },
      },
    };
    const result = assignTokenCategories(input) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    const ext = result['COLORS/Mode 1'].bg.$extensions;
    expect(ext.category).toBe('semantic');
    expect(ext['com.figma.scopes']).toEqual(['FRAME_FILL']);
  });

  it('passes through $ meta keys unchanged', () => {
    const input = { $themes: [], $metadata: { key: 'val' } };
    const result = assignTokenCategories(input);
    expect(result.$themes).toEqual([]);
    expect(result.$metadata).toEqual({ key: 'val' });
  });
});

// ============================================================================
// Integration: full CSS output verification
// ============================================================================

describe('integration: generated CSS', () => {
  // Read the CSS file that was last generated by `npm run convert-tokens`.
  // This acts as a snapshot to catch regressions in the full pipeline.
  const cssPath = resolve(__dirname, '../src/styles/design-system-tokens/design-system-tokens.css');
  const css = readFileSync(cssPath, 'utf-8');

  /** Helper: extract the value of a CSS custom property from the :root block. */
  function getVar(name: string): string | undefined {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = css.match(new RegExp(`${escaped}:\\s*(.+?)\\s*;`));
    return match?.[1];
  }

  it('contains two :root blocks with section comments', () => {
    expect(css).toContain('/* Primitive design tokens */');
    expect(css).toContain('/* Semantic design tokens */');
    const rootBlocks = css.match(/:root\s*\{/g);
    expect(rootBlocks).toHaveLength(2);
  });

  it('places primitive tokens before semantic tokens', () => {
    const primitiveIdx = css.indexOf('/* Primitive design tokens */');
    const semanticIdx = css.indexOf('/* Semantic design tokens */');
    expect(primitiveIdx).toBeLessThan(semanticIdx);
  });

  describe('block assignment', () => {
    const [primitiveBlock, semanticBlock] = css.split('/* Semantic design tokens */');

    it('places size primitives in the primitive block', () => {
      expect(primitiveBlock).toContain('--size-16:');
      expect(semanticBlock).not.toContain('--size-16:');
    });

    it('places brand color primitives in the primitive block', () => {
      expect(primitiveBlock).toContain('--brand-dark-50:');
      expect(semanticBlock).not.toContain('--brand-dark-50:');
    });

    it('places semantic colors in the semantic block', () => {
      expect(semanticBlock).toContain('--color-background-brand:');
      expect(primitiveBlock).not.toContain('--color-background-brand:');
    });

    it('places typography tokens in the semantic block', () => {
      expect(semanticBlock).toContain('--font-family-heading:');
      expect(semanticBlock).toContain('--font-weight-strong:');
      expect(semanticBlock).toContain('--font-size-titles-xl:');
    });

    it('places spacing tokens in the semantic block', () => {
      expect(semanticBlock).toContain('--spacing-m:');
      expect(primitiveBlock).not.toContain('--spacing-m:');
    });

    it('places corner radius tokens in the semantic block', () => {
      expect(semanticBlock).toContain('--corner-radius-s:');
      expect(primitiveBlock).not.toContain('--corner-radius-s:');
    });

    it('places icon size tokens in the semantic block', () => {
      expect(semanticBlock).toContain('--icon-size-m:');
      expect(primitiveBlock).not.toContain('--icon-size-m:');
    });
  });

  describe('size primitives', () => {
    it('outputs --size-0 through --size-256 with px values', () => {
      expect(getVar('--size-0')).toBe('0px');
      expect(getVar('--size-16')).toBe('16px');
      expect(getVar('--size-256')).toBe('256px');
    });
  });

  describe('color primitives', () => {
    it('outputs brand colors as hex values', () => {
      expect(getVar('--brand-light-10')).toBe('#ebf6ff');
      expect(getVar('--brand-dark-50')).toBe('#006dcc');
    });

    it('outputs neutrals as hex values', () => {
      expect(getVar('--neutrals-white-00')).toBe('#ffffff');
      expect(getVar('--neutrals-black-80')).toBe('#27292a');
    });

    it('outputs system colors as hex values', () => {
      expect(getVar('--system-error-50')).toBe('#f15e29');
      expect(getVar('--system-success-50')).toBe('#00b786');
      expect(getVar('--system-warning-50')).toBe('#ffbf06');
    });
  });

  describe('semantic colors (reference resolution)', () => {
    it('references primitives with var()', () => {
      expect(getVar('--color-background-brand')).toBe('var(--brand-dark-50)');
      expect(getVar('--color-text-default')).toBe('var(--neutrals-black-80)');
      expect(getVar('--color-border-weaker')).toBe('var(--neutrals-light-20)');
    });

    it('outputs icon color tokens', () => {
      expect(getVar('--color-icons-brand')).toBe('var(--brand-dark-50)');
    });
  });

  describe('typography primitives', () => {
    it('outputs font families as plain names', () => {
      expect(getVar('--font-family-heading')).toBe('Roboto');
      expect(getVar('--font-family-body')).toBe('Roboto');
    });

    it('outputs font weights as numeric values', () => {
      expect(getVar('--font-weight-strong')).toBe('500');
      expect(getVar('--font-weight-default')).toBe('400');
    });
  });

  describe('typography semantic (font sizes, line heights)', () => {
    it('references size primitives', () => {
      expect(getVar('--font-size-titles-xl')).toBe('var(--size-32)');
      expect(getVar('--font-size-body-s')).toBe('var(--size-14)');
      expect(getVar('--line-height-titles-xl')).toBe('var(--size-40)');
    });
  });

  describe('spacing', () => {
    it('references size primitives', () => {
      expect(getVar('--spacing-xs')).toBe('var(--size-8)');
      expect(getVar('--spacing-m')).toBe('var(--size-16)');
      expect(getVar('--spacing-xxxl')).toBe('var(--size-48)');
    });

    it('outputs larger spacing tokens', () => {
      expect(getVar('--spacing-larger-1')).toBe('var(--size-56)');
    });
  });

  describe('corner radius', () => {
    it('references size primitives without -default suffix', () => {
      expect(getVar('--corner-radius-xs')).toBe('var(--size-4)');
      expect(getVar('--corner-radius-s')).toBe('var(--size-8)');
      expect(getVar('--corner-radius-m')).toBe('var(--size-12)');
    });
  });

  describe('icon sizes', () => {
    it('references size primitives', () => {
      expect(getVar('--icon-size-xs')).toBe('var(--size-16)');
      expect(getVar('--icon-size-m')).toBe('var(--size-24)');
      expect(getVar('--icon-size-xl')).toBe('var(--size-48)');
    });
  });

  describe('annotation cleaning (system-info references)', () => {
    it('resolves system-info tokens that reference brand primitives', () => {
      expect(getVar('--system-info-10')).toBe('var(--brand-light-10)');
      expect(getVar('--system-info-50')).toBe('var(--brand-dark-50)');
    });
  });

  describe('no "Screen resolutions" tokens in output', () => {
    it('does not contain screen resolution variables', () => {
      expect(css).not.toMatch(/--screen/i);
    });
  });
});
