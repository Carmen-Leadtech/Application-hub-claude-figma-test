import { render, screen } from '@testing-library/react';

import { ScoreTag } from './ScoreTag';

describe('ScoreTag Component', () => {
  it('renders without crashing', () => {
    render(<ScoreTag />);

    const element = screen.getByText('0/3');

    expect(element).toBeInTheDocument();
  });

  it('renders with default progress value (0)', () => {
    render(<ScoreTag />);

    const element = screen.getByText('0/3');

    expect(element).toBeInTheDocument();
  });

  it('renders progress 1/3 correctly', () => {
    render(<ScoreTag progress={1} />);

    const element = screen.getByText('1/3');

    expect(element).toBeInTheDocument();
  });

  it('renders progress 2/3 correctly', () => {
    render(<ScoreTag progress={2} />);

    const element = screen.getByText('2/3');

    expect(element).toBeInTheDocument();
  });

  it('renders progress 3/3 correctly', () => {
    render(<ScoreTag progress={3} />);

    const element = screen.getByText('3/3');

    expect(element).toBeInTheDocument();
  });

  it('applies danger variant class for progress below 50%', () => {
    render(<ScoreTag progress={1} total={10} />);

    const element = screen.getByText('1/10');

    expect(element.className).toMatch(/danger/);
  });

  it('applies warning variant class for progress between 50% and 99%', () => {
    render(<ScoreTag progress={5} total={10} />);

    const element = screen.getByText('5/10');

    expect(element.className).toMatch(/warning/);
  });

  it('applies success variant class for progress 100%', () => {
    render(<ScoreTag progress={10} total={10} />);

    const element = screen.getByText('10/10');

    expect(element.className).toMatch(/success/);
  });

  it('applies background class by default', () => {
    render(<ScoreTag progress={2} />);

    const element = screen.getByText('2/3');

    expect(element.className).toMatch(/background/);
  });

  it('does not apply background class when hasBackground is false', () => {
    render(<ScoreTag progress={2} hasBackground={false} />);

    const element = screen.getByText('2/3');

    expect(element.className).not.toMatch(/background/);
  });

  it('applies data-qa attribute correctly', () => {
    render(<ScoreTag data-qa="test-tag" />);

    const element = screen.getByText('0/3');

    expect(element).toHaveAttribute('data-qa', 'test-tag');
  });

  it('applies id attribute correctly', () => {
    render(<ScoreTag id="my-tag" />);

    const element = screen.getByText('0/3');

    expect(element).toHaveAttribute('id', 'my-tag');
  });

  it('renders with custom total', () => {
    render(<ScoreTag progress={5} total={10} />);

    const element = screen.getByText('5/10');

    expect(element).toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    render(<ScoreTag className="custom-class" />);

    const element = screen.getByText('0/3');
    expect(element).toHaveClass('custom-class');
  });
});
