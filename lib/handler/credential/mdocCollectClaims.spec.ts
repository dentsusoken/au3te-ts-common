import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCollectClaims } from './mdocCollectClaims';
import { CLAIMS, DOCTYPE } from './constants';
import { BadRequestError } from '../BadRequestError';
import type { Claims } from './types';

describe('Mdoc Claims Collector', () => {
  const mockUser = {
    subject: 'user123',
  };

  const mockGetMdocClaimsBySubjectAndDoctype = {
    getMdocClaimsBySubjectAndDoctype: vi.fn(),
  };

  const collectClaims = createMdocCollectClaims(
    mockGetMdocClaimsBySubjectAndDoctype
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createMdocCollectClaims', () => {
    it('should throw error when requestedCredential is undefined', async () => {
      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential: undefined,
        })
      ).rejects.toThrow(BadRequestError);

      expect(
        mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype
      ).not.toHaveBeenCalled();
    });

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

      mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype.mockResolvedValue(
        userClaims
      );

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      const claims = await result.claims;

      expect(result.doctype).toBe('org.iso.18013.5.1.mDL');
      expect(claims).toEqual({
        'org.iso.18013.5.1': {
          age: 25,
        },
      });

      expect(
        mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype
      ).toHaveBeenCalledWith('user123', 'org.iso.18013.5.1.mDL');
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

      expect(
        mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype
      ).not.toHaveBeenCalled();
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

      mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype.mockResolvedValue(
        null
      );

      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential,
        })
      ).rejects.toThrow(BadRequestError);

      expect(
        mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype
      ).toHaveBeenCalledWith('user123', 'org.iso.18013.5.1.mDL');
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

      mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype.mockResolvedValue(
        userClaims
      );

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      const claims = await result.claims;

      expect(result.doctype).toBe('org.iso.18013.5.1.mDL');
      expect(claims).toEqual(userClaims);
    });

    it('should handle multiple namespaces in claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
        'org.example.custom': {
          score: 100,
          grade: 'A',
        },
      };

      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
          'org.example.custom': {
            score: {},
          },
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.getMdocClaimsBySubjectAndDoctype.mockResolvedValue(
        userClaims
      );

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      const claims = await result.claims;

      expect(result.doctype).toBe('org.iso.18013.5.1.mDL');
      expect(claims).toEqual({
        'org.iso.18013.5.1': {
          age: 25,
        },
        'org.example.custom': {
          score: 100,
        },
      });
    });
  });
});
