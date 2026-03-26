import { Meta, StoryFn } from '@storybook/react';

import { Button } from 'components/Button/Button';
import { Icon } from 'components/Icon/Icon';

import { SuggestionCard, type SuggestionCardProps } from './SuggestionCard';

export default {
  title: 'Cards/SuggestionCard',
  component: SuggestionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **SuggestionCard component** for displaying copiable suggestion content with a badge and bulleted list.

---

### ✨ Features

- 🏷️ **Badge:** Displays a badge with icon and text at the top.
- 📝 **Bulleted List:** Displays multiple text items as a bulleted list.
- 📋 **Copy Button:** Button to copy all list items to clipboard.
- 📱 **Responsive:** Automatically adapts to different screen sizes.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { SuggestionCard } from './SuggestionCard';

<SuggestionCard
  badgeText="Suggestion 1 (recommended)"
  items={[
    "Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Maecenas tellus ante, fermentum id leo quis, pellentesque dapibus lectus.",
    "Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio."
  ]}
  onCopy={() => console.log('Copied!')}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    badgeText: {
      control: { type: 'text' },
      description: 'Badge text displayed at the top',
      table: {
        type: { summary: 'string' },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'Array of text items to display as a bulleted list',
      table: {
        type: { summary: 'string[]' },
      },
    },
    suffix: {
      control: { type: 'object' },
      description: 'Suffix content (icon, title, labels, or any ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} as Meta<typeof SuggestionCard>;

const Template: StoryFn<SuggestionCardProps> = (args) => <SuggestionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  badgeText: 'Suggestion 1 (recommended)',
  items: ['Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
  suffix: (
    <Button
      variant="tool"
      size="S"
      onClick={() => {
        console.log('copy all');
      }}
    >
      <Icon name="copy" size={16} />
      <span>Copy</span>
    </Button>
  ),
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default suggestion content card with badge, bulleted list, and copy button.',
    },
  },
};

export const CopyBullets = Template.bind({});
CopyBullets.args = {
  badgeText: 'Suggestion 1',
  items: ['Item 1', 'Item 2', 'Item 3'],
  showBullets: true,
  suffix: (
    <Button
      variant="tool"
      size="S"
      onClick={() => {
        console.log('copy all');
      }}
    >
      <Icon name="copy" size={16} />
      <span>Copy</span>
    </Button>
  ),
};

CopyBullets.parameters = {
  docs: {
    description: {
      story: 'Card with a list of items and copy bullets.',
    },
  },
};

export const NoSuffix: StoryFn<SuggestionCardProps> = (args) => (
  <SuggestionCard {...args} badgeText="Suggestion 1" items={['Item 1', 'Item 2', 'Item 3']} />
);
