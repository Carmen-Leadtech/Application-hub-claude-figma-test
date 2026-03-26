import { PasteTextCleaner } from './PasteTextCleaner';

describe('PasteTextCleaner', () => {
  it('returns the same text when it contains only valid characters', () => {
    const text = 'Hello World 123';

    expect(PasteTextCleaner(text)).toBe('Hello World 123');
  });

  it('converts smart single quotes to standard quotes', () => {
    const text = '\u2018Hello\u2019';

    expect(PasteTextCleaner(text)).toBe("'Hello'");
  });

  it('converts smart double quotes to standard quotes', () => {
    const text = '\u201CHello\u201D';

    expect(PasteTextCleaner(text)).toBe('"Hello"');
  });

  it('removes invalid/special characters', () => {
    const text = 'Hello\x00World';

    expect(PasteTextCleaner(text)).toBe('HelloWorld');
  });

  it('preserves punctuation marks', () => {
    const text = 'Hello, World! How are you? Fine: thanks.';

    expect(PasteTextCleaner(text)).toBe('Hello, World! How are you? Fine: thanks.');
  });

  it('preserves currency symbols', () => {
    const text = '$100 €50 £30';

    expect(PasteTextCleaner(text)).toBe('$100 €50 £30');
  });

  it('preserves newlines', () => {
    const text = 'Line 1\nLine 2\nLine 3';

    expect(PasteTextCleaner(text)).toBe('Line 1\nLine 2\nLine 3');
  });

  it('preserves special punctuation characters', () => {
    const text = 'Test (brackets) [square] {curly} "quotes" \'apostrophe\'';

    expect(PasteTextCleaner(text)).toBe('Test (brackets) [square] {curly} "quotes" \'apostrophe\'');
  });

  it('preserves math operators', () => {
    const text = '1 + 2 - 3 * 4 = 5 < 6 > 7';

    expect(PasteTextCleaner(text)).toBe('1 + 2 - 3 * 4 = 5 < 6 > 7');
  });

  it('preserves percentage and hash symbols', () => {
    const text = '50% off #sale';

    expect(PasteTextCleaner(text)).toBe('50% off #sale');
  });

  it('handles empty string', () => {
    expect(PasteTextCleaner('')).toBe('');
  });

  it('preserves accented characters', () => {
    const text = 'Café résumé naïve';

    expect(PasteTextCleaner(text)).toBe('Café résumé naïve');
  });

  it('preserves Spanish special characters', () => {
    const text = '¿Qué tal? ¡Hola! año';

    expect(PasteTextCleaner(text)).toBe('¿Qué tal? ¡Hola! año');
  });
});
