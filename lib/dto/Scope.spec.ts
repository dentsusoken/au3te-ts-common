import { describe, it, expect } from 'vitest';
import { Scope, scopeSchema } from './Scope';

describe('scopeSchema', () => {
  it('should validate a valid scope object', () => {
    const validScope: Scope = {
      name: 'example_scope',
      description: 'Example scope description',
    };

    const result = scopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validScope);
  });

  it('should allow optional fields to be omitted', () => {
    const validScope: Scope = {};

    const result = scopeSchema.safeParse(validScope);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it('should invalidate an object with non-string fields', () => {
    const invalidScope = {
      name: 123,
      description: 456,
    };

    const result = scopeSchema.safeParse(invalidScope);
    expect(result.success).toBe(false);
  });
});
