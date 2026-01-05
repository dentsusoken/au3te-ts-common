import { describe, it, expect } from 'vitest';
import { jweEncSchema } from '../JWEEnc';

describe('jweEncSchema', () => {
  it('should validate valid JWE encryption algorithms', () => {
    const validEncs = [
      'A128CBC-HS256',
      'A192CBC-HS384',
      'A256CBC-HS512',
      'A128GCM',
      'A192GCM',
      'A256GCM',
    ];

    validEncs.forEach((enc) => {
      const result = jweEncSchema.safeParse(enc);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(enc);
      }
    });
  });

  it('should reject invalid JWE encryption algorithms', () => {
    const invalidEnc = 'INVALID_ENC';
    const result = jweEncSchema.safeParse(invalidEnc);
    expect(result.success).toBe(false);
  });

  it('should reject non-string values', () => {
    const invalidValues = [123, null, undefined, {}, []];
    invalidValues.forEach((val) => {
      const result = jweEncSchema.safeParse(val);
      expect(result.success).toBe(false);
    });
  });
});

