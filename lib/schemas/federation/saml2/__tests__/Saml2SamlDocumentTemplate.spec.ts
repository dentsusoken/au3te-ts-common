import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2SamlDocumentTemplateSchema,
  type Saml2SamlDocumentTemplate,
} from '../Saml2SamlDocumentTemplate';

describe('Saml2SamlDocumentTemplate', () => {
  describe('saml2SamlDocumentTemplateSchema', () => {
    // Given: Valid Saml2SamlDocumentTemplate object with context
    // When: Parsing valid template object
    // Then: Should accept valid template object
    it('should accept a valid Saml2SamlDocumentTemplate object with context', () => {
      const validTemplate: Saml2SamlDocumentTemplate = {
        context: 'template context string',
      };
      const result = saml2SamlDocumentTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Valid Saml2SamlDocumentTemplate object without context
    // When: Parsing valid template object without optional field
    // Then: Should accept valid template object without optional field
    it('should accept a valid Saml2SamlDocumentTemplate object without context', () => {
      const validTemplate: Saml2SamlDocumentTemplate = {};
      const result = saml2SamlDocumentTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    it('should accept a valid Saml2SamlDocumentTemplate object with empty context', () => {
      const validTemplate: Saml2SamlDocumentTemplate = {
        context: '',
      };
      const result = saml2SamlDocumentTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Invalid field types
    // When: Parsing template with invalid field types
    // Then: Should reject template with invalid field types
    it('should reject a template with invalid field types', () => {
      const invalidTemplates = [
        { context: null },
        { context: 123 },
        { context: true },
        { context: [] },
        { context: {} },
        { context: () => {} },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2SamlDocumentTemplateSchema.safeParse(invalidTemplate);
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
        const result = saml2SamlDocumentTemplateSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid template object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2SamlDocumentTemplateSchema>;
      type ExpectedType = Saml2SamlDocumentTemplate;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
