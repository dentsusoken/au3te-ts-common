import { describe, expect, it } from 'vitest';
import { ClientAuthMethod, clientAuthMethodSchema } from './ClientAuthMethod';

describe('clientAuthMethodSchema', () => {
  it('should validate and transform valid client authentication methods', () => {
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
