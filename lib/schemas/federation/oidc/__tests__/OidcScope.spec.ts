import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  oidcScopeEnumSchema,
  oidcScopeSchema,
  type OidcScopeEnum,
  type OidcScope,
} from '../OidcScope';

describe('OidcScope', () => {
  describe('oidcScopeEnumSchema', () => {
    // Given: Valid OIDC scope enum values
    // When: Parsing valid scope enum values
    // Then: Should accept all valid scope enum values
    const validScopes: OidcScopeEnum[] = [
      'openid',
      'email',
      'profile',
      'address',
      'phone',
    ];

    validScopes.forEach((scope) => {
      it(`should accept valid scope enum value: ${scope}`, () => {
        const result = oidcScopeEnumSchema.parse(scope);
        expect(result).toBe(scope);
      });
    });

    // Given: Invalid scope enum values
    // When: Parsing invalid scope enum values
    // Then: Should reject invalid scope enum values
    const invalidScopes = [
      'invalid',
      'openid2',
      'EMAIL',
      'Profile',
      '',
      null,
      undefined,
      123,
      true,
      [],
      {},
    ];

    invalidScopes.forEach((scope) => {
      it(`should reject invalid scope enum value: ${JSON.stringify(scope)}`, () => {
        const result = oidcScopeEnumSchema.safeParse(scope);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('oidcScopeSchema', () => {
    // Given: Valid OIDC scope array
    // When: Parsing valid scope array
    // Then: Should accept valid scope array
    it('should accept a valid OidcScope array with single scope', () => {
      const validScope: OidcScope = ['openid'];
      const result = oidcScopeSchema.parse(validScope);
      expect(result).toEqual(validScope);
    });

    it('should accept a valid OidcScope array with multiple scopes', () => {
      const validScope: OidcScope = [
        'openid',
        'email',
        'profile',
        'address',
        'phone',
      ];
      const result = oidcScopeSchema.parse(validScope);
      expect(result).toEqual(validScope);
    });

    it('should accept a valid OidcScope array with duplicate scopes', () => {
      const validScope: OidcScope = ['openid', 'email', 'openid'];
      const result = oidcScopeSchema.parse(validScope);
      expect(result).toEqual(validScope);
    });

    // Given: Empty array
    // When: Parsing empty array
    // Then: Should reject empty array (nonempty constraint)
    it('should reject an empty array', () => {
      const invalidScope: unknown[] = [];
      const result = oidcScopeSchema.safeParse(invalidScope);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.code).toBe('too_small');
      }
    });

    // Given: Array with invalid scope values
    // When: Parsing array with invalid scope values
    // Then: Should reject array with invalid scope values
    it('should reject an array with invalid scope values', () => {
      const invalidScopes = [
        ['invalid'],
        ['openid', 'invalid'],
        ['openid', ''],
        ['openid', null],
        ['openid', undefined],
        ['openid', 123],
        ['openid', true],
        ['openid', {}],
        ['openid', []],
      ];

      invalidScopes.forEach((invalidScope) => {
        const result = oidcScopeSchema.safeParse(invalidScope);
        expect(result.success).toBe(false);
      });
    });

    // Given: Non-array values
    // When: Parsing non-array values
    // Then: Should reject non-array values
    it('should reject non-array values', () => {
      const invalidValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        {},
        () => {},
      ];

      invalidValues.forEach((value) => {
        const result = oidcScopeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid scope array
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof oidcScopeSchema>;
      type ExpectedType = OidcScope;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
