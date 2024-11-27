import { describe, it, expect } from 'vitest';
import {
  authorizationPageModelSchema,
  AuthorizationPageModel,
} from './AuthorizationPageModel';

describe('authorizationPageModelSchema', () => {
  // Create a mock authorization response with required fields
  const mockAuthorizationResponse = {
    action: 'FORM' as const,
    responseContent: 'test',
    ticket: 'test-ticket',
  } as unknown as AuthorizationPageModel['authorizationResponse'];

  it('should validate a complete valid object', () => {
    const validModel: AuthorizationPageModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: 'Test Service',
      clientName: 'Test Client',
      description: 'Test Description',
      logoUri: 'https://example.com/logo.png',
      clientUri: 'https://example.com',
      policyUri: 'https://example.com/policy',
      tosUri: 'https://example.com/tos',
      // Cast empty array to required type using type assertion
      scopes: [] as unknown as AuthorizationPageModel['scopes'],
      loginId: 'testuser',
      loginIdReadOnly: 'readonly',
      // Cast empty object to required type using type assertion
      user: {
        subject: 'test-subject',
      } as unknown as AuthorizationPageModel['user'],
      authorizationDetails: '{"details": "test"}',
      purpose: 'test purpose',
      // Cast empty arrays to required type using type assertion
      verifiedClaimsForIdToken: [
        { key: 'test', value: 'test' },
      ] as unknown as AuthorizationPageModel['verifiedClaimsForIdToken'],
      allVerifiedClaimsForIdTokenRequested: true,
      verifiedClaimsForUserInfo: [
        { key: 'test', value: 'test' },
      ] as unknown as AuthorizationPageModel['verifiedClaimsForUserInfo'],
      allVerifiedClaimsForUserInfoRequested: false,
      identityAssuranceRequired: true,
      oldIdaFormatUsed: false,
      claimsForIdToken: ['claim1', 'claim2'],
      claimsForUserInfo: ['claim3', 'claim4'],
    };

    expect(() => authorizationPageModelSchema.parse(validModel)).not.toThrow();
  });

  it('should validate with only required fields', () => {
    const minimalModel: AuthorizationPageModel = {
      authorizationResponse: mockAuthorizationResponse,
    };

    expect(() =>
      authorizationPageModelSchema.parse(minimalModel)
    ).not.toThrow();
  });

  it('should allow null values for nullish fields', () => {
    const nullModel: AuthorizationPageModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: null,
      clientName: null,
      description: null,
      logoUri: null,
      clientUri: null,
      policyUri: null,
      tosUri: null,
      scopes: null,
      loginId: null,
      loginIdReadOnly: null,
      user: null,
      authorizationDetails: null,
      purpose: null,
      verifiedClaimsForIdToken: null,
      allVerifiedClaimsForIdTokenRequested: null,
      verifiedClaimsForUserInfo: null,
      allVerifiedClaimsForUserInfoRequested: null,
      identityAssuranceRequired: null,
      oldIdaFormatUsed: null,
      claimsForIdToken: null,
      claimsForUserInfo: null,
    };

    expect(() => authorizationPageModelSchema.parse(nullModel)).not.toThrow();
  });

  it('should allow undefined values for nullish fields', () => {
    const undefinedModel: AuthorizationPageModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: undefined,
      clientName: undefined,
      description: undefined,
      logoUri: undefined,
      clientUri: undefined,
      policyUri: undefined,
      tosUri: undefined,
      scopes: undefined,
      loginId: undefined,
      loginIdReadOnly: undefined,
      user: undefined,
      authorizationDetails: undefined,
      purpose: undefined,
      verifiedClaimsForIdToken: undefined,
      allVerifiedClaimsForIdTokenRequested: undefined,
      verifiedClaimsForUserInfo: undefined,
      allVerifiedClaimsForUserInfoRequested: undefined,
      identityAssuranceRequired: undefined,
      oldIdaFormatUsed: undefined,
      claimsForIdToken: undefined,
      claimsForUserInfo: undefined,
    };

    expect(() =>
      authorizationPageModelSchema.parse(undefinedModel)
    ).not.toThrow();
  });

  it('should reject invalid types', () => {
    const invalidModel = {
      // Invalid types for each field
      authorizationResponse: 'invalid', // string is invalid
      serviceName: 123, // number is invalid
      clientName: true, // boolean is invalid
      description: {}, // object is invalid
      logoUri: [], // array is invalid
      scopes: 'not-array', // string is invalid
      loginId: {}, // object is invalid
      user: 'not-user', // string is invalid
      allVerifiedClaimsForIdTokenRequested: 'true', // string is invalid
      claimsForIdToken: 'not-array', // string is invalid
      claimsForUserInfo: [123, 456], // array of numbers is invalid
    };

    expect(() => authorizationPageModelSchema.parse(invalidModel)).toThrow();
  });

  it('should validate arrays with correct element types', () => {
    const arrayModel: AuthorizationPageModel = {
      authorizationResponse: mockAuthorizationResponse,
      scopes: [
        { name: 'scope1', description: 'test' },
      ] as unknown as AuthorizationPageModel['scopes'],
      verifiedClaimsForIdToken: [
        { key: 'test', value: 'test' },
      ] as unknown as AuthorizationPageModel['verifiedClaimsForIdToken'],
      verifiedClaimsForUserInfo: [
        { key: 'test', value: 'test' },
      ] as unknown as AuthorizationPageModel['verifiedClaimsForUserInfo'],
      claimsForIdToken: ['claim1', 'claim2'],
      claimsForUserInfo: ['claim3'],
    };

    expect(() => authorizationPageModelSchema.parse(arrayModel)).not.toThrow();
  });
});
