import { describe, it, expect } from 'vitest';
import {
  federationConfigSchema,
  type FederationConfig,
} from '../FederationConfig';

describe('FederationConfig', () => {
  describe('federationConfigSchema', () => {
    const validClientConfig = {
      clientId: 'client123',
      clientSecret: 'secret123',
      redirectUri: 'https://example.com/callback',
    };

    const validServerConfig = {
      name: 'Test Server',
      issuer: 'https://example.com',
    };

    it('should accept a valid FederationConfig object', () => {
      const validConfig: FederationConfig = {
        id: 'federation1',
        protocol: 'oidc',
        client: validClientConfig,
        server: validServerConfig,
      };
      const result = federationConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should reject a FederationConfig object with empty id', () => {
      const invalidConfig = {
        id: '',
        protocol: 'oidc' as const,
        client: validClientConfig,
        server: validServerConfig,
      };
      const result = federationConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a FederationConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { id: 'federation1' },
        { id: 'federation1', protocol: 'oidc' as const },
        { id: 'federation1', protocol: 'oidc' as const, client: validClientConfig },
        { id: 'federation1', protocol: 'oidc' as const, server: validServerConfig },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationConfig object with invalid client config', () => {
      const invalidConfigs = [
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: {},
          server: validServerConfig,
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: { clientId: 'client123' },
          server: validServerConfig,
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: {
            clientId: '',
            clientSecret: 'secret123',
            redirectUri: 'https://example.com/callback',
          },
          server: validServerConfig,
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: {
            clientId: 'client123',
            clientSecret: 'secret123',
            redirectUri: 'invalid-url',
          },
          server: validServerConfig,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationConfig object with invalid server config', () => {
      const invalidConfigs = [
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: {},
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: { name: 'Test Server' },
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: {
            name: '',
            issuer: 'https://example.com',
          },
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: {
            name: 'Test Server',
            issuer: 'invalid-url',
          },
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          id: 123,
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: validServerConfig,
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: 'invalid',
          server: validServerConfig,
        },
        {
          id: 'federation1',
          protocol: 'oidc' as const,
          client: validClientConfig,
          server: 'invalid',
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationConfigSchema.safeParse(invalidConfig);
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
        const result = federationConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept a FederationConfig object with optional client fields', () => {
      const configWithOptionalFields: FederationConfig = {
        id: 'federation1',
        protocol: 'oidc',
        client: {
          ...validClientConfig,
          idTokenSignedResponseAlg: 'RS256',
        },
        server: validServerConfig,
      };
      const result = federationConfigSchema.parse(configWithOptionalFields);
      expect(result).toEqual(configWithOptionalFields);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationConfigSchema._type;
      type ExpectedType = FederationConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

