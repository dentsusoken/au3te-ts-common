import { describe, it, expect } from 'vitest';
import { defaultComputeScopes } from './computeScopes';
import { Scope } from '../../schemas/common/Scope';
import { DynamicScope } from '../../schemas/common/DynamicScope';

describe('defaultComputeScopes', () => {
  it('returns an empty array when both scopes and dynamicScopes are undefined', () => {
    expect(defaultComputeScopes()).toEqual([]);
  });

  it('returns the original scopes when dynamicScopes is undefined', () => {
    const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
    expect(defaultComputeScopes(scopes)).toEqual(scopes);
  });

  it('returns only dynamic scopes when scopes is undefined and dynamicScopes is defined', () => {
    const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
    expect(defaultComputeScopes(undefined, dynamicScopes)).toEqual([
      { name: 'dynamicScope1' },
    ]);
  });

  it('combines scopes and dynamicScopes correctly', () => {
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
    expect(defaultComputeScopes(scopes, dynamicScopes)).toEqual(expected);
  });

  it('does not modify the original scopes array', () => {
    const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
    const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
    const result = defaultComputeScopes(scopes, dynamicScopes);
    expect(scopes).toEqual([{ name: 'scope1' }, { name: 'scope2' }]);
    expect(result).not.toBe(scopes);
  });

  it('handles empty arrays correctly', () => {
    expect(defaultComputeScopes([], [])).toEqual([]);
  });

  it('handles empty scopes with non-empty dynamicScopes', () => {
    const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
    expect(defaultComputeScopes([], dynamicScopes)).toEqual([
      { name: 'dynamicScope1' },
    ]);
  });

  it('returns an empty array when scopes is null and dynamicScopes is defined', () => {
    const dynamicScopes: DynamicScope[] = [{ name: 'dynamicScope1' }];
    expect(defaultComputeScopes(undefined, dynamicScopes)).toEqual([
      { name: 'dynamicScope1' },
    ]);
  });

  it('returns an empty array when dynamicScopes is null', () => {
    const scopes: Scope[] = [{ name: 'scope1' }, { name: 'scope2' }];
    expect(defaultComputeScopes(scopes, undefined)).toEqual(scopes);
  });
});
