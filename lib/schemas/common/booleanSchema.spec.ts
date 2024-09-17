import { describe, it, expect } from 'vitest';
import { nullableButOptionalBooleanSchema } from './booleanSchema';

describe('nullableButOptionalBooleanSchema', () => {
  it('should accept true', () => {
    const result = nullableButOptionalBooleanSchema.safeParse(true);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(true);
    }
  });

  it('should accept false', () => {
    const result = nullableButOptionalBooleanSchema.safeParse(false);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(false);
    }
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalBooleanSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalBooleanSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-boolean values', () => {
    const invalidValues = [0, 1, 'true', 'false', {}, [], () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalBooleanSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });
});
