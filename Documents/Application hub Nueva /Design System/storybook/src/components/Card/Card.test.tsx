import { render, screen, fireEvent } from '@testing-library/react';

import { Card } from './Card';

describe('Card Component', () => {
  const defaultProps = {
    'data-qa': 'test',
    id: 'test-id',
    label: 'Test Card Label',
  };

  it('renders the label correctly', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText('Test Card Label')).toBeInTheDocument();
  });

  it('adds the correct data-qa attributes', () => {
    const { container } = render(<Card {...defaultProps} />);

    expect(container.querySelector('[data-qa="test-card-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-icon-label"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-label"]')).toBeInTheDocument();
    expect(container.querySelector('[data-qa="test-card-icons-actions"]')).toBeInTheDocument();
  });

  it('calls onClick with id when clicked', () => {
    const onClickMock = vi.fn();

    render(<Card {...defaultProps} onClick={onClickMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickMock).toHaveBeenCalledWith('test-id');
  });

  it('renders iconLabel if provided', () => {
    const icon = <span>🔥</span>;

    render(<Card {...defaultProps} iconLabel={icon} />);

    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders iconActions if provided', () => {
    const icons = (
      <>
        <span key="1">A</span>
        <span key="2">B</span>
      </>
    );

    render(<Card {...defaultProps} iconActions={icons} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    render(<Card {...defaultProps} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
