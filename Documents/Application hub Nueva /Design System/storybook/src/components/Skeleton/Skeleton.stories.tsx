import { Meta, StoryFn } from '@storybook/react';

import { Skeleton, type SkeletonProps } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Skeleton component** to display a placeholder preview of content before data loads, reducing perceived load time.

---

### ✨ Features

- 🎬 **Animations:** Pulse (default) and wave effects, or disable animation entirely.
- 🔲 **Variants:** Text, circular, rectangular, and rounded shapes.
- 📐 **Flexible sizing:** Set explicit width/height or infer from children.
- 🎯 **Accessibility:** Creates anticipation of content and reduces cognitive load.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Skeleton } from './Skeleton';

// Basic text skeleton
<Skeleton />

// Variants
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={60} />
<Skeleton variant="rounded" width={210} height={60} />

// Animations
<Skeleton animation="wave" />
<Skeleton animation={false} />

// Infer dimensions from children
<Skeleton variant="circular">
  <Avatar />
</Skeleton>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'The type of content that will be rendered',
      table: {
        type: { summary: '"text" | "circular" | "rectangular" | "rounded"' },
        defaultValue: { summary: '"text"' },
      },
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', false],
      description: 'The animation effect. If false, the animation is disabled.',
      table: {
        type: { summary: '"pulse" | "wave" | false' },
        defaultValue: { summary: '"pulse"' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the skeleton',
      table: {
        type: { summary: 'number | string' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the skeleton',
      table: {
        type: { summary: 'number | string' },
      },
    },
    children: {
      control: false,
      description: 'Optional children to infer width and height from',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} as Meta<SkeletonProps>;

const Template: StoryFn<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 210,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default text skeleton with pulse animation.',
    },
  },
};

export const TextVariant = Template.bind({});
TextVariant.args = {
  variant: 'text',
  width: '100%',
  style: { fontSize: '1rem' },
};
TextVariant.parameters = {
  docs: {
    description: {
      story: 'Text variant adjusts height via font-size. Represents a single line of text.',
    },
  },
};

export const Circular = Template.bind({});
Circular.args = {
  variant: 'circular',
  width: 40,
  height: 40,
};
Circular.parameters = {
  docs: {
    description: {
      story: 'Circular skeleton, useful for avatar placeholders.',
    },
  },
};

export const Rectangular = Template.bind({});
Rectangular.args = {
  variant: 'rectangular',
  width: 210,
  height: 60,
};
Rectangular.parameters = {
  docs: {
    description: {
      story: 'Rectangular skeleton with sharp corners.',
    },
  },
};

export const Rounded = Template.bind({});
Rounded.args = {
  variant: 'rounded',
  width: 210,
  height: 60,
};
Rounded.parameters = {
  docs: {
    description: {
      story: 'Rounded skeleton with border-radius.',
    },
  },
};

const VariantsTemplate: StoryFn<SkeletonProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <Skeleton variant="text" style={{ fontSize: '1rem' }} />
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={60} />
    <Skeleton variant="rounded" width={210} height={60} />
  </div>
);

export const AllVariants = VariantsTemplate.bind({});
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Comparison of all shape variants: text, circular, rectangular, and rounded.',
    },
  },
};

export const WaveAnimation = Template.bind({});
WaveAnimation.args = {
  animation: 'wave',
  variant: 'rectangular',
  width: 210,
  height: 60,
};
WaveAnimation.parameters = {
  docs: {
    description: {
      story: 'Wave animation effect - a shimmer that moves across the skeleton.',
    },
  },
};

export const NoAnimation = Template.bind({});
NoAnimation.args = {
  animation: false,
  variant: 'rectangular',
  width: 210,
  height: 60,
};
NoAnimation.parameters = {
  docs: {
    description: {
      story: 'Animation disabled - static skeleton placeholder.',
    },
  },
};

const AnimationsTemplate: StoryFn<SkeletonProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#666' }}>Pulse (default)</p>
      <Skeleton animation="pulse" variant="rectangular" width={210} height={40} />
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#666' }}>Wave</p>
      <Skeleton animation="wave" variant="rectangular" width={210} height={40} />
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#666' }}>No animation</p>
      <Skeleton animation={false} variant="rectangular" width={210} height={40} />
    </div>
  </div>
);

export const AllAnimations = AnimationsTemplate.bind({});
AllAnimations.parameters = {
  docs: {
    description: {
      story: 'Comparison of all animation types: pulse, wave, and disabled.',
    },
  },
};

const InferFromChildrenTemplate: StoryFn<SkeletonProps> = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Skeleton variant="circular">
      <div style={{ width: 40, height: 40 }} />
    </Skeleton>
    <Skeleton variant="rounded">
      <div style={{ width: 100, height: 20 }} />
    </Skeleton>
  </div>
);

export const InferFromChildren = InferFromChildrenTemplate.bind({});
InferFromChildren.parameters = {
  docs: {
    description: {
      story:
        'The skeleton can infer width and height from its children, useful when you want to match existing component dimensions.',
    },
  },
};

const CardSkeletonTemplate: StoryFn<SkeletonProps> = () => (
  <div
    style={{
      width: 300,
      padding: 16,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
    }}
  >
    <Skeleton variant="rectangular" width="100%" height={140} />
    <div style={{ marginTop: 12 }}>
      <Skeleton variant="text" style={{ fontSize: '1.25rem' }} />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

export const CardPlaceholder = CardSkeletonTemplate.bind({});
CardPlaceholder.parameters = {
  docs: {
    description: {
      story: 'Example of using multiple skeletons to create a card placeholder.',
    },
  },
};

const ListSkeletonTemplate: StoryFn<SkeletonProps> = () => (
  <div style={{ width: 300 }}>
    {[1, 2, 3].map((item) => (
      <div key={item} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
    ))}
  </div>
);

export const ListPlaceholder = ListSkeletonTemplate.bind({});
ListPlaceholder.parameters = {
  docs: {
    description: {
      story: 'Example of using skeletons to create a list placeholder with avatars.',
    },
  },
};

const DarkBackgroundTemplate: StoryFn<SkeletonProps> = () => (
  <div
    style={{
      backgroundColor: '#1a1a1a',
      padding: 24,
      borderRadius: 8,
    }}
  >
    <Skeleton
      variant="rectangular"
      width={210}
      height={118}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.13)' }}
    />
  </div>
);

export const DarkBackground = DarkBackgroundTemplate.bind({});
DarkBackground.parameters = {
  docs: {
    description: {
      story:
        'On dark backgrounds, customize the skeleton color using the style prop or CSS variables.',
    },
  },
};
