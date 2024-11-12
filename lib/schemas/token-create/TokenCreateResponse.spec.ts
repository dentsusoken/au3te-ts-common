import { describe, expect, it } from 'vitest';
import {
  tokenCreateResponseSchema,
  type TokenCreateResponse,
} from './TokenCreateResponse';

describe('TokenCreateResponse', () => {
  it('should accept valid token create response with required fields', () => {
    const validResponse: TokenCreateResponse = {
      action: 'OK',
    };

    const result = tokenCreateResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should accept token create response with all fields', () => {
    const fullResponse: TokenCreateResponse = {
      action: 'OK',
      grantType: 'authorization_code',
      clientId: 123,
      subject: 'sub123',
      scopes: ['read', 'write'],
      accessToken: 'access123',
      tokenType: 'Bearer',
      expiresIn: 3600,
      expiresAt: 1234567890,
      refreshToken: 'refresh123',
      properties: [{ key: 'prop1', value: 'value1' }],
      jwtAccessToken: 'jwt123',
      authorizationDetails: {
        elements: [
          {
            type: 'payment',
            locations: ['https://payment.example.com'],
            actions: ['execute'],
            datatypes: ['transaction'],
          },
        ],
      },
      forExternalAttachment: true,
      tokenId: 'token123',
      refreshTokenScopes: ['refresh_scope1', 'refresh_scope2'],
      clientIdentifier: 'client123',
    };

    const result = tokenCreateResponseSchema.safeParse(fullResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullResponse);
    }
  });

  it('should reject response without required action', () => {
    const invalidResponse = {};

    const result = tokenCreateResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should handle null values as undefined for optional fields', () => {
    const responseWithNulls = {
      action: 'OK',
      grantType: null,
      clientId: null,
      subject: null,
      scopes: null,
      properties: null,
      authorizationDetails: null,
      forExternalAttachment: null,
      refreshTokenScopes: null,
    };

    const result = tokenCreateResponseSchema.safeParse(responseWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.grantType).toBeUndefined();
      expect(result.data.clientId).toBeUndefined();
      expect(result.data.subject).toBeUndefined();
      expect(result.data.scopes).toBeUndefined();
      expect(result.data.properties).toBeUndefined();
      expect(result.data.authorizationDetails).toBeUndefined();
      expect(result.data.forExternalAttachment).toBeUndefined();
      expect(result.data.refreshTokenScopes).toBeUndefined();
    }
  });

  it('should reject invalid action values', () => {
    const invalidActions = [
      'INVALID_ACTION',
      'ok',
      '',
      123,
      null,
      undefined,
      {},
      [],
    ];

    invalidActions.forEach((action) => {
      const response = {
        action,
      };

      const result = tokenCreateResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  it('should validate numeric fields', () => {
    const invalidNumbers = {
      action: 'OK',
      clientId: 'not-a-number',
      expiresIn: '3600',
      expiresAt: 'invalid',
    };

    const result = tokenCreateResponseSchema.safeParse(invalidNumbers);
    expect(result.success).toBe(false);
  });

  it('should validate array fields', () => {
    const invalidArrays = {
      action: 'OK',
      scopes: 'not-an-array',
      properties: 'not-an-array',
      refreshTokenScopes: 'not-an-array',
    };

    const result = tokenCreateResponseSchema.safeParse(invalidArrays);
    expect(result.success).toBe(false);
  });

  it('should validate authorization details structure', () => {
    const validResponse: TokenCreateResponse = {
      action: 'OK',
      authorizationDetails: {
        elements: [
          {
            type: 'payment',
            actions: ['read', 'write'],
            locations: ['https://api.example.com'],
            datatypes: ['transaction'],
          },
        ],
      },
    };

    const result = tokenCreateResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate grant type values', () => {
    const invalidGrantType = {
      action: 'OK',
      grantType: 'invalid_grant_type',
    };

    const result = tokenCreateResponseSchema.safeParse(invalidGrantType);
    expect(result.success).toBe(false);
  });
});
