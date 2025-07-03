import { describe, it, expect } from 'vitest';
import {
  authorizationIssueResponseSchema,
  AuthorizationIssueResponse,
} from '../AuthorizationIssueResponse';

describe('authorizationIssueResponseSchema', () => {
  describe('success cases', () => {
    it('should parse a valid response with all fields', () => {
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
        ticketInfo: undefined,
      };
      const result = authorizationIssueResponseSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('should parse a minimal response with only required fields', () => {
      const minimalData: AuthorizationIssueResponse = {
        action: 'BAD_REQUEST',
      };
      const result = authorizationIssueResponseSchema.parse(minimalData);
      expect(result).toEqual(minimalData);
    });

    it('should parse a response with null and undefined optional fields', () => {
      const dataWithNulls: AuthorizationIssueResponse = {
        action: 'FORM',
        responseContent: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        accessTokenDuration: null,
        idToken: null,
        authorizationCode: null,
        jwtAccessToken: null,
        ticketInfo: null,
        resultCode: null,
        resultMessage: null,
      };
      const result = authorizationIssueResponseSchema.parse(dataWithNulls);
      expect(result).toEqual(dataWithNulls);
    });
  });

  describe('failure cases', () => {
    it('should fail for invalid action', () => {
      const invalidData = {
        action: 'INVALID_ACTION',
      };
      const result = authorizationIssueResponseSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_enum_value');
      }
    });

    it('should fail for wrong types', () => {
      const wrongTypeData = {
        action: 'LOCATION',
        accessTokenExpiresAt: 'not a number',
      };
      const result = authorizationIssueResponseSchema.safeParse(wrongTypeData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['accessTokenExpiresAt']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail if required fields are missing', () => {
      const incompleteData = {
        responseContent: 'Some content',
      };
      const result = authorizationIssueResponseSchema.safeParse(incompleteData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer AuthorizationIssueResponse type', () => {
      const res: AuthorizationIssueResponse = {
        action: 'LOCATION',
        resultCode: 'A000',
        resultMessage: 'Success',
        accessToken: 'access_token_123',
        accessTokenExpiresAt: 1234567890,
        accessTokenDuration: 3600,
        idToken: 'id_token_456',
        authorizationCode: 'auth_code_789',
        jwtAccessToken: 'jwt_token_101112',
        ticketInfo: undefined,
      };
      const result = authorizationIssueResponseSchema.parse(res);
      expect(result).toEqual(res);
      expect(typeof result.action).toBe('string');
      expect(typeof result.resultCode).toBe('string');
      expect(typeof result.resultMessage).toBe('string');
      expect(typeof result.accessToken).toBe('string');
      expect(typeof result.accessTokenExpiresAt).toBe('number');
      expect(typeof result.accessTokenDuration).toBe('number');
      expect(typeof result.idToken).toBe('string');
      expect(typeof result.authorizationCode).toBe('string');
      expect(typeof result.jwtAccessToken).toBe('string');
    });

    it('should allow undefined optional fields in type inference', () => {
      const res: AuthorizationIssueResponse = {
        action: 'FORM',
      };
      const result = authorizationIssueResponseSchema.parse(res);
      expect(result.action).toBe('FORM');
      expect(result.resultCode).toBeUndefined();
      expect(result.resultMessage).toBeUndefined();
      expect(result.accessToken).toBeUndefined();
      expect(result.accessTokenExpiresAt).toBeUndefined();
      expect(result.accessTokenDuration).toBeUndefined();
      expect(result.idToken).toBeUndefined();
      expect(result.authorizationCode).toBeUndefined();
      expect(result.jwtAccessToken).toBeUndefined();
      expect(result.ticketInfo).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const res: AuthorizationIssueResponse = {
        action: 'LOCATION',
        resultCode: longString,
        resultMessage: longString,
        accessToken: longString,
        idToken: longString,
        authorizationCode: longString,
        jwtAccessToken: longString,
        responseContent: longString,
      };
      const result = authorizationIssueResponseSchema.parse(res);
      expect(result.resultCode).toBe(longString);
      expect(result.resultMessage).toBe(longString);
      expect(result.accessToken).toBe(longString);
      expect(result.idToken).toBe(longString);
      expect(result.authorizationCode).toBe(longString);
      expect(result.jwtAccessToken).toBe(longString);
      expect(result.responseContent).toBe(longString);
    });

    it('should handle special characters in strings', () => {
      const res: AuthorizationIssueResponse = {
        action: 'FORM',
        resultCode: 'A!@#$%^&*()',
        resultMessage: 'Success!@#$%^&*()',
        accessToken: 'token!@#$%^&*()',
        idToken: 'id!@#$%^&*()',
        authorizationCode: 'auth!@#$%^&*()',
        jwtAccessToken: 'jwt!@#$%^&*()',
        responseContent: 'content!@#$%^&*()',
      };
      const result = authorizationIssueResponseSchema.parse(res);
      expect(result.resultCode).toBe('A!@#$%^&*()');
      expect(result.resultMessage).toBe('Success!@#$%^&*()');
      expect(result.accessToken).toBe('token!@#$%^&*()');
      expect(result.idToken).toBe('id!@#$%^&*()');
      expect(result.authorizationCode).toBe('auth!@#$%^&*()');
      expect(result.jwtAccessToken).toBe('jwt!@#$%^&*()');
      expect(result.responseContent).toBe('content!@#$%^&*()');
    });
  });
});
