import { describe, it, expect } from 'vitest';
import {
  subjectTypes,
  subjectTypeSchema,
  nullableButOptionalSubjectTypeSchema,
} from './SubjectType';

describe('SubjectType and related schemas', () => {
  describe('subjectTypeSchema', () => {
    it('should accept valid subject types', () => {
      subjectTypes.forEach((type) => {
        const result = subjectTypeSchema.safeParse(type);
        expect(result.success).toBe(true);
      });
    });

    it('should accept valid subject types in uppercase', () => {
      const uppercaseTypes = subjectTypes.map((type) => type.toUpperCase());
      uppercaseTypes.forEach((type) => {
        const result = subjectTypeSchema.safeParse(type);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid subject types', () => {
      const invalidTypes = ['invalid', 'subject', 123, true, {}];
      invalidTypes.forEach((type) => {
        const result = subjectTypeSchema.safeParse(type);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('nullableButOptionalSubjectTypeSchema', () => {
    it('should accept valid subject types', () => {
      subjectTypes.forEach((type) => {
        const result = nullableButOptionalSubjectTypeSchema.safeParse(type);
        expect(result.success).toBe(true);
      });
    });

    it('should accept undefined', () => {
      const result = nullableButOptionalSubjectTypeSchema.safeParse(undefined);
      expect(result.success).toBe(true);
    });

    it('should treat null as undefined', () => {
      const result = nullableButOptionalSubjectTypeSchema.safeParse(null);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });

    it('should reject invalid subject types', () => {
      const invalidTypes = ['invalid', 'subject', 123, true, {}];
      invalidTypes.forEach((type) => {
        const result = nullableButOptionalSubjectTypeSchema.safeParse(type);
        expect(result.success).toBe(false);
      });
    });
  });
});
