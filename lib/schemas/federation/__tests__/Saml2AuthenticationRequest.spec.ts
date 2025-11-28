import { describe, it, expect } from 'vitest';
import {
  saml2AuthenticationRequestSchema,
  type Saml2AuthenticationRequest,
} from '../Saml2AuthenticationRequest';

describe('Saml2AuthenticationRequest', () => {
  describe('saml2AuthenticationRequestSchema', () => {
    it('should accept a valid Saml2AuthenticationRequest object with all fields', () => {
      const validRequest: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
        binding: 'HTTP-POST',
      };
      const result = saml2AuthenticationRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should accept a valid Saml2AuthenticationRequest object without optional fields', () => {
      const minimalRequest: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
      };
      const result = saml2AuthenticationRequestSchema.parse(minimalRequest);
      expect(result).toEqual(minimalRequest);
    });

    it('should accept a valid Saml2AuthenticationRequest object with null optional fields', () => {
      const requestWithNulls: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
        binding: null,
      };
      const result = saml2AuthenticationRequestSchema.parse(requestWithNulls);
      expect(result).toEqual(requestWithNulls);
    });

    it('should accept a valid Saml2AuthenticationRequest object with undefined optional fields', () => {
      const requestWithUndefined: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
        binding: undefined,
      };
      const result = saml2AuthenticationRequestSchema.parse(requestWithUndefined);
      expect(result).toEqual(requestWithUndefined);
    });

    it('should accept HTTP-POST binding', () => {
      const request: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
        binding: 'HTTP-POST',
      };
      const result = saml2AuthenticationRequestSchema.parse(request);
      expect(result.binding).toBe('HTTP-POST');
    });

    it('should accept HTTP-Redirect binding', () => {
      const request: Saml2AuthenticationRequest = {
        relayState: 'relay-state-123',
        binding: 'HTTP-Redirect',
      };
      const result = saml2AuthenticationRequestSchema.parse(request);
      expect(result.binding).toBe('HTTP-Redirect');
    });

    it('should reject an Saml2AuthenticationRequest object with missing required fields', () => {
      const invalidRequests = [{}, { binding: 'HTTP-POST' }];

      invalidRequests.forEach((invalidRequest) => {
        const result =
          saml2AuthenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an Saml2AuthenticationRequest object with invalid binding', () => {
      const invalidRequests = [
        {
          relayState: 'relay-state-123',
          binding: 'HTTP-GET',
        },
        {
          relayState: 'relay-state-123',
          binding: 'SOAP',
        },
        {
          relayState: 'relay-state-123',
          binding: 'invalid',
        },
        {
          relayState: 'relay-state-123',
          binding: '',
        },
        {
          relayState: 'relay-state-123',
          binding: 123,
        },
        {
          relayState: 'relay-state-123',
          binding: {},
        },
      ];

      invalidRequests.forEach((invalidRequest) => {
        const result =
          saml2AuthenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an Saml2AuthenticationRequest object with invalid field types', () => {
      const invalidRequests = [
        {
          relayState: 123,
        },
        {
          relayState: {},
        },
        {
          relayState: [],
        },
      ];

      invalidRequests.forEach((invalidRequest) => {
        const result =
          saml2AuthenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

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
        const result = saml2AuthenticationRequestSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const requestWithEmptyStrings: Saml2AuthenticationRequest = {
        relayState: '',
      };
      const result = saml2AuthenticationRequestSchema.parse(requestWithEmptyStrings);
      expect(result).toEqual(requestWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof saml2AuthenticationRequestSchema._type;
      type ExpectedType = Saml2AuthenticationRequest;

      const assertTypeCompatibility = (
        value: SchemaType
      ): ExpectedType => value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

