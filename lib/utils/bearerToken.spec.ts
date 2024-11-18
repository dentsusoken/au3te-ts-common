import { describe, it, expect } from 'vitest';
import { parseBearerToken } from './bearerToken';

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

  describe('form parameters', () => {
    it('should extract access token from valid form parameters', () => {
      const validInputs = [
        'access_token=my-token',
        'key1=value1&access_token=my-token',
        'access_token=my-token&key2=value2',
        'key1=value1&access_token=my-token&key2=value2',
      ];

      validInputs.forEach((input) => {
        expect(parseBearerToken(input)).toBe('my-token');
      });
    });

    it('should handle URL encoded tokens', () => {
      const input = 'access_token=' + encodeURIComponent('token with spaces');
      expect(parseBearerToken(input)).toBe('token with spaces');
    });

    it('should return undefined when access_token is not found', () => {
      const invalidInputs = [
        'key1=value1',
        'token=abc123',
        'key1=value1&key2=value2',
      ];

      invalidInputs.forEach((input) => {
        expect(parseBearerToken(input)).toBeUndefined();
      });
    });

    it('should handle malformed input', () => {
      const inputs = [
        ['invalid=params=format', undefined], // access_tokenがないのでundefined
        ['&access_token=token', 'token'], // 先頭の & は無視される
        ['access_token=token&', 'token'], // 末尾の & は無視される
        ['=value1&access_token=token', 'token'], // 名前のない値は無視される
        ['&&access_token=token&&', 'token'], // 複数の & は無視される
        ['access_token=token1&access_token=token1', 'token1'], // 同じ値の重複は問題なし
      ];

      inputs.forEach(([input, expected]) => {
        expect(parseBearerToken(input)).toBe(expected);
      });
    });

    it('should handle empty access_token value', () => {
      const inputs = [
        'access_token=',
        'access_token',
        'key1=value1&access_token=&key2=value2',
      ];

      inputs.forEach((input) => {
        expect(parseBearerToken(input)).toBe('');
      });
    });

    it('should use first value for duplicate access_token parameters', () => {
      expect(parseBearerToken('access_token=token1&access_token=token2')).toBe(
        'token1'
      );
    });
  });
});
