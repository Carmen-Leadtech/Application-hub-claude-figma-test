import { Meta, StoryFn } from '@storybook/react';

import { CircularProgress } from 'components/CircularProgress/CircularProgress';
import { Icon } from 'components/Icon/Icon';

import { Button, type ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Button component** with multiple variants, sizes, and shapes for various action types.

---

### ✨ Features

- 🎨 **Variants:** Primary, secondary, and gradient styles for different action hierarchies.
- 📐 **Sizes:** Small (S) and medium (M) options for different UI contexts.
- 🔲 **Shapes:** Square or rounded corners for visual variety.
- 📏 **Full width:** Option to span full container width.
- 🧩 **Composable:** Supports icons and custom content as children.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Button } from './Button';
import { Icon } from 'components/Icon/Icon';

<Button variant="primary">Click me</Button>
<Button variant="secondary" size="S">Cancel</Button>
<Button variant="gradient" shape="rounded">
  <Icon name="stars" /> Generate with AI
</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gradient', 'tool'],
      description: 'Visual style of the button',
      table: {
        type: { summary: '"primary" | "secondary" | "gradient" | "tool"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['S', 'M'],
      description: 'Size of the button',
      table: {
        type: { summary: '"S" | "M"' },
        defaultValue: { summary: '"M"' },
      },
    },
    shape: {
      control: { type: 'radio' },
      options: ['square', 'rounded'],
      description: 'Border radius style',
      table: {
        type: { summary: '"square" | "rounded"' },
        defaultValue: { summary: '"square"' },
      },
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button span full container width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'Primary button for main actions and CTAs.',
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
};
Secondary.parameters = {
  docs: {
    description: {
      story: 'Secondary button for less prominent actions.',
    },
  },
};

export const Gradient = Template.bind({});
Gradient.args = {
  children: (
    <>
      <span style={{ display: 'flex' }}>
        <Icon color="white" name="ai_stars" />
      </span>
      <span>Generate with AI</span>
    </>
  ),
  variant: 'gradient',
};
Gradient.parameters = {
  docs: {
    description: {
      story: 'Gradient button for AI and special features.',
    },
  },
};

export const Tool = Template.bind({});
Tool.args = {
  children: 'Tool Button',
  variant: 'tool',
};
Tool.parameters = {
  docs: {
    description: {
      story: 'Tool button for actions and CTAs.',
    },
  },
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  children: (
    <>
      <span style={{ display: 'flex' }}>
        <Icon color="white" name="drag_indicator" />
      </span>
      <span>CTA button</span>
      <span style={{ display: 'flex' }}>
        <Icon color="white" name="drag_indicator" />
      </span>
    </>
  ),
};
WithIcons.parameters = {
  docs: {
    description: {
      story: 'Button with leading and trailing icons.',
    },
  },
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  children: 'Small Button',
  size: 'S',
};
SmallSize.parameters = {
  docs: {
    description: {
      story: 'Small size button for compact UIs.',
    },
  },
};

export const Rounded = Template.bind({});
Rounded.args = {
  children: 'Rounded Button',
  shape: 'rounded',
};
Rounded.parameters = {
  docs: {
    description: {
      story: 'Button with rounded corners.',
    },
  },
};

const AllVariantsTemplate: StoryFn<ButtonProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="gradient">
      <span style={{ display: 'flex' }}>
        <Icon color="white" name="ai_stars" />
      </span>
      Gradient
    </Button>
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Comparison of all button variants.',
    },
  },
};

export const WithSpinner = Template.bind({});
WithSpinner.args = {
  children: (
    <>
      <span style={{ display: 'flex', marginRight: 8 }}>
        <CircularProgress size={16} strokeWidth={2} />
      </span>
      <span>Loading</span>
    </>
  ),
  variant: 'primary',
  disabled: true,
};
WithSpinner.parameters = {
  docs: {
    description: {
      story: 'Button showing a `CircularProgress` spinner inside to indicate loading state.',
    },
  },
};
