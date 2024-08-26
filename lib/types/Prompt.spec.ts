import { describe, expect, it } from 'vitest';
import { Prompt } from './Prompt';

describe('Prompt', () => {
  it('should have correct static properties', () => {
    expect(Prompt.NONE).toEqual({
      value: 0,
      name: 'none',
    });
    expect(Prompt.LOGIN).toEqual({
      value: 1,
      name: 'login',
    });
    expect(Prompt.CONSENT).toEqual({
      value: 2,
      name: 'consent',
    });
    expect(Prompt.SELECT_ACCOUNT).toEqual({
      value: 3,
      name: 'select_account',
    });
    expect(Prompt.CREATE).toEqual({
      value: 4,
      name: 'create',
    });
  });

  it('should get Prompt by value', () => {
    expect(Prompt.getByValue(0)).toBe(Prompt.NONE);
    expect(Prompt.getByValue(1)).toBe(Prompt.LOGIN);
    expect(Prompt.getByValue(2)).toBe(Prompt.CONSENT);
    expect(Prompt.getByValue(3)).toBe(Prompt.SELECT_ACCOUNT);
    expect(Prompt.getByValue(4)).toBe(Prompt.CREATE);
    expect(Prompt.getByValue(5)).toBeUndefined();
  });

  it('should get Prompt by name', () => {
    expect(Prompt.getByName('none')).toBe(Prompt.NONE);
    expect(Prompt.getByName('login')).toBe(Prompt.LOGIN);
    expect(Prompt.getByName('consent')).toBe(Prompt.CONSENT);
    expect(Prompt.getByName('select_account')).toBe(Prompt.SELECT_ACCOUNT);
    expect(Prompt.getByName('create')).toBe(Prompt.CREATE);
    expect(Prompt.getByName('unknown')).toBeUndefined();
  });

  it('should convert Prompt array to bits', () => {
    expect(Prompt.toBits([])).toBe(0);
    expect(Prompt.toBits([Prompt.NONE])).toBe(1);
    expect(Prompt.toBits([Prompt.LOGIN])).toBe(2);
    expect(Prompt.toBits([Prompt.CONSENT])).toBe(4);
    expect(Prompt.toBits([Prompt.SELECT_ACCOUNT])).toBe(8);
    expect(Prompt.toBits([Prompt.CREATE])).toBe(16);
    expect(Prompt.toBits([Prompt.LOGIN, Prompt.CONSENT])).toBe(6);
    expect(Prompt.toBits([Prompt.LOGIN, Prompt.SELECT_ACCOUNT])).toBe(10);
  });

  it('should convert bits to Prompt array', () => {
    expect(Prompt.toArray(0)).toEqual([]);
    expect(Prompt.toArray(1)).toEqual([Prompt.NONE]);
    expect(Prompt.toArray(2)).toEqual([Prompt.LOGIN]);
    expect(Prompt.toArray(3)).toEqual([Prompt.NONE, Prompt.LOGIN]);
    expect(Prompt.toArray(4)).toEqual([Prompt.CONSENT]);
    expect(Prompt.toArray(5)).toEqual([Prompt.NONE, Prompt.CONSENT]);
    expect(Prompt.toArray(6)).toEqual([Prompt.LOGIN, Prompt.CONSENT]);
  });
});
