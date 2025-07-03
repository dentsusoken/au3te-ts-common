import { describe, it, expect } from 'vitest';
import { propertySchema, type Property } from '../Property';

describe('Property', () => {
  describe('propertySchema', () => {
    it('should accept a valid Property object with all fields', () => {
      const validProperty: Property = {
        key: 'testKey',
        value: 'testValue',
        hidden: true,
      };
      const result = propertySchema.parse(validProperty);
      expect(result).toEqual(validProperty);
    });

    it('should accept a Property object with null values', () => {
      const propertyWithNulls = {
        key: null,
        value: null,
        hidden: null,
      };
      const result = propertySchema.parse(propertyWithNulls);
      expect(result).toEqual(propertyWithNulls);
    });

    it('should accept a Property object with undefined values', () => {
      const propertyWithUndefined = {
        key: undefined,
        value: undefined,
        hidden: undefined,
      };
      const result = propertySchema.parse(propertyWithUndefined);
      expect(result).toEqual(propertyWithUndefined);
    });

    it('should accept a Property object with mixed null/undefined values', () => {
      const mixedProperty = {
        key: null,
        value: undefined,
        hidden: true,
      };
      const result = propertySchema.parse(mixedProperty);
      expect(result).toEqual(mixedProperty);
    });

    it('should accept an empty object', () => {
      const emptyProperty = {};
      const result = propertySchema.parse(emptyProperty);
      expect(result).toEqual(emptyProperty);
    });

    it('should accept a Property object with only key property', () => {
      const propertyWithKeyOnly = { key: 'testKey' };
      const result = propertySchema.parse(propertyWithKeyOnly);
      expect(result).toEqual(propertyWithKeyOnly);
    });

    it('should accept a Property object with only value property', () => {
      const propertyWithValueOnly = { value: 'testValue' };
      const result = propertySchema.parse(propertyWithValueOnly);
      expect(result).toEqual(propertyWithValueOnly);
    });

    it('should accept a Property object with only hidden property', () => {
      const propertyWithHiddenOnly = { hidden: false };
      const result = propertySchema.parse(propertyWithHiddenOnly);
      expect(result).toEqual(propertyWithHiddenOnly);
    });

    it('should accept a Property object with empty string values', () => {
      const propertyWithEmptyStrings = {
        key: '',
        value: '',
        hidden: false,
      };
      const result = propertySchema.parse(propertyWithEmptyStrings);
      expect(result).toEqual(propertyWithEmptyStrings);
    });

    it('should reject a Property object with invalid property types', () => {
      const invalidProperties = [
        { key: 123, value: 'testValue', hidden: true },
        { key: 'testKey', value: {}, hidden: true },
        { key: 'testKey', value: 'testValue', hidden: 'not a boolean' },
        { key: 123, value: {}, hidden: 'not a boolean' },
        { key: [], value: 'testValue', hidden: true },
        { key: 'testKey', value: () => {}, hidden: true },
        { key: 'testKey', value: 'testValue', hidden: 123 },
      ];

      invalidProperties.forEach((invalidProperty) => {
        const result = propertySchema.safeParse(invalidProperty);
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
        const result = propertySchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof propertySchema._type;
      type ExpectedType = Property;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle complex string values', () => {
      const complexProperty = {
        key: 'user.profile.email',
        value: 'user@example.com',
        hidden: true,
      };
      const result = propertySchema.parse(complexProperty);
      expect(result).toEqual(complexProperty);
    });

    it('should handle special characters in strings', () => {
      const specialCharProperty = {
        key: 'special-key_123',
        value: 'value with spaces and !@#$%^&*()',
        hidden: false,
      };
      const result = propertySchema.parse(specialCharProperty);
      expect(result).toEqual(specialCharProperty);
    });

    it('should handle unicode characters', () => {
      const unicodeProperty = {
        key: '日本語キー',
        value: '日本語の値',
        hidden: true,
      };
      const result = propertySchema.parse(unicodeProperty);
      expect(result).toEqual(unicodeProperty);
    });

    it('should handle boolean edge cases', () => {
      const booleanEdgeCases = [
        { key: 'test', value: 'test', hidden: true },
        { key: 'test', value: 'test', hidden: false },
      ];

      booleanEdgeCases.forEach((property) => {
        const result = propertySchema.parse(property);
        expect(result).toEqual(property);
      });
    });
  });

  describe('Property type', () => {
    it('should allow valid Property values', () => {
      const validProperties: Property[] = [
        { key: 'name', value: 'John', hidden: true },
        { key: null, value: null, hidden: null },
        { key: undefined, value: undefined, hidden: undefined },
        { key: 'age', value: '30', hidden: false },
        {},
        { key: 'email' },
        { value: 'test@example.com' },
        { hidden: true },
      ];

      validProperties.forEach((property) => {
        expect(propertySchema.parse(property)).toEqual(property);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (property: Property): Property => {
        return property;
      };

      const testProperty: Property = {
        key: 'test',
        value: 'value',
        hidden: false,
      };
      expect(testFunction(testProperty)).toEqual(testProperty);
    });

    it('should allow partial Property objects', () => {
      const partialProperties: Property[] = [
        {},
        { key: 'only-key' },
        { value: 'only-value' },
        { hidden: true },
        { key: null, value: 'string-value' },
        { key: 'string-key', value: null },
        { key: 'string-key', hidden: null },
      ];

      partialProperties.forEach((property) => {
        expect(propertySchema.parse(property)).toEqual(property);
      });
    });
  });
});
