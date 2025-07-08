import { describe, expect, it } from 'vitest';
import {
  tokenIssueResponseSchema,
  type TokenIssueResponse,
} from '../TokenIssueResponse';

describe('TokenIssueResponse', () => {
  describe('success cases', () => {
    it('should parse valid token issue response with required fields', () => {
      const validResponse: TokenIssueResponse = {
        action: 'OK',
        responseContent: '{"access_token": "token123"}',
      };
      const result = tokenIssueResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    it('should parse token issue response with all fields', () => {
      const fullResponse: TokenIssueResponse = {
        action: 'OK',
        responseContent: '{"access_token": "token123"}',
        accessToken: 'access123',
        accessTokenExpiresAt: 1234567890,
        accessTokenDuration: 3600,
        refreshToken: 'refresh123',
        refreshTokenExpiresAt: 1234567890,
        refreshTokenDuration: 86400,
        clientId: 123,
        clientIdAlias: 'alias123',
        clientIdAliasUsed: true,
        clientEntityId: 'https://client.example.com',
        clientEntityIdUsed: false,
        subject: 'sub123',
        scopes: ['read', 'write'],
        properties: [{ key: 'prop1', value: 'value1' }],
        jwtAccessToken: 'jwt123',
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
        serviceAttributes: [{ key: 'service1', value: 'value1' }],
        clientAttributes: [{ key: 'client1', value: 'value1' }],
        refreshTokenScopes: ['refresh_scope1', 'refresh_scope2'],
      };
      const result = tokenIssueResponseSchema.parse(fullResponse);
      expect(result).toEqual(fullResponse);
    });

    it('should parse response with all valid action values', () => {
      const actions: TokenIssueResponse['action'][] = [
        'INTERNAL_SERVER_ERROR',
        'OK',
      ];
      actions.forEach((action) => {
        const response: TokenIssueResponse = {
          action,
          responseContent: '{"access_token": "token123"}',
        };
        const result = tokenIssueResponseSchema.parse(response);
        expect(result.action).toBe(action);
      });
    });

    it('should parse response with null values for optional fields', () => {
      const responseWithNulls = {
        action: 'OK',
        responseContent: null,
        accessToken: null,
        clientId: null,
        scopes: null,
        properties: null,
        authorizationDetails: null,
        serviceAttributes: null,
        clientAttributes: null,
        refreshTokenScopes: null,
      };
      const result = tokenIssueResponseSchema.parse(responseWithNulls);
      expect(result.responseContent).toBeNull();
      expect(result.accessToken).toBeNull();
      expect(result.clientId).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.properties).toBeNull();
      expect(result.authorizationDetails).toBeNull();
      expect(result.serviceAttributes).toBeNull();
      expect(result.clientAttributes).toBeNull();
      expect(result.refreshTokenScopes).toBeNull();
    });

    it('should parse response with empty arrays', () => {
      const responseWithEmptyArrays: TokenIssueResponse = {
        action: 'OK',
        scopes: [],
        properties: [],
        accessTokenResources: [],
        serviceAttributes: [],
        clientAttributes: [],
        refreshTokenScopes: [],
      };
      const result = tokenIssueResponseSchema.parse(responseWithEmptyArrays);
      expect(result.scopes).toEqual([]);
      expect(result.properties).toEqual([]);
      expect(result.accessTokenResources).toEqual([]);
      expect(result.serviceAttributes).toEqual([]);
      expect(result.clientAttributes).toEqual([]);
      expect(result.refreshTokenScopes).toEqual([]);
    });

    it('should parse response with valid property array structure', () => {
      const validProperties = {
        action: 'OK',
        properties: [
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2', hidden: true },
        ],
      };
      const result = tokenIssueResponseSchema.parse(validProperties);
      expect(result.properties).toEqual([
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2', hidden: true },
      ]);
    });

    it('should parse response with valid authorization details structure', () => {
      const validAuthzDetails = {
        action: 'OK',
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
      };
      const result = tokenIssueResponseSchema.parse(validAuthzDetails);
      expect(result.authorizationDetails?.elements).toHaveLength(1);
      expect(result.authorizationDetails?.elements?.[0].type).toBe('payment');
    });
  });

  describe('failure cases', () => {
    it('should fail when required action is missing', () => {
      const invalidResponse = {
        responseContent: '{"access_token": "token123"}',
      };
      const result = tokenIssueResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid action values', () => {
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
        const result = tokenIssueResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
      });
    });

    it('should fail for invalid URL fields', () => {
      const invalidUrls = {
        action: 'OK',
        clientEntityId: 'not-a-url',
        accessTokenResources: ['also-not-a-url'],
      };
      const result = tokenIssueResponseSchema.safeParse(invalidUrls);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid numeric fields', () => {
      const invalidNumbers = {
        action: 'OK',
        clientId: 'not-a-number',
        accessTokenExpiresAt: '1234567890',
        accessTokenDuration: 'invalid',
        refreshTokenExpiresAt: {},
        refreshTokenDuration: [],
      };
      const result = tokenIssueResponseSchema.safeParse(invalidNumbers);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid array fields', () => {
      const invalidArrays = {
        action: 'OK',
        scopes: 'not-an-array',
        properties: 'not-an-array',
        accessTokenResources: 'not-an-array',
        serviceAttributes: 'not-an-array',
        clientAttributes: 'not-an-array',
        refreshTokenScopes: 'not-an-array',
      };
      const result = tokenIssueResponseSchema.safeParse(invalidArrays);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid property array structure', () => {
      const invalidProperties = {
        action: 'OK',
        properties: [
          { key: 123, value: 'value1' }, // key should be string
          { key: 'key2', value: 456 }, // value should be string
        ],
      };
      const result = tokenIssueResponseSchema.safeParse(invalidProperties);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid authorization details structure', () => {
      const invalidAuthzDetails = {
        action: 'OK',
        authorizationDetails: 'not-an-object',
      };
      const result = tokenIssueResponseSchema.safeParse(invalidAuthzDetails);
      expect(result.success).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should fail for null or undefined fields', () => {
      const nullResponse = { action: null, responseContent: null };
      const result = tokenIssueResponseSchema.safeParse(nullResponse);
      expect(result.success).toBe(false);

      const undefinedResponse = {
        action: undefined,
        responseContent: undefined,
      };
      const result2 = tokenIssueResponseSchema.safeParse(undefinedResponse);
      expect(result2.success).toBe(false);
    });

    it('should parse with empty string values', () => {
      const response = {
        action: 'OK',
        responseContent: '',
        accessToken: '',
        clientIdAlias: '',
        subject: '',
        jwtAccessToken: '',
      };
      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.responseContent).toBe('');
        expect(result.data.accessToken).toBe('');
        expect(result.data.clientIdAlias).toBe('');
        expect(result.data.subject).toBe('');
        expect(result.data.jwtAccessToken).toBe('');
      }
    });

    it('should parse with long string values', () => {
      const longString = 'a'.repeat(1000);
      const response = {
        action: 'OK',
        responseContent: longString,
        accessToken: longString,
        clientIdAlias: longString,
        subject: longString,
        jwtAccessToken: longString,
      };
      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.responseContent).toBe(longString);
        expect(result.data.accessToken).toBe(longString);
        expect(result.data.clientIdAlias).toBe(longString);
        expect(result.data.subject).toBe(longString);
        expect(result.data.jwtAccessToken).toBe(longString);
      }
    });

    it('should parse with zero numeric values', () => {
      const response = {
        action: 'OK',
        clientId: 0,
        accessTokenExpiresAt: 0,
        accessTokenDuration: 0,
        refreshTokenExpiresAt: 0,
        refreshTokenDuration: 0,
      };
      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.clientId).toBe(0);
        expect(result.data.accessTokenExpiresAt).toBe(0);
        expect(result.data.accessTokenDuration).toBe(0);
        expect(result.data.refreshTokenExpiresAt).toBe(0);
        expect(result.data.refreshTokenDuration).toBe(0);
      }
    });

    it('should parse with negative numeric values', () => {
      const response = {
        action: 'OK',
        clientId: -123,
        accessTokenExpiresAt: -1234567890,
        accessTokenDuration: -3600,
        refreshTokenExpiresAt: -1234567890,
        refreshTokenDuration: -86400,
      };
      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.clientId).toBe(-123);
        expect(result.data.accessTokenExpiresAt).toBe(-1234567890);
        expect(result.data.accessTokenDuration).toBe(-3600);
        expect(result.data.refreshTokenExpiresAt).toBe(-1234567890);
        expect(result.data.refreshTokenDuration).toBe(-86400);
      }
    });

    it('should parse with large numeric values', () => {
      const response = {
        action: 'OK',
        clientId: Number.MAX_SAFE_INTEGER,
        accessTokenExpiresAt: Number.MAX_SAFE_INTEGER,
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
        refreshTokenExpiresAt: Number.MAX_SAFE_INTEGER,
        refreshTokenDuration: Number.MAX_SAFE_INTEGER,
      };
      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.clientId).toBe(Number.MAX_SAFE_INTEGER);
        expect(result.data.accessTokenExpiresAt).toBe(Number.MAX_SAFE_INTEGER);
        expect(result.data.accessTokenDuration).toBe(Number.MAX_SAFE_INTEGER);
        expect(result.data.refreshTokenExpiresAt).toBe(Number.MAX_SAFE_INTEGER);
        expect(result.data.refreshTokenDuration).toBe(Number.MAX_SAFE_INTEGER);
      }
    });
  });
});
