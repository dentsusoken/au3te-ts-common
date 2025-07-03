import { describe, it, expect } from 'vitest';
import {
  authorizationResponseSchema,
  AuthorizationResponse,
} from '../AuthorizationResponse';

describe('authorizationResponseSchema', () => {
  it('should accept a valid AuthorizationResponse object', () => {
    const validResponse: AuthorizationResponse = {
      action: 'LOCATION',
      responseContent: 'https://example.com/callback',
      service: { serviceName: 'TestService' },
      client: { clientName: 'TestClient' },
      maxAge: 3600,
      scopes: [{ name: 'read' }],
      dynamicScopes: [{ name: 'dynamic', value: 'dynamic:123' }],
      claims: { array: ['name', 'email'] },
      claimsAtUserInfo: { array: ['profile'] },
      acrs: { array: ['urn:mace:incommon:iap:silver'] },
      subject: 'user123',
      loginHint: 'john@example.com',
      prompts: ['login', 'consent'],
      idTokenClaims: '{"sub":"user123"}',
      authorizationDetails: {
        elements: [{ type: 'payment', actions: { array: ['initiate'] } }],
      },
      purpose: 'account linking',
      userInfoClaims: '{"given_name":"John"}',
      ticket: 'ticket123',
      claimsLocales: { array: ['en', 'fr'] },
      requestedClaimsForTx: { array: ['verified_claims'] },
      requestedVerifiedClaimsForTx: { array: ['name', 'birthdate'] },
    };
    const result = authorizationResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should accept a minimal valid AuthorizationResponse object', () => {
    const minimalResponse: AuthorizationResponse = {
      action: 'NO_INTERACTION',
    };
    const result = authorizationResponseSchema.safeParse(minimalResponse);
    expect(result.success).toBe(true);
  });

  it('should reject an object with invalid action', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
    };
    const result = authorizationResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should accept null values for optional fields', () => {
    const responseWithNulls = {
      action: 'FORM',
      responseContent: null,
      service: null,
      client: null,
      maxAge: null,
      scopes: null,
      dynamicScopes: null,
      claims: null,
      claimsAtUserInfo: null,
      acrs: null,
      subject: null,
      loginHint: null,
      prompts: null,
      idTokenClaims: null,
      authorizationDetails: null,
      purpose: null,
      userInfoClaims: null,
      ticket: null,
      claimsLocales: null,
      requestedClaimsForTx: null,
      requestedVerifiedClaimsForTx: null,
    };
    const result = authorizationResponseSchema.safeParse(responseWithNulls);
    expect(result.success).toBe(true);
  });

  it('should reject an object with invalid types', () => {
    const invalidResponse = {
      action: 'LOCATION',
      maxAge: 'not a number',
      scopes: 'not an array',
    };
    const result = authorizationResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should accept valid nested objects', () => {
    const responseWithNestedObjects: AuthorizationResponse = {
      action: 'INTERACTION',
      service: { serviceName: 'TestService' },
      client: { clientName: 'TestClient' },
      authorizationDetails: {
        elements: [{ type: 'payment', actions: { array: ['initiate'] } }],
      },
    };
    const result = authorizationResponseSchema.safeParse(
      responseWithNestedObjects
    );
    expect(result.success).toBe(true);
  });

  it('should handle requestedVerifiedClaimsForTx correctly', () => {
    const response: AuthorizationResponse = {
      action: 'INTERACTION',
      requestedVerifiedClaimsForTx: { array: ['name', 'birthdate'] },
    };
    const result = authorizationResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });
});
