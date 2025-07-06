import { describe, expect, it } from 'vitest';
import {
  tokenCreateResponseSchema,
  type TokenCreateResponse,
} from '../TokenCreateResponse';

describe('TokenCreateResponse', () => {
  describe('valid requests', () => {
    it('should accept minimal valid token create response', () => {
      const validResponse: TokenCreateResponse = {
        action: 'OK',
      };

      const result = tokenCreateResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
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

      const result = tokenCreateResponseSchema.parse(fullResponse);
      expect(result).toEqual(fullResponse);
    });

    it('should accept response with all valid action values', () => {
      const validActions = [
        'INTERNAL_SERVER_ERROR',
        'BAD_REQUEST',
        'FORBIDDEN',
        'OK',
      ];

      validActions.forEach((action) => {
        const response = {
          action,
        };

        const result = tokenCreateResponseSchema.parse(response);
        expect(result.action).toBe(action);
      });
    });

    it('should accept response with valid string fields', () => {
      const responseWithStrings: TokenCreateResponse = {
        action: 'OK',
        grantType: 'authorization_code',
        subject: 'sub123',
        accessToken: 'access123',
        tokenType: 'Bearer',
        refreshToken: 'refresh123',
        jwtAccessToken: 'jwt123',
        tokenId: 'token123',
        clientIdentifier: 'client123',
      };

      const result = tokenCreateResponseSchema.parse(responseWithStrings);
      expect(result).toEqual(responseWithStrings);
    });

    it('should accept response with valid numeric fields', () => {
      const responseWithNumbers: TokenCreateResponse = {
        action: 'OK',
        clientId: 123,
        expiresIn: 3600,
        expiresAt: 1234567890,
      };

      const result = tokenCreateResponseSchema.parse(responseWithNumbers);
      expect(result).toEqual(responseWithNumbers);
    });

    it('should accept response with valid boolean fields', () => {
      const responseWithBooleans: TokenCreateResponse = {
        action: 'OK',
        forExternalAttachment: true,
      };

      const result = tokenCreateResponseSchema.parse(responseWithBooleans);
      expect(result).toEqual(responseWithBooleans);
    });

    it('should accept response with valid array fields', () => {
      const responseWithArrays: TokenCreateResponse = {
        action: 'OK',
        scopes: ['read', 'write', 'admin'],
        properties: [
          { key: 'prop1', value: 'value1' },
          { key: 'prop2', value: 'value2' },
        ],
        refreshTokenScopes: ['refresh_scope1'],
      };

      const result = tokenCreateResponseSchema.parse(responseWithArrays);
      expect(result).toEqual(responseWithArrays);
    });

    it('should accept response with valid authorization details', () => {
      const responseWithAuthzDetails: TokenCreateResponse = {
        action: 'OK',
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: ['https://payment.example.com'],
              actions: ['read', 'write'],
              datatypes: ['transaction'],
            },
            {
              type: 'account',
              actions: ['read'],
            },
          ],
        },
      };

      const result = tokenCreateResponseSchema.parse(responseWithAuthzDetails);
      expect(result).toEqual(responseWithAuthzDetails);
    });

    it('should accept response with null values for optional fields', () => {
      const responseWithNulls = {
        action: 'OK',
        grantType: null,
        clientId: null,
        subject: null,
        scopes: null,
        accessToken: null,
        tokenType: null,
        expiresIn: null,
        expiresAt: null,
        refreshToken: null,
        properties: null,
        jwtAccessToken: null,
        authorizationDetails: null,
        forExternalAttachment: null,
        tokenId: null,
        refreshTokenScopes: null,
        clientIdentifier: null,
      };

      const result = tokenCreateResponseSchema.parse(responseWithNulls);
      expect(result.grantType).toBeNull();
      expect(result.clientId).toBeNull();
      expect(result.subject).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.accessToken).toBeNull();
      expect(result.tokenType).toBeNull();
      expect(result.expiresIn).toBeNull();
      expect(result.expiresAt).toBeNull();
      expect(result.refreshToken).toBeNull();
      expect(result.properties).toBeNull();
      expect(result.jwtAccessToken).toBeNull();
      expect(result.authorizationDetails).toBeNull();
      expect(result.forExternalAttachment).toBeNull();
      expect(result.tokenId).toBeNull();
      expect(result.refreshTokenScopes).toBeNull();
      expect(result.clientIdentifier).toBeNull();
    });

    it('should accept response with empty arrays', () => {
      const responseWithEmptyArrays: TokenCreateResponse = {
        action: 'OK',
        scopes: [],
        properties: [],
        refreshTokenScopes: [],
      };

      const result = tokenCreateResponseSchema.parse(responseWithEmptyArrays);
      expect(result).toEqual(responseWithEmptyArrays);
    });

    it('should accept response with zero numeric values', () => {
      const responseWithZeros: TokenCreateResponse = {
        action: 'OK',
        clientId: 0,
        expiresIn: 0,
        expiresAt: 0,
      };

      const result = tokenCreateResponseSchema.parse(responseWithZeros);
      expect(result).toEqual(responseWithZeros);
    });

    it('should accept response with negative numeric values', () => {
      const responseWithNegatives: TokenCreateResponse = {
        action: 'OK',
        clientId: -1,
        expiresIn: -3600,
        expiresAt: -1234567890,
      };

      const result = tokenCreateResponseSchema.parse(responseWithNegatives);
      expect(result).toEqual(responseWithNegatives);
    });
  });

  describe('invalid requests', () => {
    it('should reject response without required action field', () => {
      const invalidResponse = {};

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
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
        };

        const result = tokenCreateResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1);
          expect(result.error.issues[0].path).toEqual(['action']);
        }
      });
    });

    it('should reject response with invalid grant type', () => {
      const invalidResponse = {
        action: 'OK',
        grantType: 'invalid_grant_type',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['grantType']);
      }
    });

    it('should reject response with non-number clientId', () => {
      const invalidResponse = {
        action: 'OK',
        clientId: '123',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string subject', () => {
      const invalidResponse = {
        action: 'OK',
        subject: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array scopes', () => {
      const invalidResponse = {
        action: 'OK',
        scopes: 'not-an-array',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['scopes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string accessToken', () => {
      const invalidResponse = {
        action: 'OK',
        accessToken: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string tokenType', () => {
      const invalidResponse = {
        action: 'OK',
        tokenType: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['tokenType']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number expiresIn', () => {
      const invalidResponse = {
        action: 'OK',
        expiresIn: '3600',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['expiresIn']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number expiresAt', () => {
      const invalidResponse = {
        action: 'OK',
        expiresAt: '1234567890',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['expiresAt']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string refreshToken', () => {
      const invalidResponse = {
        action: 'OK',
        refreshToken: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array properties', () => {
      const invalidResponse = {
        action: 'OK',
        properties: 'not-an-array',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
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

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['jwtAccessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid authorization details structure', () => {
      const invalidResponse = {
        action: 'OK',
        authorizationDetails: 'not-an-object',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject response with non-boolean forExternalAttachment', () => {
      const invalidResponse = {
        action: 'OK',
        forExternalAttachment: 'true',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['forExternalAttachment']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string tokenId', () => {
      const invalidResponse = {
        action: 'OK',
        tokenId: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['tokenId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array refreshTokenScopes', () => {
      const invalidResponse = {
        action: 'OK',
        refreshTokenScopes: 'not-an-array',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenScopes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string clientIdentifier', () => {
      const invalidResponse = {
        action: 'OK',
        clientIdentifier: 123,
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientIdentifier']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with multiple invalid fields', () => {
      const invalidResponse = {
        action: 'INVALID_ACTION',
        clientId: 'not-a-number',
        scopes: 'not-an-array',
        properties: 'not-an-array',
        expiresIn: '3600',
      };

      const result = tokenCreateResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept response with empty string values', () => {
      const responseWithEmptyStrings: TokenCreateResponse = {
        action: 'OK',
        grantType: 'authorization_code',
        subject: '',
        accessToken: '',
        tokenType: '',
        refreshToken: '',
        jwtAccessToken: '',
        tokenId: '',
        clientIdentifier: '',
      };

      const result = tokenCreateResponseSchema.parse(responseWithEmptyStrings);
      expect(result).toEqual(responseWithEmptyStrings);
    });

    it('should accept response with very long string values', () => {
      const longString = 'a'.repeat(1000);
      const responseWithLongStrings: TokenCreateResponse = {
        action: 'OK',
        grantType: 'authorization_code',
        subject: longString,
        accessToken: longString,
        tokenType: longString,
        refreshToken: longString,
        jwtAccessToken: longString,
        tokenId: longString,
        clientIdentifier: longString,
      };

      const result = tokenCreateResponseSchema.parse(responseWithLongStrings);
      expect(result).toEqual(responseWithLongStrings);
    });

    it('should accept response with large numeric values', () => {
      const responseWithLargeNumbers: TokenCreateResponse = {
        action: 'OK',
        clientId: Number.MAX_SAFE_INTEGER,
        expiresIn: Number.MAX_SAFE_INTEGER,
        expiresAt: Number.MAX_SAFE_INTEGER,
      };

      const result = tokenCreateResponseSchema.parse(responseWithLargeNumbers);
      expect(result).toEqual(responseWithLargeNumbers);
    });

    it('should accept response with very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `scope${i}`);
      const responseWithLongArrays: TokenCreateResponse = {
        action: 'OK',
        scopes: longArray,
        properties: longArray.map((_, i) => ({
          key: `key${i}`,
          value: `value${i}`,
        })),
        refreshTokenScopes: longArray,
      };

      const result = tokenCreateResponseSchema.parse(responseWithLongArrays);
      expect(result).toEqual(responseWithLongArrays);
    });
  });
});
