import { describe, it, expect } from 'vitest';
import {
  serviceSchema,
  nullableButOptionalServiceSchema,
  Service,
} from './Service';

describe('serviceSchema', () => {
  it('should accept a valid service with a string serviceName', () => {
    const validService = { serviceName: 'Test Service' };
    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
  });

  it('should accept a valid service with a null serviceName', () => {
    const validService = { serviceName: null };
    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
  });

  it('should accept a valid service without a serviceName', () => {
    const validService = {};
    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
  });

  it('should reject a service with an invalid serviceName type', () => {
    const invalidService = { serviceName: 123 };
    const result = serviceSchema.safeParse(invalidService);
    expect(result.success).toBe(false);
  });

  it('should allow additional properties', () => {
    const serviceWithExtra = { serviceName: 'Test', extraProp: 'Extra' };
    const result = serviceSchema.safeParse(serviceWithExtra);
    expect(result.success).toBe(true);
  });
});

describe('nullableButOptionalServiceSchema', () => {
  it('should accept a valid Service object', () => {
    const validService: Service = { serviceName: 'Test Service' };
    const result = nullableButOptionalServiceSchema.safeParse(validService);
    expect(result.success).toBe(true);
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalServiceSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalServiceSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject invalid Service objects', () => {
    const invalidService = { serviceName: 123 }; // serviceName should be string or null
    const result = nullableButOptionalServiceSchema.safeParse(invalidService);
    expect(result.success).toBe(false);
  });

  it('should accept Service object with null serviceName', () => {
    const serviceWithNullName = { serviceName: null };
    const result =
      nullableButOptionalServiceSchema.safeParse(serviceWithNullName);
    expect(result.success).toBe(true);
  });

  it('should accept Service object without serviceName', () => {
    const serviceWithoutName = {};
    const result =
      nullableButOptionalServiceSchema.safeParse(serviceWithoutName);
    expect(result.success).toBe(true);
  });

  it('should reject non-object, non-null values', () => {
    const invalidValues = [123, 'string', true, [], () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalServiceSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should accept additional properties due to passthrough', () => {
    const serviceWithExtra = {
      serviceName: 'TestService',
      extraProperty: 'This is an extra property',
      anotherExtra: 123,
    };
    const result = serviceSchema.safeParse(serviceWithExtra);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(serviceWithExtra);
    }
  });
});
