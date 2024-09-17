import { describe, it, expect } from 'vitest';
import {
  dynamicScopeSchema,
  DynamicScope,
  nullableButOptionalDynamicScopeSchema,
  nullableButOptionalDynamicScopeArraySchema,
} from './DynamicScope';

describe('dynamicScopeSchema', () => {
  it('should accept a valid DynamicScope object', () => {
    const validScope: DynamicScope = { name: 'read', value: 'read:123' };
    const result = dynamicScopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
  });

  it('should accept a DynamicScope object with undefined values', () => {
    const scopeWithUndefined: DynamicScope = {
      name: undefined,
      value: undefined,
    };
    const result = dynamicScopeSchema.safeParse(scopeWithUndefined);
    expect(result.success).toBe(true);
  });

  it('should accept an empty object', () => {
    const emptyScope = {};
    const result = dynamicScopeSchema.safeParse(emptyScope);
    expect(result.success).toBe(true);
  });

  it('should reject a DynamicScope object with invalid property types', () => {
    const invalidScope = { name: 123, value: true };
    const result = dynamicScopeSchema.safeParse(invalidScope);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalDynamicScopeSchema', () => {
  it('should accept a valid DynamicScope object', () => {
    const validScope: DynamicScope = { name: 'write', value: 'write:456' };
    const result = nullableButOptionalDynamicScopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalDynamicScopeSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalDynamicScopeSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-object, non-null values', () => {
    const invalidValues = [123, 'string', true, [], () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalDynamicScopeSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });
});

describe('nullableButOptionalDynamicScopeArraySchema', () => {
  it('should accept an array of valid DynamicScope objects', () => {
    const validScopes = [
      { name: 'read', value: 'read:123' },
      { name: 'write', value: 'write:456' },
    ];
    const result =
      nullableButOptionalDynamicScopeArraySchema.safeParse(validScopes);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validScopes);
    }
  });

  it('should accept an empty array', () => {
    const result = nullableButOptionalDynamicScopeArraySchema.safeParse([]);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
    }
  });

  it('should accept undefined', () => {
    const result =
      nullableButOptionalDynamicScopeArraySchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalDynamicScopeArraySchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-array values', () => {
    const invalidValues = [123, 'string', true, {}, () => {}];
    invalidValues.forEach((value) => {
      const result =
        nullableButOptionalDynamicScopeArraySchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject arrays containing invalid DynamicScope objects', () => {
    const invalidScopes = [
      { name: 'read', value: 'read:123' },
      { name: 123, value: true }, // Invalid types
    ];
    const result =
      nullableButOptionalDynamicScopeArraySchema.safeParse(invalidScopes);
    expect(result.success).toBe(false);
  });

  it('should accept arrays with DynamicScope objects containing undefined values', () => {
    const scopesWithUndefined = [
      { name: undefined, value: undefined },
      { name: 'write', value: undefined },
    ];
    const result =
      nullableButOptionalDynamicScopeArraySchema.safeParse(scopesWithUndefined);
    expect(result.success).toBe(true);
  });
});
