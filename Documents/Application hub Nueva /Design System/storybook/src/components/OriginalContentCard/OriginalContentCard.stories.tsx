import { Meta, StoryFn } from '@storybook/react';

import { OriginalContentCard, type OriginalContentCardProps } from './OriginalContentCard';

export default {
  title: 'Cards/OriginalContentCard',
  component: OriginalContentCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **OriginalContentCard component** that displays the user's original content in paragraphs, or shows an empty state when no content exists.

---

### ✨ Features

- 📝 **Paragraphs:** Displays content as text paragraphs.
- 🎨 **Empty State:** Shows illustration and message when no content exists.
- 📱 **Responsive:** Works on desktop and mobile layouts.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { OriginalContentCard } from './OriginalContentCard';

// With content
<OriginalContentCard
  items={[
    "First paragraph of content.",
    "Second paragraph of content.",
    "Third paragraph of content."
  ]}
  data-qa="original-content"
/>

// Empty state
<OriginalContentCard
  items={[]}
  data-qa="original-content"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of text paragraphs to display. Empty array shows empty state.',
      table: {
        type: { summary: 'string[]' },
      },
    },
    emptyTitle: {
      control: { type: 'text' },
      description: 'Empty state title text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Your section is empty' },
      },
    },
    emptyDescription: {
      control: { type: 'text' },
      description: 'Empty state description text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Use the suggested content to edit and complete your profile' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof OriginalContentCard>;

const Template: StoryFn<OriginalContentCardProps> = (args) => <OriginalContentCard {...args} />;

export const WithContent = Template.bind({});
WithContent.args = {
  items: [
    'Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus ante, fermentum id leo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus ante, fermentum id leo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus ante, fermentum id leo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ],
};
WithContent.parameters = {
  docs: {
    description: {
      story: 'OriginalContentCard displaying multiple paragraphs of content.',
    },
  },
};

export const SingleParagraph = Template.bind({});
SingleParagraph.args = {
  items: ['This is a single paragraph of content that the user has in their profile section.'],
};
SingleParagraph.parameters = {
  docs: {
    description: {
      story: 'OriginalContentCard with a single paragraph.',
    },
  },
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  items: [],
};
EmptyState.parameters = {
  docs: {
    description: {
      story: 'Empty state shown when no content exists, with illustration and helpful message.',
    },
  },
};

export const CustomEmptyState = Template.bind({});
CustomEmptyState.args = {
  items: [],
  emptyTitle: 'No content yet',
  emptyDescription: 'Start by adding content to this section',
};
CustomEmptyState.parameters = {
  docs: {
    description: {
      story: 'Empty state with custom title and description.',
    },
  },
};

export const ShortContent = Template.bind({});
ShortContent.args = {
  items: ['Short first paragraph.', 'Another brief paragraph.'],
};
ShortContent.parameters = {
  docs: {
    description: {
      story: 'OriginalContentCard with shorter content paragraphs.',
    },
  },
};

const ComparisonTemplate: StoryFn<OriginalContentCardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>With Content</h3>
      <OriginalContentCard
        items={[
          'First paragraph with original content from the user profile.',
          "Second paragraph continuing the user's original content.",
          'Third paragraph with additional information.',
        ]}
      />
    </div>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Empty State</h3>
      <OriginalContentCard items={[]} />
    </div>
  </div>
);

export const Comparison = ComparisonTemplate.bind({});
Comparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of content state and empty state.',
    },
  },
};
