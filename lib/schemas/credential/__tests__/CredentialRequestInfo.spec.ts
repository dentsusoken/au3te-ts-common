import { describe, it, expect } from 'vitest';
import { credentialRequestInfoSchema } from '../CredentialRequestInfo';
import { CREDENTIAL_FORMAT_VC_SD_JWT } from '../CredentialFormat';

describe('credentialRequestInfoSchema', () => {
  it('should validate a complete valid request info', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
      bindingKeys: ['{"kty":"RSA","n":"abc...","e":"AQAB"}'],
      details: '{"credential_definition":{"type":["VerifiableCredential"]}}',
    };
    const result = credentialRequestInfoSchema.parse(validInfo);
    expect(result).toEqual(validInfo);
  });

  it('should validate with only required fields', () => {
    const minimalInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
    };
    const result = credentialRequestInfoSchema.parse(minimalInfo);
    expect(result).toEqual(minimalInfo);
  });

  it('should allow null for optional fields', () => {
    const infoWithNulls = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: null,
      bindingKeys: null,
      details: null,
    };
    const result = credentialRequestInfoSchema.parse(infoWithNulls);
    expect(result).toEqual(infoWithNulls);
  });

  it('should allow undefined for optional fields', () => {
    const infoWithUndefined = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: undefined,
      bindingKeys: undefined,
      details: undefined,
    };
    const result = credentialRequestInfoSchema.parse(infoWithUndefined);
    expect(result).toEqual(infoWithUndefined);
  });

  it('should validate bindingKeys as array of strings', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKeys: ['{"key1":"value1"}', '{"key2":"value2"}'],
    };
    const result = credentialRequestInfoSchema.parse(validInfo);
    expect(result).toEqual(validInfo);
  });

  it('should accept empty bindingKeys array', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKeys: [],
    };
    const result = credentialRequestInfoSchema.parse(validInfo);
    expect(result).toEqual(validInfo);
  });

  it('should accept complex details as JSON string', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      details: JSON.stringify({
        credential_definition: {
          type: ['VerifiableCredential', 'UniversityDegreeCredential'],
        },
        additional_data: {
          field1: 'value1',
          field2: ['value2', 'value3'],
        },
      }),
    };
    const result = credentialRequestInfoSchema.parse(validInfo);
    expect(result).toEqual(validInfo);
  });

  it('should validate mixed valid and nullish fields', () => {
    const mixedInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: undefined,
      bindingKeys: null,
      details: '{"credential_definition":{"type":["VerifiableCredential"]}}',
    };
    const result = credentialRequestInfoSchema.parse(mixedInfo);
    expect(result).toEqual(mixedInfo);
  });

  it('should validate real-world example', () => {
    const realWorldInfo = {
      identifier: 'req_1234567890abcdef',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: '{"kty":"EC","crv":"P-256","x":"...","y":"..."}',
      bindingKeys: [
        '{"kty":"EC","crv":"P-256","x":"...","y":"..."}',
        '{"kty":"RSA","n":"abc...","e":"AQAB"}',
      ],
      details: JSON.stringify({
        credential_definition: {
          type: ['VerifiableCredential', 'UniversityDegreeCredential'],
        },
        subject: {
          id: 'did:example:abcdef',
          name: 'Alice',
        },
      }),
    };
    const result = credentialRequestInfoSchema.parse(realWorldInfo);
    expect(result).toEqual(realWorldInfo);
  });

  // Failure cases
  it('should reject missing required identifier', () => {
    const invalidInfo = {
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject missing required format', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid identifier type', () => {
    const invalidInfo = {
      identifier: 123,
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should validate empty identifier', () => {
    const validInfo = {
      identifier: '',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
    };
    const result = credentialRequestInfoSchema.parse(validInfo);
    expect(result).toEqual(validInfo);
  });

  it('should reject invalid format type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: 123,
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid format value', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: 'invalid-format',
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid bindingKey type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKey: 123,
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid bindingKeys type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKeys: 'not_an_array',
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid bindingKeys element type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      bindingKeys: [123, 456],
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid details type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      details: 123,
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject invalid details as object', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: CREDENTIAL_FORMAT_VC_SD_JWT,
      details: { foo: 'bar' },
    };
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidInfo = {};
    const result = credentialRequestInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialRequestInfoSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialRequestInfoSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 = credentialRequestInfoSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialRequestInfoSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialRequestInfoSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialRequestInfoSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
