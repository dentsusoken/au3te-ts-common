import { describe, it, expect } from 'vitest';
import { pairSchema, Pair, nullableButOptionalPairArraySchema } from './Pair';

describe('pairSchema and nullableButOptionalPairArraySchema', () => {
  describe('pairSchema', () => {
    it('should accept a valid Pair object', () => {
      const validPair: Pair = { key: 'name', value: 'John' };
      const result = pairSchema.safeParse(validPair);
      expect(result.success).toBe(true);
    });

    it('should accept a Pair object with null values', () => {
      const pairWithNulls = { key: null, value: null };
      const result = pairSchema.safeParse(pairWithNulls);
      expect(result.success).toBe(true);
    });

    it('should accept a Pair object without properties', () => {
      const emptyPair = {};
      const result = pairSchema.safeParse(emptyPair);
      expect(result.success).toBe(true);
    });

    it('should reject a Pair object with invalid property types', () => {
      const invalidPair = { key: 123, value: true };
      const result = pairSchema.safeParse(invalidPair);
      expect(result.success).toBe(false);
    });
  });

  describe('nullableButOptionalPairArraySchema', () => {
    it('should accept an array of valid Pair objects', () => {
      const validPairs: Pair[] = [
        { key: 'name', value: 'John' },
        { key: 'age', value: '30' },
      ];
      const result = nullableButOptionalPairArraySchema.safeParse(validPairs);
      expect(result.success).toBe(true);
    });

    it('should accept undefined', () => {
      const result = nullableButOptionalPairArraySchema.safeParse(undefined);
      expect(result.success).toBe(true);
    });

    it('should treat null as undefined', () => {
      const result = nullableButOptionalPairArraySchema.safeParse(null);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });

    it('should accept an empty array', () => {
      const result = nullableButOptionalPairArraySchema.safeParse([]);
      expect(result.success).toBe(true);
    });

    it('should accept an array with Pair objects containing null values', () => {
      const pairsWithNulls = [
        { key: null, value: null },
        { key: 'name', value: null },
      ];
      const result =
        nullableButOptionalPairArraySchema.safeParse(pairsWithNulls);
      expect(result.success).toBe(true);
    });

    it('should reject non-array, non-null values', () => {
      const invalidValues = [123, 'string', true, {}, () => {}];
      invalidValues.forEach((value) => {
        const result = nullableButOptionalPairArraySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should reject arrays containing invalid Pair objects', () => {
      const invalidPairs = [
        { key: 'name', value: 'John' },
        { key: 123, value: true }, // Invalid types
      ];
      const result = nullableButOptionalPairArraySchema.safeParse(invalidPairs);
      expect(result.success).toBe(false);
    });
  });
});
