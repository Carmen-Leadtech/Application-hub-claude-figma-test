import { render, screen, fireEvent } from '@testing-library/react';

import { AccordionCard } from './AccordionCard';

describe('AccordionCard Component', () => {
  const defaultProps = {
    'data-qa': 'test',
    id: 'test-id',
    label: 'Test Label',
  };

  it('renders the label correctly', () => {
    render(<AccordionCard {...defaultProps} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('adds the correct data-qa attributes', () => {
    const { container } = render(<AccordionCard {...defaultProps} />);

    expect(container.querySelector('[data-qa="test-card"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-icon-label"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-label"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-icons-actions"]')).toBeInTheDocument();
  });

  it('calls onClick with id when clicked', () => {
    const onClickMock = vi.fn();

    render(<AccordionCard {...defaultProps} onClick={onClickMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickMock).toHaveBeenCalledWith('test-id');
  });

  it('renders iconLabel if provided', () => {
    const icon = <span>🔥</span>;

    render(<AccordionCard {...defaultProps} iconLabel={icon} />);

    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders iconActions if provided', () => {
    const icons = (
      <>
        <span key="1">A</span>
        <span key="2">B</span>
      </>
    );

    render(<AccordionCard {...defaultProps} iconActions={icons} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    render(<AccordionCard {...defaultProps} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
