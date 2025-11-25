import { describe, it, expect } from 'vitest';
import { clientConfigSchema, type ClientConfig } from '../ClientConfig';

describe('ClientConfig', () => {
  describe('clientConfigSchema', () => {
    it('should accept a valid ClientConfig object with all fields', () => {
      const validConfig: ClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        idTokenSignedResponseAlg: 'RS256',
      };
      const result = clientConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid ClientConfig object without optional fields', () => {
      const minimalConfig: ClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
      };
      const result = clientConfigSchema.parse(minimalConfig);
      expect(result).toEqual(minimalConfig);
    });

    it('should accept a valid ClientConfig object with null optional fields', () => {
      const configWithNulls: ClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        idTokenSignedResponseAlg: null,
      };
      const result = clientConfigSchema.parse(configWithNulls);
      expect(result).toEqual(configWithNulls);
    });

    it('should accept a valid ClientConfig object with undefined optional fields', () => {
      const configWithUndefined: ClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        idTokenSignedResponseAlg: undefined,
      };
      const result = clientConfigSchema.parse(configWithUndefined);
      expect(result).toEqual(configWithUndefined);
    });

    it('should reject a ClientConfig object with empty clientId', () => {
      const invalidConfig = {
        clientId: '',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
      };
      const result = clientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a ClientConfig object with empty clientSecret', () => {
      const invalidConfig = {
        clientId: 'client123',
        clientSecret: '',
        redirectUri: 'https://example.com/callback',
      };
      const result = clientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a ClientConfig object with invalid redirectUri', () => {
      const invalidUrls = [
        'not-a-url',
        'http://',
        'https://',
        '://example.com',
        'example.com',
      ];

      invalidUrls.forEach((invalidUrl) => {
        const invalidConfig = {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: invalidUrl,
        };
        const result = clientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a ClientConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { clientId: 'client123' },
        { clientId: 'client123', clientSecret: 'secret123' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = clientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a ClientConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          clientId: 123,
          clientSecret: 'secret123',
          redirectUri: 'https://example.com/callback',
        },
        {
          clientId: 'client123',
          clientSecret: {},
          redirectUri: 'https://example.com/callback',
        },
        {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: [],
        },
        {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: 'https://example.com/callback',
          idTokenSignedResponseAlg: 123,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = clientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object values', () => {
      const invalidValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        [],
        () => {},
      ];

      invalidValues.forEach((value) => {
        const result = clientConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept valid URL formats', () => {
      const validUrls = [
        'https://example.com/callback',
        'http://localhost:3000/callback',
        'https://example.com:8080/path/to/callback',
        'https://subdomain.example.com/callback',
      ];

      validUrls.forEach((url) => {
        const validConfig: ClientConfig = {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: url,
        };
        const result = clientConfigSchema.parse(validConfig);
        expect(result.redirectUri).toBe(url);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof clientConfigSchema._type;
      type ExpectedType = ClientConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

