import { describe, it, expect } from 'vitest';
import { buildRequestedClaims } from './buildRequestedClaims';

describe('buildRequestedClaims', () => {
  it('should return empty claims when input is undefined', () => {
    const result = buildRequestedClaims(undefined);
    expect(result).toEqual({});
  });

  it('should return empty claims when input is null', () => {
    const result = buildRequestedClaims(null);
    expect(result).toEqual({});
  });

  it('should return empty claims when input is an array', () => {
    const result = buildRequestedClaims(['a', 'b', 'c']);
    expect(result).toEqual({});
  });

  it('should build claims from flat object', () => {
    const input = {
      age: 25,
      name: 'John',
      verified: true,
    };

    const result = buildRequestedClaims(input);
    expect(result).toEqual({
      age: {},
      name: {},
      verified: {},
    });
  });

  it('should build claims from nested object', () => {
    const input = {
      personal: {
        details: {
          age: 25,
          name: 'John',
        },
      },
    };

    const result = buildRequestedClaims(input);
    expect(result).toEqual({
      personal: {
        details: {
          age: {},
          name: {},
        },
      },
    });
  });

  it('should handle mixed value types', () => {
    const input = {
      age: 25,
      name: 'John',
      verified: true,
      scores: [1, 2, 3],
      details: {
        address: 'Tokyo',
        phone: null,
      },
    };

    const result = buildRequestedClaims(input);
    expect(result).toEqual({
      age: {},
      name: {},
      verified: {},
      scores: {},
      details: {
        address: {},
        phone: {},
      },
    });
  });

  it('should handle deeply nested structure', () => {
    const input = {
      'org.iso.18013.5.1': {
        personal: {
          details: {
            age: 25,
            name: {
              given: 'John',
              family: 'Doe',
            },
          },
          address: {
            street: '123 Main St',
            city: 'Tokyo',
          },
        },
      },
    };

    const result = buildRequestedClaims(input);
    expect(result).toEqual({
      'org.iso.18013.5.1': {
        personal: {
          details: {
            age: {},
            name: {
              given: {},
              family: {},
            },
          },
          address: {
            street: {},
            city: {},
          },
        },
      },
    });
  });
});
