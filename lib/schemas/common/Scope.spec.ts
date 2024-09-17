import { describe, it, expect } from 'vitest';
import {
  scopeSchema,
  Scope,
  nullableButOptionalScopeSchema,
  nullableButOptionalScopeArraySchema,
} from './Scope';

describe('scopeSchema', () => {
  it('should accept a valid Scope object', () => {
    const validScope: Scope = {
      name: 'read',
      defaultEntry: true,
      description: 'Read access',
      descriptions: [{ tag: 'en', value: 'Read access' }],
      attributes: [{ key: 'category', value: 'data' }],
    };
    const result = scopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
  });

  it('should accept a Scope object with undefined values', () => {
    const scopeWithUndefined: Scope = {
      name: undefined,
      defaultEntry: undefined,
      description: undefined,
      descriptions: undefined,
      attributes: undefined,
    };
    const result = scopeSchema.safeParse(scopeWithUndefined);
    expect(result.success).toBe(true);
  });

  it('should accept a Scope object without properties', () => {
    const emptyScope = {};
    const result = scopeSchema.safeParse(emptyScope);
    expect(result.success).toBe(true);
  });

  it('should reject a Scope object with invalid property types', () => {
    const invalidScope = {
      name: 123,
      defaultEntry: 'true',
      description: true,
      descriptions: 'not an array',
      attributes: 'not an array',
    };
    const result = scopeSchema.safeParse(invalidScope);
    expect(result.success).toBe(false);
  });
});

// The tests for nullableButOptionalScopeSchema and nullableButOptionalScopeArraySchema
// can remain largely the same, but we should update the test cases to use the new Scope structure

describe('nullableButOptionalScopeSchema', () => {
  it('should accept a valid Scope object', () => {
    const validScope: Scope = {
      name: 'write',
      defaultEntry: false,
      description: 'Write access',
      descriptions: [{ tag: 'en', value: 'Write access' }],
      attributes: [{ key: 'category', value: 'data' }],
    };
    const result = nullableButOptionalScopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
  });

  // ... (keep other existing tests)

  it('should accept a Scope object with undefined values', () => {
    const scopeWithUndefined = {
      name: undefined,
      defaultEntry: undefined,
      description: undefined,
      descriptions: undefined,
      attributes: undefined,
    };
    const result = nullableButOptionalScopeSchema.safeParse(scopeWithUndefined);
    expect(result.success).toBe(true);
  });
});

describe('nullableButOptionalScopeArraySchema', () => {
  it('should accept an array of valid Scope objects', () => {
    const validScopes = [
      {
        name: 'read',
        defaultEntry: true,
        description: 'Read access',
        descriptions: [{ tag: 'en', value: 'Read access' }],
        attributes: [{ key: 'category', value: 'data' }],
      },
      {
        name: 'write',
        defaultEntry: false,
        description: 'Write access',
        descriptions: [{ tag: 'en', value: 'Write access' }],
        attributes: [{ key: 'category', value: 'data' }],
      },
    ];
    const result = nullableButOptionalScopeArraySchema.safeParse(validScopes);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validScopes);
    }
  });

  // ... (keep other existing tests)

  it('should accept arrays with Scope objects containing undefined values', () => {
    const scopesWithUndefined = [
      {
        name: undefined,
        defaultEntry: undefined,
        description: undefined,
        descriptions: undefined,
        attributes: undefined,
      },
      {
        name: 'write',
        defaultEntry: false,
        description: undefined,
        descriptions: [{ tag: 'en', value: 'Write access' }],
        attributes: undefined,
      },
    ];
    const result =
      nullableButOptionalScopeArraySchema.safeParse(scopesWithUndefined);
    expect(result.success).toBe(true);
  });
});
