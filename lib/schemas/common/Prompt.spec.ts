import { describe, it, expect } from 'vitest';
import {
  promptSchema,
  nullableButOptionalPromptArraySchema,
  Prompt,
} from './Prompt';

describe('promptSchema', () => {
  it('should accept valid prompt values', () => {
    const validPrompts: Prompt[] = [
      'none',
      'login',
      'consent',
      'select_account',
      'create',
    ];
    validPrompts.forEach((prompt) => {
      const result = promptSchema.safeParse(prompt);
      expect(result.success).toBe(true);
    });
  });

  it('should accept valid prompt values in uppercase', () => {
    const uppercasePrompts = [
      'NONE',
      'LOGIN',
      'CONSENT',
      'SELECT_ACCOUNT',
      'CREATE',
    ];
    uppercasePrompts.forEach((prompt) => {
      const result = promptSchema.safeParse(prompt);
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid prompt values', () => {
    const invalidPrompts = ['invalid', 'prompt', 123, true, {}];
    invalidPrompts.forEach((prompt) => {
      const result = promptSchema.safeParse(prompt);
      expect(result.success).toBe(false);
    });
  });
});

describe('nullableButOptionalPromptArraySchema', () => {
  it('should accept an array of valid prompts', () => {
    const validPrompts: Prompt[] = ['none', 'login', 'consent'];
    const result = nullableButOptionalPromptArraySchema.safeParse(validPrompts);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validPrompts);
    }
  });

  it('should accept an empty array', () => {
    const result = nullableButOptionalPromptArraySchema.safeParse([]);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual([]);
    }
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalPromptArraySchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalPromptArraySchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should reject non-array values', () => {
    const invalidValues = [123, 'string', true, {}, () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalPromptArraySchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should reject arrays containing invalid prompt values', () => {
    const invalidPrompts = ['none', 'invalid', 'login'];
    const result =
      nullableButOptionalPromptArraySchema.safeParse(invalidPrompts);
    expect(result.success).toBe(false);
  });

  it('should accept arrays with valid prompt values in mixed case', () => {
    const mixedCasePrompts = ['none', 'LOGIN', 'Consent', 'SELECT_ACCOUNT'];
    const result =
      nullableButOptionalPromptArraySchema.safeParse(mixedCasePrompts);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(mixedCasePrompts.map((p) => p.toLowerCase()));
    }
  });
});
