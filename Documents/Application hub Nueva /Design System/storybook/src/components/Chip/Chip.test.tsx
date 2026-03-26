import { render, screen, fireEvent } from '@testing-library/react';

import { Chip } from './Chip';

describe('Chip Component', () => {
  test('renders the chip with the correct text', () => {
    render(<Chip>Test Chip</Chip>);

    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  test('calls onClickSelectedChip when clicked and not editable', () => {
    const onClickSelectedChip = vi.fn();

    render(<Chip onClickSelectedChip={onClickSelectedChip}>Test Chip</Chip>);

    fireEvent.click(screen.getByText('Test Chip'));

    expect(onClickSelectedChip).toHaveBeenCalledTimes(1);
  });

  test('calls onClickClose when close button is clicked', () => {
    const onClickClose = vi.fn();

    render(<Chip onClickClose={onClickClose}>Test Chip</Chip>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickClose).toHaveBeenCalledTimes(1);
  });

  test('calls onBlurLabel when label loses focus', () => {
    const onBlurLabel = vi.fn();

    render(
      <Chip isEditable onBlurLabel={onBlurLabel}>
        Test Chip
      </Chip>
    );

    const label = screen.getByText('Test Chip');

    fireEvent.blur(label);

    expect(onBlurLabel).toHaveBeenCalledTimes(1);
  });

  test('calls onChangeLabel when text is edited', () => {
    const onChangeLabel = vi.fn();

    render(
      <Chip isEditable onChangeLabel={onChangeLabel}>
        Test Chip
      </Chip>
    );

    const label = screen.getByText('Test Chip');

    fireEvent.input(label, { target: { innerText: 'New Text' } });

    expect(onChangeLabel).toHaveBeenCalledTimes(1);
  });

  test('applies custom className prop', () => {
    const { container } = render(<Chip className="custom-class">Test Chip</Chip>);

    const chip = container.querySelector('[class*="root"]');
    expect(chip).toHaveClass('custom-class');
  });
});
