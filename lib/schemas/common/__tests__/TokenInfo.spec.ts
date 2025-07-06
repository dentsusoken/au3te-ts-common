import { describe, expect, it } from 'vitest';
import { tokenInfoSchema, type TokenInfo } from '../TokenInfo';

describe('TokenInfo', () => {
  describe('valid token info', () => {
    it('should accept valid token info with all fields', () => {
      const validInfo: TokenInfo = {
        clientId: 123,
        subject: 'user123',
        scopes: [{ name: 'read' }, { name: 'write' }],
        expiresAt: 1234567890,
        properties: [{ key: 'prop1', value: 'value1' }],
        clientIdAlias: 'alias123',
        clientIdAliasUsed: true,
        clientEntityId: 'https://client.example.com',
        clientEntityIdUsed: false,
        resources: ['https://api.example.com'],
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

      const result = tokenInfoSchema.parse(validInfo);
      expect(result).toEqual(validInfo);
    });

    it('should accept minimal token info with no optional fields', () => {
      const minimalInfo = {};
      const result = tokenInfoSchema.parse(minimalInfo);
      expect(result).toEqual(minimalInfo);
    });

    it('should accept token info with null values', () => {
      const infoWithNulls = {
        clientId: null,
        subject: null,
        scopes: null,
        expiresAt: null,
        properties: null,
        clientIdAlias: null,
        clientIdAliasUsed: null,
        clientEntityId: null,
        clientEntityIdUsed: null,
        resources: null,
        authorizationDetails: null,
      };
      const result = tokenInfoSchema.parse(infoWithNulls);
      expect(result).toEqual(infoWithNulls);
    });

    it('should accept token info with undefined values', () => {
      const infoWithUndefined = {
        clientId: undefined,
        subject: undefined,
        scopes: undefined,
        expiresAt: undefined,
        properties: undefined,
        clientIdAlias: undefined,
        clientIdAliasUsed: undefined,
        clientEntityId: undefined,
        clientEntityIdUsed: undefined,
        resources: undefined,
        authorizationDetails: undefined,
      };
      const result = tokenInfoSchema.parse(infoWithUndefined);
      expect(result).toEqual(infoWithUndefined);
    });

    it('should accept token info with mixed null/undefined values', () => {
      const mixedInfo = {
        clientId: 123,
        subject: null,
        scopes: undefined,
        expiresAt: 1234567890,
        properties: null,
        clientIdAlias: 'alias123',
        clientIdAliasUsed: true,
        clientEntityId: undefined,
        clientEntityIdUsed: false,
        resources: ['https://api.example.com'],
        authorizationDetails: null,
      };
      const result = tokenInfoSchema.parse(mixedInfo);
      expect(result).toEqual(mixedInfo);
    });

    it('should accept partial token info', () => {
      const partialInfo = {
        clientId: 123,
        subject: 'user123',
        scopes: [{ name: 'read' }],
      };
      const result = tokenInfoSchema.parse(partialInfo);
      expect(result).toEqual(partialInfo);
    });

    it('should handle complex token info', () => {
      const complexInfo: TokenInfo = {
        clientId: 987654321,
        subject: 'user-12345-67890',
        scopes: [
          { name: 'read', defaultEntry: true, description: 'Read access' },
          { name: 'write', defaultEntry: false, description: 'Write access' },
          { name: 'delete', defaultEntry: false },
        ],
        expiresAt: 1735689600, // 2025-01-01 00:00:00 UTC
        properties: [
          { key: 'session_id', value: 'sess_12345', hidden: true },
          { key: 'ip_address', value: '192.168.1.100' },
          { key: 'user_agent', value: 'Mozilla/5.0...' },
        ],
        clientIdAlias: 'my-app-alias',
        clientIdAliasUsed: true,
        clientEntityId: 'https://myapp.example.com/entity',
        clientEntityIdUsed: false,
        resources: [
          'https://api.example.com/v1',
          'https://api.example.com/v2',
          'https://storage.example.com',
        ],
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: ['https://payment.example.com'],
              actions: ['execute', 'read'],
              datatypes: ['transaction', 'balance'],
              identifier: 'payment-123',
              privileges: ['premium'],
            },
            {
              type: 'data_access',
              locations: ['https://data.example.com'],
              actions: ['read', 'write'],
              datatypes: ['profile', 'preferences'],
            },
          ],
        },
      };
      const result = tokenInfoSchema.parse(complexInfo);
      expect(result).toEqual(complexInfo);
    });

    it('should handle edge cases', () => {
      const edgeCases = [
        {
          clientId: 0,
          expiresAt: 0,
          clientIdAliasUsed: false,
          clientEntityIdUsed: false,
        },
        {
          clientId: Number.MAX_SAFE_INTEGER,
          expiresAt: Number.MAX_SAFE_INTEGER,
        },
        {
          subject: '',
          clientIdAlias: '',
          resources: ['https://example.com'],
        },
      ];

      edgeCases.forEach((edgeCase) => {
        const result = tokenInfoSchema.parse(edgeCase);
        expect(result).toEqual(edgeCase);
      });
    });

    it('should handle empty arrays', () => {
      const emptyArrays = {
        scopes: [],
        properties: [],
        resources: [],
        authorizationDetails: {
          elements: [],
        },
      };
      const result = tokenInfoSchema.parse(emptyArrays);
      expect(result).toEqual(emptyArrays);
    });

    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const longStringInfo = {
        subject: longString,
        clientIdAlias: longString,
        clientEntityId: `https://${longString}.example.com`,
        resources: [`https://${longString}.example.com`],
      };
      const result = tokenInfoSchema.parse(longStringInfo);
      expect(result.subject).toBe(longString);
      expect(result.clientIdAlias).toBe(longString);
      expect(result.clientEntityId).toBe(`https://${longString}.example.com`);
      expect(result.resources).toEqual([`https://${longString}.example.com`]);
    });

    it('should handle very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `item${i}`);
      const longArrayInfo = {
        scopes: longArray.map((_, i) => ({ name: `scope${i}` })),
        properties: longArray.map((_, i) => ({
          key: `key${i}`,
          value: `value${i}`,
        })),
        resources: longArray.map((_, i) => `https://api${i}.example.com`),
        authorizationDetails: {
          elements: longArray.map((_, i) => ({
            type: `type${i}`,
            actions: [`action${i}`],
            locations: [`https://location${i}.example.com`],
          })),
        },
      };
      const result = tokenInfoSchema.parse(longArrayInfo);
      expect(result.scopes).toHaveLength(1000);
      expect(result.properties).toHaveLength(1000);
      expect(result.resources).toHaveLength(1000);
      expect(result.authorizationDetails?.elements).toHaveLength(1000);
    });

    it('should handle special characters in strings', () => {
      const specialCharInfo = {
        subject: 'user-with-dashes_123',
        clientIdAlias: 'client.with.dots',
        clientEntityId: 'https://client-with-dashes.example.com',
        resources: [
          'https://api-with-dashes.example.com',
          'https://api_with_underscores.example.com',
          'https://api.with.dots.example.com',
        ],
      };
      const result = tokenInfoSchema.parse(specialCharInfo);
      expect(result.subject).toBe('user-with-dashes_123');
      expect(result.clientIdAlias).toBe('client.with.dots');
      expect(result.clientEntityId).toBe(
        'https://client-with-dashes.example.com'
      );
      expect(result.resources).toEqual([
        'https://api-with-dashes.example.com',
        'https://api_with_underscores.example.com',
        'https://api.with.dots.example.com',
      ]);
    });
  });

  describe('invalid token info', () => {
    it('should reject invalid URLs', () => {
      const invalidUrls = [
        {
          clientEntityId: 'not-a-url',
        },
        {
          resources: ['not-a-url', 'https://valid.com'],
        },
      ];

      invalidUrls.forEach((invalidUrl) => {
        const result = tokenInfoSchema.safeParse(invalidUrl);
        expect(result.success).toBe(false);
      });
    });

    it('should reject invalid types', () => {
      const invalidTypes = [
        { clientId: 'not-a-number' },
        { expiresAt: '1234567890' },
        { clientIdAliasUsed: 'not-a-boolean' },
        { scopes: 'not-an-array' },
        { properties: 'not-an-array' },
        { resources: 'not-an-array' },
        { clientId: true },
        { expiresAt: false },
        { clientIdAliasUsed: 123 },
      ];

      invalidTypes.forEach((invalidType) => {
        const result = tokenInfoSchema.safeParse(invalidType);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object values', () => {
      const nonObjectValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        [],
        () => {},
      ];

      nonObjectValues.forEach((value) => {
        const result = tokenInfoSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should reject invalid property structure', () => {
      const invalidProperty = {
        properties: [{ key: 123, value: 'value' }], // key should be string
      };
      const result = tokenInfoSchema.safeParse(invalidProperty);
      expect(result.success).toBe(false);
    });

    it('should reject invalid scope structure', () => {
      const invalidScope = {
        scopes: [{ name: 123 }], // name should be string
      };
      const result = tokenInfoSchema.safeParse(invalidScope);
      expect(result.success).toBe(false);
    });
  });

  describe('type inference and compatibility', () => {
    it('should infer the correct output type', () => {
      type SchemaType = typeof tokenInfoSchema._type;
      type ExpectedType = TokenInfo;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should allow valid TokenInfo values', () => {
      const validTokenInfos: TokenInfo[] = [
        {},
        { clientId: 123 },
        { subject: 'user123' },
        { scopes: [{ name: 'read' }] },
        { expiresAt: 1234567890 },
        { properties: [{ key: 'prop', value: 'value' }] },
        { clientIdAlias: 'alias' },
        { clientIdAliasUsed: true },
        { clientEntityId: 'https://client.example.com' },
        { clientEntityIdUsed: false },
        { resources: ['https://api.example.com'] },
        { authorizationDetails: { elements: [] } },
      ];

      validTokenInfos.forEach((tokenInfo) => {
        expect(tokenInfoSchema.parse(tokenInfo)).toEqual(tokenInfo);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (tokenInfo: TokenInfo): TokenInfo => {
        return tokenInfo;
      };

      const testTokenInfo: TokenInfo = { clientId: 123, subject: 'test' };
      expect(testFunction(testTokenInfo)).toEqual(testTokenInfo);
    });

    it('should work with optional properties', () => {
      const testFunction = (tokenInfo: TokenInfo): string => {
        return tokenInfo.subject || 'anonymous';
      };

      expect(testFunction({ subject: 'user123' })).toBe('user123');
      expect(testFunction({ subject: null })).toBe('anonymous');
      expect(testFunction({ subject: undefined })).toBe('anonymous');
      expect(testFunction({})).toBe('anonymous');
    });

    it('should work with boolean properties', () => {
      const testFunction = (tokenInfo: TokenInfo): boolean => {
        return tokenInfo.clientIdAliasUsed ?? false;
      };

      expect(testFunction({ clientIdAliasUsed: true })).toBe(true);
      expect(testFunction({ clientIdAliasUsed: false })).toBe(false);
      expect(testFunction({ clientIdAliasUsed: null })).toBe(false);
      expect(testFunction({ clientIdAliasUsed: undefined })).toBe(false);
      expect(testFunction({})).toBe(false);
    });
  });
});
