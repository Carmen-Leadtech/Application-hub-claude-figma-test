import { mbToBytes } from './mbToBytes';

describe('mbToBytes', () => {
  it('converts 1 MB to bytes correctly', () => {
    expect(mbToBytes(1)).toBe(1048576);
  });

  it('converts 0 MB to 0 bytes', () => {
    expect(mbToBytes(0)).toBe(0);
  });

  it('converts 5 MB to bytes correctly', () => {
    expect(mbToBytes(5)).toBe(5242880);
  });

  it('converts decimal MB values correctly', () => {
    expect(mbToBytes(0.5)).toBe(524288);
  });

  it('converts 10 MB to bytes correctly', () => {
    expect(mbToBytes(10)).toBe(10485760);
  });
});
