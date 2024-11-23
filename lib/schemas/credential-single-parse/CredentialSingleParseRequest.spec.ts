import { describe, it, expect } from 'vitest';
import { credentialSingleParseRequestSchema } from './CredentialSingleParseRequest';

describe('CredentialSingleParseRequest Schema', () => {
  // Test valid cases
  it('should validate a complete valid request', () => {
    const validRequest = {
      accessToken: 'valid_access_token',
      requestContent: JSON.stringify({
        format: 'jwt_vc',
        types: ['VerifiableCredential'],
      }),
    };

    expect(() =>
      credentialSingleParseRequestSchema.parse(validRequest)
    ).not.toThrow();
  });

  // Test required fields
  it('should require accessToken', () => {
    const invalidRequest = {
      requestContent: '{"format": "jwt_vc"}',
    };

    expect(() =>
      credentialSingleParseRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('should require requestContent', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
    };

    expect(() =>
      credentialSingleParseRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  // Test field types
  it('should reject non-string accessToken', () => {
    const invalidRequest = {
      accessToken: 123,
      requestContent: '{"format": "jwt_vc"}',
    };

    expect(() =>
      credentialSingleParseRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('should reject non-string requestContent', () => {
    const invalidRequest = {
      accessToken: 'valid_access_token',
      requestContent: { format: 'jwt_vc' },
    };

    expect(() =>
      credentialSingleParseRequestSchema.parse(invalidRequest)
    ).toThrow();
  });
});
