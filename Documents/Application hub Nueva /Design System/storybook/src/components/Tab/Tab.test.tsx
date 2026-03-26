import { createRef } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { Tab } from './Tab';

describe('Tab Component', () => {
  const defaultProps = {
    label: 'Home',
  };

  it('renders label correctly', () => {
    render(<Tab {...defaultProps} />);

    expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
  });

  it('applies active class when active is true', () => {
    render(<Tab {...defaultProps} active />);

    const tab = screen.getByRole('tab');
    expect(tab.className).toMatch(/tabActive/);
  });

  it('does not apply active class when active is false', () => {
    render(<Tab {...defaultProps} active={false} />);

    const tab = screen.getByRole('tab');
    expect(tab.className).not.toMatch(/tabActive/);
  });

  it('applies size S class when size is S', () => {
    render(<Tab {...defaultProps} size="S" />);

    const tab = screen.getByRole('tab');
    expect(tab.className).toMatch(/tabSizeS/);
  });

  it('applies size M class when size is M', () => {
    render(<Tab {...defaultProps} size="M" />);

    const tab = screen.getByRole('tab');
    expect(tab.className).toMatch(/tabSizeM/);
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Tab {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('tab'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data-qa attribute when provided', () => {
    render(<Tab {...defaultProps} data-qa="tab-home" />);

    expect(screen.getByRole('tab')).toHaveAttribute('data-qa', 'tab-home');
  });

  it('does not set data-qa attribute when not provided', () => {
    render(<Tab {...defaultProps} />);

    expect(screen.getByRole('tab')).not.toHaveAttribute('data-qa');
  });

  it('sets id attribute when provided', () => {
    render(<Tab {...defaultProps} id="custom-tab-id" />);

    expect(screen.getByRole('tab')).toHaveAttribute('id', 'custom-tab-id');
  });

  it('sets aria-selected attribute when provided', () => {
    render(<Tab {...defaultProps} aria-selected={true} />);

    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
  });

  it('sets aria-controls attribute when provided', () => {
    render(<Tab {...defaultProps} aria-controls="tabpanel-0" />);

    expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'tabpanel-0');
  });

  it('sets tabIndex when provided', () => {
    render(<Tab {...defaultProps} tabIndex={0} />);

    expect(screen.getByRole('tab')).toHaveAttribute('tabIndex', '0');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Tab {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('Home');
  });

  it('applies custom className when provided', () => {
    render(<Tab {...defaultProps} className="custom-class" />);

    const tab = screen.getByRole('tab');
    expect(tab.className).toMatch(/custom-class/);
  });

  it('renders as a button element', () => {
    render(<Tab {...defaultProps} />);

    const tab = screen.getByRole('tab');
    expect(tab.tagName).toBe('BUTTON');
  });

  it('has role="tab" attribute', () => {
    render(<Tab {...defaultProps} />);

    expect(screen.getByRole('tab')).toBeInTheDocument();
  });
});
