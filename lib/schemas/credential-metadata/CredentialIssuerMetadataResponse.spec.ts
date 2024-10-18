import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  CredentialIssuerMetadataResponse,
  credentialIssuerMetadataResponseSchema,
} from './CredentialIssuerMetadataResponse';

describe('serviceConfigurationResponseSchema', () => {
  it('should validate a valid pushed authorization request response', () => {
    const validResponse: CredentialIssuerMetadataResponse = {
      action: 'OK',
      responseContent:
        '{"credential_issuer":"https://example.com","credential_endpoint":"https://example.com/api/credential","batch_credential_endpoint":"https://example.com/api/batch_credential","deferred_credential_endpoint":"https://example.com/api/deferred_credential","credential_response_encryption":{"alg_values_supported":["RSA-OAEP-256"],"enc_values_supported":["A128CBC-HS256"],"encryption_required":false},"credential_configurations_supported":{"org.iso.18013.5.1.mDL":{"format":"mso_mdoc","doctype":"org.iso.18013.5.1.mDL","claims":{"org.iso.18013.5.1":{"family_name":{},"given_name":{},"birth_date":{},"issue_date":{},"expiry_date":{},"issuing_country":{},"issuing_authority":{},"document_number":{},"portrait":{},"driving_privileges":{},"un_distinguishing_sign":{},"administrative_number":{},"sex":{},"height":{},"weight":{},"eye_colour":{},"hair_colour":{},"birth_place":{},"resident_address":{},"portrait_capture_date":{},"age_in_years":{},"age_birth_year":{},"issuing_jurisdiction":{},"nationality":{},"resident_city":{},"resident_state":{},"resident_postal_code":{},"resident_country":{},"family_name_national_character":{},"given_name_national_character":{},"signature_usual_mark":{}}},"scope":"org.iso.18013.5.1.mDL","cryptographic_binding_methods_supported":["jwk"],"credential_signing_alg_values_supported":["ES256"]},"IdentityCredential":{"format":"vc+sd-jwt","vct":"https://credentials.example.com/identity_credential","claims":{"family_name":{},"given_name":{},"birthdate":{}},"scope":"identity_credential","cryptographic_binding_methods_supported":["jwk"],"credential_signing_alg_values_supported":["ES256"],"display":[{"name":"Identity Credential"}]}}}',
      resultCode: 'A364001',
      resultMessage:
        '[A364001] Metadata of the credential issuer was prepared.',
    };

    const result =
      credentialIssuerMetadataResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should allow optional fields to be omitted', () => {
    const validResponse: CredentialIssuerMetadataResponse = {
      action: 'NOT_FOUND',
    };

    const result =
      credentialIssuerMetadataResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should invalidate a response with an invalid action', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };

    const result =
      credentialIssuerMetadataResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof credentialIssuerMetadataResponseSchema>;
    type ExpectedType = CredentialIssuerMetadataResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
