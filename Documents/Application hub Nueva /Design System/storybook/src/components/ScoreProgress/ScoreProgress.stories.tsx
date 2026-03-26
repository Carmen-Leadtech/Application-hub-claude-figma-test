import { Meta, StoryFn } from '@storybook/react';

import { ScoreProgress, type ScoreProgressProps } from './ScoreProgress';

export default {
  title: 'Score/ScoreProgress',
  component: ScoreProgress,
  parameters: {
    docs: {
      description: {
        component: `
A **ScoreProgress component** that provides a compact progress bar with an optional external label for displaying score progress.

---

### ✨ Features

- 🎨 **Color-coded:** Automatically changes color based on progress percentage.
- 🏷️ **Optional label:** Can show/hide the progress label with \`showLabel\` prop.
- 📏 **Compact design:** Thinner bar (8px) ideal for inline usage.
- ♿ **Accessible:** Includes proper ARIA attributes for screen readers.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ScoreProgress } from './ScoreProgress';

<ScoreProgress progress={2} total={3} />
<ScoreProgress progress={5} total={10} showLabel={false} />
<ScoreProgress progress={3} />
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
    showLabel: {
      control: { type: 'boolean' },
      description: 'Show or hide the progress label',
    },
  },
} as Meta<typeof ScoreProgress>;

const Template: StoryFn<ScoreProgressProps> = (args) => (
  <div style={{ width: '128px' }}>
    <ScoreProgress {...args} />
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

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  progress: 2,
  showLabel: false,
};

const AllVariantsTemplate: StoryFn<ScoreProgressProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '128px' }}>
    <ScoreProgress progress={3} />
    <ScoreProgress progress={2} />
    <ScoreProgress progress={1} />
    <ScoreProgress progress={0} />
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});

const CustomTotalTemplate: StoryFn<ScoreProgressProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '200px' }}>
    <ScoreProgress progress={10} total={10} />
    <ScoreProgress progress={8} total={10} />
    <ScoreProgress progress={5} total={10} />
    <ScoreProgress progress={3} total={10} />
    <ScoreProgress progress={0} total={10} />
  </div>
);

export const CustomTotal = CustomTotalTemplate.bind({});

const WithoutLabelsTemplate: StoryFn<ScoreProgressProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100px' }}>
    <ScoreProgress progress={3} showLabel={false} />
    <ScoreProgress progress={2} showLabel={false} />
    <ScoreProgress progress={1} showLabel={false} />
    <ScoreProgress progress={0} showLabel={false} />
  </div>
);

export const WithoutLabels = WithoutLabelsTemplate.bind({});
