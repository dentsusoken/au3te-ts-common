import { describe, it, expect } from 'vitest';
import {
  AuthzDetailsElement,
  authzDetailsElementSchema,
} from './AuthzDetailsElement';

describe('authzDetailsElementSchema', () => {
  it('should validate a valid AuthzDetailsElement object', () => {
    const validElement: AuthzDetailsElement = {
      type: 'resource',
      locations: ['https://example.com'],
      actions: ['read', 'write'],
      dataTypes: ['text/plain'],
      identifier: 'example-resource',
      privileges: ['admin'],
      otherFields: 'custom data',
    };

    const result = authzDetailsElementSchema.safeParse(validElement);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validElement);
  });

  it('should allow optional fields to be omitted', () => {
    const validElement: AuthzDetailsElement = {
      type: 'resource',
      locations: ['https://example.com'],
    };

    const result = authzDetailsElementSchema.safeParse(validElement);
    expect(result.success).toBe(true);
  });

  it('should allow all fields to be omitted', () => {
    const validElement: AuthzDetailsElement = {};

    const result = authzDetailsElementSchema.safeParse(validElement);
    expect(result.success).toBe(true);
  });

  it('should invalidate an object with fields of incorrect types', () => {
    const invalidElement = {
      type: 123,
      locations: 'invalid',
      actions: [123],
      dataTypes: [true],
      identifier: {},
      privileges: [null],
      otherFields: [],
    };

    const result = authzDetailsElementSchema.safeParse(invalidElement);
    expect(result.success).toBe(false);
  });
});
