import { render, screen } from '@testing-library/react';

import { ScoreProgress } from './ScoreProgress';

describe('ScoreProgress Component', () => {
  it('renders without crashing', () => {
    render(<ScoreProgress />);

    const element = screen.getByRole('progressbar');

    expect(element).toBeInTheDocument();
  });

  it('renders with default progress value (0)', () => {
    render(<ScoreProgress />);

    const label = screen.getByText('0/3');

    expect(label).toBeInTheDocument();
  });

  it('renders progress 1/3 correctly', () => {
    render(<ScoreProgress progress={1} />);

    const label = screen.getByText('1/3');

    expect(label).toBeInTheDocument();
  });

  it('renders progress 2/3 correctly', () => {
    render(<ScoreProgress progress={2} />);

    const label = screen.getByText('2/3');

    expect(label).toBeInTheDocument();
  });

  it('renders progress 3/3 correctly', () => {
    render(<ScoreProgress progress={3} />);

    const label = screen.getByText('3/3');

    expect(label).toBeInTheDocument();
  });

  it('applies danger variant class for progress below 50%', () => {
    render(<ScoreProgress progress={1} total={10} />);

    const element = screen.getByRole('progressbar');

    expect(element.className).toMatch(/danger/);
  });

  it('applies warning variant class for progress between 50% and 99%', () => {
    render(<ScoreProgress progress={5} total={10} />);

    const element = screen.getByRole('progressbar');

    expect(element.className).toMatch(/warning/);
  });

  it('applies success variant class for progress 100%', () => {
    render(<ScoreProgress progress={10} total={10} />);

    const element = screen.getByRole('progressbar');

    expect(element.className).toMatch(/success/);
  });

  it('hides label when showLabel is false', () => {
    render(<ScoreProgress progress={2} showLabel={false} />);

    const label = screen.queryByText('2/3');

    expect(label).not.toBeInTheDocument();
  });

  it('shows label by default', () => {
    render(<ScoreProgress progress={2} />);

    const label = screen.getByText('2/3');

    expect(label).toBeInTheDocument();
  });

  it('applies data-qa attribute correctly', () => {
    render(<ScoreProgress data-qa="test-progress" />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('data-qa', 'test-progress');
  });

  it('applies id attribute correctly', () => {
    render(<ScoreProgress id="my-progress" />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('id', 'my-progress');
  });

  it('has correct aria attributes', () => {
    render(<ScoreProgress progress={2} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('aria-valuenow', '2');
    expect(element).toHaveAttribute('aria-valuemin', '0');
    expect(element).toHaveAttribute('aria-valuemax', '3');
    expect(element).toHaveAttribute('aria-label', 'Progress: 2 of 3');
  });

  it('renders with custom total', () => {
    render(<ScoreProgress progress={5} total={10} />);

    const label = screen.getByText('5/10');

    expect(label).toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    render(<ScoreProgress className="custom-class" />);

    const element = screen.getByRole('progressbar');
    expect(element).toHaveClass('custom-class');
  });
});
