import { describe, it, expect } from 'vitest';
import {
  taggedValueSchema,
  TaggedValue,
  nullableButOptionalTaggedValueArraySchema,
} from './TaggedValue';

describe('taggedValueSchema and nullableButOptionalTaggedValueArraySchema', () => {
  describe('taggedValueSchema', () => {
    it('should accept a valid TaggedValue object', () => {
      const validTaggedValue: TaggedValue = { tag: 'en', value: 'Hello' };
      const result = taggedValueSchema.safeParse(validTaggedValue);
      expect(result.success).toBe(true);
    });

    it('should accept a TaggedValue object with null values', () => {
      const taggedValueWithNulls = { tag: null, value: null };
      const result = taggedValueSchema.safeParse(taggedValueWithNulls);
      expect(result.success).toBe(true);
    });

    it('should accept a TaggedValue object without properties', () => {
      const emptyTaggedValue = {};
      const result = taggedValueSchema.safeParse(emptyTaggedValue);
      expect(result.success).toBe(true);
    });

    it('should reject a TaggedValue object with invalid property types', () => {
      const invalidTaggedValue = { tag: 123, value: true };
      const result = taggedValueSchema.safeParse(invalidTaggedValue);
      expect(result.success).toBe(false);
    });
  });

  describe('nullableButOptionalTaggedValueArraySchema', () => {
    it('should accept an array of valid TaggedValue objects', () => {
      const validTaggedValues: TaggedValue[] = [
        { tag: 'en', value: 'Hello' },
        { tag: 'fr', value: 'Bonjour' },
      ];
      const result =
        nullableButOptionalTaggedValueArraySchema.safeParse(validTaggedValues);
      expect(result.success).toBe(true);
    });

    it('should accept undefined', () => {
      const result =
        nullableButOptionalTaggedValueArraySchema.safeParse(undefined);
      expect(result.success).toBe(true);
    });

    it('should treat null as undefined', () => {
      const result = nullableButOptionalTaggedValueArraySchema.safeParse(null);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });

    it('should accept an empty array', () => {
      const result = nullableButOptionalTaggedValueArraySchema.safeParse([]);
      expect(result.success).toBe(true);
    });

    it('should accept an array with TaggedValue objects containing null values', () => {
      const taggedValuesWithNulls = [
        { tag: null, value: null },
        { tag: 'en', value: null },
      ];
      const result = nullableButOptionalTaggedValueArraySchema.safeParse(
        taggedValuesWithNulls
      );
      expect(result.success).toBe(true);
    });

    it('should reject non-array, non-null values', () => {
      const invalidValues = [123, 'string', true, {}, () => {}];
      invalidValues.forEach((value) => {
        const result =
          nullableButOptionalTaggedValueArraySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should reject arrays containing invalid TaggedValue objects', () => {
      const invalidTaggedValues = [
        { tag: 'en', value: 'Valid' },
        { tag: 123, value: true }, // Invalid types
      ];
      const result =
        nullableButOptionalTaggedValueArraySchema.safeParse(
          invalidTaggedValues
        );
      expect(result.success).toBe(false);
    });
  });
});
