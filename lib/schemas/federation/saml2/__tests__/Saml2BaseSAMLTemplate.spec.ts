import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2BaseSAMLTemplateSchema,
  type Saml2BaseSAMLTemplate,
} from '../Saml2BaseSAMLTemplate';

describe('Saml2BaseSAMLTemplate', () => {
  describe('saml2BaseSAMLTemplateSchema', () => {
    // Given: Valid Saml2BaseSAMLTemplate object
    // When: Parsing valid template object
    // Then: Should accept valid template object
    it('should accept a valid Saml2BaseSAMLTemplate object', () => {
      const validTemplate: Saml2BaseSAMLTemplate = {
        context: 'template context string',
      };
      const result = saml2BaseSAMLTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    it('should accept a valid Saml2BaseSAMLTemplate object with long context', () => {
      const validTemplate: Saml2BaseSAMLTemplate = {
        context: 'a'.repeat(1000),
      };
      const result = saml2BaseSAMLTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Empty context string
    // When: Parsing template with empty context
    // Then: Should accept empty context (empty string is valid)
    it('should accept a template with empty context string', () => {
      const validTemplate: Saml2BaseSAMLTemplate = {
        context: '',
      };
      const result = saml2BaseSAMLTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Missing required field
    // When: Parsing template without context
    // Then: Should reject template without context
    it('should reject a template without context field', () => {
      const invalidTemplate = {};
      const result = saml2BaseSAMLTemplateSchema.safeParse(invalidTemplate);
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
        { context: false },
        { context: [] },
        { context: {} },
        { context: () => {} },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result = saml2BaseSAMLTemplateSchema.safeParse(invalidTemplate);
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
        const result = saml2BaseSAMLTemplateSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid template object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2BaseSAMLTemplateSchema>;
      type ExpectedType = Saml2BaseSAMLTemplate;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
