import { render, screen } from '@testing-library/react';

import { ScoreDonut } from './ScoreDonut';

describe('ScoreDonut Component', () => {
  it('renders without crashing', () => {
    render(<ScoreDonut score={5} />);

    const scoreText = screen.getByText('5');
    expect(scoreText).toBeInTheDocument();
  });

  it('displays the correct score', () => {
    render(<ScoreDonut score={9} />);

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('shows the label by default', () => {
    render(<ScoreDonut score={7} />);

    expect(screen.getByText('Your score is 7 out of 10')).toBeInTheDocument();
  });

  it('hides the label when showLabel is false', () => {
    render(<ScoreDonut score={7} showLabel={false} />);

    expect(screen.queryByText('Your score is 7 out of 10')).not.toBeInTheDocument();
  });

  it('displays custom label text when provided', () => {
    render(<ScoreDonut score={9} labelText="Great job!" />);

    expect(screen.getByText('Great job!')).toBeInTheDocument();
    expect(screen.queryByText('Your score is 9 out of 10')).not.toBeInTheDocument();
  });

  it('clamps score to minimum 0', () => {
    render(<ScoreDonut score={-5} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Your score is 0 out of 10')).toBeInTheDocument();
  });

  it('clamps score to maximum 10', () => {
    render(<ScoreDonut score={15} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Your score is 10 out of 10')).toBeInTheDocument();
  });

  it('applies custom size correctly', () => {
    const { container } = render(<ScoreDonut score={5} size={120} />);

    const chart = container.querySelector('[class*="chart"]');
    expect(chart).toHaveStyle({ width: '120px', height: '120px' });
  });

  it('applies data-qa correctly', () => {
    const { container } = render(<ScoreDonut score={5} data-qa="test-chart" />);

    const element = container.querySelector('[class*="root"]');
    expect(element).toHaveAttribute('data-qa', 'test-chart');
  });

  it('applies data-qa to label with suffix when data-qa is provided', () => {
    const { container } = render(<ScoreDonut score={5} data-qa="test-chart" />);

    const label = container.querySelector('[data-qa="test-chart-label"]');
    expect(label).toBeInTheDocument();
  });

  it('applies default data-qa to label when data-qa is not provided', () => {
    const { container } = render(<ScoreDonut score={5} />);

    const label = container.querySelector('[data-qa="score-donut-label"]');
    expect(label).toBeInTheDocument();
  });

  it('applies id correctly', () => {
    const { container } = render(<ScoreDonut score={5} id="my-chart" />);

    const element = container.querySelector('[class*="root"]');
    expect(element).toHaveAttribute('id', 'my-chart');
  });

  it('renders SVG with progress circle', () => {
    const { container } = render(<ScoreDonut score={5} />);

    const svg = container.querySelector('[class*="svg"]');
    const progressCircle = container.querySelector('[class*="progress"]');
    const backgroundCircle = container.querySelector('[class*="background"]');

    expect(svg).toBeInTheDocument();
    expect(progressCircle).toBeInTheDocument();
    expect(backgroundCircle).toBeInTheDocument();
  });

  describe('Chart variants', () => {
    it('applies danger variant for score 0-4', () => {
      const { container } = render(<ScoreDonut score={3} />);

      const element = container.querySelector('[class*="root"]');
      expect(element?.className).toMatch(/danger/);
    });

    it('applies warning variant for score 5-8', () => {
      const { container } = render(<ScoreDonut score={6} />);

      const element = container.querySelector('[class*="root"]');
      expect(element?.className).toMatch(/warning/);
    });

    it('applies success variant for score 9-10', () => {
      const { container } = render(<ScoreDonut score={9} />);

      const element = container.querySelector('[class*="root"]');
      expect(element?.className).toMatch(/success/);
    });

    it('applies success variant for score 10', () => {
      const { container } = render(<ScoreDonut score={10} />);

      const element = container.querySelector('[class*="root"]');
      expect(element?.className).toMatch(/success/);
    });
  });

  it('rounds decimal scores', () => {
    render(<ScoreDonut score={7.6} />);

    expect(screen.getByText('8')).toBeInTheDocument();
  });

  describe('Two digits styling', () => {
    it('applies two-digits class for score 10', () => {
      const { container } = render(<ScoreDonut score={10} />);

      const scoreElement = container.querySelector('[class*="value"]');
      expect(scoreElement?.className).toMatch(/valueTwoDigits/);
    });

    it('does not apply two-digits class for single digit scores', () => {
      const { container } = render(<ScoreDonut score={9} />);

      const scoreElement = container.querySelector('[class*="value"]');
      expect(scoreElement?.className).not.toMatch(/valueTwoDigits/);
    });
  });

  it('applies custom className prop', () => {
    const { container } = render(<ScoreDonut score={5} className="custom-class" />);

    const root = container.querySelector('[class*="root"]');
    expect(root).toHaveClass('custom-class');
  });
});
