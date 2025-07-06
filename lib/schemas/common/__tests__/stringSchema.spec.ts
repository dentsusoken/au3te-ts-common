import { describe, it, expect } from 'vitest';
import { stringArraySchema, type StringArray } from '../stringArrayArraySchema';

describe('StringSchema', () => {
  describe('stringArraySchema', () => {
    it('should accept a valid StringArray object with string elements', () => {
      const validStringArray: StringArray = { array: ['a', 'b', 'c'] };
      const result = stringArraySchema.parse(validStringArray);
      expect(result).toEqual(validStringArray);
    });

    it('should accept an empty array', () => {
      const emptyStringArray: StringArray = { array: [] };
      const result = stringArraySchema.parse(emptyStringArray);
      expect(result).toEqual(emptyStringArray);
    });

    it('should accept an object without the array property and set default empty array', () => {
      const objectWithoutArray = {};
      const result = stringArraySchema.parse(objectWithoutArray);
      expect(result).toEqual({ array: [] });
    });

    it('should accept an object with undefined array property and set default empty array', () => {
      const objectWithUndefinedArray = { array: undefined };
      const result = stringArraySchema.parse(objectWithUndefinedArray);
      expect(result).toEqual({ array: [] });
    });

    it('should reject an object with null array property', () => {
      const objectWithNullArray = { array: null };
      const result = stringArraySchema.safeParse(objectWithNullArray);
      expect(result.success).toBe(false);
    });

    it('should accept arrays with empty strings', () => {
      const arrayWithEmptyStrings: StringArray = {
        array: ['', 'hello', '', 'world'],
      };
      const result = stringArraySchema.parse(arrayWithEmptyStrings);
      expect(result).toEqual(arrayWithEmptyStrings);
    });

    it('should accept arrays with single element', () => {
      const singleElementArray: StringArray = { array: ['single'] };
      const result = stringArraySchema.parse(singleElementArray);
      expect(result).toEqual(singleElementArray);
    });

    it('should accept arrays with many elements', () => {
      const manyElementsArray: StringArray = {
        array: Array.from({ length: 100 }, (_, i) => `element${i}`),
      };
      const result = stringArraySchema.parse(manyElementsArray);
      expect(result).toEqual(manyElementsArray);
    });

    it('should reject an array with non-string elements', () => {
      const invalidArrays = [
        { array: ['a', 1, 'c'] },
        { array: ['a', true, 'c'] },
        { array: ['a', false, 'c'] },
        { array: ['a', null, 'c'] },
        { array: ['a', undefined, 'c'] },
        { array: ['a', {}, 'c'] },
        { array: ['a', [], 'c'] },
        { array: ['a', () => {}, 'c'] },
        { array: [123, 'string', true] },
        { array: [null, undefined, 456] },
      ];

      invalidArrays.forEach((invalidArray) => {
        const result = stringArraySchema.safeParse(invalidArray);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object values', () => {
      const nonObjectValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        [],
        () => {},
      ];

      nonObjectValues.forEach((value) => {
        const result = stringArraySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should reject objects with invalid array property type', () => {
      const invalidObjects = [
        { array: 'not an array' },
        { array: 123 },
        { array: true },
        { array: false },
        { array: {} },
        { array: () => {} },
      ];

      invalidObjects.forEach((invalidObject) => {
        const result = stringArraySchema.safeParse(invalidObject);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof stringArraySchema._type;
      type ExpectedType = StringArray;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle complex string values', () => {
      const complexStringArray: StringArray = {
        array: [
          'simple string',
          'string with spaces',
          'string-with-hyphens',
          'string_with_underscores',
          'string123',
          'StringWithCamelCase',
          'string with numbers 123',
        ],
      };
      const result = stringArraySchema.parse(complexStringArray);
      expect(result).toEqual(complexStringArray);
    });

    it('should handle special characters in strings', () => {
      const specialCharArray: StringArray = {
        array: [
          'string with !@#$%^&*()',
          'string with quotes: "Hello"',
          "string with apostrophe: O'Reilly",
          'string with backslashes: \\n\\t\\r',
          'string with unicode: こんにちは',
        ],
      };
      const result = stringArraySchema.parse(specialCharArray);
      expect(result).toEqual(specialCharArray);
    });

    it('should handle unicode characters', () => {
      const unicodeArray: StringArray = {
        array: [
          '日本語',
          '中文',
          '한국어',
          'Español',
          'Français',
          'Deutsch',
          'Italiano',
          'Português',
          'Русский',
          'العربية',
        ],
      };
      const result = stringArraySchema.parse(unicodeArray);
      expect(result).toEqual(unicodeArray);
    });

    it('should handle very long strings', () => {
      const longString = 'A'.repeat(10000);
      const longStringArray: StringArray = { array: [longString, 'short'] };
      const result = stringArraySchema.parse(longStringArray);
      expect(result).toEqual(longStringArray);
    });

    it('should handle duplicate strings', () => {
      const duplicateArray: StringArray = {
        array: ['duplicate', 'unique', 'duplicate', 'another', 'duplicate'],
      };
      const result = stringArraySchema.parse(duplicateArray);
      expect(result).toEqual(duplicateArray);
    });
  });

  describe('StringArray type', () => {
    it('should allow valid StringArray values', () => {
      const validStringArrays: StringArray[] = [
        { array: ['a', 'b', 'c'] },
        { array: [] },
        { array: ['single'] },
        { array: ['', 'empty', 'strings'] },
      ];

      validStringArrays.forEach((stringArray) => {
        expect(stringArraySchema.parse(stringArray)).toEqual(stringArray);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (stringArray: StringArray): StringArray => {
        return stringArray;
      };

      const testStringArray: StringArray = { array: ['test', 'array'] };
      expect(testFunction(testStringArray)).toEqual(testStringArray);
    });

    it('should work with array methods', () => {
      const testFunction = (stringArray: StringArray): number => {
        return stringArray.array.length;
      };

      expect(testFunction({ array: ['a', 'b', 'c'] })).toBe(3);
      expect(testFunction({ array: [] })).toBe(0);
      expect(testFunction({ array: ['single'] })).toBe(1);
    });

    it('should work with array filtering', () => {
      const testFunction = (stringArray: StringArray): string[] => {
        return stringArray.array.filter((str) => str.length > 5);
      };

      expect(
        testFunction({ array: ['short', 'longer', 'tiny', 'very long'] })
      ).toEqual(['longer', 'very long']);
    });

    it('should work with array mapping', () => {
      const testFunction = (stringArray: StringArray): string[] => {
        return stringArray.array.map((str) => str.toUpperCase());
      };

      expect(testFunction({ array: ['hello', 'world'] })).toEqual([
        'HELLO',
        'WORLD',
      ]);
    });
  });
});
