import { describe, it, expect } from 'vitest';
import { nullableButOptionalNumberSchema } from './numberSchema';

describe('nullableButOptionalNumberSchema', () => {
  it('should accept a valid number', () => {
    const validInputs = [
      0,
      1,
      -1,
      3.14,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    ];
    validInputs.forEach((input) => {
      const result = nullableButOptionalNumberSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(input);
      }
    });
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalNumberSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalNumberSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-number values', () => {
    const invalidInputs = ['123', true, false, {}, [], () => {}];
    invalidInputs.forEach((input) => {
      const result = nullableButOptionalNumberSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  it('should reject NaN', () => {
    const result = nullableButOptionalNumberSchema.safeParse(NaN);
    expect(result.success).toBe(false);
  });

  it('should accept Infinity and -Infinity', () => {
    const infinities = [Infinity, -Infinity];
    infinities.forEach((input) => {
      const result = nullableButOptionalNumberSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(input);
      }
    });
  });
});
