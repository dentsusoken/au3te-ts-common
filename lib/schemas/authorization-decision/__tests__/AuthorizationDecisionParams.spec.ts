import { describe, it, expect } from 'vitest';
import {
  authorizationDecisionParamsSchema,
  AuthorizationDecisionParams,
} from '../AuthorizationDecisionParams';

describe('authorizationDecisionParamsSchema', () => {
  describe('success cases', () => {
    it('should parse a valid AuthorizationDecisionParams object', () => {
      const validParams: AuthorizationDecisionParams = {
        ticket: 'valid-ticket',
        claimNames: ['name', 'email'],
        claimLocales: ['en', 'ja'],
        idTokenClaims: 'id-token-claim',
        requestedClaimsForTx: ['claim1', 'claim2'],
        requestedVerifiedClaimsForTx: [
          { array: ['verified1', 'verified2'] },
          { array: ['verified3'] },
        ],
      };

      const result = authorizationDecisionParamsSchema.parse(validParams);

      expect(result).toEqual(validParams);
    });

    it('should parse an empty object', () => {
      const emptyParams: AuthorizationDecisionParams = {};

      const result = authorizationDecisionParamsSchema.parse(emptyParams);

      expect(result).toEqual({});
    });

    it('should parse an object with undefined values', () => {
      const nullParams: AuthorizationDecisionParams = {
        ticket: undefined,
        claimNames: undefined,
        claimLocales: undefined,
        idTokenClaims: undefined,
        requestedClaimsForTx: undefined,
        requestedVerifiedClaimsForTx: undefined,
      };

      const result = authorizationDecisionParamsSchema.parse(nullParams);

      expect(result).toEqual(nullParams);
    });

    it('should parse an object with null values', () => {
      const nullParams = {
        ticket: null,
        claimNames: null,
        claimLocales: null,
        idTokenClaims: null,
        requestedClaimsForTx: null,
        requestedVerifiedClaimsForTx: null,
      };

      const result = authorizationDecisionParamsSchema.parse(nullParams);

      expect(result).toEqual(nullParams);
    });

    it('should parse an object with partial fields', () => {
      const partialParams: AuthorizationDecisionParams = {
        ticket: 'partial-ticket',
        claimNames: ['name'],
      };

      const result = authorizationDecisionParamsSchema.parse(partialParams);

      expect(result).toEqual(partialParams);
    });

    it('should parse requestedVerifiedClaimsForTx as array of stringArray objects', () => {
      const params: AuthorizationDecisionParams = {
        requestedVerifiedClaimsForTx: [
          { array: ['claim1', 'claim2'] },
          { array: ['claim3'] },
          { array: [] },
        ],
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result).toEqual(params);
      expect(result.requestedVerifiedClaimsForTx).toHaveLength(3);
      expect(result.requestedVerifiedClaimsForTx![0].array).toEqual([
        'claim1',
        'claim2',
      ]);
      expect(result.requestedVerifiedClaimsForTx![1].array).toEqual(['claim3']);
      expect(result.requestedVerifiedClaimsForTx![2].array).toEqual([]);
    });

    it('should parse mixed data types correctly', () => {
      const mixedParams: AuthorizationDecisionParams = {
        ticket: 'mixed-ticket',
        claimNames: ['name', 'email', 'phone'],
        claimLocales: ['en-US', 'ja-JP'],
        idTokenClaims: '{"sub":"user123","name":"John"}',
        requestedClaimsForTx: ['verified_claims', 'custom_claims'],
        requestedVerifiedClaimsForTx: [
          { array: ['identity', 'address'] },
          { array: ['employment'] },
        ],
      };

      const result = authorizationDecisionParamsSchema.parse(mixedParams);

      expect(result).toEqual(mixedParams);
    });
  });

  describe('failure cases', () => {
    it('should fail when ticket is not a string', () => {
      const invalidParams = {
        ticket: 123,
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when claimNames is not an array', () => {
      const invalidParams = {
        claimNames: 'not an array',
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['claimNames']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when claimNames contains non-string elements', () => {
      const invalidParams = {
        claimNames: ['valid', 123, {}],
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].path).toEqual(['claimNames', 1]);
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[1].path).toEqual(['claimNames', 2]);
        expect(result.error.issues[1].code).toBe('invalid_type');
      }
    });

    it('should fail when claimLocales contains non-string elements', () => {
      const invalidParams = {
        claimLocales: [123, 'valid'],
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['claimLocales', 0]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when idTokenClaims is not a string', () => {
      const invalidParams = {
        idTokenClaims: {},
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['idTokenClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when requestedClaimsForTx contains non-string elements', () => {
      const invalidParams = {
        requestedClaimsForTx: ['valid', {}],
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'requestedClaimsForTx',
          1,
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when requestedVerifiedClaimsForTx is not an array', () => {
      const invalidParams = {
        requestedVerifiedClaimsForTx: 'not-an-array',
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'requestedVerifiedClaimsForTx',
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when requestedVerifiedClaimsForTx contains invalid structures', () => {
      const invalidParams = {
        requestedVerifiedClaimsForTx: [
          ['invalid'],
          'not-an-array',
          { array: [123] },
        ],
      };

      const result = authorizationDecisionParamsSchema.safeParse(invalidParams);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(3);
        expect(result.error.issues[0].path).toEqual([
          'requestedVerifiedClaimsForTx',
          0,
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[1].path).toEqual([
          'requestedVerifiedClaimsForTx',
          1,
        ]);
        expect(result.error.issues[1].code).toBe('invalid_type');
        expect(result.error.issues[2].path).toEqual([
          'requestedVerifiedClaimsForTx',
          2,
          'array',
          0,
        ]);
        expect(result.error.issues[2].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer AuthorizationDecisionParams type', () => {
      const params: AuthorizationDecisionParams = {
        ticket: 'type-test-ticket',
        claimNames: ['name', 'email'],
        requestedVerifiedClaimsForTx: [{ array: ['identity'] }],
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result).toEqual(params);
      expect(typeof result.ticket).toBe('string');
      expect(Array.isArray(result.claimNames)).toBe(true);
      expect(Array.isArray(result.requestedVerifiedClaimsForTx)).toBe(true);
      expect(result.requestedVerifiedClaimsForTx![0]).toHaveProperty('array');
    });

    it('should handle undefined optional fields in type inference', () => {
      const params: AuthorizationDecisionParams = {
        ticket: 'minimal-ticket',
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result.ticket).toBe('minimal-ticket');
      expect(result.claimNames).toBeUndefined();
      expect(result.claimLocales).toBeUndefined();
      expect(result.idTokenClaims).toBeUndefined();
      expect(result.requestedClaimsForTx).toBeUndefined();
      expect(result.requestedVerifiedClaimsForTx).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      const params: AuthorizationDecisionParams = {
        ticket: 'edge-ticket',
        claimNames: [],
        claimLocales: [],
        requestedClaimsForTx: [],
        requestedVerifiedClaimsForTx: [],
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result).toEqual(params);
      expect(result.claimNames).toEqual([]);
      expect(result.claimLocales).toEqual([]);
      expect(result.requestedClaimsForTx).toEqual([]);
      expect(result.requestedVerifiedClaimsForTx).toEqual([]);
    });

    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const params: AuthorizationDecisionParams = {
        ticket: longString,
        idTokenClaims: longString,
        claimNames: [longString],
        claimLocales: [longString],
        requestedClaimsForTx: [longString],
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result.ticket).toBe(longString);
      expect(result.idTokenClaims).toBe(longString);
      expect(result.claimNames).toEqual([longString]);
      expect(result.claimLocales).toEqual([longString]);
      expect(result.requestedClaimsForTx).toEqual([longString]);
    });

    it('should handle special characters in strings', () => {
      const params: AuthorizationDecisionParams = {
        ticket: 'ticket-with-special-chars!@#$%^&*()',
        idTokenClaims: '{"sub":"user123","name":"José María"}',
        claimNames: ['given_name', 'family_name', 'preferred_username'],
        claimLocales: ['en-US', 'es-MX', 'ja-JP'],
        requestedClaimsForTx: ['verified_claims', 'custom_claims'],
        requestedVerifiedClaimsForTx: [
          { array: ['identity', 'address', 'employment'] },
        ],
      };

      const result = authorizationDecisionParamsSchema.parse(params);

      expect(result).toEqual(params);
    });
  });
});
