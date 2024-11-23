import { describe, it, expect } from 'vitest';
import { credentialSingleParseResponseSchema } from './CredentialSingleParseResponse';

describe('CredentialSingleParseResponse Schema', () => {
  // Test successful response
  it('should validate a successful response with complete info', () => {
    const validResponse = {
      action: 'OK',
      info: {
        identifier: 'base64url_encoded_string',
        format: 'jwt_vc_json',
        bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
        bindingKeys: ['{"kty":"RSA","n":"abc...","e":"AQAB"}'],
        details: '{"credential_definition":{"type":["VerifiableCredential"]}}',
      },
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate a successful response with minimal info', () => {
    const validResponse = {
      action: 'OK',
      info: {
        identifier: 'base64url_encoded_string',
        format: 'jwt_vc_json',
      },
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  // Test error responses
  it('should validate a BAD_REQUEST response', () => {
    const errorResponse = {
      action: 'BAD_REQUEST',
      responseContent:
        '{"error":"invalid_request","error_description":"Invalid format"}',
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(errorResponse)
    ).not.toThrow();
  });

  it('should validate an UNAUTHORIZED response', () => {
    const errorResponse = {
      action: 'UNAUTHORIZED',
      responseContent: 'Bearer error="invalid_token"',
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(errorResponse)
    ).not.toThrow();
  });

  // Test action validation
  it('should reject invalid action values', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
      responseContent: 'Some content',
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(invalidResponse)
    ).toThrow();
  });

  // Test optional fields
  it('should accept response without responseContent for OK action', () => {
    const validResponse = {
      action: 'OK',
      info: {
        identifier: 'base64url_encoded_string',
        format: 'jwt_vc_json',
      },
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should accept null values for optional fields', () => {
    const response = {
      action: 'OK',
      responseContent: null,
      info: null,
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(response)
    ).not.toThrow();
  });

  // Test required fields
  it('should require action field', () => {
    const invalidResponse = {
      responseContent: 'Some content',
      info: {
        identifier: 'base64url_encoded_string',
        format: 'jwt_vc_json',
      },
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(invalidResponse)
    ).toThrow();
  });

  // Test complex scenarios
  it('should validate FORBIDDEN response with error details', () => {
    const response = {
      action: 'FORBIDDEN',
      responseContent: JSON.stringify({
        error: 'access_denied',
        error_description: 'Verifiable Credentials feature is not enabled',
      }),
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(response)
    ).not.toThrow();
  });

  it('should validate INTERNAL_SERVER_ERROR response', () => {
    const response = {
      action: 'INTERNAL_SERVER_ERROR',
      responseContent: JSON.stringify({
        error: 'server_error',
        error_description: 'An internal error occurred',
      }),
    };

    expect(() =>
      credentialSingleParseResponseSchema.parse(response)
    ).not.toThrow();
  });
});
