import { Meta, StoryFn } from '@storybook/react';

import { LoadingSteps, type LoadingStepsProps } from './LoadingSteps';

export default {
  title: 'Loaders/LoadingSteps',
  component: LoadingSteps,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **LoadingSteps** component presents a full-screen loading state with a spinner and
step-by-step messages. It uses the shared **CircularProgress** component for the spinner and
animates each step in sequence.

#### Key Features:

- 🎯 **Sequential steps**: each message appears with a small delay
- 🧭 **Full-screen overlay**: keeps focus on the loading state

#### Example Usage:

\`\`\`jsx
<LoadingSteps
  steps={[
    'Preparing our best design templates...',
    'Fine-tuning our professional content generator...',
    'Launching our resume builder...',
  ]}
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    steps: {
      control: { type: 'object' },
      description: 'Messages shown under the spinner',
      table: {
        type: { summary: 'string[]' },
      },
    },
    spinnerLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
    spinnerSize: {
      control: { type: 'number' },
      description: 'Spinner size in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '40' },
      },
    },
    spinnerStrokeWidth: {
      control: { type: 'number' },
      description: 'Spinner stroke width in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    stepDelayMs: {
      control: { type: 'number' },
      description: 'Delay between steps in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '700' },
      },
    },
  },
} as Meta<typeof LoadingSteps>;

const Template: StoryFn<LoadingStepsProps> = (args) => <LoadingSteps {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    'Preparing our best design templates...',
    'Fine-tuning our professional content generator...',
    'Launching our resume builder...',
  ],
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default full-screen loader with three steps.',
    },
  },
};
