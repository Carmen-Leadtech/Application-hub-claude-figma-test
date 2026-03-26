import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { InfoCard, type InfoCardProps } from './InfoCard';

export default {
  title: 'Cards/InfoCard',
  component: InfoCard,
  parameters: {
    docs: {
      description: {
        component: `
An **InfoCard component** that displays important information with a header and content section.

---

### ✨ Features

- 🎨 **Header section:** Displays an icon and title with a light gray background.
- 📊 **Content section:** Shows an image/graphic on the left and text content on the right.
- 🎯 **Flexible content:** Supports custom images, icons, and text.
- 📱 **Responsive:** Adapts to different content sizes.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { InfoCard } from './InfoCard';
import { Icon } from 'components/Icon/Icon';

<InfoCard 
  title="Why it matters" 
  content="Lorem ipsum dolor sit amet..." 
  image={<Icon name="bar_chart" />}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title text displayed in the header',
    },
    content: {
      control: { type: 'text' },
      description: 'Content text displayed in the main area',
    },
    iconName: {
      control: { type: 'text' },
      description: 'Icon name for the header (default: warning)',
    },
  },
} as Meta<typeof InfoCard>;

const Template: StoryFn<InfoCardProps> = (args) => (
  <div style={{ width: '600px' }}>
    <InfoCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Why it matters',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus Art Directors eo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
  image: <Icon name="bar_chart" />,
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  title: 'Why it matters',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus Art Directors eo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio.',
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  title: 'Important Information',
  content:
    'This is an important message that users should pay attention to. It provides context and explains why something matters.',
  iconName: 'crosshair',
  iconColor: '#b5b8ba',
  image: <Icon name="bar_chart" />,
};

export const LongContent = Template.bind({});
LongContent.args = {
  title: 'Why it matters',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus Art Directors eo quis, pellentesque dapibus lectus. Suspendisse in odio efficitur, ullamcorper velit non, sagittis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: <Icon name="bar_chart" />,
};
