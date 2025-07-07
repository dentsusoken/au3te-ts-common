import { describe, it, expect } from 'vitest';
import { matchDoctype } from '../matchDoctype';
import { DOCTYPE } from '../constants';
import type { Claims } from '../types';

describe('matchDoctype', () => {
  // Basic test cases
  it('should return true when doctypes match', () => {
    const issuableCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    const requestedCredential: Record<string, unknown> = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(true);
  });

  it('should return false when doctypes do not match', () => {
    const issuableCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    const requestedCredential: Record<string, unknown> = {
      [DOCTYPE]: 'org.iso.18013.5.1.dL',
    };

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  // Edge cases
  it('should return false when issuable credential has no doctype', () => {
    const issuableCredential: Claims = {};

    const requestedCredential: Record<string, unknown> = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  it('should return false when requested credential has no doctype', () => {
    const issuableCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    const requestedCredential: Record<string, unknown> = {};

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  it('should return false when both credentials have no doctype', () => {
    const issuableCredential: Claims = {};
    const requestedCredential: Record<string, unknown> = {};

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  // Null/undefined cases
  it('should return false when doctype is null', () => {
    const issuableCredential = {
      [DOCTYPE]: null,
    };

    const requestedCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  it('should return false when doctype is undefined', () => {
    const issuableCredential: Claims = {
      [DOCTYPE]: undefined,
    };

    const requestedCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    expect(matchDoctype(issuableCredential, requestedCredential)).toBe(false);
  });

  it('should return false when requestedCredential is undefined', () => {
    const issuableCredential: Claims = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    expect(
      matchDoctype(issuableCredential, undefined as unknown as Claims)
    ).toBe(false);
  });
});
