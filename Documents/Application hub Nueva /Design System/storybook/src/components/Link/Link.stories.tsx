import { Meta, StoryFn } from '@storybook/react';

import { Link, type LinkProps } from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Link component** for creating interactive navigation elements with optional start and end icons.

Extends \`AnchorHTMLAttributes<HTMLAnchorElement>\`, so it supports **all native attributes** of an \`<a>\` element like \`target\`, \`rel\`, \`download\`, etc.

---

### ✨ Features

- 🔗 **Native HTML Anchor:** Supports all native attributes (\`target\`, \`rel\`, \`download\`, etc.).
- 📐 **Two Sizes:** Medium (16px) and small (14px) text options.
- 🎯 **Icon Start:** Optional icon positioned before the text.
- 🎯 **Icon End:** Optional icon positioned after the text.
- 🎨 **Icon Support:** Support for any icons with configurable props.
- 🚫 **Disabled State:** Visual and functional disabled state.
- 🧪 **Test-friendly:** \`data-qa\` and tracking attributes support.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Link } from './Link';

<Link href="/basic">
  Basic Link
</Link>

<Link 
  iconStart="arrow_back" 
  href="/back"
>
  Back Link
</Link>

<Link 
  href="https://external.com"
  target="_blank"
  rel="noopener noreferrer"
>
  External Link
</Link>

<Link 
  iconStart="cancel" 
  iconEnd="arrow_forward"
  href="/add"
>
  Add New Item
</Link>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['medium', 'small'],
      description: 'Size of the link text',
      table: {
        type: { summary: '"medium" | "small"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    iconStart: {
      control: { type: 'text' },
      description: 'Icon name positioned before the text',
      table: {
        type: { summary: 'string' },
      },
    },
    iconEnd: {
      control: { type: 'text' },
      description: 'Icon name positioned after the text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the link',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'URL or path the link navigates to',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Link text content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Native anchor target attribute',
      table: {
        type: { summary: '"_self" | "_blank" | "_parent" | "_top"' },
      },
    },
    rel: {
      control: { type: 'text' },
      description: 'Native anchor rel attribute (e.g., "noopener noreferrer")',
      table: {
        type: { summary: 'string' },
      },
    },
    download: {
      control: { type: 'text' },
      description: 'Native anchor download attribute for file downloads',
      table: {
        type: { summary: 'string | boolean' },
      },
    },
  },
} as Meta<typeof Link>;

const Template: StoryFn<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link text',
  href: '/default',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default link with standard styling.',
    },
  },
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  children: 'Back to Previous',
  iconStart: 'arrow_back',
  href: '/back',
};
IconLeft.parameters = {
  docs: {
    description: {
      story: 'Link with icon positioned on the left side (iconStart).',
    },
  },
};

export const IconRight = Template.bind({});
IconRight.args = {
  children: 'Continue to Next',
  iconEnd: 'arrow_forward',
  href: '/next',
};
IconRight.parameters = {
  docs: {
    description: {
      story: 'Link with icon positioned on the right side (iconEnd).',
    },
  },
};

export const IconBothSides = Template.bind({});
IconBothSides.args = {
  children: 'Add New Item',
  iconStart: 'cancel',
  iconEnd: 'arrow_forward',
  href: '/add-item',
};
IconBothSides.parameters = {
  docs: {
    description: {
      story: 'Link with icons on both sides - add icon on left, arrow on right.',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Link',
  iconStart: 'arrow_back',
  disabled: true,
  href: '/disabled',
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled link showing visual feedback and preventing interaction.',
    },
  },
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  children: 'Open in new tab',
  iconEnd: 'open_in_new',
  href: 'https://example.com',
  target: '_blank',
  rel: 'noopener noreferrer',
};
ExternalLink.parameters = {
  docs: {
    description: {
      story:
        'External link using native anchor attributes (`target="_blank"`, `rel="noopener noreferrer"`). The component supports all `AnchorHTMLAttributes` attributes.',
    },
  },
};

export const DownloadLink = Template.bind({});
DownloadLink.args = {
  children: 'Download file',
  iconStart: 'save_alt',
  href: '/files/document.pdf',
  download: 'document.pdf',
};
DownloadLink.parameters = {
  docs: {
    description: {
      story: 'Download link using the native `download` attribute.',
    },
  },
};
