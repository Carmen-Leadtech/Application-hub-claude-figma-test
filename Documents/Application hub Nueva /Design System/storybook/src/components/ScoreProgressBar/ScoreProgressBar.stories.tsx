import { Meta, StoryFn } from '@storybook/react';

import { ScoreProgressBar, type ScoreProgressBarProps } from './ScoreProgressBar';

export default {
  title: 'Score/ScoreProgressBar',
  component: ScoreProgressBar,
  parameters: {
    docs: {
      description: {
        component: `
A **ScoreProgressBar component** that displays completion status with a color-coded progress bar.

---

### ✨ Features

- 🎨 **Color-coded:** Automatically changes color based on progress percentage.
- 📊 **Flexible totals:** Supports any total value, not just 3.
- ♿ **Accessible:** Includes proper ARIA attributes for screen readers.
- 🏷️ **Built-in label:** Shows progress fraction inside the bar.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ScoreProgressBar } from './ScoreProgressBar';

<ScoreProgressBar progress={2} total={3} />
<ScoreProgressBar progress={7} total={10} />
<ScoreProgressBar progress={0} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    progress: {
      control: { type: 'number' },
      description: 'Number of completed sections',
    },
    total: {
      control: { type: 'number' },
      description: 'Total number of sections',
    },
  },
} as Meta<typeof ScoreProgressBar>;

const Template: StoryFn<ScoreProgressBarProps> = (args) => (
  <div style={{ width: '354px' }}>
    <ScoreProgressBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  progress: 2,
};

export const Empty = Template.bind({});
Empty.args = {
  progress: 0,
};

export const OneThird = Template.bind({});
OneThird.args = {
  progress: 1,
};

export const TwoThirds = Template.bind({});
TwoThirds.args = {
  progress: 2,
};

export const Complete = Template.bind({});
Complete.args = {
  progress: 3,
};

const AllVariantsTemplate: StoryFn<ScoreProgressBarProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '354px' }}>
    <ScoreProgressBar progress={3} />
    <ScoreProgressBar progress={2} />
    <ScoreProgressBar progress={1} />
    <ScoreProgressBar progress={0} />
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});

const CustomTotalTemplate: StoryFn<ScoreProgressBarProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '354px' }}>
    <ScoreProgressBar progress={10} total={10} />
    <ScoreProgressBar progress={9} total={10} />
    <ScoreProgressBar progress={8} total={10} />
    <ScoreProgressBar progress={7} total={10} />
    <ScoreProgressBar progress={6} total={10} />
    <ScoreProgressBar progress={5} total={10} />
    <ScoreProgressBar progress={4} total={10} />
    <ScoreProgressBar progress={3} total={10} />
    <ScoreProgressBar progress={2} total={10} />
    <ScoreProgressBar progress={1} total={10} />
    <ScoreProgressBar progress={0} total={10} />
  </div>
);

export const CustomTotal = CustomTotalTemplate.bind({});

const DifferentTotalsTemplate: StoryFn<ScoreProgressBarProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '354px' }}>
    <ScoreProgressBar progress={5} total={5} />
    <ScoreProgressBar progress={3} total={5} />
    <ScoreProgressBar progress={7} total={10} />
    <ScoreProgressBar progress={15} total={20} />
    <ScoreProgressBar progress={50} total={100} />
  </div>
);

export const DifferentTotals = DifferentTotalsTemplate.bind({});
