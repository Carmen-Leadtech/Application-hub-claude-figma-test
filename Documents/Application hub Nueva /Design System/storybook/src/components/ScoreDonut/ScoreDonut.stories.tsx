import { Meta, StoryFn } from '@storybook/react';

import { ScoreDonut, type ScoreDonutProps } from './ScoreDonut';

export default {
  title: 'Score/ScoreDonut',
  component: ScoreDonut,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **ScoreDonut component** that displays score values (0-10) as a donut chart with color-coded visual feedback.

---

### ✨ Features

- 🎨 **Color-coded:** Automatically changes color based on score value.
- 📐 **Scalable:** Adjustable size with proportional elements.
- 🏷️ **Optional label:** Show/hide description text below the chart.
- ♿ **Accessible:** Clear visual hierarchy and text labels.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ScoreDonut } from './ScoreDonut';

<ScoreDonut score={9} />
<ScoreDonut score={5} showLabel={false} />
<ScoreDonut score={7} size={120} labelText="Custom label" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    score: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Score value from 0 to 10',
      table: {
        type: { summary: 'number' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: 'Show/hide the label text below the chart',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      control: { type: 'number', min: 80, max: 300 },
      description: 'Size of the chart in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '168' },
      },
    },
    labelText: {
      control: { type: 'text' },
      description: 'Custom label text (default: "Your score is X out of 10")',
      table: {
        type: { summary: 'string' },
      },
    },
    'data-qa': {
      control: { type: 'text' },
      description: 'Test automation attribute. Also applies to label as `{data-qa}-label`',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof ScoreDonut>;

const Template: StoryFn<ScoreDonutProps> = (args) => <ScoreDonut {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 9,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default score donut showing a success score.',
    },
  },
};

// Success variants (9-10)
export const Score10 = Template.bind({});
Score10.args = {
  score: 10,
};
Score10.parameters = {
  docs: {
    description: {
      story: 'Perfect score with success styling.',
    },
  },
};

export const Score9 = Template.bind({});
Score9.args = {
  score: 9,
};

// Warning variants (5-8)
export const Score8 = Template.bind({});
Score8.args = {
  score: 8,
};

export const Score7 = Template.bind({});
Score7.args = {
  score: 7,
};

export const Score6 = Template.bind({});
Score6.args = {
  score: 6,
};

export const Score5 = Template.bind({});
Score5.args = {
  score: 5,
};

// Danger variants (0-4)
export const Score4 = Template.bind({});
Score4.args = {
  score: 4,
};

export const Score3 = Template.bind({});
Score3.args = {
  score: 3,
};

export const Score2 = Template.bind({});
Score2.args = {
  score: 2,
};

export const Score1 = Template.bind({});
Score1.args = {
  score: 1,
};

export const Score0 = Template.bind({});
Score0.args = {
  score: 0,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  score: 7,
  showLabel: false,
};
WithoutLabel.parameters = {
  docs: {
    description: {
      story: 'Score donut without the label text.',
    },
  },
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  score: 8,
  size: 120,
};
CustomSize.parameters = {
  docs: {
    description: {
      story: 'Smaller score donut (120px).',
    },
  },
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  score: 9,
  size: 220,
};
LargeSize.parameters = {
  docs: {
    description: {
      story: 'Larger score donut (220px).',
    },
  },
};

export const CustomLabelText = Template.bind({});
CustomLabelText.args = {
  score: 9,
  labelText: 'Excellent score!',
  'data-qa': 'custom-score-donut',
};
CustomLabelText.parameters = {
  docs: {
    description: {
      story: 'Score donut with custom label text and `data-qa` attribute.',
    },
  },
};

// Story to show all scores together
const AllScoresTemplate: StoryFn<ScoreDonutProps> = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
      <ScoreDonut key={score} score={score} size={120} />
    ))}
  </div>
);

export const AllScores = AllScoresTemplate.bind({});
AllScores.parameters = {
  docs: {
    description: {
      story: 'All possible score values (0-10).',
    },
  },
};

// Story showing variant groups
const VariantGroupsTemplate: StoryFn<ScoreDonutProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ marginBottom: '16px', fontFamily: 'Roboto, sans-serif' }}>Danger (0-4)</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[0, 1, 2, 3, 4].map((score) => (
          <ScoreDonut key={score} score={score} size={100} />
        ))}
      </div>
    </div>
    <div>
      <h3 style={{ marginBottom: '16px', fontFamily: 'Roboto, sans-serif' }}>Warning (5-8)</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[5, 6, 7, 8].map((score) => (
          <ScoreDonut key={score} score={score} size={100} />
        ))}
      </div>
    </div>
    <div>
      <h3 style={{ marginBottom: '16px', fontFamily: 'Roboto, sans-serif' }}>Success (9-10)</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[9, 10].map((score) => (
          <ScoreDonut key={score} score={score} size={100} />
        ))}
      </div>
    </div>
  </div>
);

export const VariantGroups = VariantGroupsTemplate.bind({});
VariantGroups.parameters = {
  docs: {
    description: {
      story: 'Score donuts grouped by variant (danger, warning, success).',
    },
  },
};

// Compact view without labels
const CompactViewTemplate: StoryFn<ScoreDonutProps> = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
      <ScoreDonut key={score} score={score} size={48} showLabel={false} />
    ))}
  </div>
);

export const CompactView = CompactViewTemplate.bind({});
CompactView.parameters = {
  docs: {
    description: {
      story: 'Compact inline view with small donuts (48px) without labels.',
    },
  },
};
