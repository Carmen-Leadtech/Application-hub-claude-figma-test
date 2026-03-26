import { Meta, StoryFn } from '@storybook/react';

import { Banner, type BannerProps } from './Banner';

const IMAGE_URL = 'https://placehold.co/280x128/';

export default {
  title: 'Cards/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **Banner component** that provides a prominent informational section with optional illustration, ideal for announcements, coaching tips, or feature highlights.

---

### ✨ Features

- 🎨 **Icon:** Configurable icon for visual identification.
- 📝 **Title:** Prominent heading text.
- 📄 **Description:** Supporting text content.
- 🖼️ **Illustration:** Optional image (desktop only).
- 📱 **Responsive:** Automatically adapts layout for mobile/desktop.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Banner } from './Banner';

<Banner
  iconName="magic"
  title="AI Coach"
  description="Our AI Coach recommends the following content and actions."
  image="https://example.com/image.png"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    iconName: {
      control: { type: 'text' },
      description: 'Icon name to display (e.g., "magic", "ai_stars", "badge_coach")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'magic' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Title text displayed prominently',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'AI Coach' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description text below the title',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'Optional illustration image URL (displayed only on desktop)',
      table: {
        type: { summary: 'string' },
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
} as Meta<typeof Banner>;

const Template: StoryFn<BannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconName: 'magic',
  title: 'AI Coach',
  description:
    'Our AI Coach recommends the following content and actions. Copy and edit directly in your Linkedin profile [definir copy for 2 lines].',
  image: IMAGE_URL,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default banner with icon, title, description, and image (visible on desktop).',
    },
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  iconName: 'magic',
  title: 'AI Coach',
  description:
    'Our AI Coach recommends the following content and actions. Copy and edit directly in your Linkedin profile.',
};
WithoutImage.parameters = {
  docs: {
    description: {
      story: 'Banner without image.',
    },
  },
};
