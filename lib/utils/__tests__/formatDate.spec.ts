import { describe, it, expect } from 'vitest';
import { formatDate, formatCborDate } from '../formatDate';

describe('Date Formatting Utils', () => {
  describe('formatDate', () => {
    it('formats a date to YYYY-MM-DD string', () => {
      const testDate = new Date('2024-03-20');
      expect(formatDate(testDate)).toBe('2024-03-20');
    });

    it('handles single digit months and days correctly', () => {
      const testDate = new Date('2024-01-05');
      expect(formatDate(testDate)).toBe('2024-01-05');
    });
  });

  describe('formatCborDate', () => {
    it('formats a date to CBOR date string format', () => {
      const testDate = new Date('2024-03-20');
      expect(formatCborDate(testDate)).toBe('cbor:1004("2024-03-20")');
    });

    it('handles single digit months and days in CBOR format', () => {
      const testDate = new Date('2024-01-05');
      expect(formatCborDate(testDate)).toBe('cbor:1004("2024-01-05")');
    });
  });
});
