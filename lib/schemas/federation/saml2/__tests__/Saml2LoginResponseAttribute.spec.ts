import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2LoginResponseAttributeSchema,
  type Saml2LoginResponseAttribute,
} from '../Saml2LoginResponseAttribute';

describe('Saml2LoginResponseAttribute', () => {
  describe('saml2LoginResponseAttributeSchema', () => {
    // Given: Valid Saml2LoginResponseAttribute object with all fields
    // When: Parsing valid attribute object
    // Then: Should accept valid attribute object
    it('should accept a valid Saml2LoginResponseAttribute object with all fields', () => {
      const validAttribute: Saml2LoginResponseAttribute = {
        name: 'email',
        nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        valueXsiType: 'xs:string',
        valueTag: 'AttributeValue',
        valueXmlnsXs: 'http://www.w3.org/2001/XMLSchema',
        valueXmlnsXsi: 'http://www.w3.org/2001/XMLSchema-instance',
      };
      const result = saml2LoginResponseAttributeSchema.parse(validAttribute);
      expect(result).toEqual(validAttribute);
    });

    // Given: Valid Saml2LoginResponseAttribute object without optional fields
    // When: Parsing valid attribute object without optional fields
    // Then: Should accept valid attribute object without optional fields
    it('should accept a valid Saml2LoginResponseAttribute object without optional fields', () => {
      const validAttribute: Saml2LoginResponseAttribute = {
        name: 'email',
        nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        valueXsiType: 'xs:string',
        valueTag: 'AttributeValue',
      };
      const result = saml2LoginResponseAttributeSchema.parse(validAttribute);
      expect(result).toEqual(validAttribute);
    });

    // Given: Empty string values
    // When: Parsing attribute with empty string values
    // Then: Should accept empty strings (empty string is valid for string type)
    it('should accept an attribute with empty string values', () => {
      const validAttribute: Saml2LoginResponseAttribute = {
        name: '',
        nameFormat: '',
        valueXsiType: '',
        valueTag: '',
      };
      const result = saml2LoginResponseAttributeSchema.parse(validAttribute);
      expect(result).toEqual(validAttribute);
    });

    // Given: Missing required fields
    // When: Parsing attribute without required fields
    // Then: Should reject attribute without required fields
    it('should reject an attribute without name field', () => {
      const invalidAttribute = {
        nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        valueXsiType: 'xs:string',
        valueTag: 'AttributeValue',
      };
      const result =
        saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
      expect(result.success).toBe(false);
    });

    it('should reject an attribute without nameFormat field', () => {
      const invalidAttribute = {
        name: 'email',
        valueXsiType: 'xs:string',
        valueTag: 'AttributeValue',
      };
      const result =
        saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
      expect(result.success).toBe(false);
    });

    it('should reject an attribute without valueXsiType field', () => {
      const invalidAttribute = {
        name: 'email',
        nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        valueTag: 'AttributeValue',
      };
      const result =
        saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
      expect(result.success).toBe(false);
    });

    it('should reject an attribute without valueTag field', () => {
      const invalidAttribute = {
        name: 'email',
        nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        valueXsiType: 'xs:string',
      };
      const result =
        saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
      expect(result.success).toBe(false);
    });

    it('should reject an empty attribute object', () => {
      const invalidAttribute = {};
      const result =
        saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
      expect(result.success).toBe(false);
    });

    // Given: Invalid field types
    // When: Parsing attribute with invalid field types
    // Then: Should reject attribute with invalid field types
    it('should reject an attribute with invalid field types', () => {
      const invalidAttributes = [
        { name: null, nameFormat: 'format', valueXsiType: 'type', valueTag: 'tag' },
        { name: 123, nameFormat: 'format', valueXsiType: 'type', valueTag: 'tag' },
        { name: 'email', nameFormat: null, valueXsiType: 'type', valueTag: 'tag' },
        { name: 'email', nameFormat: 123, valueXsiType: 'type', valueTag: 'tag' },
        { name: 'email', nameFormat: 'format', valueXsiType: null, valueTag: 'tag' },
        { name: 'email', nameFormat: 'format', valueXsiType: 123, valueTag: 'tag' },
        { name: 'email', nameFormat: 'format', valueXsiType: 'type', valueTag: null },
        { name: 'email', nameFormat: 'format', valueXsiType: 'type', valueTag: 123 },
        {
          name: 'email',
          nameFormat: 'format',
          valueXsiType: 'type',
          valueTag: 'tag',
          valueXmlnsXs: null,
        },
        {
          name: 'email',
          nameFormat: 'format',
          valueXsiType: 'type',
          valueTag: 'tag',
          valueXmlnsXsi: null,
        },
      ];

      invalidAttributes.forEach((invalidAttribute) => {
        const result =
          saml2LoginResponseAttributeSchema.safeParse(invalidAttribute);
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
        const result = saml2LoginResponseAttributeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid attribute object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2LoginResponseAttributeSchema>;
      type ExpectedType = Saml2LoginResponseAttribute;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
