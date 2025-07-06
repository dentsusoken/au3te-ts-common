import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defaultAddMdocDateClaims } from '../addMdocDateClaims';
import { EXPIRY_DATE, ISSUE_DATE } from '../../constants';
import type { Claims } from '../../types';

describe('defaultAddMdocDateClaims', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('when requestedSubClaims is undefined', () => {
    it('should not add any date claims', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims: undefined,
      });

      expect(ISSUE_DATE in subClaims).toBe(false);
      expect(EXPIRY_DATE in subClaims).toBe(false);
    });
  });

  describe('when both dates are requested', () => {
    it('should add both issue date and expiry date', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });

    it('should add both dates with different base dates', () => {
      const now = new Date('2023-06-15T12:30:45Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2023-06-15")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2024-06-15")');
    });

    it('should handle leap year dates correctly', () => {
      const now = new Date('2024-02-29T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-02-29")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-03-01")');
    });
  });

  describe('when only issue date is requested', () => {
    it('should add only issue date', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(EXPIRY_DATE in subClaims).toBe(false);
    });

    it('should not modify existing claims', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {
        existingClaim: 'existing value',
      };
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims.existingClaim).toBe('existing value');
      expect(EXPIRY_DATE in subClaims).toBe(false);
    });
  });

  describe('when only expiry date is requested', () => {
    it('should add only expiry date', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(ISSUE_DATE in subClaims).toBe(false);
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });

    it('should not modify existing claims', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {
        existingClaim: 'existing value',
      };
      const requestedSubClaims: Claims = {
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims.existingClaim).toBe('existing value');
      expect(ISSUE_DATE in subClaims).toBe(false);
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });
  });

  describe('when requestedSubClaims is empty', () => {
    it('should not add any date claims', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {};

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(ISSUE_DATE in subClaims).toBe(false);
      expect(EXPIRY_DATE in subClaims).toBe(false);
    });

    it('should not modify existing claims', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {
        existingClaim: 'existing value',
      };
      const requestedSubClaims: Claims = {};

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims.existingClaim).toBe('existing value');
      expect(ISSUE_DATE in subClaims).toBe(false);
      expect(EXPIRY_DATE in subClaims).toBe(false);
    });
  });

  describe('with doctype parameter', () => {
    it('should add dates correctly when doctype is provided', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };
      const doctype = 'org.iso.18013.5.1.mDL';

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
        doctype,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });

    it('should handle different doctype values', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
      };

      const doctypes = [
        'org.iso.18013.5.1.mDL',
        'org.iso.18013.5.1.Passport',
        'org.iso.18013.5.1.DrivingLicense',
        'custom.doctype',
      ];

      doctypes.forEach((doctype) => {
        const testSubClaims: Claims = {};
        defaultAddMdocDateClaims({
          subClaims: testSubClaims,
          requestedSubClaims,
          doctype,
        });

        expect(testSubClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle year-end dates correctly', () => {
      const now = new Date('2024-12-31T23:59:59Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-12-31")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-12-31")');
    });

    it('should handle month-end dates correctly', () => {
      const now = new Date('2024-01-31T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-31")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-31")');
    });

    it('should handle non-leap year February 29th', () => {
      const now = new Date('2023-02-29T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2023-03-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2024-03-01")');
    });

    it('should handle timezone edge cases', () => {
      const now = new Date('2024-01-01T23:59:59.999Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {};
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });
  });

  describe('when subClaims already contains date claims', () => {
    it('should overwrite existing date claims when requested', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {
        [ISSUE_DATE]: 'existing issue date',
        [EXPIRY_DATE]: 'existing expiry date',
      };
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });

    it('should add missing requested date claims and overwrite existing ones', () => {
      const now = new Date('2024-01-01T00:00:00Z');
      vi.setSystemTime(now);

      const subClaims: Claims = {
        [ISSUE_DATE]: 'existing issue date',
      };
      const requestedSubClaims: Claims = {
        [ISSUE_DATE]: {},
        [EXPIRY_DATE]: {},
      };

      defaultAddMdocDateClaims({
        subClaims,
        requestedSubClaims,
      });

      expect(subClaims[ISSUE_DATE]).toBe('cbor:1004("2024-01-01")');
      expect(subClaims[EXPIRY_DATE]).toBe('cbor:1004("2025-01-01")');
    });
  });
});
