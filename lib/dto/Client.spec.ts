import { describe, expect, it } from 'vitest';
import { clientSchema, Client } from './Client';

describe('clientSchema', () => {
  it('should validate a valid client object', () => {
    const validClient: Client = {
      clientName: 'Example Client',
      logoUri: 'https://example.com/logo.png',
      clientUri: 'https://example.com/client',
      policyUri: 'https://example.com/policy',
      tosUri: 'https://example.com/tos',
      description: 'This is an example client.',
      subjectType: 'public',
      derivedSectorIdentifier: 'example-sector',
    };

    const result = clientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validClient);
  });

  it('should allow optional fields to be omitted', () => {
    const validClient: Client = {};

    const result = clientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it('should invalidate an object with invalid URL', () => {
    const invalidClient: Client = {
      logoUri: 'invalid-url',
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });

  it('should invalidate an object with invalid subject type', () => {
    const invalidClient = {
      subjectType: 'invalid-type',
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });

  it('should invalidate an object with non-string values', () => {
    const invalidClient = {
      clientName: 123,
      description: 456,
      derivedSectorIdentifier: 789,
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });
});
