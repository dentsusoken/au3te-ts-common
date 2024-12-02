import { describe, it, expect } from 'vitest';
import { createContainsRequestedMdocClaims } from './containsRequestedMdocClaims';
import { CLAIMS } from '../constants';
import type { Claims } from '../types';

describe('containsRequestedMdocClaims', () => {
  // Create test instance with default maxRecursionDepth
  const containsRequestedMdocClaims = createContainsRequestedMdocClaims();

  // Basic test cases
  it('should return true when issuable credential contains all requested claims', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      },
    };

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  it('should return false when issuable credential is missing requested claims', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          name: {},
        },
      },
    };

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(false);
  });

  // Edge cases
  it('should return true when no claims are requested', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    const requestedCredential: Claims = {};

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  it('should return true when requestedCredential is undefined', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    expect(
      containsRequestedMdocClaims(
        issuableCredential,
        undefined as unknown as Claims
      )
    ).toBe(true);
  });

  it('should return false when claims are requested but issuable credential has no claims', () => {
    const issuableCredential: Claims = {};

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(false);
  });

  // Nested structure test
  it('should handle deeply nested claim structures', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: {},
              name: {},
            },
          },
        },
      },
    };

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: {},
            },
          },
        },
      },
    };

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  // Different value types test
  it('should check structure regardless of value types', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
          verified: {},
        },
      },
    };

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
          verified: {},
        },
      },
    };

    expect(
      containsRequestedMdocClaims(issuableCredential, requestedCredential)
    ).toBe(true);
  });

  // Custom maxRecursionDepth test
  it('should respect custom maxRecursionDepth', () => {
    const containsRequestedMdocClaimsDepth3 =
      createContainsRequestedMdocClaims(3);
    const containsRequestedMdocClaimsDepth4 =
      createContainsRequestedMdocClaims(4);

    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: {},
            },
          },
        },
      },
    };

    const requestedCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              verified: {},
            },
          },
        },
      },
    };

    // Should return true because it only checks up to depth 3 (stops at 'details')
    expect(
      containsRequestedMdocClaimsDepth3(issuableCredential, requestedCredential)
    ).toBe(true);

    // Should return false because it checks up to depth 4 (includes 'verified')
    expect(
      containsRequestedMdocClaimsDepth4(issuableCredential, requestedCredential)
    ).toBe(false);
  });
});
