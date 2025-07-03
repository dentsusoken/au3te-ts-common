import { describe, expect, it } from 'vitest';
import {
  ClientAuthMethod,
  clientAuthMethodSchema,
  clientAuthMethods,
} from '../ClientAuthMethod';

describe('clientAuthMethodSchema', () => {
  it('should accept valid client authentication methods', () => {
    clientAuthMethods.forEach((method) => {
      const result = clientAuthMethodSchema.parse(method);
      expect(result).toBe(method);
    });
  });

  it('should accept valid client authentication methods in uppercase and transform to lowercase', () => {
    clientAuthMethods.forEach((method) => {
      const uppercaseMethod = method.toUpperCase();
      const result = clientAuthMethodSchema.parse(uppercaseMethod);
      expect(result).toBe(method);
    });
  });

  it('should accept valid client authentication methods in mixed case and transform to lowercase', () => {
    const mixedCaseMethods = [
      'Client_Secret_Basic',
      'PRIVATE_KEY_JWT',
      'tls_Client_Auth',
      'Self_Signed_Tls_Client_Auth',
    ];
    const expectedResults = [
      'client_secret_basic',
      'private_key_jwt',
      'tls_client_auth',
      'self_signed_tls_client_auth',
    ];

    mixedCaseMethods.forEach((method, index) => {
      const result = clientAuthMethodSchema.parse(method);
      expect(result).toBe(expectedResults[index]);
    });
  });

  it('should reject invalid client authentication methods', () => {
    const invalidMethods = [
      'invalid',
      'CLIENT_SECRET',
      'jwt',
      'basic',
      'post',
      'tls',
      'self_signed',
      'attest',
      '',
      123,
      true,
      false,
      {},
      [],
      null,
      undefined,
    ];

    invalidMethods.forEach((method) => {
      const result = clientAuthMethodSchema.safeParse(method);
      expect(result.success).toBe(false);
    });
  });

  it('should reject non-string values', () => {
    const nonStringValues = [123, true, false, {}, [], null, undefined];
    nonStringValues.forEach((value) => {
      const result = clientAuthMethodSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof clientAuthMethodSchema._type;
    type ExpectedType = ClientAuthMethod;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });

  it('should ensure all client authentication methods are covered', () => {
    // This test ensures that the schema covers all defined client authentication methods
    expect(clientAuthMethods).toContain('none');
    expect(clientAuthMethods).toContain('client_secret_basic');
    expect(clientAuthMethods).toContain('client_secret_post');
    expect(clientAuthMethods).toContain('client_secret_jwt');
    expect(clientAuthMethods).toContain('private_key_jwt');
    expect(clientAuthMethods).toContain('tls_client_auth');
    expect(clientAuthMethods).toContain('self_signed_tls_client_auth');
    expect(clientAuthMethods).toContain('attest_jwt_client_auth');
    expect(clientAuthMethods).toHaveLength(8);
  });
});

describe('ClientAuthMethod type', () => {
  it('should allow valid client authentication method values', () => {
    const validMethods: ClientAuthMethod[] = [
      'none',
      'client_secret_basic',
      'client_secret_post',
      'client_secret_jwt',
      'private_key_jwt',
      'tls_client_auth',
      'self_signed_tls_client_auth',
      'attest_jwt_client_auth',
    ];
    validMethods.forEach((method) => {
      expect(clientAuthMethods).toContain(method);
    });
  });

  it('should have correct type inference', () => {
    const testFunction = (clientAuthMethod: ClientAuthMethod): string => {
      return clientAuthMethod;
    };

    expect(testFunction('none')).toBe('none');
    expect(testFunction('client_secret_basic')).toBe('client_secret_basic');
    expect(testFunction('private_key_jwt')).toBe('private_key_jwt');
  });
});
