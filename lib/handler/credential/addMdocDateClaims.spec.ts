import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addMdocDateClaims } from './addMdocDateClaims';
import { EXPIRY_DATE, ISSUE_DATE } from './constants';
import type { Claims } from './types';

describe('addMdocDateClaims', () => {
  beforeEach(() => {
    // 2024-01-01T00:00:00.000Z
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Basic test cases
  it('should add issue_date when requested', () => {
    const subclaims: Claims = {};
    const requestedSubclaims: Claims = {
      [ISSUE_DATE]: true,
    };

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
  });

  it('should add expiry_date when requested', () => {
    const subclaims: Claims = {};
    const requestedSubclaims: Claims = {
      [EXPIRY_DATE]: true,
    };

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  it('should add both dates when both are requested', () => {
    const subclaims: Claims = {};
    const requestedSubclaims: Claims = {
      [ISSUE_DATE]: true,
      [EXPIRY_DATE]: true,
    };

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subclaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  // Edge cases
  it('should not add any dates when none are requested', () => {
    const subclaims: Claims = {};
    const requestedSubclaims: Claims = {};

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims[ISSUE_DATE]).toBeUndefined();
    expect(subclaims[EXPIRY_DATE]).toBeUndefined();
  });

  it('should preserve existing claims when adding dates', () => {
    const subclaims: Claims = {
      name: 'John Doe',
      age: 25,
    };
    const requestedSubclaims: Claims = {
      [ISSUE_DATE]: true,
      [EXPIRY_DATE]: true,
    };

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims.name).toBe('John Doe');
    expect(subclaims.age).toBe(25);
    expect(subclaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subclaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  it('should handle falsy values in requestedSubclaims', () => {
    const subclaims: Claims = {};
    const requestedSubclaims: Claims = {
      [ISSUE_DATE]: false,
      [EXPIRY_DATE]: null,
    };

    addMdocDateClaims(subclaims, requestedSubclaims);

    expect(subclaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subclaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });
});
