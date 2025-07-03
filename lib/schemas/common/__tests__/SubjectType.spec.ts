import { describe, it, expect } from 'vitest';
import { subjectTypes, subjectTypeSchema, SubjectType } from '../SubjectType';

describe('SubjectType and related schemas', () => {
  describe('subjectTypeSchema', () => {
    it('should accept valid subject types and transform to lowercase', () => {
      subjectTypes.forEach((type) => {
        const result = subjectTypeSchema.parse(type);
        expect(result).toBe(type.toLowerCase());
      });
    });

    it('should accept valid subject types in uppercase and transform to lowercase', () => {
      const uppercaseTypes = subjectTypes.map((type) => type.toUpperCase());
      uppercaseTypes.forEach((type, index) => {
        const result = subjectTypeSchema.parse(type);
        expect(result).toBe(subjectTypes[index]);
      });
    });

    it('should accept valid subject types in mixed case and transform to lowercase', () => {
      const mixedCaseTypes = ['Public', 'PAIRWISE', 'pUbLiC', 'PairWise'];
      const expectedResults = ['public', 'pairwise', 'public', 'pairwise'];

      mixedCaseTypes.forEach((type, index) => {
        const result = subjectTypeSchema.parse(type);
        expect(result).toBe(expectedResults[index]);
      });
    });

    it('should reject invalid subject types', () => {
      const invalidTypes = [
        'invalid',
        'subject',
        'private',
        'individual',
        123,
        true,
        {},
        null,
        undefined,
      ];
      invalidTypes.forEach((type) => {
        const result = subjectTypeSchema.safeParse(type);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-string values', () => {
      const nonStringValues = [123, true, false, {}, [], null, undefined];
      nonStringValues.forEach((value) => {
        const result = subjectTypeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof subjectTypeSchema._type;
      type ExpectedType = string;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should ensure all subject types are covered', () => {
      // This test ensures that the schema covers all defined subject types
      expect(subjectTypes).toContain('public');
      expect(subjectTypes).toContain('pairwise');
      expect(subjectTypes).toHaveLength(2);
    });
  });

  describe('SubjectType type', () => {
    it('should allow valid subject type values', () => {
      const validTypes: SubjectType[] = ['public', 'pairwise'];
      validTypes.forEach((type) => {
        expect(subjectTypes).toContain(type);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (subjectType: SubjectType): string => {
        return subjectType;
      };

      expect(testFunction('public')).toBe('public');
      expect(testFunction('pairwise')).toBe('pairwise');
    });
  });
});
