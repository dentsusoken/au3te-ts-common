import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBuildMdocClaims } from '../buildMdocClaims';
import type { Claims } from '../../types';
import { BadRequestError } from '../../../BadRequestError';

describe('buildMdocClaims', () => {
  // Mock buildMdocSubClaims function
  const mockBuildMdocSubClaims = vi.fn();

  // Create test instance
  const buildMdocClaims = createBuildMdocClaims({
    buildMdocSubClaims: mockBuildMdocSubClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('error handling', () => {
    it('should throw BadRequestError when requestedClaims is undefined', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      await expect(
        buildMdocClaims({
          userClaims,
          requestedClaims: undefined,
          doctype,
        })
      ).rejects.toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested claims provided'
        )
      );

      expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError when requestedClaims is empty', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
        },
      };

      const requestedClaims: Claims = {};
      const doctype = 'org.iso.18013.5.1.mDL';

      await expect(
        buildMdocClaims({
          userClaims,
          requestedClaims,
          doctype,
        })
      ).rejects.toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested claims provided'
        )
      );

      expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError when requestedClaims is null', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      await expect(
        buildMdocClaims({
          userClaims,
          requestedClaims: null as unknown as Claims,
          doctype,
        })
      ).rejects.toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested claims provided'
        )
      );

      expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    });
  });

  describe('single namespace processing', () => {
    it('should return only requested claims when requestedClaims is provided', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
          address: '123 Main St',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
          age: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockReturnValue({
        name: 'John Doe',
        age: 25,
      });

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.iso.18013.5.1'],
        requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
        doctype,
      });
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
        },
      });
    });

    it('should handle empty user claims', async () => {
      const userClaims: Claims = {};
      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('should handle missing namespace in user claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.example.custom': {
          score: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('should handle empty requested sub-claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockReturnValue({});

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.iso.18013.5.1'],
        requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
        doctype,
      });
      expect(result).toEqual({
        'org.iso.18013.5.1': {},
      });
    });
  });

  describe('multiple namespaces processing', () => {
    it('should handle multiple namespaces', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          age: 25,
        },
        'org.example.custom': {
          score: 100,
          grade: 'A',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
        'org.example.custom': {
          score: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims
        .mockReturnValueOnce({
          name: 'John Doe',
        })
        .mockReturnValueOnce({
          score: 100,
        });

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledTimes(2);
      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.iso.18013.5.1'],
        requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
        doctype,
      });
      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.example.custom'],
        requestedSubClaims: requestedClaims['org.example.custom'],
        doctype,
      });
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
        'org.example.custom': {
          score: 100,
        },
      });
    });

    it('should handle partial namespace matches', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
        'org.example.custom': {
          score: 100,
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
        'org.example.custom': {
          score: {},
        },
        'org.missing.namespace': {
          missing: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims
        .mockReturnValueOnce({
          name: 'John Doe',
        })
        .mockReturnValueOnce({
          score: 100,
        });

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
        'org.example.custom': {
          score: 100,
        },
      });
    });

    it('should handle complex nested claims structure', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
          address: {
            street: '123 Main St',
            city: 'New York',
            country: 'USA',
          },
          documents: [
            { type: 'passport', number: 'P123456' },
            { type: 'license', number: 'L789012' },
          ],
        },
        'org.example.custom': {
          preferences: {
            language: 'en',
            theme: 'dark',
          },
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
          address: {
            street: {},
            city: {},
          },
        },
        'org.example.custom': {
          preferences: {
            language: {},
          },
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims
        .mockReturnValueOnce({
          name: 'John Doe',
          address: {
            street: '123 Main St',
            city: 'New York',
          },
        })
        .mockReturnValueOnce({
          preferences: {
            language: 'en',
          },
        });

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          name: 'John Doe',
          address: {
            street: '123 Main St',
            city: 'New York',
          },
        },
        'org.example.custom': {
          preferences: {
            language: 'en',
          },
        },
      });
    });
  });

  describe('doctype handling', () => {
    it('should pass doctype to buildMdocSubClaims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockReturnValue({
        name: 'John Doe',
      });

      await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.iso.18013.5.1'],
        requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
        doctype,
      });
    });

    it('should handle different doctype values', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctypes = [
        'org.iso.18013.5.1.mDL',
        'org.iso.18013.5.1.Passport',
        'org.iso.18013.5.1.DrivingLicense',
        'custom.doctype',
      ];

      for (const doctype of doctypes) {
        mockBuildMdocSubClaims.mockReturnValue({
          name: 'John Doe',
        });

        await buildMdocClaims({
          userClaims,
          requestedClaims,
          doctype,
        });

        expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
          userSubClaims: userClaims['org.iso.18013.5.1'],
          requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
          doctype,
        });
      }
    });
  });

  describe('edge cases', () => {
    it('should handle buildMdocSubClaims throwing an error', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const error = new Error('Sub claims build failed');
      mockBuildMdocSubClaims.mockImplementation(() => {
        throw error;
      });

      await expect(
        buildMdocClaims({
          userClaims,
          requestedClaims,
          doctype,
        })
      ).rejects.toThrow('Sub claims build failed');

      expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
        userSubClaims: userClaims['org.iso.18013.5.1'],
        requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
        doctype,
      });
    });

    it('should handle buildMdocSubClaims returning null', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockReturnValue(null);

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(result).toEqual({
        'org.iso.18013.5.1': null,
      });
    });

    it('should handle buildMdocSubClaims returning undefined', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          name: 'John Doe',
        },
      };

      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          name: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockReturnValue(undefined);

      const result = await buildMdocClaims({
        userClaims,
        requestedClaims,
        doctype,
      });

      expect(result).toEqual({
        'org.iso.18013.5.1': undefined,
      });
    });

    it('should handle very large claims objects', async () => {
      const largeUserClaims: Claims = {};
      const largeRequestedClaims: Claims = {};

      // Create large objects with many namespaces
      for (let i = 0; i < 100; i++) {
        const namespace = `org.example.namespace${i}`;
        largeUserClaims[namespace] = {
          [`claim${i}`]: `value${i}`,
        };
        largeRequestedClaims[namespace] = {
          [`claim${i}`]: {},
        };
      }

      const doctype = 'org.iso.18013.5.1.mDL';

      mockBuildMdocSubClaims.mockImplementation(
        ({ userSubClaims }) => userSubClaims
      );

      const result = await buildMdocClaims({
        userClaims: largeUserClaims,
        requestedClaims: largeRequestedClaims,
        doctype,
      });

      expect(mockBuildMdocSubClaims).toHaveBeenCalledTimes(100);
      expect(Object.keys(result)).toHaveLength(100);
    });
  });
});
