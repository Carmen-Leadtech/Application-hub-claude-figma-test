import { Meta, StoryFn } from '@storybook/react';

import { ScoreTag, type ScoreTagProps } from './ScoreTag';

export default {
  title: 'Score/ScoreTag',
  component: ScoreTag,
  parameters: {
    docs: {
      description: {
        component: `
A **ScoreTag component** that displays progress as a colored label/badge.

---

### ✨ Features

- 🎨 **Color-coded:** Text and background colors change based on progress percentage.
- 🖼️ **Background variants:** Can be displayed with or without background.
- 📦 **Compact:** Ideal for displaying scores inline with other content.
- 🔢 **Flexible totals:** Supports any total value.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ScoreTag } from './ScoreTag';

<ScoreTag progress={3} total={3} />
<ScoreTag progress={2} hasBackground={false} />
<ScoreTag progress={7} total={10} />
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
    hasBackground: {
      control: { type: 'boolean' },
      description: 'Show background color',
    },
  },
} as Meta<typeof ScoreTag>;

const Template: StoryFn<ScoreTagProps> = (args) => <ScoreTag {...args} />;

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

export const WithoutBackground = Template.bind({});
WithoutBackground.args = {
  progress: 2,
  hasBackground: false,
};

const AllVariantsTemplate: StoryFn<ScoreTagProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ScoreTag progress={0} />
    <ScoreTag progress={1} />
    <ScoreTag progress={2} />
    <ScoreTag progress={3} />
  </div>
);

export const AllVariantsWithBackground = AllVariantsTemplate.bind({});

const AllVariantsNoBackgroundTemplate: StoryFn<ScoreTagProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ScoreTag progress={0} hasBackground={false} />
    <ScoreTag progress={1} hasBackground={false} />
    <ScoreTag progress={2} hasBackground={false} />
    <ScoreTag progress={3} hasBackground={false} />
  </div>
);

export const AllVariantsWithoutBackground = AllVariantsNoBackgroundTemplate.bind({});

const ComparisonTemplate: StoryFn<ScoreTagProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>With background:</p>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <ScoreTag progress={0} />
        <ScoreTag progress={1} />
        <ScoreTag progress={2} />
        <ScoreTag progress={3} />
      </div>
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>Without background:</p>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <ScoreTag progress={0} hasBackground={false} />
        <ScoreTag progress={1} hasBackground={false} />
        <ScoreTag progress={2} hasBackground={false} />
        <ScoreTag progress={3} hasBackground={false} />
      </div>
    </div>
  </div>
);

export const Comparison = ComparisonTemplate.bind({});

const CustomTotalTemplate: StoryFn<ScoreTagProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ScoreTag progress={10} total={10} />
    <ScoreTag progress={7} total={10} />
    <ScoreTag progress={4} total={10} />
    <ScoreTag progress={0} total={10} />
  </div>
);

export const CustomTotal = CustomTotalTemplate.bind({});
