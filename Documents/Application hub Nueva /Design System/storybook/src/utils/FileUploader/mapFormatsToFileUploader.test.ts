import { mapFormatsToFileUploader } from './mapFormatsToFileUploader';

describe('mapFormatsToFileUploader', () => {
  it('returns correct mapping for pdf format', () => {
    const result = mapFormatsToFileUploader(['pdf']);

    expect(result).toEqual({
      'application/pdf': ['.pdf'],
    });
  });

  it('returns correct mapping for doc format', () => {
    const result = mapFormatsToFileUploader(['doc']);

    expect(result).toEqual({
      'application/msword': ['.doc'],
    });
  });

  it('returns correct mapping for docx format', () => {
    const result = mapFormatsToFileUploader(['docx']);

    expect(result).toEqual({
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    });
  });

  it('returns correct mapping for multiple formats', () => {
    const result = mapFormatsToFileUploader(['pdf', 'doc', 'docx']);

    expect(result).toEqual({
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    });
  });

  it('returns empty object for empty array', () => {
    const result = mapFormatsToFileUploader([]);

    expect(result).toEqual({});
  });

  it('handles duplicate formats correctly', () => {
    const result = mapFormatsToFileUploader(['pdf', 'pdf']);

    expect(result).toEqual({
      'application/pdf': ['.pdf'],
    });
  });
});
