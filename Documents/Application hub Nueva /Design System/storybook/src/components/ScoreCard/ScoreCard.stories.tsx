import { Meta, StoryFn } from '@storybook/react';

import { ScoreCard, type ScoreCardProps } from './ScoreCard';

export default {
  title: 'Score/ScoreCard',
  component: ScoreCard,
  parameters: {
    docs: {
      description: {
        component: `
A **ScoreCard component** that displays progress information with an icon, headline, and progress bar.

---

### ✨ Features

- 🎨 **Visual progress:** Shows progress with a colored progress bar and score tag.
- 📊 **Icon support:** Displays an icon in the top-left corner.
- 🏷️ **Score tag:** Shows progress ratio (e.g., "1/3") in the top-right corner.
- 📝 **Headline:** Centered title text for the card.
- 📏 **Progress bar:** Visual progress indicator at the bottom.
- 👆 **Clickable:** Optionally renders as a button when \`onClick\` is provided.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ScoreCard } from './ScoreCard';

<ScoreCard headline="Headline" progress={1} total={3} />
<ScoreCard headline="Complete Section" progress={3} total={3} iconName="circle_chart" />
<ScoreCard headline="Getting Started" progress={0} total={5} />
<ScoreCard headline="Clickable Card" progress={2} total={3} onClick={() => console.log('clicked')} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    headline: {
      control: { type: 'text' },
      description: 'Main title text displayed in the center',
    },
    progress: {
      control: { type: 'number' },
      description: 'Number of completed sections',
    },
    total: {
      control: { type: 'number' },
      description: 'Total number of sections',
    },
    iconName: {
      control: { type: 'text' },
      description: 'Icon name to display in the top-left corner',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler. When provided, the card renders as a button',
    },
  },
} as Meta<typeof ScoreCard>;

const Template: StoryFn<ScoreCardProps> = (args) => (
  <div style={{ width: '312px' }}>
    <ScoreCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  headline: 'Headline',
  progress: 1,
  total: 3,
};

export const Empty = Template.bind({});
Empty.args = {
  headline: 'Getting Started',
  progress: 0,
  total: 3,
};

export const OneThird = Template.bind({});
OneThird.args = {
  headline: 'Headline',
  progress: 1,
  total: 3,
};

export const TwoThirds = Template.bind({});
TwoThirds.args = {
  headline: 'Headline',
  progress: 2,
  total: 3,
};

export const Complete = Template.bind({});
Complete.args = {
  headline: 'Headline',
  progress: 3,
  total: 3,
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  headline: 'Headline',
  progress: 2,
  total: 3,
  iconName: 'circle_chart',
};

export const CustomTotal = Template.bind({});
CustomTotal.args = {
  headline: 'Headline',
  progress: 5,
  total: 10,
};

export const Clickable = Template.bind({});
Clickable.args = {
  headline: 'Click me',
  progress: 2,
  total: 3,
  onClick: () => {
    window.alert('clicked');
  },
};
Clickable.parameters = {
  docs: {
    description: {
      story: 'When `onClick` is provided, the card renders as a `<button>` element.',
    },
  },
};

const AllVariantsTemplate: StoryFn<ScoreCardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '312px' }}>
    <ScoreCard headline="Empty Progress" progress={0} total={3} />
    <ScoreCard headline="One Third Complete" progress={1} total={3} />
    <ScoreCard headline="Two Thirds Complete" progress={2} total={3} />
    <ScoreCard headline="Fully Complete" progress={3} total={3} />
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});
