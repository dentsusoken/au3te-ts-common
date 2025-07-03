import { describe, it, expect } from 'vitest';
import {
  credentialSingleParseResponseSchema,
  CredentialSingleParseActionEnum,
} from '../CredentialSingleParseResponse';

describe('credentialSingleParseResponseSchema', () => {
  it('should validate a successful response with complete info', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: {
        identifier: 'base64url_encoded_string',
        format: 'vc+sd-jwt',
        bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
        bindingKeys: ['{"kty":"RSA","n":"abc...","e":"AQAB"}'],
        details: '{"credential_definition":{"type":["VerifiableCredential"]}}',
      },
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a successful response with minimal info', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: {
        identifier: 'base64url_encoded_string',
        format: 'vc+sd-jwt',
      },
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a BAD_REQUEST response', () => {
    const errorResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent:
        '{"error":"invalid_request","error_description":"Invalid format"}',
    };

    const result = credentialSingleParseResponseSchema.parse(errorResponse);
    expect(result).toEqual(errorResponse);
  });

  it('should validate an UNAUTHORIZED response', () => {
    const errorResponse = {
      action: CredentialSingleParseActionEnum.UNAUTHORIZED,
      responseContent: 'Bearer error="invalid_token"',
    };

    const result = credentialSingleParseResponseSchema.parse(errorResponse);
    expect(result).toEqual(errorResponse);
  });

  it('should validate a FORBIDDEN response', () => {
    const response = {
      action: CredentialSingleParseActionEnum.FORBIDDEN,
      responseContent: JSON.stringify({
        error: 'access_denied',
        error_description: 'Verifiable Credentials feature is not enabled',
      }),
    };

    const result = credentialSingleParseResponseSchema.parse(response);
    expect(result).toEqual(response);
  });

  it('should validate an INTERNAL_SERVER_ERROR response', () => {
    const response = {
      action: CredentialSingleParseActionEnum.INTERNAL_SERVER_ERROR,
      responseContent: JSON.stringify({
        error: 'server_error',
        error_description: 'An internal error occurred',
      }),
    };

    const result = credentialSingleParseResponseSchema.parse(response);
    expect(result).toEqual(response);
  });

  it('should validate when optional fields are null', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.OK,
      responseContent: null,
      info: null,
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate when optional fields are undefined', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.OK,
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate empty responseContent string', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent: '',
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate minimal valid response', () => {
    const validResponse = {
      action: CredentialSingleParseActionEnum.OK,
    };

    const result = credentialSingleParseResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate real-world example', () => {
    const realWorldResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: {
        identifier: 'txn_123456789',
        format: 'vc+sd-jwt',
        details: JSON.stringify({
          credential_definition: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential', 'UniversityDegreeCredential'],
          },
        }),
      },
    };

    const result = credentialSingleParseResponseSchema.parse(realWorldResponse);
    expect(result).toEqual(realWorldResponse);
  });

  // Failure cases
  it('should reject missing required action field', () => {
    const invalidResponse = {
      responseContent: 'Some content',
      info: {
        identifier: 'base64url_encoded_string',
        format: 'jwt_vc_json',
      },
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject invalid action value', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
      responseContent: 'Some content',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as number', () => {
    const invalidResponse = {
      action: 123,
      responseContent: 'Some content',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as boolean', () => {
    const invalidResponse = {
      action: true,
      responseContent: 'Some content',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as null', () => {
    const invalidResponse = {
      action: null,
      responseContent: 'Some content',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as undefined', () => {
    const invalidResponse = {
      action: undefined,
      responseContent: 'Some content',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as number', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent: 123,
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as boolean', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent: true,
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as object', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent: { error: 'invalid_request' },
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as array', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.BAD_REQUEST,
      responseContent: ['error', 'invalid_request'],
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject info as number', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: 123,
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject info as boolean', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: true,
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject info as string', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: 'invalid_info',
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject info as array', () => {
    const invalidResponse = {
      action: CredentialSingleParseActionEnum.OK,
      info: ['invalid', 'info'],
    };

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidResponse = {};

    const result =
      credentialSingleParseResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialSingleParseResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialSingleParseResponseSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialSingleParseResponseSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialSingleParseResponseSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialSingleParseResponseSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialSingleParseResponseSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
