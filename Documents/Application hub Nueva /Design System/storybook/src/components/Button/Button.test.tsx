import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies default classes (square, M, primary)', () => {
    render(<Button>Click</Button>);

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/square/);
    expect(button.className).toMatch(/primary/);
  });

  it('applies custom shape, size, and variant secondary', () => {
    render(
      <Button shape="rounded" size="S" variant="secondary">
        Click
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/rounded/);
    expect(button.className).toMatch(/S/);
    expect(button.className).toMatch(/secondary/);
  });

  it('applies custom shape, size, and variant gradient', () => {
    render(
      <Button shape="rounded" size="S" variant="gradient">
        Click
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/rounded/);
    expect(button.className).toMatch(/S/);
    expect(button.className).toMatch(/gradient/);
  });

  it('sets data-qa attribute if provided', () => {
    render(<Button data-qa="custom-qa">Click</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('data-qa', 'custom-qa');
  });

  it('sets id and type attributes correctly', () => {
    render(
      <Button id="btn-id" type="submit">
        Submit
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('id', 'btn-id');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the full-width modifier when the isFullWidth prop is received', () => {
    render(
      <Button isFullWidth shape="rounded" size="S" variant="gradient">
        Click
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/fullWidth/);
  });

  it('applies custom className prop', () => {
    render(<Button className="custom-class">Click</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
