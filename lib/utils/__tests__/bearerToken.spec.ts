import { describe, it, expect } from 'vitest';
import { parseBearerToken } from '../bearerToken';

describe('parseBearerToken', () => {
  it('should return undefined for undefined input', () => {
    expect(parseBearerToken(undefined)).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    expect(parseBearerToken('')).toBeUndefined();
  });

  it('should return undefined for invalid Bearer format', () => {
    const invalidInputs = [
      'DPoP token123',
      'Bearer',
      'Bearer ',
      'NotBearer token123',
      'Bearer token123 extra',
      'access_token=my-token',
      'key1=value1&access_token=token',
    ];

    invalidInputs.forEach((input) => {
      expect(parseBearerToken(input)).toBeUndefined();
    });
  });

  it('should extract token from valid Bearer format regardless of case', () => {
    const validInputs = [
      ['Bearer token123', 'token123'],
      ['bearer abc.xyz.123', 'abc.xyz.123'],
      ['BEARER myToken', 'myToken'],
      ['BeArEr MY_TOKEN_123', 'MY_TOKEN_123'],
    ];

    validInputs.forEach(([input, expected]) => {
      expect(parseBearerToken(input)).toBe(expected);
    });
  });

  it('should handle Bearer with multiple spaces', () => {
    expect(parseBearerToken('Bearer    myToken   ')).toBe('myToken');
  });
});
