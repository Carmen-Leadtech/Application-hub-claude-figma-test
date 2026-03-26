import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from 'components/Tab/Tab';

import { Tabs, type TabsProps } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `
A **Tabs component** with full accessibility, keyboard navigation, and both controlled/uncontrolled modes.

---

### ✨ Features

- 🎯 **Interactive:** Supports mouse clicks and keyboard navigation (\`ArrowLeft\`, \`ArrowRight\`, \`Home\`, \`End\`).
- ♿ **Accessible:** Implements correct WAI-ARIA roles (\`tablist\`, \`tab\`, \`aria-selected\`, etc.).
- 🔄 **Controlled or uncontrolled:**
  - Controlled mode: use \`value\` + \`onChange\`.
  - Uncontrolled mode: omit them to let the component manage state.
- 🧩 **Composable:** Works with multiple \`<Tab />\` children.
- ⚡ **Responsive:** Two sizes — small ("S") and medium ("M").
- 🧪 **Test-friendly:** \`data-qa\` attributes supported on both parent and individual tabs.

---

### ⚙️ Controlled Example

\`\`\`tsx
const [value, setValue] = useState(0);

<Tabs value={value} onChange={(e, i) => setValue(i)}>
  <Tab label="Home" />
  <Tab label="Profile" />
  <Tab label="Settings" />
</Tabs>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['S', 'M'],
      description: 'Size of the tabs.',
      table: {
        type: { summary: '"S" | "M"' },
        defaultValue: { summary: 'M' },
      },
    },
    value: {
      control: false,
      description: 'Current active tab index (controlled mode).',
      table: {
        type: { summary: 'number' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback fired when the active tab changes. `(event, newValue)`.',
      table: {
        type: { summary: '(event: SyntheticEvent, value: number) => void' },
      },
    },
    children: {
      control: false,
      description: 'Array of `<Tab />` components used as tabs.',
      table: {
        type: { summary: 'ReactElement<TabProps>[]' },
      },
    },
    'data-qa': {
      control: 'text',
      description: 'Optional test identifier for the parent Tabs component.',
    },
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

export const Default: Story = {
  args: {
    children: [<Tab key="1" label="Home" />],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default Tabs component with a single tab. Works in controlled or uncontrolled mode.',
      },
    },
  },
};

export const SizeS: Story = {
  args: {
    size: 'S',
    children: [
      <Tab key="1" label="Home" />,
      <Tab key="2" label="Profile" />,
      <Tab key="3" label="Settings" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs in small size ("S"). Compact layout suitable for dense UIs.',
      },
    },
  },
};

export const SizeM: Story = {
  args: {
    size: 'M',
    children: [
      <Tab key="1" label="Home" />,
      <Tab key="2" label="Profile" />,
      <Tab key="3" label="Settings" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs in medium size ("M"). Recommended for most interfaces.',
      },
    },
  },
};

export const TabsList: Story = {
  render: () => (
    <Tabs size="S" data-qa="example-tabs">
      <Tab label="Home" data-qa="tab-home" />
      <Tab label="Profile" data-qa="tab-profile" />
      <Tab label="Settings" data-qa="tab-settings" />
      <Tab label="About" data-qa="tab-about" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example with multiple tabs and custom `data-qa` attributes for test automation. State is managed internally by default.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <Tabs
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        size="M"
        data-qa="controlled-tabs"
      >
        <Tab label="Home" data-qa="tab-home" />
        <Tab label="Profile" data-qa="tab-profile" />
        <Tab label="Settings" data-qa="tab-settings" />
      </Tabs>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled example using external state. Useful for integrating with routing or global state management.',
      },
    },
  },
};
