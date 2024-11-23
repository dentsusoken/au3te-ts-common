import { describe, it, expect } from 'vitest';
import { credentialRequestInfoSchema } from './CredentialRequestInfo';

describe('CredentialRequestInfo Schema', () => {
  // Test valid cases
  it('should validate a complete valid request info', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
      bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
      bindingKeys: ['{"kty":"RSA","n":"abc...","e":"AQAB"}'],
      details: '{"credential_definition":{"type":["VerifiableCredential"]}}',
    };

    expect(() => credentialRequestInfoSchema.parse(validInfo)).not.toThrow();
  });

  it('should validate with only required fields', () => {
    const minimalInfo = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
    };

    expect(() => credentialRequestInfoSchema.parse(minimalInfo)).not.toThrow();
  });

  // Test required fields
  it('should require identifier', () => {
    const invalidInfo = {
      format: 'jwt_vc_json',
    };

    expect(() => credentialRequestInfoSchema.parse(invalidInfo)).toThrow();
  });

  it('should require format', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
    };

    expect(() => credentialRequestInfoSchema.parse(invalidInfo)).toThrow();
  });

  // Test optional fields
  it('should accept null for optional fields', () => {
    const infoWithNulls = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
      bindingKey: null,
      bindingKeys: null,
      details: null,
    };

    expect(() =>
      credentialRequestInfoSchema.parse(infoWithNulls)
    ).not.toThrow();
  });

  it('should accept undefined for optional fields', () => {
    const infoWithUndefined = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
      bindingKey: undefined,
      bindingKeys: undefined,
      details: undefined,
    };

    expect(() =>
      credentialRequestInfoSchema.parse(infoWithUndefined)
    ).not.toThrow();
  });

  // Test field types
  it('should validate bindingKeys as array of strings', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
      bindingKeys: ['{"key1":"value1"}', '{"key2":"value2"}'],
    };

    expect(() => credentialRequestInfoSchema.parse(validInfo)).not.toThrow();
  });

  it('should reject invalid bindingKeys type', () => {
    const invalidInfo = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
      bindingKeys: 'not_an_array',
    };

    expect(() => credentialRequestInfoSchema.parse(invalidInfo)).toThrow();
  });

  // Test with complex details
  it('should accept complex details as JSON string', () => {
    const validInfo = {
      identifier: 'base64url_encoded_string',
      format: 'jwt_vc_json',
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

    expect(() => credentialRequestInfoSchema.parse(validInfo)).not.toThrow();
  });
});
