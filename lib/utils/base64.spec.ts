import { describe, it, expect } from 'vitest';
import { base64UrlDecode } from './base64';

describe('base64UrlDecode', () => {
  it('should decode a Base64URL encoded string to UTF-8', () => {
    const base64UrlEncoded = 'SGVsbG8td29ybGQ';
    const expectedDecoded = 'Hello-world';
    const decoded = base64UrlDecode(base64UrlEncoded);
    expect(decoded).toBe(expectedDecoded);
  });

  it('should handle empty string', () => {
    const base64UrlEncoded = '';
    const expectedDecoded = '';
    const decoded = base64UrlDecode(base64UrlEncoded);
    expect(decoded).toBe(expectedDecoded);
  });

  it('should throw an error for invalid Base64URL string', () => {
    const invalidBase64UrlEncoded = '!!!invalid!!!';
    expect(() => base64UrlDecode(invalidBase64UrlEncoded)).toThrow(
      'The provided string is not a valid Base64URL encoded string.'
    );
  });
});
