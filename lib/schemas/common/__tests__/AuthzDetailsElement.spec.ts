import { describe, it, expect } from 'vitest';
import {
  authzDetailsElementSchema,
  AuthzDetailsElement,
} from '../AuthzDetailsElement';

describe('authzDetailsElementSchema', () => {
  it('should accept a valid AuthzDetailsElement object', () => {
    const validElement: AuthzDetailsElement = {
      type: 'example',
      locations: { array: ['https://example.com'] },
      actions: { array: ['read', 'write'] },
      datatypes: { array: ['personal', 'financial'] },
      identifier: 'user123',
      privileges: { array: ['admin', 'user'] },
    };
    const result = authzDetailsElementSchema.parse(validElement);
    expect(result).toEqual(validElement);
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
    const result = authzDetailsElementSchema.parse(elementWithUndefined);
    expect(result).toEqual(elementWithUndefined);
  });

  it('should accept an empty object', () => {
    const emptyElement = {};
    const result = authzDetailsElementSchema.parse(emptyElement);
    expect(result).toEqual(emptyElement);
  });

  it('should accept additional properties', () => {
    const elementWithExtra = {
      type: 'example',
      extraProp: 'extra',
    };
    const result = authzDetailsElementSchema.parse(elementWithExtra);
    expect(result).toEqual(elementWithExtra);
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

  it('should accept null values', () => {
    const elementWithNulls = {
      type: null,
      locations: null,
      actions: null,
      datatypes: null,
      identifier: null,
      privileges: null,
    };
    const result = authzDetailsElementSchema.parse(elementWithNulls);
    expect(result).toEqual(elementWithNulls);
  });

  it('should accept mixed null and valid values', () => {
    const mixedElement = {
      type: 'example',
      locations: null,
      actions: { array: ['read'] },
      datatypes: undefined,
      identifier: 'user123',
      privileges: null,
    };
    const result = authzDetailsElementSchema.parse(mixedElement);
    expect(result).toEqual(mixedElement);
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
      const result = authzDetailsElementSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof authzDetailsElementSchema._type;
    type ExpectedType = AuthzDetailsElement;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
