import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2AttributeTemplateSchema,
  type Saml2AttributeTemplate,
} from '../Saml2AttributeTemplate';

describe('Saml2AttributeTemplate', () => {
  describe('saml2AttributeTemplateSchema', () => {
    // Given: Valid Saml2AttributeTemplate object
    // When: Parsing valid template object
    // Then: Should accept valid template object
    it('should accept a valid Saml2AttributeTemplate object', () => {
      const validTemplate: Saml2AttributeTemplate = {
        context: 'template context string',
      };
      const result = saml2AttributeTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    it('should accept a valid Saml2AttributeTemplate object with empty context', () => {
      const validTemplate: Saml2AttributeTemplate = {
        context: '',
      };
      const result = saml2AttributeTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Missing required field
    // When: Parsing template without context
    // Then: Should reject template without context
    it('should reject a template without context field', () => {
      const invalidTemplate = {};
      const result = saml2AttributeTemplateSchema.safeParse(invalidTemplate);
      expect(result.success).toBe(false);
    });

    // Given: Invalid field types
    // When: Parsing template with invalid field types
    // Then: Should reject template with invalid field types
    it('should reject a template with invalid field types', () => {
      const invalidTemplates = [
        { context: null },
        { context: undefined },
        { context: 123 },
        { context: true },
        { context: [] },
        { context: {} },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result = saml2AttributeTemplateSchema.safeParse(invalidTemplate);
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
        const result = saml2AttributeTemplateSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid template object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2AttributeTemplateSchema>;
      type ExpectedType = Saml2AttributeTemplate;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
