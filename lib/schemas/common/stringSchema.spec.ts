import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  nullableButOptionalStringSchema,
  nullableButOptionalUrlStringSchema,
  nullableButOptionalStringArraySchema,
  nullableButOptionalUrlStringArraySchema,
  stringArraySchema,
  StringArray,
  nullableButOptionalStringArrayArraySchema,
} from './stringSchema';

describe('nullableButOptionalStringSchema', () => {
  it('should parse a string value', () => {
    const result = nullableButOptionalStringSchema.parse('hello');
    expect(result).toBe('hello');
  });

  it('should parse an undefined value', () => {
    const result = nullableButOptionalStringSchema.parse(undefined);
    expect(result).toBeUndefined();
  });

  it('should parse a null value as undefined', () => {
    const result = nullableButOptionalStringSchema.parse(null);
    expect(result).toBeUndefined();
  });

  it('should throw an error for non-string, non-null, and non-undefined values', () => {
    expect(() => nullableButOptionalStringSchema.parse(123)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse(true)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse({})).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse([])).toThrowError(
      z.ZodError
    );
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof nullableButOptionalStringSchema>;
    type ExpectedType = string | undefined;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});

describe('nullableButOptionalUrlStringSchema', () => {
  it('should parse a valid URL string', () => {
    const result = nullableButOptionalUrlStringSchema.parse(
      'https://example.com'
    );
    expect(result).toBe('https://example.com');
  });

  it('should parse an undefined value', () => {
    const result = nullableButOptionalUrlStringSchema.parse(undefined);
    expect(result).toBeUndefined();
  });

  it('should parse a null value as undefined', () => {
    const result = nullableButOptionalUrlStringSchema.parse(null);
    expect(result).toBeUndefined();
  });

  it('should throw an error for invalid URL strings', () => {
    expect(() =>
      nullableButOptionalUrlStringSchema.parse('invalid-url')
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalUrlStringSchema.parse('http://')
    ).toThrowError(z.ZodError);
  });

  it('should throw an error for non-string, non-null, and non-undefined values', () => {
    expect(() => nullableButOptionalUrlStringSchema.parse(123)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse(true)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse({})).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse([])).toThrowError(
      z.ZodError
    );
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof nullableButOptionalUrlStringSchema>;
    type ExpectedType = string | undefined;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});

describe('nullableButOptionalStringArraySchema', () => {
  it('should accept an array of strings', () => {
    const validInput = ['a', 'b', 'c'];
    const result = nullableButOptionalStringArraySchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validInput);
    }
  });

  it('should accept an empty array', () => {
    const result = nullableButOptionalStringArraySchema.safeParse([]);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
    }
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalStringArraySchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalStringArraySchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-array values', () => {
    const invalidValues = [123, 'string', true, {}, () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalStringArraySchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject arrays containing non-string values', () => {
    const invalidArray = ['a', 123, 'b', true];
    const result = nullableButOptionalStringArraySchema.safeParse(invalidArray);
    expect(result.success).toBe(false);
  });
});

describe('stringArraySchema', () => {
  it('should accept a valid StringArray object', () => {
    const validStringArray: StringArray = { array: ['a', 'b', 'c'] };
    const result = stringArraySchema.safeParse(validStringArray);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validStringArray);
  });

  it('should accept an empty array', () => {
    const emptyStringArray: StringArray = { array: [] };
    const result = stringArraySchema.safeParse(emptyStringArray);
    expect(result.success).toBe(true);
  });

  it('should reject an object without the array property', () => {
    const invalidObject = {};
    const result = stringArraySchema.safeParse(invalidObject);
    expect(result.success).toBe(false);
  });

  it('should reject an array with non-string elements', () => {
    const invalidStringArray = { array: ['a', 1, 'c'] };
    const result = stringArraySchema.safeParse(invalidStringArray);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalStringArrayArraySchema', () => {
  it('should accept an array of valid StringArray objects', () => {
    const validInput: StringArray[] = [
      { array: ['a', 'b'] },
      { array: ['c', 'd'] },
    ];
    const result =
      nullableButOptionalStringArrayArraySchema.safeParse(validInput);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it('should accept undefined', () => {
    const result =
      nullableButOptionalStringArrayArraySchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalStringArrayArraySchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should accept an empty array', () => {
    const result = nullableButOptionalStringArrayArraySchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  it('should reject non-array values', () => {
    const invalidValues = [123, 'string', true, {}, () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalStringArrayArraySchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject arrays containing invalid StringArray objects', () => {
    const invalidInput = [
      { array: ['a', 'b'] },
      { array: [1, 2] }, // Invalid: contains numbers instead of strings
    ];
    const result =
      nullableButOptionalStringArrayArraySchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject arrays containing objects without the array property', () => {
    const invalidInput = [
      { array: ['a', 'b'] },
      { notArray: ['c', 'd'] }, // Invalid: missing 'array' property
    ];
    const result =
      nullableButOptionalStringArrayArraySchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalUrlStringArraySchema', () => {
  // Test valid URL arrays
  it('should accept an array of valid URLs', () => {
    const validUrls = [
      'https://example.com',
      'http://test.org',
      'https://api.service.com/path',
    ];
    const result = nullableButOptionalUrlStringArraySchema.safeParse(validUrls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validUrls);
    }
  });

  // Test empty array
  it('should accept an empty array', () => {
    const result = nullableButOptionalUrlStringArraySchema.safeParse([]);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
    }
  });

  // Test null and undefined
  it('should handle null and undefined appropriately', () => {
    // Null should be converted to undefined
    const nullResult = nullableButOptionalUrlStringArraySchema.safeParse(null);
    expect(nullResult.success).toBe(true);
    if (nullResult.success) {
      expect(nullResult.data).toBeUndefined();
    }

    // Undefined should remain undefined
    const undefinedResult =
      nullableButOptionalUrlStringArraySchema.safeParse(undefined);
    expect(undefinedResult.success).toBe(true);
    if (undefinedResult.success) {
      expect(undefinedResult.data).toBeUndefined();
    }
  });

  // Test invalid inputs
  it('should reject invalid inputs', () => {
    const invalidInputs = [
      // Non-array values
      'https://example.com',
      123,
      true,
      {},
      // Arrays with invalid URLs
      ['not-a-url'],
      ['https://example.com', 'invalid-url'],
      ['https://example.com', ''],
      // Arrays with non-string values
      [123, 456],
      ['https://example.com', null],
      ['https://example.com', undefined],
      // Mixed valid and invalid
      ['https://example.com', 'not-a-url', 'http://valid.com'],
    ];

    invalidInputs.forEach((input) => {
      const result = nullableButOptionalUrlStringArraySchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  // Test URL validation
  it('should validate each URL in the array', () => {
    const mixedUrls = [
      'https://example.com', // valid
      'not-a-url', // invalid
      'http://', // invalid
      'https://test.com/path', // valid
    ];
    const result = nullableButOptionalUrlStringArraySchema.safeParse(mixedUrls);
    expect(result.success).toBe(false);
  });
});
