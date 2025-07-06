import { describe, expect, it } from 'vitest';
import {
  authzDetailsElementSchema,
  type AuthzDetailsElement,
} from '../AuthzDetailsElement';

describe('AuthzDetailsElement', () => {
  describe('valid requests', () => {
    it('should accept minimal valid AuthzDetailsElement object', () => {
      const validElement: AuthzDetailsElement = {
        type: 'example',
      };

      const result = authzDetailsElementSchema.parse(validElement);
      expect(result).toEqual(validElement);
    });

    it('should accept AuthzDetailsElement with all fields', () => {
      const fullElement: AuthzDetailsElement = {
        type: 'example',
        locations: ['https://example.com'],
        actions: ['read', 'write'],
        datatypes: ['personal', 'financial'],
        identifier: 'user123',
        privileges: ['admin', 'user'],
      };

      const result = authzDetailsElementSchema.parse(fullElement);
      expect(result).toEqual(fullElement);
    });

    it('should accept element with valid string fields', () => {
      const elementWithStrings: AuthzDetailsElement = {
        type: 'payment',
        identifier: 'user123',
      };

      const result = authzDetailsElementSchema.parse(elementWithStrings);
      expect(result).toEqual(elementWithStrings);
    });

    it('should accept element with valid array fields', () => {
      const elementWithArrays: AuthzDetailsElement = {
        type: 'account',
        locations: ['https://api.example.com', 'https://api2.example.com'],
        actions: ['read', 'write', 'delete'],
        datatypes: ['personal', 'financial', 'medical'],
        privileges: ['admin', 'user', 'guest'],
      };

      const result = authzDetailsElementSchema.parse(elementWithArrays);
      expect(result).toEqual(elementWithArrays);
    });

    it('should accept element with null values for optional fields', () => {
      const elementWithNulls = {
        type: null,
        locations: null,
        actions: null,
        datatypes: null,
        identifier: null,
        privileges: null,
      };

      const result = authzDetailsElementSchema.parse(elementWithNulls);
      expect(result.type).toBeNull();
      expect(result.locations).toBeNull();
      expect(result.actions).toBeNull();
      expect(result.datatypes).toBeNull();
      expect(result.identifier).toBeNull();
      expect(result.privileges).toBeNull();
    });

    it('should accept element with undefined values for optional fields', () => {
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

    it('should accept empty object', () => {
      const emptyElement = {};

      const result = authzDetailsElementSchema.parse(emptyElement);
      expect(result).toEqual(emptyElement);
    });

    it('should accept element with additional properties', () => {
      const elementWithExtra = {
        type: 'example',
        extraProp: 'extra',
        anotherProp: 123,
        nestedProp: { key: 'value' },
      };

      const result = authzDetailsElementSchema.parse(elementWithExtra);
      expect(result).toEqual(elementWithExtra);
    });

    it('should accept element with mixed null and valid values', () => {
      const mixedElement = {
        type: 'example',
        locations: null,
        actions: ['read'],
        datatypes: undefined,
        identifier: 'user123',
        privileges: null,
      };

      const result = authzDetailsElementSchema.parse(mixedElement);
      expect(result).toEqual(mixedElement);
    });

    it('should accept element with empty arrays', () => {
      const elementWithEmptyArrays: AuthzDetailsElement = {
        type: 'example',
        locations: [],
        actions: [],
        datatypes: [],
        privileges: [],
      };

      const result = authzDetailsElementSchema.parse(elementWithEmptyArrays);
      expect(result).toEqual(elementWithEmptyArrays);
    });

    it('should accept element with empty string values', () => {
      const elementWithEmptyStrings: AuthzDetailsElement = {
        type: '',
        identifier: '',
      };

      const result = authzDetailsElementSchema.parse(elementWithEmptyStrings);
      expect(result).toEqual(elementWithEmptyStrings);
    });

    it('should accept element with very long string values', () => {
      const longString = 'a'.repeat(1000);
      const elementWithLongStrings: AuthzDetailsElement = {
        type: longString,
        identifier: longString,
      };

      const result = authzDetailsElementSchema.parse(elementWithLongStrings);
      expect(result).toEqual(elementWithLongStrings);
    });

    it('should accept element with very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `item${i}`);
      const elementWithLongArrays: AuthzDetailsElement = {
        type: 'example',
        locations: longArray,
        actions: longArray,
        datatypes: longArray,
        privileges: longArray,
      };

      const result = authzDetailsElementSchema.parse(elementWithLongArrays);
      expect(result).toEqual(elementWithLongArrays);
    });
  });

  describe('invalid requests', () => {
    it('should reject element with non-string type', () => {
      const invalidElement = {
        type: 123,
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['type']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with non-array locations', () => {
      const invalidElement = {
        type: 'example',
        locations: 'not-an-array',
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['locations']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with non-array actions', () => {
      const invalidElement = {
        type: 'example',
        actions: 'not-an-array',
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['actions']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with non-array datatypes', () => {
      const invalidElement = {
        type: 'example',
        datatypes: 'not-an-array',
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['datatypes']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with non-string identifier', () => {
      const invalidElement = {
        type: 'example',
        identifier: 123,
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['identifier']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with non-array privileges', () => {
      const invalidElement = {
        type: 'example',
        privileges: 'not-an-array',
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['privileges']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject element with invalid array element types', () => {
      const invalidElement = {
        type: 'example',
        locations: [123, 'valid'],
        actions: [true, 'valid'],
        datatypes: [{}, 'valid'],
        privileges: [() => {}, 'valid'],
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
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
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1);
          expect(result.error.issues[0].code).toBe('invalid_type');
        }
      });
    });

    it('should reject element with multiple invalid fields', () => {
      const invalidElement = {
        type: 123,
        locations: 'not-an-array',
        actions: [123],
        datatypes: [true],
        identifier: {},
        privileges: () => {},
      };

      const result = authzDetailsElementSchema.safeParse(invalidElement);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept element with special characters in strings', () => {
      const elementWithSpecialChars: AuthzDetailsElement = {
        type: 'payment-account@example.com',
        identifier: 'user-123_456',
        locations: ['https://api.example.com/path?param=value'],
        actions: ['read', 'write', 'delete'],
        datatypes: ['personal-data', 'financial_info'],
        privileges: ['admin', 'user', 'guest'],
      };

      const result = authzDetailsElementSchema.parse(elementWithSpecialChars);
      expect(result).toEqual(elementWithSpecialChars);
    });

    it('should accept element with unicode characters', () => {
      const elementWithUnicode: AuthzDetailsElement = {
        type: 'payment-account-日本語',
        identifier: 'user-123-中文',
        locations: ['https://api.example.com/中文'],
        actions: ['read', 'write', 'delete'],
        datatypes: ['personal-data', 'financial_info'],
        privileges: ['admin', 'user', 'guest'],
      };

      const result = authzDetailsElementSchema.parse(elementWithUnicode);
      expect(result).toEqual(elementWithUnicode);
    });

    it('should accept element with very large arrays', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => `item${i}`);
      const elementWithLargeArrays: AuthzDetailsElement = {
        type: 'example',
        locations: largeArray,
        actions: largeArray,
        datatypes: largeArray,
        privileges: largeArray,
      };

      const result = authzDetailsElementSchema.parse(elementWithLargeArrays);
      expect(result).toEqual(elementWithLargeArrays);
    });

    it('should accept element with nested objects in additional properties', () => {
      const elementWithNested = {
        type: 'example',
        metadata: {
          version: '1.0',
          description: 'Test element',
          tags: ['test', 'example'],
          config: {
            enabled: true,
            timeout: 5000,
          },
        },
        extraData: [1, 2, 3, 4, 5],
      };

      const result = authzDetailsElementSchema.parse(elementWithNested);
      expect(result).toEqual(elementWithNested);
    });
  });
});
