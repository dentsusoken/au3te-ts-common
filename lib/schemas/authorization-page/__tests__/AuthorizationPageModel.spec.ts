import { describe, it, expect } from 'vitest';
import { authorizationPageModelSchema } from '../AuthorizationPageModel';

describe('authorizationPageModelSchema', () => {
  // Create a mock authorization response with required fields
  const mockAuthorizationResponse = {
    action: 'FORM' as const,
    responseContent: 'test',
    ticket: 'test-ticket',
  };

  it('should validate a complete valid object', () => {
    const validModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: 'Test Service',
      clientName: 'Test Client',
      description: 'Test Description',
      logoUri: 'https://example.com/logo.png',
      clientUri: 'https://example.com',
      policyUri: 'https://example.com/policy',
      tosUri: 'https://example.com/tos',
      scopes: [
        { name: 'openid', description: 'OpenID Connect scope' },
        { name: 'profile', description: 'Profile information' },
      ],
      loginId: 'testuser',
      loginIdReadOnly: 'readonly',
      user: {
        subject: 'test-subject',
        name: 'Test User',
        email: 'test@example.com',
      },
      authorizationDetails: '{"details": "test"}',
      purpose: 'test purpose',
      verifiedClaimsForIdToken: [{ key: 'test', value: 'test' }],
      allVerifiedClaimsForIdTokenRequested: true,
      verifiedClaimsForUserInfo: [{ key: 'test', value: 'test' }],
      allVerifiedClaimsForUserInfoRequested: false,
      identityAssuranceRequired: true,
      oldIdaFormatUsed: false,
      claimsForIdToken: ['claim1', 'claim2'],
      claimsForUserInfo: ['claim3', 'claim4'],
    };

    const result = authorizationPageModelSchema.parse(validModel);
    expect(result).toEqual(validModel);
  });

  it('should validate with only required fields', () => {
    const minimalModel = {
      authorizationResponse: mockAuthorizationResponse,
    };

    const result = authorizationPageModelSchema.parse(minimalModel);
    expect(result).toEqual(minimalModel);
  });

  it('should allow null values for nullish fields', () => {
    const nullModel = {
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

    const result = authorizationPageModelSchema.parse(nullModel);
    expect(result).toEqual(nullModel);
  });

  it('should allow undefined values for nullish fields', () => {
    const undefinedModel = {
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

    const result = authorizationPageModelSchema.parse(undefinedModel);
    expect(result).toEqual(undefinedModel);
  });

  it('should validate arrays with correct element types', () => {
    const arrayModel = {
      authorizationResponse: mockAuthorizationResponse,
      scopes: [
        { name: 'scope1', description: 'test' },
        { name: 'scope2', defaultEntry: true },
      ],
      verifiedClaimsForIdToken: [{ key: 'test', value: 'test' }],
      verifiedClaimsForUserInfo: [{ key: 'test', value: 'test' }],
      claimsForIdToken: ['claim1', 'claim2'],
      claimsForUserInfo: ['claim3'],
    };

    const result = authorizationPageModelSchema.parse(arrayModel);
    expect(result).toEqual(arrayModel);
  });

  it('should validate empty arrays', () => {
    const emptyArrayModel = {
      authorizationResponse: mockAuthorizationResponse,
      scopes: [],
      verifiedClaimsForIdToken: [],
      verifiedClaimsForUserInfo: [],
      claimsForIdToken: [],
      claimsForUserInfo: [],
    };

    const result = authorizationPageModelSchema.parse(emptyArrayModel);
    expect(result).toEqual(emptyArrayModel);
  });

  it('should validate complex user object', () => {
    const complexUserModel = {
      authorizationResponse: mockAuthorizationResponse,
      user: {
        subject: 'test-subject',
        loginId: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        phoneNumberVerified: true,
        emailVerified: false,
        givenName: 'Test',
        familyName: 'User',
        nickname: 'testuser',
        profile: 'https://example.com/profile',
        picture: 'https://example.com/picture.jpg',
        website: 'https://example.com',
        gender: 'male',
        zoneinfo: 'America/New_York',
        locale: 'en-US',
        preferredUsername: 'testuser',
        birthdate: '1990-01-01',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    const result = authorizationPageModelSchema.parse(complexUserModel);
    expect(result).toEqual(complexUserModel);
  });

  it('should reject missing required authorizationResponse', () => {
    const invalidModel = {
      serviceName: 'Test Service',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid authorizationResponse', () => {
    const invalidModel = {
      authorizationResponse: 'invalid',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid types for string fields', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: 123,
      clientName: true,
      description: {},
      logoUri: [],
      loginId: {},
      authorizationDetails: 456,
      purpose: null,
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid types for boolean fields', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      allVerifiedClaimsForIdTokenRequested: 'true',
      allVerifiedClaimsForUserInfoRequested: 1,
      identityAssuranceRequired: 'false',
      oldIdaFormatUsed: {},
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid scopes array', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      scopes: 'not-array',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid scope objects', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      scopes: [
        { name: 123 }, // invalid type for name
        { description: true }, // invalid type for description
      ],
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid verifiedClaimsForIdToken array', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      verifiedClaimsForIdToken: 'not-array',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid pair objects in verifiedClaimsForIdToken', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      verifiedClaimsForIdToken: [
        { key: 123 }, // invalid type for key
        { value: true }, // invalid type for value
      ],
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid verifiedClaimsForUserInfo array', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      verifiedClaimsForUserInfo: 'not-array',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid pair objects in verifiedClaimsForUserInfo', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      verifiedClaimsForUserInfo: [
        { key: 123 }, // invalid type for key
        { value: true }, // invalid type for value
      ],
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid claimsForIdToken array', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      claimsForIdToken: 'not-array',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid string elements in claimsForIdToken', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      claimsForIdToken: [123, 456], // array of numbers is invalid
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid claimsForUserInfo array', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      claimsForUserInfo: 'not-array',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid string elements in claimsForUserInfo', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      claimsForUserInfo: [true, false], // array of booleans is invalid
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject invalid user object', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      user: 'not-user',
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject user object with missing required subject', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should reject user object with invalid field types', () => {
    const invalidModel = {
      authorizationResponse: mockAuthorizationResponse,
      user: {
        subject: 'test-subject',
        name: 123, // invalid type
        email: true, // invalid type
        phoneNumberVerified: 'true', // invalid type
      },
    };

    const result = authorizationPageModelSchema.safeParse(invalidModel);
    expect(result.success).toBe(false);
  });

  it('should validate mixed valid and nullish fields', () => {
    const mixedModel = {
      authorizationResponse: mockAuthorizationResponse,
      serviceName: 'Test Service',
      clientName: null,
      description: undefined,
      logoUri: 'https://example.com/logo.png',
      clientUri: null,
      scopes: [{ name: 'openid', description: 'OpenID Connect scope' }],
      loginId: undefined,
      user: {
        subject: 'test-subject',
        name: 'Test User',
        email: null,
      },
      allVerifiedClaimsForIdTokenRequested: true,
      verifiedClaimsForUserInfo: null,
      claimsForIdToken: ['claim1'],
      claimsForUserInfo: undefined,
    };

    const result = authorizationPageModelSchema.parse(mixedModel);
    expect(result).toEqual(mixedModel);
  });

  it('should validate complex real-world example', () => {
    const realWorldModel = {
      authorizationResponse: {
        action: 'FORM',
        responseContent: '<html>...</html>',
        ticket: 'ticket-12345',
      },
      serviceName: 'My OAuth Service',
      clientName: 'My Client App',
      description: 'A test client application for OAuth 2.0',
      logoUri: 'https://example.com/client-logo.png',
      clientUri: 'https://example.com/client',
      policyUri: 'https://example.com/client/policy',
      tosUri: 'https://example.com/client/tos',
      scopes: [
        { name: 'openid', description: 'OpenID Connect authentication' },
        { name: 'profile', description: 'Access to profile information' },
        { name: 'email', description: 'Access to email address' },
      ],
      loginId: 'user@example.com',
      loginIdReadOnly: 'readonly',
      user: {
        subject: 'user-12345',
        loginId: 'user@example.com',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1-555-123-4567',
        phoneNumberVerified: true,
        emailVerified: true,
        givenName: 'John',
        familyName: 'Doe',
        nickname: 'johndoe',
        profile: 'https://example.com/profile/johndoe',
        picture: 'https://example.com/pictures/johndoe.jpg',
        website: 'https://johndoe.com',
        gender: 'male',
        zoneinfo: 'America/New_York',
        locale: 'en-US',
        preferredUsername: 'johndoe',
        birthdate: '1990-01-15',
        updatedAt: '2023-12-01T10:30:00Z',
      },
      authorizationDetails:
        '{"type":"payment_initiation","locations":["https://example.com/payment"]}',
      purpose: 'Payment initiation for online purchase',
      verifiedClaimsForIdToken: [
        { key: 'verification_status', value: 'verified' },
        { key: 'identity_assurance_level', value: 'substantial' },
      ],
      allVerifiedClaimsForIdTokenRequested: false,
      verifiedClaimsForUserInfo: [
        { key: 'verification_status', value: 'verified' },
        { key: 'identity_assurance_level', value: 'substantial' },
        { key: 'document_type', value: 'passport' },
      ],
      allVerifiedClaimsForUserInfoRequested: true,
      identityAssuranceRequired: true,
      oldIdaFormatUsed: false,
      claimsForIdToken: ['sub', 'name', 'email', 'email_verified'],
      claimsForUserInfo: [
        'sub',
        'name',
        'email',
        'email_verified',
        'phone_number',
        'phone_number_verified',
      ],
    };

    const result = authorizationPageModelSchema.parse(realWorldModel);
    expect(result).toEqual(realWorldModel);
  });
});
