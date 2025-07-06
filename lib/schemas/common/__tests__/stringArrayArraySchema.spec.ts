import { describe, it, expect } from 'vitest';
import {
  stringArrayArraySchema,
  type StringArrayArray,
} from '../stringArrayArraySchema';

describe('StringArrayArraySchema', () => {
  describe('stringArrayArraySchema', () => {
    it('should accept a valid array of objects with string arrays', () => {
      const valid: StringArrayArray = [
        { array: ['a', 'b', 'c'] },
        { array: ['d', 'e', 'f'] },
        { array: [] },
      ];
      const result = stringArrayArraySchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should accept an empty array', () => {
      const empty: StringArrayArray = [];
      const result = stringArrayArraySchema.parse(empty);
      expect(result).toEqual(empty);
    });

    it('should accept an array with a single object', () => {
      const single: StringArrayArray = [{ array: ['single'] }];
      const result = stringArrayArraySchema.parse(single);
      expect(result).toEqual(single);
    });

    it('should accept an array with many objects', () => {
      const many: StringArrayArray = Array.from({ length: 50 }, (_, i) => ({
        array: [`element${i}`, `value${i}`],
      }));
      const result = stringArrayArraySchema.parse(many);
      expect(result).toEqual(many);
    });

    it('should reject an array with invalid objects', () => {
      const invalidArrays = [
        [{ array: ['a', 1, 'c'] }],
        [{ array: ['a', true, 'c'] }],
        [{ array: 'not an array' }],
        [{ array: null }],
        [{ array: 123 }],
        [{ array: {} }],
        [{ array: () => {} }],
        [null],
        [undefined],
        [123],
        ['string'],
      ];
      invalidArrays.forEach((invalidArray) => {
        const result = stringArrayArraySchema.safeParse(invalidArray);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-array values', () => {
      const nonArrayValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        {},
        () => {},
      ];
      nonArrayValues.forEach((value) => {
        const result = stringArrayArraySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof stringArrayArraySchema._type;
      type ExpectedType = StringArrayArray;
      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle arrays with mixed valid and empty objects', () => {
      const mixed: StringArrayArray = [
        { array: ['first', 'second'] },
        { array: [] },
        { array: ['third'] },
        { array: [] },
      ];
      const result = stringArrayArraySchema.parse(mixed);
      expect(result).toEqual(mixed);
    });

    it('should handle arrays with complex string values', () => {
      const complex: StringArrayArray = [
        { array: ['simple', 'strings'] },
        { array: ['strings with spaces', 'strings-with-hyphens'] },
        { array: ['unicode: こんにちは', 'special: !@#$%'] },
      ];
      const result = stringArrayArraySchema.parse(complex);
      expect(result).toEqual(complex);
    });

    it('should handle nested array operations', () => {
      const testArray: StringArrayArray = [
        { array: ['a', 'b', 'c'] },
        { array: ['d', 'e'] },
        { array: ['f'] },
      ];
      const result = stringArrayArraySchema.parse(testArray);
      expect(result.length).toBe(3);
      expect(result[0].array).toEqual(['a', 'b', 'c']);
      expect(result[1].array).toEqual(['d', 'e']);
      expect(result[2].array).toEqual(['f']);
    });
  });

  describe('StringArrayArray type', () => {
    it('should allow valid StringArrayArray values', () => {
      const validArrays: StringArrayArray[] = [
        [],
        [{ array: ['a', 'b'] }],
        [{ array: [] }, { array: ['c', 'd'] }],
        [
          { array: ['single'] },
          { array: [] },
          { array: ['multiple', 'items'] },
        ],
      ];
      validArrays.forEach((arr) => {
        expect(stringArrayArraySchema.parse(arr)).toEqual(arr);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (arr: StringArrayArray): StringArrayArray => arr;
      const testArr: StringArrayArray = [
        { array: ['test', 'array'] },
        { array: ['another', 'test'] },
      ];
      expect(testFunction(testArr)).toEqual(testArr);
    });

    it('should work with array methods', () => {
      const testFunction = (arr: StringArrayArray): number => {
        return arr.reduce((total, item) => total + item.array.length, 0);
      };
      expect(
        testFunction([
          { array: ['a', 'b', 'c'] },
          { array: ['d', 'e'] },
          { array: ['f'] },
        ])
      ).toBe(6);
    });

    it('should work with array filtering and mapping', () => {
      const testFunction = (arr: StringArrayArray): string[] => {
        return arr
          .filter((item) => item.array.length > 1)
          .flatMap((item) =>
            item.array.map((str: string) => str.toUpperCase())
          );
      };
      expect(
        testFunction([
          { array: ['a', 'b', 'c'] },
          { array: ['d'] },
          { array: ['e', 'f'] },
        ])
      ).toEqual(['A', 'B', 'C', 'E', 'F']);
    });
  });
});
