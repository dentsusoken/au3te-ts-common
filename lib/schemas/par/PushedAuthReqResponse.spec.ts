import { describe, it, expect } from 'vitest';
import {
  PushedAuthReqResponse,
  pushedAuthReqResponseSchema,
} from './PushedAuthReqResponse';

describe('pushedAuthReqResponseSchema', () => {
  it('should validate a valid pushed authorization request response', () => {
    const validResponse: PushedAuthReqResponse = {
      action: 'CREATED',
      responseContent: 'Response content',
      clientAuthMethod: 'client_secret_basic',
      requestUri: 'https://example.com/request',
      dpopNonce: 'nonce',
    };

    const result = pushedAuthReqResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should allow optional fields to be omitted', () => {
    const validResponse: PushedAuthReqResponse = {
      action: 'BAD_REQUEST',
    };

    const result = pushedAuthReqResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should invalidate a response with an invalid action', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should invalidate a response with an invalid client authentication method', () => {
    const invalidResponse = {
      action: 'UNAUTHORIZED',
      clientAuthMethod: 'invalid_method',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should invalidate a response with an invalid request URI', () => {
    const invalidResponse = {
      action: 'FORBIDDEN',
      requestUri: 'invalid_uri',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });
});
