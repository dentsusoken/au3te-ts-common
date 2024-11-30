import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCheckPermissions } from './mdocCheckPermissions';
import { CLAIMS, DOCTYPE, FORMAT, MSO_MDOC } from './constants';
import { BadRequestError } from '../BadRequestError';

describe('mdocCheckPermissions', () => {
  // Mock containsRequestedMdocClaims
  const mockContainsRequestedMdocClaims = vi.fn();
  const mdocCheckPermissions = createMdocCheckPermissions({
    containsRequestedMdocClaims: mockContainsRequestedMdocClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
    mockContainsRequestedMdocClaims.mockReturnValue(true);
  });

  it('should throw error when issuableCredentials is null', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: undefined,
        requestedCredential: {},
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when issuableCredentials is undefined', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: undefined,
        requestedCredential: {},
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when issuableCredentials is empty array', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: [],
        requestedCredential: {},
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should pass when credential matches format, doctype and claims', async () => {
    const issuableCredentials = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    await expect(
      mdocCheckPermissions({
        issuableCredentials,
        requestedCredential,
      })
    ).resolves.not.toThrow();

    expect(mockContainsRequestedMdocClaims).toHaveBeenCalledWith(
      issuableCredentials[0],
      requestedCredential
    );
  });

  it('should throw error when format does not match', async () => {
    const issuableCredentials = [
      {
        [FORMAT]: 'wrong_format',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    await expect(
      mdocCheckPermissions({
        issuableCredentials,
        requestedCredential,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when doctype does not match', async () => {
    const issuableCredentials = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'wrong.doctype',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    await expect(
      mdocCheckPermissions({
        issuableCredentials,
        requestedCredential,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when claims do not match', async () => {
    mockContainsRequestedMdocClaims.mockReturnValue(false);

    const issuableCredentials = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          name: {},
        },
      },
    };

    await expect(
      mdocCheckPermissions({
        issuableCredentials,
        requestedCredential,
      })
    ).rejects.toThrow(BadRequestError);

    expect(mockContainsRequestedMdocClaims).toHaveBeenCalledWith(
      issuableCredentials[0],
      requestedCredential
    );
  });
});
