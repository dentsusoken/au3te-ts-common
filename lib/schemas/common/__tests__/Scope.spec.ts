import { describe, it, expect } from 'vitest';
import { scopeSchema, type Scope } from '../Scope';

describe('Scope', () => {
  describe('scopeSchema', () => {
    it('should accept a valid Scope object with all fields', () => {
      const validScope: Scope = {
        name: 'read',
        defaultEntry: true,
        description: 'Read access',
        descriptions: [{ tag: 'en', value: 'Read access' }],
        attributes: [{ key: 'category', value: 'data' }],
      };
      const result = scopeSchema.parse(validScope);
      expect(result).toEqual(validScope);
    });

    it('should accept a Scope object with null values', () => {
      const scopeWithNulls = {
        name: null,
        defaultEntry: null,
        description: null,
        descriptions: null,
        attributes: null,
      };
      const result = scopeSchema.parse(scopeWithNulls);
      expect(result).toEqual(scopeWithNulls);
    });

    it('should accept a Scope object with undefined values', () => {
      const scopeWithUndefined = {
        name: undefined,
        defaultEntry: undefined,
        description: undefined,
        descriptions: undefined,
        attributes: undefined,
      };
      const result = scopeSchema.parse(scopeWithUndefined);
      expect(result).toEqual(scopeWithUndefined);
    });

    it('should accept a Scope object with mixed null/undefined values', () => {
      const mixedScope = {
        name: null,
        defaultEntry: true,
        description: undefined,
        descriptions: [{ tag: 'en', value: 'Read access' }],
        attributes: null,
      };
      const result = scopeSchema.parse(mixedScope);
      expect(result).toEqual(mixedScope);
    });

    it('should accept an empty object', () => {
      const emptyScope = {};
      const result = scopeSchema.parse(emptyScope);
      expect(result).toEqual(emptyScope);
    });

    it('should accept a Scope object with only name property', () => {
      const scopeWithNameOnly = { name: 'read' };
      const result = scopeSchema.parse(scopeWithNameOnly);
      expect(result).toEqual(scopeWithNameOnly);
    });

    it('should accept a Scope object with only defaultEntry property', () => {
      const scopeWithDefaultEntryOnly = { defaultEntry: true };
      const result = scopeSchema.parse(scopeWithDefaultEntryOnly);
      expect(result).toEqual(scopeWithDefaultEntryOnly);
    });

    it('should accept a Scope object with only description property', () => {
      const scopeWithDescriptionOnly = { description: 'Read access' };
      const result = scopeSchema.parse(scopeWithDescriptionOnly);
      expect(result).toEqual(scopeWithDescriptionOnly);
    });

    it('should accept a Scope object with only descriptions property', () => {
      const scopeWithDescriptionsOnly = {
        descriptions: [{ tag: 'en', value: 'Read access' }],
      };
      const result = scopeSchema.parse(scopeWithDescriptionsOnly);
      expect(result).toEqual(scopeWithDescriptionsOnly);
    });

    it('should accept a Scope object with only attributes property', () => {
      const scopeWithAttributesOnly = {
        attributes: [{ key: 'category', value: 'data' }],
      };
      const result = scopeSchema.parse(scopeWithAttributesOnly);
      expect(result).toEqual(scopeWithAttributesOnly);
    });

    it('should accept a Scope object with empty arrays', () => {
      const scopeWithEmptyArrays = {
        name: 'read',
        descriptions: [],
        attributes: [],
      };
      const result = scopeSchema.parse(scopeWithEmptyArrays);
      expect(result).toEqual(scopeWithEmptyArrays);
    });

    it('should accept a Scope object with empty string values', () => {
      const scopeWithEmptyStrings = {
        name: '',
        description: '',
        descriptions: [{ tag: '', value: '' }],
        attributes: [{ key: '', value: '' }],
      };
      const result = scopeSchema.parse(scopeWithEmptyStrings);
      expect(result).toEqual(scopeWithEmptyStrings);
    });

    it('should reject a Scope object with invalid property types', () => {
      const invalidScopes = [
        { name: 123, defaultEntry: true, description: 'Read access' },
        { name: 'read', defaultEntry: 'true', description: 'Read access' },
        { name: 'read', defaultEntry: true, description: true },
        { name: 'read', defaultEntry: true, descriptions: 'not an array' },
        { name: 'read', defaultEntry: true, attributes: 'not an array' },
        { name: 123, defaultEntry: 'true', description: true },
        { name: [], defaultEntry: true, description: 'Read access' },
        { name: 'read', defaultEntry: () => {}, description: 'Read access' },
      ];

      invalidScopes.forEach((invalidScope) => {
        const result = scopeSchema.safeParse(invalidScope);
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
        const result = scopeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof scopeSchema._type;
      type ExpectedType = Scope;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle complex scope objects', () => {
      const complexScope = {
        name: 'user.profile.read',
        defaultEntry: false,
        description: 'Read access to user profile information',
        descriptions: [
          { tag: 'en', value: 'Read access to user profile information' },
          { tag: 'ja', value: 'ユーザープロフィール情報の読み取りアクセス' },
          {
            tag: 'fr',
            value: 'Accès en lecture aux informations du profil utilisateur',
          },
        ],
        attributes: [
          { key: 'category', value: 'profile' },
          { key: 'permission', value: 'read' },
          { key: 'resource', value: 'user' },
        ],
      };
      const result = scopeSchema.parse(complexScope);
      expect(result).toEqual(complexScope);
    });

    it('should handle special characters in strings', () => {
      const specialCharScope = {
        name: 'special-scope_123',
        description: 'Scope with special chars: !@#$%^&*()',
        descriptions: [
          { tag: 'en-US', value: 'Scope with special chars: !@#$%^&*()' },
        ],
        attributes: [
          { key: 'special-key_123', value: 'value with spaces and !@#$%^&*()' },
        ],
      };
      const result = scopeSchema.parse(specialCharScope);
      expect(result).toEqual(specialCharScope);
    });

    it('should handle unicode characters', () => {
      const unicodeScope = {
        name: 'unicode_scope',
        description: 'Unicode description: こんにちは',
        descriptions: [
          { tag: 'ja', value: 'Unicode description: こんにちは' },
          { tag: 'zh', value: 'Unicode description: 你好' },
        ],
        attributes: [
          { key: 'unicode_key', value: 'Unicode value: こんにちは' },
        ],
      };
      const result = scopeSchema.parse(unicodeScope);
      expect(result).toEqual(unicodeScope);
    });

    it('should handle boolean edge cases', () => {
      const booleanEdgeCases = [
        { name: 'read', defaultEntry: true },
        { name: 'write', defaultEntry: false },
      ];

      booleanEdgeCases.forEach((scope) => {
        const result = scopeSchema.parse(scope);
        expect(result).toEqual(scope);
      });
    });

    it('should handle multiple descriptions and attributes', () => {
      const multiScope = {
        name: 'multi_scope',
        descriptions: [
          { tag: 'en', value: 'English description' },
          { tag: 'es', value: 'Descripción en español' },
          { tag: 'de', value: 'Deutsche Beschreibung' },
        ],
        attributes: [
          { key: 'category', value: 'data' },
          { key: 'permission', value: 'read' },
          { key: 'priority', value: 'high' },
          { key: 'version', value: '1.0' },
        ],
      };
      const result = scopeSchema.parse(multiScope);
      expect(result).toEqual(multiScope);
    });
  });

  describe('Scope type', () => {
    it('should allow valid Scope values', () => {
      const validScopes: Scope[] = [
        { name: 'read', defaultEntry: true, description: 'Read access' },
        { name: null, defaultEntry: null, description: null },
        { name: undefined, defaultEntry: undefined, description: undefined },
        { name: 'write', defaultEntry: false, description: 'Write access' },
        {},
        { name: 'email' },
        { description: 'Email access' },
        { defaultEntry: true },
        { descriptions: [{ tag: 'en', value: 'Access' }] },
        { attributes: [{ key: 'category', value: 'data' }] },
      ];

      validScopes.forEach((scope) => {
        expect(scopeSchema.parse(scope)).toEqual(scope);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (scope: Scope): Scope => {
        return scope;
      };

      const testScope: Scope = {
        name: 'test',
        defaultEntry: true,
        description: 'test',
      };
      expect(testFunction(testScope)).toEqual(testScope);
    });

    it('should allow partial Scope objects', () => {
      const partialScopes: Scope[] = [
        {},
        { name: 'only-name' },
        { defaultEntry: true },
        { description: 'only-description' },
        { descriptions: [{ tag: 'en', value: 'only-descriptions' }] },
        { attributes: [{ key: 'only', value: 'attributes' }] },
        { name: null, defaultEntry: true },
        { name: 'string-name', defaultEntry: null },
        { name: 'string-name', description: null },
      ];

      partialScopes.forEach((scope) => {
        expect(scopeSchema.parse(scope)).toEqual(scope);
      });
    });
  });
});
