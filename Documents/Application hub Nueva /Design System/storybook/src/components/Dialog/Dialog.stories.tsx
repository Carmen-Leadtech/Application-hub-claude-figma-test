import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/Button/Button';
import { Checkbox } from 'components/Checkbox/Checkbox';
import { Tab } from 'components/Tab/Tab';
import { Tabs } from 'components/Tabs/Tabs';
import { Textfield } from 'components/Textfield/Textfield';

import { Dialog, type DialogProps } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **Dialog component** that provides modal functionality with full accessibility, focus management, and flexible sizing options.

---

### ✨ Features

- 🎯 **Modal behavior:** Focus management, backdrop click handling, and keyboard interaction (\`Escape\` to close). Use \`isClickOutsideDisabled\` to prevent closing on backdrop click.
- ♿ **Accessible:** Implements WAI-ARIA dialog pattern with proper roles, focus trapping, and screen reader support.
- 📐 **Flexible sizing:** Multiple size variants (\`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`) with \`isFullWidth\` and \`fullScreen\` options.
- 📜 **Scroll management:** Choose between body scroll or paper scroll for content overflow.
- 🎨 **Customizable:** \`showCloseButton\`, \`buttonIconCloseProps\`, and \`paperProps\` for close button and paper styling.
- 🔄 **Animation support:** Optional grow animation for smooth dialog entrance; \`onEntered\` callback when dialog has opened.
- 🧪 **Test-friendly:** \`data-qa\` attributes and comprehensive accessibility labels.

---
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls whether the dialog is open or closed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      control: false,
      description:
        'Callback function invoked when the dialog should close. Receives event and reason.',
      table: {
        type: { summary: '(event: object, reason: string) => void' },
      },
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Determines the maximum width of the dialog.',
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl" | false' },
        defaultValue: { summary: '"sm"' },
      },
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'If true, the dialog will take the full width up to the maxWidth constraint.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFullScreen: {
      control: { type: 'boolean' },
      description: 'If true, the dialog will be full screen, taking up the entire viewport.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scroll: {
      control: { type: 'select' },
      options: ['body', 'paper'],
      description: 'Determines where the scroll container is located when content overflows.',
      table: {
        type: { summary: '"body" | "paper"' },
        defaultValue: { summary: '"paper"' },
      },
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Shows a close button in the top-right corner of the dialog.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isEnableGrow: {
      control: { type: 'boolean' },
      description: 'Enables grow animation when the dialog opens (enter only).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    headerLabel: {
      control: { type: 'text' },
      description: 'Optional header label displayed at the top of the dialog.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    isClickOutsideDisabled: {
      control: { type: 'boolean' },
      description: 'If true, prevents closing the dialog by clicking the backdrop.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onEntered: {
      control: false,
      description: 'Callback fired when the dialog has entered (after open).',
      table: {
        type: { summary: '() => void' },
      },
    },
    buttonIconCloseProps: {
      control: false,
      description: 'Props passed to the close button (e.g. custom aria-label).',
      table: {
        type: { summary: 'ButtonHTMLAttributes<HTMLButtonElement>' },
      },
    },
    paperProps: {
      control: false,
      description: 'Props spread onto the dialog paper element (e.g. className, title).',
      table: {
        type: { summary: 'HTMLAttributes<HTMLDivElement>' },
      },
    },
    children: {
      control: false,
      description: 'The content to be displayed inside the dialog.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'The id of the element that labels the dialog for accessibility.',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'The id of the element that describes the dialog for accessibility.',
      table: {
        type: { summary: 'string' },
      },
    },
    'data-qa': {
      control: { type: 'text' },
      description: 'Optional test identifier for the dialog component.',
    },
  },
};

export default meta;
type Story = StoryObj<DialogProps>;

const Template = (args: DialogProps, context?: { viewMode?: string }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);
  const isDocsView = context?.viewMode === 'docs';
  const containerHeight = isDocsView ? '35vh' : '100vh';

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const dialogContent = args.children || (
    <div>
      <h2 id="dialog-title">Dialog Title</h2>
      <p id="dialog-description">
        This is the dialog content. You can interact with the elements here. Press Escape or click
        outside to close the dialog.
      </p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose}>Confirm</Button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        height: containerHeight,
        width: '100%',
        minWidth: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        transform: 'translateZ(0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        {dialogContent}
      </Dialog>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    maxWidth: 'sm',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default dialog with medium size and full width. Demonstrates basic modal functionality.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [reason, setReason] = useState('');

    const handleClose = (
      _event: KeyboardEvent | React.MouseEvent,
      closeReason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick'
    ) => {
      setReason(closeReason);
      setIsOpen(false);
    };

    const handleOpen = () => {
      setReason('');
      setIsOpen(true);
    };

    return (
      <div
        style={{
          height: '400px',
          width: '100%',
          minWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          transform: 'translateZ(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleOpen}>Open Controlled Dialog</Button>
        {reason && (
          <p style={{ marginTop: '8px', color: '#666' }}>
            Last closed by: <strong>{reason}</strong>
          </p>
        )}
        <Dialog
          aria-describedby="controlled-dialog-description"
          aria-labelledby="controlled-dialog-title"
          data-qa="controlled-dialog"
          isFullWidth
          isOpen={isOpen}
          maxWidth="md"
          showCloseButton
          onClose={handleClose}
        >
          <div>
            <h2 id="controlled-dialog-title">Controlled Dialog Example</h2>
            <p id="controlled-dialog-description">
              This dialog is controlled externally with state management. The close reason is
              tracked and displayed when the dialog closes. You can close it by:
            </p>
            <ul style={{ marginTop: '16px' }}>
              <li>Clicking the close button (closeButtonClick)</li>
              <li>Pressing Escape key (escapeKeyDown)</li>
              <li>Clicking outside the dialog (backdropClick)</li>
            </ul>
            <div
              style={{ marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
            >
              <Button
                variant="secondary"
                onClick={(event) => handleClose(event, 'closeButtonClick')}
              >
                Cancel
              </Button>
              <Button onClick={(event) => handleClose(event, 'closeButtonClick')}>Confirm</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        title: 'Controlled Dialog',
        story: `Controlled dialog example with external state management and close reason tracking. Useful for integration with routing or global state.

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

const handleClose = (event, reason) => {
  console.log('Dialog closed:', reason);
  setIsOpen(false);
};

<Dialog
  aria-describedby="dialog-description"
  aria-labelledby="dialog-title"
  isFullWidth
  isOpen={isOpen}
  maxWidth="md"
  onClose={handleClose}
  showCloseButton
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog content goes here...</p>
</Dialog>
\`\`\`
        `,
      },
    },
  },
};

export const ExtraLarge: Story = {
  render: Template,
  args: {
    maxWidth: 'xl',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large dialog (1920px max width) for dashboard-like content.',
      },
    },
  },
};

export const FullScreen: Story = {
  render: Template,
  args: {
    isFullScreen: true,
    showCloseButton: true,
    children: (
      <div style={{ padding: '24px' }}>
        <h2 id="dialog-title">Full Screen Modal</h2>
        <p id="dialog-description">
          This is a full-screen modal that occupies the entire viewport. It takes up 100% of the
          screen width and height, with no border radius. This is perfect for immersive experiences,
          mobile interfaces, or when you need maximum screen real estate.
        </p>
        <div style={{ marginTop: '32px' }}>
          <h3>Features:</h3>
          <ul>
            <li>100% viewport width and height</li>
            <li>No border radius for edge-to-edge display</li>
            <li>Close button in top-right corner</li>
            <li>Ideal for mobile and tablet interfaces</li>
            <li>Maximum content space utilization</li>
          </ul>
        </div>
        <div style={{ marginTop: '32px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full-screen dialog that occupies the entire viewport with no border radius. Perfect for immersive experiences.',
      },
    },
  },
};

export const isFullWidthNoMax: Story = {
  render: Template,
  args: {
    isFullWidth: true,
    maxWidth: false,
    children: (
      <div>
        <h2 id="dialog-title">Full Width No Max Dialog</h2>
        <p id="dialog-description">
          This dialog uses isFullWidth true with maxWidth false, so it takes the full available
          width without any maximum width constraints. It will expand to fill the entire backdrop
          width (minus padding).
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with no maximum width constraint. Takes full available width minus padding.',
      },
    },
  },
};

export const Large: Story = {
  render: Template,
  args: {
    maxWidth: 'lg',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large dialog (1280px max width) for complex interfaces and data tables.',
      },
    },
  },
};

export const Medium: Story = {
  render: Template,
  args: {
    maxWidth: 'md',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium dialog (960px max width) ideal for forms and detailed content.',
      },
    },
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
    const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

    const handlePrimaryOpen = () => setIsPrimaryOpen(true);
    const handlePrimaryClose = () => {
      setIsSecondaryOpen(false);
      setIsPrimaryOpen(false);
    };

    const handleSecondaryOpen = () => setIsSecondaryOpen(true);
    const handleSecondaryClose = () => setIsSecondaryOpen(false);

    return (
      <div
        style={{
          height: '400px',
          width: '100%',
          minWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          transform: 'translateZ(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handlePrimaryOpen}>Open Primary Dialog</Button>
        <Dialog
          aria-describedby="primary-dialog-description"
          aria-labelledby="primary-dialog-title"
          data-qa="primary-dialog"
          isFullWidth
          isOpen={isPrimaryOpen}
          maxWidth="sm"
          showCloseButton
          onClose={handlePrimaryClose}
        >
          <div>
            <h2 id="primary-dialog-title">Primary Dialog</h2>
            <p id="primary-dialog-description">
              This is the main dialog. You can open a secondary dialog on top of it.
            </p>
            <div
              style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
            >
              <Button variant="secondary" onClick={handlePrimaryClose}>
                Close
              </Button>
              <Button onClick={handleSecondaryOpen}>Open Secondary</Button>
            </div>
          </div>
        </Dialog>

        <Dialog
          aria-describedby="secondary-dialog-description"
          aria-labelledby="secondary-dialog-title"
          data-qa="secondary-dialog"
          isFullWidth
          isOpen={isSecondaryOpen}
          maxWidth="xs"
          showCloseButton
          onClose={handleSecondaryClose}
        >
          <div>
            <h2 id="secondary-dialog-title">Secondary Dialog</h2>
            <p id="secondary-dialog-description">
              This dialog is stacked on top of the primary one.
            </p>
            <div
              style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
            >
              <Button variant="secondary" onClick={handleSecondaryClose}>
                Back
              </Button>
              <Button onClick={handlePrimaryClose}>Close All</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with multiple stacked dialogs (primary + secondary).',
      },
    },
  },
};

export const ScrollBody: Story = {
  render: Template,
  args: {
    scroll: 'body',
    children: (
      <div>
        <h2 id="dialog-title">Long Content Dialog</h2>
        <div id="dialog-description">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with body scroll - the entire backdrop scrolls when content overflows.',
      },
    },
  },
};

export const ScrollPaper: Story = {
  render: Template,
  args: {
    scroll: 'paper',
    children: (
      <div>
        <h2 id="dialog-title">Long Content Dialog</h2>
        <div id="dialog-description">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with paper scroll - the dialog content scrolls internally when overflowing.',
      },
    },
  },
};

export const Small: Story = {
  render: Template,
  args: {
    maxWidth: 'xs',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small dialog (366px max width) suitable for simple confirmations and alerts.',
      },
    },
  },
};

export const WithCloseButton: Story = {
  render: Template,
  args: {
    showCloseButton: true,
    isFullWidth: true,
    maxWidth: 'sm',
    children: (
      <div>
        <h2 id="dialog-title">Dialog With Close Button</h2>
        <p id="dialog-description">
          This story demonstrates the close button in the top-right corner of the dialog.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with the close button enabled.',
      },
    },
  },
};

export const WithGrowAnimation: Story = {
  render: Template,
  args: {
    isEnableGrow: true,
    maxWidth: 'sm',
    isFullWidth: true,
    children: (
      <div>
        <h2 id="dialog-title">Dialog with Grow Animation</h2>
        <p id="dialog-description">
          This dialog demonstrates the grow animation feature. When opened, it will scale up from 0
          to full size with a smooth transition. When closed, it will disappear immediately without
          animation.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with grow animation on open. Scales from 0 to full size with smooth transition.',
      },
    },
  },
};

export const ClickOutsideDisabled: Story = {
  render: Template,
  args: {
    isClickOutsideDisabled: true,
    showCloseButton: true,
    maxWidth: 'sm',
    isFullWidth: true,
    children: (
      <div>
        <h2 id="dialog-title">Backdrop Click Disabled</h2>
        <p id="dialog-description">
          This dialog cannot be closed by clicking outside. Use the close button or press Escape to
          close it.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with backdrop click disabled. Users must use the close button or Escape key to close.',
      },
    },
  },
};

export const WithTabs: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [weeklySummary, setWeeklySummary] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
      setActiveTab(value);
    };

    const tabContent = [
      {
        title: 'Personal Information',
        content: (
          <div>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Update your personal details and contact information.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Textfield
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Textfield
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        ),
      },
      {
        title: 'Preferences',
        content: (
          <div>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Customize your experience and notification settings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                label="Email notifications"
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
              <Checkbox
                label="SMS notifications"
                checked={smsNotifications}
                onChange={setSmsNotifications}
              />
              <Checkbox
                label="Weekly summary"
                checked={weeklySummary}
                onChange={setWeeklySummary}
              />
            </div>
          </div>
        ),
      },
      {
        title: 'Security',
        content: (
          <div>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Manage your password and security settings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Textfield
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Textfield
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        ),
      },
    ];

    return (
      <div
        style={{
          height: '400px',
          width: '100%',
          minWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          transform: 'translateZ(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleOpen}>Open Dialog with Tabs</Button>
        <Dialog
          aria-describedby="tabs-dialog-description"
          aria-labelledby="tabs-dialog-title"
          data-qa="tabs-dialog"
          isEnableGrow
          isFullWidth
          isOpen={isOpen}
          maxWidth="md"
          showCloseButton
          onClose={handleClose}
        >
          <div>
            <h2 id="tabs-dialog-title" style={{ marginBottom: '16px' }}>
              Settings
            </h2>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Personal" />
              <Tab label="Preferences" />
              <Tab label="Security" />
            </Tabs>
            <div
              id="tabs-dialog-description"
              style={{ padding: '24px 0', minHeight: '200px' }}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
            >
              {tabContent[activeTab].content}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleClose}>Save Changes</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dialog with integrated Tabs component for organizing content into sections. Ideal for settings panels, multi-step forms, or any content that benefits from tabbed navigation.',
      },
    },
  },
};
