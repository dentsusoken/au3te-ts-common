import { describe, it, expect } from 'vitest';
import { mdocCheckPermissions } from './mdocCheckPermissions';
import { CLAIMS, DOCTYPE, FORMAT, MSO_MDOC } from './constants';
import type { MdocCredential } from './types';
import { BadRequestError } from '../BadRequestError';

describe('mdocCheckPermissions', () => {
  // Valid cases
  it('should not throw error when credential request is valid', async () => {
    const issuableCredentials: Record<string, unknown>[] = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
          },
        },
      },
    ];

    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 20,
        },
      },
    };

    await expect(
      mdocCheckPermissions({ issuableCredentials, requestedCredential })
    ).resolves.not.toThrow();
  });

  it('should not throw error when one of multiple credentials matches', async () => {
    const issuableCredentials: Record<string, unknown>[] = [
      {
        [FORMAT]: 'vc+sd-jwt',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
          },
        },
      },
    ];

    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 20,
        },
      },
    };

    await expect(
      mdocCheckPermissions({ issuableCredentials, requestedCredential })
    ).resolves.not.toThrow();
  });

  // Error cases
  it('should throw error when issuableCredentials is empty array', async () => {
    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    await expect(
      mdocCheckPermissions({
        issuableCredentials: [],
        requestedCredential,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when no matching credential format exists', async () => {
    const issuableCredentials: Record<string, unknown>[] = [
      {
        [FORMAT]: 'vc+sd-jwt',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      },
    ];

    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 20,
        },
      },
    };

    await expect(
      mdocCheckPermissions({ issuableCredentials, requestedCredential })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when doctype does not match', async () => {
    const issuableCredentials: Record<string, unknown>[] = [
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

    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.dL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          age: 20,
        },
      },
    };

    await expect(
      mdocCheckPermissions({ issuableCredentials, requestedCredential })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw error when requested claims are not available', async () => {
    const issuableCredentials: Record<string, unknown>[] = [
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

    const requestedCredential: MdocCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      },
    };

    await expect(
      mdocCheckPermissions({ issuableCredentials, requestedCredential })
    ).rejects.toThrow(BadRequestError);
  });
});
