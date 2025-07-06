import { describe, it, expect, vi } from 'vitest';
import {
  createBuildAuthorizationPageModel,
  defaultBuildAuthorizationPageModel,
} from '../buildAuthorizationPageModel';
import { AuthorizationResponse } from '../../../schemas/authorization/AuthorizationResponse';
import { User } from '../../../schemas/common/User';

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

  describe('createBuildAuthorizationPageModel', () => {
    it('should build AuthorizationPageModel correctly', () => {
      // Remove unused parameter '_' to fix linter error
      const mockComputeScopes = vi.fn((scopes) => (scopes ? [...scopes] : []));
      const mockExtractRequestedClaims = vi.fn((claims) =>
        claims ? [{ key: 'mockClaim', value: 'mockValue' }] : undefined
      );
      const buildAuthorizationPageModel = createBuildAuthorizationPageModel({
        computeScopes: mockComputeScopes,
        extractRequestedClaims: mockExtractRequestedClaims,
      });

      const result = buildAuthorizationPageModel(mockAuthzRes, mockUser);

      expect(result).toEqual({
        authorizationResponse: mockAuthzRes,
        serviceName: 'mockService',
        clientName: 'mockClient',
        description: 'mockDescription',
        logoUri: 'mockLogoUri',
        policyUri: 'mockPolicyUri',
        tosUri: 'mockTosUri',
        scopes: [{ name: 'scope1' }, { name: 'scope2' }],
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

      expect(mockComputeScopes).toHaveBeenCalledWith(
        mockAuthzRes.scopes,
        mockAuthzRes.dynamicScopes
      );

      expect(mockExtractRequestedClaims).toHaveBeenCalledWith(
        'mockIdTokenClaims'
      );
      expect(mockExtractRequestedClaims).toHaveBeenCalledWith(
        'mockUserInfoClaims'
      );
    });

    it('should handle missing optional fields gracefully', () => {
      const minimalAuthzRes: Partial<AuthorizationResponse> = {
        action: 'INTERACTION',
        service: {},
        client: {},
      };
      const mockComputeScopes = vi.fn(() => []);
      const mockExtractRequestedClaims = vi.fn(() => undefined);
      const buildAuthorizationPageModel = createBuildAuthorizationPageModel({
        computeScopes: mockComputeScopes,
        extractRequestedClaims: mockExtractRequestedClaims,
      });
      const result = buildAuthorizationPageModel(
        minimalAuthzRes as AuthorizationResponse,
        undefined
      );
      expect(result).toMatchObject({
        serviceName: undefined,
        clientName: undefined,
        description: undefined,
        logoUri: undefined,
        policyUri: undefined,
        tosUri: undefined,
        scopes: [],
        loginId: undefined,
        loginIdReadOnly: undefined,
        authorizationDetails: undefined,
        user: undefined,
        purpose: undefined,
        verifiedClaimsForIdToken: undefined,
        verifiedClaimsForUserInfo: undefined,
        identityAssuranceRequired: false,
        claimsForUserInfo: undefined,
      });
    });

    it('should handle empty arrays and strings', () => {
      const emptyAuthzRes: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: '' },
        client: { clientName: '' },
        scopes: [],
        dynamicScopes: [],
        subject: '',
        purpose: '',
        idTokenClaims: '',
        userInfoClaims: '',
        authorizationDetails: { elements: [] },
        claimsAtUserInfo: [],
      };
      const mockComputeScopes = vi.fn(() => []);
      const mockExtractRequestedClaims = vi.fn(() => undefined);
      const buildAuthorizationPageModel = createBuildAuthorizationPageModel({
        computeScopes: mockComputeScopes,
        extractRequestedClaims: mockExtractRequestedClaims,
      });
      const result = buildAuthorizationPageModel(emptyAuthzRes, undefined);
      expect(result.serviceName).toBe('');
      expect(result.clientName).toBe('');
      expect(result.scopes).toEqual([]);
      expect(result.loginId).toBe('');
      expect(result.purpose).toBe('');
      expect(result.authorizationDetails).toBe(
        JSON.stringify({ elements: [] })
      );
      expect(result.claimsForUserInfo).toEqual([]);
    });
  });

  describe('defaultBuildAuthorizationPageModel', () => {
    it('should handle undefined values correctly', () => {
      const partialAuthzRes: Partial<AuthorizationResponse> = {
        service: {},
        client: {},
        loginHint: 'mockLoginHint',
      };

      const result = defaultBuildAuthorizationPageModel(
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

    it('should handle invalid JSON in claims fields gracefully', () => {
      const authzRes: AuthorizationResponse = {
        action: 'INTERACTION',
        service: {},
        client: {},
        idTokenClaims: '{invalidJson}',
        userInfoClaims: '{invalidJson}',
      } as AuthorizationResponse;
      // Should not throw
      expect(() =>
        defaultBuildAuthorizationPageModel(authzRes, undefined)
      ).not.toThrow();
    });
  });
});
