import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  saml2LoginResponseSchema,
  type Saml2LoginResponse,
} from '../Saml2LoginResponse';

describe('Saml2LoginResponse', () => {
  describe('saml2LoginResponseSchema', () => {
    // Given: Valid Saml2LoginResponse object with all fields
    // When: Parsing valid response object
    // Then: Should accept valid response object
    it('should accept a valid Saml2LoginResponse object with all fields', () => {
      const validResponse = {
        conditions: {
          notBefore: '2024-01-01T00:00:00Z',
          notOnOrAfter: '2024-12-31T23:59:59Z',
        },
        response: {
          destination: 'https://example.com/acs',
          id: 'response-id-123',
          inResponseTo: 'request-id-456',
          issueInstant: '2024-01-01T00:00:00Z',
        },
        audience: 'https://example.com/sp',
        issuer: 'https://example.com/idp',
        nameID: 'user@example.com',
        sessionIndex: {
          authnInstant: '2024-01-01T00:00:00Z',
          sessionIndex: 'session-index-123',
          sessionNotOnOrAfter: '2024-12-31T23:59:59Z',
        },
        attributes: {
          'urn:oid:2.5.4.42': 'John',
          'urn:oid:2.5.4.4': 'Doe',
          'urn:oid:1.2.840.113549.1.9.1': 'user@example.com',
        },
      };
      const result = saml2LoginResponseSchema.parse(validResponse);
      expect(result.conditions).toEqual(validResponse.conditions);
      expect(result.response).toEqual(validResponse.response);
      expect(result.audience).toBe(validResponse.audience);
      expect(result.issuer).toBe(validResponse.issuer);
      expect(result.nameID).toBe(validResponse.nameID);
      expect(result.sessionIndex).toEqual(validResponse.sessionIndex);
      expect(result.attributes?.email).toBe('user@example.com');
      expect(result.attributes?.givenName).toBe('John');
      expect(result.attributes?.surname).toBe('Doe');
    });

    // Given: Valid Saml2LoginResponse object without optional fields
    // When: Parsing valid response object without optional fields
    // Then: Should accept valid response object without optional fields
    it('should accept a valid Saml2LoginResponse object without optional fields', () => {
      const validResponse: Saml2LoginResponse = {
        response: {
          id: 'response-id-123',
          issueInstant: '2024-01-01T00:00:00Z',
        },
        issuer: 'https://example.com/idp',
      };
      const result = saml2LoginResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    // Given: Valid response with null optional fields
    // When: Parsing response with null optional fields
    // Then: Should accept response with null optional fields
    it('should accept a valid Saml2LoginResponse object with null optional fields', () => {
      const validResponse: Saml2LoginResponse = {
        conditions: null,
        response: {
          id: 'response-id-123',
          issueInstant: '2024-01-01T00:00:00Z',
        },
        audience: null,
        issuer: 'https://example.com/idp',
        nameID: null,
        sessionIndex: null,
        attributes: null,
      };
      const result = saml2LoginResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    // Given: Valid response with OID attribute transformation
    // When: Parsing response with OID attributes
    // Then: Should transform OID attributes to common attributes
    it('should transform OID attributes to common attributes', () => {
      const validResponse = {
        response: {
          id: 'response-id-123',
          issueInstant: '2024-01-01T00:00:00Z',
        },
        issuer: 'https://example.com/idp',
        attributes: {
          'urn:oid:2.5.4.42': 'John',
          'urn:oid:2.5.4.4': 'Doe',
          'urn:oid:1.2.840.113549.1.9.1': 'user@example.com',
          customAttribute: 'custom-value',
        },
      };
      const result = saml2LoginResponseSchema.parse(validResponse);
      expect(result.attributes?.givenName).toBe('John');
      expect(result.attributes?.surname).toBe('Doe');
      expect(result.attributes?.email).toBe('user@example.com');
      expect(result.attributes?.customAttribute).toBe('custom-value');
    });

    // Given: Valid response with array attribute values
    // When: Parsing response with array attribute values
    // Then: Should accept response with array attribute values
    it('should accept a response with array attribute values', () => {
      const validResponse = {
        response: {
          id: 'response-id-123',
          issueInstant: '2024-01-01T00:00:00Z',
        },
        issuer: 'https://example.com/idp',
        attributes: {
          roles: ['admin', 'user'],
          groups: ['group1', 'group2'],
        },
      };
      const result = saml2LoginResponseSchema.parse(validResponse);
      expect(result.attributes?.roles).toEqual(['admin', 'user']);
      expect(result.attributes?.groups).toEqual(['group1', 'group2']);
    });

    // Given: Missing required fields
    // When: Parsing response without required fields
    // Then: Should reject response without required fields
    it('should reject a response without response field', () => {
      const invalidResponse = {
        issuer: 'https://example.com/idp',
      };
      const result = saml2LoginResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject a response without issuer field', () => {
      const invalidResponse = {
        response: {
          id: 'response-id-123',
          issueInstant: '2024-01-01T00:00:00Z',
        },
      };
      const result = saml2LoginResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject an empty response object', () => {
      const invalidResponse = {};
      const result = saml2LoginResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    // Given: Invalid response object structure
    // When: Parsing response with invalid response object
    // Then: Should reject response with invalid response object
    it('should reject a response with invalid response object', () => {
      const invalidResponses = [
        {
          response: null,
          issuer: 'https://example.com/idp',
        },
        {
          response: {},
          issuer: 'https://example.com/idp',
        },
        {
          response: {
            // missing id
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
        },
        {
          response: {
            id: 'response-id-123',
            // missing issueInstant
          },
          issuer: 'https://example.com/idp',
        },
      ];

      invalidResponses.forEach((invalidResponse) => {
        const result = saml2LoginResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid conditions object
    // When: Parsing response with invalid conditions
    // Then: Should reject response with invalid conditions
    it('should reject a response with invalid conditions', () => {
      const invalidResponses = [
        {
          conditions: 'string',
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
        },
        {
          conditions: {
            notBefore: 123,
            notOnOrAfter: '2024-12-31T23:59:59Z',
          },
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
        },
      ];

      invalidResponses.forEach((invalidResponse) => {
        const result = saml2LoginResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid sessionIndex object
    // When: Parsing response with invalid sessionIndex
    // Then: Should reject response with invalid sessionIndex
    it('should reject a response with invalid sessionIndex', () => {
      const invalidResponses = [
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
          sessionIndex: 'string',
        },
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
          sessionIndex: {
            // missing authnInstant
            sessionIndex: 'session-index-123',
          },
        },
      ];

      invalidResponses.forEach((invalidResponse) => {
        const result = saml2LoginResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid field types
    // When: Parsing response with invalid field types
    // Then: Should reject response with invalid field types
    it('should reject a response with invalid field types', () => {
      const invalidResponses = [
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: null,
        },
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 123,
        },
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
          audience: 123,
        },
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
          nameID: 123,
        },
        {
          response: {
            id: 'response-id-123',
            issueInstant: '2024-01-01T00:00:00Z',
          },
          issuer: 'https://example.com/idp',
          attributes: 'string',
        },
      ];

      invalidResponses.forEach((invalidResponse) => {
        const result = saml2LoginResponseSchema.safeParse(invalidResponse);
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
        const result = saml2LoginResponseSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid response object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2LoginResponseSchema>;
      type ExpectedType = Saml2LoginResponse;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
