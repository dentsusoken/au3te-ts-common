import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createToOrder } from './toOrder';
import { CredentialType } from './types';
import { CredentialRequestInfo } from '../../schemas/credential/CredentialRequestInfo';
import { IntrospectionResponse } from '../../schemas/introspection/IntrospectionResponse';

describe('createToOrder', () => {
  const mockGetBySubject = vi.fn();
  const mockCheckPermissions = vi.fn();
  const mockCollectClaims = vi.fn();
  const mockCreateOrder = vi.fn();
  const mockBuildRequestedCredential = vi.fn();

  const toOrder = createToOrder({
    getBySubject: mockGetBySubject,
    checkPermissions: mockCheckPermissions,
    collectClaims: mockCollectClaims,
    createOrder: mockCreateOrder,
    buildRequestedCredential: mockBuildRequestedCredential,
  });

  const mockCredentialType: CredentialType = 'single';
  const mockCredentialRequestInfo: CredentialRequestInfo = {
    format: 'mso_mdoc',
    details: '{"doctype":"org.iso.18013.5.1.mDL"}',
    identifier: 'test-identifier',
  };
  const mockIntrospectionResponse = {
    subject: 'test-subject',
    issuableCredentials: '["org.iso.18013.5.1.mDL"]',
  } as unknown as IntrospectionResponse;

  beforeEach(() => {
    vi.resetAllMocks();
    mockGetBySubject.mockResolvedValue({ id: 'test-user' });
    mockCheckPermissions.mockResolvedValue({ doctype: 'test-doctype' });
    mockBuildRequestedCredential.mockReturnValue({ claims: {} });
    mockCollectClaims.mockResolvedValue({ claims: { name: 'Test User' } });
    mockCreateOrder.mockReturnValue({
      requestIdentifier: 'test-identifier',
      credentialPayload: JSON.stringify({ name: 'Test User' }),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });
  });

  it('should process a valid credential request', async () => {
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
    };

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: mockCredentialRequestInfo,
        introspectionResponse: invalidIntrospectionResponse,
      })
    ).rejects.toThrow('Subject is required');
  });

  it('should throw BadRequestError when user is not found', async () => {
    mockGetBySubject.mockResolvedValue(null);

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: mockCredentialRequestInfo,
        introspectionResponse: mockIntrospectionResponse,
      })
    ).rejects.toThrow('User not found');
  });

  it('should throw BadRequestError when issuableCredentials is missing', async () => {
    const invalidIntrospectionResponse = {
      ...mockIntrospectionResponse,
      issuableCredentials: undefined,
    };

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: mockCredentialRequestInfo,
        introspectionResponse: invalidIntrospectionResponse,
      })
    ).rejects.toThrow('Issuable credentials are required');
  });

  it('should throw BadRequestError when details is missing', async () => {
    const invalidCredentialRequestInfo = {
      ...mockCredentialRequestInfo,
      details: undefined,
    };

    await expect(
      toOrder({
        credentialType: mockCredentialType,
        credentialRequestInfo: invalidCredentialRequestInfo,
        introspectionResponse: mockIntrospectionResponse,
      })
    ).rejects.toThrow('Requested credential is required');
  });

  it('should call buildRequestedCredential with correct parameters', async () => {
    const issuableCredential = { doctype: 'test-doctype' };
    mockCheckPermissions.mockResolvedValue(issuableCredential);

    await toOrder({
      credentialType: mockCredentialType,
      credentialRequestInfo: {
        ...mockCredentialRequestInfo,
        details: '{"doctype":"org.iso.18013.5.1.mDL"}',
      },
      introspectionResponse: mockIntrospectionResponse,
    });

    expect(mockBuildRequestedCredential).toHaveBeenCalledWith({
      issuableCredential,
      requestedCredential: { doctype: 'org.iso.18013.5.1.mDL' },
    });
  });
});
