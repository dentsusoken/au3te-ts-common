import { describe, it, expect } from 'vitest';
import { jweAlgSchema } from '../JWEAlg';

describe('jweAlgSchema', () => {
  it('should validate valid JWE algorithms', () => {
    const validAlgs = [
      'RSA1_5',
      'RSA-OAEP',
      'RSA-OAEP-256',
      'A128KW',
      'A192KW',
      'A256KW',
      'dir',
      'ECDH-ES',
      'ECDH-ES+A128KW',
      'ECDH-ES+A192KW',
      'ECDH-ES+A256KW',
      'A128GCMKW',
      'A192GCMKW',
      'A256GCMKW',
      'PBES2-HS256+A128KW',
      'PBES2-HS384+A192KW',
      'PBES2-HS512+A256KW',
    ];

    validAlgs.forEach((alg) => {
      const result = jweAlgSchema.safeParse(alg);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(alg);
      }
    });
  });

  it('should reject invalid JWE algorithms', () => {
    const invalidAlg = 'INVALID_ALG';
    const result = jweAlgSchema.safeParse(invalidAlg);
    expect(result.success).toBe(false);
  });

  it('should reject non-string values', () => {
    const invalidValues = [123, null, undefined, {}, []];
    invalidValues.forEach((val) => {
      const result = jweAlgSchema.safeParse(val);
      expect(result.success).toBe(false);
    });
  });
});

