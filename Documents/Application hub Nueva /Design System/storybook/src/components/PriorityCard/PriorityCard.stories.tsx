import { Meta, StoryFn } from '@storybook/react';

import { PriorityCard, type PriorityCardProps } from './PriorityCard';

export default {
  title: 'Cards/PriorityCard',
  component: PriorityCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **PriorityCard component** for displaying actionable improvement suggestions with visual indicators.

---

### ✨ Features

- 🎯 **Visual indicator:** Target icon to highlight actionable items.
- 🏷️ **Category tag:** Displays the suggestion category (e.g., HEADLINE, ABOUT).
- 📝 **Description:** Clear text explaining what to improve.
- 🔘 **Action button:** "Fix" button with active/inactive states.
- ♿ **Accessible:** Proper button semantics and keyboard support.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { PriorityCard } from './PriorityCard';

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
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    category: {
      control: { type: 'text' },
      description: 'Category tag text displayed above the description',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description text explaining the suggestion',
      table: {
        type: { summary: 'string' },
      },
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'If true, the Fix button is in active/selected state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonLabel: {
      control: { type: 'text' },
      description: 'Label for the action button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Fix"' },
      },
    },
    onClickFix: {
      action: 'clicked',
      description: 'Callback fired when the Fix button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    isMobile: {
      control: { type: 'boolean' },
      description: 'If true, renders mobile-optimized view',
      table: {
        type: { summary: 'boolean' },
      },
    },
    badgeIconName: {
      control: { type: 'text' },
      description: 'Icon name for the badge (default: "format_align_left")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"format_align_left"' },
      },
    },
  },
} as Meta<typeof PriorityCard>;

const Template: StoryFn<PriorityCardProps> = (args) => <PriorityCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  buttonLabel: 'Fix',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default priority card with inactive Fix button.',
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  isActive: true,
  buttonLabel: 'Fix',
};
Active.parameters = {
  docs: {
    description: {
      story: 'Priority card with active/selected Fix button.',
    },
  },
};

export const About = Template.bind({});
About.args = {
  category: 'ABOUT',
  description: 'Add a detailed About section with achievements and relevant keywords.',
  buttonLabel: 'Fix',
};
About.parameters = {
  docs: {
    description: {
      story: 'Suggestion for the About section.',
    },
  },
};

export const Education = Template.bind({});
Education.args = {
  category: 'EDUCATION',
  description: 'Improve education details with relevance and achievements.',
  buttonLabel: 'Fix',
};
Education.parameters = {
  docs: {
    description: {
      story: 'Suggestion for the Education section.',
    },
  },
};

const MultipleCardsTemplate: StoryFn<PriorityCardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
    <PriorityCard
      category="ABOUT"
      description="Add a detailed About section with achievements and relevant keywords."
      buttonLabel="Fix"
    />
    <PriorityCard
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      isActive
      buttonLabel="Fix"
    />
    <PriorityCard
      category="EDUCATION"
      description="Improve education details with relevance and achievements."
      buttonLabel="Fix"
    />
  </div>
);

export const MultipleCards = MultipleCardsTemplate.bind({});
MultipleCards.parameters = {
  docs: {
    description: {
      story: 'Multiple priority cards stacked vertically.',
    },
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  buttonLabel: 'Fix',
  isMobile: true,
};
Mobile.parameters = {
  docs: {
    description: {
      story: 'Priority card with mobile-optimized layout.',
    },
  },
};

export const LongButtonLabel = Template.bind({});
LongButtonLabel.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  buttonLabel: 'Fix with AI',
};
LongButtonLabel.parameters = {
  docs: {
    description: {
      story: 'Priority card with a longer button label.',
    },
  },
};

export const MobileLongButtonLabel = Template.bind({});
MobileLongButtonLabel.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  buttonLabel: 'Fix with AI',
  isMobile: true,
};
MobileLongButtonLabel.parameters = {
  docs: {
    description: {
      story: 'Mobile priority card with a longer button label.',
    },
  },
};

export const CustomBadgeIcon = Template.bind({});
CustomBadgeIcon.args = {
  category: 'HEADLINE',
  description: 'Enhance headline with clear role, keywords, and value proposition.',
  buttonLabel: 'Fix',
  badgeIconName: 'title',
};
CustomBadgeIcon.parameters = {
  docs: {
    description: {
      story:
        'Priority card with a custom badge icon (e.g. "title" instead of default "format_align_left").',
    },
  },
};
