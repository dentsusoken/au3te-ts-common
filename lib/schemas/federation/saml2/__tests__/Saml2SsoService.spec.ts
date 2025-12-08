import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2SsoServiceSchema,
  type Saml2SsoService,
} from '../Saml2SsoService';

describe('Saml2SsoService', () => {
  describe('saml2SsoServiceSchema', () => {
    // Given: Valid Saml2SsoService object with all fields
    // When: Parsing valid service object
    // Then: Should accept valid service object
    it('should accept a valid Saml2SsoService object with all fields', () => {
      const validService: Saml2SsoService = {
        isDefault: true,
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: 'https://example.com/sso',
      };
      const result = saml2SsoServiceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    // Given: Valid Saml2SsoService object without optional fields
    // When: Parsing valid service object without optional fields
    // Then: Should accept valid service object without optional fields
    it('should accept a valid Saml2SsoService object without optional fields', () => {
      const validService: Saml2SsoService = {
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        Location: 'https://example.com/sso',
      };
      const result = saml2SsoServiceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a valid Saml2SsoService object with isDefault false', () => {
      const validService: Saml2SsoService = {
        isDefault: false,
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: 'https://example.com/sso',
      };
      const result = saml2SsoServiceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    // Given: Missing required fields
    // When: Parsing service without required fields
    // Then: Should reject service without required fields
    it('should reject a service without Binding field', () => {
      const invalidService = {
        Location: 'https://example.com/sso',
      };
      const result = saml2SsoServiceSchema.safeParse(invalidService);
      expect(result.success).toBe(false);
    });

    it('should reject a service without Location field', () => {
      const invalidService = {
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      };
      const result = saml2SsoServiceSchema.safeParse(invalidService);
      expect(result.success).toBe(false);
    });

    it('should reject an empty service object', () => {
      const invalidService = {};
      const result = saml2SsoServiceSchema.safeParse(invalidService);
      expect(result.success).toBe(false);
    });

    // Given: Empty string values
    // When: Parsing service with empty string values
    // Then: Should accept empty strings (empty string is valid for string type)
    it('should accept a service with empty Binding string', () => {
      const validService: Saml2SsoService = {
        Binding: '',
        Location: 'https://example.com/sso',
      };
      const result = saml2SsoServiceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a service with empty Location string', () => {
      const validService: Saml2SsoService = {
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: '',
      };
      const result = saml2SsoServiceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    // Given: Invalid field types
    // When: Parsing service with invalid field types
    // Then: Should reject service with invalid field types
    it('should reject a service with invalid field types', () => {
      const invalidServices = [
        {
          Binding: null,
          Location: 'https://example.com/sso',
        },
        {
          Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          Location: null,
        },
        {
          Binding: 123,
          Location: 'https://example.com/sso',
        },
        {
          Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          Location: 123,
        },
        {
          Binding: true,
          Location: 'https://example.com/sso',
        },
        {
          Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          Location: true,
        },
        {
          isDefault: 'true',
          Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          Location: 'https://example.com/sso',
        },
        {
          isDefault: 1,
          Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          Location: 'https://example.com/sso',
        },
      ];

      invalidServices.forEach((invalidService) => {
        const result = saml2SsoServiceSchema.safeParse(invalidService);
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
        const result = saml2SsoServiceSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid service object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2SsoServiceSchema>;
      type ExpectedType = Saml2SsoService;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
