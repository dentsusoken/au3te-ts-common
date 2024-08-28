import { describe, it, expect } from 'vitest';
import { apiResponseSchema } from './ApiResponse';

describe('apiResponseSchema', () => {
  it('should validate a valid API response object', () => {
    const validResponse = {
      resultCode: 'SUCCESS',
      resultMessage: 'Operation completed successfully',
    };

    const result = apiResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should allow optional fields to be omitted', () => {
    const validResponse = {};

    const result = apiResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it('should invalidate an object with non-string fields', () => {
    const invalidResponse = {
      resultCode: 123,
      resultMessage: true,
    };

    const result = apiResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });
});
