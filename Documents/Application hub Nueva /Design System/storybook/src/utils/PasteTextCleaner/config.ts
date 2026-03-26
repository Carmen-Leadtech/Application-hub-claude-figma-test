export const VALID_CHARS_REGEX = [
  '\\p{L}+', // Letters
  '[%.,:;/#%&\'()"^`´*\\-+\\[\\]{}¨_!¡¿?=<>«»·]', // Punctuation (no unnecessary escapes)
  '\\p{Sc}+', // Currency symbols
  '[0-9]', // numbers
  ' ', // space
  '\\n', // new line
].join('|');
