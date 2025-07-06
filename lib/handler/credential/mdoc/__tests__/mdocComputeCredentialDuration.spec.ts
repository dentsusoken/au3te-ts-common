import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defaultMdocComputeCredentialDuration } from '../mdocComputeCredentialDuration';

describe('defaultMdocComputeCredentialDuration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('basic duration calculation', () => {
    it('should compute duration for exactly one year from start of year', () => {
      // Set current date to 2024-01-01 00:00:00
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Expected duration: 366 days * 24 hours * 60 minutes * 60 seconds (leap year)
      const expectedDuration = 366 * 24 * 60 * 60;
      expect(duration).toBe(expectedDuration);
    });

    it('should compute duration for exactly one year in non-leap year', () => {
      // Set current date to 2023-01-01 00:00:00
      const now = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Expected duration: 365 days * 24 hours * 60 minutes * 60 seconds
      const expectedDuration = 365 * 24 * 60 * 60;
      expect(duration).toBe(expectedDuration);
    });

    it('should compute duration for exactly one year from end of year', () => {
      // Set current date to 2024-12-31 23:59:59
      const now = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2025-12-31T23:59:59Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });
  });

  describe('mid-year and specific dates', () => {
    it('should handle mid-year dates with leap year', () => {
      // Set current date to 2024-06-15 12:30:45
      const now = new Date('2024-06-15T12:30:45Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2025-06-15T12:30:45Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle mid-year dates in non-leap year', () => {
      // Set current date to 2023-06-15 12:30:45
      const now = new Date('2023-06-15T12:30:45Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2024-06-15T12:30:45Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle February 29th in leap year', () => {
      // Set current date to 2024-02-29 10:15:30
      const now = new Date('2024-02-29T10:15:30Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration - nextYear adds exactly one year, so Feb 29 -> Mar 1
      const expiry = new Date('2025-03-01T10:15:30Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle February 28th in non-leap year', () => {
      // Set current date to 2023-02-28 10:15:30
      const now = new Date('2023-02-28T10:15:30Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2024-02-28T10:15:30Z'); // Next year is leap year
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });
  });

  describe('edge cases and boundary conditions', () => {
    it('should handle year boundary crossing at midnight', () => {
      // Set current date to 2024-12-31 23:59:59
      const now = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2025-12-31T23:59:59Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle year boundary crossing at start of year', () => {
      // Set current date to 2024-01-01 00:00:01
      const now = new Date('2024-01-01T00:00:01Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2025-01-01T00:00:01Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle leap year to non-leap year transition', () => {
      // Set current date to 2024-03-01 12:00:00
      const now = new Date('2024-03-01T12:00:00Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2025-03-01T12:00:00Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle non-leap year to leap year transition', () => {
      // Set current date to 2023-03-01 12:00:00
      const now = new Date('2023-03-01T12:00:00Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration
      const expiry = new Date('2024-03-01T12:00:00Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });
  });

  describe('time precision and rounding', () => {
    it('should handle sub-second precision', () => {
      // Set current date to 2024-07-15 14:30:45.123
      const now = new Date('2024-07-15T14:30:45.123Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration (should be rounded down to seconds)
      const expiry = new Date('2025-07-15T14:30:45.123Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should handle millisecond precision', () => {
      // Set current date to 2024-09-20 08:45:30.999
      const now = new Date('2024-09-20T08:45:30.999Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Calculate expected duration (should be rounded down to seconds)
      const expiry = new Date('2025-09-20T08:45:30.999Z');
      const expectedDuration = Math.floor(
        (expiry.getTime() - now.getTime()) / 1000
      );
      expect(duration).toBe(expectedDuration);
    });

    it('should return integer values only', () => {
      // Set current date to 2024-11-10 16:20:15.500
      const now = new Date('2024-11-10T16:20:15.500Z');
      vi.setSystemTime(now);

      const duration = defaultMdocComputeCredentialDuration();

      // Verify it's an integer
      expect(Number.isInteger(duration)).toBe(true);
      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('different time zones and UTC handling', () => {
    it('should handle different time zones consistently', () => {
      const testDates = [
        '2024-01-01T00:00:00Z',
        '2024-06-15T12:00:00Z',
        '2024-12-31T23:59:59Z',
      ];

      for (const dateString of testDates) {
        const now = new Date(dateString);
        vi.setSystemTime(now);

        const duration = defaultMdocComputeCredentialDuration();

        // Calculate expected duration
        const expiry = new Date(dateString.replace('2024', '2025'));
        const expectedDuration = Math.floor(
          (expiry.getTime() - now.getTime()) / 1000
        );

        expect(duration).toBe(expectedDuration);
      }
    });

    it('should handle daylight saving time transitions', () => {
      // Test around DST transitions (these dates may vary by timezone)
      const testDates = [
        '2024-03-10T02:00:00Z', // Spring forward
        '2024-11-03T02:00:00Z', // Fall back
      ];

      for (const dateString of testDates) {
        const now = new Date(dateString);
        vi.setSystemTime(now);

        const duration = defaultMdocComputeCredentialDuration();

        // Calculate expected duration
        const expiry = new Date(dateString.replace('2024', '2025'));
        const expectedDuration = Math.floor(
          (expiry.getTime() - now.getTime()) / 1000
        );

        expect(duration).toBe(expectedDuration);
      }
    });
  });

  describe('validation and constraints', () => {
    it('should always return positive duration', () => {
      const testDates = [
        '2024-01-01T00:00:00Z',
        '2024-06-15T12:30:45Z',
        '2024-12-31T23:59:59Z',
      ];

      for (const dateString of testDates) {
        const now = new Date(dateString);
        vi.setSystemTime(now);

        const duration = defaultMdocComputeCredentialDuration();

        expect(duration).toBeGreaterThan(0);
      }
    });

    it('should return duration close to one year', () => {
      const testDates = [
        '2024-01-01T00:00:00Z',
        '2024-06-15T12:30:45Z',
        '2024-12-31T23:59:59Z',
      ];

      for (const dateString of testDates) {
        const now = new Date(dateString);
        vi.setSystemTime(now);

        const duration = defaultMdocComputeCredentialDuration();

        // Duration should be approximately one year (365-366 days)
        const oneYearInSeconds = 365 * 24 * 60 * 60;
        const tolerance = 24 * 60 * 60; // 1 day tolerance

        expect(duration).toBeGreaterThanOrEqual(oneYearInSeconds - tolerance);
        expect(duration).toBeLessThanOrEqual(
          oneYearInSeconds + tolerance + 24 * 60 * 60
        ); // +1 day for leap year
      }
    });

    it('should handle century boundary years', () => {
      // Test years around century boundaries
      const testYears = [1999, 2000, 2001, 2099, 2100, 2101];

      for (const year of testYears) {
        const now = new Date(`${year}-06-15T12:00:00Z`);
        vi.setSystemTime(now);

        const duration = defaultMdocComputeCredentialDuration();

        // Calculate expected duration
        const expiry = new Date(`${year + 1}-06-15T12:00:00Z`);
        const expectedDuration = Math.floor(
          (expiry.getTime() - now.getTime()) / 1000
        );

        expect(duration).toBe(expectedDuration);
      }
    });
  });
});
