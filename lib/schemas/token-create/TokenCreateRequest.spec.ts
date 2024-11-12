import { describe, expect, it } from 'vitest';
import {
  tokenCreateRequestSchema,
  type TokenCreateRequest,
} from './TokenCreateRequest';

describe('TokenCreateRequest', () => {
  it('should accept valid token create request with required fields', () => {
    const validRequest: TokenCreateRequest = {
      grantType: 'authorization_code',
    };

    const result = tokenCreateRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should accept token create request with all fields', () => {
    const fullRequest: TokenCreateRequest = {
      grantType: 'authorization_code',
      clientId: 123456,
      subject: 'user123',
      scopes: ['read', 'write'],
      accessTokenDuration: 3600,
      refreshTokenDuration: 86400,
      properties: [{ key: 'prop1', value: 'value1' }],
      clientIdAliasUsed: true,
      clientEntityIdUsed: false,
      accessToken: 'custom-access-token',
      refreshToken: 'custom-refresh-token',
      accessTokenPersistent: true,
      certificateThumbprint: 'cert-thumb',
      dpopKeyThumbprint: 'dpop-thumb',
      authorizationDetails: {
        elements: [{ type: 'payment', actions: ['read'] }],
      },
      resources: ['https://api.example.com/v1', 'https://api.example.com/v2'],
      forExternalAttachment: true,
      jwtAtClaims: '{"custom":"claim"}',
      acr: 'urn:mace:incommon:iap:silver',
      authTime: 1615962130,
      clientIdentifier: 'client123',
    };

    const result = tokenCreateRequestSchema.safeParse(fullRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullRequest);
    }
  });

  it('should reject request without required grantType', () => {
    const invalidRequest = {};

    const result = tokenCreateRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid grant types', () => {
    const invalidRequest = {
      grantType: 'invalid_grant_type',
    };

    const result = tokenCreateRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid property types', () => {
    const invalidTypes = {
      grantType: 'authorization_code',
      clientId: '123', // should be number
      accessTokenDuration: '3600', // should be number
      clientIdAliasUsed: 'true', // should be boolean
      resources: ['not-a-url'], // should be valid URLs
      authTime: '1615962130', // should be number
    };

    const result = tokenCreateRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should handle null values for optional fields', () => {
    const requestWithNulls: TokenCreateRequest = {
      grantType: 'authorization_code',
      clientId: null,
      subject: null,
      properties: null,
      clientIdAliasUsed: null,
      authorizationDetails: null,
    };

    const result = tokenCreateRequestSchema.safeParse(requestWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.clientId).toBeNull();
      expect(result.data.subject).toBeNull();
      expect(result.data.properties).toBeNull();
      expect(result.data.clientIdAliasUsed).toBeNull();
      expect(result.data.authorizationDetails).toBeNull();
    }
  });

  it('should validate property array structure', () => {
    const requestWithProperties: TokenCreateRequest = {
      grantType: 'authorization_code',
      properties: [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
      ],
    };

    const result = tokenCreateRequestSchema.safeParse(requestWithProperties);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toEqual(requestWithProperties.properties);
    }
  });

  it('should validate resources as valid URLs', () => {
    const validRequest: TokenCreateRequest = {
      grantType: 'authorization_code',
      resources: ['https://api.example.com', 'https://auth.example.com'],
    };

    const result = tokenCreateRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should reject invalid URLs in resources', () => {
    const invalidRequest = {
      grantType: 'authorization_code',
      resources: ['not-a-url', 'also-not-a-url'],
    };

    const result = tokenCreateRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});
