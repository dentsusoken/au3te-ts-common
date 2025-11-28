import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { federationClientConfigSchema, type FederationClientConfig } from '../FederationClientConfig';

describe('FederationClientConfig', () => {
  describe('federationClientConfigSchema', () => {
    it('should accept a valid FederationClientConfig object with all fields', () => {
      const validConfig: FederationClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        idTokenSignedResponseAlg: 'RS256',
      };
      const result = federationClientConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid FederationClientConfig object without optional fields', () => {
      const minimalConfig: FederationClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      };
      const result = federationClientConfigSchema.parse(minimalConfig);
      expect(result).toEqual(minimalConfig);
    });

    it('should accept a valid FederationClientConfig object with null optional fields', () => {
      const configWithNulls: FederationClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        idTokenSignedResponseAlg: null,
      };
      const result = federationClientConfigSchema.parse(configWithNulls);
      expect(result).toEqual(configWithNulls);
    });

    it('should accept a valid FederationClientConfig object with undefined optional fields', () => {
      const configWithUndefined: FederationClientConfig = {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        idTokenSignedResponseAlg: undefined,
      };
      const result = federationClientConfigSchema.parse(configWithUndefined);
      expect(result).toEqual(configWithUndefined);
    });

    it('should reject a FederationClientConfig object with empty clientId', () => {
      const invalidConfig = {
        clientId: '',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      };
      const result = federationClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a FederationClientConfig object with empty clientSecret', () => {
      const invalidConfig = {
        clientId: 'client123',
        clientSecret: '',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      };
      const result = federationClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a FederationClientConfig object with invalid redirectUri', () => {
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
        const result = federationClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationClientConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { clientId: 'client123' },
        { clientId: 'client123', clientSecret: 'secret123' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationClientConfig object with invalid field types', () => {
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
        const result = federationClientConfigSchema.safeParse(invalidConfig);
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
        const result = federationClientConfigSchema.safeParse(value);
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
        const validConfig: FederationClientConfig = {
          clientId: 'client123',
          clientSecret: 'secret123',
          redirectUri: url,
          scopes: ['openid', 'email', 'profile', 'address', 'phone'],
        };
        const result = federationClientConfigSchema.parse(validConfig);
        if ('redirectUri' in result) {
          expect(result.redirectUri).toBe(url);
        }
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof federationClientConfigSchema>;
      type ExpectedType = FederationClientConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

