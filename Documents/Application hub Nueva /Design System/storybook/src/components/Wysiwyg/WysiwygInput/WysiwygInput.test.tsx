import { describe, it, expect, vi } from 'vitest';

import { render, fireEvent, screen } from '@testing-library/react';

import { WysiwygInput } from './WysiwygInput';

describe('WysiwygInput', () => {
  it('renders component', () => {
    const { container } = render(<WysiwygInput />);
    expect(container.querySelector('[class*="container"]')).toBeTruthy();
  });

  it('renders format buttons', () => {
    const { container } = render(<WysiwygInput />);
    const buttons = container.querySelectorAll('[class*="button"]');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onChange when content is edited', () => {
    const handleChange = vi.fn();
    const { container } = render(<WysiwygInput onChange={handleChange} />);
    const editable = container.querySelector('[class*="input"]') as HTMLElement;
    editable.innerHTML = 'Hello';
    fireEvent.input(editable);
    expect(handleChange).toHaveBeenCalled();
  });

  it('prevents copy/cut/contextmenu when disableCopy is true', () => {
    const { container } = render(<WysiwygInput disableCopy />);
    const editable = container.querySelector('[class*="input"]') as HTMLElement;
    const copyEvent = new Event('copy', { bubbles: true, cancelable: true });
    const cutEvent = new Event('cut', { bubbles: true, cancelable: true });
    const contextMenuEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    editable.dispatchEvent(copyEvent);
    editable.dispatchEvent(cutEvent);
    editable.dispatchEvent(contextMenuEvent);
    expect(copyEvent.defaultPrevented).toBe(true);
    expect(cutEvent.defaultPrevented).toBe(true);
    expect(contextMenuEvent.defaultPrevented).toBe(true);
  });

  it('shows completeness checkmark when showCompleteness is true and value is not empty', () => {
    const { container } = render(<WysiwygInput showCompleteness value="Test" />);
    const suffix = container.querySelector('[class*="suffixVisible"]');
    expect(suffix).toBeTruthy();
  });

  it('renders asideComponent if provided', () => {
    const Aside = () => <div>Aside</div>;
    render(<WysiwygInput asideComponent={<Aside />} />);
    expect(screen.getByText('Aside')).toBeTruthy();
  });

  it('applies custom className prop', () => {
    const { container } = render(<WysiwygInput className="custom-class" />);

    const root = container.querySelector('[class*="container"]');
    expect(root).toHaveClass('custom-class');
  });
});
