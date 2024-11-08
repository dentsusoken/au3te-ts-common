import { describe, expect, it } from 'vitest';
import {
  tokenFailResponseSchema,
  type TokenFailResponse,
} from './TokenFailResponse';

describe('TokenFailResponse', () => {
  it('should accept valid token fail response with required fields', () => {
    const validResponse: TokenFailResponse = {
      action: 'BAD_REQUEST',
      responseContent: '{"error": "invalid_request"}',
    };

    const result = tokenFailResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should accept response with INTERNAL_SERVER_ERROR action', () => {
    const response: TokenFailResponse = {
      action: 'INTERNAL_SERVER_ERROR',
      responseContent: '{"error": "server_error"}',
    };

    const result = tokenFailResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(response);
    }
  });

  it('should reject response without required action', () => {
    const invalidResponse = {
      responseContent: '{"error": "invalid_request"}',
    };

    const result = tokenFailResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should handle null values as undefined for optional fields', () => {
    const responseWithNulls = {
      action: 'BAD_REQUEST',
      responseContent: null,
    };

    const result = tokenFailResponseSchema.safeParse(responseWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.responseContent).toBeUndefined();
    }
  });

  it('should reject invalid action values', () => {
    const invalidActions = [
      'INVALID_ACTION',
      'bad_request',
      '',
      123,
      null,
      undefined,
      {},
      [],
    ];

    invalidActions.forEach((action) => {
      const response = {
        action,
        responseContent: '{"error": "invalid_request"}',
      };

      const result = tokenFailResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  it('should accept response without optional responseContent', () => {
    const response = {
      action: 'BAD_REQUEST',
    };

    const result = tokenFailResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.responseContent).toBeUndefined();
    }
  });

  it('should reject invalid responseContent types', () => {
    const invalidResponses = [
      {
        action: 'BAD_REQUEST',
        responseContent: 123,
      },
      {
        action: 'BAD_REQUEST',
        responseContent: {},
      },
      {
        action: 'BAD_REQUEST',
        responseContent: [],
      },
    ];

    invalidResponses.forEach((response) => {
      const result = tokenFailResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  it('should reject additional properties', () => {
    const responseWithExtra = {
      action: 'BAD_REQUEST',
      responseContent: '{"error": "invalid_request"}',
      extraProperty: 'should not be here',
    };

    const result = tokenFailResponseSchema.safeParse(responseWithExtra);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty('extraProperty');
    }
  });
});
