import { describe, it, expect } from 'vitest';
import { z } from 'zod';
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

  it('should allow null and undefined values for optional fields', () => {
    const validResponse = {
      action: 'CREATED',
      responseContent: null,
      clientAuthMethod: null,
      requestUri: null,
      dpopNonce: null,
    };

    const result = pushedAuthReqResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      action: 'CREATED',
      responseContent: undefined,
      clientAuthMethod: undefined,
      requestUri: undefined,
      dpopNonce: undefined,
    });
  });

  it('should invalidate a response with an invalid response content type', () => {
    const invalidResponse = {
      action: 'PAYLOAD_TOO_LARGE',
      responseContent: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should invalidate a response with an invalid client authentication method type', () => {
    const invalidResponse = {
      action: 'INTERNAL_SERVER_ERROR',
      clientAuthMethod: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should invalidate a response with an invalid request URI type', () => {
    const invalidResponse = {
      action: 'CREATED',
      requestUri: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should invalidate a response with an invalid DPoP nonce type', () => {
    const invalidResponse = {
      action: 'BAD_REQUEST',
      dpopNonce: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof pushedAuthReqResponseSchema>;
    type ExpectedType = PushedAuthReqResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
