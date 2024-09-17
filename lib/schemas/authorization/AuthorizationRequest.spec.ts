import { describe, it, expect } from 'vitest';
import { authorizationRequestSchema } from './AuthorizationRequest';

describe('authorizationRequestSchema', () => {
  it('should validate a valid authorization request with parameters only', () => {
    const validRequest = {
      parameters:
        'response_type=code&client_id=123&redirect_uri=https://example.com/callback',
    };

    const result = authorizationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should validate a valid authorization request with parameters and context', () => {
    const validRequest = {
      parameters:
        'response_type=code&client_id=123&redirect_uri=https://example.com/callback',
      context: 'Additional information',
    };

    const result = authorizationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should allow null context', () => {
    const requestWithNullContext = {
      parameters: 'response_type=code&client_id=123',
      context: null,
    };

    const result = authorizationRequestSchema.safeParse(requestWithNullContext);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithNullContext);
    }
  });

  it('should allow undefined context', () => {
    const requestWithUndefinedContext = {
      parameters: 'response_type=code&client_id=123',
    };

    const result = authorizationRequestSchema.safeParse(
      requestWithUndefinedContext
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithUndefinedContext);
    }
  });

  it('should reject a request without parameters', () => {
    const invalidRequest = {
      context: 'Some context',
    };

    const result = authorizationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject a request with non-string parameters', () => {
    const invalidRequest = {
      parameters: 123,
      context: 'Some context',
    };

    const result = authorizationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject a request with non-string context', () => {
    const invalidRequest = {
      parameters: 'response_type=code&client_id=123',
      context: 123,
    };

    const result = authorizationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});
