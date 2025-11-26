import { describe, it, expect } from 'vitest';
import {
  oidcServerConfigSchema,
  type OidcServerConfig,
} from '../OidcServerConfig';

describe('OidcServerConfig', () => {
  describe('oidcServerConfigSchema', () => {
    it('should accept a valid OidcServerConfig object', () => {
      const validConfig: OidcServerConfig = {
        name: 'Test Server',
        issuer: 'https://example.com',
      };
      const result = oidcServerConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should reject an OidcServerConfig object with empty name', () => {
      const invalidConfig = {
        name: '',
        issuer: 'https://example.com',
      };
      const result = oidcServerConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject an OidcServerConfig object with empty issuer', () => {
      const invalidConfig = {
        name: 'Test Server',
        issuer: '',
      };
      const result = oidcServerConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject an OidcServerConfig object with invalid issuer URL', () => {
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
        const result = oidcServerConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcServerConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { name: 'Test Server' },
        { issuer: 'https://example.com' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = oidcServerConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcServerConfig object with invalid field types', () => {
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
        const result = oidcServerConfigSchema.safeParse(invalidConfig);
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
        const result = oidcServerConfigSchema.safeParse(value);
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
        const validConfig: OidcServerConfig = {
          name: 'Test Server',
          issuer: url,
        };
        const result = oidcServerConfigSchema.parse(validConfig);
        expect(result.issuer).toBe(url);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof oidcServerConfigSchema._type;
      type ExpectedType = OidcServerConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

