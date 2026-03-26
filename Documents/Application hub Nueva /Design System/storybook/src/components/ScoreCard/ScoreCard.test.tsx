import { fireEvent, render, screen } from '@testing-library/react';

import { ScoreCard } from './ScoreCard';

describe('ScoreCard Component', () => {
  it('renders without crashing', () => {
    render(<ScoreCard headline="Test Headline" />);

    const headline = screen.getByText('Test Headline');

    expect(headline).toBeInTheDocument();
  });

  it('renders headline correctly', () => {
    render(<ScoreCard headline="My Headline" />);

    const headline = screen.getByText('My Headline');

    expect(headline).toBeInTheDocument();
  });

  it('renders progress 1/3 correctly', () => {
    render(<ScoreCard headline="Headline" progress={1} total={3} />);

    const tag = screen.getByText('1/3');

    expect(tag).toBeInTheDocument();
  });

  it('renders progress 2/3 correctly', () => {
    render(<ScoreCard headline="Headline" progress={2} total={3} />);

    const tag = screen.getByText('2/3');

    expect(tag).toBeInTheDocument();
  });

  it('renders progress 3/3 correctly', () => {
    render(<ScoreCard headline="Headline" progress={3} total={3} />);

    const tag = screen.getByText('3/3');

    expect(tag).toBeInTheDocument();
  });

  it('renders with default progress value (0)', () => {
    render(<ScoreCard headline="Headline" />);

    const tag = screen.getByText('0/3');

    expect(tag).toBeInTheDocument();
  });

  it('renders with custom total', () => {
    render(<ScoreCard headline="Headline" progress={5} total={10} />);

    const tag = screen.getByText('5/10');

    expect(tag).toBeInTheDocument();
  });

  it('renders with custom icon name', () => {
    const { container } = render(
      <ScoreCard headline="Headline" iconName="circle_chart" data-qa="test-card" />
    );

    const iconContainer = container.querySelector('[data-qa="test-card-icon"]');

    expect(iconContainer).toBeInTheDocument();
  });

  it('applies data-qa attribute correctly', () => {
    render(<ScoreCard headline="Headline" data-qa="test-card" />);

    const root = screen.getByText('Headline').closest('[data-qa="test-card"]');

    expect(root).toBeInTheDocument();
  });

  it('applies id attribute correctly', () => {
    render(<ScoreCard headline="Headline" id="my-card" />);

    const root = screen.getByText('Headline').closest('#my-card');

    expect(root).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    const { container } = render(<ScoreCard headline="Headline" className="custom-class" />);

    const root = container.querySelector('.custom-class');

    expect(root).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<ScoreCard headline="Headline" progress={2} total={3} />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('renders as a div when onClick is not provided', () => {
    render(<ScoreCard headline="Headline" data-qa="test-card" />);

    const root = screen.getByText('Headline').closest('[data-qa="test-card"]');

    expect(root?.tagName).toBe('DIV');
  });

  it('renders as a button when onClick is provided', () => {
    const handleClick = vi.fn();

    render(<ScoreCard headline="Headline" data-qa="test-card" onClick={handleClick} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();

    render(<ScoreCard headline="Headline" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
