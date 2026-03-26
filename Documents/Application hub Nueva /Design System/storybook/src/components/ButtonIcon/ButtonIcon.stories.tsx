import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { ButtonIcon, type ButtonIconProps } from './ButtonIcon';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **ButtonIcon component** that provides an icon-only button for compact interactive actions.

---

### ✨ Features

- 🎯 **Compact:** Designed specifically for icon-only actions to save space.
- 📐 **Sizes:** XS, S, and M variants for different UI contexts.
- 🎨 **Variants:** Primary and neutral styles for different action hierarchies.
- 🧩 **Flexible:** Accepts any icon as children.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ButtonIcon } from './ButtonIcon';
import { Icon } from 'components/Icon/Icon';

<ButtonIcon>
  <Icon name="delete" />
</ButtonIcon>

<ButtonIcon variant="neutral" size="S">
  <Icon name="create" />
</ButtonIcon>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'neutral'],
      description: 'Visual style of the button',
      table: {
        type: { summary: '"primary" | "neutral"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['XS', 'S', 'M'],
      description: 'Size of the button',
      table: {
        type: { summary: '"XS" | "S" | "M"' },
        defaultValue: { summary: '"M"' },
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
} as Meta<typeof ButtonIcon>;

const Template: StoryFn<ButtonIconProps> = (args) => <ButtonIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Icon name="drag_indicator" />,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default icon button with primary style.',
    },
  },
};

export const Neutral = Template.bind({});
Neutral.args = {
  children: <Icon name="drag_indicator" />,
  variant: 'neutral',
};
Neutral.parameters = {
  docs: {
    description: {
      story: 'Neutral variant for subtle actions.',
    },
  },
};

export const SizeXS = Template.bind({});
SizeXS.args = {
  children: <Icon name="close" />,
  size: 'XS',
};
SizeXS.parameters = {
  docs: {
    description: {
      story: 'Extra small size for tight spaces.',
    },
  },
};

export const SizeS = Template.bind({});
SizeS.args = {
  children: <Icon name="create" />,
  size: 'S',
};
SizeS.parameters = {
  docs: {
    description: {
      story: 'Small size variant.',
    },
  },
};

const AllSizesTemplate: StoryFn<ButtonIconProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ButtonIcon size="XS">
      <Icon name="delete" />
    </ButtonIcon>
    <ButtonIcon size="S">
      <Icon name="delete" />
    </ButtonIcon>
    <ButtonIcon size="M">
      <Icon name="delete" />
    </ButtonIcon>
  </div>
);

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparison of all button sizes.',
    },
  },
};

const AllVariantsTemplate: StoryFn<ButtonIconProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ButtonIcon variant="primary">
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral">
      <Icon name="create" />
    </ButtonIcon>
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Comparison of primary and neutral variants.',
    },
  },
};
