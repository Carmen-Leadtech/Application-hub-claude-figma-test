import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { Card, type CardProps } from './Card';

export default {
  title: 'Cards/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Card component** that provides an interactive button-style card for list items with icons and actions.

---

### ✨ Features

- 🏷️ **Label:** Text label for the card item.
- 🎨 **Icon label:** Leading icon for visual context and identification.
- 🔧 **Action icons:** Trailing icons for actions (edit, delete, etc.).
- 🖱️ **Interactive:** Button semantics with click handler that receives card ID.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Card } from './Card';
import { Icon } from 'components/Icon/Icon';

<Card
  label="Personal Information"
  iconLabel={<Icon name="contact" />}
  iconActions={
    <>
      <Icon name="create" />
      <Icon name="delete" />
    </>
  }
  onClick={(id) => handleClick(id)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Card label text',
      table: {
        type: { summary: 'string' },
      },
    },
    iconLabel: {
      control: false,
      description: 'Leading icon element',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconActions: {
      control: false,
      description: 'Trailing action icons',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler receiving the card ID',
      table: {
        type: { summary: '(id?: string) => void' },
      },
    },
  },
} as Meta<typeof Card>;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Card label',
  iconLabel: <Icon name="info" />,
  iconActions: (
    <>
      <Icon name="create" />
      <Icon name="delete" />
    </>
  ),
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default card with icon and action buttons.',
    },
  },
};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
  label: 'Simple Card',
  iconLabel: <Icon name="experience" />,
};
WithoutActions.parameters = {
  docs: {
    description: {
      story: 'Card without action icons.',
    },
  },
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  label: 'Text Only Card',
  iconActions: <Icon name="create" />,
};
WithoutIcon.parameters = {
  docs: {
    description: {
      story: 'Card without leading icon.',
    },
  },
};

const CardListTemplate: StoryFn<CardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
    <Card
      iconLabel={<Icon name="info" />}
      iconActions={
        <>
          <Icon name="create" />
          <Icon name="delete" />
        </>
      }
      label="Contact Information"
      onClick={(id) => console.log('Clicked:', id)}
    />
    <Card
      iconLabel={<Icon name="experience" />}
      iconActions={
        <>
          <Icon name="create" />
          <Icon name="delete" />
        </>
      }
      label="Work Experience"
      onClick={(id) => console.log('Clicked:', id)}
    />
    <Card
      iconLabel={<Icon name="education" />}
      iconActions={
        <>
          <Icon name="create" />
          <Icon name="delete" />
        </>
      }
      label="Education"
      onClick={(id) => console.log('Clicked:', id)}
    />
    <Card
      iconLabel={<Icon name="studies" />}
      iconActions={
        <>
          <Icon name="create" />
          <Icon name="delete" />
        </>
      }
      label="Skills"
      onClick={(id) => console.log('Clicked:', id)}
    />
  </div>
);

export const CardList = CardListTemplate.bind({});
CardList.parameters = {
  docs: {
    description: {
      story: 'List of cards stacked vertically.',
    },
  },
};
