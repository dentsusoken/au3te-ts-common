import { describe, expect, it } from 'vitest';
import { tokenResponseSchema, type TokenResponse } from '../TokenResponse';

describe('TokenResponse', () => {
  describe('valid requests', () => {
    it('should accept minimal valid token response', () => {
      const validResponse: TokenResponse = {
        action: 'OK',
        responseContent: '{"access_token": "token123"}',
      };

      const result = tokenResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
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
        scopes: { array: ['read', 'write'] },
        properties: [{ key: 'prop1', value: 'value1' }],
        jwtAccessToken: 'jwt123',
        clientAuthMethod: 'client_secret_basic',
        resources: ['https://api.example.com'],
        accessTokenResources: ['https://api.example.com'],
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: { array: ['https://payment.example.com'] },
              actions: { array: ['execute'] },
              datatypes: { array: ['transaction'] },
            },
          ],
        },
        grantId: 'grant123',
        serviceAttributes: [{ key: 'service1', value: 'value1' }],
        clientAttributes: [{ key: 'client1', value: 'value1' }],
        audiences: { array: ['aud1', 'aud2'] },
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
        requestedIdTokenClaims: { array: ['email', 'name'] },
        dpopNonce: 'dpop123',
        refreshTokenScopes: { array: ['refresh_scope1', 'refresh_scope2'] },
      };

      const result = tokenResponseSchema.parse(fullResponse);
      expect(result).toEqual(fullResponse);
    });

    it('should accept response with null values for optional fields', () => {
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

      const result = tokenResponseSchema.parse(responseWithNulls);
      expect(result.responseContent).toBeNull();
      expect(result.username).toBeNull();
      expect(result.password).toBeNull();
      expect(result.clientId).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.properties).toBeNull();
      expect(result.authorizationDetails).toBeNull();
      expect(result.subjectTokenInfo).toBeNull();
      expect(result.actorTokenInfo).toBeNull();
    });

    it('should accept response with all valid action values', () => {
      const validActions = [
        'INVALID_CLIENT',
        'INTERNAL_SERVER_ERROR',
        'BAD_REQUEST',
        'PASSWORD',
        'OK',
        'TOKEN_EXCHANGE',
        'JWT_BEARER',
        'ID_TOKEN_REISSUABLE',
      ];

      validActions.forEach((action) => {
        const response = {
          action,
          responseContent: '{"access_token": "token123"}',
        };

        const result = tokenResponseSchema.parse(response);
        expect(result.action).toBe(action);
      });
    });

    it('should accept response with valid URL fields', () => {
      const responseWithValidUrls = {
        action: 'OK',
        clientEntityId: 'https://client.example.com',
        resources: ['https://api1.example.com', 'https://api2.example.com'],
        accessTokenResources: ['https://api.example.com'],
      };

      const result = tokenResponseSchema.parse(responseWithValidUrls);
      expect(result).toEqual(responseWithValidUrls);
    });

    it('should accept response with valid numeric fields', () => {
      const responseWithValidNumbers = {
        action: 'OK',
        clientId: 123,
        accessTokenExpiresAt: 1234567890,
        accessTokenDuration: 3600,
        refreshTokenExpiresAt: 1234567890,
        refreshTokenDuration: 86400,
        cnonceExpiresAt: 1234567890,
        cnonceDuration: 300,
      };

      const result = tokenResponseSchema.parse(responseWithValidNumbers);
      expect(result).toEqual(responseWithValidNumbers);
    });

    it('should accept response with valid array fields', () => {
      const responseWithValidArrays = {
        action: 'OK',
        scopes: { array: ['read', 'write'] },
        properties: [{ key: 'prop1', value: 'value1' }],
        resources: ['https://api.example.com'],
        accessTokenResources: ['https://api.example.com'],
        serviceAttributes: [{ key: 'service1', value: 'value1' }],
        clientAttributes: [{ key: 'client1', value: 'value1' }],
        audiences: { array: ['aud1', 'aud2'] },
        requestedIdTokenClaims: { array: ['email', 'name'] },
        refreshTokenScopes: { array: ['refresh_scope1'] },
      };

      const result = tokenResponseSchema.parse(responseWithValidArrays);
      expect(result).toEqual(responseWithValidArrays);
    });

    it('should accept response with empty arrays', () => {
      const responseWithEmptyArrays = {
        action: 'OK',
        scopes: { array: [] },
        properties: [],
        resources: [],
        accessTokenResources: [],
        serviceAttributes: [],
        clientAttributes: [],
        audiences: { array: [] },
        requestedIdTokenClaims: { array: [] },
        refreshTokenScopes: { array: [] },
      };

      const result = tokenResponseSchema.parse(responseWithEmptyArrays);
      expect(result).toEqual(responseWithEmptyArrays);
    });
  });

  describe('invalid requests', () => {
    it('should reject response without required action field', () => {
      const invalidResponse = {
        responseContent: '{"access_token": "token123"}',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid action values', () => {
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
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1);
          expect(result.error.issues[0].path).toEqual(['action']);
        }
      });
    });

    it('should reject response with non-string responseContent', () => {
      const invalidResponse = {
        action: 'OK',
        responseContent: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['responseContent']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string username', () => {
      const invalidResponse = {
        action: 'OK',
        username: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['username']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string password', () => {
      const invalidResponse = {
        action: 'OK',
        password: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['password']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string ticket', () => {
      const invalidResponse = {
        action: 'OK',
        ticket: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string accessToken', () => {
      const invalidResponse = {
        action: 'OK',
        accessToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number accessTokenExpiresAt', () => {
      const invalidResponse = {
        action: 'OK',
        accessTokenExpiresAt: '1234567890',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessTokenExpiresAt']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number accessTokenDuration', () => {
      const invalidResponse = {
        action: 'OK',
        accessTokenDuration: '3600',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string refreshToken', () => {
      const invalidResponse = {
        action: 'OK',
        refreshToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number refreshTokenExpiresAt', () => {
      const invalidResponse = {
        action: 'OK',
        refreshTokenExpiresAt: '1234567890',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenExpiresAt']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number refreshTokenDuration', () => {
      const invalidResponse = {
        action: 'OK',
        refreshTokenDuration: '86400',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string idToken', () => {
      const invalidResponse = {
        action: 'OK',
        idToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['idToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number clientId', () => {
      const invalidResponse = {
        action: 'OK',
        clientId: '123',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string clientIdAlias', () => {
      const invalidResponse = {
        action: 'OK',
        clientIdAlias: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientIdAlias']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-boolean clientIdAliasUsed', () => {
      const invalidResponse = {
        action: 'OK',
        clientIdAliasUsed: 'true',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientIdAliasUsed']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid URL in clientEntityId', () => {
      const invalidResponse = {
        action: 'OK',
        clientEntityId: 'not-a-url',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientEntityId']);
        expect(result.error.issues[0].code).toBe('invalid_string');
      }
    });

    it('should reject response with non-boolean clientEntityIdUsed', () => {
      const invalidResponse = {
        action: 'OK',
        clientEntityIdUsed: 'false',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientEntityIdUsed']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string subject', () => {
      const invalidResponse = {
        action: 'OK',
        subject: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid scopes structure', () => {
      const invalidResponse = {
        action: 'OK',
        scopes: ['read', 'write'], // Should be { array: ['read', 'write'] }
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['scopes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array properties', () => {
      const invalidResponse = {
        action: 'OK',
        properties: 'not-an-array',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['properties']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string jwtAccessToken', () => {
      const invalidResponse = {
        action: 'OK',
        jwtAccessToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['jwtAccessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid clientAuthMethod', () => {
      const invalidResponse = {
        action: 'OK',
        clientAuthMethod: 'invalid_method',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientAuthMethod']);
      }
    });

    it('should reject response with invalid URLs in resources', () => {
      const invalidResponse = {
        action: 'OK',
        resources: ['not-a-url', 'https://valid.com'],
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['resources', 0]);
        expect(result.error.issues[0].code).toBe('invalid_string');
      }
    });

    it('should reject response with invalid URLs in accessTokenResources', () => {
      const invalidResponse = {
        action: 'OK',
        accessTokenResources: ['also-not-a-url'],
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'accessTokenResources',
          0,
        ]);
        expect(result.error.issues[0].code).toBe('invalid_string');
      }
    });

    it('should reject response with invalid authorizationDetails structure', () => {
      const invalidResponse = {
        action: 'OK',
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: ['https://payment.example.com'], // Should be { array: [...] }
              actions: ['execute'], // Should be { array: [...] }
              datatypes: ['transaction'], // Should be { array: [...] }
            },
          ],
        },
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject response with non-string grantId', () => {
      const invalidResponse = {
        action: 'OK',
        grantId: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['grantId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array serviceAttributes', () => {
      const invalidResponse = {
        action: 'OK',
        serviceAttributes: 'not-an-array',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['serviceAttributes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array clientAttributes', () => {
      const invalidResponse = {
        action: 'OK',
        clientAttributes: 'not-an-array',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientAttributes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid audiences structure', () => {
      const invalidResponse = {
        action: 'OK',
        audiences: ['aud1', 'aud2'], // Should be { array: [...] }
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['audiences']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid requestedTokenType', () => {
      const invalidResponse = {
        action: 'OK',
        requestedTokenType: 'invalid_token_type',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['requestedTokenType']);
      }
    });

    it('should reject response with non-string subjectToken', () => {
      const invalidResponse = {
        action: 'OK',
        subjectToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subjectToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid subjectTokenType', () => {
      const invalidResponse = {
        action: 'OK',
        subjectTokenType: 'invalid_token_type',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subjectTokenType']);
      }
    });

    it('should reject response with non-string actorToken', () => {
      const invalidResponse = {
        action: 'OK',
        actorToken: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['actorToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid actorTokenType', () => {
      const invalidResponse = {
        action: 'OK',
        actorTokenType: 'invalid_token_type',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['actorTokenType']);
      }
    });

    it('should reject response with non-string assertion', () => {
      const invalidResponse = {
        action: 'OK',
        assertion: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['assertion']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-boolean previousRefreshTokenUsed', () => {
      const invalidResponse = {
        action: 'OK',
        previousRefreshTokenUsed: 'true',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'previousRefreshTokenUsed',
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string cnonce', () => {
      const invalidResponse = {
        action: 'OK',
        cnonce: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['cnonce']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number cnonceExpiresAt', () => {
      const invalidResponse = {
        action: 'OK',
        cnonceExpiresAt: '1234567890',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['cnonceExpiresAt']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number cnonceDuration', () => {
      const invalidResponse = {
        action: 'OK',
        cnonceDuration: '300',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['cnonceDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid requestedIdTokenClaims structure', () => {
      const invalidResponse = {
        action: 'OK',
        requestedIdTokenClaims: ['email', 'name'], // Should be { array: [...] }
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['requestedIdTokenClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string dpopNonce', () => {
      const invalidResponse = {
        action: 'OK',
        dpopNonce: 123,
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['dpopNonce']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid refreshTokenScopes structure', () => {
      const invalidResponse = {
        action: 'OK',
        refreshTokenScopes: ['refresh_scope1', 'refresh_scope2'], // Should be { array: [...] }
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenScopes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with multiple invalid fields', () => {
      const invalidResponse = {
        action: 'INVALID_ACTION',
        clientId: 'not-a-number',
        scopes: ['read', 'write'], // Wrong structure
        properties: 'not-an-array',
        accessTokenDuration: '3600',
      };

      const result = tokenResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept response with empty string values', () => {
      const responseWithEmptyStrings = {
        action: 'OK',
        responseContent: '',
        username: '',
        password: '',
        ticket: '',
        accessToken: '',
        idToken: '',
        clientIdAlias: '',
        subject: '',
        jwtAccessToken: '',
        grantId: '',
        subjectToken: '',
        actorToken: '',
        assertion: '',
        cnonce: '',
        dpopNonce: '',
      };

      const result = tokenResponseSchema.parse(responseWithEmptyStrings);
      expect(result).toEqual(responseWithEmptyStrings);
    });

    it('should accept response with zero numeric values', () => {
      const responseWithZeros = {
        action: 'OK',
        clientId: 0,
        accessTokenExpiresAt: 0,
        accessTokenDuration: 0,
        refreshTokenExpiresAt: 0,
        refreshTokenDuration: 0,
        cnonceExpiresAt: 0,
        cnonceDuration: 0,
      };

      const result = tokenResponseSchema.parse(responseWithZeros);
      expect(result).toEqual(responseWithZeros);
    });

    it('should accept response with negative numeric values', () => {
      const responseWithNegatives = {
        action: 'OK',
        clientId: -1,
        accessTokenExpiresAt: -1234567890,
        accessTokenDuration: -3600,
        refreshTokenExpiresAt: -1234567890,
        refreshTokenDuration: -86400,
        cnonceExpiresAt: -1234567890,
        cnonceDuration: -300,
      };

      const result = tokenResponseSchema.parse(responseWithNegatives);
      expect(result).toEqual(responseWithNegatives);
    });

    it('should accept response with large numeric values', () => {
      const responseWithLargeNumbers = {
        action: 'OK',
        clientId: Number.MAX_SAFE_INTEGER,
        accessTokenExpiresAt: Number.MAX_SAFE_INTEGER,
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
        refreshTokenExpiresAt: Number.MAX_SAFE_INTEGER,
        refreshTokenDuration: Number.MAX_SAFE_INTEGER,
        cnonceExpiresAt: Number.MAX_SAFE_INTEGER,
        cnonceDuration: Number.MAX_SAFE_INTEGER,
      };

      const result = tokenResponseSchema.parse(responseWithLargeNumbers);
      expect(result).toEqual(responseWithLargeNumbers);
    });

    it('should accept response with very long string values', () => {
      const longString = 'a'.repeat(1000);
      const responseWithLongStrings = {
        action: 'OK',
        responseContent: longString,
        username: longString,
        password: longString,
        ticket: longString,
        accessToken: longString,
        idToken: longString,
        clientIdAlias: longString,
        subject: longString,
        jwtAccessToken: longString,
        grantId: longString,
        subjectToken: longString,
        actorToken: longString,
        assertion: longString,
        cnonce: longString,
        dpopNonce: longString,
      };

      const result = tokenResponseSchema.parse(responseWithLongStrings);
      expect(result).toEqual(responseWithLongStrings);
    });
  });
});
