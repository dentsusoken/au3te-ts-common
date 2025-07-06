import { describe, it, expect } from 'vitest';
import { defaultComputeScopes } from '../computeScopes';
import { Scope } from '../../../schemas/common/Scope';
import { DynamicScope } from '../../../schemas/common/DynamicScope';

describe('defaultComputeScopes', () => {
  describe('basic functionality', () => {
    it('should return an empty array when both scopes and dynamicScopes are undefined', () => {
      const result = defaultComputeScopes();
      expect(result).toEqual([]);
    });

    it('should return the original scopes when dynamicScopes is undefined', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const result = defaultComputeScopes(scopes);
      expect(result).toEqual(scopes);
    });

    it('should return only dynamic scopes when scopes is undefined and dynamicScopes is defined', () => {
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
      const result = defaultComputeScopes(undefined, dynamicScopes);
      expect(result).toEqual([{ name: 'dynamicScope1' }]);
    });

    it('should combine scopes and dynamicScopes correctly', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const dynamicScopes: DynamicScope[] = [
        { name: 'dynamicScope1' },
        { name: 'dynamicScope2' },
      ];
      const expected: Scope[] = [
        { name: 'scope1' },
        { name: 'scope2' },
        { name: 'dynamicScope1' },
        { name: 'dynamicScope2' },
      ];
      const result = defaultComputeScopes(scopes, dynamicScopes);
      expect(result).toEqual(expected);
    });
  });

  describe('immutability', () => {
    it('should not modify the original scopes array', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
      const originalScopes = [...scopes];

      const result = defaultComputeScopes(scopes, dynamicScopes);

      expect(scopes).toEqual(originalScopes);
      expect(result).not.toBe(scopes);
      expect(result).toHaveLength(3);
    });

    it('should return the original array reference when only scopes are provided', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const originalScopes = [...scopes];

      const result = defaultComputeScopes(scopes);

      expect(scopes).toEqual(originalScopes);
      expect(result).toBe(scopes); // Returns the same reference
      expect(result).toEqual(scopes);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays correctly', () => {
      const result = defaultComputeScopes([], []);
      expect(result).toEqual([]);
    });

    it('should handle empty scopes with non-empty dynamicScopes', () => {
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
      const result = defaultComputeScopes([], dynamicScopes);
      expect(result).toEqual([{ name: 'dynamicScope1' }]);
    });

    it('should handle non-empty scopes with empty dynamicScopes', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const result = defaultComputeScopes(scopes, []);
      expect(result).toEqual(scopes);
    });

    it('should handle null/undefined values correctly', () => {
      const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];

      // Test with null values (should be treated as undefined)
      expect(
        defaultComputeScopes(
          null as unknown as Scope[],
          null as unknown as DynamicScope[]
        )
      ).toEqual([]);
      expect(
        defaultComputeScopes(scopes, null as unknown as DynamicScope[])
      ).toEqual(scopes);
      expect(
        defaultComputeScopes(null as unknown as Scope[], dynamicScopes)
      ).toEqual([{ name: 'dynamicScope1' }]);
    });

    it('should handle large arrays', () => {
      const largeScopes: Scope[] = Array.from({ length: 1000 }, (_, i) => ({
        name: `scope${i}`,
      }));
      const largeDynamicScopes: DynamicScope[] = Array.from(
        { length: 1000 },
        (_, i) => ({
          name: `dynamicScope${i}`,
        })
      );

      const result = defaultComputeScopes(largeScopes, largeDynamicScopes);

      expect(result).toHaveLength(2000);
      expect(result[0]).toEqual({ name: 'scope0' });
      expect(result[999]).toEqual({ name: 'scope999' });
      expect(result[1000]).toEqual({ name: 'dynamicScope0' });
      expect(result[1999]).toEqual({ name: 'dynamicScope999' });
    });

    it('should handle scopes with empty names', () => {
      const scopes: Scope[] = [{ name: '' }, { name: 'scope1' }];
      const dynamicScopes: DynamicScope[] = [
        { name: '' },
        { name: 'dynamicScope1' },
      ];

      const result = defaultComputeScopes(scopes, dynamicScopes);

      expect(result).toEqual([
        { name: '' },
        { name: 'scope1' },
        { name: '' },
        { name: 'dynamicScope1' },
      ]);
    });

    it('should handle scopes with special characters in names', () => {
      const scopes: Scope[] = [
        { name: 'scope-with-dashes' },
        { name: 'scope_with_underscores' },
        { name: 'scope.with.dots' },
        { name: 'scope with spaces' },
        { name: 'scope123' },
        { name: 'SCOPE_UPPERCASE' },
      ];
      const dynamicScopes: DynamicScope[] = [
        { name: 'dynamic-scope-with-dashes' },
        { name: 'dynamic_scope_with_underscores' },
      ];

      const result = defaultComputeScopes(scopes, dynamicScopes);

      expect(result).toHaveLength(8);
      expect(result[0]).toEqual({ name: 'scope-with-dashes' });
      expect(result[6]).toEqual({ name: 'dynamic-scope-with-dashes' });
    });
  });

  describe('parameter combinations', () => {
    it('should handle all parameter combinations correctly', () => {
      const scopes: Scope[] = [{ name: 'scope1' }];
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];

      // No parameters
      expect(defaultComputeScopes()).toEqual([]);

      // Only scopes
      expect(defaultComputeScopes(scopes)).toEqual(scopes);

      // Only dynamicScopes
      expect(defaultComputeScopes(undefined, dynamicScopes)).toEqual([
        { name: 'dynamicScope1' },
      ]);

      // Both parameters
      expect(defaultComputeScopes(scopes, dynamicScopes)).toEqual([
        { name: 'scope1' },
        { name: 'dynamicScope1' },
      ]);
    });

    it('should preserve order of scopes and dynamicScopes', () => {
      const scopes: Scope[] = [
        { name: 'scope1' },
        { name: 'scope2' },
        { name: 'scope3' },
      ];
      const dynamicScopes: DynamicScope[] = [
        { name: 'dynamicScope1' },
        { name: 'dynamicScope2' },
        { name: 'dynamicScope3' },
      ];

      const result = defaultComputeScopes(scopes, dynamicScopes);

      expect(result).toEqual([
        { name: 'scope1' },
        { name: 'scope2' },
        { name: 'scope3' },
        { name: 'dynamicScope1' },
        { name: 'dynamicScope2' },
        { name: 'dynamicScope3' },
      ]);
    });
  });
});
