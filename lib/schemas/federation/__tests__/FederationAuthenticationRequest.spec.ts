import { describe, it, expect } from 'vitest';
import {
  federationAuthenticationRequestSchema,
  type FederationAuthenticationRequest,
} from '../FederationAuthenticationRequest';

describe('FederationAuthenticationRequest', () => {
  describe('federationAuthenticationRequestSchema', () => {
    it('should accept a valid FederationAuthenticationRequest object with all fields', () => {
      const validRequest: FederationAuthenticationRequest = {
        protocol: 'oidc',
        response_type: 'code',
        scope: 'openid profile',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: 'challenge123',
        code_challenge_method: 'S256',
      };
      const result = federationAuthenticationRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should accept a valid FederationAuthenticationRequest object without optional fields', () => {
      const minimalRequest: FederationAuthenticationRequest = {
        protocol: 'oidc',
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
      };
      const result = federationAuthenticationRequestSchema.parse(minimalRequest);
      expect(result).toEqual(minimalRequest);
    });

    it('should accept a valid FederationAuthenticationRequest object with null optional fields', () => {
      const requestWithNulls: FederationAuthenticationRequest = {
        protocol: 'oidc',
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: null,
        code_challenge_method: null,
      };
      const result = federationAuthenticationRequestSchema.parse(requestWithNulls);
      expect(result).toEqual(requestWithNulls);
    });

    it('should accept a valid FederationAuthenticationRequest object with undefined optional fields', () => {
      const requestWithUndefined: FederationAuthenticationRequest = {
        protocol: 'oidc',
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: undefined,
        code_challenge_method: undefined,
      };
      const result = federationAuthenticationRequestSchema.parse(requestWithUndefined);
      expect(result).toEqual(requestWithUndefined);
    });

    it('should reject a FederationAuthenticationRequest object with missing required fields', () => {
      const invalidRequests = [
        {},
        { response_type: 'code' },
        { response_type: 'code', scope: 'openid' },
        { response_type: 'code', scope: 'openid', client_id: 'client123' },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
        },
      ];

      invalidRequests.forEach((invalidRequest) => {
        const result = federationAuthenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationAuthenticationRequest object with invalid field types', () => {
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
          redirect_uri: true,
          state: 'state123',
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 123,
        },
        {
          response_type: 'code',
          scope: 'openid',
          client_id: 'client123',
          redirect_uri: 'https://example.com/callback',
          state: 'state123',
          code_challenge: {},
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
        const result = federationAuthenticationRequestSchema.safeParse(invalidRequest);
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
        const result = federationAuthenticationRequestSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const requestWithEmptyStrings: FederationAuthenticationRequest = {
        protocol: 'oidc',
        response_type: '',
        scope: '',
        client_id: '',
        redirect_uri: '',
        state: '',
      };
      const result = federationAuthenticationRequestSchema.parse(requestWithEmptyStrings);
      expect(result).toEqual(requestWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationAuthenticationRequestSchema._type;
      type ExpectedType = FederationAuthenticationRequest;

      const assertTypeCompatibility = (
        value: SchemaType
      ): ExpectedType => value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

