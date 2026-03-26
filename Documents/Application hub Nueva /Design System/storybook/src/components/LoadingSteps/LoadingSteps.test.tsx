import { render, screen } from '@testing-library/react';

import { LoadingSteps } from './LoadingSteps';

describe('LoadingSteps Component', () => {
  it('renders provided steps', () => {
    render(
      <LoadingSteps
        steps={[
          'Preparing our best design templates...',
          'Fine-tuning our professional content generator...',
          'Launching our resume builder...',
        ]}
      />
    );

    expect(screen.getByText('Preparing our best design templates...')).toBeInTheDocument();
    expect(
      screen.getByText('Fine-tuning our professional content generator...')
    ).toBeInTheDocument();
    expect(screen.getByText('Launching our resume builder...')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(<LoadingSteps steps={['One']} />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.className).toMatch(/root/);
  });

  it('sets data-qa and id attributes', () => {
    render(
      <LoadingSteps
        data-qa="loading-steps"
        id="loading-steps"
        aria-label="Loading steps"
        steps={['One']}
      />
    );

    const root = screen.getByLabelText('Loading steps');
    expect(root).toHaveAttribute('data-qa', 'loading-steps');
    expect(root).toHaveAttribute('id', 'loading-steps');
  });

  it('renders custom steps', () => {
    render(<LoadingSteps steps={['One', 'Two']} />);

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});
