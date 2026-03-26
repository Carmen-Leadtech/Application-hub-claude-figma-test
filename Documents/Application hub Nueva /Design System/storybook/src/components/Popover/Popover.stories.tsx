import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/Button/Button';

import { Popover, type PopoverProps } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: `
A **Popover component** that provides floating overlay functionality positioned relative to an anchor element.

Built following the **Material UI pattern** - uses \`event.currentTarget\` to get the anchor element, no \`forwardRef\` required on trigger elements.

---

### ✨ Features

- 🎯 **Positioned overlay:** Automatically positions relative to anchor element with anchor-based placement options.
- 📐 **Smart positioning:** Always positions optimally to fit on screen, regardless of placement prop.
- 🔄 **Auto-flip:** Intelligently flips vertically and horizontally based on available space.
- 🖱️ **Outside click:** Automatically closes when clicking outside the popover or anchor.
- 🌀 **Built-in portal:** Renders via \`createPortal\` to \`document.body\` by default (configurable via \`container\` prop).
- 🧪 **Test-friendly:** \`data-qa\` attributes and proper accessibility.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { Popover } from './Popover';

const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => setAnchorEl(null);

const open = Boolean(anchorEl);

<button onClick={handleClick}>
  Open Popover
</button>
<Popover
  anchorEl={anchorEl}
  open={open}
  placement="bottom-left"
  onClose={handleClose}
>
  <div>Popover content goes here</div>
</Popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls whether the popover is open or closed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      description: 'Preferred placement of the popover. Auto-flips intelligently to fit on screen.',
      table: {
        type: {
          summary: '"bottom-left" | "bottom-right" | "top-left" | "top-right"',
        },
        defaultValue: { summary: '"bottom-left"' },
      },
    },
    anchorEl: {
      control: false,
      description:
        'The element that the popover will be positioned relative to. Use event.currentTarget to get it.',
      table: {
        type: { summary: 'HTMLElement | null' },
      },
    },
    container: {
      control: false,
      description: 'The container element where the portal will be rendered.',
      table: {
        type: { summary: 'Element | null' },
        defaultValue: { summary: 'document.body' },
      },
    },
    onClose: {
      control: false,
      description: 'Callback function invoked when the popover should close.',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      description: 'The content to be displayed inside the popover.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

const Template = (args: PopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button onClick={handleClick}>
        {open ? 'Close' : 'Open'} Popover ({args.placement})
      </Button>
      <Popover {...args} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div>
          <p>This popover closes when you click outside of it or the anchor button.</p>
        </div>
      </Popover>
    </div>
  );
};

export const BottomLeft: Story = {
  render: Template,
  args: {
    placement: 'bottom-left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover positioned at the bottom-left of the anchor element.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const BottomRight: Story = {
  render: Template,
  args: {
    placement: 'bottom-right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover positioned at the bottom-right of the anchor element.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const TopLeft: Story = {
  render: Template,
  args: {
    placement: 'top-left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover positioned at the top-left of the anchor element.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const TopRight: Story = {
  render: Template,
  args: {
    placement: 'top-right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover positioned at the top-right of the anchor element.',
      },
      source: {
        type: 'code',
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    return (
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick}>{open ? 'Close' : 'Open'} Custom Popover</Button>
        <Popover anchorEl={anchorEl} open={open} placement="bottom-left" onClose={handleClose}>
          <div style={{ minWidth: '200px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              This popover contains custom content with rich formatting.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Button size="S" variant="secondary">
                Action 1
              </Button>
              <Button size="S">Action 2</Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with custom content including buttons and styled text.',
      },
    },
  },
};

export const MultipleAnchors: Story = {
  render: () => {
    const [activePopover, setActivePopover] = useState<string | null>(null);
    const [anchors, setAnchors] = useState<Record<string, HTMLElement | null>>({
      button1: null,
      button2: null,
      button3: null,
      button4: null,
    });

    const handleClick = (popoverId: string, event: React.MouseEvent<HTMLElement>) => {
      setAnchors((prev) => ({
        ...prev,
        [popoverId]: event.currentTarget,
      }));
      setActivePopover((current) => (current === popoverId ? null : popoverId));
    };

    const handleClose = () => setActivePopover(null);

    return (
      <div
        style={{ padding: '200px 100px', display: 'flex', gap: '20px', justifyContent: 'center' }}
      >
        <Button
          onClick={(e) => handleClick('button1', e)}
          variant={activePopover === 'button1' ? 'primary' : 'secondary'}
        >
          Bottom-Left
        </Button>
        <Button
          onClick={(e) => handleClick('button2', e)}
          variant={activePopover === 'button2' ? 'primary' : 'secondary'}
        >
          Bottom-Right
        </Button>
        <Button
          onClick={(e) => handleClick('button3', e)}
          variant={activePopover === 'button3' ? 'primary' : 'secondary'}
        >
          Top-Left
        </Button>
        <Button
          onClick={(e) => handleClick('button4', e)}
          variant={activePopover === 'button4' ? 'primary' : 'secondary'}
        >
          Top-Right
        </Button>

        <Popover
          anchorEl={anchors.button1}
          open={activePopover === 'button1'}
          placement="bottom-left"
          onClose={handleClose}
        >
          <div>
            <p>This popover uses bottom-left positioning.</p>
          </div>
        </Popover>

        <Popover
          anchorEl={anchors.button2}
          open={activePopover === 'button2'}
          placement="bottom-right"
          onClose={handleClose}
        >
          <div>
            <p>This popover uses bottom-right positioning.</p>
          </div>
        </Popover>

        <Popover
          anchorEl={anchors.button3}
          open={activePopover === 'button3'}
          placement="top-left"
          onClose={handleClose}
        >
          <div>
            <p>This popover uses top-left positioning.</p>
          </div>
        </Popover>

        <Popover
          anchorEl={anchors.button4}
          open={activePopover === 'button4'}
          placement="top-right"
          onClose={handleClose}
        >
          <div>
            <p>This popover uses top-right positioning.</p>
          </div>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple popovers with different anchor points. Only one can be open at a time.',
      },
    },
  },
};

export const ResponsiveFlipping: Story = {
  render: () => {
    const [activePopover, setActivePopover] = useState<string | null>(null);
    const [anchors, setAnchors] = useState<Record<string, HTMLElement | null>>({});

    const handleClick = (popoverId: string, event: React.MouseEvent<HTMLElement>) => {
      setAnchors((prev) => ({
        ...prev,
        [popoverId]: event.currentTarget,
      }));
      setActivePopover((current) => (current === popoverId ? null : popoverId));
    };

    const handleClose = () => setActivePopover(null);

    return (
      <div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>
            🧠 Intelligent positioning: Click buttons to see popovers position optimally using
            left/right alignment regardless of screen edges or scroll position
          </p>
        </div>

        {/* Top button - should flip to bottom when not enough space above */}
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={activePopover === 'top' ? 'primary' : 'secondary'}
            onClick={(e) => handleClick('top', e)}
          >
            Top Button (auto-flips to bottom)
          </Button>
          <Popover
            anchorEl={anchors.top}
            open={activePopover === 'top'}
            placement="top-left"
            onClose={handleClose}
          >
            <div>
              <p>
                Set to <strong>top-left</strong> but flips to <strong>bottom-left</strong> when
                there isn&apos;t enough space above.
              </p>
            </div>
          </Popover>
        </div>

        {/* Horizontal flip demo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          {/* Left edge button */}
          <div>
            <Button
              variant={activePopover === 'left' ? 'primary' : 'secondary'}
              onClick={(e) => handleClick('left', e)}
            >
              Left Edge Test
            </Button>
            <Popover
              anchorEl={anchors.left}
              open={activePopover === 'left'}
              placement="bottom-left"
              onClose={handleClose}
            >
              <div>
                <p>Intelligently flips to the right when there&apos;s no space on the left side.</p>
              </div>
            </Popover>
          </div>

          {/* Right edge button */}
          <div>
            <Button
              variant={activePopover === 'right' ? 'primary' : 'secondary'}
              onClick={(e) => handleClick('right', e)}
            >
              Right Edge Test
            </Button>
            <Popover
              anchorEl={anchors.right}
              open={activePopover === 'right'}
              placement="bottom-right"
              onClose={handleClose}
            >
              <div>
                <p>Intelligently flips to the left when there&apos;s no space on the right side.</p>
              </div>
            </Popover>
          </div>
        </div>

        {/* Bottom button - scroll down to see it flip */}
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <div>
            <Button
              variant={activePopover === 'bottom' ? 'primary' : 'secondary'}
              onClick={(e) => handleClick('bottom', e)}
            >
              Bottom Edge Test
            </Button>
            <Popover
              anchorEl={anchors.bottom}
              open={activePopover === 'bottom'}
              placement="bottom-left"
              onClose={handleClose}
            >
              <div>
                <p>
                  Intelligently flips to the top when there&apos;s no space below. Always stays
                  close to anchor button!
                </p>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates intelligent positioning that always works optimally. Click buttons to see how popovers position themselves to fit on screen, regardless of placement prop or scroll position.',
      },
    },
  },
};
