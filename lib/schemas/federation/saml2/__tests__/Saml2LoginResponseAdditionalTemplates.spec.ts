import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2LoginResponseAdditionalTemplatesSchema,
  type Saml2LoginResponseAdditionalTemplates,
} from '../Saml2LoginResponseAdditionalTemplates';

describe('Saml2LoginResponseAdditionalTemplates', () => {
  describe('saml2LoginResponseAdditionalTemplatesSchema', () => {
    // Given: Valid Saml2LoginResponseAdditionalTemplates object with all fields
    // When: Parsing valid templates object
    // Then: Should accept valid templates object
    it('should accept a valid Saml2LoginResponseAdditionalTemplates object with all fields', () => {
      const validTemplates: Saml2LoginResponseAdditionalTemplates = {
        attributeStatementTemplate: {
          context: 'attribute statement template',
        },
        attributeTemplate: {
          context: 'attribute template',
        },
      };
      const result =
        saml2LoginResponseAdditionalTemplatesSchema.parse(validTemplates);
      expect(result).toEqual(validTemplates);
    });

    // Given: Valid Saml2LoginResponseAdditionalTemplates object without optional fields
    // When: Parsing valid templates object without optional fields
    // Then: Should accept valid templates object without optional fields
    it('should accept a valid Saml2LoginResponseAdditionalTemplates object without optional fields', () => {
      const validTemplates: Saml2LoginResponseAdditionalTemplates = {};
      const result =
        saml2LoginResponseAdditionalTemplatesSchema.parse(validTemplates);
      expect(result).toEqual(validTemplates);
    });

    it('should accept a valid Saml2LoginResponseAdditionalTemplates object with only attributeStatementTemplate', () => {
      const validTemplates: Saml2LoginResponseAdditionalTemplates = {
        attributeStatementTemplate: {
          context: 'attribute statement template',
        },
      };
      const result =
        saml2LoginResponseAdditionalTemplatesSchema.parse(validTemplates);
      expect(result).toEqual(validTemplates);
    });

    it('should accept a valid Saml2LoginResponseAdditionalTemplates object with only attributeTemplate', () => {
      const validTemplates: Saml2LoginResponseAdditionalTemplates = {
        attributeTemplate: {
          context: 'attribute template',
        },
      };
      const result =
        saml2LoginResponseAdditionalTemplatesSchema.parse(validTemplates);
      expect(result).toEqual(validTemplates);
    });

    // Given: Invalid template objects
    // When: Parsing templates with invalid template objects
    // Then: Should reject templates with invalid template objects
    it('should reject templates with invalid attributeStatementTemplate', () => {
      const invalidTemplates = [
        {
          attributeStatementTemplate: null,
        },
        {
          attributeStatementTemplate: 'string',
        },
        {
          attributeStatementTemplate: {},
        },
        {
          attributeStatementTemplate: {
            context: null,
          },
        },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2LoginResponseAdditionalTemplatesSchema.safeParse(
            invalidTemplate,
          );
        expect(result.success).toBe(false);
      });
    });

    it('should reject templates with invalid attributeTemplate', () => {
      const invalidTemplates = [
        {
          attributeTemplate: null,
        },
        {
          attributeTemplate: 'string',
        },
        {
          attributeTemplate: {},
        },
        {
          attributeTemplate: {
            context: null,
          },
        },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2LoginResponseAdditionalTemplatesSchema.safeParse(
            invalidTemplate,
          );
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
        const result =
          saml2LoginResponseAdditionalTemplatesSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid templates object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<
        typeof saml2LoginResponseAdditionalTemplatesSchema
      >;
      type ExpectedType = Saml2LoginResponseAdditionalTemplates;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
