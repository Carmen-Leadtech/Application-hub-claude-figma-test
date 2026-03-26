import { render, screen, fireEvent } from '@testing-library/react';

import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector Component', () => {
  test('renders the component with provided text', () => {
    render(<LanguageSelector label="English" />);

    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('applies active class when isActive is true', () => {
    render(<LanguageSelector isActive label="English" />);

    expect(screen.getByRole('button').className).toMatch(/active/);
  });

  test('does not apply active class when isActive is false', () => {
    render(<LanguageSelector isActive={false} label="English" />);

    expect(screen.getByRole('button').className).not.toMatch(/active/);
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();

    render(<LanguageSelector label="English" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className prop', () => {
    render(<LanguageSelector label="English" className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
