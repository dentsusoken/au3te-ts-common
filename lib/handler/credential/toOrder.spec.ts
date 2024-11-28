import { describe, it, expect, vi } from 'vitest';
import { createToOrder } from './toOrder';
import { BadRequestError } from '../BadRequestError';
import { CredentialType } from './types';
import { CredentialRequestInfo } from '../../schemas/credential/CredentialRequestInfo';
import { IntrospectionResponse } from '../../schemas/introspection/IntrospectionResponse';

describe('createToOrder', () => {
  const mockGetBySubject = vi.fn();
  const mockCheckPermissions = vi.fn();
  const mockCollectClaims = vi.fn();
  const mockCreateOrder = vi.fn();

  const toOrder = createToOrder({
    getBySubject: mockGetBySubject,
    checkPermissions: mockCheckPermissions,
    collectClaims: mockCollectClaims,
    createOrder: mockCreateOrder,
  });

  const mockCredentialType: CredentialType = 'single';
  const mockCredentialRequestInfo: CredentialRequestInfo = {
    format: 'mso_mdoc',
    details: '{}',
    identifier: 'test-identifier',
  };
  const mockIntrospectionResponse = {
    subject: 'test-subject',
    issuableCredentials: '["org.iso.18013.5.1.mDL"]',
  } as unknown as IntrospectionResponse;

  it('should process a valid credential request', async () => {
    mockGetBySubject.mockResolvedValue({ id: 'test-user' });
    mockCheckPermissions.mockResolvedValue(undefined);
    mockCollectClaims.mockResolvedValue({ name: 'Test User' });
    mockCreateOrder.mockReturnValue({
      requestIdentifier: 'test-identifier',
      credentialPayload: JSON.stringify({ name: 'Test User' }),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });

    const result = await toOrder({
      credentialType: mockCredentialType,
      credentialRequestInfo: mockCredentialRequestInfo,
      introspectionResponse: mockIntrospectionResponse,
    });

    expect(result).toEqual({
      requestIdentifier: 'test-identifier',
      credentialPayload: JSON.stringify({ name: 'Test User' }),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });
  });

  it('should throw BadRequestError when subject is missing', async () => {
    const invalidIntrospectionResponse = {
      ...mockIntrospectionResponse,
      subject: undefined,
    } as unknown as IntrospectionResponse;

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: mockCredentialRequestInfo,
        introspectionResponse: invalidIntrospectionResponse,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should throw BadRequestError when user is not found', async () => {
    mockGetBySubject.mockResolvedValue(null);

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: mockCredentialRequestInfo,
        introspectionResponse: mockIntrospectionResponse,
      })
    ).rejects.toThrow(BadRequestError);
  });

  it('should handle CBOR encoded values in claims', async () => {
    mockGetBySubject.mockResolvedValue({ id: 'test-user' });
    mockCheckPermissions.mockResolvedValue(undefined);
    mockCollectClaims.mockResolvedValue({
      birth_date: 'cbor:1004("1991-11-06")',
      issue_date: 'cbor:1004("2023-01-01")',
    });
    mockCreateOrder.mockReturnValue({
      requestIdentifier: 'test-identifier',
      credentialPayload: JSON.stringify({
        birth_date: 'cbor:1004("1991-11-06")',
        issue_date: 'cbor:1004("2023-01-01")',
      }),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });

    const result = await toOrder({
      credentialType: mockCredentialType,
      credentialRequestInfo: mockCredentialRequestInfo,
      introspectionResponse: mockIntrospectionResponse,
    });

    expect(result.credentialPayload).toContain('cbor:1004');
  });
});
