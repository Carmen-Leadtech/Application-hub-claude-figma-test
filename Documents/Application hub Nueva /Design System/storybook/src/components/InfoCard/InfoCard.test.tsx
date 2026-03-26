import { render, screen } from '@testing-library/react';

import { Icon } from 'components/Icon/Icon';

import { InfoCard } from './InfoCard';

describe('InfoCard Component', () => {
  const defaultProps = {
    content: 'This is a test content for the info card.',
  };

  it('renders without crashing', () => {
    render(<InfoCard {...defaultProps} />);

    const content = screen.getByText('This is a test content for the info card.');

    expect(content).toBeInTheDocument();
  });

  it('renders default title correctly', () => {
    render(<InfoCard {...defaultProps} />);

    const title = screen.getByText('Why it matters');

    expect(title).toBeInTheDocument();
  });

  it('renders custom title correctly', () => {
    render(<InfoCard {...defaultProps} title="Custom Title" />);

    const title = screen.getByText('Custom Title');

    expect(title).toBeInTheDocument();
  });

  it('renders content correctly', () => {
    render(<InfoCard content="Custom content text" />);

    const content = screen.getByText('Custom content text');

    expect(content).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const { container } = render(
      <InfoCard {...defaultProps} image={<Icon name="bar_chart" />} data-qa="test-card" />
    );

    const imageContainer = container.querySelector('[data-qa="test-card-image"]');

    expect(imageContainer).toBeInTheDocument();
  });

  it('does not render image container when image is not provided', () => {
    const { container } = render(<InfoCard {...defaultProps} data-qa="test-card" />);

    const imageContainer = container.querySelector('[data-qa="test-card-image"]');

    expect(imageContainer).not.toBeInTheDocument();
  });

  it('renders with default icon (warning)', () => {
    const { container } = render(<InfoCard {...defaultProps} data-qa="test-card" />);

    const iconContainer = container.querySelector('[data-qa="test-card-icon"]');

    expect(iconContainer).toBeInTheDocument();
  });

  it('renders with custom icon name', () => {
    const { container } = render(
      <InfoCard {...defaultProps} iconName="info" data-qa="test-card" />
    );

    const iconContainer = container.querySelector('[data-qa="test-card-icon"]');

    expect(iconContainer).toBeInTheDocument();
  });

  it('applies data-qa attribute correctly', () => {
    render(<InfoCard {...defaultProps} data-qa="test-card" />);

    const root = screen
      .getByText('This is a test content for the info card.')
      .closest('[data-qa="test-card"]');

    expect(root).toBeInTheDocument();
  });

  it('applies data-qa attributes to sub-elements correctly', () => {
    const { container } = render(<InfoCard {...defaultProps} data-qa="test-card" />);

    expect(container.querySelector('[data-qa="test-card-header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-icon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-title"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-content"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-text"]')).toBeInTheDocument();
  });

  it('applies id attribute correctly', () => {
    render(<InfoCard {...defaultProps} id="my-card" />);

    const root = screen.getByText('This is a test content for the info card.').closest('#my-card');

    expect(root).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    const { container } = render(<InfoCard {...defaultProps} className="custom-class" />);

    const root = container.querySelector('.custom-class');

    expect(root).toBeInTheDocument();
  });

  it('renders header section correctly', () => {
    const { container } = render(<InfoCard {...defaultProps} data-qa="test-card" />);

    const header = container.querySelector('[data-qa="test-card-header"]');

    expect(header).toBeInTheDocument();
  });

  it('renders content section correctly', () => {
    const { container } = render(<InfoCard {...defaultProps} data-qa="test-card" />);

    const content = container.querySelector('[data-qa="test-card-content"]');

    expect(content).toBeInTheDocument();
  });

  it('renders with image and content together', () => {
    const { container } = render(
      <InfoCard {...defaultProps} image={<Icon name="bar_chart" />} data-qa="test-card" />
    );

    const imageContainer = container.querySelector('[data-qa="test-card-image"]');
    const text = container.querySelector('[data-qa="test-card-text"]');

    expect(imageContainer).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
