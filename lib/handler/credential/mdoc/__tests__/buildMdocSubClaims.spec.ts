import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBuildMdocSubClaims } from '../buildMdocSubClaims';
import type { Claims } from '../../types';
import { BadRequestError } from '../../../BadRequestError';

describe('buildMdocSubClaims', () => {
  // Mock addMdocDateClaims function
  const mockAddMdocDateClaims = vi.fn();

  // Create test instance
  const buildMdocSubClaims = createBuildMdocSubClaims({
    addMdocDateClaims: mockAddMdocDateClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('error handling', () => {
    it('should throw BadRequestError when requestedSubClaims is undefined', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      expect(() =>
        buildMdocSubClaims({
          userSubClaims,
          requestedSubClaims: undefined,
          doctype,
        })
      ).toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested sub-claims provided'
        )
      );

      expect(mockAddMdocDateClaims).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError when requestedSubClaims is empty', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
      };

      const requestedSubClaims: Claims = {};
      const doctype = 'org.iso.18013.5.1.mDL';

      expect(() =>
        buildMdocSubClaims({
          userSubClaims,
          requestedSubClaims,
          doctype,
        })
      ).toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested sub-claims provided'
        )
      );

      expect(mockAddMdocDateClaims).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError when requestedSubClaims is null', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      expect(() =>
        buildMdocSubClaims({
          userSubClaims,
          requestedSubClaims: null as unknown as Claims,
          doctype,
        })
      ).toThrow(
        new BadRequestError(
          'invalid_credential_request',
          'No requested sub-claims provided'
        )
      );

      expect(mockAddMdocDateClaims).not.toHaveBeenCalled();
    });
  });

  describe('basic claim processing', () => {
    it('should return only requested claims when requestedSubClaims is provided', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
        address: '123 Main St',
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        age: 25,
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
      expect(result.address).toBeUndefined();
    });

    it('should handle missing user claims', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
      expect(result.age).toBeUndefined();
    });

    it('should handle undefined claim values', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: undefined,
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
      expect(result.age).toBeUndefined();
    });

    it('should handle null claim values', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: null,
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        age: null,
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });

    it('should handle empty user claims', () => {
      const userSubClaims: Claims = {};
      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
      expect(result.name).toBeUndefined();
      expect(result.age).toBeUndefined();
    });
  });

  describe('complex claim structures', () => {
    it('should handle nested object claims', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
        preferences: {
          language: 'en',
          theme: 'dark',
        },
      };

      const requestedSubClaims: Claims = {
        name: {},
        address: {
          street: {},
          city: {},
        },
        preferences: {
          language: {},
        },
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
        },
        preferences: {
          language: 'en',
          theme: 'dark',
        },
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });

    it('should handle array claims', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        documents: [
          { type: 'passport', number: 'P123456' },
          { type: 'license', number: 'L789012' },
        ],
        scores: [85, 92, 78],
      };

      const requestedSubClaims: Claims = {
        name: {},
        documents: {},
        scores: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        documents: [
          { type: 'passport', number: 'P123456' },
          { type: 'license', number: 'L789012' },
        ],
        scores: [85, 92, 78],
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });

    it('should handle mixed data types', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
        isActive: true,
        score: 95.5,
        tags: ['verified', 'premium'],
        metadata: {
          created: '2024-01-01',
          version: 1,
        },
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
        isActive: {},
        score: {},
        tags: {},
        metadata: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        age: 25,
        isActive: true,
        score: 95.5,
        tags: ['verified', 'premium'],
        metadata: {
          created: '2024-01-01',
          version: 1,
        },
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });
  });

  describe('doctype handling', () => {
    it('should pass doctype to addMdocDateClaims', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
      };

      const requestedSubClaims: Claims = {
        name: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
    });

    it('should handle different doctype values', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
      };

      const requestedSubClaims: Claims = {
        name: {},
      };

      const doctypes = [
        'org.iso.18013.5.1.mDL',
        'org.iso.18013.5.1.Passport',
        'org.iso.18013.5.1.DrivingLicense',
        'custom.doctype',
      ];

      doctypes.forEach((doctype) => {
        buildMdocSubClaims({
          userSubClaims,
          requestedSubClaims,
          doctype,
        });

        expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
          subClaims: expect.any(Object),
          requestedSubClaims,
          doctype,
        });
      });
    });
  });

  describe('addMdocDateClaims integration', () => {
    it('should call addMdocDateClaims with correct parameters', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledTimes(1);
      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });

      const callArgs = mockAddMdocDateClaims.mock.calls[0][0];
      expect(callArgs.subClaims).toBeDefined();
      expect(callArgs.requestedSubClaims).toBe(requestedSubClaims);
      expect(callArgs.doctype).toBe(doctype);
    });

    it('should merge addMdocDateClaims result with user claims', () => {
      const userSubClaims: Claims = {
        name: 'John Doe',
        age: 25,
      };

      const requestedSubClaims: Claims = {
        name: {},
        age: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      // Mock addMdocDateClaims to add some date claims
      mockAddMdocDateClaims.mockImplementation(({ subClaims }) => {
        subClaims.issueDate = '2024-01-01';
        subClaims.expiryDate = '2025-01-01';
      });

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(result).toEqual({
        name: 'John Doe',
        age: 25,
        issueDate: '2024-01-01',
        expiryDate: '2025-01-01',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle very large claim objects', () => {
      const largeUserSubClaims: Claims = {};
      const largeRequestedSubClaims: Claims = {};

      // Create large objects with many claims
      for (let i = 0; i < 100; i++) {
        const claimName = `claim${i}`;
        largeUserSubClaims[claimName] = `value${i}`;
        largeRequestedSubClaims[claimName] = {};
      }

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims: largeUserSubClaims,
        requestedSubClaims: largeRequestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims: largeRequestedSubClaims,
        doctype,
      });
      expect(Object.keys(result)).toHaveLength(100);
    });

    it('should handle special characters in claim names', () => {
      const userSubClaims: Claims = {
        'claim-with-dash': 'value1',
        claim_with_underscore: 'value2',
        claimWithCamelCase: 'value3',
        claim123: 'value4',
        'claim with spaces': 'value5',
      };

      const requestedSubClaims: Claims = {
        'claim-with-dash': {},
        claim_with_underscore: {},
        claimWithCamelCase: {},
        claim123: {},
        'claim with spaces': {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        'claim-with-dash': 'value1',
        claim_with_underscore: 'value2',
        claimWithCamelCase: 'value3',
        claim123: 'value4',
        'claim with spaces': 'value5',
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });

    it('should handle function values in claims', () => {
      const testFunction = () => 'test';
      const userSubClaims: Claims = {
        name: 'John Doe',
        handler: testFunction,
      };

      const requestedSubClaims: Claims = {
        name: {},
        handler: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result).toEqual({
        name: 'John Doe',
        handler: testFunction,
        ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
      });
    });

    it('should handle circular references gracefully', () => {
      const circularObj: Record<string, unknown> = { name: 'John Doe' };
      circularObj.self = circularObj;

      const userSubClaims: Claims = {
        name: 'John Doe',
        circular: circularObj,
      };

      const requestedSubClaims: Claims = {
        name: {},
        circular: {},
      };

      const doctype = 'org.iso.18013.5.1.mDL';

      const result = buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      });

      expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
        subClaims: expect.any(Object),
        requestedSubClaims,
        doctype,
      });
      expect(result.name).toBe('John Doe');
      expect(result.circular).toBe(circularObj);
    });
  });
});
