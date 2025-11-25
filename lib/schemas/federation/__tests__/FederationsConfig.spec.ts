import { describe, it, expect } from 'vitest';
import {
  federationsConfigSchema,
  type FederationsConfig,
} from '../FederationsConfig';

describe('FederationsConfig', () => {
  describe('federationsConfigSchema', () => {
    const validFederationConfig = {
      id: 'federation1',
      client: {
        clientId: 'client123',
        clientSecret: 'secret123',
        redirectUri: 'https://example.com/callback',
      },
      server: {
        name: 'Test Server',
        issuer: 'https://example.com',
      },
    };

    it('should accept a valid FederationsConfig object with multiple federations', () => {
      const validConfig: FederationsConfig = {
        federations: [validFederationConfig, { ...validFederationConfig, id: 'federation2' }],
      };
      const result = federationsConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid FederationsConfig object with a single federation', () => {
      const validConfig: FederationsConfig = {
        federations: [validFederationConfig],
      };
      const result = federationsConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid FederationsConfig object with an empty array', () => {
      const validConfig: FederationsConfig = {
        federations: [],
      };
      const result = federationsConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept null', () => {
      const result = federationsConfigSchema.parse(null);
      expect(result).toBeNull();
    });

    it('should accept undefined', () => {
      const result = federationsConfigSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it('should reject a FederationsConfig object with missing federations field', () => {
      const invalidConfig = {};
      const result = federationsConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a FederationsConfig object with invalid federations array', () => {
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
        const result = federationsConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationsConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          federations: 'not-an-array',
        },
        {
          federations: 123,
        },
        {
          federations: {},
        },
        {
          federations: null,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = federationsConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object and non-null values', () => {
      const invalidValues = ['string', 123, true, false, [], () => {}];

      invalidValues.forEach((value) => {
        const result = federationsConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationsConfigSchema._type;
      type ExpectedType = FederationsConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

