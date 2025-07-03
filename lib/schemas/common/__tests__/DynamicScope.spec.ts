import { describe, it, expect } from 'vitest';
import { dynamicScopeSchema, DynamicScope } from '../DynamicScope';

describe('dynamicScopeSchema', () => {
  it('should accept a valid DynamicScope object', () => {
    const validScope: DynamicScope = { name: 'read', value: 'read:123' };
    const result = dynamicScopeSchema.parse(validScope);
    expect(result).toEqual(validScope);
  });

  it('should accept a DynamicScope object with null values', () => {
    const scopeWithNulls: DynamicScope = {
      name: null,
      value: null,
    };
    const result = dynamicScopeSchema.parse(scopeWithNulls);
    expect(result).toEqual(scopeWithNulls);
  });

  it('should accept a DynamicScope object with undefined values', () => {
    const scopeWithUndefined: DynamicScope = {
      name: undefined,
      value: undefined,
    };
    const result = dynamicScopeSchema.parse(scopeWithUndefined);
    expect(result).toEqual(scopeWithUndefined);
  });

  it('should accept an empty object', () => {
    const emptyScope = {};
    const result = dynamicScopeSchema.parse(emptyScope);
    expect(result).toEqual(emptyScope);
  });

  it('should accept a DynamicScope object with mixed null and string values', () => {
    const mixedScope: DynamicScope = {
      name: 'consent',
      value: null,
    };
    const result = dynamicScopeSchema.parse(mixedScope);
    expect(result).toEqual(mixedScope);
  });

  it('should accept a DynamicScope object with only name', () => {
    const scopeWithOnlyName: DynamicScope = {
      name: 'payment',
    };
    const result = dynamicScopeSchema.parse(scopeWithOnlyName);
    expect(result).toEqual(scopeWithOnlyName);
  });

  it('should accept a DynamicScope object with only value', () => {
    const scopeWithOnlyValue: DynamicScope = {
      value: 'payment:36fc67776',
    };
    const result = dynamicScopeSchema.parse(scopeWithOnlyValue);
    expect(result).toEqual(scopeWithOnlyValue);
  });

  it('should reject a DynamicScope object with invalid property types', () => {
    const invalidScope = { name: 123, value: true };
    const result = dynamicScopeSchema.safeParse(invalidScope);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const invalidValues = [
      'not an object',
      123,
      true,
      ['array'],
      null,
      undefined,
    ];

    invalidValues.forEach((value) => {
      const result = dynamicScopeSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof dynamicScopeSchema._type;
    type ExpectedType = DynamicScope;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });

  it('should handle complex dynamic scope examples', () => {
    const complexScopes: DynamicScope[] = [
      { name: 'consent', value: 'consent:urn:bancoex:C1DD33123' },
      { name: 'payment', value: 'payment:36fc67776' },
      { name: 'printer', value: 'printer:print,manage:lp7200' },
      { name: 'api', value: 'api:*:view' },
    ];

    complexScopes.forEach((scope) => {
      const result = dynamicScopeSchema.parse(scope);
      expect(result).toEqual(scope);
    });
  });
});
