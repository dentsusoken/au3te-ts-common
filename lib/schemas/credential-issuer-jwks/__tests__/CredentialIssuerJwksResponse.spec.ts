import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  CredentialIssuerJwksResponse,
  credentialIssuerJwksResponseSchema,
} from '../CredentialIssuerJwksResponse';

describe('credentialIssuerJwksResponseSchema', () => {
  it('should validate a valid response with OK action', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
      responseContent:
        '{"credential_issuer":"https://example.com","credential_endpoint":"https://example.com/api/credential","batch_credential_endpoint":"https://example.com/api/batch_credential","deferred_credential_endpoint":"https://example.com/api/deferred_credential","credential_response_encryption":{"alg_values_supported":["RSA-OAEP-256"],"enc_values_supported":["A128CBC-HS256"],"encryption_required":false},"credential_configurations_supported":{"org.iso.18013.5.1.mDL":{"format":"mso_mdoc","doctype":"org.iso.18013.5.1.mDL","claims":{"org.iso.18013.5.1":{"family_name":{},"given_name":{},"birth_date":{},"issue_date":{},"expiry_date":{},"issuing_country":{},"issuing_authority":{},"document_number":{},"portrait":{},"driving_privileges":{},"un_distinguishing_sign":{},"administrative_number":{},"sex":{},"height":{},"weight":{},"eye_colour":{},"hair_colour":{},"birth_place":{},"resident_address":{},"portrait_capture_date":{},"age_in_years":{},"age_birth_year":{},"issuing_jurisdiction":{},"nationality":{},"resident_city":{},"resident_state":{},"resident_postal_code":{},"resident_country":{},"family_name_national_character":{},"given_name_national_character":{},"signature_usual_mark":{}}},"scope":"org.iso.18013.5.1.mDL","cryptographic_binding_methods_supported":["jwk"],"credential_signing_alg_values_supported":["ES256"]},"IdentityCredential":{"format":"vc+sd-jwt","vct":"https://credentials.example.com/identity_credential","claims":{"family_name":{},"given_name":{},"birthdate":{}},"scope":"identity_credential","cryptographic_binding_methods_supported":["jwk"],"credential_signing_alg_values_supported":["ES256"],"display":[{"name":"Identity Credential"}]}}}',
      resultCode: 'A364001',
      resultMessage:
        '[A364001] Metadata of the credential issuer was prepared.',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a valid response with NOT_FOUND action', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'NOT_FOUND',
      responseContent:
        '{"error":"not_found","error_description":"Service not found"}',
      resultCode: 'A364002',
      resultMessage: '[A364002] Service not found.',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a valid response with INTERNAL_SERVER_ERROR action', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'INTERNAL_SERVER_ERROR',
      responseContent:
        '{"error":"server_error","error_description":"Internal server error"}',
      resultCode: 'A364003',
      resultMessage: '[A364003] Internal server error occurred.',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should allow optional fields to be omitted', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'NOT_FOUND',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should allow responseContent as null', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
      responseContent: null,
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should allow responseContent as undefined', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
      responseContent: undefined,
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate empty responseContent string', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
      responseContent: '',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate minimal valid response', () => {
    const validResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
    };

    const result = credentialIssuerJwksResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate real-world example', () => {
    const realWorldResponse: CredentialIssuerJwksResponse = {
      action: 'OK',
      responseContent: JSON.stringify({
        keys: [
          {
            kty: 'EC',
            crv: 'P-256',
            x: 'MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4',
            y: '4Etl6SRW2Yi70UrTvxHQuS_WRGKjqgC1jPIe3o83NxE',
            use: 'sig',
            kid: 'key-1',
            alg: 'ES256',
          },
        ],
      }),
      resultCode: 'A364001',
      resultMessage: '[A364001] JWK Set document was prepared successfully.',
    };

    const result = credentialIssuerJwksResponseSchema.parse(realWorldResponse);
    expect(result).toEqual(realWorldResponse);
  });

  // Failure cases
  it('should reject missing required action field', () => {
    const invalidResponse = {
      responseContent: '{"error":"test"}',
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject invalid action value', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as number', () => {
    const invalidResponse = {
      action: 123,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as boolean', () => {
    const invalidResponse = {
      action: true,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as null', () => {
    const invalidResponse = {
      action: null,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as undefined', () => {
    const invalidResponse = {
      action: undefined,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as number', () => {
    const invalidResponse = {
      action: 'OK',
      responseContent: 123,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as boolean', () => {
    const invalidResponse = {
      action: 'OK',
      responseContent: true,
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as object', () => {
    const invalidResponse = {
      action: 'OK',
      responseContent: { foo: 'bar' },
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as array', () => {
    const invalidResponse = {
      action: 'OK',
      responseContent: ['foo', 'bar'],
    };

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidResponse = {};

    const result =
      credentialIssuerJwksResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialIssuerJwksResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialIssuerJwksResponseSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialIssuerJwksResponseSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialIssuerJwksResponseSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialIssuerJwksResponseSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialIssuerJwksResponseSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof credentialIssuerJwksResponseSchema>;
    type ExpectedType = CredentialIssuerJwksResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
