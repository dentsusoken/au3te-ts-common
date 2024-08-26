import { describe, expect, it } from 'vitest';
import { subjectTypeSchema } from './SubjectType';

describe('subjectTypeSchema', () => {
  it('should validate "public" as a valid subject type', () => {
    const result = subjectTypeSchema.safeParse('public');
    expect(result.success).toBe(true);
    expect(result.data).toBe('public');
  });

  it('should validate "pairwise" as a valid subject type', () => {
    const result = subjectTypeSchema.safeParse('pairwise');
    expect(result.success).toBe(true);
    expect(result.data).toBe('pairwise');
  });

  it('should invalidate other strings', () => {
    const result = subjectTypeSchema.safeParse('other');
    expect(result.success).toBe(false);
  });

  it('should invalidate empty string', () => {
    const result = subjectTypeSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('should invalidate null or undefined', () => {
    const result = subjectTypeSchema.safeParse(null);
    expect(result.success).toBe(false);

    const result2 = subjectTypeSchema.safeParse(undefined);
    expect(result2.success).toBe(false);
  });
});
