import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2LoginResponseTemplateSchema,
  type Saml2LoginResponseTemplate,
} from '../Saml2LoginResponseTemplate';

describe('Saml2LoginResponseTemplate', () => {
  describe('saml2LoginResponseTemplateSchema', () => {
    // Given: Valid Saml2LoginResponseTemplate object with all fields
    // When: Parsing valid template object
    // Then: Should accept valid template object
    it('should accept a valid Saml2LoginResponseTemplate object with all fields', () => {
      const validTemplate: Saml2LoginResponseTemplate = {
        context: 'template context',
        attributes: [
          {
            name: 'email',
            nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
            valueXsiType: 'xs:string',
            valueTag: 'AttributeValue',
          },
        ],
        additionalTemplates: {
          attributeStatementTemplate: {
            context: 'attribute statement template',
          },
          attributeTemplate: {
            context: 'attribute template',
          },
        },
      };
      const result = saml2LoginResponseTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Valid Saml2LoginResponseTemplate object without optional fields
    // When: Parsing valid template object without optional fields
    // Then: Should accept valid template object without optional fields
    it('should accept a valid Saml2LoginResponseTemplate object without optional fields', () => {
      const validTemplate: Saml2LoginResponseTemplate = {
        context: 'template context',
      };
      const result = saml2LoginResponseTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    it('should accept a valid Saml2LoginResponseTemplate object with only attributes', () => {
      const validTemplate: Saml2LoginResponseTemplate = {
        context: 'template context',
        attributes: [
          {
            name: 'email',
            nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
            valueXsiType: 'xs:string',
            valueTag: 'AttributeValue',
          },
        ],
      };
      const result = saml2LoginResponseTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    it('should accept a valid Saml2LoginResponseTemplate object with empty attributes array', () => {
      const validTemplate: Saml2LoginResponseTemplate = {
        context: 'template context',
        attributes: [],
      };
      const result = saml2LoginResponseTemplateSchema.parse(validTemplate);
      expect(result).toEqual(validTemplate);
    });

    // Given: Missing required context field
    // When: Parsing template without context
    // Then: Should reject template without context
    it('should reject a template without context field', () => {
      const invalidTemplate = {};
      const result =
        saml2LoginResponseTemplateSchema.safeParse(invalidTemplate);
      expect(result.success).toBe(false);
    });

    // Given: Invalid attributes array
    // When: Parsing template with invalid attributes array
    // Then: Should reject template with invalid attributes array
    it('should reject a template with invalid attributes array', () => {
      const invalidTemplates = [
        {
          context: 'template context',
          attributes: null,
        },
        {
          context: 'template context',
          attributes: 'string',
        },
        {
          context: 'template context',
          attributes: [null],
        },
        {
          context: 'template context',
          attributes: [
            {
              name: 'email',
              // missing required fields
            },
          ],
        },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2LoginResponseTemplateSchema.safeParse(invalidTemplate);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid additionalTemplates object
    // When: Parsing template with invalid additionalTemplates
    // Then: Should reject template with invalid additionalTemplates
    it('should reject a template with invalid additionalTemplates', () => {
      const invalidTemplates = [
        {
          context: 'template context',
          additionalTemplates: null,
        },
        {
          context: 'template context',
          additionalTemplates: 'string',
        },
        {
          context: 'template context',
          additionalTemplates: {
            attributeStatementTemplate: null,
          },
        },
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2LoginResponseTemplateSchema.safeParse(invalidTemplate);
        expect(result.success).toBe(false);
      });
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
      ];

      invalidTemplates.forEach((invalidTemplate) => {
        const result =
          saml2LoginResponseTemplateSchema.safeParse(invalidTemplate);
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
        const result = saml2LoginResponseTemplateSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid template object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2LoginResponseTemplateSchema>;
      type ExpectedType = Saml2LoginResponseTemplate;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
