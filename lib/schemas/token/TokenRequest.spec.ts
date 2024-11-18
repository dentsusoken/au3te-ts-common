import { describe, expect, it } from 'vitest';
import { tokenRequestSchema, type TokenRequest } from './TokenRequest';

describe('TokenRequest', () => {
  it('should accept valid token request with required fields', () => {
    const validRequest: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
    };

    const result = tokenRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should accept token request with all fields', () => {
    const fullRequest: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      clientId: 'client123',
      clientSecret: 'secret456',
      clientCertificate: 'cert789',
      clientCertificatePath: ['cert1', 'cert2'],
      dpop: 'dpop-token',
      htm: 'POST',
      htu: 'https://server.example.com/token',
      dpopNonceRequired: true,
      oauthClientAttestation: 'attestation-data',
      oauthClientAttestationPop: 'attestation-pop',
      properties: [{ key: 'prop1', value: 'value1' }],
      jwtAtClaims: '{"sub":"user123"}',
      accessToken: 'access-token',
      accessTokenDuration: 3600,
      refreshTokenDuration: 86400,
    };

    const result = tokenRequestSchema.safeParse(fullRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullRequest);
    }
  });

  it('should reject request without required parameters', () => {
    const invalidRequest = {};

    const result = tokenRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should accept request with token-specific optional fields', () => {
    const requestWithOptionals: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: [{ key: 'prop1', value: 'value1' }],
      accessTokenDuration: 3600,
      refreshTokenDuration: 86400,
    };

    const result = tokenRequestSchema.safeParse(requestWithOptionals);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithOptionals);
    }
  });

  it('should reject invalid token-specific property types', () => {
    const invalidTypes = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: 'not-an-array',
      accessTokenDuration: '3600',
      refreshTokenDuration: '86400',
      jwtAtClaims: 123,
    };

    const result = tokenRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should handle null values for token-specific optional fields', () => {
    const requestWithNulls: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: null,
      jwtAtClaims: null,
      accessToken: null,
      accessTokenDuration: null,
      refreshTokenDuration: null,
    };

    const result = tokenRequestSchema.safeParse(requestWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithNulls);
    }
  });

  it('should validate property array structure', () => {
    const validProperties = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: [
        { key: 'key1', value: 'value1' },
        { key: null, value: null },
        {},
      ],
    };

    const result = tokenRequestSchema.safeParse(validProperties);
    expect(result.success).toBe(true);
  });
});
