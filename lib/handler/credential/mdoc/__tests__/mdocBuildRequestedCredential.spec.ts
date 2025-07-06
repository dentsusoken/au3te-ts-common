import { describe, it, expect } from 'vitest';
import { defaultMdocBuildRequestedCredential } from '../mdocBuildRequestedCredential';
import { CLAIMS } from '../../constants';
import type { Claims } from '../../types';

describe('defaultMdocBuildRequestedCredential', () => {
  describe('basic functionality', () => {
    it('should return requested credential when it has claims', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });

      expect(result).toBe(requestedCredential);
    });

    it('should build claims from issuable credential when requested credential has no claims', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
          },
        },
      };

      const requestedCredential: Claims = {};

      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });

      expect(result).toEqual({
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
          },
        },
      });
      expect(result).not.toBe(requestedCredential);
    });
  });

  describe('nested and complex claims', () => {
    it('should handle nested claims structure', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
                name: {
                  given: {},
                  family: {},
                },
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {};

      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });

      expect(result).toEqual({
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
                name: {
                  given: {},
                  family: {},
                },
              },
            },
          },
        },
      });
    });

    it('should handle multiple namespaces', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {}, name: {} },
          'org.example.custom': { score: {}, verified: {} },
        },
      };
      const requestedCredential: Claims = {};
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });
      expect(result).toEqual({
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {}, name: {} },
          'org.example.custom': { score: {}, verified: {} },
        },
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty issuable claims', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {},
      };
      const requestedCredential: Claims = {};
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });
      expect(result).toEqual({ [CLAIMS]: {} });
    });

    it('should preserve other properties in requested credential', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      };
      const requestedCredential: Claims = {
        format: 'mso_mdoc',
        doctype: 'org.iso.18013.5.1.mDL',
      };
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });
      expect(result).toEqual({
        format: 'mso_mdoc',
        doctype: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      });
    });

    it('should return empty object if both credentials are empty', () => {
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential: {},
        requestedCredential: {},
      });
      expect(result).toEqual({});
    });

    it('should return empty object if both credentials are undefined', () => {
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential: undefined as unknown as Claims,
        requestedCredential: undefined as unknown as Claims,
      });
      expect(result).toEqual({});
    });

    it('should return requestedCredential if issuableCredential is undefined', () => {
      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {} },
        },
      };
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential: undefined as unknown as Claims,
        requestedCredential,
      });
      expect(result).toBe(requestedCredential);
    });

    it('should return built claims if requestedCredential is undefined', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {}, name: {} },
        },
      };
      const result = defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential: undefined as unknown as Claims,
      });
      expect(result).toEqual({
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {}, name: {} },
        },
      });
    });

    it('should not mutate the input objects', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': { age: {}, name: {} },
        },
      };
      const requestedCredential: Claims = {};
      const issuableCopy = JSON.parse(JSON.stringify(issuableCredential));
      const requestedCopy = JSON.parse(JSON.stringify(requestedCredential));
      defaultMdocBuildRequestedCredential({
        issuableCredential,
        requestedCredential,
      });
      expect(issuableCredential).toEqual(issuableCopy);
      expect(requestedCredential).toEqual(requestedCopy);
    });
  });
});
