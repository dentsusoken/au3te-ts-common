import { describe, it, expect, vi } from 'vitest';
import { buildAuthorizationPageModel } from './buildAuthorizationPageModel';
import { AuthorizationResponse } from '../../schemas/authorization/AuthorizationResponse';
import { User } from '../../schemas/common/User';
import { extractRequestedClaims } from './extractRequestedClaims';

vi.mock('./extractRequestedClaims', () => ({
  extractRequestedClaims: vi.fn((claims) =>
    claims ? [{ key: 'mockClaim', value: 'mockValue' }] : undefined
  ),
}));

describe('buildAuthorizationPageModel', () => {
  const mockUser: User = { subject: 'mockSubject' };

  const mockAuthzRes: AuthorizationResponse = {
    action: 'INTERACTION',
    service: { serviceName: 'mockService' },
    client: {
      clientName: 'mockClient',
      description: 'mockDescription',
      logoUri: 'mockLogoUri',
      policyUri: 'mockPolicyUri',
      tosUri: 'mockTosUri',
    },
    scopes: [{ name: 'scope1' }, { name: 'scope2' }],
    dynamicScopes: [{ name: 'dynamicScope' }],
    subject: 'mockSubject',
    purpose: 'mockPurpose',
    idTokenClaims: 'mockIdTokenClaims',
    userInfoClaims: 'mockUserInfoClaims',
    authorizationDetails: { elements: [{ type: 'mockAuthorizationDetails' }] },
    claimsAtUserInfo: ['mockClaimsAtUserInfo'],
  };

  it('should build AuthorizationPageModel correctly', () => {
    const result = buildAuthorizationPageModel(mockAuthzRes, mockUser);

    expect(result).toEqual({
      authorizationResponse: mockAuthzRes,
      serviceName: 'mockService',
      clientName: 'mockClient',
      description: 'mockDescription',
      logoUri: 'mockLogoUri',
      policyUri: 'mockPolicyUri',
      tosUri: 'mockTosUri',
      scopes: [
        { name: 'scope1' },
        { name: 'scope2' },
        { name: 'dynamicScope' },
      ],
      loginId: 'mockSubject',
      loginIdReadOnly: 'readonly',
      authorizationDetails: JSON.stringify(mockAuthzRes.authorizationDetails),
      user: mockUser,
      purpose: 'mockPurpose',
      verifiedClaimsForIdToken: [{ key: 'mockClaim', value: 'mockValue' }],
      verifiedClaimsForUserInfo: [{ key: 'mockClaim', value: 'mockValue' }],
      identityAssuranceRequired: true,
      claimsForUserInfo: ['mockClaimsAtUserInfo'],
    });

    expect(extractRequestedClaims).toHaveBeenCalledWith('mockIdTokenClaims');
    expect(extractRequestedClaims).toHaveBeenCalledWith('mockUserInfoClaims');
  });

  it('should handle undefined values correctly', () => {
    const partialAuthzRes: Partial<AuthorizationResponse> = {
      service: {},
      client: {},
      loginHint: 'mockLoginHint',
    };

    const result = buildAuthorizationPageModel(
      partialAuthzRes as AuthorizationResponse,
      mockUser
    );

    expect(result).toEqual({
      authorizationResponse: partialAuthzRes,
      serviceName: undefined,
      clientName: undefined,
      description: undefined,
      logoUri: undefined,
      policyUri: undefined,
      tosUri: undefined,
      scopes: [],
      loginId: 'mockLoginHint',
      loginIdReadOnly: undefined,
      authorizationDetails: undefined,
      user: mockUser,
      purpose: undefined,
      verifiedClaimsForIdToken: undefined,
      verifiedClaimsForUserInfo: undefined,
      identityAssuranceRequired: false,
      claimsForUserInfo: undefined,
    });
  });
});
