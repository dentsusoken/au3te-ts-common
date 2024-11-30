import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defaultMdocComputeCredentialDuration } from './mdocComputeCredentialDuration';

describe('defaultMdocComputeCredentialDuration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should compute duration for exactly one year', () => {
    // Set current date to 2024-01-01 00:00:00
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const duration = defaultMdocComputeCredentialDuration();

    // Expected duration: 365 days * 24 hours * 60 minutes * 60 seconds
    // 2024 is a leap year, so we use 366 days
    const expectedDuration = 366 * 24 * 60 * 60;
    expect(duration).toBe(expectedDuration);
  });

  it('should compute duration for non-leap year', () => {
    // Set current date to 2023-01-01 00:00:00
    const now = new Date('2023-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const duration = defaultMdocComputeCredentialDuration();

    // Expected duration: 365 days * 24 hours * 60 minutes * 60 seconds
    const expectedDuration = 365 * 24 * 60 * 60;
    expect(duration).toBe(expectedDuration);
  });

  it('should handle mid-year dates', () => {
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

  it('should handle year boundary crossing', () => {
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
