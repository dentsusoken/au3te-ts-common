import { describe, it, expect } from 'vitest';
import { matchFormat } from './matchFormat';
import { FORMAT } from './constants';
import type { CredentialFormat, MdocCredential } from './types';

describe('matchFormat', () => {
  // Basic test cases
  it('should return true when format matches mso_mdoc', () => {
    const issuableCredential = {
      [FORMAT]: 'mso_mdoc',
    };

    expect(matchFormat(issuableCredential, 'mso_mdoc')).toBe(true);
  });

  it('should return true when format matches vc+sd-jwt', () => {
    const issuableCredential = {
      [FORMAT]: 'vc+sd-jwt',
    };

    expect(matchFormat(issuableCredential, 'vc+sd-jwt')).toBe(true);
  });

  it('should return false when formats do not match', () => {
    const issuableCredential = {
      [FORMAT]: 'mso_mdoc',
    };

    expect(matchFormat(issuableCredential, 'vc+sd-jwt')).toBe(false);
  });

  // Edge cases
  it('should return false when credential has no format', () => {
    const issuableCredential: MdocCredential = {};
    const format: CredentialFormat = 'mso_mdoc';

    expect(matchFormat(issuableCredential, format)).toBe(false);
  });

  it('should return false when format is undefined', () => {
    const issuableCredential = {
      [FORMAT]: undefined,
    };

    expect(matchFormat(issuableCredential, 'mso_mdoc')).toBe(false);
  });
});
