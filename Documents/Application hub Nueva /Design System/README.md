# 🎨 CV UI Kit
> A complete Design System and component library for resume/CV applications built with **React**, **TypeScript**, and **Storybook**.
**Repository**: https://github.com/mariaclaudiainfantes-sketch/cv-ui-kit  
**Storybook**: https://storybooks.1eres.net/cv-ui-kit-storybook/  
**Package**: `@npm_leadtech/cv-ui-kit` (coming soon)
---
## ✨ Features
- 🎨 **37 UI Components** organized in 6 categories
- 🎯 **40+ Color Tokens** with semantic naming
- 📏 **Complete Design System** with tokens for spacing, typography, radius, shadows
- 📚 **Storybook** for visual documentation
- ✅ **Validators** for compliance checking
- 📖 **Comprehensive Documentation** with examples
- 🔄 **Design Tokens** in JSON format for easy integration
- ♿ **Accessibility First** with ARIA attributes
---
## 📦 What's Included
### Components (37 total)
**Loaders** (3)
- `AISpinner` - Animated spinner for AI processing
- `CircularProgress` - Circular progress indicator
- `LoadingSteps` - Multi-step loading indicator
**Cards** (8)
- `AccordionCard`, `Banner`, `Card`, `InfoCard`, `ProductCard`, `PriorityCard`, `PriorityCardList`, `SuggestionCard`
**Components** (17)
- `Badge`, `Button`, `ButtonIcon`, `Chip`, `Dialog`, `FileUploader`, `Icon`, `LanguageSelector`, `Link`, `MenuItem`, `MenuItemBlock`, `Popover`, `Skeleton`, `Slider`, `Tab`, `Tabs`, `Toast`, `Wysiwyg`
**Forms** (6)
- `Checkbox`, `RadioButton`, `Select`, `SelectMenu`, `Switch`, `Textfield`
**Layout** (1)
- `ContentHeader`
**Score** (5)
- `ScoreCard`, `ScoreDonut`, `ScoreProgress`, `ScoreProgressBar`, `ScoreTag`
### Design Tokens
**Colors** (40+)
- Background colors (7 variants)
- Text colors with semantic names
- Status colors (error, success, warning, info)
- Border colors
- Icon colors
- Fill colors
**Typography**
- Font families (Roboto)
- Font weights (regular, medium, bold)
- Text styles (heading, body, small-details)
**Spacing**
- Base 4px system (xs, sm, md, lg, xl, 2xl)
**Border Radius**
- Multiple radius options (none, sm, md, lg, xl, full)
**Shadows**
- Elevation shadows (sm, md, lg, xl)
---
## 🚀 Quick Start
### For Claude Code Projects
```bash
# Clone the repository
git clone https://github.com/mariaclaudiainfantes-sketch/cv-ui-kit.git
# Copy design-system to your project
cp -r cv-ui-kit/design-system ./
cp cv-ui-kit/claude.md ./
# Install Storybook (optional, for local viewing)
cd cv-ui-kit
npm install
npm run storybook
```
### Basic Usage
```jsx
import { Button, Textfield, Card } from '@npm_leadtech/cv-ui-kit';
export function MyComponent() {
  return (
    <Card style={{ padding: 'var(--spacing-lg)' }}>
      <h1>Welcome</h1>
      <Textfield
        label="Name"
        placeholder="Enter your name"
        style={{ marginBottom: 'var(--spacing-md)' }}
      />
      <Button variant="primary" size="M">
        Submit
      </Button>
    </Card>
  );
}
```
---
## 📁 Project Structure
```
cv-ui-kit/
├── storybook/                      # React components & Storybook
│   ├── .storybook/
│   ├── src/
│   └── package.json
│
├── design-system/                  # Design tokens & component metadata
│   ├── tokens/
│   │   ├── colors.json            # 40+ color tokens
│   │   ├── typography.json        # Font families & weights
│   │   ├── spacing.json           # 4px base system
│   │   ├── radius.json            # Border radius values
│   │   └── shadows.json           # Elevation shadows
│   ├── components/
│   │   ├── index.md               # Component index
│   │   ├── loaders.json           # 3 loader components
│   │   ├── cards.json             # 8 card components
│   │   ├── components.json        # 17 general components
│   │   ├── forms.json             # 6 form components
│   │   ├── layout.json            # 1 layout component
│   │   └── score.json             # 5 score components
│   └── README.md
│
├── docs/                           # Documentation
│   ├── SETUP.md                   # Setup instructions
│   ├── DESIGN_SYSTEM.md           # Detailed design system guide
│   └── EXAMPLES.md                # Usage examples
│
├── validators/                     # Compliance validators
│   ├── component-validator.ts     # Validate components
│   ├── token-validator.ts         # Validate design tokens
│   └── compliance-report.ts       # Generate compliance reports
│
├── examples/                       # Code examples
│   ├── Button.example.tsx
│   ├── Textfield.example.tsx
│   ├── Card.example.tsx
│   ├── Form.example.tsx
│   └── README.md
│
├── claude.md                       # Claude Code developer guide
├── README.md                       # This file
├── package.json
└── .gitignore
```
---
## 📖 Documentation
| Document | Purpose |
|----------|---------|
| **claude.md** | Developer guide for Claude Code projects |
| **docs/SETUP.md** | Installation & setup instructions |
| **docs/DESIGN_SYSTEM.md** | Detailed design system documentation |
| **docs/EXAMPLES.md** | Code examples for common patterns |
| **design-system/README.md** | How to use design tokens & components |
| **Storybook** | Visual component documentation |
---
## 🎨 Design Tokens Usage
### Colors
Always use CSS variables instead of hardcoded values:
```jsx
// ✅ CORRECT
style={{ backgroundColor: 'var(--color-background-brand)' }}
style={{ color: 'var(--color-text-default)' }}
// ❌ INCORRECT
style={{ backgroundColor: '#006dcc' }}
style={{ color: '#272a2a' }}
```
### Spacing
Use the 4px base system:
```jsx
// ✅ CORRECT
style={{ padding: 'var(--spacing-md)' }}
style={{ marginBottom: 'var(--spacing-lg)' }}
// ❌ INCORRECT
style={{ padding: '16px' }}
style={{ marginBottom: '24px' }}
```
### Typography
```jsx
// ✅ CORRECT
style={{ fontFamily: 'var(--font-family-body)', fontWeight: 400 }}
// ❌ INCORRECT
style={{ fontFamily: 'Roboto', fontWeight: 400 }}
```
---
## 🧩 Component Usage Examples
### Button
```jsx
import { Button } from '@npm_leadtech/cv-ui-kit';
// Variants: primary, secondary, gradient
<Button variant="primary" size="M">
  Click me
</Button>
<Button variant="secondary" disabled>
  Disabled
</Button>
<Button variant="gradient" fullWidth>
  Full width
</Button>
```
### Textfield
```jsx
import { Textfield } from '@npm_leadtech/cv-ui-kit';
// Basic
<Textfield
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
// With validation
<Textfield
  label="Email"
  error={!!error}
  errorMessage={error}
/>
// With decorators
<Textfield
  label="Password"
  prefix={<Icon name="lock" />}
  suffix={<Icon name="eye" />}
/>
```
### Card
```jsx
import { Card } from '@npm_leadtech/cv-ui-kit';
<Card variant="default">
  <h2>Title</h2>
  <p>Content</p>
</Card>
<Card variant="elevated">
  Elevated card with shadow
</Card>
<Card variant="outlined">
  Outlined card with border
</Card>
```
### Complete Form
```jsx
import React from 'react';
import { Textfield, Button, Select, Checkbox, Card } from '@npm_leadtech/cv-ui-kit';
export function ContactForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    country: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <Card style={{ maxWidth: '600px', padding: 'var(--spacing-lg)' }}>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <Textfield
          label="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        <Textfield
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        <Select
          label="Country"
          value={form.country}
          onChange={(e) => setForm({...form, country: e.target.value})}
          options={[
            { value: 'us', label: 'USA' },
            { value: 'mx', label: 'México' },
            { value: 'es', label: 'España' }
          ]}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        />
        <Button variant="primary" type="submit" fullWidth>
          Send
        </Button>
      </form>
    </Card>
  );
}
```
---
## ✅ Compliance & Validation
The project includes validators to ensure compliance with the design system:
```bash
# Validate components
npm run validate:components
# Validate design tokens
npm run validate:tokens
# Generate compliance report
npm run validate:compliance
```
### Compliance Checklist
Before committing code:
- [ ] Only use components from the catalog (`design-system/components/`)
- [ ] All props match the component schema
- [ ] All colors use CSS variables (no hardcoded values)
- [ ] All spacing uses spacing tokens
- [ ] All variants exist in the allowed list
- [ ] Component is responsive (mobile + desktop)
- [ ] Accessibility attributes are included (aria-labels, etc.)
- [ ] Validator passes without errors
---
## 🔗 Key Links
- **GitHub Repository**: https://github.com/mariaclaudiainfantes-sketch/cv-ui-kit
- **Storybook (Live)**: https://storybooks.1eres.net/cv-ui-kit-storybook/
- **Design Tokens**: `design-system/tokens/`
- **Components**: `design-system/components/`
- **Developer Guide**: `claude.md`
- **Setup Instructions**: `docs/SETUP.md`
---
## 📝 For Claude Code Users
This design system is optimized for use with **Claude Code**:
1. **Copy `design-system/` to your project**
```bash
   cp -r cv-ui-kit/design-system ./
```
2. **Read `claude.md` for development guidelines**
```bash
   cp cv-ui-kit/claude.md ./
```
3. **Reference tokens and components in your code**
   - Tokens: `design-system/tokens/*.json`
   - Components: `design-system/components/*.json`
4. **Use validators to check compliance** (optional)
   - Copy `validators/` folder
   - Run validation scripts
---
## 🛠️ Installation & Development
### Prerequisites
- Node.js 16+
- npm or yarn
### Setup
```bash
# Clone repository
git clone https://github.com/mariaclaudiainfantes-sketch/cv-ui-kit.git
cd cv-ui-kit
# Install dependencies
npm install
# Start Storybook
npm run storybook
# Build Storybook
npm run build-storybook
# Run validators
npm run validate:compliance
```
### Available Scripts
```bash
npm run storybook           # Start Storybook dev server
npm run build-storybook     # Build static Storybook
npm run validate:components # Validate component usage
npm run validate:tokens     # Validate design tokens
npm run validate:compliance # Generate compliance report
npm run lint               # Lint TypeScript
npm run type-check         # Type check
```
---
## 📊 Statistics
| Category | Count |
|----------|-------|
| **Components** | 37 |
| **Color Tokens** | 40+ |
| **Spacing Values** | 6 |
| **Border Radius Values** | 6 |
| **Shadow Levels** | 5 |
| **Component Categories** | 6 |
| **Documentation Files** | 6+ |
---
## 🤝 Contributing
Contributions are welcome! Please:
1. Check the [Design System Guide](docs/DESIGN_SYSTEM.md)
2. Follow the component structure in `design-system/components/`
3. Add examples in the `examples/` folder
4. Update documentation in `docs/`
5. Ensure validators pass
---
## 📄 License
This project is part of CV UI Kit. See LICENSE file for details.
---
## 👤 Author
**María Claudia Infantes** - [@mariaclaudiainfantes-sketch](https://github.com/mariaclaudiainfantes-sketch)
---
## 🎉 Getting Started
1. **Browse the [Storybook](https://storybooks.1eres.net/cv-ui-kit-storybook/)** to see all components visually
2. **Read [claude.md](./claude.md)** for development guidelines
3. **Check [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** for detailed documentation
4. **Copy `design-system/` to your project** and start building!
---
## 📞 Support
- **Issues**: https://github.com/mariaclaudiainfantes-sketch/cv-ui-kit/issues
- **Storybook**: https://storybooks.1eres.net/cv-ui-kit-storybook/
- **Documentation**: See `docs/` folder
---
**Last Updated**: December 2024  
**Version**: 1.0.0
---
### Quick Links
- 📖 [Developer Guide](claude.md)
- 🎨 [Design System](docs/DESIGN_SYSTEM.md)
- 🚀 [Setup Instructions](docs/SETUP.md)
- 📚 [Examples](docs/EXAMPLES.md)
- 🧩 [Components](design-system/components/)
- 🎯 [Tokens](design-system/tokens/)
**Happy coding! 🎨**