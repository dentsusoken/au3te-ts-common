import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defaultAddMdocDateClaims } from './addMdocDateClaims';
import { EXPIRY_DATE, ISSUE_DATE } from './constants';
import type { Claims } from './types';

describe('defaultAddMdocDateClaims', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should add both issue and expiry dates when no requested claims', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const subClaims: Claims = {};

    defaultAddMdocDateClaims({
      subClaims,
      requestedSubClaims: undefined,
    });

    expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  it('should add both dates when they are in requested claims', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const subClaims: Claims = {};
    const requestedSubClaims: Claims = {
      [ISSUE_DATE]: {},
      [EXPIRY_DATE]: {},
    };

    defaultAddMdocDateClaims({
      subClaims,
      requestedSubClaims,
    });

    expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  it('should add only issue date when only issue date is requested', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const subClaims: Claims = {};
    const requestedSubClaims: Claims = {
      [ISSUE_DATE]: {},
    };

    defaultAddMdocDateClaims({
      subClaims,
      requestedSubClaims,
    });

    expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(EXPIRY_DATE in subClaims).toBe(false);
  });

  it('should add only expiry date when only expiry date is requested', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const subClaims: Claims = {};
    const requestedSubClaims: Claims = {
      [EXPIRY_DATE]: {},
    };

    defaultAddMdocDateClaims({
      subClaims,
      requestedSubClaims,
    });

    expect(ISSUE_DATE in subClaims).toBe(false);
    expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });

  it('should handle doctype parameter', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const subClaims: Claims = {};
    const doctype = 'org.iso.18013.5.1.mDL';

    defaultAddMdocDateClaims({
      subClaims,
      requestedSubClaims: undefined,
      doctype,
    });

    expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
    expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
  });
});
