import { describe, it, expect } from 'vitest';
import { clientRegistrationRequestSchema } from '../ClientRegistrationRequest';

describe('clientRegistrationRequestSchema', () => {
  it('should validate a valid request with all fields', () => {
    const validRequest = {
      json: '{"client_name": "My Client"}',
      token: 'reg-access-token-123',
      clientId: 'client-123',
    };

    const result = clientRegistrationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should validate a valid request with minimal fields', () => {
    const validRequest = {};

    const result = clientRegistrationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should allow null/undefined optional fields', () => {
    const validRequest = {
      json: null,
      token: undefined,
    };

    const result = clientRegistrationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should reject invalid types', () => {
    const invalidRequest = {
      json: 123, // Should be string
    };

    const result = clientRegistrationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});

