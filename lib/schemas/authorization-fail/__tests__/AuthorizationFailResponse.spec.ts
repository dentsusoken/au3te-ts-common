import { describe, it, expect } from 'vitest';
import {
  authorizationFailResponseSchema,
  AuthorizationFailResponse,
} from '../AuthorizationFailResponse';

describe('authorizationFailResponseSchema', () => {
  describe('success cases', () => {
    it('should parse a valid response with all fields', () => {
      const validResponse: AuthorizationFailResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'LOCATION',
        responseContent: 'https://example.com/callback',
      };
      const result = authorizationFailResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    it('should parse a response with undefined responseContent', () => {
      const response: AuthorizationFailResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'BAD_REQUEST',
        responseContent: undefined,
      };
      const result = authorizationFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should parse a response omitting responseContent', () => {
      const response = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'FORM',
      };
      const result = authorizationFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should parse a response with only required fields', () => {
      const response = {
        resultCode: 'A000001',
        resultMessage: 'Error',
        action: 'INTERNAL_SERVER_ERROR',
      };
      const result = authorizationFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should parse a response omitting resultCode', () => {
      const response = {
        resultMessage: 'Success',
        action: 'LOCATION',
      };
      const result = authorizationFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should parse a response omitting resultMessage', () => {
      const response = {
        resultCode: 'A000000',
        action: 'LOCATION',
      };
      const result = authorizationFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });
  });

  describe('failure cases', () => {
    it('should fail for invalid action', () => {
      const invalidResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'INVALID_ACTION',
      };
      const result = authorizationFailResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_enum_value');
      }
    });

    it('should fail when action is missing', () => {
      const invalidResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
      };
      const result = authorizationFailResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['action']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when resultCode is not a string', () => {
      const invalidResponse = {
        resultCode: 123,
        resultMessage: 'Success',
        action: 'LOCATION',
      };
      const result = authorizationFailResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['resultCode']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when responseContent is not a string or undefined', () => {
      const invalidResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'LOCATION',
        responseContent: 123,
      };
      const result = authorizationFailResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['responseContent']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer AuthorizationFailResponse type', () => {
      const res: AuthorizationFailResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'LOCATION',
        responseContent: 'https://example.com/callback',
      };
      const result = authorizationFailResponseSchema.parse(res);
      expect(result).toEqual(res);
      expect(typeof result.resultCode).toBe('string');
      expect(typeof result.resultMessage).toBe('string');
      expect(typeof result.action).toBe('string');
      expect(typeof result.responseContent).toBe('string');
    });

    it('should allow undefined responseContent in type inference', () => {
      const res: AuthorizationFailResponse = {
        resultCode: 'A000000',
        resultMessage: 'Success',
        action: 'FORM',
      };
      const result = authorizationFailResponseSchema.parse(res);
      expect(result.responseContent).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const res: AuthorizationFailResponse = {
        resultCode: longString,
        resultMessage: longString,
        action: 'FORM',
        responseContent: longString,
      };
      const result = authorizationFailResponseSchema.parse(res);
      expect(result.resultCode).toBe(longString);
      expect(result.resultMessage).toBe(longString);
      expect(result.responseContent).toBe(longString);
    });

    it('should handle special characters in strings', () => {
      const res: AuthorizationFailResponse = {
        resultCode: 'A!@#$%^&*()',
        resultMessage: 'Success!@#$%^&*()',
        action: 'FORM',
        responseContent: 'https://example.com/callback?foo=bar&baz=qux',
      };
      const result = authorizationFailResponseSchema.parse(res);
      expect(result.resultCode).toBe('A!@#$%^&*()');
      expect(result.resultMessage).toBe('Success!@#$%^&*()');
      expect(result.responseContent).toBe(
        'https://example.com/callback?foo=bar&baz=qux'
      );
    });
  });
});
