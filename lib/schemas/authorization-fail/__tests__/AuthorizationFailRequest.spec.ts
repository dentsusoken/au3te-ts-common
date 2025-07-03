import { describe, it, expect } from 'vitest';
import {
  authorizationFailRequestSchema,
  AuthorizationFailRequest,
} from '../AuthorizationFailRequest';

describe('authorizationFailRequestSchema', () => {
  describe('success cases', () => {
    it('should parse a valid request with all fields', () => {
      const validRequest: AuthorizationFailRequest = {
        reason: 'UNKNOWN',
        ticket: 'some-ticket',
        description: 'Some description',
      };
      const result = authorizationFailRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should parse a request with null values for optional fields', () => {
      const request = {
        reason: 'NOT_LOGGED_IN',
        ticket: null,
        description: null,
      };
      const parsed = authorizationFailRequestSchema.parse(request);
      expect(parsed).toEqual({
        reason: 'NOT_LOGGED_IN',
        ticket: null,
        description: null,
      });
    });

    it('should parse a request omitting optional fields', () => {
      const request = {
        reason: 'NOT_LOGGED_IN',
      };
      const parsed = authorizationFailRequestSchema.parse(request);
      expect(parsed).toEqual({
        reason: 'NOT_LOGGED_IN',
        ticket: undefined,
        description: undefined,
      });
    });

    it('should parse a request with only required field', () => {
      const request = { reason: 'EXCEEDS_MAX_AGE' };
      const parsed = authorizationFailRequestSchema.parse(request);
      expect(parsed).toEqual({
        reason: 'EXCEEDS_MAX_AGE',
        ticket: undefined,
        description: undefined,
      });
    });
  });

  describe('failure cases', () => {
    it('should fail for invalid reason', () => {
      const invalidRequest = {
        reason: 'INVALID_REASON',
        ticket: 'some-ticket',
      };
      const result = authorizationFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['reason']);
        expect(result.error.issues[0].code).toBe('invalid_enum_value');
      }
    });

    it('should fail when reason is missing', () => {
      const invalidRequest = {
        ticket: 'some-ticket',
      };
      const result = authorizationFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['reason']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when reason is null', () => {
      const invalidRequest = {
        reason: null,
      };
      const result = authorizationFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['reason']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when ticket is not a string or null/undefined', () => {
      const invalidRequest = {
        reason: 'UNKNOWN',
        ticket: 123,
      };
      const result = authorizationFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['ticket']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when description is not a string or null/undefined', () => {
      const invalidRequest = {
        reason: 'UNKNOWN',
        description: {},
      };
      const result = authorizationFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['description']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer AuthorizationFailRequest type', () => {
      const req: AuthorizationFailRequest = {
        reason: 'NOT_LOGGED_IN',
        ticket: 'ticket-123',
        description: 'desc',
      };
      const result = authorizationFailRequestSchema.parse(req);
      expect(result).toEqual(req);
      expect(typeof result.reason).toBe('string');
      expect(typeof result.ticket).toBe('string');
      expect(typeof result.description).toBe('string');
    });

    it('should allow undefined optional fields in type inference', () => {
      const req: AuthorizationFailRequest = {
        reason: 'DENIED',
      };
      const result = authorizationFailRequestSchema.parse(req);
      expect(result.reason).toBe('DENIED');
      expect(result.ticket).toBeUndefined();
      expect(result.description).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const req: AuthorizationFailRequest = {
        reason: 'DENIED',
        ticket: longString,
        description: longString,
      };
      const result = authorizationFailRequestSchema.parse(req);
      expect(result.ticket).toBe(longString);
      expect(result.description).toBe(longString);
    });

    it('should handle special characters in strings', () => {
      const req: AuthorizationFailRequest = {
        reason: 'DENIED',
        ticket: 'ticket!@#$%^&*()',
        description: 'desc!@#$%^&*()',
      };
      const result = authorizationFailRequestSchema.parse(req);
      expect(result.ticket).toBe('ticket!@#$%^&*()');
      expect(result.description).toBe('desc!@#$%^&*()');
    });
  });
});
