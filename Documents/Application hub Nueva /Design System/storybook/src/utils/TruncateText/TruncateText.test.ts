import { truncateText } from './TruncateText';

describe('truncateText', () => {
  it('returns the same text when it is shorter than maxLength', () => {
    const text = 'Short text';

    expect(truncateText({ text })).toBe('Short text');
  });

  it('truncates text at the first space after maxLength', () => {
    const text = 'This is a very long text that should be truncated at a reasonable point';

    const result = truncateText({ text, maxLength: 20 });

    expect(result).toBe('This is a very long text...');
  });

  it('uses custom maxLength', () => {
    const text = 'Hello World this is a test';

    const result = truncateText({ text, maxLength: 5 });

    // maxLength=5 -> "Hello" + first space after position 5 is at position 5 (space)
    expect(result).toBe('Hello...');
  });

  it('uses custom textOverflow', () => {
    const text = 'Hello World this is a test';

    const result = truncateText({ text, maxLength: 5, textOverflow: ' [more]' });

    expect(result).toBe('Hello [more]');
  });

  it('returns full text when no space is found after maxLength', () => {
    const text = 'NoSpacesInThisVeryLongWord';

    const result = truncateText({ text, maxLength: 10 });

    expect(result).toBe('NoSpacesInThisVeryLongWord');
  });

  it('handles empty string', () => {
    expect(truncateText({ text: '' })).toBe('');
  });

  it('handles text exactly at maxLength with no trailing content', () => {
    const text = 'a'.repeat(350);

    const result = truncateText({ text });

    expect(result).toBe(text);
  });

  it('uses default maxLength of 350', () => {
    const text = 'a'.repeat(360) + ' more text';

    const result = truncateText({ text });

    expect(result).toBe('a'.repeat(360) + '...');
  });

  it('truncates at first space after maxLength boundary', () => {
    const text = 'word1 word2 word3 word4';

    const result = truncateText({ text, maxLength: 7 });

    expect(result).toBe('word1 word2...');
  });
});
