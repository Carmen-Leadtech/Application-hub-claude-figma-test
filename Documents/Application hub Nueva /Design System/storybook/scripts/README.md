# Design Tokens Build Script

This directory contains the tooling for converting design tokens from JSON to CSS using [Style Dictionary](https://styledictionary.com/) and [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms).

## build-tokens.ts

Converts `design-system-tokens.json` (Figma Variables export) to `design-system-tokens.css` with `var()` references.

**Language**: TypeScript
**Engine**: [Style Dictionary v4](https://styledictionary.com/) + [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms)

### Features

- Converts Figma Variables / Tokens Studio JSON export to CSS custom properties
- Resolves `{reference}` tokens to `var()` calls automatically via `excludeParentKeys`
- Strips Figma metadata (`$themes`, `$metadata`, `$extensions`)
- Cleans parenthetical annotations from keys and references (e.g., `"default (brand)"` → `"default"`)
- Custom name transform produces clean, readable CSS variable names
- Filters out designer-only collections (Screen resolutions)

### Usage

Run the build script using npm:

```bash
npm run convert-tokens
```

Or directly using tsx:

```bash
npx tsx scripts/build-tokens.ts
```

### How It Works

1. **Preprocessor: `filter-and-clean-tokens`** — Removes Screen resolution sets and cleans parenthetical annotations from keys and `$value` references
2. **Preprocessor: `tokens-studio`** (from sd-transforms) — Strips `$themes`/`$metadata`, removes Figma collection wrappers via `excludeParentKeys`, and aligns token types with DTCG
3. **Transforms** (from sd-transforms) — Handles math expressions, color formats, font weights, etc.
4. **Custom transform: `name/readable-css`** — Maps token paths to clean CSS variable names with category-aware prefixes
5. **Custom transform: `value/number-to-px`** — Adds `px` to `$type: "number"` tokens (Figma exports sizes as `number` instead of `dimension`)
6. **Style Dictionary build** — Outputs CSS with `var()` references

### CSS Variable Naming

The `name/readable-css` transform produces clean names based on the token's path after `excludeParentKeys` strips the collection wrappers:

| Token category       | Path example              | CSS variable               |
| -------------------- | ------------------------- | -------------------------- |
| Color primitives     | `brand.dark.50`           | `--brand-dark-50`          |
| Size primitives      | `48`                      | `--size-48`                |
| Semantic colors      | `background.brand`        | `--color-background-brand` |
| Semantic icon colors | `icons.brand`             | `--color-icons-brand`      |
| Typography           | `font-size.Titles.xxl`    | `--font-size-titles-xxl`   |
| Spacing              | `common.xs`               | `--spacing-xs`             |
| Spacing (larger)     | `larger.larger-1`         | `--spacing-larger-1`       |
| Corner radius        | `corner-radius.s-default` | `--corner-radius-s`        |
| Icon sizes           | `m-default`               | `--icon-size-m`            |

### Input Format

The script expects a Figma Variables JSON export with DTCG format:

```json
{
  "Color Primitives/Mode 1": {
    "brand": {
      "dark": {
        "50": {
          "$value": "#006dcc",
          "$type": "color"
        }
      }
    }
  },
  "COLORS/Mode 1": {
    "background": {
      "brand": {
        "$value": "{brand.dark.50}",
        "$type": "color"
      }
    }
  },
  "$themes": [],
  "$metadata": { ... }
}
```

### Output Format

```css
:root {
  --brand-dark-50: #006dcc;
  --size-16: 16px;
  --color-background-brand: var(--brand-dark-50);
  --spacing-m: var(--size-16);
}
```

### Files

- **Script**: `/scripts/build-tokens.ts`
- **Input**: `/src/styles/design-system-tokens/design-system-tokens.json`
- **Output**: `/src/styles/design-system-tokens/design-system-tokens.css`

### When to Run

Run this script whenever:

- Design tokens are updated in Figma and exported to JSON
- New tokens are added to the design system
- Token values or references are modified

### Integration with Build Process

You can integrate this script as a pre-build step:

```json
{
  "scripts": {
    "prebuild": "npm run convert-tokens",
    "build": "vite build"
  }
}
```

## Troubleshooting

### References Not Resolving

If token references output raw `{…}` strings instead of `var()`:

1. The reference path may contain parenthetical annotations — check the `cleanAnnotations` function in `build-tokens.ts`
2. The token might be in a collection that `excludeParentKeys` can't resolve — verify the collection is not in the exclusion list
3. Run with `SD_LOG_LEVEL=debug` to see Style Dictionary's reference resolution output

### Missing Tokens

If some tokens are missing from the output:

1. Check that the collection is not being filtered out in the `filter-and-clean-tokens` preprocessor
2. Verify tokens have both `$value` and `$type` properties
3. Check console output for Style Dictionary warnings

### Adding New Token Categories

If the Figma export adds a new collection:

1. If the new category needs a custom prefix, add a case to the `name/readable-css` transform in `build-tokens.ts`
2. If the collection should be excluded, add its name to the filter in the `filter-and-clean-tokens` preprocessor
3. Run `npm run convert-tokens` and verify the output
