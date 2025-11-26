import { describe, it, expect } from 'vitest';
import {
  oidcAuthenticationRequestSchema,
  type OidcAuthenticationRequest,
} from '../OidcAuthenticationRequest';

describe('OidcAuthenticationRequest', () => {
  describe('oidcAuthenticationRequestSchema', () => {
    it('should accept a valid OidcAuthenticationRequest object with all fields', () => {
      const validRequest: OidcAuthenticationRequest = {
        response_type: 'code',
        scope: 'openid profile',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: 'challenge123',
        code_challenge_method: 'S256',
      };
      const result = oidcAuthenticationRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should accept a valid OidcAuthenticationRequest object without optional fields', () => {
      const minimalRequest: OidcAuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
      };
      const result = oidcAuthenticationRequestSchema.parse(minimalRequest);
      expect(result).toEqual(minimalRequest);
    });

    it('should accept a valid OidcAuthenticationRequest object with null optional fields', () => {
      const requestWithNulls: OidcAuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: null,
        code_challenge_method: null,
      };
      const result = oidcAuthenticationRequestSchema.parse(requestWithNulls);
      expect(result).toEqual(requestWithNulls);
    });

    it('should accept a valid OidcAuthenticationRequest object with undefined optional fields', () => {
      const requestWithUndefined: OidcAuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: undefined,
        code_challenge_method: undefined,
      };
      const result = oidcAuthenticationRequestSchema.parse(requestWithUndefined);
      expect(result).toEqual(requestWithUndefined);
    });

    it('should reject an OidcAuthenticationRequest object with missing required fields', () => {
      const invalidRequests = [
        {},
        { response_type: 'code' },
        { response_type: 'code', scope: 'openid' },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
        },
      ];

      invalidRequests.forEach((invalidRequest) => {
        const result =
          oidcAuthenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcAuthenticationRequest object with invalid field types', () => {
      const invalidRequests = [
        {
          response_type: 123,
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
        },
        {
          response_type: 'code',
          scope: {},
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: [],
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 123,
          state: 'state123',
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: {},
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
          code_challenge: 123,
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
          code_challenge_method: [],
        },
      ];

      invalidRequests.forEach((invalidRequest) => {
        const result =
          oidcAuthenticationRequestSchema.safeParse(invalidRequest);
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
        const result = oidcAuthenticationRequestSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const requestWithEmptyStrings: OidcAuthenticationRequest = {
        response_type: '',
        scope: '',
        client_id: '',
        redirect_uri: '',
        state: '',
      };
      const result = oidcAuthenticationRequestSchema.parse(requestWithEmptyStrings);
      expect(result).toEqual(requestWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof oidcAuthenticationRequestSchema._type;
      type ExpectedType = OidcAuthenticationRequest;

      const assertTypeCompatibility = (
        value: SchemaType
      ): ExpectedType => value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

