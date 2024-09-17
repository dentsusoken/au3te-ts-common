import { describe, it, expect } from 'vitest';
import {
  authzDetailsSchema,
  AuthzDetails,
  nullableButOptionalAuthzDetailsSchema,
} from './AuthzDetails';

describe('authzDetailsSchema', () => {
  it('should accept a valid AuthzDetails object', () => {
    const validAuthzDetails: AuthzDetails = {
      elements: [
        { type: 'example1', actions: ['read'] },
        { type: 'example2', locations: ['https://example.com'] },
      ],
    };
    const result = authzDetailsSchema.safeParse(validAuthzDetails);
    expect(result.success).toBe(true);
  });

  it('should accept an AuthzDetails object with undefined elements', () => {
    const authzDetailsWithUndefined: AuthzDetails = { elements: undefined };
    const result = authzDetailsSchema.safeParse(authzDetailsWithUndefined);
    expect(result.success).toBe(true);
  });

  it('should accept an empty AuthzDetails object', () => {
    const emptyAuthzDetails = {};
    const result = authzDetailsSchema.safeParse(emptyAuthzDetails);
    expect(result.success).toBe(true);
  });

  it('should reject an AuthzDetails object with invalid elements', () => {
    const invalidAuthzDetails = {
      elements: [{ type: 123 }], // Invalid type
    };
    const result = authzDetailsSchema.safeParse(invalidAuthzDetails);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalAuthzDetailsSchema', () => {
  it('should accept a valid AuthzDetails object', () => {
    const validAuthzDetails: AuthzDetails = {
      elements: [{ type: 'example', actions: ['read', 'write'] }],
    };
    const result =
      nullableButOptionalAuthzDetailsSchema.safeParse(validAuthzDetails);
    expect(result.success).toBe(true);
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalAuthzDetailsSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalAuthzDetailsSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should accept an AuthzDetails object with undefined elements', () => {
    const authzDetailsWithUndefined: AuthzDetails = { elements: undefined };
    const result = nullableButOptionalAuthzDetailsSchema.safeParse(
      authzDetailsWithUndefined
    );
    expect(result.success).toBe(true);
  });

  it('should reject non-object values', () => {
    const invalidValues = [123, 'string', true, [], () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalAuthzDetailsSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject an AuthzDetails object with invalid elements', () => {
    const invalidAuthzDetails = {
      elements: [{ type: 'valid' }, { type: 123 }], // Second element has invalid type
    };
    const result =
      nullableButOptionalAuthzDetailsSchema.safeParse(invalidAuthzDetails);
    expect(result.success).toBe(false);
  });
});
