import { render, screen, fireEvent } from '@testing-library/react';

import { Tab } from 'components/Tab/Tab';

import { Tabs } from './Tabs';

describe('Tabs component', () => {
  const tabs = [
    <Tab key="1" label="Home" />,
    <Tab key="2" label="Profile" />,
    <Tab key="3" label="Settings" />,
  ];

  test('renders all tabs', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    tabs.forEach((tab) => {
      expect(screen.getByRole('tab', { name: tab.props.label })).toBeInTheDocument();
    });
  });

  test('first tab is active by default (uncontrolled)', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    const firstTab = screen.getByRole('tab', { name: 'Home' });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a tab changes active tab (uncontrolled)', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    const secondTab = screen.getByRole('tab', { name: 'Profile' });
    fireEvent.click(secondTab);
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('keyboard navigation works with ArrowRight', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    const firstTab = screen.getByRole('tab', { name: 'Home' });
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });

    const secondTab = screen.getByRole('tab', { name: 'Profile' });
    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('keyboard navigation works with ArrowLeft', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    const firstTab = screen.getByRole('tab', { name: 'Home' });
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: 'ArrowLeft' });

    const lastTab = screen.getByRole('tab', { name: 'Settings' });
    expect(lastTab).toHaveFocus();
    expect(lastTab).toHaveAttribute('aria-selected', 'true');
  });

  test('Home and End keys move focus to first and last tab', () => {
    render(<Tabs size="S">{tabs}</Tabs>);
    const middleTab = screen.getByRole('tab', { name: 'Profile' });
    middleTab.focus();

    fireEvent.keyDown(middleTab, { key: 'Home' });
    const firstTab = screen.getByRole('tab', { name: 'Home' });
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(firstTab, { key: 'End' });
    const lastTab = screen.getByRole('tab', { name: 'Settings' });
    expect(lastTab).toHaveFocus();
    expect(lastTab).toHaveAttribute('aria-selected', 'true');
  });

  test('calls onChange when clicking a tab (controlled)', () => {
    const onChange = vi.fn();
    render(
      <Tabs size="S" value={0} onChange={onChange}>
        {tabs}
      </Tabs>
    );
    const secondTab = screen.getByRole('tab', { name: 'Profile' });
    fireEvent.click(secondTab);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  test('does not change selection without updating value (controlled)', () => {
    const onChange = vi.fn();
    render(
      <Tabs size="S" value={0} onChange={onChange}>
        {tabs}
      </Tabs>
    );
    const secondTab = screen.getByRole('tab', { name: 'Profile' });
    fireEvent.click(secondTab);

    const firstTab = screen.getByRole('tab', { name: 'Home' });
    expect(firstTab).toHaveAttribute('aria-selected', 'true'); // stays active
  });

  test('updates active tab when value prop changes (controlled)', () => {
    const { rerender } = render(
      <Tabs size="S" value={0}>
        {tabs}
      </Tabs>
    );

    rerender(
      <Tabs size="S" value={2}>
        {tabs}
      </Tabs>
    );

    const lastTab = screen.getByRole('tab', { name: 'Settings' });
    expect(lastTab).toHaveAttribute('aria-selected', 'true');
  });

  test('renders data-qa attributes correctly on parent and child tabs', () => {
    render(
      <Tabs size="S" data-qa="tabs-container">
        <Tab label="Home" data-qa="tab-home" />
        <Tab label="Profile" data-qa="tab-profile" />
        <Tab label="Settings" data-qa="tab-settings" />
      </Tabs>
    );

    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('data-qa', 'tabs-container');

    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('data-qa', 'tab-home');
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('data-qa', 'tab-profile');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
      'data-qa',
      'tab-settings'
    );
  });

  test('applies custom className prop', () => {
    render(
      <Tabs size="S" className="custom-class">
        {tabs}
      </Tabs>
    );

    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('custom-class');
  });
});
