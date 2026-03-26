import { Meta, StoryFn } from '@storybook/react';

import { Chip, type ChipProps } from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Chip component** that provides an interactive chip with drag & drop support and inline editing capabilities.

---

### ✨ Features

- ✏️ **Inline editing:** Click to edit chip text when \`isEditable\` is enabled.
- 🔄 **Drag & drop:** Reorderable with dnd-kit integration for drag operations.
- ❌ **Deletable:** Optional close button for removing chips.
- 🎯 **Selectable:** Click to select when not in editable mode.
- 🖱️ **Dragging state:** Visual feedback during drag operations.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Chip } from './Chip';

// Basic chip
<Chip>Art Direction</Chip>

// Editable with close button
<Chip
  isEditable
  onClickClose={(id) => handleDelete(id)}
  onBlurLabel={(value) => handleSave(value)}
>
  Edit me
</Chip>

// With drag & drop
<Chip
  draggableProps={dragProps}
  isDragging={isDragging}
>
  Draggable
</Chip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Chip content text',
      table: {
        type: { summary: 'string' },
      },
    },
    isSelected: {
      control: { type: 'boolean' },
      description: 'Chip is currently selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isDragging: {
      control: { type: 'boolean' },
      description: 'Chip is being dragged',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isEditable: {
      control: { type: 'boolean' },
      description: 'Chip text can be edited inline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    draggableProps: {
      description: 'dnd-kit drag & drop configuration',
      table: {
        type: { summary: 'DraggableProps' },
      },
    },
    onBlurLabel: {
      action: 'blur',
      description: 'Callback when label loses focus',
      table: {
        type: { summary: '(value: string, id?: string) => void' },
      },
    },
    onChangeLabel: {
      action: 'change',
      description: 'Callback when label text changes',
      table: {
        type: { summary: '(value: string, id?: string) => void' },
      },
    },
    onClickClose: {
      action: 'close',
      description: 'Callback when close button is clicked',
      table: {
        type: { summary: '(id?: string) => void' },
      },
    },
    onClickSelectedChip: {
      action: 'select',
      description: 'Callback when chip is clicked (non-editable mode)',
      table: {
        type: { summary: '(id?: string) => void' },
      },
    },
  },
} as Meta<ChipProps>;

const Template: StoryFn<ChipProps> = (args) => <Chip {...args} />;

const DEFAULT_CHILDREN = 'Art direction';

export const Default = Template.bind({});
Default.args = {
  children: DEFAULT_CHILDREN,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Basic chip without any interaction.',
    },
  },
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  children: DEFAULT_CHILDREN,
  draggableProps: {},
  onClickClose: () => {},
};
WithIcons.parameters = {
  docs: {
    description: {
      story: 'Chip with drag handle and close button.',
    },
  },
};

export const Selected = Template.bind({});
Selected.args = {
  children: DEFAULT_CHILDREN,
  isSelected: true,
};
Selected.parameters = {
  docs: {
    description: {
      story: 'Chip in selected state.',
    },
  },
};

export const SelectedWithIcons = Template.bind({});
SelectedWithIcons.args = {
  children: DEFAULT_CHILDREN,
  draggableProps: {},
  isSelected: true,
  onClickClose: () => {},
};
SelectedWithIcons.parameters = {
  docs: {
    description: {
      story: 'Selected chip with drag handle and close button.',
    },
  },
};

export const Editable = Template.bind({});
Editable.args = {
  children: DEFAULT_CHILDREN,
  isEditable: true,
};
Editable.parameters = {
  docs: {
    description: {
      story: 'Chip with inline editing enabled. Click to edit.',
    },
  },
};

export const EditableWithIcons = Template.bind({});
EditableWithIcons.args = {
  children: DEFAULT_CHILDREN,
  draggableProps: {},
  isEditable: true,
  onClickClose: () => {},
};
EditableWithIcons.parameters = {
  docs: {
    description: {
      story: 'Editable chip with drag handle and close button.',
    },
  },
};

export const Dragging = Template.bind({});
Dragging.args = {
  children: DEFAULT_CHILDREN,
  draggableProps: {},
  isDragging: true,
  isEditable: true,
  onClickClose: () => {},
};
Dragging.parameters = {
  docs: {
    description: {
      story: 'Chip in dragging state with visual feedback.',
    },
  },
};

const AllStatesTemplate: StoryFn<ChipProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip>Default</Chip>
      <Chip isSelected>Selected</Chip>
      <Chip isDragging draggableProps={{}}>
        Dragging
      </Chip>
    </div>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip isEditable>Editable</Chip>
      <Chip draggableProps={{}} onClickClose={() => {}}>
        With Icons
      </Chip>
    </div>
  </div>
);

export const AllStates = AllStatesTemplate.bind({});
AllStates.parameters = {
  docs: {
    description: {
      story: 'Comparison of all chip states.',
    },
  },
};
