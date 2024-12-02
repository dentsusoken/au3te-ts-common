import { describe, it, expect } from 'vitest';
import { defaultMdocBuildRequestedCredential } from './mdocBuildRequestedCredential';
import { CLAIMS } from '../constants';
import type { Claims } from '../types';

describe('defaultMdocBuildRequestedCredential', () => {
  it('should return requested credential when it has claims', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
          name: {},
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

    const result = defaultMdocBuildRequestedCredential({
      issuableCredential,
      requestedCredential,
    });

    expect(result).toBe(requestedCredential);
  });

  it('should build claims from issuable credential when requested credential has no claims', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
          name: {},
        },
      },
    };

    const requestedCredential: Claims = {};

    const result = defaultMdocBuildRequestedCredential({
      issuableCredential,
      requestedCredential,
    });

    expect(result).toEqual({
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
          name: {},
        },
      },
    });
    expect(result).not.toBe(requestedCredential);
  });

  it('should handle nested claims structure', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: {},
              name: {
                given: {},
                family: {},
              },
            },
          },
        },
      },
    };

    const requestedCredential: Claims = {};

    const result = defaultMdocBuildRequestedCredential({
      issuableCredential,
      requestedCredential,
    });

    expect(result).toEqual({
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          personal: {
            details: {
              age: {},
              name: {
                given: {},
                family: {},
              },
            },
          },
        },
      },
    });
  });

  it('should handle empty issuable claims', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {},
    };

    const requestedCredential: Claims = {};

    const result = defaultMdocBuildRequestedCredential({
      issuableCredential,
      requestedCredential,
    });

    expect(result).toEqual({
      [CLAIMS]: {},
    });
  });

  it('should preserve other properties in requested credential', () => {
    const issuableCredential: Claims = {
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 25,
        },
      },
    };

    const requestedCredential: Claims = {
      format: 'mso_mdoc',
      doctype: 'org.iso.18013.5.1.mDL',
    };

    const result = defaultMdocBuildRequestedCredential({
      issuableCredential,
      requestedCredential,
    });

    expect(result).toEqual({
      format: 'mso_mdoc',
      doctype: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    });
  });
});
