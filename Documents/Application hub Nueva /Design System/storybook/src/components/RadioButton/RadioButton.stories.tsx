import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { RadioButton, type RadioButtonProps } from './RadioButton';

export default {
  title: 'Forms/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **RadioButton component** for selecting a single option from a set of mutually exclusive options.

---

### ✨ Features

- ♿ **Accessible:** Proper roles and states for screen readers and assistive technologies.
- 🎯 **Keyboard support:** Can be selected using keyboard (Tab, Arrow keys, Space, Enter).
- 📦 **Group awareness:** Can be grouped by \`name\` prop for mutual exclusivity (only one option at a time).
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { RadioButton } from './RadioButton';

const [selectedValue, setSelectedValue] = useState('');

<RadioButton
  name="favoriteColor"
  value="blue"
  label="Blue"
  isChecked={selectedValue === "blue"}
  handleRadioChange={(v) => setSelectedValue(v)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    handleRadioChange: { action: 'radio changed' },
    handleLabelClick: { action: 'label clicked' },
    handleLabelKeyDown: { action: 'label key down' },
  },
} as Meta<typeof RadioButton>;

const Template: StoryFn<RadioButtonProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <RadioButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: 'radio-default',
  value: 'option1',
  name: 'input_name',
  label: 'Default option',
  handleRadioChange: (value: string) => console.log('Changed to:', value),
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default state. Once is selected, it cannot be deselected.',
    },
  },
};

export const Selected = Template.bind({});
Selected.args = {
  id: 'radio-selected',
  value: 'option1',
  isChecked: true,
  name: 'input_name',
  label: 'Selected option',
  handleRadioChange: (value: string) => console.log('Changed to:', value),
};
Selected.parameters = {
  docs: {
    description: {
      story: 'Once is selected, it cannot be deselected.',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'radio-selected',
  value: 'option1',
  disabled: true,
  name: 'input_name',
  label: 'Selected option',
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled state.',
    },
  },
};

export const CheckedAndDisabled = Template.bind({});
CheckedAndDisabled.args = {
  id: 'radio-selected',
  value: 'option1',
  disabled: true,
  isChecked: true,
  name: 'input_name',
  label: 'Selected option',
};
CheckedAndDisabled.parameters = {
  docs: {
    description: {
      story: 'Disabled and checked state.',
    },
  },
};

export const Grouped: StoryFn<RadioButtonProps> = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>('option1');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    console.log('Changed to:', value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RadioButton
        id="radio-group-option1"
        value="option1"
        name="radio-group"
        label="Option 1"
        size="M"
        isChecked={selectedValue === 'option1'}
        handleRadioChange={handleRadioChange}
      />
      <RadioButton
        id="radio-group-option2"
        value="option2"
        name="radio-group"
        label="Option 2"
        size="M"
        isChecked={selectedValue === 'option2'}
        handleRadioChange={handleRadioChange}
      />
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story:
        'One option at a time. Both buttons share the same `name` attribute and use shared state management.',
    },
  },
};
