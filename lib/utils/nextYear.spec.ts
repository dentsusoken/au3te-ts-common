import { describe, it, expect } from 'vitest';
import { nextYear } from './nextYear';

describe('nextYear', () => {
  it('returns a date exactly one year after the input date', () => {
    const date = new Date('2024-03-20');
    const result = nextYear(date);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(date.getMonth());
    expect(result.getDate()).toBe(date.getDate());
  });

  it('handles leap year correctly (Feb 29 -> Mar 1)', () => {
    const leapYearDate = new Date('2024-02-29');
    const result = nextYear(leapYearDate);
    expect(result.toISOString().split('T')[0]).toBe('2025-03-01');
  });

  it('does not modify the original date object', () => {
    const originalDate = new Date('2024-03-20');
    const originalYear = originalDate.getFullYear();
    nextYear(originalDate);
    expect(originalDate.getFullYear()).toBe(originalYear);
  });
});
