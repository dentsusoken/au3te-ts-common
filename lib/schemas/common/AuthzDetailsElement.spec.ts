import { describe, it, expect } from 'vitest';
import {
  authzDetailsElementSchema,
  AuthzDetailsElement,
  nullableButOptionalAuthzDetailsElementArraySchema,
} from './AuthzDetailsElement';

describe('authzDetailsElementSchema', () => {
  it('should accept a valid AuthzDetailsElement object', () => {
    const validElement: AuthzDetailsElement = {
      type: 'example',
      locations: ['https://example.com'],
      actions: ['read', 'write'],
      datatypes: ['personal', 'financial'],
      identifier: 'user123',
      privileges: ['admin', 'user'],
    };
    const result = authzDetailsElementSchema.safeParse(validElement);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validElement);
  });

  it('should accept an object with undefined values', () => {
    const elementWithUndefined: AuthzDetailsElement = {
      type: undefined,
      locations: undefined,
      actions: undefined,
      datatypes: undefined,
      identifier: undefined,
      privileges: undefined,
    };
    const result = authzDetailsElementSchema.safeParse(elementWithUndefined);
    expect(result.success).toBe(true);
  });

  it('should accept an empty object', () => {
    const emptyElement = {};
    const result = authzDetailsElementSchema.safeParse(emptyElement);
    expect(result.success).toBe(true);
  });

  it('should accept additional properties', () => {
    const elementWithExtra = {
      type: 'example',
      extraProp: 'extra',
    };
    const result = authzDetailsElementSchema.safeParse(elementWithExtra);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(elementWithExtra);
  });

  it('should reject invalid property types', () => {
    const invalidElement = {
      type: 123,
      locations: 'not an array',
      actions: [123],
      datatypes: [true],
      identifier: {},
      privileges: () => {},
    };
    const result = authzDetailsElementSchema.safeParse(invalidElement);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalAuthzDetailsElementArraySchema', () => {
  it('should accept an array of valid AuthzDetailsElement objects', () => {
    const validElements: AuthzDetailsElement[] = [
      { type: 'example1', actions: ['read'] },
      { type: 'example2', locations: ['https://example.com'] },
    ];
    const result =
      nullableButOptionalAuthzDetailsElementArraySchema.safeParse(
        validElements
      );
    expect(result.success).toBe(true);
  });

  it('should accept undefined', () => {
    const result =
      nullableButOptionalAuthzDetailsElementArraySchema.safeParse(undefined);
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('should treat null as undefined', () => {
    const result =
      nullableButOptionalAuthzDetailsElementArraySchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should accept an empty array', () => {
    const result = nullableButOptionalAuthzDetailsElementArraySchema.safeParse(
      []
    );
    expect(result.success).toBe(true);
  });

  it('should reject non-array values', () => {
    const invalidValues = [123, 'string', true, {}, () => {}];
    invalidValues.forEach((value) => {
      const result =
        nullableButOptionalAuthzDetailsElementArraySchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject arrays containing invalid AuthzDetailsElement objects', () => {
    const invalidElements = [
      { type: 'valid' },
      { type: 123, actions: 'invalid' }, // Invalid types
    ];
    const result =
      nullableButOptionalAuthzDetailsElementArraySchema.safeParse(
        invalidElements
      );
    expect(result.success).toBe(false);
  });

  it('should accept arrays with AuthzDetailsElement objects containing additional properties', () => {
    const elementsWithExtra = [
      { type: 'example1', extraProp1: 'extra1' },
      { type: 'example2', extraProp2: 'extra2' },
    ];
    const result =
      nullableButOptionalAuthzDetailsElementArraySchema.safeParse(
        elementsWithExtra
      );
    expect(result.success).toBe(true);
    expect(result.data).toEqual(elementsWithExtra);
  });
});
