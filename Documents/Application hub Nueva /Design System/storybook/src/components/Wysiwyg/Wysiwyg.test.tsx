import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Wysiwyg, WysiwygProps } from './Wysiwyg';

const defaultProps: WysiwygProps = {
  variant: 'light',
  helperText: 'This is helper text',
  defaultValue: '<p>Initial value</p>',
  asideComponent: <div>Aside</div>,
  onChange: vi.fn(),
  styles: {},
  inputId: 'wysiwyg-input',
  inputProps: {},
  initialFormatOption: 'paragraph',
  isMobile: false,
  disableCopy: false,
  showCompleteness: false,
  'data-qa': 'wysiwyg',
  'data-tm-event-label': 'label',
  'data-tm-event-category': 'category',
  'data-tm-type': 'type',
};

describe('Wysiwyg', () => {
  it('renders helper text', () => {
    render(<Wysiwyg {...defaultProps} />);
    expect(screen.getByText(/helper text/i)).toBeInTheDocument();
  });

  it('renders aside component', () => {
    render(<Wysiwyg {...defaultProps} />);
    expect(screen.getByText('Aside')).toBeInTheDocument();
  });

  it('passes correct props to WysiwygInput', () => {
    const { container } = render(<Wysiwyg {...defaultProps} />);
    const wysiwygInput = container.querySelector('[class*="input"]') as HTMLElement;
    expect(wysiwygInput).toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    const { container } = render(<Wysiwyg {...defaultProps} className="custom-class" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });
});
