import { vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import { Toast } from './Toast';

const defaultProps = {
  children: 'Test toast message',
};

describe('Toast Component', () => {
  it('renders with default info variant', () => {
    render(<Toast {...defaultProps} />);

    expect(screen.getByText('Test toast message')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Loading info' })).toBeInTheDocument();
  });

  it('renders all variants correctly', () => {
    const variants = ['info', 'success', 'error', 'warning'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Toast variant={variant} data-qa={`toast-${variant}`}>
          {variant} message
        </Toast>
      );

      expect(screen.getByText(`${variant} message`)).toBeInTheDocument();
      const toastElement = screen.getByRole('alert');
      expect(toastElement.className).toContain(variant);

      unmount();
    });
  });

  it('renders correct icons for each variant', () => {
    const iconMap = {
      info: 'info',
      success: 'check_circle',
      error: 'close',
      warning: 'warning',
    } as const;

    Object.entries(iconMap).forEach(([variant, expectedIcon]) => {
      const { unmount } = render(
        <Toast variant={variant as keyof typeof iconMap}>{variant} message</Toast>
      );

      expect(screen.getByRole('img', { name: `Loading ${expectedIcon}` })).toBeInTheDocument();

      unmount();
    });
  });

  it('renders close button when onClose is provided', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Toast {...defaultProps} />);

    expect(screen.queryByRole('button', { name: 'Close toast' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is activated with Enter key', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    fireEvent.keyDown(closeButton, { key: 'Enter' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is activated with Space key', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    fireEvent.keyDown(closeButton, { key: ' ' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose for other keys', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    fireEvent.keyDown(closeButton, { key: 'Escape' });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies floating modifier class', () => {
    render(<Toast {...defaultProps} floating data-qa="floating-toast" />);

    const toastElement = screen.getByRole('alert');
    expect(toastElement.className).toContain('floating');
  });

  it('applies fullWidth modifier class', () => {
    render(<Toast {...defaultProps} fullWidth data-qa="fullwidth-toast" />);

    const toastElement = screen.getByRole('alert');
    expect(toastElement.className).toContain('fullWidth');
  });

  it('applies both floating and fullWidth classes together', () => {
    render(<Toast {...defaultProps} floating fullWidth data-qa="combined-toast" />);

    const toast = screen.getByRole('alert');
    expect(toast.className).toContain('floating');
    expect(toast.className).toContain('fullWidth');
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Toast
        {...defaultProps}
        id="custom-toast"
        className="custom-class"
        title="Custom title"
        data-qa="toast-with-attrs"
      />
    );

    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('id', 'custom-toast');
    expect(toast).toHaveClass('custom-class');
    expect(toast).toHaveAttribute('title', 'Custom title');
  });

  it('renders complex children content', () => {
    render(
      <Toast>
        <b>Bold message</b>
        <br />
        <span>Regular text</span>
        <a href="#test">Link</a>
      </Toast>
    );

    expect(screen.getByText('Bold message')).toBeInTheDocument();
    expect(screen.getByText('Regular text')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const handleClose = vi.fn();

    render(<Toast {...defaultProps} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: 'Close toast' });
    expect(closeButton).toHaveAttribute('aria-label', 'Close toast');
  });

  it('applies data-qa attribute correctly', () => {
    render(<Toast {...defaultProps} data-qa="test-toast" />);

    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveAttribute('data-qa', 'test-toast');
  });

  it('handles missing variant gracefully', () => {
    // @ts-expect-error - Testing invalid variant
    render(<Toast variant="invalid">Invalid variant</Toast>);

    // Should default to info variant behavior
    expect(screen.getByRole('img', { name: 'Loading info' })).toBeInTheDocument();
  });
});
