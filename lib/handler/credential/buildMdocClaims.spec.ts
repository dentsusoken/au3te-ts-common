import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildMdocClaims, buildMdocSubClaims } from './buildMdocClaims';
import { EXPIRY_DATE, ISSUE_DATE } from './constants';
import type { Claims } from './types';

describe('Mdoc Claims Builder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('buildMdocClaims', () => {
    it('should return user claims when no requested claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      };
      const requestedClaims: Claims = {};

      const result = await buildMdocClaims(userClaims, requestedClaims);
      expect(result).toEqual(userClaims);
    });

    it('should build claims based on requested claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
          address: 'Tokyo',
        },
      };
      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          age: true,
          name: true,
        },
      };

      const result = await buildMdocClaims(userClaims, requestedClaims);
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
      });
    });

    it('should handle multiple namespaces', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
          name: 'John Doe',
        },
        'org.example.custom': {
          score: 100,
          rank: 'A',
        },
      };
      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          age: true,
        },
        'org.example.custom': {
          score: true,
        },
      };

      const result = await buildMdocClaims(userClaims, requestedClaims);
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          age: 25,
        },
        'org.example.custom': {
          score: 100,
        },
      });
    });

    it('should skip namespaces not present in user claims', async () => {
      const userClaims: Claims = {
        'org.iso.18013.5.1': {
          age: 25,
        },
      };
      const requestedClaims: Claims = {
        'org.iso.18013.5.1': {
          age: true,
        },
        'org.example.missing': {
          data: true,
        },
      };

      const result = await buildMdocClaims(userClaims, requestedClaims);
      expect(result).toEqual({
        'org.iso.18013.5.1': {
          age: 25,
        },
      });
    });
  });

  describe('buildMdocSubClaims', () => {
    it('should build sub claims with date claims', () => {
      const userSubClaims: Claims = {
        age: 25,
        name: 'John Doe',
      };
      const requestedSubClaims: Claims = {
        age: true,
        [ISSUE_DATE]: true,
        [EXPIRY_DATE]: true,
      };

      const result = buildMdocSubClaims(userSubClaims, requestedSubClaims);
      expect(result).toEqual({
        age: 25,
        [ISSUE_DATE]: 'cbor:1004("2024-01-01")',
        [EXPIRY_DATE]: 'cbor:1004("2025-01-01")',
      });
    });

    it('should only include requested claims', () => {
      const userSubClaims: Claims = {
        age: 25,
        name: 'John Doe',
        address: 'Tokyo',
      };
      const requestedSubClaims: Claims = {
        age: true,
        name: true,
      };

      const result = buildMdocSubClaims(userSubClaims, requestedSubClaims);
      expect(result).toEqual({
        age: 25,
        name: 'John Doe',
      });
    });

    it('should handle missing user claims', () => {
      const userSubClaims: Claims = {
        age: 25,
      };
      const requestedSubClaims: Claims = {
        age: true,
        name: true,
      };

      const result = buildMdocSubClaims(userSubClaims, requestedSubClaims);
      expect(result).toEqual({
        age: 25,
      });
    });

    it('should handle falsy values in user claims', () => {
      const userSubClaims: Claims = {
        age: 0,
        verified: false,
        score: null,
      };
      const requestedSubClaims: Claims = {
        age: true,
        verified: true,
        score: true,
      };

      const result = buildMdocSubClaims(userSubClaims, requestedSubClaims);
      expect(result).toEqual({
        age: 0,
        verified: false,
        score: null,
      });
    });
  });
});
