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
      properties: [{ key: 'prop1', value: 'value1' }],
      dpop: 'dpop-token',
      htm: 'POST',
      htu: 'https://server.example.com/token',
      jwtAtClaims: '{"sub":"user123"}',
      accessToken: 'access-token',
      accessTokenDuration: 3600,
      refreshTokenDuration: 86400,
      dpopNonceRequired: true,
      oauthClientAttestation: 'attestation-data',
      oauthClientAttestationPop: 'attestation-pop',
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

  it('should accept request with optional fields', () => {
    const requestWithOptionals: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      clientId: 'client123',
      properties: [{ key: 'prop1', value: 'value1' }],
      dpopNonceRequired: true,
    };

    const result = tokenRequestSchema.safeParse(requestWithOptionals);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithOptionals);
    }
  });

  it('should reject invalid property types', () => {
    const invalidTypes = {
      parameters: 123, // should be string
      clientId: true, // should be string
      accessTokenDuration: '3600', // should be number
      dpopNonceRequired: 'true', // should be boolean
      properties: 'not-an-array', // should be array
      clientCertificatePath: 'not-an-array', // should be array
    };

    const result = tokenRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should handle null values for optional fields', () => {
    const requestWithNulls: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      clientId: null,
      clientSecret: null,
      properties: null,
      dpopNonceRequired: null,
    };

    const result = tokenRequestSchema.safeParse(requestWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.clientId).toBeNull();
      expect(result.data.clientSecret).toBeNull();
      expect(result.data.properties).toBeNull();
      expect(result.data.dpopNonceRequired).toBeNull();
    }
  });

  it('should validate property array structure', () => {
    const invalidProperties = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: [
        {}, // valid empty property
        { key: null, value: null }, // valid null values
        { invalid: 'property' }, // valid as all fields are optional
      ],
    };

    const result = tokenRequestSchema.safeParse(invalidProperties);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toEqual([
        {},
        { key: undefined, value: undefined },
        {},
      ]);
    }
  });

  it('should handle empty arrays for array fields', () => {
    const requestWithEmptyArrays: TokenRequest = {
      parameters: 'grant_type=authorization_code&code=abc123',
      properties: [],
      clientCertificatePath: [],
    };

    const result = tokenRequestSchema.safeParse(requestWithEmptyArrays);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toEqual([]);
      expect(result.data.clientCertificatePath).toEqual([]);
    }
  });
});
