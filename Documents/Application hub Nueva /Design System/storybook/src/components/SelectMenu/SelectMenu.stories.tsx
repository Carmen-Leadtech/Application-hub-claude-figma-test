import { useRef, useState } from 'react';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { SelectMenu, type SelectMenuProps } from './SelectMenu';

const countryOptions = [
  { label: '🇪🇸 Spain', value: 'es' },
  { label: '🇫🇷 France', value: 'fr' },
  { label: '🇬🇧 United Kingdom', value: 'uk' },
  { label: '🇩🇪 Germany', value: 'de' },
  { label: '🇮🇹 Italy', value: 'it' },
];

const roleOptions = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Full Stack Developer', value: 'fullstack' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'UX/UI Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Data Scientist', value: 'data' },
];

const statusOptions = [
  { label: '🟢 Active', value: 'active' },
  { label: '🟡 Pending', value: 'pending' },
  { label: '🔴 Inactive', value: 'inactive' },
  { label: '🔵 In review', value: 'review' },
];

const meta: Meta<typeof SelectMenu> = {
  title: 'Forms/SelectMenu',
  component: SelectMenu,
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
A **SelectMenu component** that provides a dropdown menu used internally by the Select component.

---

### ✨ Features

- ♿ **Accessible:** Implements WAI-ARIA listbox pattern with proper roles and attributes.
- ⌨️ **Keyboard navigation:** Arrow Up/Down, Enter, and Escape support.
- 🎯 **Selection state:** Visual indicator for selected option.
- 🔗 **Composable:** Designed to work with Select component.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useRef } from 'react';
import { SelectMenu } from './SelectMenu';

const optionRef = useRef<HTMLLIElement>(null);
const parentRef = useRef<HTMLDivElement>(null);

<SelectMenu
  name="my-menu"
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
  value={selectedValue}
  onChange={(option) => handleSelect(option)}
  onClose={() => setOpen(false)}
  optionRef={optionRef}
  parentRef={parentRef}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    name: {
      description: 'Unique name used for ARIA IDs',
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      description: 'Array of options to display',
      table: {
        type: { summary: '{ label: string; value: string }[]' },
      },
    },
    value: {
      description: 'Currently selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback when an option is selected',
      table: {
        type: { summary: '(option: Option) => void' },
      },
    },
    onClose: {
      description: 'Callback when menu should close',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '280px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SelectMenu>;

// Wrapper with relative positioning so the menu is positioned correctly
const MenuWrapper = ({
  children,
  label,
  selectedLabel,
}: {
  children: React.ReactNode;
  label: string;
  selectedLabel?: string;
}) => (
  <div
    style={{
      position: 'relative',
      width: '280px',
    }}
  >
    <div
      style={{
        padding: '12px 16px',
        background: '#f1f5f9',
        borderRadius: '8px',
        marginBottom: '4px',
      }}
    >
      <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>
        {label}
      </span>
      <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
        {selectedLabel || 'None selected'}
      </p>
    </div>
    {children}
  </div>
);

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  render: () => {
    const optionRef = useRef<(HTMLLIElement | null)[]>([]);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<string | undefined>('');

    const handleChange = (option: { label: string; value: string }) => {
      setSelected(option.value);
    };

    const selectedOption = countryOptions.find((o) => o.value === selected);

    return (
      <MenuWrapper label="Country" selectedLabel={selectedOption?.label}>
        <div ref={parentRef} style={{ position: 'relative' }}>
          <SelectMenu
            options={countryOptions}
            onChange={handleChange}
            onClose={() => console.log('Menu closed')}
            value={selected}
            name="default-menu"
            optionRef={optionRef}
            parentRef={parentRef}
          />
        </div>
      </MenuWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic SelectMenu with country options.',
      },
    },
  },
};

export const WithPreselection: Story = {
  render: () => {
    const optionRef = useRef<(HTMLLIElement | null)[]>([]);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<string>('fullstack');

    const handleChange = (option: { label: string; value: string }) => {
      setSelected(option.value);
    };

    const selectedOption = roleOptions.find((o) => o.value === selected);

    return (
      <MenuWrapper label="Role" selectedLabel={selectedOption?.label}>
        <div ref={parentRef} style={{ position: 'relative' }}>
          <SelectMenu
            options={roleOptions}
            onChange={handleChange}
            onClose={() => {}}
            value={selected}
            name="preselected-menu"
            optionRef={optionRef}
            parentRef={parentRef}
          />
        </div>
      </MenuWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SelectMenu with a preselected option.',
      },
    },
  },
};

export const StatusOptions: Story = {
  render: () => {
    const optionRef = useRef<(HTMLLIElement | null)[]>([]);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<string>('active');

    const handleChange = (option: { label: string; value: string }) => {
      setSelected(option.value);
    };

    const selectedOption = statusOptions.find((o) => o.value === selected);

    return (
      <MenuWrapper label="Current status" selectedLabel={selectedOption?.label}>
        <div ref={parentRef} style={{ position: 'relative' }}>
          <SelectMenu
            options={statusOptions}
            onChange={handleChange}
            onClose={() => {}}
            value={selected}
            name="status-menu"
            optionRef={optionRef}
            parentRef={parentRef}
          />
        </div>
      </MenuWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SelectMenu with visual status indicators.',
      },
    },
  },
};

export const LongList: Story = {
  render: () => {
    const optionRef = useRef<(HTMLLIElement | null)[]>([]);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<string>('');

    const manyOptions = [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'py' },
      { label: 'Java', value: 'java' },
      { label: 'C#', value: 'csharp' },
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' },
      { label: 'Ruby', value: 'ruby' },
      { label: 'PHP', value: 'php' },
      { label: 'Swift', value: 'swift' },
      { label: 'Kotlin', value: 'kotlin' },
      { label: 'Scala', value: 'scala' },
    ];

    const handleChange = (option: { label: string; value: string }) => {
      setSelected(option.value);
    };

    const selectedOption = manyOptions.find((o) => o.value === selected);

    return (
      <MenuWrapper label="Favorite language" selectedLabel={selectedOption?.label}>
        <div ref={parentRef} style={{ position: 'relative' }}>
          <SelectMenu
            options={manyOptions}
            onChange={handleChange}
            onClose={() => {}}
            value={selected}
            name="long-menu"
            optionRef={optionRef}
            parentRef={parentRef}
          />
        </div>
      </MenuWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SelectMenu with a long list of options showcasing scroll behavior.',
      },
    },
  },
};

// ============================================================================
// SHOWCASE STORIES
// ============================================================================

const ShowcaseTemplate: StoryFn<SelectMenuProps> = () => {
  const optionRef1 = useRef<(HTMLLIElement | null)[]>([]);
  const parentRef1 = useRef<HTMLDivElement | null>(null);
  const optionRef2 = useRef<(HTMLLIElement | null)[]>([]);
  const parentRef2 = useRef<HTMLDivElement | null>(null);
  const optionRef3 = useRef<(HTMLLIElement | null)[]>([]);
  const parentRef3 = useRef<HTMLDivElement | null>(null);

  const [selected1, setSelected1] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('frontend');
  const [selected3, setSelected3] = useState<string>('active');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        width: '900px',
        padding: '32px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
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
          No selection
        </p>
        <div ref={parentRef1} style={{ position: 'relative' }}>
          <SelectMenu
            options={countryOptions}
            onChange={(opt) => setSelected1(opt.value)}
            onClose={() => {}}
            value={selected1}
            name="showcase-empty"
            optionRef={optionRef1}
            parentRef={parentRef1}
          />
        </div>
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
          With selection
        </p>
        <div ref={parentRef2} style={{ position: 'relative' }}>
          <SelectMenu
            options={roleOptions}
            onChange={(opt) => setSelected2(opt.value)}
            onClose={() => {}}
            value={selected2}
            name="showcase-selected"
            optionRef={optionRef2}
            parentRef={parentRef2}
          />
        </div>
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
          Status
        </p>
        <div ref={parentRef3} style={{ position: 'relative' }}>
          <SelectMenu
            options={statusOptions}
            onChange={(opt) => setSelected3(opt.value)}
            onClose={() => {}}
            value={selected3}
            name="showcase-status"
            optionRef={optionRef3}
            parentRef={parentRef3}
          />
        </div>
      </div>
    </div>
  );
};

export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  docs: {
    description: {
      story: 'Comparative view of different SelectMenu configurations.',
    },
  },
};
