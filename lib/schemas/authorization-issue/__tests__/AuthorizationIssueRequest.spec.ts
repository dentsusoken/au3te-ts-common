import { describe, it, expect } from 'vitest';
import {
  authorizationIssueRequestSchema,
  AuthorizationIssueRequest,
} from '../AuthorizationIssueRequest';

describe('authorizationIssueRequestSchema', () => {
  describe('success cases', () => {
    it('should parse a valid request with all fields', () => {
      const validRequest: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        subject: 'test-subject',
        sub: 'test-sub',
        authTime: 1234567890,
        acr: 'test-acr',
        claims: '{"claim1": "value1"}',
        properties: [{ key: 'prop1', value: 'value1' }],
        scopes: ['scope1', 'scope2'],
        idtHeaderParams: '{"alg": "RS256"}',
        authorizationDetails: {
          elements: [
            {
              type: 'payment_initiation',
              actions: ['read', 'write'],
            },
          ],
        },
        consentedClaims: ['claim1', 'claim2'],
        claimsForTx: '{"tx_claim1": "value1"}',
        verifiedClaimsForTx: ['{"verified_claim1": "value1"}'],
        jwtAtClaims: '{"additional_claim": "value"}',
        accessToken: 'test-access-token',
        idTokenAudType: 'array',
        accessTokenDuration: 3600,
      };

      const result = authorizationIssueRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should parse a request with null and undefined values', () => {
      const nullRequest = {
        ticket: 'valid-ticket',
        subject: null,
        sub: undefined,
        authTime: null,
        acr: null,
        claims: null,
        properties: null,
        scopes: null,
        idtHeaderParams: null,
        authorizationDetails: null,
        consentedClaims: null,
        claimsForTx: null,
        verifiedClaimsForTx: null,
        jwtAtClaims: null,
        accessToken: null,
        idTokenAudType: null,
        accessTokenDuration: null,
      };

      const result = authorizationIssueRequestSchema.parse(nullRequest);
      expect(result).toEqual(nullRequest);
    });

    it('should parse a minimal request with only required fields', () => {
      const minimalRequest = { ticket: 'valid-ticket' };
      const result = authorizationIssueRequestSchema.parse(minimalRequest);
      expect(result).toEqual(minimalRequest);
    });

    it('should parse a request with partial fields', () => {
      const partialRequest = {
        ticket: 'valid-ticket',
        subject: 'test-subject',
        authTime: 1234567890,
        scopes: ['scope1'],
      };

      const result = authorizationIssueRequestSchema.parse(partialRequest);
      expect(result).toEqual(partialRequest);
    });
  });

  describe('failure cases', () => {
    it('should fail when ticket is not a string', () => {
      const invalidRequest = { ticket: 123 };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when ticket is missing', () => {
      const invalidRequest = { subject: 'test-subject' };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when authTime is not a number', () => {
      const invalidRequest = { ticket: 'valid-ticket', authTime: '1234567890' };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['authTime']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when properties contains invalid objects', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        properties: [{ key: 1 }],
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['properties', 0, 'key']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when scopes contains non-string elements', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        scopes: ['valid', 123],
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['scopes', 1]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when authorizationDetails is invalid', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        authorizationDetails: [{ invalid: 'detail' }],
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['authorizationDetails']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when accessTokenDuration is not a number', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        accessTokenDuration: '3600',
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['accessTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when string fields are not strings', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        subject: 123,
        sub: true,
        acr: {},
        claims: [],
        idtHeaderParams: 456,
        claimsForTx: null,
        jwtAtClaims: false,
        accessToken: 789,
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when consentedClaims contains non-string elements', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        consentedClaims: ['valid', 123],
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['consentedClaims', 1]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when verifiedClaimsForTx contains non-string elements', () => {
      const invalidRequest = {
        ticket: 'valid-ticket',
        verifiedClaimsForTx: ['valid', 123],
      };
      const result = authorizationIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['verifiedClaimsForTx', 1]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer AuthorizationIssueRequest type', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        subject: 'test-subject',
        authTime: 1234567890,
        scopes: ['scope1'],
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result).toEqual(request);
      expect(typeof result.ticket).toBe('string');
      expect(typeof result.subject).toBe('string');
      expect(typeof result.authTime).toBe('number');
      expect(Array.isArray(result.scopes)).toBe(true);
    });

    it('should handle undefined optional fields in type inference', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.ticket).toBe('valid-ticket');
      expect(result.subject).toBeUndefined();
      expect(result.sub).toBeUndefined();
      expect(result.authTime).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const request: AuthorizationIssueRequest = {
        ticket: longString,
        subject: longString,
        sub: longString,
        acr: longString,
        claims: longString,
        idtHeaderParams: longString,
        claimsForTx: longString,
        jwtAtClaims: longString,
        accessToken: longString,
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.ticket).toBe(longString);
      expect(result.subject).toBe(longString);
      expect(result.sub).toBe(longString);
      expect(result.acr).toBe(longString);
      expect(result.claims).toBe(longString);
      expect(result.idtHeaderParams).toBe(longString);
      expect(result.claimsForTx).toBe(longString);
      expect(result.jwtAtClaims).toBe(longString);
      expect(result.accessToken).toBe(longString);
    });

    it('should handle special characters in strings', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'ticket!@#$%^&*()',
        subject: 'José María',
        sub: 'sub!@#$%^&*()',
        acr: 'acr!@#$%^&*()',
        claims: '{"claim": "José María"}',
        idtHeaderParams: '{"alg": "RS256", "kid": "key!@#$%^&*()"}',
        claimsForTx: '{"tx_claim": "José María"}',
        jwtAtClaims: '{"additional_claim": "José María"}',
        accessToken: 'token!@#$%^&*()',
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.ticket).toBe('ticket!@#$%^&*()');
      expect(result.subject).toBe('José María');
      expect(result.sub).toBe('sub!@#$%^&*()');
      expect(result.acr).toBe('acr!@#$%^&*()');
      expect(result.claims).toBe('{"claim": "José María"}');
      expect(result.idtHeaderParams).toBe(
        '{"alg": "RS256", "kid": "key!@#$%^&*()"}'
      );
      expect(result.claimsForTx).toBe('{"tx_claim": "José María"}');
      expect(result.jwtAtClaims).toBe('{"additional_claim": "José María"}');
      expect(result.accessToken).toBe('token!@#$%^&*()');
    });

    it('should handle empty arrays', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        properties: [],
        scopes: [],
        consentedClaims: [],
        verifiedClaimsForTx: [],
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.properties).toEqual([]);
      expect(result.scopes).toEqual([]);
      expect(result.consentedClaims).toEqual([]);
      expect(result.verifiedClaimsForTx).toEqual([]);
    });

    it('should handle large numbers', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        authTime: Number.MAX_SAFE_INTEGER,
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.authTime).toBe(Number.MAX_SAFE_INTEGER);
      expect(result.accessTokenDuration).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle valid idTokenAudType values', () => {
      const request1: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        idTokenAudType: 'string',
      };
      const result1 = authorizationIssueRequestSchema.parse(request1);
      expect(result1.idTokenAudType).toBe('string');

      const request2: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        idTokenAudType: 'array',
      };
      const result2 = authorizationIssueRequestSchema.parse(request2);
      expect(result2.idTokenAudType).toBe('array');
    });

    it('should handle complex authorizationDetails structure', () => {
      const request: AuthorizationIssueRequest = {
        ticket: 'valid-ticket',
        authorizationDetails: {
          elements: [
            {
              type: 'payment_initiation',
              actions: ['read', 'write'],
              locations: ['https://example.com'],
              datatypes: ['account'],
            },
            {
              type: 'openid_credential',
              actions: ['read'],
              locations: ['https://example.org'],
            },
          ],
        },
      };

      const result = authorizationIssueRequestSchema.parse(request);
      expect(result.authorizationDetails?.elements).toHaveLength(2);
      expect(result.authorizationDetails?.elements?.[0].type).toBe(
        'payment_initiation'
      );
      expect(result.authorizationDetails?.elements?.[1].type).toBe(
        'openid_credential'
      );
    });
  });
});
