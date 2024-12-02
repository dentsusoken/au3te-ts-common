import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCheckPermissions } from './mdocCheckPermissions';
import { CLAIMS, DOCTYPE, FORMAT, MSO_MDOC } from '../constants';

describe('mdocCheckPermissions', () => {
  const mockContainsRequestedMdocClaims = vi.fn();
  const mdocCheckPermissions = createMdocCheckPermissions({
    containsRequestedMdocClaims: mockContainsRequestedMdocClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
    mockContainsRequestedMdocClaims.mockReturnValue(true);
  });

  it('should throw BadRequestError when issuableCredentials is null', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: null as unknown as Record<string, unknown>[],
        requestedCredential: {},
      })
    ).rejects.toThrow('No credential can be issued with the access token.');
  });

  it('should throw BadRequestError when issuableCredentials is undefined', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: undefined as unknown as Record<string, unknown>[],
        requestedCredential: {},
      })
    ).rejects.toThrow('No credential can be issued with the access token.');
  });

  it('should throw BadRequestError when issuableCredentials is empty array', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: [],
        requestedCredential: {},
      })
    ).rejects.toThrow('No credential can be issued with the access token.');
  });

  it('should throw BadRequestError when issuableCredentials is not an array', async () => {
    await expect(
      mdocCheckPermissions({
        issuableCredentials: {} as unknown as Record<string, unknown>[],
        requestedCredential: {},
      })
    ).rejects.toThrow('No credential can be issued with the access token.');
  });

  // Test cases for successful validation
  it('should pass when credential matches format, doctype and claims', async () => {
    const issuableCredential = {
      [FORMAT]: MSO_MDOC,
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    } as Record<string, unknown>;

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    };

    const result = await mdocCheckPermissions({
      issuableCredentials: [issuableCredential],
      requestedCredential,
    });

    expect(result).toBe(issuableCredential);
    expect(mockContainsRequestedMdocClaims).toHaveBeenCalledWith(
      issuableCredential,
      requestedCredential
    );
  });

  // Test cases for validation failures
  it('should throw BadRequestError when no matching credential found', async () => {
    const issuableCredential = {
      [FORMAT]: 'wrong_format',
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    } as Record<string, unknown>;

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
        issuableCredentials: [issuableCredential],
        requestedCredential,
      })
    ).rejects.toThrow(
      'The access token does not have permissions to request the credential.'
    );
  });

  it('should throw BadRequestError when claims do not match', async () => {
    mockContainsRequestedMdocClaims.mockReturnValue(false);

    const issuableCredential = {
      [FORMAT]: MSO_MDOC,
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: {},
        },
      },
    } as Record<string, unknown>;

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
        issuableCredentials: [issuableCredential],
        requestedCredential,
      })
    ).rejects.toThrow(
      'The access token does not have permissions to request the credential.'
    );

    expect(mockContainsRequestedMdocClaims).toHaveBeenCalledWith(
      issuableCredential,
      requestedCredential
    );
  });
});
