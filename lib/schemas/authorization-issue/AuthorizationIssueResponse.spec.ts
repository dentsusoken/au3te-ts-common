import { describe, it, expect } from 'vitest';
import {
  authorizationIssueResponseSchema,
  AuthorizationIssueResponse,
} from './AuthorizationIssueResponse';

describe('authorizationIssueResponseSchema', () => {
  // Test for valid data
  it('should validate correct data', () => {
    const validData: AuthorizationIssueResponse = {
      resultCode: 'A000',
      resultMessage: 'Success',
      action: 'LOCATION',
      responseContent: 'Some content',
      accessToken: 'access_token_123',
      accessTokenExpiresAt: 1234567890,
      accessTokenDuration: 3600,
      idToken: 'id_token_456',
      authorizationCode: 'auth_code_789',
      jwtAccessToken: 'jwt_token_101112',
      ticketInfo: {
        // Add properties as per AuthorizationTicketInfo schema
      },
    };

    const result = authorizationIssueResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  // Test for invalid action
  it('should reject invalid action', () => {
    const invalidData = {
      action: 'INVALID_ACTION',
      // ... other required fields
    };

    const result = authorizationIssueResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  // Test for optional fields
  it('should allow optional fields to be undefined', () => {
    const minimalData = {
      action: 'BAD_REQUEST',
      // ... other required fields
    };

    const result = authorizationIssueResponseSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  // Test for nullable but optional fields
  it('should allow nullable but optional fields to be null', () => {
    const dataWithNulls = {
      action: 'FORM',
      responseContent: null,
      accessToken: null,
      // ... other fields
    };

    const result = authorizationIssueResponseSchema.safeParse(dataWithNulls);
    expect(result.success).toBe(true);
  });

  // Test for type checking
  it('should reject wrong types', () => {
    const wrongTypeData = {
      action: 'LOCATION',
      accessTokenExpiresAt: 'not a number',
      // ... other required fields
    };

    const result = authorizationIssueResponseSchema.safeParse(wrongTypeData);
    expect(result.success).toBe(false);
  });

  // Test for required fields
  it('should reject if required fields are missing', () => {
    const incompleteData = {
      // Missing 'action' field
      responseContent: 'Some content',
    };

    const result = authorizationIssueResponseSchema.safeParse(incompleteData);
    expect(result.success).toBe(false);
  });
});
