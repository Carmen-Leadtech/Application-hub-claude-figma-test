import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Toast, type ToastProps } from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A **Toast component** for displaying temporary notification messages with different variants for various message types.

---

### ✨ Features

- 🎨 **Variants:** \`info\`, \`success\`, \`error\`, and \`warning\` with appropriate colors and icons.
- ✨ **Optional Close:** Closable with keyboard and mouse support.
- 📐 **Layout Options:** \`floating\` and \`fullWidth\` modifiers for different contexts.
- ♿ **Accessible:** Proper ARIA labels and keyboard navigation for close button.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Toast } from './Toast';

<Toast variant="success" onClose={() => handleClose()}>
  <b>Success!</b> Your changes have been saved.
</Toast>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['info', 'success', 'error', 'warning'],
      description: 'The visual style variant of the toast.',
      table: {
        type: { summary: '"info" | "success" | "error" | "warning"' },
        defaultValue: { summary: '"info"' },
      },
    },
    onClose: {
      action: 'close',
      description: 'Callback fired when the close button is clicked.',
      table: {
        type: { summary: '() => void' },
      },
    },
    floating: {
      control: 'boolean',
      description: 'If true, the toast will have floating styling (white background).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the toast will take full width with no border radius.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the toast.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    'data-qa': {
      control: 'text',
      description: 'Quality assurance identifier.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof Toast>;

const Template: StoryFn<ToastProps> = (args) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    args.onClose?.();
    // Reset visibility after a short delay for story demonstration
    setTimeout(() => setIsVisible(true), 1000);
  };

  if (!isVisible) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Toast closed. It will reappear in a moment...
      </div>
    );
  }

  return <Toast {...args} onClose={args.onClose ? handleClose : undefined} />;
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  children: (
    <>
      <b>Information:</b> Here&apos;s some useful information for you to know.
    </>
  ),
  onClose: () => console.log('Info toast closed'),
};
Info.parameters = {
  docs: {
    description: {
      story: 'Info toast variant with blue color scheme.',
    },
  },
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: (
    <>
      <b>Success!</b> Your changes have been saved successfully.
    </>
  ),
  onClose: () => console.log('Success toast closed'),
};
Success.parameters = {
  docs: {
    description: {
      story: 'Success toast variant with green color scheme.',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  children: (
    <>
      <b>Error:</b> Something went wrong. Please try again.
    </>
  ),
  onClose: () => console.log('Error toast closed'),
};
Error.parameters = {
  docs: {
    description: {
      story: 'Error toast variant with red color scheme and special icon styling.',
    },
  },
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: (
    <>
      <b>Warning:</b> Please review your input before proceeding.
    </>
  ),
  onClose: () => console.log('Warning toast closed'),
};
Warning.parameters = {
  docs: {
    description: {
      story: 'Warning toast variant with orange color scheme.',
    },
  },
};

const AllVariantsTemplate: StoryFn<ToastProps> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
    <Toast variant="info" onClose={args.onClose}>
      <b>Information:</b> This is an info message with some{' '}
      <a href="#" onClick={(e) => e.preventDefault()}>
        linked content
      </a>
      .
    </Toast>
    <Toast variant="success" onClose={args.onClose}>
      <b>Success!</b> Operation completed successfully.
    </Toast>
    <Toast variant="error" onClose={args.onClose}>
      <b>Error:</b> Unable to complete the requested operation.
    </Toast>
    <Toast variant="warning" onClose={args.onClose}>
      <b>Warning:</b> Please check your input and try again.
    </Toast>
  </div>
);

export const AllVariants = AllVariantsTemplate.bind({});
AllVariants.args = {
  onClose: () => console.log('Toast closed'),
};
AllVariants.parameters = {
  docs: {
    description: {
      story: 'Overview of all toast variants with their distinctive styling.',
    },
  },
};

const LayoutOptionsTemplate: StoryFn<ToastProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3 style={{ marginBottom: '16px' }}>Default Layout</h3>
      <Toast variant="info" onClose={() => console.log('Default closed')}>
        <b>Default toast</b> with standard styling and rounded corners.
      </Toast>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px' }}>Floating Layout</h3>
      <Toast variant="success" floating onClose={() => console.log('Floating closed')}>
        <b>Floating toast</b> with white background for overlay use.
      </Toast>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px' }}>Full Width Layout</h3>
      <Toast variant="warning" fullWidth onClose={() => console.log('Full width closed')}>
        <b>Full width toast</b> with no border radius for full container width.
      </Toast>
    </div>

    <div>
      <h3 style={{ marginBottom: '16px' }}>Without Close Button</h3>
      <Toast variant="error">
        <b>Persistent toast</b> without close button for critical messages.
      </Toast>
    </div>
  </div>
);

export const LayoutOptions = LayoutOptionsTemplate.bind({});
LayoutOptions.parameters = {
  docs: {
    description: {
      story: 'Different layout options and configurations for various use cases.',
    },
  },
};
