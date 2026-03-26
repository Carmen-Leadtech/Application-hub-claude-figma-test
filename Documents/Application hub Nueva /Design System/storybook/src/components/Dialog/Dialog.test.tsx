import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from './Dialog';

beforeAll(() => {
  HTMLElement.prototype.focus = vi.fn();
});

describe('Dialog Component', () => {
  it('renders children correctly when is open', () => {
    render(<Dialog isOpen>Dialog content</Dialog>);

    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('does not render when is open is false', () => {
    render(<Dialog isOpen={false}>Dialog content</Dialog>);

    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
  });

  it('applies correct ARIA attributes', () => {
    render(
      <Dialog isOpen aria-labelledby="title-id" aria-describedby="desc-id" id="test-dialog">
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'title-id');
    expect(dialog).toHaveAttribute('aria-describedby', 'desc-id');
    expect(dialog).toHaveAttribute('id', 'test-dialog');
    expect(dialog).toHaveAttribute('tabIndex', '-1');
  });

  it('applies maxWidth classes correctly', () => {
    const { rerender } = render(
      <Dialog isOpen maxWidth="xs">
        Content
      </Dialog>
    );
    let dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/maxWidthXs/);

    rerender(
      <Dialog isOpen maxWidth="lg">
        Content
      </Dialog>
    );
    dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/maxWidthLg/);

    rerender(
      <Dialog isOpen maxWidth={false}>
        Content
      </Dialog>
    );
    dialog = screen.getByRole('dialog');
    expect(dialog.className).not.toMatch(/maxWidthXs/);
    expect(dialog.className).not.toMatch(/maxWidthLg/);
  });

  it('applies fullWidth class when isFullWidth is true', () => {
    render(
      <Dialog isOpen isFullWidth>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/fullWidth/);
  });

  it('applies fullScreen class when isFullScreen is true', () => {
    render(
      <Dialog isOpen isFullScreen>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/fullScreen/);
  });

  it('applies scroll classes correctly', () => {
    const { rerender, container } = render(
      <Dialog isOpen scroll="body">
        Content
      </Dialog>
    );

    let backdrop = container.querySelector('[class*="backdrop"]');
    let dialog = screen.getByRole('dialog');

    expect(backdrop?.className).toMatch(/backdropScrollBody/);
    expect(dialog.className).toMatch(/dialogScrollBody/);
    expect(dialog.className).not.toMatch(/scrollPaper/);

    rerender(
      <Dialog isOpen scroll="paper">
        Content
      </Dialog>
    );

    backdrop = container.querySelector('[class*="backdrop"]');
    dialog = screen.getByRole('dialog');

    expect(backdrop?.className).not.toMatch(/backdropScrollBody/);
    expect(dialog.className).not.toMatch(/dialogScrollBody/);
    expect(dialog.className).toMatch(/scrollPaper/);
  });

  it('calls onClose with backdropClick reason when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const { container } = render(
      <Dialog isOpen onClose={handleClose}>
        Content
      </Dialog>
    );

    const backdrop = container.querySelector('[class*="backdrop"]');
    await user.click(backdrop!);

    expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'backdropClick');
  });

  it('calls onClose with escapeKeyDown reason when Escape is pressed', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Dialog isOpen onClose={handleClose}>
        Content
      </Dialog>
    );

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
  });

  it('does not call onClose when clicking inside dialog content', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Dialog isOpen onClose={handleClose}>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when backdrop is clicked and isClickOutsideDisabled is true', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const { container } = render(
      <Dialog isOpen onClose={handleClose} isClickOutsideDisabled>
        Content
      </Dialog>
    );

    const backdrop = container.querySelector('[class*="backdrop"]');
    await user.click(backdrop!);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('shows close button when showCloseButton is true', async () => {
    await act(async () => {
      render(
        <Dialog isOpen showCloseButton>
          Content
        </Dialog>
      );
    });

    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('does not show close button when showCloseButton is false', () => {
    render(
      <Dialog isOpen showCloseButton={false}>
        Content
      </Dialog>
    );

    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('calls onClose with closeButtonClick reason when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    await act(async () => {
      render(
        <Dialog isOpen showCloseButton onClose={handleClose}>
          Content
        </Dialog>
      );
    });

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));

    expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'closeButtonClick');
  });

  it('applies buttonIconCloseProps to the close button', async () => {
    await act(async () => {
      render(
        <Dialog isOpen showCloseButton buttonIconCloseProps={{ 'aria-label': 'Custom close' }}>
          Content
        </Dialog>
      );
    });

    expect(screen.getByRole('button', { name: 'Custom close' })).toBeInTheDocument();
  });

  it('calls onEntered when dialog opens', () => {
    const onEntered = vi.fn();
    render(
      <Dialog isOpen onEntered={onEntered}>
        Content
      </Dialog>
    );

    expect(onEntered).toHaveBeenCalled();
  });

  it('does not call onEntered when dialog is closed', () => {
    const onEntered = vi.fn();
    render(
      <Dialog isOpen={false} onEntered={onEntered}>
        Content
      </Dialog>
    );

    expect(onEntered).not.toHaveBeenCalled();
  });

  it('spreads paperProps onto the dialog element', () => {
    render(
      <Dialog isOpen paperProps={{ title: 'dialog-paper', className: 'custom-paper' }}>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('title', 'dialog-paper');
    expect(dialog.className).toMatch(/custom-paper/);
  });

  it('sets data-qa attribute correctly', () => {
    render(
      <Dialog isOpen data-qa="dialog-test-qa">
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-qa', 'dialog-test-qa');
  });

  it('passes data-qa to the close button', async () => {
    await act(async () => {
      render(
        <Dialog isOpen data-qa="dialog-test-qa" showCloseButton>
          Content
        </Dialog>
      );
    });

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    expect(closeButton).toHaveAttribute('data-qa', 'dialog-test-qa-close-button');
  });

  it('focuses the dialog element when opened', () => {
    const focusSpy = vi.fn();
    HTMLElement.prototype.focus = focusSpy;

    render(
      <Dialog isOpen>
        <button>First Button</button>
        <button>Second Button</button>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(focusSpy).toHaveBeenCalled();
    expect(dialog).toBeInTheDocument();
  });

  it('handles focus trapping with Tab key', async () => {
    const user = userEvent.setup();
    render(
      <Dialog isOpen>
        <button>First Button</button>
        <button>Second Button</button>
      </Dialog>
    );

    const firstButton = screen.getByText('First Button');
    const secondButton = screen.getByText('Second Button');

    expect(firstButton).toBeInTheDocument();
    expect(secondButton).toBeInTheDocument();

    await user.tab();

    await user.tab({ shift: true });

    expect(firstButton).toBeInTheDocument();
    expect(secondButton).toBeInTheDocument();
  });

  it('applies grow animation class when isEnableGrow is true and open', () => {
    render(
      <Dialog isOpen isEnableGrow>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/grow/);
  });

  it('does not apply grow animation class when isEnableGrow is false', () => {
    render(
      <Dialog isOpen isEnableGrow={false}>
        Content
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).not.toMatch(/grow/);
  });

  it('closes immediately without exit animation when isEnableGrow is true', () => {
    const { rerender } = render(
      <Dialog isOpen isEnableGrow>
        Content
      </Dialog>
    );

    let dialog: HTMLElement | null = screen.getByRole('dialog');
    expect(dialog!.className).toMatch(/grow/);

    rerender(
      <Dialog isOpen={false} isEnableGrow>
        Content
      </Dialog>
    );

    dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('immediately shows/hides dialog when isEnableGrow is false', () => {
    const { rerender } = render(
      <Dialog isOpen={false} isEnableGrow={false}>
        Content
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Dialog isOpen isEnableGrow={false}>
        Content
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <Dialog isOpen={false} isEnableGrow={false}>
        Content
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles rapid open/close transitions with grow animation', () => {
    const { rerender } = render(
      <Dialog isOpen={false} isEnableGrow>
        Content
      </Dialog>
    );

    rerender(
      <Dialog isOpen isEnableGrow>
        Content
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog').className).toMatch(/grow/);

    rerender(
      <Dialog isOpen={false} isEnableGrow>
        Content
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('maintains all other functionality when grow animation is enabled', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const { container } = render(
      <Dialog isOpen isEnableGrow onClose={handleClose}>
        Content
      </Dialog>
    );

    const backdrop = container.querySelector('[class*="backdrop"]');
    await user.click(backdrop!);

    expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'backdropClick');

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <Dialog isOpen className="custom-class">
        Content
      </Dialog>
    );

    const backdrop = container.querySelector('[class*="backdrop"]');
    expect(backdrop).toHaveClass('custom-class');
  });
});
