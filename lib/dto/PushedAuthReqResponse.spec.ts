import { describe, it, expect } from 'vitest';
import { PushedAuthReqResponse } from './PushedAuthReqResponse';
import { ClientAuthMethod } from '../types/ClientAuthMethod';

describe('PushedAuthReqResponse', () => {
  it('should create an instance with valid properties', () => {
    const response = new PushedAuthReqResponse(
      'CREATED',
      'Response content',
      ClientAuthMethod.CLIENT_SECRET_BASIC,
      new URL('https://example.com'),
      'dpop-nonce'
    );

    expect(response.action).toBe('CREATED');
    expect(response.responseContent).toBe('Response content');
    expect(response.clientAuthMethod).toBe(
      ClientAuthMethod.CLIENT_SECRET_BASIC
    );
    expect(response.requestUri).toEqual(new URL('https://example.com'));
    expect(response.dpopNonce).toBe('dpop-nonce');
  });

  it('should create an instance with optional properties omitted', () => {
    const response = new PushedAuthReqResponse('BAD_REQUEST');

    expect(response.action).toBe('BAD_REQUEST');
    expect(response.responseContent).toBeUndefined();
    expect(response.clientAuthMethod).toBeUndefined();
    expect(response.requestUri).toBeUndefined();
    expect(response.dpopNonce).toBeUndefined();
  });

  it('should return a string representation of the instance', () => {
    const response = new PushedAuthReqResponse(
      'UNAUTHORIZED',
      'Unauthorized access',
      ClientAuthMethod.PRIVATE_KEY_JWT,
      new URL('https://example.com/auth'),
      'nonce'
    );

    const expectedString =
      'action=UNAUTHORIZED, responseContent=Unauthorized access, clientAuthMethod={name=private_key_jwt, value=4, isSecretBased=false, isJwtBased=true, isCertificateBased=false}, requestUri=https://example.com/auth';

    expect(response.toString()).toBe(expectedString);
  });
});
