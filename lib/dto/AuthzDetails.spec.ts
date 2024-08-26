import { describe, it, expect } from 'vitest';
import { AuthzDetails, authzDetailsSchema } from './AuthzDetails';

describe('authzDetailsSchema', () => {
  it('should validate a valid AuthzDetails object', () => {
    const validDetails: AuthzDetails = {
      elements: [
        {
          type: 'resource',
          locations: ['https://example.com'],
          actions: ['read', 'write'],
          dataTypes: ['text/plain'],
          identifier: 'example-resource',
          privileges: ['admin'],
          otherFields: 'custom data',
        },
        {
          type: 'scope',
          locations: ['https://example.org'],
          actions: ['view'],
          dataTypes: ['application/json'],
          identifier: 'example-scope',
          privileges: ['user'],
          otherFields: 'additional info',
        },
      ],
    };

    const result = authzDetailsSchema.safeParse(validDetails);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validDetails);
  });

  it('should allow the elements field to be omitted', () => {
    const validDetails: AuthzDetails = {};

    const result = authzDetailsSchema.safeParse(validDetails);
    expect(result.success).toBe(true);
  });

  it('should invalidate an object with invalid elements', () => {
    const invalidDetails = {
      elements: [
        {
          type: 123,
          locations: 'invalid',
          actions: [123],
          dataTypes: [true],
          identifier: {},
          privileges: [null],
          otherFields: [],
        },
      ],
    };

    const result = authzDetailsSchema.safeParse(invalidDetails);
    expect(result.success).toBe(false);
  });
});
