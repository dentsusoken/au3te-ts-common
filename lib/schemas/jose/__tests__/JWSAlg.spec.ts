import { describe, it, expect } from 'vitest';
import { jwsAlgSchema } from '../JWSAlg';

describe('jwsAlgSchema', () => {
  it('should validate valid JWS algorithms', () => {
    const validAlgs = [
      'none',
      'HS256',
      'HS384',
      'HS512',
      'RS256',
      'RS384',
      'RS512',
      'ES256',
      'ES384',
      'ES512',
      'PS256',
      'PS384',
      'PS512',
      'ES256K',
      'EdDSA',
    ];

    validAlgs.forEach((alg) => {
      const result = jwsAlgSchema.safeParse(alg);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(alg);
      }
    });
  });

  it('should reject invalid JWS algorithms', () => {
    const invalidAlg = 'INVALID_ALG';
    const result = jwsAlgSchema.safeParse(invalidAlg);
    expect(result.success).toBe(false);
  });

  it('should reject non-string values', () => {
    const invalidValues = [123, null, undefined, {}, []];
    invalidValues.forEach((val) => {
      const result = jwsAlgSchema.safeParse(val);
      expect(result.success).toBe(false);
    });
  });
});

