import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCollectClaims } from './mdocCollectClaims';
import { CLAIMS, DOCTYPE } from '../constants';
import { BadRequestError } from '../../BadRequestError';
import type { Claims } from '../types';

describe('Mdoc Claims Collector', () => {
  const mockUser = {
    subject: 'user123',
  };

  // Mock functions
  const mockGetMdocClaimsBySubjectAndDoctype = vi.fn();
  const mockBuildMdocClaims = vi.fn();

  // Create test instance
  const collectClaims = createMdocCollectClaims({
    getMdocClaimsBySubjectAndDoctype: mockGetMdocClaimsBySubjectAndDoctype,
    buildMdocClaims: mockBuildMdocClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createMdocCollectClaims', () => {
    it('should collect claims successfully', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      };

      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      const builtClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user123',
        'org.iso.18013.5.1.mDL'
      );

      expect(mockBuildMdocClaims).toHaveBeenCalledWith({
        userClaims,
        requestedClaims: requestedCredential[CLAIMS] as Claims,
        doctype: 'org.iso.18013.5.1.mDL',
      });

      expect(result).toEqual({
        doctype: 'org.iso.18013.5.1.mDL',
        claims: builtClaims,
      });
    });

    it('should throw error when doctype is missing', async () => {
      const requestedCredential: Record<string, unknown> = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential,
        })
      ).rejects.toThrow(BadRequestError);

      expect(mockGetMdocClaimsBySubjectAndDoctype).not.toHaveBeenCalled();
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should throw error when no claims are found', async () => {
      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(null);

      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential,
        })
      ).rejects.toThrow(BadRequestError);

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user123',
        'org.iso.18013.5.1.mDL'
      );
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should throw error when requestedCredential is undefined', async () => {
      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential: undefined as unknown as Record<string, unknown>,
        })
      ).rejects.toThrow(BadRequestError);

      expect(mockGetMdocClaimsBySubjectAndDoctype).not.toHaveBeenCalled();
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should handle empty requested claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      };

      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {},
      };

      const builtClaims: Claims = userClaims;

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user123',
        'org.iso.18013.5.1.mDL'
      );

      expect(mockBuildMdocClaims).toHaveBeenCalledWith({
        userClaims,
        requestedClaims: requestedCredential[CLAIMS] as Claims,
        doctype: 'org.iso.18013.5.1.mDL',
      });

      expect(result).toEqual({
        doctype: 'org.iso.18013.5.1.mDL',
        claims: builtClaims,
      });
    });
  });
});
