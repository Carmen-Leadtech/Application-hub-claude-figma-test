import { Meta, StoryFn } from '@storybook/react';

import { CircularProgress, type CircularProgressProps } from './CircularProgress';

export default {
  title: 'Loaders/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **CircularProgress component** that provides a circular loading spinner for indicating loading states.

---

### ✨ Features

- 🔄 **Smooth animation:** Fluid rotating animation with dynamic stroke.
- 🎨 **Customizable:** Color, size, and stroke width can be customized via props.
- ♿ **Accessible:** Includes \`role="progressbar"\` and \`aria-label\` for screen readers.
- 🎯 **Lightweight:** Pure SVG implementation, no external dependencies.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { CircularProgress } from './CircularProgress';

<CircularProgress />
<CircularProgress size={24} strokeWidth={2} />
<CircularProgress color="#ff5722" size={60} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'color' },
      description: 'Color of the spinner stroke',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--brand-500, #006dcc)' },
      },
    },
    size: {
      control: { type: 'number' },
      description: 'Size of the spinner in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '40' },
      },
    },
    strokeWidth: {
      control: { type: 'number' },
      description: 'Width of the spinner stroke',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
  },
} as Meta<typeof CircularProgress>;

const Template: StoryFn<CircularProgressProps> = (args) => <CircularProgress {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'Default spinner with brand color and 40px size.',
    },
  },
};

export const Small = Template.bind({});
Small.args = {
  size: 24,
  strokeWidth: 2,
};
Small.parameters = {
  docs: {
    description: {
      story: 'Small spinner (24px) ideal for inline loading indicators.',
    },
  },
};

export const Large = Template.bind({});
Large.args = {
  size: 60,
  strokeWidth: 6,
};
Large.parameters = {
  docs: {
    description: {
      story: 'Large spinner (60px) for full-page or section loading states.',
    },
  },
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: '#ff5722',
  size: 48,
};
CustomColor.parameters = {
  docs: {
    description: {
      story: 'Spinner with custom color.',
    },
  },
};

const AllSizesTemplate: StoryFn<CircularProgressProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <CircularProgress size={20} strokeWidth={2} />
    <CircularProgress size={32} strokeWidth={3} />
    <CircularProgress size={40} strokeWidth={4} />
    <CircularProgress size={56} strokeWidth={5} />
  </div>
);

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparison of different spinner sizes.',
    },
  },
};
