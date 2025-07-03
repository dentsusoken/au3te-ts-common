import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  ServiceConfigurationResponse,
  serviceConfigurationResponseSchema,
} from '../ServiceConfigurationResponse';

describe('serviceConfigurationResponseSchema', () => {
  it('should validate a valid service configuration response as JSON string', () => {
    const validResponse: ServiceConfigurationResponse = JSON.stringify({
      issuer: 'https://example.com',
      authorization_endpoint: 'https://example.com/api/authorization',
      prompt_values_supported: [
        'none',
        'login',
        'consent',
        'select_account',
        'create',
      ],
      token_endpoint: 'https://example.com/api/token',
      userinfo_endpoint: 'https://example.com/api/userinfo',
      jwks_uri: 'https://example.com/api/jwks',
      registration_endpoint: 'https://example.com/api/register',
      scopes_supported: [
        'address',
        'email',
        'openid',
        'offline_access',
        'phone',
        'profile',
        'identity_credential',
        'org.iso.18013.5.1.mDL',
      ],
      response_types_supported: [
        'none',
        'code',
        'token',
        'id_token',
        'code token',
        'code id_token',
        'id_token token',
        'code id_token token',
      ],
      response_modes_supported: [
        'query',
        'fragment',
        'form_post',
        'query.jwt',
        'fragment.jwt',
        'form_post.jwt',
        'jwt',
      ],
      grant_types_supported: [
        'authorization_code',
        'client_credentials',
        'refresh_token',
        'urn:openid:params:grant-type:ciba',
        'urn:ietf:params:oauth:grant-type:device_code',
        'urn:ietf:params:oauth:grant-type:token-exchange',
        'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'urn:ietf:params:oauth:grant-type:pre-authorized_code',
      ],
      subject_types_supported: ['public', 'pairwise'],
      id_token_signing_alg_values_supported: [
        'HS256',
        'HS512',
        'ES256',
        'HS384',
      ],
      id_token_encryption_alg_values_supported: [
        'RSA1_5',
        'RSA-OAEP',
        'RSA-OAEP-256',
        'ECDH-ES',
        'ECDH-ES+A128KW',
        'ECDH-ES+A192KW',
        'ECDH-ES+A256KW',
        'A128KW',
        'A192KW',
        'A256KW',
        'dir',
        'A128GCMKW',
        'A192GCMKW',
        'A256GCMKW',
        'PBES2-HS256+A128KW',
        'PBES2-HS384+A192KW',
        'PBES2-HS512+A256KW',
      ],
      id_token_encryption_enc_values_supported: [
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512',
        'A128GCM',
        'A192GCM',
        'A256GCM',
      ],
      userinfo_signing_alg_values_supported: [
        'HS256',
        'HS512',
        'ES256',
        'HS384',
        'none',
      ],
      userinfo_encryption_alg_values_supported: [
        'RSA1_5',
        'RSA-OAEP',
        'RSA-OAEP-256',
        'ECDH-ES',
        'ECDH-ES+A128KW',
        'ECDH-ES+A192KW',
        'ECDH-ES+A256KW',
        'A128KW',
        'A192KW',
        'A256KW',
        'dir',
        'A128GCMKW',
        'A192GCMKW',
        'A256GCMKW',
        'PBES2-HS256+A128KW',
        'PBES2-HS384+A192KW',
        'PBES2-HS512+A256KW',
      ],
      userinfo_encryption_enc_values_supported: [
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512',
        'A128GCM',
        'A192GCM',
        'A256GCM',
      ],
      request_object_signing_alg_values_supported: [
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      request_object_encryption_alg_values_supported: [
        'A192GCMKW',
        'ECDH-ES+A128KW',
        'dir',
        'A192KW',
        'A128GCMKW',
        'PBES2-HS256+A128KW',
        'PBES2-HS384+A192KW',
        'ECDH-ES+A256KW',
        'ECDH-ES+A192KW',
        'A128KW',
        'A256GCMKW',
        'A256KW',
        'ECDH-ES',
        'PBES2-HS512+A256KW',
      ],
      request_object_encryption_enc_values_supported: [
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512',
        'A128GCM',
        'A192GCM',
        'A256GCM',
      ],
      authorization_signing_alg_values_supported: [
        'HS256',
        'HS512',
        'ES256',
        'HS384',
      ],
      authorization_encryption_alg_values_supported: [
        'RSA1_5',
        'RSA-OAEP',
        'RSA-OAEP-256',
        'ECDH-ES',
        'ECDH-ES+A128KW',
        'ECDH-ES+A192KW',
        'ECDH-ES+A256KW',
        'A128KW',
        'A192KW',
        'A256KW',
        'dir',
        'A128GCMKW',
        'A192GCMKW',
        'A256GCMKW',
        'PBES2-HS256+A128KW',
        'PBES2-HS384+A192KW',
        'PBES2-HS512+A256KW',
      ],
      authorization_encryption_enc_values_supported: [
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512',
        'A128GCM',
        'A192GCM',
        'A256GCM',
      ],
      token_endpoint_auth_methods_supported: [
        'none',
        'client_secret_basic',
        'client_secret_post',
        'client_secret_jwt',
        'private_key_jwt',
        'tls_client_auth',
        'self_signed_tls_client_auth',
      ],
      token_endpoint_auth_signing_alg_values_supported: [
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      display_values_supported: ['page', 'popup', 'touch', 'wap'],
      claim_types_supported: ['normal'],
      claims_supported: [
        'sub',
        'website',
        'zoneinfo',
        'email_verified',
        'birthdate',
        'address',
        'gender',
        'profile',
        'phone_number_verified',
        'preferred_username',
        'given_name',
        'middle_name',
        'locale',
        'picture',
        'updated_at',
        'name',
        'nickname',
        'phone_number',
        'family_name',
        'email',
      ],
      claims_parameter_supported: true,
      request_parameter_supported: true,
      request_uri_parameter_supported: true,
      require_request_uri_registration: true,
      revocation_endpoint: 'https://example.com/api/revocation',
      revocation_endpoint_auth_methods_supported: [],
      revocation_endpoint_auth_signing_alg_values_supported: [
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      introspection_endpoint: 'https://example.com/api/introspection',
      introspection_endpoint_auth_methods_supported: [],
      introspection_endpoint_auth_signing_alg_values_supported: [
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      code_challenge_methods_supported: ['plain', 'S256'],
      tls_client_certificate_bound_access_tokens: false,
      backchannel_token_delivery_modes_supported: ['poll', 'ping', 'push'],
      backchannel_authentication_endpoint:
        'https://example.com/api/backchannel/authentication',
      backchannel_authentication_request_signing_alg_values_supported: [
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      backchannel_user_code_parameter_supported: false,
      device_authorization_endpoint:
        'https://example.com/api/device/authorization',
      pushed_authorization_request_endpoint: 'https://example.com/api/par',
      require_pushed_authorization_requests: false,
      authorization_details_types_supported: ['openid_credential'],
      dpop_signing_alg_values_supported: [
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'ES256',
        'ES384',
        'ES512',
        'ES256K',
        'EdDSA',
      ],
      require_signed_request_object: false,
      authorization_response_iss_parameter_supported: true,
      grant_management_action_required: false,
      grant_management_actions_supported: [
        'create',
        'merge',
        'query',
        'replace',
        'revoke',
      ],
      grant_management_endpoint: 'https://example.com/api/grant',
      transformed_claims_functions_supported: [
        'all',
        'any',
        'contains',
        'ends_with',
        'eq',
        'get',
        'gt',
        'gte',
        'hash',
        'lt',
        'lte',
        'match',
        'none',
        'starts_with',
        'years_ago',
      ],
      introspection_signing_alg_values_supported: [
        'HS256',
        'HS512',
        'ES256',
        'HS384',
        'none',
      ],
      introspection_encryption_alg_values_supported: [
        'RSA1_5',
        'RSA-OAEP',
        'RSA-OAEP-256',
        'ECDH-ES',
        'ECDH-ES+A128KW',
        'ECDH-ES+A192KW',
        'ECDH-ES+A256KW',
        'A128KW',
        'A192KW',
        'A256KW',
        'dir',
        'A128GCMKW',
        'A192GCMKW',
        'A256GCMKW',
        'PBES2-HS256+A128KW',
        'PBES2-HS384+A192KW',
        'PBES2-HS512+A256KW',
      ],
      introspection_encryption_enc_values_supported: [
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512',
        'A128GCM',
        'A192GCM',
        'A256GCM',
      ],
      organization_name: 'Dentsusoken',
      request_authentication_signing_alg_values_supported: ['ES256'],
      'pre-authorized_grant_anonymous_access_supported': false,
    });

    const result = serviceConfigurationResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a minimal service configuration response', () => {
    const minimalResponse: ServiceConfigurationResponse = JSON.stringify({
      issuer: 'https://example.com',
      authorization_endpoint: 'https://example.com/api/authorization',
      token_endpoint: 'https://example.com/api/token',
      userinfo_endpoint: 'https://example.com/api/userinfo',
      jwks_uri: 'https://example.com/api/jwks',
    });

    const result = serviceConfigurationResponseSchema.parse(minimalResponse);
    expect(result).toEqual(minimalResponse);
  });

  it('should validate an empty string', () => {
    const emptyResponse: ServiceConfigurationResponse = '';

    const result = serviceConfigurationResponseSchema.parse(emptyResponse);
    expect(result).toEqual(emptyResponse);
  });

  it('should validate a simple string', () => {
    const simpleResponse: ServiceConfigurationResponse = 'Hello, World!';

    const result = serviceConfigurationResponseSchema.parse(simpleResponse);
    expect(result).toEqual(simpleResponse);
  });

  it('should validate a JSON string with special characters', () => {
    const specialResponse: ServiceConfigurationResponse = JSON.stringify({
      message: 'Hello, World! 🎉',
      unicode: '🎉🚀✨',
      special_chars: '!@#$%^&*()',
    });

    const result = serviceConfigurationResponseSchema.parse(specialResponse);
    expect(result).toEqual(specialResponse);
  });

  it('should validate a long string', () => {
    const longResponse: ServiceConfigurationResponse = 'a'.repeat(10000);

    const result = serviceConfigurationResponseSchema.parse(longResponse);
    expect(result).toEqual(longResponse);
  });

  it('should validate a string with newlines and whitespace', () => {
    const multilineResponse: ServiceConfigurationResponse = `{
      "issuer": "https://example.com",
      "authorization_endpoint": "https://example.com/api/authorization"
    }`;

    const result = serviceConfigurationResponseSchema.parse(multilineResponse);
    expect(result).toEqual(multilineResponse);
  });

  it('should validate real-world OpenID Connect configuration', () => {
    const realWorldResponse: ServiceConfigurationResponse = JSON.stringify({
      issuer: 'https://accounts.google.com',
      authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_endpoint: 'https://oauth2.googleapis.com/token',
      userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
      jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
      response_types_supported: [
        'code',
        'token',
        'id_token',
        'code token',
        'code id_token',
        'id_token token',
        'code id_token token',
      ],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'email', 'profile'],
      token_endpoint_auth_methods_supported: [
        'client_secret_post',
        'client_secret_basic',
      ],
      claims_supported: [
        'aud',
        'email',
        'email_verified',
        'exp',
        'family_name',
        'given_name',
        'iat',
        'iss',
        'locale',
        'name',
        'picture',
        'sub',
      ],
    });

    const result = serviceConfigurationResponseSchema.parse(realWorldResponse);
    expect(result).toEqual(realWorldResponse);
  });

  // Failure cases
  it('should reject non-string values', () => {
    const invalidResponses = [
      null,
      undefined,
      123,
      true,
      false,
      {},
      [],
      { issuer: 'https://example.com' },
    ];

    invalidResponses.forEach((invalidResponse) => {
      const result =
        serviceConfigurationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });

  it('should reject null', () => {
    const result = serviceConfigurationResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined', () => {
    const result = serviceConfigurationResponseSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject number', () => {
    const result = serviceConfigurationResponseSchema.safeParse(123);
    expect(result.success).toBe(false);
  });

  it('should reject boolean', () => {
    const result1 = serviceConfigurationResponseSchema.safeParse(true);
    expect(result1.success).toBe(false);
    const result2 = serviceConfigurationResponseSchema.safeParse(false);
    expect(result2.success).toBe(false);
  });

  it('should reject object', () => {
    const result = serviceConfigurationResponseSchema.safeParse({
      issuer: 'https://example.com',
    });
    expect(result.success).toBe(false);
  });

  it('should reject array', () => {
    const result = serviceConfigurationResponseSchema.safeParse([
      'issuer',
      'https://example.com',
    ]);
    expect(result.success).toBe(false);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof serviceConfigurationResponseSchema>;
    type ExpectedType = ServiceConfigurationResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
