import { describe, it, expect } from 'vitest';
import { standardIntrospectionResponseSchema } from '../StandardIntrospectionResponse';

describe('standardIntrospectionResponseSchema', () => {
  it('should validate a valid response with all fields', () => {
    const validResponse = {
      resultCode: 'A056001',
      resultMessage: 'OK',
      action: 'OK',
      responseContent: '{"active":true}',
    };

    const result = standardIntrospectionResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should validate a valid response with minimal fields', () => {
    const validResponse = {};

    const result = standardIntrospectionResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate null/undefined optional fields', () => {
    const validResponse = {
      action: null,
      responseContent: undefined,
    };

    const result = standardIntrospectionResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate with different action values', () => {
    const actions = ['INTERNAL_SERVER_ERROR', 'BAD_REQUEST', 'OK', 'JWT'];

    actions.forEach((action) => {
      const validResponse = {
        action,
      };
      const result =
        standardIntrospectionResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.action).toBe(action);
      }
    });
  });

  it('should reject invalid action values', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };

    const result = standardIntrospectionResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject invalid types', () => {
    const invalidResponse = {
      responseContent: 123, // Should be string
    };

    const result = standardIntrospectionResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });
});

