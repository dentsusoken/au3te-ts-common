import { describe, it, expect } from 'vitest';
import { clientSchema, Client } from '../Client';

describe('clientSchema', () => {
  it('should accept a valid Client object', () => {
    const validClient: Client = {
      clientName: 'Test Client',
      description: 'A test client application',
      logoUri: 'https://example.com/logo.png',
      clientUri: 'https://example.com',
      policyUri: 'https://example.com/policy',
      tosUri: 'https://example.com/terms',
      subjectType: 'public',
      derivedSectorIdentifier: 'sector123',
    };
    const result = clientSchema.parse(validClient);
    expect(result).toEqual(validClient);
  });

  it('should accept a Client object with minimal properties', () => {
    const minimalClient: Client = {
      clientName: 'Minimal Client',
    };
    const result = clientSchema.parse(minimalClient);
    expect(result).toEqual(minimalClient);
  });

  it('should accept a Client object with null values', () => {
    const clientWithNulls: Client = {
      clientName: null,
      description: null,
      logoUri: null,
      clientUri: null,
      policyUri: null,
      tosUri: null,
      subjectType: null,
      derivedSectorIdentifier: null,
    };
    const result = clientSchema.parse(clientWithNulls);
    expect(result).toEqual(clientWithNulls);
  });

  it('should accept a Client object with undefined values', () => {
    const clientWithUndefined: Client = {
      clientName: undefined,
      description: undefined,
      logoUri: undefined,
      clientUri: undefined,
      policyUri: undefined,
      tosUri: undefined,
      subjectType: undefined,
      derivedSectorIdentifier: undefined,
    };
    const result = clientSchema.parse(clientWithUndefined);
    expect(result).toEqual(clientWithUndefined);
  });

  it('should accept an empty object', () => {
    const emptyClient = {};
    const result = clientSchema.parse(emptyClient);
    expect(result).toEqual(emptyClient);
  });

  it('should accept additional properties due to passthrough', () => {
    const clientWithExtra = {
      clientName: 'TestClient',
      subjectType: 'pairwise',
      extraProperty: 'This is an extra property',
      anotherExtra: 123,
      nestedExtra: {
        foo: 'bar',
        baz: [1, 2, 3],
      },
    };
    const result = clientSchema.parse(clientWithExtra);
    expect(result).toEqual(clientWithExtra);
    expect(result.extraProperty).toBe('This is an extra property');
    expect(result.anotherExtra).toBe(123);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).nestedExtra.foo).toBe('bar');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).nestedExtra.baz).toEqual([1, 2, 3]);
  });

  it('should accept case-insensitive subject types', () => {
    const clientWithUpperCaseSubject = {
      clientName: 'Test Client',
      subjectType: 'PUBLIC',
    };
    const result = clientSchema.parse(clientWithUpperCaseSubject);
    expect(result.subjectType).toBe('public');
  });

  it('should reject invalid URL formats', () => {
    const invalidUrls = ['not-a-url', 'http://', 'https://', '://example.com'];

    invalidUrls.forEach((invalidUrl) => {
      const clientWithInvalidUrl = {
        clientName: 'Test Client',
        logoUri: invalidUrl,
        clientUri: invalidUrl,
        policyUri: invalidUrl,
        tosUri: invalidUrl,
      };
      const result = clientSchema.safeParse(clientWithInvalidUrl);
      expect(result.success).toBe(false);
    });
  });

  it('should reject invalid subject types', () => {
    const invalidSubjectTypes = [
      'invalid',
      'private',
      'individual',
      123,
      true,
      {},
    ];

    invalidSubjectTypes.forEach((invalidType) => {
      const clientWithInvalidSubject = {
        clientName: 'Test Client',
        subjectType: invalidType,
      };
      const result = clientSchema.safeParse(clientWithInvalidSubject);
      expect(result.success).toBe(false);
    });
  });

  it('should reject non-object values', () => {
    const invalidValues = [
      'not an object',
      123,
      true,
      ['array'],
      null,
      undefined,
    ];

    invalidValues.forEach((value) => {
      const result = clientSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof clientSchema._type;
    type ExpectedType = Client;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
