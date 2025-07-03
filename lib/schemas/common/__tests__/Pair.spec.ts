import { describe, it, expect } from 'vitest';
import { pairSchema, type Pair } from '../Pair';

describe('Pair', () => {
  describe('pairSchema', () => {
    it('should accept a valid Pair object with string values', () => {
      const validPair: Pair = { key: 'name', value: 'John' };
      const result = pairSchema.parse(validPair);
      expect(result).toEqual(validPair);
    });

    it('should accept a Pair object with null values', () => {
      const pairWithNulls = { key: null, value: null };
      const result = pairSchema.parse(pairWithNulls);
      expect(result).toEqual(pairWithNulls);
    });

    it('should accept a Pair object with undefined values', () => {
      const pairWithUndefined = { key: undefined, value: undefined };
      const result = pairSchema.parse(pairWithUndefined);
      expect(result).toEqual(pairWithUndefined);
    });

    it('should accept a Pair object with mixed null/undefined values', () => {
      const mixedPair = { key: null, value: undefined };
      const result = pairSchema.parse(mixedPair);
      expect(result).toEqual(mixedPair);
    });

    it('should accept a Pair object without properties', () => {
      const emptyPair = {};
      const result = pairSchema.parse(emptyPair);
      expect(result).toEqual(emptyPair);
    });

    it('should accept a Pair object with only key property', () => {
      const pairWithKeyOnly = { key: 'name' };
      const result = pairSchema.parse(pairWithKeyOnly);
      expect(result).toEqual(pairWithKeyOnly);
    });

    it('should accept a Pair object with only value property', () => {
      const pairWithValueOnly = { value: 'John' };
      const result = pairSchema.parse(pairWithValueOnly);
      expect(result).toEqual(pairWithValueOnly);
    });

    it('should accept a Pair object with empty string values', () => {
      const pairWithEmptyStrings = { key: '', value: '' };
      const result = pairSchema.parse(pairWithEmptyStrings);
      expect(result).toEqual(pairWithEmptyStrings);
    });

    it('should reject a Pair object with invalid property types', () => {
      const invalidPairs = [
        { key: 123, value: 'John' },
        { key: 'name', value: true },
        { key: 123, value: true },
        { key: [], value: 'John' },
        { key: 'name', value: {} },
        { key: () => {}, value: 'John' },
        { key: 'name', value: () => {} },
      ];

      invalidPairs.forEach((invalidPair) => {
        const result = pairSchema.safeParse(invalidPair);
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
        const result = pairSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof pairSchema._type;
      type ExpectedType = Pair;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle complex string values', () => {
      const complexPair = {
        key: 'user.profile.email',
        value: 'user@example.com',
      };
      const result = pairSchema.parse(complexPair);
      expect(result).toEqual(complexPair);
    });

    it('should handle special characters in strings', () => {
      const specialCharPair = {
        key: 'special-key_123',
        value: 'value with spaces and !@#$%^&*()',
      };
      const result = pairSchema.parse(specialCharPair);
      expect(result).toEqual(specialCharPair);
    });

    it('should handle unicode characters', () => {
      const unicodePair = {
        key: '日本語キー',
        value: '日本語の値',
      };
      const result = pairSchema.parse(unicodePair);
      expect(result).toEqual(unicodePair);
    });
  });

  describe('Pair type', () => {
    it('should allow valid Pair values', () => {
      const validPairs: Pair[] = [
        { key: 'name', value: 'John' },
        { key: null, value: null },
        { key: undefined, value: undefined },
        { key: 'age', value: '30' },
        {},
        { key: 'email' },
        { value: 'test@example.com' },
      ];

      validPairs.forEach((pair) => {
        expect(pairSchema.parse(pair)).toEqual(pair);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (pair: Pair): Pair => {
        return pair;
      };

      const testPair: Pair = { key: 'test', value: 'value' };
      expect(testFunction(testPair)).toEqual(testPair);
    });

    it('should allow partial Pair objects', () => {
      const partialPairs: Pair[] = [
        {},
        { key: 'only-key' },
        { value: 'only-value' },
        { key: null, value: 'string-value' },
        { key: 'string-key', value: null },
      ];

      partialPairs.forEach((pair) => {
        expect(pairSchema.parse(pair)).toEqual(pair);
      });
    });
  });
});
