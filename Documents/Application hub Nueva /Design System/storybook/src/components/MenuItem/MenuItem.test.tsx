import { render, screen, fireEvent } from '@testing-library/react';

import { MenuItem } from './MenuItem';

describe('MenuItem Component', () => {
  const defaultProps = {
    id: 'menu-item-1',
    children: 'Option 1',
    'data-qa': 'test',
  };

  test('renders the text correctly', () => {
    render(<MenuItem {...defaultProps} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('calls onClick with the id when clicked', () => {
    const handleClick = vi.fn();

    render(<MenuItem {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: /option 1/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('menu-item-1');
  });

  test('calls onClick with the id when Enter key is pressed', () => {
    const handleClick = vi.fn();

    render(<MenuItem {...defaultProps} onClick={handleClick} />);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('menu-item-1');
  });

  test('adds the active class when isActive is true', () => {
    render(<MenuItem {...defaultProps} isActive />);

    const li = screen.getByRole('button');

    expect(li.className).toMatch(/active/);
  });

  test('does not add the active class when isActive is false', () => {
    render(<MenuItem {...defaultProps} isActive={false} />);

    const li = screen.getByRole('button');

    expect(li.className).not.toMatch(/active/);
  });

  test('sets aria-current="page" when active', () => {
    render(<MenuItem {...defaultProps} isActive />);

    const li = screen.getByRole('button');

    expect(li).toHaveAttribute('aria-current', 'page');
  });

  test('does not set aria-current when not active', () => {
    render(<MenuItem {...defaultProps} isActive={false} />);

    const li = screen.getByRole('button');

    expect(li).not.toHaveAttribute('aria-current');
  });

  test('applies custom className prop', () => {
    render(<MenuItem {...defaultProps} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
