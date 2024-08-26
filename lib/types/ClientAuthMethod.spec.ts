import { describe, expect, it } from 'vitest';
import { ClientAuthMethod } from './ClientAuthMethod';

describe('ClientAuthMethod', () => {
  it('should get ClientAuthMethod by value', () => {
    expect(ClientAuthMethod.getByValue(0)).toBe(ClientAuthMethod.NONE);
    expect(ClientAuthMethod.getByValue(1)).toBe(
      ClientAuthMethod.CLIENT_SECRET_BASIC
    );
    expect(ClientAuthMethod.getByValue(2)).toBe(
      ClientAuthMethod.CLIENT_SECRET_POST
    );
    expect(ClientAuthMethod.getByValue(3)).toBe(
      ClientAuthMethod.CLIENT_SECRET_JWT
    );
    expect(ClientAuthMethod.getByValue(4)).toBe(
      ClientAuthMethod.PRIVATE_KEY_JWT
    );
    expect(ClientAuthMethod.getByValue(5)).toBe(
      ClientAuthMethod.TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByValue(6)).toBe(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByValue(7)).toBe(
      ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByValue(8)).toBeUndefined();
  });

  it('should get ClientAuthMethod by name', () => {
    expect(ClientAuthMethod.getByName('none')).toBe(ClientAuthMethod.NONE);
    expect(ClientAuthMethod.getByName('client_secret_basic')).toBe(
      ClientAuthMethod.CLIENT_SECRET_BASIC
    );
    expect(ClientAuthMethod.getByName('client_secret_post')).toBe(
      ClientAuthMethod.CLIENT_SECRET_POST
    );
    expect(ClientAuthMethod.getByName('client_secret_jwt')).toBe(
      ClientAuthMethod.CLIENT_SECRET_JWT
    );
    expect(ClientAuthMethod.getByName('private_key_jwt')).toBe(
      ClientAuthMethod.PRIVATE_KEY_JWT
    );
    expect(ClientAuthMethod.getByName('tls_client_auth')).toBe(
      ClientAuthMethod.TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByName('self_signed_tls_client_auth')).toBe(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByName('attest_jwt_client_auth')).toBe(
      ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH
    );
    expect(ClientAuthMethod.getByName('unknown')).toBeUndefined();
  });

  it('should check if ClientAuthMethod is secret based', () => {
    expect(ClientAuthMethod.NONE.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isSecretBased()).toBe(true);
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isSecretBased()).toBe(true);
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isSecretBased()).toBe(false);
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isSecretBased()).toBe(
      false
    );
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isSecretBased()).toBe(false);
  });

  it('should check if ClientAuthMethod is JWT based', () => {
    expect(ClientAuthMethod.NONE.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isJwtBased()).toBe(true);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isJwtBased()).toBe(true);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isJwtBased()).toBe(false);
    expect(ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isJwtBased()).toBe(
      false
    );
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isJwtBased()).toBe(true);
  });

  it('should check if ClientAuthMethod is certificate based', () => {
    expect(ClientAuthMethod.NONE.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.CLIENT_SECRET_BASIC.isCertificateBased()).toBe(
      false
    );
    expect(ClientAuthMethod.CLIENT_SECRET_POST.isCertificateBased()).toBe(
      false
    );
    expect(ClientAuthMethod.CLIENT_SECRET_JWT.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.PRIVATE_KEY_JWT.isCertificateBased()).toBe(false);
    expect(ClientAuthMethod.TLS_CLIENT_AUTH.isCertificateBased()).toBe(true);
    expect(
      ClientAuthMethod.SELF_SIGNED_TLS_CLIENT_AUTH.isCertificateBased()
    ).toBe(true);
    expect(ClientAuthMethod.ATTEST_JWT_CLIENT_AUTH.isCertificateBased()).toBe(
      false
    );
  });

  it('should return a string representation of the instance', () => {
    const authMethod = ClientAuthMethod.CLIENT_SECRET_BASIC;
    const expectedString =
      '{name=client_secret_basic, value=1, isSecretBased=true, isJwtBased=false, isCertificateBased=false}';

    expect(authMethod.toString()).toBe(expectedString);
  });

  it('should return a string representation of the instance with different auth method', () => {
    const authMethod = ClientAuthMethod.PRIVATE_KEY_JWT;
    const expectedString =
      '{name=private_key_jwt, value=4, isSecretBased=false, isJwtBased=true, isCertificateBased=false}';

    expect(authMethod.toString()).toBe(expectedString);
  });

  it('should return a string representation of the instance with certificate-based auth method', () => {
    const authMethod = ClientAuthMethod.TLS_CLIENT_AUTH;
    const expectedString =
      '{name=tls_client_auth, value=5, isSecretBased=false, isJwtBased=false, isCertificateBased=true}';

    expect(authMethod.toString()).toBe(expectedString);
  });
});
