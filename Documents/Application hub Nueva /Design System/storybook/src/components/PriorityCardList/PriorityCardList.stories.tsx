import { Meta, StoryFn } from '@storybook/react';

import { PriorityCard } from 'components/PriorityCard/PriorityCard';

import { PriorityCardList, type PriorityCardListProps } from './PriorityCardList';

export default {
  title: 'Cards/PriorityCardList',
  component: PriorityCardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **PriorityCardList component** that provides a container for displaying multiple \`PriorityCard\` components in a list with proper borders and spacing.

---

### ✨ Features

- 📦 **Container:** Wraps multiple \`PriorityCard\` components.
- 🔲 **Borders:** Applies border around the container and separators between cards.
- 🎯 **Composable:** Works with multiple \`<PriorityCard />\` children.
- 🧪 **Test-friendly:** \`data-qa\` attribute support.

---

### ⚙️ Usage Example

\`\`\`tsx
import { PriorityCardList } from './PriorityCardList';
import { PriorityCard } from 'components/PriorityCard/PriorityCard';

<PriorityCardList>
  <PriorityCard
    category="HEADLINE"
    description="Enhance headline with clear role, keywords, and value proposition."
    onClickFix={() => handleFix()}
  />
  <PriorityCard
    category="ABOUT"
    description="Add a detailed About section with achievements."
    isActive={true}
    onClickFix={() => handleFix()}
  />
</PriorityCardList>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Array of `<PriorityCard />` components to display',
      table: {
        type: { summary: 'ReactElement<PriorityCardProps>[]' },
      },
    },
    isMobile: {
      control: { type: 'boolean' },
      description: 'If true, renders mobile-optimized view',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
} as Meta<typeof PriorityCardList>;

const Template: StoryFn<PriorityCardListProps> = (args) => <PriorityCardList {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: [
    <PriorityCard
      key="1"
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      buttonLabel="Fix"
      onClickFix={() => console.log('Fix clicked!')}
    />,
  ],
};
Default.parameters = {
  docs: {
    description: {
      story: 'Single priority card within a list container.',
    },
  },
};

export const MultipleCards = Template.bind({});
MultipleCards.args = {
  children: [
    <PriorityCard
      key="1"
      category="ABOUT"
      description="Add a detailed About section with achievements and relevant keywords."
      buttonLabel="Fix"
      onClickFix={() => console.log('About fix clicked!')}
    />,
    <PriorityCard
      key="2"
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      buttonLabel="Fix"
      isActive
      onClickFix={() => console.log('Headline fix clicked!')}
    />,
    <PriorityCard
      key="3"
      category="EDUCATION"
      description="Improve education details with relevance and achievements."
      buttonLabel="Fix"
      onClickFix={() => console.log('Education fix clicked!')}
    />,
  ],
};
MultipleCards.parameters = {
  docs: {
    description: {
      story:
        'Multiple priority cards with borders and separators. The last card has no bottom border.',
    },
  },
};

export const WithActiveCard = Template.bind({});
WithActiveCard.args = {
  children: [
    <PriorityCard
      key="1"
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      buttonLabel="Fix"
      isActive
      onClickFix={() => console.log('Fix clicked!')}
    />,
    <PriorityCard
      key="2"
      category="ABOUT"
      description="Add a detailed About section with achievements and relevant keywords."
      buttonLabel="Fix"
      onClickFix={() => console.log('Fix clicked!')}
    />,
  ],
};
WithActiveCard.parameters = {
  docs: {
    description: {
      story: 'List with an active priority card (orange Fix button).',
    },
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  isMobile: true,
  children: [
    <PriorityCard
      key="1"
      category="ABOUT"
      description="Add a detailed About section with achievements and relevant keywords."
      buttonLabel="Fix"
      onClickFix={() => console.log('About fix clicked!')}
    />,
    <PriorityCard
      key="2"
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      buttonLabel="Fix"
      isActive
      onClickFix={() => console.log('Headline fix clicked!')}
    />,
    <PriorityCard
      key="3"
      category="EDUCATION"
      description="Improve education details with relevance and achievements."
      buttonLabel="Fix"
      onClickFix={() => console.log('Education fix clicked!')}
    />,
  ],
};
Mobile.parameters = {
  docs: {
    description: {
      story: 'Mobile-optimized list with border-bottom separators (except last card).',
    },
  },
};
