import { Meta, StoryFn } from '@storybook/react';

import { MenuItem, type MenuItemProps } from './MenuItem';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component: `
A **MenuItem component** that can be either active or inactive, ideal for navigation lists or interactive menus.

---

### ✨ Features

- 🎯 **Interactive:** Supports keyboard navigation (Enter key).
- ♿ **Accessible:** Includes \`role="button"\` and \`aria-current="true"\` when active.
- 📝 **Flexible:** Can be used in lists, menus, or any collection of clickable items.
- ✨ **Active state:** Visually highlighted when selected, providing immediate feedback.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { MenuItem } from './MenuItem';

<MenuItem active onClick={() => alert('Clicked!')}>
  Home
</MenuItem>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: 'The content of the menu item (can be text or any React element).',
      control: { type: 'text' },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '""' },
      },
    },
    isActive: {
      description: 'Sets the menu item as active.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: 'Callback function called when the item is clicked or activated via keyboard.',
      action: 'clicked',
      table: {
        type: { summary: '(id?: string) => void' },
      },
    },
    id: {
      description: 'Unique identifier for the menu item.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    'data-qa': {
      description: 'Optional QA attribute for testing purposes.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof MenuItem>;

const Template: StoryFn<MenuItemProps> = (args) => <MenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Menu item label',
};

export const Active = Template.bind({});
Active.args = {
  children: 'Menu item label',
  isActive: true,
};

export const MenuList = () => (
  <ul>
    <MenuItem id="item-1" isActive={true} onClick={(id) => console.log('Clicked', id)}>
      Item 1
    </MenuItem>
    <MenuItem id="item-2" onClick={(id) => console.log('Clicked', id)}>
      Item 2
    </MenuItem>
    <MenuItem id="item-3" onClick={(id) => console.log('Clicked', id)}>
      Item 3
    </MenuItem>
  </ul>
);

MenuList.parameters = {
  docs: {
    description: {
      story: 'Example of a list of MenuItem components, with one active item.',
    },
  },
};
