import { describe, it, expect } from 'vitest';
import { parseDpopToken } from '../dpopToken';

describe('parseDpopToken', () => {
  it('should return undefined for undefined input', () => {
    expect(parseDpopToken(undefined)).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    expect(parseDpopToken('')).toBeUndefined();
  });

  it('should return undefined for invalid DPoP format', () => {
    const invalidInputs = [
      'Bearer token123',
      'DPoP',
      'DPoP ',
      'NotDPoP token123',
      'DPoP token123 extra',
    ];

    invalidInputs.forEach((input) => {
      expect(parseDpopToken(input)).toBeUndefined();
    });
  });

  it('should extract token from valid DPoP format regardless of case', () => {
    const validInputs = [
      ['DPoP token123', 'token123'],
      ['dpop abc.xyz.123', 'abc.xyz.123'],
      ['DPOP myToken', 'myToken'],
      ['DpOp MY_TOKEN_123', 'MY_TOKEN_123'],
    ];

    validInputs.forEach(([input, expected]) => {
      expect(parseDpopToken(input)).toBe(expected);
    });
  });

  it('should handle DPoP with multiple spaces', () => {
    expect(parseDpopToken('DPoP    myToken   ')).toBe('myToken');
  });
});
