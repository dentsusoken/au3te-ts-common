import { describe, it, expect } from 'vitest';
import { clientRegistrationResponseSchema } from '../ClientRegistrationResponse';

describe('clientRegistrationResponseSchema', () => {
  it('should validate a valid response with all fields', () => {
    const validResponse = {
      resultCode: 'A056001',
      resultMessage: 'OK',
      action: 'CREATED',
      responseContent: '{"client_id":"abc"}',
    };

    const result = clientRegistrationResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should validate different action values', () => {
    const actions = [
      'INTERNAL_SERVER_ERROR',
      'BAD_REQUEST',
      'UNAUTHORIZED',
      'CREATED',
      'UPDATED',
      'DELETED',
      'OK',
    ];

    actions.forEach((action) => {
      const validResponse = { action };
      const result = clientRegistrationResponseSchema.safeParse(validResponse);
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

    const result = clientRegistrationResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject missing action', () => {
    const invalidResponse = {
      responseContent: '{}',
    };

    const result = clientRegistrationResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject invalid types', () => {
    const invalidResponse = {
      action: 'OK',
      responseContent: 123, // Should be string
    };

    const result = clientRegistrationResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });
});

