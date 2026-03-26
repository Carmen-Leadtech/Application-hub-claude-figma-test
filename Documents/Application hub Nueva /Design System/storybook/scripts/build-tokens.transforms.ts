/**
 * Pure transform functions for the design tokens build pipeline.
 *
 * Extracted from build-tokens.ts so they can be unit-tested independently.
 * These are registered as Style Dictionary transforms/preprocessors in the
 * main build script.
 */

// ============================================================================
// Annotation cleaning
// ============================================================================

/**
 * Recursively cleans annotation suffixes like "(brand)" from:
 * - Object keys: "default (brand)" → "default"
 * - Reference values: "{interactivity.states.default (brand)}" → "{interactivity.states.default}"
 * Leaves non-reference strings (hex colors, rgb(), etc.) untouched.
 */
export function cleanAnnotations(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return obj.replace(
      /\{([^}]*?)\s*\([^)]+\)\s*\}/g,
      (_match, path: string) => `{${path.trim()}}`
    );
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanAnnotations);
  }

  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const cleanKey = key.replace(/\s*\([^)]+\)\s*/g, '').trim();
      result[cleanKey] = cleanAnnotations(value);
    }
    return result;
  }

  return obj;
}

// ============================================================================
// Name transform: readable CSS variable names
// ============================================================================

/** Known icon-size token keys (top-level after excludeParentKeys strips ICONS/Mode 1) */
export const ICON_SIZE_KEYS = new Set(['xs', 's', 'm-default', 'l', 'xl']);

/** Semantic color first-segment keys (from COLORS/Mode 1 set) */
export const COLOR_CATEGORIES = new Set(['background', 'border', 'text', 'fill']);

/** Clean a single path segment: strip annotations, lowercase, normalize whitespace */
export function cleanSegment(segment: string): string {
  return segment
    .replace(/\s*\([^)]+\)\s*/g, '') // strip "(brand)" and similar annotations
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Generates a readable CSS variable name from a token path.
 *
 * This is the core logic registered as the "name/readable-css" transform.
 * It receives the raw token path array (before segment cleaning) and returns
 * the final CSS custom property name (without the leading `--`).
 */
export function readableCssName(rawPath: string[]): string {
  const path = rawPath.map(cleanSegment);
  const first = path[0];
  const joined = path.join('-');

  // Size primitives: single numeric key → "size-{n}"
  if (path.length === 1 && /^\d+$/.test(first)) {
    return `size-${first}`;
  }

  // Icon sizes: known single-segment tokens → "icon-size-{name}"
  if (path.length === 1 && ICON_SIZE_KEYS.has(first)) {
    return `icon-size-${first.replace(/-default$/, '')}`;
  }

  // Semantic colors: background/border/text/fill → "color-{path}"
  if (COLOR_CATEGORIES.has(first)) {
    return `color-${joined}`;
  }

  // Semantic icon colors: "icons" with sub-paths → "color-{path}"
  if (first === 'icons' && path.length >= 2) {
    return `color-${joined}`;
  }

  // Spacing: "common" → "spacing-{rest}", "larger" → "spacing-{deduped}"
  if (first === 'common') {
    return `spacing-${path.slice(1).join('-')}`;
  }
  if (first === 'larger') {
    const deduped = path.map((seg, i) => {
      if (i === 0) return seg;
      const prev = path[i - 1];
      return seg.startsWith(`${prev}-`) ? seg.substring(prev.length + 1) : seg;
    });
    return `spacing-${deduped.join('-')}`;
  }

  // Corner radius: strip "-default" suffix from size indicators (s-default → s)
  if (first === 'corner-radius') {
    return joined.replace(/-(xs|s|m|l|xl|xxl)-default$/, '-$1');
  }

  // Default: color primitives, typography, etc. — path is already descriptive
  return joined;
}

// ============================================================================
// Value transform: font-weight names → numeric CSS values
// ============================================================================

export const FONT_WEIGHT_MAP: Record<string, string> = {
  thin: '100',
  hairline: '100',
  extralight: '200',
  ultralight: '200',
  light: '300',
  regular: '400',
  normal: '400',
  medium: '500',
  semibold: '600',
  demibold: '600',
  bold: '700',
  extrabold: '800',
  ultrabold: '800',
  black: '900',
  heavy: '900',
};

/**
 * Converts a font weight name (e.g. "Medium", "Semi Bold") to its numeric
 * CSS equivalent (e.g. "500", "600"). Returns the original value if no
 * mapping is found.
 */
export function fontWeightToNumeric(value: string): string {
  const normalized = value.toLowerCase().replace(/[\s-]/g, '');
  return FONT_WEIGHT_MAP[normalized] ?? value;
}

// ============================================================================
// Token category assignment (primitive vs semantic)
// ============================================================================

const PRIMITIVE_SET_PATTERN = /^(Color Primitives|Size Primitives)\b/i;

/**
 * Determines if a top-level token set key represents a primitive token set.
 * Primitive sets are "Color Primitives/*" and "Size Primitives/*".
 */
export function isPrimitiveTokenSet(key: string): boolean {
  return PRIMITIVE_SET_PATTERN.test(key);
}

/**
 * Recursively tags all leaf tokens (objects with $value) with
 * `$extensions.category = 'primitive' | 'semantic'`. Existing `$extensions`
 * properties (e.g. Figma scopes) are preserved via shallow merge.
 */
function tagTokensWithCategory(obj: unknown, category: 'primitive' | 'semantic'): unknown {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;

  const record = obj as Record<string, unknown>;

  if ('$value' in record) {
    const existing = (record.$extensions as Record<string, unknown>) ?? {};
    return { ...record, $extensions: { ...existing, category } };
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    result[key] = key.startsWith('$') ? value : tagTokensWithCategory(value, category);
  }
  return result;
}

/**
 * Assigns a category ('primitive' or 'semantic') to every leaf token in the
 * dictionary based on its top-level key.
 *
 * Keys matching "Color Primitives/*" or "Size Primitives/*" → primitive.
 * All others (COLORS, TYPOGRAPHY, SPACING, CORNER RADIUS, ICONS, etc.) → semantic.
 * Meta keys starting with '$' are passed through unchanged.
 */
export function assignTokenCategories(
  dictionary: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(dictionary)) {
    if (key.startsWith('$')) {
      result[key] = value;
      continue;
    }
    const category = isPrimitiveTokenSet(key) ? 'primitive' : 'semantic';
    result[key] = tagTokensWithCategory(value, category);
  }
  return result;
}
