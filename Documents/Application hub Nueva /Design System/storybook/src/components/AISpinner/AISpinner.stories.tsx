import { Meta, StoryFn } from '@storybook/react';

import { AISpinner, type AISpinnerProps } from './AISpinner';
import README from './README.md?raw';

export default {
  title: 'Loaders/AISpinner',
  component: AISpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: README,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 24, max: 240 },
      description: 'Size of the spinner in pixels (e.g. 72, 108, 180)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '180' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof AISpinner>;

const Template: StoryFn<AISpinnerProps> = (args) => <AISpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'Default AI spinner with brand colors and dual rotating rings.',
    },
  },
};

export const CustomAriaLabel = Template.bind({});
CustomAriaLabel.args = {
  'aria-label': 'AI is thinking',
};
CustomAriaLabel.parameters = {
  docs: {
    description: {
      story: 'Spinner with custom accessible label for AI/loading context.',
    },
  },
};

export const WithDataQa = Template.bind({});
WithDataQa.args = {
  'data-qa': 'ai-spinner',
};
WithDataQa.parameters = {
  docs: {
    description: {
      story: 'Spinner with data-qa attribute for testing.',
    },
  },
};

export const Size72 = Template.bind({});
Size72.args = {
  size: 72,
};
Size72.parameters = {
  docs: {
    description: {
      story: 'Compact 72px spinner for inline or tight layouts.',
    },
  },
};

export const Size108 = Template.bind({});
Size108.args = {
  size: 108,
};
Size108.parameters = {
  docs: {
    description: {
      story: '108px spinner for cards or medium emphasis.',
    },
  },
};

export const SizeComparison = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
    <AISpinner size={72} aria-label="Loading small" />
    <AISpinner size={108} aria-label="Loading medium" />
    <AISpinner size={180} aria-label="Loading default" />
  </div>
);
SizeComparison.parameters = {
  docs: {
    description: {
      story: 'Comparison of 72px, 108px, and default 180px sizes.',
    },
  },
};
