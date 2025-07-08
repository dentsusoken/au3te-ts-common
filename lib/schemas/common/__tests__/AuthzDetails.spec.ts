import { describe, it, expect } from 'vitest';
import { authzDetailsSchema, AuthzDetails } from '../AuthzDetails';

describe('authzDetailsSchema', () => {
  it('should accept a valid AuthzDetails object', () => {
    const validAuthzDetails: AuthzDetails = {
      elements: [
        { type: 'example1', actions: ['read'] },
        { type: 'example2', locations: ['https://example.com'] },
      ],
    };
    const result = authzDetailsSchema.parse(validAuthzDetails);
    expect(result).toEqual(validAuthzDetails);
  });

  it('should accept an AuthzDetails object with empty elements array', () => {
    const authzDetailsWithEmptyElements: AuthzDetails = { elements: [] };
    const result = authzDetailsSchema.parse(authzDetailsWithEmptyElements);
    expect(result).toEqual(authzDetailsWithEmptyElements);
  });

  it('should accept an empty AuthzDetails object', () => {
    const emptyAuthzDetails = {};
    const result = authzDetailsSchema.parse(emptyAuthzDetails);
    expect(result).toEqual({});
  });

  it('should reject an AuthzDetails object with invalid elements', () => {
    const invalidAuthzDetails = {
      elements: [{ type: 123 }], // Invalid type
    };
    const result = authzDetailsSchema.safeParse(invalidAuthzDetails);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const invalidValues = [
      'not an object',
      123,
      true,
      ['array'],
      null,
      undefined,
    ];

    invalidValues.forEach((value) => {
      const result = authzDetailsSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should accept AuthzDetails with complex elements', () => {
    const complexAuthzDetails: AuthzDetails = {
      elements: [
        {
          type: 'payment_initiation',
          locations: ['https://bank.com'],
          actions: ['read', 'write'],
          datatypes: ['account', 'transaction'],
          identifier: 'account123',
          privileges: ['admin'],
          extraProp: 'extra value', // Additional property should be allowed
        },
      ],
    };
    const result = authzDetailsSchema.parse(complexAuthzDetails);
    expect(result).toEqual(complexAuthzDetails);
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof authzDetailsSchema._type;
    type ExpectedType = AuthzDetails;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
