import { describe, it, expect } from 'vitest';
import { credentialSingleParseRequestSchema } from '../CredentialSingleParseRequest';

describe('credentialSingleParseRequestSchema', () => {
  it('should validate a complete valid request', () => {
    const validRequest = {
      accessToken: 'valid_access_token',
      requestContent: JSON.stringify({
        format: 'jwt_vc',
        types: ['VerifiableCredential'],
      }),
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a minimal valid request', () => {
    const validRequest = {
      accessToken: 'valid_access_token',
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a complex request with all fields', () => {
    const validRequest = {
      accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
      requestContent: JSON.stringify({
        format: 'jwt_vc',
        types: ['VerifiableCredential', 'UniversityDegreeCredential'],
        proof: {
          proof_type: 'jwt',
          jwt: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        credential_definition: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiableCredential', 'UniversityDegreeCredential'],
        },
      }),
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with empty strings', () => {
    const validRequest = {
      accessToken: '',
      requestContent: '',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with long access token', () => {
    const validRequest = {
      accessToken: 'a'.repeat(1000),
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with long request content', () => {
    const validRequest = {
      accessToken: 'valid_token',
      requestContent: 'a'.repeat(1000),
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with special characters in access token', () => {
    const validRequest = {
      accessToken: 'token_with_special_chars_!@#$%^&*()',
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with special characters in request content', () => {
    const validRequest = {
      accessToken: 'valid_token',
      requestContent:
        '{"format": "jwt_vc", "description": "Test with special chars: !@#$%^&*()"}',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate with unicode characters', () => {
    const validRequest = {
      accessToken: 'token_with_unicode_🎉🚀',
      requestContent:
        '{"format": "jwt_vc", "description": "Unicode test: 🎉🚀"}',
    };

    const result = credentialSingleParseRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  // Failure cases
  it('should reject missing accessToken', () => {
    const invalidRequest = {
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject missing requestContent', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject non-string accessToken', () => {
    const invalidRequest = {
      accessToken: 123,
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject non-string requestContent', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: { format: 'jwt_vc' },
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as boolean', () => {
    const invalidRequest = {
      accessToken: true,
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject requestContent as boolean', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: false,
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as null', () => {
    const invalidRequest = {
      accessToken: null,
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject requestContent as null', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: null,
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as undefined', () => {
    const invalidRequest = {
      accessToken: undefined,
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject requestContent as undefined', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: undefined,
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as object', () => {
    const invalidRequest = {
      accessToken: { token: 'value' },
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject requestContent as object', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: { format: 'jwt_vc' },
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as array', () => {
    const invalidRequest = {
      accessToken: ['token', 'value'],
      requestContent: '{"format": "jwt_vc"}',
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject requestContent as array', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: ['format', 'jwt_vc'],
    };

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidRequest = {};

    const result = credentialSingleParseRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialSingleParseRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialSingleParseRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialSingleParseRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialSingleParseRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialSingleParseRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialSingleParseRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
