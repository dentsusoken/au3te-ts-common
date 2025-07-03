import { describe, it, expect } from 'vitest';
import { promptSchema, type Prompt, prompts } from '../Prompt';

describe('Prompt', () => {
  describe('promptSchema', () => {
    it('should accept valid prompt values', () => {
      prompts.forEach((prompt) => {
        const result = promptSchema.parse(prompt);
        expect(result).toBe(prompt);
      });
    });

    it('should accept valid prompt values in uppercase and transform to lowercase', () => {
      const uppercasePrompts = prompts.map((prompt) => prompt.toUpperCase());
      uppercasePrompts.forEach((prompt, index) => {
        const result = promptSchema.parse(prompt);
        expect(result).toBe(prompts[index]);
      });
    });

    it('should accept valid prompt values in mixed case and transform to lowercase', () => {
      const mixedCasePrompts = [
        'None',
        'LOGIN',
        'Consent',
        'SELECT_ACCOUNT',
        'Create',
      ];
      const expectedResults = [
        'none',
        'login',
        'consent',
        'select_account',
        'create',
      ];

      mixedCasePrompts.forEach((prompt, index) => {
        const result = promptSchema.parse(prompt);
        expect(result).toBe(expectedResults[index]);
      });
    });

    it('should reject invalid prompt values', () => {
      const invalidPrompts = [
        'invalid',
        'prompt',
        'oauth',
        'openid',
        'auth',
        'login_required',
        'consent_required',
        '',
        ' ',
        123,
        true,
        false,
        {},
        [],
        null,
        undefined,
      ];

      invalidPrompts.forEach((prompt) => {
        const result = promptSchema.safeParse(prompt);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-string values', () => {
      const nonStringValues = [123, true, false, {}, [], null, undefined];
      nonStringValues.forEach((value) => {
        const result = promptSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof promptSchema._type;
      type ExpectedType = Prompt;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should ensure all prompt values are covered', () => {
      // This test ensures that the schema covers all defined prompt values
      expect(prompts).toContain('none');
      expect(prompts).toContain('login');
      expect(prompts).toContain('consent');
      expect(prompts).toContain('select_account');
      expect(prompts).toContain('create');
      expect(prompts).toHaveLength(5);
    });

    it('should reject values with whitespace', () => {
      const whitespacePrompts = [
        ' none ',
        '  login  ',
        '\tconsent\t',
        '\nselect_account\n',
      ];

      whitespacePrompts.forEach((prompt) => {
        const result = promptSchema.safeParse(prompt);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Prompt type', () => {
    it('should allow valid prompt values', () => {
      const validPrompts: Prompt[] = [
        'none',
        'login',
        'consent',
        'select_account',
        'create',
      ];
      validPrompts.forEach((prompt) => {
        expect(prompts).toContain(prompt);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (prompt: Prompt): string => {
        return prompt;
      };

      expect(testFunction('none')).toBe('none');
      expect(testFunction('login')).toBe('login');
      expect(testFunction('consent')).toBe('consent');
      expect(testFunction('select_account')).toBe('select_account');
      expect(testFunction('create')).toBe('create');
    });

    it('should work with switch statements', () => {
      const testSwitch = (prompt: Prompt): string => {
        switch (prompt) {
          case 'none':
            return 'no_prompt';
          case 'login':
            return 'force_login';
          case 'consent':
            return 'force_consent';
          case 'select_account':
            return 'force_account_selection';
          case 'create':
            return 'force_account_creation';
          default:
            return 'unknown';
        }
      };

      expect(testSwitch('none')).toBe('no_prompt');
      expect(testSwitch('login')).toBe('force_login');
      expect(testSwitch('consent')).toBe('force_consent');
      expect(testSwitch('select_account')).toBe('force_account_selection');
      expect(testSwitch('create')).toBe('force_account_creation');
    });
  });
});
