import { describe, it, expect } from 'vitest';
import { containsRequestedClaims } from './containsRequestedClaims';
import { CLAIMS } from './constants';
import type { MdocCredential } from './types';

describe('containsRequestedClaims', () => {
  // Basic test cases
  it('should return true when issuable credential contains all requested claims', () => {
    const issuableCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      },
    };

    const requestedCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 20,
        },
      },
    };

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  it('should return false when issuable credential is missing requested claims', () => {
    const issuableCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    const requestedCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      },
    };

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(false);
  });

  // Edge cases
  it('should return true when no claims are requested', () => {
    const issuableCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    const requestedCredential: MdocCredential = {};

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  it('should return false when claims are requested but issuable credential has no claims', () => {
    const issuableCredential: MdocCredential = {};

    const requestedCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(false);
  });

  // Nested structure test
  it('should handle deeply nested claim structures', () => {
    const issuableCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: 25,
              name: 'John Doe',
            },
          },
        },
      },
    };

    const requestedCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: 20,
            },
          },
        },
      },
    };

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  // Different value types test
  it('should check structure regardless of value types', () => {
    const issuableCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: '25',
          verified: true,
        },
      },
    };

    const requestedCredential: MdocCredential = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
          verified: 1,
        },
      },
    };

    expect(
      containsRequestedClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });
});
