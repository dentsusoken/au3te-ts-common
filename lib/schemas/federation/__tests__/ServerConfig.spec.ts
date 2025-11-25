import { describe, it, expect } from 'vitest';
import { serverConfigSchema, type ServerConfig } from '../ServerConfig';

describe('ServerConfig', () => {
  describe('serverConfigSchema', () => {
    it('should accept a valid ServerConfig object', () => {
      const validConfig: ServerConfig = {
        name: 'Test Server',
        issuer: 'https://example.com',
      };
      const result = serverConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should reject a ServerConfig object with empty name', () => {
      const invalidConfig = {
        name: '',
        issuer: 'https://example.com',
      };
      const result = serverConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a ServerConfig object with empty issuer', () => {
      const invalidConfig = {
        name: 'Test Server',
        issuer: '',
      };
      const result = serverConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a ServerConfig object with invalid issuer URL', () => {
      const invalidUrls = [
        'not-a-url',
        'http://',
        'https://',
        '://example.com',
        'example.com',
      ];

      invalidUrls.forEach((invalidUrl) => {
        const invalidConfig = {
          name: 'Test Server',
          issuer: invalidUrl,
        };
        const result = serverConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a ServerConfig object with missing required fields', () => {
      const invalidConfigs = [{}, { name: 'Test Server' }, { issuer: 'https://example.com' }];

      invalidConfigs.forEach((invalidConfig) => {
        const result = serverConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a ServerConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          name: 123,
          issuer: 'https://example.com',
        },
        {
          name: 'Test Server',
          issuer: {},
        },
        {
          name: [],
          issuer: 'https://example.com',
        },
        {
          name: 'Test Server',
          issuer: [],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = serverConfigSchema.safeParse(invalidConfig);
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
        const result = serverConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept valid URL formats', () => {
      const validUrls = [
        'https://example.com',
        'http://localhost:3000',
        'https://example.com:8080',
        'https://subdomain.example.com',
      ];

      validUrls.forEach((url) => {
        const validConfig: ServerConfig = {
          name: 'Test Server',
          issuer: url,
        };
        const result = serverConfigSchema.parse(validConfig);
        expect(result.issuer).toBe(url);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof serverConfigSchema._type;
      type ExpectedType = ServerConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

