import { useState } from 'react';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { Select, type SelectProps } from './Select';

const countryOptions = [
  { label: '🇪🇸 Spain', value: 'es' },
  { label: '🇫🇷 France', value: 'fr' },
  { label: '🇬🇧 United Kingdom', value: 'uk' },
  { label: '🇩🇪 Germany', value: 'de' },
  { label: '🇮🇹 Italy', value: 'it' },
  { label: '🇵🇹 Portugal', value: 'pt' },
];

const experienceOptions = [
  { label: 'No experience', value: '0' },
  { label: '1-2 years', value: '1-2' },
  { label: '3-5 years', value: '3-5' },
  { label: '5-10 years', value: '5-10' },
  { label: '10+ years', value: '10+' },
];

const jobTypeOptions = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
];

const categoryOptions = [
  { label: 'Technology', value: 'tech' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
      ],
    },
    docs: {
      description: {
        component: `
A **Select component** that provides a custom select dropdown with keyboard navigation and accessibility support.

---

### ✨ Features

- ♿ **Accessible:** Implements WAI-ARIA combobox pattern with proper roles and attributes.
- ⌨️ **Keyboard navigation:** Arrow keys, Enter, and Escape support for full keyboard control.
- 🎨 **Customizable:** Supports prefix and suffix icons for visual enhancement.
- 🚦 **States:** Error and disabled states with visual feedback.
- 🖱️ **Click outside:** Automatically closes dropdown when clicking outside.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { Select } from './Select';

const [value, setValue] = useState('');

<Select
  name="my-select"
  placeholder="Choose an option"
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Unique name for the select element',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Currently selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the select',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isError: {
      control: { type: 'text' },
      description: 'Error message (enables error state when set)',
      table: {
        type: { summary: 'string' },
      },
    },
    assistiveText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the select',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when selection changes',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '320px', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('');
    return <Select {...args} value={selected} onChange={(e) => setSelected(e.target.value)} />;
  },
  args: {
    placeholder: 'Select a country',
    options: countryOptions,
    name: 'country-select',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic select without icons.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('');
    return (
      <Select
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        prefix={<Icon name="location" />}
      />
    );
  },
  args: {
    placeholder: 'Select location',
    options: countryOptions,
    name: 'location-select',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a prefix icon to indicate the field type.',
      },
    },
  },
};

export const WithPrefixAndSuffix: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('');
    return (
      <Select
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        prefix={<Icon name="experience" />}
        suffix={<Icon name="info" />}
      />
    );
  },
  args: {
    placeholder: 'Years of experience',
    options: experienceOptions,
    name: 'experience-select',
    assistiveText: 'Share your professional experience',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with prefix and suffix icons plus helper text.',
      },
    },
  },
};

// ============================================================================
// STATE STORIES
// ============================================================================

export const WithAssistiveText: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('');
    return (
      <Select
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        prefix={<Icon name="work" />}
      />
    );
  },
  args: {
    placeholder: 'Job type',
    options: jobTypeOptions,
    name: 'job-type-select',
    assistiveText: 'Select your preferred employment type',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with descriptive helper text.',
      },
    },
  },
};

export const ErrorState: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('');
    return (
      <Select
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        prefix={<Icon name="studies" />}
      />
    );
  },
  args: {
    placeholder: 'Professional category',
    options: categoryOptions,
    isError: 'Required field',
    assistiveText: 'You must select a category to continue.',
    name: 'error-select',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select in error state with validation message.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled select',
    options: countryOptions,
    disabled: true,
    name: 'disabled-select',
    assistiveText: 'This field is currently unavailable.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled select with no interaction.',
      },
    },
  },
};

export const PreSelected: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('es');
    return (
      <Select
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        prefix={<Icon name="location" />}
      />
    );
  },
  args: {
    placeholder: 'Select a country',
    options: countryOptions,
    name: 'preselected-select',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a preselected value.',
      },
    },
  },
};

// ============================================================================
// SHOWCASE STORIES
// ============================================================================

const FormTemplate: StoryFn<SelectProps> = () => {
  const [country, setCountry] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '360px',
        padding: '32px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: '#1e293b',
          }}
        >
          Search preferences
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          Complete your profile to improve recommendations
        </p>
      </div>

      <Select
        name="form-country"
        placeholder="Preferred location"
        options={countryOptions}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        prefix={<Icon name="location" />}
        assistiveText="Where would you like to work?"
      />

      <Select
        name="form-experience"
        placeholder="Work experience"
        options={experienceOptions}
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        prefix={<Icon name="experience" />}
        assistiveText="Years of experience in your field"
      />

      <Select
        name="form-job-type"
        placeholder="Job type"
        options={jobTypeOptions}
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        prefix={<Icon name="work" />}
      />

      <Select
        name="form-category"
        placeholder="Professional field"
        options={categoryOptions}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        prefix={<Icon name="studies" />}
        isError={!category ? 'Required field' : undefined}
        assistiveText={!category ? 'Select your area of expertise' : ''}
      />
    </div>
  );
};

export const FormExample = FormTemplate.bind({});
FormExample.parameters = {
  docs: {
    description: {
      story: 'Example of a complete form with multiple styled selects.',
    },
  },
};

const StatesShowcaseTemplate: StoryFn<SelectProps> = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('es');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        width: '700px',
        padding: '32px',
        background: '#f8fafc',
        borderRadius: '16px',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
          }}
        >
          Default
        </p>
        <Select
          name="showcase-default"
          placeholder="Select an option"
          options={countryOptions}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          prefix={<Icon name="location" />}
        />
      </div>

      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
          }}
        >
          With value
        </p>
        <Select
          name="showcase-value"
          placeholder="Select an option"
          options={countryOptions}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          prefix={<Icon name="location" />}
        />
      </div>

      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
          }}
        >
          With helper text
        </p>
        <Select
          name="showcase-help"
          placeholder="Select an option"
          options={experienceOptions}
          value=""
          onChange={() => {}}
          prefix={<Icon name="experience" />}
          assistiveText="Indicate your experience level"
        />
      </div>

      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#ef4444',
          }}
        >
          Error
        </p>
        <Select
          name="showcase-error"
          placeholder="Select an option"
          options={jobTypeOptions}
          value=""
          onChange={() => {}}
          prefix={<Icon name="work" />}
          isError="Required field"
          assistiveText="You must select an option"
        />
      </div>

      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
          }}
        >
          Disabled
        </p>
        <Select
          name="showcase-disabled"
          placeholder="Not available"
          options={categoryOptions}
          value=""
          onChange={() => {}}
          prefix={<Icon name="studies" />}
          disabled
          assistiveText="This field is disabled"
        />
      </div>

      <div>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
          }}
        >
          No icon
        </p>
        <Select
          name="showcase-no-icon"
          placeholder="Simple select"
          options={countryOptions}
          value=""
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export const AllStates = StatesShowcaseTemplate.bind({});
AllStates.parameters = {
  docs: {
    description: {
      story: 'Overview of all possible Select component states.',
    },
  },
};
