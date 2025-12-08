import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  federationRegistrySchema,
  type FederationRegistry,
} from '../FederationRegistry';
import { FederationConfig } from '../FederationConfig';

describe('FederationRegistry', () => {
  describe('federationRegistrySchema', () => {
    const validFederationConfig: FederationConfig = {
      id: 'federation1',
      protocol: 'oidc' as const,
      client: {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
        scopes: ['openid', 'email', 'profile', 'address', 'phone'],
      },
      server: {
        name: 'Test Server',
        issuer: 'https://example.com',
      },
    };

    it('should accept a valid FederationRegistry object with multiple federations', () => {
      const validConfig: FederationRegistry = {
        federations: [
          validFederationConfig,
          { ...validFederationConfig, id: 'federation2' },
        ],
      };
      const result = federationRegistrySchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid FederationRegistry object with a single federation', () => {
      const validConfig: FederationRegistry = {
        federations: [validFederationConfig],
      };
      const result = federationRegistrySchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid FederationRegistry object with an empty array', () => {
      const validConfig: FederationRegistry = {
        federations: [],
      };
      const result = federationRegistrySchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept null', () => {
      const result = federationRegistrySchema.parse(null);
      expect(result).toBeNull();
    });

    it('should accept undefined', () => {
      const result = federationRegistrySchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it('should reject a FederationRegistry object with invalid federations array', () => {
      const invalidConfigs = [
        {
          federations: [{}],
        },
        {
          federations: [{ id: 'federation1' }],
        },
        {
          federations: [
            {
              id: '',
              client: validFederationConfig.client,
              server: validFederationConfig.server,
            },
          ],
        },
        {
          federations: [
            {
              id: 'federation1',
              client: {},
              server: validFederationConfig.server,
            },
          ],
        },
        {
          federations: [
            {
              id: 'federation1',
              client: validFederationConfig.client,
              server: {},
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationRegistrySchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationRegistry object with invalid field types', () => {
      const invalidConfigs = [
        {
          federations: 'not-an-array',
        },
        {
          federations: 123,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationRegistrySchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object and non-null values', () => {
      const invalidValues = ['string', 123, true, false, [], () => 1];

      invalidValues.forEach((value) => {
        const result = federationRegistrySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof federationRegistrySchema>;
      type ExpectedType = FederationRegistry;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
