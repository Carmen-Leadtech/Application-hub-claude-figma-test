import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { Badge, type BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Badge component** for displaying labels and status indicators with semantic color variants.

---

### ✨ Features

- 🎨 **Variants:** Info (blue), success (green), warning (yellow), and neutral (gray) for different semantic meanings.
- 🔲 **Shapes:** Default, rounded, and outlined variants for visual variety.
- 📐 **Sizes:** Small (S) and medium (M) options for different UI contexts.
- 🏷️ **Semantic:** Visual distinction for different states and categories.
- 🎯 **Icons:** Supports icons alongside text content.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Badge } from './Badge';
import { Icon } from 'components/Icon/Icon';

<Badge variant="info">New</Badge>
<Badge variant="success" shape="rounded">Active</Badge>
<Badge variant="warning" shape="outlined">Pending</Badge>
<Badge variant="neutral"><Icon name="star" />HEADLINE</Badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'neutral'],
      description: 'Color variant of the badge',
      table: {
        type: { summary: '"info" | "success" | "warning" | "neutral"' },
        defaultValue: { summary: '"info"' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'rounded', 'outlined'],
      description: 'Border shape variant',
      table: {
        type: { summary: '"default" | "rounded" | "outlined"' },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['S', 'M'],
      description: 'Size of the badge',
      table: {
        type: { summary: '"S" | "M"' },
        defaultValue: { summary: '"S"' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Badge content (text, icons, or both)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} as Meta<BadgeProps>;

const Template: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

const DEFAULT_CHILDREN = 'ART DIRECTION';

export const Default = Template.bind({});
Default.args = {
  children: DEFAULT_CHILDREN,
  variant: 'info',
  shape: 'default',
  size: 'S',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default info badge for general information.',
    },
  },
};

export const Success = Template.bind({});
Success.args = {
  children: 'COMPLETED',
  variant: 'success',
  shape: 'default',
  size: 'S',
};
Success.parameters = {
  docs: {
    description: {
      story: 'Success badge for positive/completed states.',
    },
  },
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'PENDING',
  variant: 'warning',
  shape: 'default',
  size: 'S',
};
Warning.parameters = {
  docs: {
    description: {
      story: 'Warning badge for states requiring attention.',
    },
  },
};

export const WarningOutlined = Template.bind({});
WarningOutlined.args = {
  children: DEFAULT_CHILDREN,
  variant: 'warning',
  shape: 'outlined',
  size: 'S',
};
WarningOutlined.parameters = {
  docs: {
    description: {
      story: 'Outlined warning badge variant.',
    },
  },
};

export const InfoRounded = Template.bind({});
InfoRounded.args = {
  children: DEFAULT_CHILDREN,
  variant: 'info',
  shape: 'rounded',
  size: 'S',
};
InfoRounded.parameters = {
  docs: {
    description: {
      story: 'Rounded info badge variant.',
    },
  },
};

export const InfoRoundedM = Template.bind({});
InfoRoundedM.args = {
  children: DEFAULT_CHILDREN,
  variant: 'info',
  shape: 'rounded',
  size: 'M',
};
InfoRoundedM.parameters = {
  docs: {
    description: {
      story: 'Medium size rounded info badge.',
    },
  },
};

export const Neutral = Template.bind({});
Neutral.args = {
  children: 'HEADLINE',
  variant: 'neutral',
  shape: 'default',
  size: 'S',
};
Neutral.parameters = {
  docs: {
    description: {
      story: 'Neutral badge for categories and tags.',
    },
  },
};

const NeutralWithIconTemplate: StoryFn<BadgeProps> = () => (
  <Badge variant="neutral" size="S">
    <Icon name="star" />
    HEADLINE
  </Badge>
);

export const NeutralWithIcon = NeutralWithIconTemplate.bind({});
NeutralWithIcon.parameters = {
  docs: {
    description: {
      story: 'Neutral badge with an icon, commonly used for category tags.',
    },
  },
};

const AllVariantsTemplate: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Badge variant="info">INFO</Badge>
    <Badge variant="success">SUCCESS</Badge>
    <Badge variant="warning">WARNING</Badge>
    <Badge variant="neutral">NEUTRAL</Badge>
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Comparison of all variant colors.',
    },
  },
};

const AllShapesTemplate: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Badge shape="default">DEFAULT</Badge>
    <Badge shape="rounded">ROUNDED</Badge>
    <Badge shape="outlined">OUTLINED</Badge>
  </div>
);

export const AllShapes = AllShapesTemplate.bind({});
AllShapes.parameters = {
  docs: {
    description: {
      story: 'Comparison of all shape variants.',
    },
  },
};
