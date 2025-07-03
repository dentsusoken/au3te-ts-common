import { describe, it, expect } from 'vitest';
import { taggedValueSchema, type TaggedValue } from '../TaggedValue';

describe('TaggedValue', () => {
  describe('taggedValueSchema', () => {
    it('should accept a valid TaggedValue object with string values', () => {
      const validTaggedValue: TaggedValue = { tag: 'en', value: 'Hello' };
      const result = taggedValueSchema.parse(validTaggedValue);
      expect(result).toEqual(validTaggedValue);
    });

    it('should accept a TaggedValue object with null values', () => {
      const taggedValueWithNulls = { tag: null, value: null };
      const result = taggedValueSchema.parse(taggedValueWithNulls);
      expect(result).toEqual(taggedValueWithNulls);
    });

    it('should accept a TaggedValue object with undefined values', () => {
      const taggedValueWithUndefined = { tag: undefined, value: undefined };
      const result = taggedValueSchema.parse(taggedValueWithUndefined);
      expect(result).toEqual(taggedValueWithUndefined);
    });

    it('should accept a TaggedValue object with mixed null/undefined values', () => {
      const mixedTaggedValue = { tag: null, value: undefined };
      const result = taggedValueSchema.parse(mixedTaggedValue);
      expect(result).toEqual(mixedTaggedValue);
    });

    it('should accept an empty object', () => {
      const emptyTaggedValue = {};
      const result = taggedValueSchema.parse(emptyTaggedValue);
      expect(result).toEqual(emptyTaggedValue);
    });

    it('should accept a TaggedValue object with only tag property', () => {
      const taggedValueWithTagOnly = { tag: 'en' };
      const result = taggedValueSchema.parse(taggedValueWithTagOnly);
      expect(result).toEqual(taggedValueWithTagOnly);
    });

    it('should accept a TaggedValue object with only value property', () => {
      const taggedValueWithValueOnly = { value: 'Hello' };
      const result = taggedValueSchema.parse(taggedValueWithValueOnly);
      expect(result).toEqual(taggedValueWithValueOnly);
    });

    it('should accept a TaggedValue object with empty string values', () => {
      const taggedValueWithEmptyStrings = { tag: '', value: '' };
      const result = taggedValueSchema.parse(taggedValueWithEmptyStrings);
      expect(result).toEqual(taggedValueWithEmptyStrings);
    });

    it('should reject a TaggedValue object with invalid property types', () => {
      const invalidTaggedValues = [
        { tag: 123, value: 'Hello' },
        { tag: 'en', value: true },
        { tag: 123, value: true },
        { tag: [], value: 'Hello' },
        { tag: 'en', value: {} },
        { tag: () => {}, value: 'Hello' },
        { tag: 'en', value: () => {} },
      ];

      invalidTaggedValues.forEach((invalidTaggedValue) => {
        const result = taggedValueSchema.safeParse(invalidTaggedValue);
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
        const result = taggedValueSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof taggedValueSchema._type;
      type ExpectedType = TaggedValue;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle complex string values', () => {
      const complexTaggedValue = {
        tag: 'en-US',
        value: 'Hello, World!',
      };
      const result = taggedValueSchema.parse(complexTaggedValue);
      expect(result).toEqual(complexTaggedValue);
    });

    it('should handle special characters in strings', () => {
      const specialCharTaggedValue = {
        tag: 'es-ES',
        value: '¡Hola! ¿Cómo estás?',
      };
      const result = taggedValueSchema.parse(specialCharTaggedValue);
      expect(result).toEqual(specialCharTaggedValue);
    });

    it('should handle unicode characters', () => {
      const unicodeTaggedValue = {
        tag: 'ja-JP',
        value: 'こんにちは、世界！',
      };
      const result = taggedValueSchema.parse(unicodeTaggedValue);
      expect(result).toEqual(unicodeTaggedValue);
    });

    it('should handle various language tags', () => {
      const languageTags = [
        { tag: 'en', value: 'English' },
        { tag: 'fr', value: 'Français' },
        { tag: 'de', value: 'Deutsch' },
        { tag: 'es', value: 'Español' },
        { tag: 'it', value: 'Italiano' },
        { tag: 'pt', value: 'Português' },
        { tag: 'ru', value: 'Русский' },
        { tag: 'zh', value: '中文' },
        { tag: 'ja', value: '日本語' },
        { tag: 'ko', value: '한국어' },
      ];

      languageTags.forEach((taggedValue) => {
        const result = taggedValueSchema.parse(taggedValue);
        expect(result).toEqual(taggedValue);
      });
    });

    it('should handle extended language tags', () => {
      const extendedTags = [
        { tag: 'en-US', value: 'American English' },
        { tag: 'en-GB', value: 'British English' },
        { tag: 'fr-CA', value: 'Canadian French' },
        { tag: 'de-AT', value: 'Austrian German' },
        { tag: 'es-MX', value: 'Mexican Spanish' },
      ];

      extendedTags.forEach((taggedValue) => {
        const result = taggedValueSchema.parse(taggedValue);
        expect(result).toEqual(taggedValue);
      });
    });
  });

  describe('TaggedValue type', () => {
    it('should allow valid TaggedValue values', () => {
      const validTaggedValues: TaggedValue[] = [
        { tag: 'en', value: 'Hello' },
        { tag: null, value: null },
        { tag: undefined, value: undefined },
        { tag: 'fr', value: 'Bonjour' },
        {},
        { tag: 'de' },
        { value: 'Hallo' },
      ];

      validTaggedValues.forEach((taggedValue) => {
        expect(taggedValueSchema.parse(taggedValue)).toEqual(taggedValue);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (taggedValue: TaggedValue): TaggedValue => {
        return taggedValue;
      };

      const testTaggedValue: TaggedValue = { tag: 'test', value: 'value' };
      expect(testFunction(testTaggedValue)).toEqual(testTaggedValue);
    });

    it('should allow partial TaggedValue objects', () => {
      const partialTaggedValues: TaggedValue[] = [
        {},
        { tag: 'only-tag' },
        { value: 'only-value' },
        { tag: null, value: 'string-value' },
        { tag: 'string-tag', value: null },
      ];

      partialTaggedValues.forEach((taggedValue) => {
        expect(taggedValueSchema.parse(taggedValue)).toEqual(taggedValue);
      });
    });
  });
});
