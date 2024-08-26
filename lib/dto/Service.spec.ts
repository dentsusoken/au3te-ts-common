import { describe, it, expect } from 'vitest';
import { Service, serviceSchema } from './Service';

describe('serviceSchema', () => {
  it('should validate a valid service object', () => {
    const validService: Service = {
      serviceName: 'example_service',
    };

    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validService);
  });

  it('should allow optional fields to be omitted', () => {
    const validService: Service = {};

    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it('should invalidate an object with non-string fields', () => {
    const invalidService = {
      serviceName: 123,
    };

    const result = serviceSchema.safeParse(invalidService);
    expect(result.success).toBe(false);
  });
});
