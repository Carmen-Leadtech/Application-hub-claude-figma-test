import { vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import { PriorityCard } from './PriorityCard';

describe('PriorityCard Component', () => {
  const defaultProps = {
    category: 'HEADLINE',
    description: 'Enhance headline with clear role, keywords, and value proposition.',
    buttonLabel: 'Fix',
  };

  it('renders category and description correctly', () => {
    render(<PriorityCard {...defaultProps} />);

    expect(screen.getByText('HEADLINE')).toBeInTheDocument();
    expect(
      screen.getByText('Enhance headline with clear role, keywords, and value proposition.')
    ).toBeInTheDocument();
  });

  it('renders default Fix button label', () => {
    render(<PriorityCard {...defaultProps} />);

    expect(screen.getByRole('button', { name: /fix/i })).toBeInTheDocument();
  });

  it('renders custom button label when provided', () => {
    render(<PriorityCard {...defaultProps} buttonLabel="Apply" />);

    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    render(<PriorityCard {...defaultProps} isActive />);

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/buttonActive/);
  });

  it('does not apply active class when isActive is false', () => {
    render(<PriorityCard {...defaultProps} isActive={false} />);

    const button = screen.getByRole('button');

    expect(button.className).not.toMatch(/buttonActive/);
  });

  it('calls onClickFix when button is clicked', () => {
    const handleClick = vi.fn();

    render(<PriorityCard {...defaultProps} onClickFix={handleClick} />);
    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data-qa attributes when provided', () => {
    render(<PriorityCard {...defaultProps} data-qa="priority" />);

    const badgeElement = screen.getByText('HEADLINE').closest('span');

    expect(badgeElement).toHaveAttribute('data-qa', 'priority-tag');
    expect(screen.getByRole('button')).toHaveAttribute('data-qa', 'priority-button');
  });

  it('does not set data-qa attributes when not provided', () => {
    render(<PriorityCard {...defaultProps} />);

    const badgeElement = screen.getByText('HEADLINE').closest('span');

    expect(badgeElement).not.toHaveAttribute('data-qa');
    expect(screen.getByRole('button')).not.toHaveAttribute('data-qa');
  });

  it('sets id attribute when provided', () => {
    const { container } = render(<PriorityCard {...defaultProps} id="test-id" />);

    expect(container.firstChild).toHaveAttribute('id', 'test-id');
  });

  it('applies custom className prop', () => {
    const { container } = render(<PriorityCard {...defaultProps} className="custom-class" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });

  it('renders with default badge icon when badgeIconName is not provided', async () => {
    render(<PriorityCard {...defaultProps} />);

    expect(screen.getByText('HEADLINE')).toBeInTheDocument();
    await expect(
      screen.findByRole('img', { name: /format_align_left|format align left/i })
    ).resolves.toBeInTheDocument();
  });

  it('renders with custom badge icon when badgeIconName prop is provided', async () => {
    render(<PriorityCard {...defaultProps} badgeIconName="title" />);

    expect(screen.getByText('HEADLINE')).toBeInTheDocument();
    await expect(
      screen.findByRole('img', { name: /loading title|^title$/i })
    ).resolves.toBeInTheDocument();
  });
});
