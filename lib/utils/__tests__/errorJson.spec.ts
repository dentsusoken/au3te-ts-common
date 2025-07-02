import { describe, it, expect } from 'vitest';
import { errorJson } from '../errorJson';

describe('errorJson', () => {
  // Test basic error response creation
  it('should create a valid error JSON with code and message', () => {
    const result = errorJson('invalid_request', 'Missing parameter');
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: 'Missing parameter',
    });

    expect(result).toBe(expected);
  });

  // Test with empty strings
  it('should handle empty strings', () => {
    const result = errorJson('', '');
    const expected = JSON.stringify({
      error: '',
      error_description: '',
    });

    expect(result).toBe(expected);
  });

  // Test with special characters
  it('should properly escape special characters', () => {
    const result = errorJson(
      'invalid_request',
      'Error message with "quotes" and \\ backslash'
    );
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: 'Error message with "quotes" and \\ backslash',
    });

    expect(result).toBe(expected);
  });
});
