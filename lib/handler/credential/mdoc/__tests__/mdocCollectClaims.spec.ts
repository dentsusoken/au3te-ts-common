import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMdocCollectClaims } from '../mdocCollectClaims';
import { CLAIMS, DOCTYPE } from '../../constants';
import { BadRequestError } from '../../../BadRequestError';
import type { Claims } from '../../types';

describe('createMdocCollectClaims', () => {
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
    deleteUserAttributesCache: vi.fn(),
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('successful claim collection', () => {
    it('should collect claims successfully with single namespace', async () => {
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

    it('should collect claims with multiple namespaces', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
        'org.iso.18013.5.1.vehicle': {
          licenseNumber: 'ABC123',
          vehicleClass: 'B',
        },
      };

      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
          'org.iso.18013.5.1.vehicle': {
            licenseNumber: {},
          },
        },
      };

      const builtClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
        },
        'org.iso.18013.5.1.vehicle': {
          licenseNumber: 'ABC123',
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      expect(result).toEqual({
        doctype: 'org.iso.18013.5.1.mDL',
        claims: builtClaims,
      });
    });

    it('should handle empty requested claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      };

      const requestedCredential: Claims = {
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

    it('should handle complex nested claim structures', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '1990-01-01',
          },
          address: {
            street: '123 Main St',
            city: 'Anytown',
            country: 'US',
          },
        },
      };

      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personalInfo: {
              firstName: {},
              lastName: {},
            },
          },
        },
      };

      const builtClaims: Claims = {
        'org.iso.18013.5.1': {
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      const result = await collectClaims({
        user: mockUser,
        requestedCredential,
      });

      expect(result).toEqual({
        doctype: 'org.iso.18013.5.1.mDL',
        claims: builtClaims,
      });
    });
  });

  describe('error handling', () => {
    it('should throw error when requestedCredential is undefined', async () => {
      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential: undefined as unknown as Claims,
        })
      ).rejects.toThrow(BadRequestError);

      expect(mockGetMdocClaimsBySubjectAndDoctype).not.toHaveBeenCalled();
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should throw error when requestedCredential is null', async () => {
      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential: null as unknown as Claims,
        })
      ).rejects.toThrow(BadRequestError);

      expect(mockGetMdocClaimsBySubjectAndDoctype).not.toHaveBeenCalled();
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should throw error when doctype is missing', async () => {
      const requestedCredential: Claims = {
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

    it('should throw error when doctype is empty string', async () => {
      const requestedCredential: Record<string, unknown> = {
        [DOCTYPE]: '',
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
      const requestedCredential: Claims = {
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

    it('should handle empty user claims object', async () => {
      const requestedCredential: Claims = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      const emptyUserClaims = {};
      const builtClaims = {};

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(emptyUserClaims);
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
        userClaims: emptyUserClaims,
        requestedClaims: requestedCredential[CLAIMS] as Claims,
        doctype: 'org.iso.18013.5.1.mDL',
      });

      expect(result).toEqual({
        doctype: 'org.iso.18013.5.1.mDL',
        claims: builtClaims,
      });
    });

    it('should propagate errors from getMdocClaimsBySubjectAndDoctype', async () => {
      const requestedCredential: Claims = {
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      const error = new Error('Database connection failed');
      mockGetMdocClaimsBySubjectAndDoctype.mockRejectedValue(error);

      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential,
        })
      ).rejects.toThrow('Database connection failed');

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user123',
        'org.iso.18013.5.1.mDL'
      );
      expect(mockBuildMdocClaims).not.toHaveBeenCalled();
    });

    it('should propagate errors from buildMdocClaims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
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

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);

      const error = new Error('Invalid claim format');
      mockBuildMdocClaims.mockRejectedValue(error);

      await expect(
        collectClaims({
          user: mockUser,
          requestedCredential,
        })
      ).rejects.toThrow('Invalid claim format');

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user123',
        'org.iso.18013.5.1.mDL'
      );
      expect(mockBuildMdocClaims).toHaveBeenCalledWith({
        userClaims,
        requestedClaims: requestedCredential[CLAIMS] as Claims,
        doctype: 'org.iso.18013.5.1.mDL',
      });
    });
  });

  describe('input validation', () => {
    it('should handle different user subject formats', async () => {
      const userWithNumericSubject = { subject: '12345' };
      const userWithEmailSubject = { subject: 'user@example.com' };
      const userWithUuidSubject = {
        subject: '550e8400-e29b-41d4-a716-446655440000',
      };

      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
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

      // Test with numeric subject
      await collectClaims({
        user: userWithNumericSubject,
        requestedCredential,
      });

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        '12345',
        'org.iso.18013.5.1.mDL'
      );

      vi.resetAllMocks();

      // Test with email subject
      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      await collectClaims({
        user: userWithEmailSubject,
        requestedCredential,
      });

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        'user@example.com',
        'org.iso.18013.5.1.mDL'
      );

      vi.resetAllMocks();

      // Test with UUID subject
      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      await collectClaims({
        user: userWithUuidSubject,
        requestedCredential,
      });

      expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        'org.iso.18013.5.1.mDL'
      );
    });

    it('should handle different doctype formats', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
        },
      };

      const builtClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
        },
      };

      mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
      mockBuildMdocClaims.mockResolvedValue(builtClaims);

      const doctypes = [
        'org.iso.18013.5.1.mDL',
        'org.iso.18013.5.1.driver_license',
        'com.example.custom.credential',
        'urn:uuid:550e8400-e29b-41d4-a716-446655440000',
      ];

      for (const doctype of doctypes) {
        mockGetMdocClaimsBySubjectAndDoctype.mockResolvedValue(userClaims);
        mockBuildMdocClaims.mockResolvedValue(builtClaims);

        const requestedCredential: Record<string, unknown> = {
          [DOCTYPE]: doctype,
          [CLAIMS]: {
            'org.iso.18013.5.1': {
              age: {},
            },
          },
        };

        await collectClaims({
          user: mockUser,
          requestedCredential,
        });

        expect(mockGetMdocClaimsBySubjectAndDoctype).toHaveBeenCalledWith(
          'user123',
          doctype
        );

        vi.resetAllMocks();
      }
    });
  });
});
