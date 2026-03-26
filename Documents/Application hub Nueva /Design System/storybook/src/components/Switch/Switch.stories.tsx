import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Switch, type SwitchProps } from './Switch';

export default {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Switch component** for toggling a single setting on or off, inspired by Material UI.

---

### ✨ Features

- ♿ **Accessible:** Native checkbox input for keyboard and screen readers.
- 🔄 **Controlled/Uncontrolled:** Works with external state or manages its own state.
- 📐 **Sizes:** Small and medium variants for different UI contexts.
- 🎯 **Interactive:** Click on the switch or label to toggle.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { Switch } from './Switch';

// Uncontrolled
<Switch label="Notifications" defaultChecked />

// Controlled
const [isOn, setIsOn] = useState(false);

<Switch
  label="Dark mode"
  checked={isOn}
  onChange={(value) => setIsOn(value)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Initial checked state (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Label text displayed next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
      description: 'Size of the switch',
      table: {
        type: { summary: '"small" | "medium"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color of the switch when checked',
      table: {
        type: {
          summary:
            '"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | string',
        },
        defaultValue: { summary: '"primary"' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when switch state changes',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
} as Meta<typeof Switch>;

const Template: StoryFn<SwitchProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <Switch {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Default switch',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default unchecked switch.',
    },
  },
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small switch',
  size: 'small',
};
Small.parameters = {
  docs: {
    description: {
      story: 'Small size variant for compact UIs.',
    },
  },
};

export const Controlled: StoryFn<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      {...args}
      checked={checked}
      label="Controlled switch"
      onChange={(value) => setChecked(value)}
    />
  );
};
Controlled.parameters = {
  docs: {
    description: {
      story: 'Switch with external state management.',
    },
  },
};

export const Checked = Template.bind({});
Checked.args = {
  defaultChecked: true,
  label: 'Checked by default',
};
Checked.parameters = {
  docs: {
    description: {
      story: 'Switch with initial checked state.',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Disabled switch',
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled state prevents interaction.',
    },
  },
};

export const CheckedAndDisabled = Template.bind({});
CheckedAndDisabled.args = {
  defaultChecked: true,
  disabled: true,
  label: 'Checked and disabled',
};
CheckedAndDisabled.parameters = {
  docs: {
    description: {
      story: 'Checked switch in disabled state.',
    },
  },
};

export const Grouped: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Switch label="Option A" defaultChecked />
    <Switch label="Option B" />
    <Switch label="Option C" disabled />
    <Switch label="Option D" defaultChecked disabled />
  </div>
);
Grouped.parameters = {
  docs: {
    description: {
      story: 'Group of switches with different states.',
    },
  },
};

export const ColorVariants: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Switch label="Default" defaultChecked color="default" />
    <Switch label="Primary" defaultChecked color="primary" />
    <Switch label="Secondary" defaultChecked color="secondary" />
    <Switch label="Success" defaultChecked color="success" />
    <Switch label="Warning" defaultChecked color="warning" />
    <Switch label="Info" defaultChecked color="info" />
    <Switch label="Error" defaultChecked color="error" />
  </div>
);
ColorVariants.parameters = {
  docs: {
    description: {
      story: 'Color variants for the checked state.',
    },
  },
};
