import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { MenuItemBlock } from './MenuItemBlock';

const meta: Meta<typeof MenuItemBlock> = {
  title: 'Components/MenuItemBlock',
  component: MenuItemBlock,
  parameters: {
    docs: {
      description: {
        component: `
A **MenuItemBlock component** that provides a menu item with section information, scores, and multiple interaction states.

---

### ✨ Features

- 🎯 **States:** Default and active states with visual feedback. Hover is handled via CSS.
- 🎨 **Icon support:** Custom icon or icon name for visual identification.
- 🎨 **Custom content:** Fully customizable end content area with any React elements.
- 🖱️ **Interactive:** Click handler and keyboard navigation support.
- 🎨 **Visual indicators:** Left bar and blue icon for active state.
- ♿ **Accessible:** Proper ARIA attributes and keyboard support.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { MenuItemBlock } from './MenuItemBlock';

<MenuItemBlock
  sectionName="Work Experience"
  iconName="experience"
  endContent={<span>Custom Content</span>}
  isActive={true}
  onClick={(id) => console.log('Clicked:', id)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    sectionName: {
      control: { type: 'text' },
      description: 'Section name to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Section name"' },
      },
    },
    iconName: {
      control: { type: 'text' },
      description: 'Icon name for the section',
      table: {
        type: { summary: 'string' },
      },
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'Whether the menu item is active/selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the item is clicked',
      table: {
        type: { summary: '(id?: string) => void' },
      },
    },
    endContent: {
      control: false,
      description: 'Custom content to render in the right side of the menu item',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItemBlock>;

export const Default: Story = {
  args: {
    sectionName: 'Section name',
    iconName: 'circle_chart',
    isActive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state of the menu item block. Hover effect is handled via CSS.',
      },
    },
  },
};

export const Active: Story = {
  args: {
    sectionName: 'Section name',
    iconName: 'circle_chart',
    isActive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Active state with blue left bar, highlighted background, and blue icon.',
      },
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    sectionName: 'Custom Section',
    icon: <Icon name="magic" size={20} />,
    isActive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu item with custom icon element instead of iconName.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '346px' }}>
      <MenuItemBlock sectionName="Section name" iconName="circle_chart" isActive={false} />
      <MenuItemBlock sectionName="Section name" iconName="circle_chart" isActive={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of default and active states. Hover effect is handled via CSS.',
      },
    },
  },
};

export const WithCustomEndContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '346px', gap: '8px' }}>
      <MenuItemBlock
        sectionName="With Icons"
        iconName="circle_chart"
        endContent={
          <>
            <Icon name="star" size={24} />
            <span
              style={{
                padding: '4px 8px',
                background: '#e3f2fd',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Custom
            </span>
          </>
        }
        isActive={false}
      />
      <MenuItemBlock
        sectionName="Single Icon"
        iconName="circle_chart"
        endContent={<Icon name="check_circle" size={24} color="#4caf50" />}
        isActive={false}
      />
      <MenuItemBlock
        sectionName="Custom Badge"
        iconName="circle_chart"
        endContent={
          <span
            style={{
              padding: '4px 8px',
              background: '#fff3e0',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            NEW
          </span>
        }
        isActive={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Menu items with custom content in the right side. You can pass any React element(s) to customize the end content area.',
      },
    },
  },
};
