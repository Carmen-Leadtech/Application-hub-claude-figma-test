import { Meta, StoryFn } from '@storybook/react';

import { Tab, type TabProps } from './Tab';

export default {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Tab component** that provides a tab button for navigation, typically used within the \`Tabs\` container.

---

### ✨ Features

- 🎯 **Standalone:** Can be used independently or within \`Tabs\` component.
- 📐 **Sizes:** Small ("S") and medium ("M") variants.
- 🎨 **States:** Active/inactive visual states.
- ♿ **Accessible:** Proper ARIA attributes and semantic HTML.
- 🧪 **Test-friendly:** \`data-qa\` attribute support.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Tab } from './Tab';
import { Tabs } from 'components/Tabs/Tabs';

// Within Tabs (recommended)
<Tabs>
  <Tab label="Home" />
  <Tab label="Profile" />
</Tabs>

// Standalone
<Tab label="Custom Tab" active={true} size="M" onClick={() => console.log('clicked')} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text displayed in the tab',
      table: {
        type: { summary: 'string' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description: 'If true, the tab appears in active state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['S', 'M'],
      description: 'Size of the tab',
      table: {
        type: { summary: '"S" | "M"' },
        defaultValue: { summary: '"M"' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the tab is clicked',
      table: {
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    'data-qa': {
      control: { type: 'text' },
      description: 'Optional test identifier',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof Tab>;

const Template: StoryFn<TabProps> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Home',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default tab in inactive state.',
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  label: 'Profile',
  active: true,
};
Active.parameters = {
  docs: {
    description: {
      story: 'Tab in active state with darker text color.',
    },
  },
};

export const SizeS = Template.bind({});
SizeS.args = {
  label: 'Settings',
  size: 'S',
};
SizeS.parameters = {
  docs: {
    description: {
      story: 'Small size tab (16px font).',
    },
  },
};

export const SizeM = Template.bind({});
SizeM.args = {
  label: 'About',
  size: 'M',
};
SizeM.parameters = {
  docs: {
    description: {
      story: 'Medium size tab (20px font).',
    },
  },
};

export const ActiveSizeS = Template.bind({});
ActiveSizeS.args = {
  label: 'Dashboard',
  active: true,
  size: 'S',
};
ActiveSizeS.parameters = {
  docs: {
    description: {
      story: 'Active tab in small size.',
    },
  },
};

const MultipleTabsTemplate: StoryFn<TabProps> = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Tab label="Home" />
    <Tab label="Profile" active />
    <Tab label="Settings" />
  </div>
);

export const MultipleTabs = MultipleTabsTemplate.bind({});
MultipleTabs.parameters = {
  docs: {
    description: {
      story: 'Multiple tabs displayed together. Typically used within a `Tabs` container.',
    },
  },
};
