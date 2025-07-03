import { describe, it, expect } from 'vitest';
import { credentialIssuanceOrderSchema } from '../CredentialIssuanceOrder';

describe('credentialIssuanceOrderSchema', () => {
  it('should validate a complete valid issuance order', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: '{"vct":"Diploma","sub":"79301273"}',
      issuanceDeferred: false,
      credentialDuration: 3600,
      signingKeyId: 'key-1',
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate with only required fields', () => {
    const minimalOrder = {
      requestIdentifier: 'abc123',
    };

    const result = credentialIssuanceOrderSchema.parse(minimalOrder);
    expect(result).toEqual(minimalOrder);
  });

  it('should allow null for optional fields', () => {
    const orderWithNulls = {
      requestIdentifier: 'abc123',
      credentialPayload: null,
      issuanceDeferred: null,
      credentialDuration: null,
      signingKeyId: null,
    };

    const result = credentialIssuanceOrderSchema.parse(orderWithNulls);
    expect(result).toEqual(orderWithNulls);
  });

  it('should allow undefined for optional fields', () => {
    const orderWithUndefined = {
      requestIdentifier: 'abc123',
      credentialPayload: undefined,
      issuanceDeferred: undefined,
      credentialDuration: undefined,
      signingKeyId: undefined,
    };

    const result = credentialIssuanceOrderSchema.parse(orderWithUndefined);
    expect(result).toEqual(orderWithUndefined);
  });

  it('should validate credentialDuration as number', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: 3600,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate zero credentialDuration', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: 0,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate negative credentialDuration', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: -3600,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate large credentialDuration', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: 31536000, // 1 year in seconds
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate decimal credentialDuration', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: 3600.5,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should accept complex credentialPayload as JSON string', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: JSON.stringify({
        vct: 'Diploma',
        sub: '79301273',
        family_name: 'Kawasaki',
        additional_data: {
          field1: 'value1',
          field2: ['value2', 'value3'],
        },
      }),
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate issuanceDeferred as true', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: true,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate issuanceDeferred as false', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: false,
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate signingKeyId as string', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: 'key-1',
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate complex signingKeyId', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: 'urn:ietf:params:oauth:jwk-thumbprint:sha256:abc123def456',
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should validate mixed valid and nullish fields', () => {
    const mixedOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: '{"vct":"Diploma"}',
      issuanceDeferred: null,
      credentialDuration: 3600,
      signingKeyId: undefined,
    };

    const result = credentialIssuanceOrderSchema.parse(mixedOrder);
    expect(result).toEqual(mixedOrder);
  });

  it('should validate real-world example', () => {
    const realWorldOrder = {
      requestIdentifier: 'req_1234567890abcdef',
      credentialPayload: JSON.stringify({
        vct: 'UniversityDegree',
        sub: 'did:example:1234567890abcdef',
        family_name: 'Smith',
        given_name: 'John',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science',
          major: 'Computer Science',
        },
        graduation_date: '2023-06-15',
      }),
      issuanceDeferred: false,
      credentialDuration: 15768000, // 6 months
      signingKeyId: 'key_2023_01',
    };

    const result = credentialIssuanceOrderSchema.parse(realWorldOrder);
    expect(result).toEqual(realWorldOrder);
  });

  it('should reject missing required requestIdentifier', () => {
    const invalidOrder = {
      credentialPayload: '{"vct":"Diploma"}',
      issuanceDeferred: false,
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid requestIdentifier type', () => {
    const invalidOrder = {
      requestIdentifier: 123, // number instead of string
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should validate empty requestIdentifier', () => {
    const validOrder = {
      requestIdentifier: '',
    };

    const result = credentialIssuanceOrderSchema.parse(validOrder);
    expect(result).toEqual(validOrder);
  });

  it('should reject invalid credentialPayload type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: 123, // number instead of string
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid credentialPayload as object', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: { vct: 'Diploma' }, // object instead of string
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid credentialDuration type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: '3600', // string instead of number
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid credentialDuration as boolean', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: true, // boolean instead of number
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid issuanceDeferred type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: 'true', // string instead of boolean
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid issuanceDeferred as number', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: 1, // number instead of boolean
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid signingKeyId type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: 123, // number instead of string
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject invalid signingKeyId as boolean', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: true, // boolean instead of string
    };

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidOrder = {};

    const result = credentialIssuanceOrderSchema.safeParse(invalidOrder);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialIssuanceOrderSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialIssuanceOrderSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 = credentialIssuanceOrderSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);

    const result2 = credentialIssuanceOrderSchema.safeParse(123);
    expect(result2.success).toBe(false);

    const result3 = credentialIssuanceOrderSchema.safeParse(true);
    expect(result3.success).toBe(false);

    const result4 = credentialIssuanceOrderSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
