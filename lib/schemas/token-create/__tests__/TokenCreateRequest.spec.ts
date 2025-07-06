import { describe, expect, it } from 'vitest';
import {
  tokenCreateRequestSchema,
  type TokenCreateRequest,
} from '../TokenCreateRequest';

describe('TokenCreateRequest', () => {
  describe('valid requests', () => {
    it('should accept minimal valid token create request', () => {
      const validRequest: TokenCreateRequest = {
        grantType: 'authorization_code',
      };

      const result = tokenCreateRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
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

      const result = tokenCreateRequestSchema.parse(fullRequest);
      expect(result).toEqual(fullRequest);
    });

    it('should accept request with all valid grant types', () => {
      const validGrantTypes = [
        'authorization_code',
        'implicit',
        'password',
        'client_credentials',
        'urn:openid:params:grant-type:ciba',
        'urn:ietf:params:oauth:grant-type:device_code',
        'urn:ietf:params:oauth:grant-type:token-exchange',
        'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'urn:ietf:params:oauth:grant-type:pre-authorized_code',
      ];

      validGrantTypes.forEach((grantType) => {
        const request = {
          grantType,
        };

        const result = tokenCreateRequestSchema.parse(request);
        expect(result.grantType).toBe(grantType);
      });
    });

    it('should accept request with valid numeric fields', () => {
      const requestWithNumbers: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientId: 123456,
        accessTokenDuration: 3600,
        refreshTokenDuration: 86400,
        authTime: 1615962130,
      };

      const result = tokenCreateRequestSchema.parse(requestWithNumbers);
      expect(result).toEqual(requestWithNumbers);
    });

    it('should accept request with valid string fields', () => {
      const requestWithStrings: TokenCreateRequest = {
        grantType: 'authorization_code',
        subject: 'user123',
        accessToken: 'custom-access-token',
        refreshToken: 'custom-refresh-token',
        certificateThumbprint: 'cert-thumb',
        dpopKeyThumbprint: 'dpop-thumb',
        jwtAtClaims: '{"custom":"claim"}',
        acr: 'urn:mace:incommon:iap:silver',
        clientIdentifier: 'client123',
      };

      const result = tokenCreateRequestSchema.parse(requestWithStrings);
      expect(result).toEqual(requestWithStrings);
    });

    it('should accept request with valid boolean fields', () => {
      const requestWithBooleans: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientIdAliasUsed: true,
        clientEntityIdUsed: false,
        accessTokenPersistent: true,
        forExternalAttachment: false,
      };

      const result = tokenCreateRequestSchema.parse(requestWithBooleans);
      expect(result).toEqual(requestWithBooleans);
    });

    it('should accept request with valid array fields', () => {
      const requestWithArrays: TokenCreateRequest = {
        grantType: 'authorization_code',
        scopes: ['read', 'write', 'admin'],
        properties: [
          { key: 'prop1', value: 'value1' },
          { key: 'prop2', value: 'value2' },
        ],
        resources: ['https://api.example.com/v1', 'https://api.example.com/v2'],
      };

      const result = tokenCreateRequestSchema.parse(requestWithArrays);
      expect(result).toEqual(requestWithArrays);
    });

    it('should accept request with valid authorization details', () => {
      const requestWithAuthzDetails: TokenCreateRequest = {
        grantType: 'authorization_code',
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

      const result = tokenCreateRequestSchema.parse(requestWithAuthzDetails);
      expect(result).toEqual(requestWithAuthzDetails);
    });

    it('should accept request with null values for optional fields', () => {
      const requestWithNulls: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientId: null,
        subject: null,
        scopes: null,
        accessTokenDuration: null,
        refreshTokenDuration: null,
        properties: null,
        clientIdAliasUsed: null,
        clientEntityIdUsed: null,
        accessToken: null,
        refreshToken: null,
        accessTokenPersistent: null,
        certificateThumbprint: null,
        dpopKeyThumbprint: null,
        authorizationDetails: null,
        resources: null,
        forExternalAttachment: null,
        jwtAtClaims: null,
        acr: null,
        authTime: null,
        clientIdentifier: null,
      };

      const result = tokenCreateRequestSchema.parse(requestWithNulls);
      expect(result.clientId).toBeNull();
      expect(result.subject).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.accessTokenDuration).toBeNull();
      expect(result.refreshTokenDuration).toBeNull();
      expect(result.properties).toBeNull();
      expect(result.clientIdAliasUsed).toBeNull();
      expect(result.clientEntityIdUsed).toBeNull();
      expect(result.accessToken).toBeNull();
      expect(result.refreshToken).toBeNull();
      expect(result.accessTokenPersistent).toBeNull();
      expect(result.certificateThumbprint).toBeNull();
      expect(result.dpopKeyThumbprint).toBeNull();
      expect(result.authorizationDetails).toBeNull();
      expect(result.resources).toBeNull();
      expect(result.forExternalAttachment).toBeNull();
      expect(result.jwtAtClaims).toBeNull();
      expect(result.acr).toBeNull();
      expect(result.authTime).toBeNull();
      expect(result.clientIdentifier).toBeNull();
    });

    it('should accept request with empty arrays', () => {
      const requestWithEmptyArrays: TokenCreateRequest = {
        grantType: 'authorization_code',
        scopes: [],
        properties: [],
        resources: [],
      };

      const result = tokenCreateRequestSchema.parse(requestWithEmptyArrays);
      expect(result).toEqual(requestWithEmptyArrays);
    });

    it('should accept request with zero numeric values', () => {
      const requestWithZeros: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientId: 0,
        accessTokenDuration: 0,
        refreshTokenDuration: 0,
        authTime: 0,
      };

      const result = tokenCreateRequestSchema.parse(requestWithZeros);
      expect(result).toEqual(requestWithZeros);
    });

    it('should accept request with negative numeric values', () => {
      const requestWithNegatives: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientId: -1,
        accessTokenDuration: -3600,
        refreshTokenDuration: -86400,
        authTime: -1615962130,
      };

      const result = tokenCreateRequestSchema.parse(requestWithNegatives);
      expect(result).toEqual(requestWithNegatives);
    });
  });

  describe('invalid requests', () => {
    it('should reject request without required grantType', () => {
      const invalidRequest = {};

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['grantType']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with invalid grant types', () => {
      const invalidGrantTypes = [
        'invalid_grant_type',
        'ciba', // Should be full URN
        'device_code', // Should be full URN
        'token_exchange', // Should be full URN
        'jwt_bearer', // Should be full URN
        'pre_authorized_code', // Should be full URN
        '',
        123,
        null,
        undefined,
        {},
        [],
      ];

      invalidGrantTypes.forEach((grantType) => {
        const request = {
          grantType,
        };

        const result = tokenCreateRequestSchema.safeParse(request);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1);
          expect(result.error.issues[0].path).toEqual(['grantType']);
        }
      });
    });

    it('should reject request with non-number clientId', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        clientId: '123',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string subject', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        subject: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-array scopes', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        scopes: 'not-an-array',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['scopes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-number accessTokenDuration', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        accessTokenDuration: '3600',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-number refreshTokenDuration', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        refreshTokenDuration: '86400',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-array properties', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        properties: 'not-an-array',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['properties']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-boolean clientIdAliasUsed', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        clientIdAliasUsed: 'true',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientIdAliasUsed']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-boolean clientEntityIdUsed', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        clientEntityIdUsed: 'false',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientEntityIdUsed']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string accessToken', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        accessToken: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string refreshToken', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        refreshToken: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-boolean accessTokenPersistent', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        accessTokenPersistent: 'true',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessTokenPersistent']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string certificateThumbprint', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        certificateThumbprint: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['certificateThumbprint']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string dpopKeyThumbprint', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        dpopKeyThumbprint: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['dpopKeyThumbprint']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should accept request with authorization details using plain arrays', () => {
      const validRequest = {
        grantType: 'authorization_code',
        authorizationDetails: {
          elements: [{ type: 'payment', actions: ['read'] }],
        },
      };

      const result = tokenCreateRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.authorizationDetails?.elements[0].actions).toEqual([
          'read',
        ]);
      }
    });

    it('should reject request with non-array resources', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        resources: 'not-an-array',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['resources']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with invalid URLs in resources', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        resources: ['not-a-url', 'also-not-a-url'],
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2); // Both URLs are invalid
        expect(result.error.issues[0].path).toEqual(['resources', 0]);
        expect(result.error.issues[0].code).toBe('invalid_string');
        expect(result.error.issues[1].path).toEqual(['resources', 1]);
        expect(result.error.issues[1].code).toBe('invalid_string');
      }
    });

    it('should reject request with non-boolean forExternalAttachment', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        forExternalAttachment: 'true',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['forExternalAttachment']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string jwtAtClaims', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        jwtAtClaims: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['jwtAtClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string acr', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        acr: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['acr']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-number authTime', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        authTime: '1615962130',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['authTime']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string clientIdentifier', () => {
      const invalidRequest = {
        grantType: 'authorization_code',
        clientIdentifier: 123,
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientIdentifier']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with multiple invalid fields', () => {
      const invalidRequest = {
        grantType: 'invalid_grant_type',
        clientId: 'not-a-number',
        scopes: 'not-an-array',
        accessTokenDuration: '3600',
        clientIdAliasUsed: 'true',
        resources: ['not-a-url'],
        authTime: '1615962130',
      };

      const result = tokenCreateRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept request with empty string values', () => {
      const requestWithEmptyStrings: TokenCreateRequest = {
        grantType: 'authorization_code',
        subject: '',
        accessToken: '',
        refreshToken: '',
        certificateThumbprint: '',
        dpopKeyThumbprint: '',
        jwtAtClaims: '',
        acr: '',
        clientIdentifier: '',
      };

      const result = tokenCreateRequestSchema.parse(requestWithEmptyStrings);
      expect(result).toEqual(requestWithEmptyStrings);
    });

    it('should accept request with very long string values', () => {
      const longString = 'a'.repeat(1000);
      const requestWithLongStrings: TokenCreateRequest = {
        grantType: 'authorization_code',
        subject: longString,
        accessToken: longString,
        refreshToken: longString,
        certificateThumbprint: longString,
        dpopKeyThumbprint: longString,
        jwtAtClaims: longString,
        acr: longString,
        clientIdentifier: longString,
      };

      const result = tokenCreateRequestSchema.parse(requestWithLongStrings);
      expect(result).toEqual(requestWithLongStrings);
    });

    it('should accept request with large numeric values', () => {
      const requestWithLargeNumbers: TokenCreateRequest = {
        grantType: 'authorization_code',
        clientId: Number.MAX_SAFE_INTEGER,
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
        refreshTokenDuration: Number.MAX_SAFE_INTEGER,
        authTime: Number.MAX_SAFE_INTEGER,
      };

      const result = tokenCreateRequestSchema.parse(requestWithLargeNumbers);
      expect(result).toEqual(requestWithLargeNumbers);
    });

    it('should accept request with very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `scope${i}`);
      const requestWithLongArrays: TokenCreateRequest = {
        grantType: 'authorization_code',
        scopes: longArray,
        resources: longArray.map((_, i) => `https://api${i}.example.com`),
      };

      const result = tokenCreateRequestSchema.parse(requestWithLongArrays);
      expect(result).toEqual(requestWithLongArrays);
    });
  });
});
