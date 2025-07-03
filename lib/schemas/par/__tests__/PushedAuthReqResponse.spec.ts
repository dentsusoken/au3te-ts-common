import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  PushedAuthReqResponse,
  pushedAuthReqResponseSchema,
} from '../PushedAuthReqResponse';

describe('pushedAuthReqResponseSchema', () => {
  it('should validate a valid pushed authorization request response', () => {
    const validResponse: PushedAuthReqResponse = {
      action: 'CREATED',
      responseContent: 'Response content',
      clientAuthMethod: 'client_secret_basic',
      requestUri: 'https://example.com/request',
      dpopNonce: 'nonce',
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate all action values', () => {
    const actions = [
      'CREATED',
      'BAD_REQUEST',
      'UNAUTHORIZED',
      'FORBIDDEN',
      'PAYLOAD_TOO_LARGE',
      'INTERNAL_SERVER_ERROR',
    ] as const;

    actions.forEach((action) => {
      const response: PushedAuthReqResponse = {
        action,
        responseContent: 'Response content',
      };

      const result = pushedAuthReqResponseSchema.parse(response);
      expect(result).toEqual(response);
    });
  });

  it('should allow optional fields to be omitted', () => {
    const validResponse: PushedAuthReqResponse = {
      action: 'BAD_REQUEST',
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate when optional fields are null', () => {
    const validResponse = {
      action: 'CREATED' as const,
      responseContent: null,
      clientAuthMethod: null,
      requestUri: null,
      dpopNonce: null,
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate when optional fields are undefined', () => {
    const validResponse = {
      action: 'CREATED' as const,
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate empty strings for optional fields', () => {
    const validResponse = {
      action: 'CREATED' as const,
      responseContent: '',
      clientAuthMethod: 'client_secret_basic',
      requestUri: 'https://example.com/',
      dpopNonce: '',
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate real-world example', () => {
    const realWorldResponse: PushedAuthReqResponse = {
      action: 'CREATED',
      responseContent: JSON.stringify({
        request_uri: 'https://as.example.com/par/request_uri/123456789',
        expires_in: 60,
      }),
      clientAuthMethod: 'client_secret_post',
      requestUri: 'https://as.example.com/par/request_uri/123456789',
      dpopNonce: 'nonce-123456789',
    };

    const result = pushedAuthReqResponseSchema.parse(realWorldResponse);
    expect(result).toEqual(realWorldResponse);
  });

  it('should validate minimal valid response', () => {
    const validResponse = {
      action: 'CREATED' as const,
    };

    const result = pushedAuthReqResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  // Failure cases
  it('should reject response with an invalid action', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as number', () => {
    const invalidResponse = {
      action: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as boolean', () => {
    const invalidResponse = {
      action: true,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as null', () => {
    const invalidResponse = {
      action: null,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as undefined', () => {
    const invalidResponse = {
      action: undefined,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response with an invalid client authentication method', () => {
    const invalidResponse = {
      action: 'UNAUTHORIZED',
      clientAuthMethod: 'invalid_method',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject client authentication method as number', () => {
    const invalidResponse = {
      action: 'UNAUTHORIZED',
      clientAuthMethod: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject client authentication method as boolean', () => {
    const invalidResponse = {
      action: 'UNAUTHORIZED',
      clientAuthMethod: true,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response with an invalid request URI', () => {
    const invalidResponse = {
      action: 'FORBIDDEN',
      requestUri: 'invalid_uri',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject request URI as number', () => {
    const invalidResponse = {
      action: 'FORBIDDEN',
      requestUri: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject request URI as boolean', () => {
    const invalidResponse = {
      action: 'FORBIDDEN',
      requestUri: true,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response with an invalid response content type', () => {
    const invalidResponse = {
      action: 'PAYLOAD_TOO_LARGE',
      responseContent: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response content as boolean', () => {
    const invalidResponse = {
      action: 'PAYLOAD_TOO_LARGE',
      responseContent: true,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response content as object', () => {
    const invalidResponse = {
      action: 'PAYLOAD_TOO_LARGE',
      responseContent: { content: 'test' },
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response content as array', () => {
    const invalidResponse = {
      action: 'PAYLOAD_TOO_LARGE',
      responseContent: ['content', 'test'],
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject response with an invalid DPoP nonce type', () => {
    const invalidResponse = {
      action: 'BAD_REQUEST',
      dpopNonce: 123,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject DPoP nonce as boolean', () => {
    const invalidResponse = {
      action: 'BAD_REQUEST',
      dpopNonce: true,
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject DPoP nonce as object', () => {
    const invalidResponse = {
      action: 'BAD_REQUEST',
      dpopNonce: { nonce: 'test' },
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject DPoP nonce as array', () => {
    const invalidResponse = {
      action: 'BAD_REQUEST',
      dpopNonce: ['nonce', 'test'],
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject missing required action field', () => {
    const invalidResponse = {
      responseContent: 'Response content',
    };

    const result = pushedAuthReqResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const result = pushedAuthReqResponseSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = pushedAuthReqResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = pushedAuthReqResponseSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 = pushedAuthReqResponseSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = pushedAuthReqResponseSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = pushedAuthReqResponseSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = pushedAuthReqResponseSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof pushedAuthReqResponseSchema>;
    type ExpectedType = PushedAuthReqResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
