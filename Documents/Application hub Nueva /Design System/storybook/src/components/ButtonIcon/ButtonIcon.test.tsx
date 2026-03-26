import { render, screen, fireEvent } from '@testing-library/react';

import { ButtonIcon } from './ButtonIcon';

describe('ButtonIcon Component', () => {
  it('renders children correctly', () => {
    render(<ButtonIcon>🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveTextContent('🔍');
  });

  it('applies default size class', () => {
    render(<ButtonIcon>🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveClass(/root/);
  });

  it('applies small size class when size is S', () => {
    render(<ButtonIcon size="S">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveClass(/S/);
  });

  it('sets data-qa attribute if provided', () => {
    render(<ButtonIcon data-qa="search-icon">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveAttribute('data-qa', 'search-icon');
  });

  it('uses provided id and type attributes', () => {
    render(
      <ButtonIcon id="test-btn" type="submit">
        🔍
      </ButtonIcon>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('id', 'test-btn');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();

    render(<ButtonIcon onClick={handleClick}>🔍</ButtonIcon>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies extra classNames from props', () => {
    render(<ButtonIcon className="extra-class">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  it('applies variant class based on props', () => {
    render(<ButtonIcon variant="neutral">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveClass(/neutral/);
  });

  it('uses default type="button" if no type is provided', () => {
    render(<ButtonIcon>🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('forwards arbitrary props to the button', () => {
    render(<ButtonIcon aria-label="search">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'search');
  });

  it('renders with size "XS" if specified', () => {
    render(<ButtonIcon size="XS">🔍</ButtonIcon>);

    expect(screen.getByRole('button')).toHaveClass(/XS/);
  });
});
