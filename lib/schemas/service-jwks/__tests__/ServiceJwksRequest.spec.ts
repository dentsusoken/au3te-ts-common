import { describe, it, expect } from 'vitest';
import { serviceJwksRequestSchema } from '../ServiceJwksRequest';

describe('serviceJwksRequestSchema', () => {
  it('should validate a valid request with pretty field', () => {
    const validRequest = {
      pretty: true,
    };

    const result = serviceJwksRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a request with pretty set to false', () => {
    const validRequest = {
      pretty: false,
    };

    const result = serviceJwksRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result = serviceJwksRequestSchema.parse(minimalRequest);
    expect(result).toEqual(minimalRequest);
  });

  it('should validate when pretty field is null', () => {
    const validRequest = {
      pretty: null,
    };

    const result = serviceJwksRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate when pretty field is undefined', () => {
    const validRequest = {
      pretty: undefined,
    };

    const result = serviceJwksRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate real-world example', () => {
    const realWorldRequest = {
      pretty: true,
    };

    const result = serviceJwksRequestSchema.parse(realWorldRequest);
    expect(result).toEqual(realWorldRequest);
  });

  it('should validate minimal valid request', () => {
    const validRequest = {};

    const result = serviceJwksRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  // Failure cases
  it('should reject pretty as string', () => {
    const invalidRequest = {
      pretty: 'true',
    };

    const result = serviceJwksRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as number', () => {
    const invalidRequest = {
      pretty: 1,
    };

    const result = serviceJwksRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as object', () => {
    const invalidRequest = {
      pretty: { value: true },
    };

    const result = serviceJwksRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as array', () => {
    const invalidRequest = {
      pretty: [true],
    };

    const result = serviceJwksRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = serviceJwksRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = serviceJwksRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 = serviceJwksRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = serviceJwksRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = serviceJwksRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = serviceJwksRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
