import { describe, expect, it } from 'vitest';
import {
  authorizationResponseSchema,
  type AuthorizationResponse,
} from '../AuthorizationResponse';

describe('AuthorizationResponse', () => {
  describe('valid requests', () => {
    it('should accept minimal valid authorization response', () => {
      const validResponse: AuthorizationResponse = {
        action: 'NO_INTERACTION',
      };

      const result = authorizationResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    it('should accept authorization response with all fields', () => {
      const fullResponse: AuthorizationResponse = {
        action: 'LOCATION',
        responseContent: 'https://example.com/callback',
        service: { serviceName: 'TestService' },
        client: { clientName: 'TestClient' },
        maxAge: 3600,
        scopes: [{ name: 'read' }],
        dynamicScopes: [{ name: 'dynamic', value: 'dynamic:123' }],
        claims: ['name', 'email'],
        claimsAtUserInfo: ['profile'],
        acrs: ['urn:mace:incommon:iap:silver'],
        subject: 'user123',
        loginHint: 'john@example.com',
        prompts: ['login', 'consent'],
        idTokenClaims: '{"sub":"user123"}',
        authorizationDetails: {
          elements: [{ type: 'payment', actions: ['initiate'] }],
        },
        purpose: 'account linking',
        userInfoClaims: '{"given_name":"John"}',
        ticket: 'ticket123',
        claimsLocales: ['en', 'fr'],
        requestedClaimsForTx: ['verified_claims'],
        requestedVerifiedClaimsForTx: [{ array: ['name', 'birthdate'] }],
      };

      const result = authorizationResponseSchema.parse(fullResponse);
      expect(result).toEqual(fullResponse);
    });

    it('should accept response with all valid action values', () => {
      const validActions = [
        'INTERNAL_SERVER_ERROR',
        'BAD_REQUEST',
        'LOCATION',
        'FORM',
        'NO_INTERACTION',
        'INTERACTION',
      ];

      validActions.forEach((action) => {
        const response = {
          action,
        };

        const result = authorizationResponseSchema.parse(response);
        expect(result.action).toBe(action);
      });
    });

    it('should accept response with valid string fields', () => {
      const responseWithStrings: AuthorizationResponse = {
        action: 'INTERACTION',
        responseContent: 'https://example.com/callback',
        subject: 'user123',
        loginHint: 'john@example.com',
        idTokenClaims: '{"sub":"user123"}',
        purpose: 'account linking',
        userInfoClaims: '{"given_name":"John"}',
        ticket: 'ticket123',
      };

      const result = authorizationResponseSchema.parse(responseWithStrings);
      expect(result).toEqual(responseWithStrings);
    });

    it('should accept response with valid numeric fields', () => {
      const responseWithNumbers: AuthorizationResponse = {
        action: 'INTERACTION',
        maxAge: 3600,
      };

      const result = authorizationResponseSchema.parse(responseWithNumbers);
      expect(result).toEqual(responseWithNumbers);
    });

    it('should accept response with valid array fields', () => {
      const responseWithArrays: AuthorizationResponse = {
        action: 'INTERACTION',
        claims: ['name', 'email', 'profile'],
        claimsAtUserInfo: ['profile'],
        acrs: ['urn:mace:incommon:iap:silver'],
        prompts: ['login', 'consent'],
        claimsLocales: ['en', 'fr'],
        requestedClaimsForTx: ['verified_claims'],
      };

      const result = authorizationResponseSchema.parse(responseWithArrays);
      expect(result).toEqual(responseWithArrays);
    });

    it('should accept response with valid object fields', () => {
      const responseWithObjects: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'TestService' },
        client: { clientName: 'TestClient' },
        scopes: [{ name: 'read' }, { name: 'write' }],
        dynamicScopes: [{ name: 'dynamic', value: 'dynamic:123' }],
      };

      const result = authorizationResponseSchema.parse(responseWithObjects);
      expect(result).toEqual(responseWithObjects);
    });

    it('should accept response with valid authorization details', () => {
      const responseWithAuthzDetails: AuthorizationResponse = {
        action: 'INTERACTION',
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              actions: ['initiate'],
              locations: ['https://payment.example.com'],
              datatypes: ['transaction'],
            },
            {
              type: 'account',
              actions: ['read'],
            },
          ],
        },
      };

      const result = authorizationResponseSchema.parse(
        responseWithAuthzDetails
      );
      expect(result).toEqual(responseWithAuthzDetails);
    });

    it('should accept response with valid requestedVerifiedClaimsForTx', () => {
      const responseWithVerifiedClaims: AuthorizationResponse = {
        action: 'INTERACTION',
        requestedVerifiedClaimsForTx: [
          { array: ['name', 'birthdate'] },
          { array: ['email', 'phone'] },
        ],
      };

      const result = authorizationResponseSchema.parse(
        responseWithVerifiedClaims
      );
      expect(result).toEqual(responseWithVerifiedClaims);
    });

    it('should accept response with null values for optional fields', () => {
      const responseWithNulls = {
        action: 'INTERACTION',
        responseContent: null,
        service: null,
        client: null,
        maxAge: null,
        scopes: null,
        dynamicScopes: null,
        claims: null,
        claimsAtUserInfo: null,
        acrs: null,
        subject: null,
        loginHint: null,
        prompts: null,
        idTokenClaims: null,
        authorizationDetails: null,
        purpose: null,
        userInfoClaims: null,
        ticket: null,
        claimsLocales: null,
        requestedClaimsForTx: null,
        requestedVerifiedClaimsForTx: null,
      };

      const result = authorizationResponseSchema.parse(responseWithNulls);
      expect(result.responseContent).toBeNull();
      expect(result.service).toBeNull();
      expect(result.client).toBeNull();
      expect(result.maxAge).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.dynamicScopes).toBeNull();
      expect(result.claims).toBeNull();
      expect(result.claimsAtUserInfo).toBeNull();
      expect(result.acrs).toBeNull();
      expect(result.subject).toBeNull();
      expect(result.loginHint).toBeNull();
      expect(result.prompts).toBeNull();
      expect(result.idTokenClaims).toBeNull();
      expect(result.authorizationDetails).toBeNull();
      expect(result.purpose).toBeNull();
      expect(result.userInfoClaims).toBeNull();
      expect(result.ticket).toBeNull();
      expect(result.claimsLocales).toBeNull();
      expect(result.requestedClaimsForTx).toBeNull();
      expect(result.requestedVerifiedClaimsForTx).toBeNull();
    });

    it('should accept response with empty arrays', () => {
      const responseWithEmptyArrays: AuthorizationResponse = {
        action: 'INTERACTION',
        claims: [],
        claimsAtUserInfo: [],
        acrs: [],
        prompts: [],
        claimsLocales: [],
        requestedClaimsForTx: [],
        requestedVerifiedClaimsForTx: [],
        scopes: [],
        dynamicScopes: [],
      };

      const result = authorizationResponseSchema.parse(responseWithEmptyArrays);
      expect(result).toEqual(responseWithEmptyArrays);
    });

    it('should accept response with zero numeric values', () => {
      const responseWithZeros: AuthorizationResponse = {
        action: 'INTERACTION',
        maxAge: 0,
      };

      const result = authorizationResponseSchema.parse(responseWithZeros);
      expect(result).toEqual(responseWithZeros);
    });

    it('should accept response with negative numeric values', () => {
      const responseWithNegatives: AuthorizationResponse = {
        action: 'INTERACTION',
        maxAge: -1,
      };

      const result = authorizationResponseSchema.parse(responseWithNegatives);
      expect(result).toEqual(responseWithNegatives);
    });
  });

  describe('invalid requests', () => {
    it('should reject response without required action field', () => {
      const invalidResponse = {};

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid action values', () => {
      const invalidActions = [
        'INVALID_ACTION',
        'ok',
        '',
        123,
        null,
        undefined,
        {},
        [],
      ];

      invalidActions.forEach((action) => {
        const response = {
          action,
        };

        const result = authorizationResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1);
          expect(result.error.issues[0].path).toEqual(['action']);
        }
      });
    });

    it('should reject response with non-string responseContent', () => {
      const invalidResponse = {
        action: 'LOCATION',
        responseContent: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['responseContent']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-number maxAge', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        maxAge: '3600',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['maxAge']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array claims', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        claims: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['claims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array claimsAtUserInfo', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        claimsAtUserInfo: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['claimsAtUserInfo']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array acrs', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        acrs: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['acrs']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string subject', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        subject: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string loginHint', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        loginHint: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['loginHint']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array prompts', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        prompts: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['prompts']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string idTokenClaims', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        idTokenClaims: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['idTokenClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string purpose', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        purpose: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['purpose']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string userInfoClaims', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        userInfoClaims: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['userInfoClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-string ticket', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        ticket: 123,
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array claimsLocales', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        claimsLocales: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['claimsLocales']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with non-array requestedClaimsForTx', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        requestedClaimsForTx: 'not-an-array',
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['requestedClaimsForTx']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject response with invalid requestedVerifiedClaimsForTx structure', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        requestedVerifiedClaimsForTx: ['name', 'birthdate'], // Should be [{ array: [...] }]
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject response with invalid authorization details structure', () => {
      const invalidResponse = {
        action: 'INTERACTION',
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              actions: 'not-an-array', // Should be array
            },
          ],
        },
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject response with multiple invalid fields', () => {
      const invalidResponse = {
        action: 'INVALID_ACTION',
        maxAge: 'not-a-number',
        claims: 'not-an-array',
        subject: 123,
        requestedVerifiedClaimsForTx: ['name', 'birthdate'],
      };

      const result = authorizationResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept response with empty string values', () => {
      const responseWithEmptyStrings: AuthorizationResponse = {
        action: 'INTERACTION',
        responseContent: '',
        subject: '',
        loginHint: '',
        idTokenClaims: '',
        purpose: '',
        userInfoClaims: '',
        ticket: '',
      };

      const result = authorizationResponseSchema.parse(
        responseWithEmptyStrings
      );
      expect(result).toEqual(responseWithEmptyStrings);
    });

    it('should accept response with very long string values', () => {
      const longString = 'a'.repeat(1000);
      const responseWithLongStrings: AuthorizationResponse = {
        action: 'INTERACTION',
        responseContent: longString,
        subject: longString,
        loginHint: longString,
        idTokenClaims: longString,
        purpose: longString,
        userInfoClaims: longString,
        ticket: longString,
      };

      const result = authorizationResponseSchema.parse(responseWithLongStrings);
      expect(result).toEqual(responseWithLongStrings);
    });

    it('should accept response with large numeric values', () => {
      const responseWithLargeNumbers: AuthorizationResponse = {
        action: 'INTERACTION',
        maxAge: Number.MAX_SAFE_INTEGER,
      };

      const result = authorizationResponseSchema.parse(
        responseWithLargeNumbers
      );
      expect(result).toEqual(responseWithLargeNumbers);
    });

    it('should accept response with very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `claim${i}`);
      const responseWithLongArrays: AuthorizationResponse = {
        action: 'INTERACTION',
        claims: longArray,
        claimsAtUserInfo: longArray,
        acrs: longArray,
        prompts: Array.from(
          { length: 1000 },
          (_, i) =>
            (['login', 'consent', 'select_account', 'create', 'none'] as const)[
              i % 5
            ]
        ),
        claimsLocales: longArray,
        requestedClaimsForTx: longArray,
        requestedVerifiedClaimsForTx: longArray.map(() => ({
          array: longArray,
        })),
      };

      const result = authorizationResponseSchema.parse(responseWithLongArrays);
      expect(result).toEqual(responseWithLongArrays);
    });
  });
});
