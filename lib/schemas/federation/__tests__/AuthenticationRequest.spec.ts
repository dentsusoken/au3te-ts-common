import { describe, it, expect } from 'vitest';
import {
  authenticationRequestSchema,
  type AuthenticationRequest,
} from '../AuthenticationRequest';

describe('AuthenticationRequest', () => {
  describe('authenticationRequestSchema', () => {
    it('should accept a valid AuthenticationRequest object with all fields', () => {
      const validRequest: AuthenticationRequest = {
        response_type: 'code',
        scope: 'openid profile',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: 'challenge123',
        code_challenge_method: 'S256',
      };
      const result = authenticationRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should accept a valid AuthenticationRequest object without optional fields', () => {
      const minimalRequest: AuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
      };
      const result = authenticationRequestSchema.parse(minimalRequest);
      expect(result).toEqual(minimalRequest);
    });

    it('should accept a valid AuthenticationRequest object with null optional fields', () => {
      const requestWithNulls: AuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: null,
        code_challenge_method: null,
      };
      const result = authenticationRequestSchema.parse(requestWithNulls);
      expect(result).toEqual(requestWithNulls);
    });

    it('should accept a valid AuthenticationRequest object with undefined optional fields', () => {
      const requestWithUndefined: AuthenticationRequest = {
        response_type: 'code',
        scope: 'openid',
        client_id: 'client123',
        redirect_uri: 'https://example.com/callback',
        state: 'state123',
        code_challenge: undefined,
        code_challenge_method: undefined,
      };
      const result = authenticationRequestSchema.parse(requestWithUndefined);
      expect(result).toEqual(requestWithUndefined);
    });

    it('should reject an AuthenticationRequest object with missing required fields', () => {
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
        const result = authenticationRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an AuthenticationRequest object with invalid field types', () => {
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
        const result = authenticationRequestSchema.safeParse(invalidRequest);
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
        const result = authenticationRequestSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const requestWithEmptyStrings: AuthenticationRequest = {
        response_type: '',
        scope: '',
        client_id: '',
        redirect_uri: '',
        state: '',
      };
      const result = authenticationRequestSchema.parse(requestWithEmptyStrings);
      expect(result).toEqual(requestWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof authenticationRequestSchema._type;
      type ExpectedType = AuthenticationRequest;

      const assertTypeCompatibility = (
        value: SchemaType
      ): ExpectedType => value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

