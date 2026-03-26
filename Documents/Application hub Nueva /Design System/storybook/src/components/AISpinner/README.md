# AISpinner Component

An **AISpinner component** that provides an AI-style loading indicator with a central dot and two rotating rings of dots.

## Features

- **Brand colors:** Uses design system semantic tokens (`--color-fill-illustrations-brand-weak-1`, `-weak-2`, `-weak-3`) for center and ring dots.
- **Dual rotation:** Inner ring rotates clockwise, outer ring counter-clockwise.
- **Accessible:** `role="status"` and `aria-label` for screen readers, `aria-busy="true"`.
- **Sizeable:** `size` prop (e.g. 72, 108, 180) for consistent scaling.
- **Pure CSS:** No external dependencies.
- **Test-friendly:** `data-qa` attributes for automation.

## Usage Example

```tsx
import { AISpinner } from './AISpinner';

<AISpinner />
<AISpinner size={108} />
<AISpinner size={72} aria-label="AI is thinking" />
<AISpinner data-qa="ai-loader" />
```
