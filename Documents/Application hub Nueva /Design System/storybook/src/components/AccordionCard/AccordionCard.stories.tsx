import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { AccordionCard, type AccordionCardProps } from './AccordionCard';

export default {
  title: 'Cards/AccordionCard',
  component: AccordionCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An **AccordionCard component** that provides an expandable section header with icons and actions.

---

### ✨ Features

- 🏷️ **Label:** Text label for the accordion section.
- 🎨 **Icon label:** Leading icon for visual context and identification.
- 🔧 **Action icons:** Trailing icons for actions (edit, delete, etc.).
- 🖱️ **Interactive:** Click handler for expand/collapse functionality.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { AccordionCard } from './AccordionCard';
import { Icon } from 'components/Icon/Icon';

<AccordionCard
  label="Work Experience"
  iconLabel={<Icon name="experience" />}
  iconActions={
    <>
      <Icon name="create" />
      <Icon name="delete" />
    </>
  }
  onClick={(id) => toggleSection(id)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Section label text',
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
} as Meta<typeof AccordionCard>;

const Template: StoryFn<AccordionCardProps> = (args) => <AccordionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconActions: (
    <>
      <Icon name="create" />
      <Icon name="delete" />
    </>
  ),
  iconLabel: <Icon name="info" />,
  label: 'Accordion sub section label',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default accordion card with icon and action buttons.',
    },
  },
};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
  iconLabel: <Icon name="experience" />,
  label: 'Work Experience',
};
WithoutActions.parameters = {
  docs: {
    description: {
      story: 'Accordion card without action icons.',
    },
  },
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  iconActions: <Icon name="create" />,
  label: 'Simple Section',
};
WithoutIcon.parameters = {
  docs: {
    description: {
      story: 'Accordion card without leading icon.',
    },
  },
};

const MultipleCardsTemplate: StoryFn<AccordionCardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
    <AccordionCard
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
    <AccordionCard
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
    <AccordionCard
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
  </div>
);

export const MultipleCards = MultipleCardsTemplate.bind({});
MultipleCards.parameters = {
  docs: {
    description: {
      story: 'Multiple accordion cards stacked vertically.',
    },
  },
};
