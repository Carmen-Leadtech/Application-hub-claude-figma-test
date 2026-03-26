import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Checkbox, type CheckboxProps } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Checkbox component** for binary selections with controlled and uncontrolled modes.

---

### ✨ Features

- ♿ **Accessible:** Proper keyboard support (Space, Enter) and semantic HTML.
- 🔄 **Controlled/Uncontrolled:** Works with external state or manages its own state.
- 📐 **Sizes:** Small and medium variants for different UI contexts.
- 🎯 **Interactive:** Click on label or checkbox to toggle state.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { Checkbox } from './Checkbox';

// Uncontrolled
<Checkbox label="Accept terms" defaultChecked />

// Controlled
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  label="Subscribe"
  checked={isChecked}
  onChange={(value) => setIsChecked(value)}
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
      description: 'Disables the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Label text displayed next to the checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
      description: 'Size of the checkbox',
      table: {
        type: { summary: '"small" | "medium"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when checkbox state changes',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <Checkbox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Default checkbox',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default unchecked checkbox.',
    },
  },
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small checkbox',
  size: 'small',
};
Small.parameters = {
  docs: {
    description: {
      story: 'Small size variant for compact UIs.',
    },
  },
};

export const Controlled: StoryFn<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      label="Controlled checkbox"
      onChange={(value) => setChecked(value)}
    />
  );
};
Controlled.parameters = {
  docs: {
    description: {
      story: 'Checkbox with external state management.',
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
      story: 'Checkbox with initial checked state.',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Disabled checkbox',
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
      story: 'Checked checkbox in disabled state.',
    },
  },
};

export const Grouped: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Checkbox label="Option A" defaultChecked />
    <Checkbox label="Option B" />
    <Checkbox label="Option C" disabled />
    <Checkbox label="Option D" defaultChecked disabled />
  </div>
);
Grouped.parameters = {
  docs: {
    description: {
      story: 'Group of checkboxes with different states.',
    },
  },
};
