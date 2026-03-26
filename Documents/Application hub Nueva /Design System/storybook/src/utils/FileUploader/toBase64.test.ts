import { toBase64 } from './toBase64';

describe('toBase64', () => {
  it('converts a file to base64 string', async () => {
    const content = 'Hello, World!';
    const file = new File([content], 'test.txt', { type: 'text/plain' });

    const result = await toBase64(file);

    // 'Hello, World!' in base64 is 'SGVsbG8sIFdvcmxkIQ=='
    expect(result).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  it('converts an empty file to empty base64 string', async () => {
    const file = new File([''], 'empty.txt', { type: 'text/plain' });

    const result = await toBase64(file);

    expect(result).toBe('');
  });

  it('converts a binary file to base64', async () => {
    const bytes = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    const file = new File([bytes], 'binary.bin', { type: 'application/octet-stream' });

    const result = await toBase64(file);

    expect(result).toBe('AAECAw==');
  });

  it('rejects when FileReader encounters an error', async () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    const originalFileReader = global.FileReader;
    const mockError = new Error('Read error');

    class MockFileReader {
      onerror: ((error: Error) => void) | null = null;
      onloadend: (() => void) | null = null;
      result: string | null = null;

      readAsDataURL() {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror(mockError);
          }
        }, 0);
      }

      get error() {
        return mockError;
      }
    }

    global.FileReader = MockFileReader as unknown as typeof FileReader;

    await expect(toBase64(file)).rejects.toEqual(mockError);

    global.FileReader = originalFileReader;
  });
});
