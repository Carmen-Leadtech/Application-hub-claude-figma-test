import { getProgressWidth, getProgressPercentage, getProgressVariant } from './getProgressWidth';

describe('getProgressWidth', () => {
  it('returns minWidth when progress is 0', () => {
    expect(getProgressWidth({ progress: 0, total: 100 })).toBe('10%');
  });

  it('returns custom minWidth when progress is 0', () => {
    expect(getProgressWidth({ progress: 0, total: 100, minWidth: '5%' })).toBe('5%');
  });

  it('calculates percentage correctly', () => {
    expect(getProgressWidth({ progress: 50, total: 100 })).toBe('50%');
  });

  it('calculates 100% when progress equals total', () => {
    expect(getProgressWidth({ progress: 100, total: 100 })).toBe('100%');
  });

  it('handles progress greater than total', () => {
    expect(getProgressWidth({ progress: 150, total: 100 })).toBe('150%');
  });

  it('returns 0% when total is 0 and progress is not 0', () => {
    expect(getProgressWidth({ progress: 50, total: 0 })).toBe('0%');
  });

  it('calculates fractional percentages correctly', () => {
    expect(getProgressWidth({ progress: 1, total: 3 })).toBe('33.33333333333333%');
  });
});

describe('getProgressPercentage', () => {
  it('returns 0 when total is 0', () => {
    expect(getProgressPercentage(50, 0)).toBe(0);
  });

  it('calculates percentage correctly', () => {
    expect(getProgressPercentage(50, 100)).toBe(50);
  });

  it('returns 100 when progress equals total', () => {
    expect(getProgressPercentage(100, 100)).toBe(100);
  });

  it('handles progress greater than total', () => {
    expect(getProgressPercentage(150, 100)).toBe(150);
  });

  it('calculates fractional percentages', () => {
    expect(getProgressPercentage(1, 3)).toBeCloseTo(33.33, 1);
  });
});

describe('getProgressVariant', () => {
  it('returns danger when percentage is below 50', () => {
    expect(getProgressVariant(0)).toBe('danger');
    expect(getProgressVariant(25)).toBe('danger');
    expect(getProgressVariant(49)).toBe('danger');
  });

  it('returns warning when percentage is between 50 and 99', () => {
    expect(getProgressVariant(50)).toBe('warning');
    expect(getProgressVariant(75)).toBe('warning');
    expect(getProgressVariant(99)).toBe('warning');
  });

  it('returns success when percentage is 100 or above', () => {
    expect(getProgressVariant(100)).toBe('success');
    expect(getProgressVariant(150)).toBe('success');
  });
});
