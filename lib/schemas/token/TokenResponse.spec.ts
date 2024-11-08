import { describe, expect, it } from 'vitest';
import { tokenResponseSchema, type TokenResponse } from './TokenResponse';

describe('TokenResponse', () => {
  it('should accept valid token response with required fields', () => {
    const validResponse: TokenResponse = {
      action: 'OK',
      responseContent: '{"access_token": "token123"}',
    };

    const result = tokenResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should accept token response with all fields', () => {
    const fullResponse: TokenResponse = {
      action: 'OK',
      responseContent: '{"access_token": "token123"}',
      username: 'user123',
      password: 'pass123',
      ticket: 'ticket123',
      accessToken: 'access123',
      accessTokenExpiresAt: 1234567890,
      accessTokenDuration: 3600,
      refreshToken: 'refresh123',
      refreshTokenExpiresAt: 1234567890,
      refreshTokenDuration: 86400,
      idToken: 'id123',
      grantType: 'authorization_code',
      clientId: 123,
      clientIdAlias: 'alias123',
      clientIdAliasUsed: true,
      clientEntityId: 'https://client.example.com',
      clientEntityIdUsed: false,
      subject: 'sub123',
      scopes: ['read', 'write'],
      properties: [{ key: 'prop1', value: 'value1' }],
      jwtAccessToken: 'jwt123',
      clientAuthMethod: 'client_secret_basic',
      resources: ['https://api.example.com'],
      accessTokenResources: ['https://api.example.com'],
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
      grantId: 'grant123',
      serviceAttributes: [{ key: 'service1', value: 'value1' }],
      clientAttributes: [{ key: 'client1', value: 'value1' }],
      audiences: ['aud1', 'aud2'],
      requestedTokenType: 'urn:ietf:params:oauth:token-type:access_token',
      subjectToken: 'subject123',
      subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
      subjectTokenInfo: {
        clientId: 456,
        subject: 'sub456',
        scopes: [{ name: 'scope1' }],
      },
      actorToken: 'actor123',
      actorTokenType: 'urn:ietf:params:oauth:token-type:access_token',
      actorTokenInfo: {
        clientId: 789,
        subject: 'sub789',
        scopes: [{ name: 'scope2' }],
      },
      assertion: 'assertion123',
      previousRefreshTokenUsed: true,
      cnonce: 'cnonce123',
      cnonceExpiresAt: 1234567890,
      cnonceDuration: 300,
      requestedIdTokenClaims: ['email', 'name'],
      dpopNonce: 'dpop123',
      refreshTokenScopes: ['refresh_scope1', 'refresh_scope2'],
    };

    const result = tokenResponseSchema.safeParse(fullResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullResponse);
    }
  });

  it('should reject response without required action', () => {
    const invalidResponse = {
      responseContent: '{"access_token": "token123"}',
    };

    const result = tokenResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should handle null values as undefined for optional fields', () => {
    const responseWithNulls = {
      action: 'OK',
      responseContent: null,
      username: null,
      password: null,
      clientId: null,
      scopes: null,
      properties: null,
      authorizationDetails: null,
      subjectTokenInfo: null,
      actorTokenInfo: null,
    };

    const result = tokenResponseSchema.safeParse(responseWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.responseContent).toBeUndefined();
      expect(result.data.username).toBeUndefined();
      expect(result.data.password).toBeUndefined();
      expect(result.data.clientId).toBeUndefined();
      expect(result.data.scopes).toBeUndefined();
      expect(result.data.properties).toBeUndefined();
      expect(result.data.authorizationDetails).toBeUndefined();
      expect(result.data.subjectTokenInfo).toBeUndefined();
      expect(result.data.actorTokenInfo).toBeUndefined();
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
        responseContent: '{"access_token": "token123"}',
      };

      const result = tokenResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  it('should validate URL fields', () => {
    const invalidUrls = {
      action: 'OK',
      clientEntityId: 'not-a-url',
      resources: ['not-a-url', 'https://valid.com'],
      accessTokenResources: ['also-not-a-url'],
    };

    const result = tokenResponseSchema.safeParse(invalidUrls);
    expect(result.success).toBe(false);
  });

  it('should validate numeric fields', () => {
    const invalidNumbers = {
      action: 'OK',
      clientId: 'not-a-number',
      accessTokenExpiresAt: '1234567890',
      accessTokenDuration: 'invalid',
      refreshTokenExpiresAt: {},
      refreshTokenDuration: [],
      cnonceExpiresAt: 'invalid',
      cnonceDuration: 'invalid',
    };

    const result = tokenResponseSchema.safeParse(invalidNumbers);
    expect(result.success).toBe(false);
  });

  it('should validate array fields', () => {
    const invalidArrays = {
      action: 'OK',
      scopes: 'not-an-array',
      properties: 'not-an-array',
      resources: 'not-an-array',
      accessTokenResources: 'not-an-array',
      serviceAttributes: 'not-an-array',
      clientAttributes: 'not-an-array',
      audiences: 'not-an-array',
      requestedIdTokenClaims: 'not-an-array',
      refreshTokenScopes: 'not-an-array',
    };

    const result = tokenResponseSchema.safeParse(invalidArrays);
    expect(result.success).toBe(false);
  });
});
