import { describe, it, expect } from 'vitest';
import { createContainsRequestedMdocClaims } from '../containsRequestedMdocClaims';
import { CLAIMS } from '../../constants';
import type { Claims } from '../../types';

describe('containsRequestedMdocClaims', () => {
  // Create test instance with default maxRecursionDepth
  const containsRequestedMdocClaims = createContainsRequestedMdocClaims();

  describe('basic functionality', () => {
    it('should return true when issuable credential contains all requested claims', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
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

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should return false when issuable credential is missing requested claims', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            name: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });

    it('should return true when all requested claims are present', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
            email: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should return false when some requested claims are missing', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
            email: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return true when no claims are requested', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      };

      const requestedCredential: Claims = {};

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should return true when requestedCredential is undefined', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(
          issuableCredential,
          undefined as unknown as Claims
        )
      ).toBe(true);
    });

    it('should return true when requestedCredential is null', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      };

      expect(
        containsRequestedMdocClaims(
          issuableCredential,
          null as unknown as Claims
        )
      ).toBe(true);
    });

    it('should return false when claims are requested but issuable credential has no claims', () => {
      const issuableCredential: Claims = {};

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });

    it('should return false when issuable credential is undefined', () => {
      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(
          undefined as unknown as Claims,
          requestedCredential
        )
      ).toBe(false);
    });

    it('should return false when issuable credential is null', () => {
      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(
          null as unknown as Claims,
          requestedCredential
        )
      ).toBe(false);
    });

    it('should handle empty objects at all levels', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {},
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {},
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });
  });

  describe('nested structures', () => {
    it('should handle deeply nested claim structures', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
                name: {},
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
              },
            },
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle missing nested properties', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
                name: {},
              },
            },
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle missing intermediate nested properties', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              age: {},
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
              },
            },
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });

    it('should handle complex nested structures with arrays', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            documents: {
              passport: {
                number: {},
                expiry: {},
              },
              license: {
                number: {},
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            documents: {
              passport: {
                number: {},
              },
            },
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });
  });

  describe('multiple namespaces', () => {
    it('should handle multiple namespaces correctly', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
            name: 'John Doe',
          },
          'org.example.custom': {
            score: 100,
            verified: true,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
          'org.example.custom': {
            score: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should return false when any namespace is missing', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
          },
          'org.example.custom': {
            score: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });

    it('should handle partial namespace matches', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: 25,
          },
          'org.example.custom': {
            score: 100,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
          },
          'org.example.custom': {
            score: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(false);
    });
  });

  describe('value type handling', () => {
    it('should check structure regardless of value types', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            verified: {},
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            verified: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle different value types in nested structures', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              age: 25,
              name: 'John',
              verified: true,
              score: 95.5,
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              age: {},
              name: {},
              verified: {},
              score: {},
            },
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle null and undefined values', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: null,
            name: undefined,
            verified: true,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            age: {},
            name: {},
            verified: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });
  });

  describe('recursion depth control', () => {
    it('should respect custom maxRecursionDepth', () => {
      const containsRequestedMdocClaimsDepth3 =
        createContainsRequestedMdocClaims(3);
      const containsRequestedMdocClaimsDepth4 =
        createContainsRequestedMdocClaims(4);

      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                age: {},
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              details: {
                verified: {},
              },
            },
          },
        },
      };

      // Should return true because it only checks up to depth 3 (stops at 'details')
      expect(
        containsRequestedMdocClaimsDepth3(
          issuableCredential,
          requestedCredential
        )
      ).toBe(true);

      // Should return false because it checks up to depth 4 (includes 'verified')
      expect(
        containsRequestedMdocClaimsDepth4(
          issuableCredential,
          requestedCredential
        )
      ).toBe(false);
    });

    it('should handle different recursion depths', () => {
      const depth0 = createContainsRequestedMdocClaims(0);
      const depth1 = createContainsRequestedMdocClaims(1);
      const depth2 = createContainsRequestedMdocClaims(2);

      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              age: {},
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            personal: {
              age: {},
            },
          },
        },
      };

      // Depth 0: only checks top level (CLAIMS)
      expect(depth0(issuableCredential, requestedCredential)).toBe(true);

      // Depth 1: checks CLAIMS and first level ('org.iso.18013.5.1')
      expect(depth1(issuableCredential, requestedCredential)).toBe(true);

      // Depth 2: checks CLAIMS, first level, and second level ('personal')
      expect(depth2(issuableCredential, requestedCredential)).toBe(true);
    });

    it('should handle very deep recursion limits', () => {
      const depth10 = createContainsRequestedMdocClaims(10);
      const depth100 = createContainsRequestedMdocClaims(100);

      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            level1: {
              level2: {
                level3: {
                  level4: {
                    level5: {
                      age: {},
                    },
                  },
                },
              },
            },
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            level1: {
              level2: {
                level3: {
                  level4: {
                    level5: {
                      age: {},
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(depth10(issuableCredential, requestedCredential)).toBe(true);
      expect(depth100(issuableCredential, requestedCredential)).toBe(true);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle circular references gracefully', () => {
      const circularObj: Record<string, unknown> = { name: 'test' };
      circularObj.self = circularObj;

      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            circular: circularObj,
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            circular: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle very large objects', () => {
      const largeIssuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {},
        },
      };

      const largeRequestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {},
        },
      };

      // Add many properties to test performance
      const issuableObj = largeIssuableCredential[CLAIMS] as Record<
        string,
        unknown
      >;
      const requestedObj = largeRequestedCredential[CLAIMS] as Record<
        string,
        unknown
      >;
      const issuableNamespace = issuableObj['org.iso.18013.5.1'] as Record<
        string,
        unknown
      >;
      const requestedNamespace = requestedObj['org.iso.18013.5.1'] as Record<
        string,
        unknown
      >;

      for (let i = 0; i < 100; i++) {
        issuableNamespace[`prop${i}`] = i;
        requestedNamespace[`prop${i}`] = {};
      }

      expect(
        containsRequestedMdocClaims(
          largeIssuableCredential,
          largeRequestedCredential
        )
      ).toBe(true);
    });

    it('should handle special characters in property names', () => {
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            'prop-with-dash': {},
            prop_with_underscore: {},
            propWithCamelCase: {},
            prop123: {},
            'prop with spaces': {},
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            'prop-with-dash': {},
            prop_with_underscore: {},
            propWithCamelCase: {},
            prop123: {},
            'prop with spaces': {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });

    it('should handle function values', () => {
      const testFunction = () => 'test';
      const issuableCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            handler: testFunction,
            data: 'value',
          },
        },
      };

      const requestedCredential: Claims = {
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            handler: {},
            data: {},
          },
        },
      };

      expect(
        containsRequestedMdocClaims(issuableCredential, requestedCredential)
      ).toBe(true);
    });
  });
});
