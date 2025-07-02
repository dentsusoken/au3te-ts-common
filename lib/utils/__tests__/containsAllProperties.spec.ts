import { describe, it, expect } from 'vitest';
import { containsAllProperties } from '../containsAllProperties';

describe('containsAllProperties', () => {
  // Basic test cases
  it('should return true when source contains all properties of target', () => {
    const source = { a: 1, b: 2, c: 3 };
    const target = { a: 1, b: 2 };

    expect(containsAllProperties(source, target, 1)).toBe(true);
  });

  it('should return false when target has properties missing from source', () => {
    const source = { a: 1, b: 2 };
    const target = { a: 1, c: 3 };

    expect(containsAllProperties(source, target, 1)).toBe(false);
  });

  // Nested object test cases
  it('should return true when source contains all nested properties of target', () => {
    const source = {
      a: {
        b: { c: 1 },
        d: 2,
      },
    };
    const target = {
      a: {
        b: { c: 1 },
      },
    };

    expect(containsAllProperties(source, target, 3)).toBe(true);
  });

  it('should ignore properties beyond maxRecursionDepth', () => {
    const source = {
      a: {
        b: { c: 1 },
      },
    };
    const target = {
      a: {
        b: { c: 2 },
      },
    };

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });

  // Edge cases
  it('should handle null and undefined values correctly', () => {
    const source = {
      a: null,
      b: undefined,
      c: { d: null },
    };
    const target = {
      a: null,
      b: undefined,
    };

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });

  it('should return true for empty target object', () => {
    const source = { a: 1 };
    const target = {};

    expect(containsAllProperties(source, target, 1)).toBe(true);
  });

  // Array handling
  it('should handle objects containing arrays correctly', () => {
    const source = {
      a: [1, 2, 3],
      b: { c: [4, 5] },
    };
    const target = {
      a: [1, 2],
      b: { c: [4] },
    };

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });

  // Type differences
  it('should return true when structure matches regardless of value types', () => {
    const source = {
      a: { b: 'string' },
      c: { d: 123 },
    };
    const target = {
      a: { b: 42 },
      c: { d: 'different' },
    };

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });

  // Circular reference handling
  it('should handle objects with circular references', () => {
    const source: Record<string, unknown> = { a: 1 };
    source.self = source;

    const target: Record<string, unknown> = { a: 2 };
    target.self = target;

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });

  // Empty object value test cases
  it('should return true when target has empty object values', () => {
    const source = {
      'org.iso.18013.5.1': {
        age: 25,
        name: 'John Doe',
      },
    };
    const target = {
      'org.iso.18013.5.1': {
        age: {},
      },
    };

    expect(containsAllProperties(source, target, 3)).toBe(true);
  });

  it('should handle deeply nested empty object values', () => {
    const source = {
      'org.iso.18013.5.1': {
        personal: {
          details: {
            age: 25,
            name: 'John Doe',
          },
        },
      },
    };
    const target = {
      'org.iso.18013.5.1': {
        personal: {
          details: {
            age: {},
          },
        },
      },
    };

    expect(containsAllProperties(source, target, 4)).toBe(true);
  });

  it('should handle multiple empty object values', () => {
    const source = {
      'org.iso.18013.5.1': {
        age: '25',
        verified: true,
      },
    };
    const target = {
      'org.iso.18013.5.1': {
        age: {},
        verified: {},
      },
    };

    expect(containsAllProperties(source, target, 2)).toBe(true);
  });
});
