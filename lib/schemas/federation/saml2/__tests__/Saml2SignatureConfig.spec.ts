import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2SignatureConfigSchema,
  type Saml2SignatureConfig,
} from '../Saml2SignatureConfig';

describe('Saml2SignatureConfig', () => {
  describe('saml2SignatureConfigSchema', () => {
    // Given: Valid Saml2SignatureConfig object with all fields
    // When: Parsing valid config object
    // Then: Should accept valid config object
    it('should accept a valid Saml2SignatureConfig object with all fields', () => {
      const validConfig: Saml2SignatureConfig = {
        prefix: 'ds',
        location: {
          reference: '/samlp:Response/saml:Assertion',
          action: 'append',
        },
      };
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    // Given: Valid Saml2SignatureConfig object without optional fields
    // When: Parsing valid config object without optional fields
    // Then: Should accept valid config object without optional fields
    it('should accept a valid Saml2SignatureConfig object without optional fields', () => {
      const validConfig: Saml2SignatureConfig = {};
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid Saml2SignatureConfig object with only prefix', () => {
      const validConfig: Saml2SignatureConfig = {
        prefix: 'ds',
      };
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid Saml2SignatureConfig object with only location', () => {
      const validConfig: Saml2SignatureConfig = {
        location: {
          reference: '/samlp:Response/saml:Assertion',
          action: 'prepend',
        },
      };
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    // Given: Valid action values
    // When: Parsing config with valid action values
    // Then: Should accept all valid action values
    it('should accept all valid action values', () => {
      const validActions: Array<'append' | 'prepend' | 'before' | 'after'> = [
        'append',
        'prepend',
        'before',
        'after',
      ];

      validActions.forEach((action) => {
        const validConfig: Saml2SignatureConfig = {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action,
          },
        };
        const result = saml2SignatureConfigSchema.parse(validConfig);
        expect(result.location?.action).toBe(action);
      });
    });

    // Given: Empty string values
    // When: Parsing config with empty string values
    // Then: Should accept empty strings
    it('should accept a config with empty prefix string', () => {
      const validConfig: Saml2SignatureConfig = {
        prefix: '',
      };
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a config with empty reference string', () => {
      const validConfig: Saml2SignatureConfig = {
        location: {
          reference: '',
          action: 'append',
        },
      };
      const result = saml2SignatureConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    // Given: Invalid action value
    // When: Parsing config with invalid action value
    // Then: Should reject config with invalid action value
    it('should reject a config with invalid action value', () => {
      const invalidConfigs = [
        {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: 'invalid',
          },
        },
        {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: '',
          },
        },
        {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: null,
          },
        },
        {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: 123,
          },
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SignatureConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Missing required action field in location
    // When: Parsing config without action field
    // Then: Should reject config without action field
    it('should reject a config with location missing action field', () => {
      const invalidConfig = {
        location: {
          reference: '/samlp:Response/saml:Assertion',
        },
      };
      const result = saml2SignatureConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    // Given: Invalid field types
    // When: Parsing config with invalid field types
    // Then: Should reject config with invalid field types
    it('should reject a config with invalid field types', () => {
      const invalidConfigs = [
        { prefix: null },
        { prefix: 123 },
        { prefix: true },
        { prefix: [] },
        { prefix: {} },
        {
          location: null,
        },
        {
          location: 'string',
        },
        {
          location: 123,
        },
        {
          location: {
            reference: null,
            action: 'append',
          },
        },
        {
          location: {
            reference: 123,
            action: 'append',
          },
        },
        {
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: null,
          },
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SignatureConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Non-object values
    // When: Parsing non-object values
    // Then: Should reject non-object values
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
        const result = saml2SignatureConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid config object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2SignatureConfigSchema>;
      type ExpectedType = Saml2SignatureConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
