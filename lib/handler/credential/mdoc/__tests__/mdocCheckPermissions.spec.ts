import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCheckPermissions } from '../mdocCheckPermissions';
import { CLAIMS, DOCTYPE, FORMAT, MSO_MDOC } from '../../constants';
import { Claims } from '../../types';

describe('mdocCheckPermissions', () => {
  const mockContainsRequestedMdocClaims = vi.fn();
  const mdocCheckPermissions = createMdocCheckPermissions({
    containsRequestedMdocClaims: mockContainsRequestedMdocClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
    mockContainsRequestedMdocClaims.mockReturnValue(true);
  });

  describe('input validation', () => {
    it('should throw BadRequestError when issuableCredentials is null', async () => {
      await expect(
        mdocCheckPermissions({
          issuableCredentials: null as unknown as Claims[],
          requestedCredential: {},
        })
      ).rejects.toThrow('No credential can be issued with the access token.');
    });

    it('should throw BadRequestError when issuableCredentials is undefined', async () => {
      await expect(
        mdocCheckPermissions({
          issuableCredentials: undefined as unknown as Claims[],
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
          issuableCredentials: {} as unknown as Claims[],
          requestedCredential: {},
        })
      ).rejects.toThrow('No credential can be issued with the access token.');
    });
  });

  describe('successful validation', () => {
    it('should pass when credential matches format, doctype and claims', async () => {
      const issuableCredential = {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      } as Claims;

      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      } as Claims;

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

    it('should pass with multiple issuable credentials and pick the correct one', async () => {
      const wrongCredential = {
        [FORMAT]: 'wrong_format',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const correctCredential = {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const result = await mdocCheckPermissions({
        issuableCredentials: [wrongCredential, correctCredential],
        requestedCredential,
      });
      expect(result).toBe(correctCredential);
    });
  });

  describe('validation failures', () => {
    it('should throw BadRequestError when no matching credential found', async () => {
      const issuableCredential = {
        [FORMAT]: 'wrong_format',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      } as Claims;

      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      } as Claims;

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
      } as Claims;

      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            name: {},
          },
        },
      } as Claims;

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

    it('should throw BadRequestError if no credential matches doctype', async () => {
      const issuableCredential = {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const requestedCredential = {
        [DOCTYPE]: 'org.example.other',
        [CLAIMS]: {
          'org.example.other': { age: {} },
        },
      } as Claims;
      await expect(
        mdocCheckPermissions({
          issuableCredentials: [issuableCredential],
          requestedCredential,
        })
      ).rejects.toThrow(
        'The access token does not have permissions to request the credential.'
      );
    });

    it('should throw BadRequestError if no credential matches format', async () => {
      const issuableCredential = {
        [FORMAT]: 'other_format',
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      await expect(
        mdocCheckPermissions({
          issuableCredentials: [issuableCredential],
          requestedCredential,
        })
      ).rejects.toThrow(
        'The access token does not have permissions to request the credential.'
      );
    });
  });

  describe('edge cases', () => {
    it('should throw BadRequestError if requestedCredential is missing doctype', async () => {
      const issuableCredential = {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const requestedCredential = {
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      await expect(
        mdocCheckPermissions({
          issuableCredentials: [issuableCredential],
          requestedCredential,
        })
      ).rejects.toThrow(
        'The access token does not have permissions to request the credential.'
      );
    });

    it('should pass when requestedCredential is missing claims', async () => {
      const issuableCredential = {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      } as Claims;
      const requestedCredential = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      } as Claims;
      const result = await mdocCheckPermissions({
        issuableCredentials: [issuableCredential],
        requestedCredential,
      });
      expect(result).toBe(issuableCredential);
    });
  });
});
