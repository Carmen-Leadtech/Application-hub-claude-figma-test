import { Meta, StoryFn } from '@storybook/react';

import { ScoreTag } from 'components/ScoreTag/ScoreTag';

import { ContentHeader, type ContentHeaderProps } from './ContentHeader';

export default {
  title: 'Layout/ContentHeader',
  component: ContentHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **ContentHeader component** that provides a consistent header section for content areas with optional progress tracking.

---

### ✨ Features

- 📝 **Title:** Customizable heading text for the content section.
- 🎨 **Icon:** Leading icon for visual context and identification.
- 📊 **Progress bar:** Optional progress tracking with completed/total sections.
- 🧩 **Flexible:** Can be used with or without progress indication.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ContentHeader } from './ContentHeader';

<ContentHeader
  title="Profile Overview"
  iconName="assessment"
  suffix={<span>2/5</span>}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title of the content header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Overview' },
      },
    },
    iconName: {
      control: { type: 'text' },
      description: 'Icon name to display in the top-left corner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'assessment' },
      },
    },
    suffix: {
      control: { type: 'text' },
      description: 'Suffix to display in the top-right corner',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '<span>2/5</span>' },
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
} as Meta<typeof ContentHeader>;

const Template: StoryFn<ContentHeaderProps> = (args) => <ContentHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Overview',
  iconName: 'badge_body_text',
  suffix: <ScoreTag progress={2} total={5} />,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default content header with progress bar showing 2 of 5 sections completed.',
    },
  },
};

export const WithoutProgress = Template.bind({});
WithoutProgress.args = {
  title: 'Profile Information',
  iconName: 'badge_body_text',
};
WithoutProgress.parameters = {
  docs: {
    description: {
      story: 'Content header without progress bar.',
    },
  },
};
