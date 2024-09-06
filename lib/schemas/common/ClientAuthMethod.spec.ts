import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  ClientAuthMethod,
  clientAuthMethodSchema,
  nullableButOptionalClientAuthMethodSchema,
  clientAuthMethods,
} from './ClientAuthMethod';

describe('clientAuthMethodSchema', () => {
  it('should validate and transform valid client authentication methods', () => {
    clientAuthMethods.forEach((method) => {
      expect(clientAuthMethodSchema.parse(method)).toBe(method);
      expect(clientAuthMethodSchema.parse(method.toUpperCase())).toBe(method);
    });
  });

  it('should throw an error for invalid client authentication methods', () => {
    const invalidMethods = ['invalid', 'CLIENT_SECRET', 'jwt', ''];

    invalidMethods.forEach((method) => {
      expect(() => clientAuthMethodSchema.parse(method)).toThrowError();
    });
  });

  it('should infer the correct type for ClientAuthMethod', () => {
    const clientAuthMethod: ClientAuthMethod = 'client_secret_basic';
    expect(clientAuthMethod).toBe('client_secret_basic');
  });
});

describe('nullableButOptionalClientAuthMethodSchema', () => {
  it('should parse a valid client authentication method', () => {
    clientAuthMethods.forEach((method) => {
      const result = nullableButOptionalClientAuthMethodSchema.parse(method);
      expect(result).toBe(method);
    });
  });

  it('should parse a valid client authentication method case-insensitively', () => {
    clientAuthMethods.forEach((method) => {
      const uppercaseMethod = method.toUpperCase();
      const result =
        nullableButOptionalClientAuthMethodSchema.parse(uppercaseMethod);
      expect(result).toBe(method);
    });
  });

  it('should parse an undefined value', () => {
    const result = nullableButOptionalClientAuthMethodSchema.parse(undefined);
    expect(result).toBeUndefined();
  });

  it('should parse a null value as undefined', () => {
    const result = nullableButOptionalClientAuthMethodSchema.parse(null);
    expect(result).toBeUndefined();
  });

  it('should throw an error for invalid client authentication methods', () => {
    expect(() =>
      nullableButOptionalClientAuthMethodSchema.parse('invalid_method')
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalClientAuthMethodSchema.parse(123)
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalClientAuthMethodSchema.parse(true)
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalClientAuthMethodSchema.parse({})
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalClientAuthMethodSchema.parse([])
    ).toThrowError(z.ZodError);
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof nullableButOptionalClientAuthMethodSchema>;
    type ExpectedType = ClientAuthMethod | undefined;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
