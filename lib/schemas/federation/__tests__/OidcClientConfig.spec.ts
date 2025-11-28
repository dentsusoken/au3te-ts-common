import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  oidcClientConfigSchema,
  type OidcClientConfig,
} from '../OidcClientConfig';

describe('OidcClientConfig', () => {
  describe('oidcClientConfigSchema', () => {
    it('should accept a valid OidcClientConfig object with all fields', () => {
      const validConfig: OidcClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        idTokenSignedResponseAlg: 'RS256',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      };
      const result = oidcClientConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid OidcClientConfig object without optional fields', () => {
      const minimalConfig: OidcClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      };
      const result = oidcClientConfigSchema.parse(minimalConfig);
      expect(result).toEqual(minimalConfig);
    });

    it('should accept a valid OidcClientConfig object with null optional fields', () => {
      const configWithNulls: OidcClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        idTokenSignedResponseAlg: null,
      };
      const result = oidcClientConfigSchema.parse(configWithNulls);
      expect(result).toEqual(configWithNulls);
    });

    it('should accept a valid OidcClientConfig object with undefined optional fields', () => {
      const configWithUndefined: OidcClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        idTokenSignedResponseAlg: undefined,
      };
      const result = oidcClientConfigSchema.parse(configWithUndefined);
      expect(result).toEqual(configWithUndefined);
    });

    it('should reject an OidcClientConfig object with empty clientId', () => {
      const invalidConfig = {
        clientId: '',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
      };
      const result = oidcClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject an OidcClientConfig object with empty clientSecret', () => {
      const invalidConfig = {
        clientId: 'client123',
        clientSecret: '',
        redirectUri: 'https://example.com/callback',
      };
      const result = oidcClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject an OidcClientConfig object with invalid redirectUri', () => {
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
        const result = oidcClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcClientConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { clientId: 'client123' },
        { clientId: 'client123', clientSecret: 'secret123' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = oidcClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcClientConfig object with invalid field types', () => {
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
        const result = oidcClientConfigSchema.safeParse(invalidConfig);
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
        const result = oidcClientConfigSchema.safeParse(value);
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
        const validConfig: OidcClientConfig = {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: url,
          scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        };
        const result = oidcClientConfigSchema.parse(validConfig);
        expect(result.redirectUri).toBe(url);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof oidcClientConfigSchema>;
      type ExpectedType = OidcClientConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

