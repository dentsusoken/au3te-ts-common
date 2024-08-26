import { describe, it, expect } from 'vitest';
import { DynamicScope, dynamicScopeSchema } from './DynamicScope';

describe('dynamicScopeSchema', () => {
  it('should validate a valid dynamic scope object', () => {
    const validDynamicScope: DynamicScope = {
      name: 'example_scope',
      value: 'example_value',
    };

    const result = dynamicScopeSchema.safeParse(validDynamicScope);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validDynamicScope);
  });

  it('should allow optional fields to be omitted', () => {
    const validDynamicScope: DynamicScope = {};

    const result = dynamicScopeSchema.safeParse(validDynamicScope);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it('should invalidate an object with non-string fields', () => {
    const invalidDynamicScope = {
      name: 123,
      value: 456,
    };

    const result = dynamicScopeSchema.safeParse(invalidDynamicScope);
    expect(result.success).toBe(false);
  });
});
