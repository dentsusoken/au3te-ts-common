import { describe, it, expect } from 'vitest';
import {
  authorizationTicketInfoSchema,
  AuthorizationTicketInfo,
} from '../AuthorizationTicketInfo';

describe('Authorization Ticket Info Schemas and Types', () => {
  describe('authorizationTicketInfoSchema', () => {
    it('should validate a correct authorization ticket info object', () => {
      const validInfo: AuthorizationTicketInfo = {
        context: 'some-context',
      };

      const result = authorizationTicketInfoSchema.parse(validInfo);
      expect(result).toEqual(validInfo);
    });

    it('should allow null context', () => {
      const nullContextInfo = {
        context: null,
      };

      const result = authorizationTicketInfoSchema.parse(nullContextInfo);
      expect(result).toEqual(nullContextInfo);
    });

    it('should allow undefined context', () => {
      const undefinedContextInfo: AuthorizationTicketInfo = {};

      const result = authorizationTicketInfoSchema.parse(undefinedContextInfo);
      expect(result).toEqual(undefinedContextInfo);
    });

    it('should reject non-string context', () => {
      const invalidInfo = {
        context: 123,
      };

      const result = authorizationTicketInfoSchema.safeParse(invalidInfo);
      expect(result.success).toBe(false);
    });

    it('should reject non-object values', () => {
      const invalidValues = [
        'not an object',
        123,
        true,
        ['array'],
        null,
        undefined,
      ];

      invalidValues.forEach((value) => {
        const result = authorizationTicketInfoSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof authorizationTicketInfoSchema._type;
      type ExpectedType = AuthorizationTicketInfo;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
