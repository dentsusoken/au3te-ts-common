import { describe, it, expect } from 'vitest';
import {
  authorizationTicketInfoSchema,
  AuthorizationTicketInfo,
  nullableButOptionalAuthorizationTicketInfoSchema,
} from './AuthorizationTicketInfo';

describe('Authorization Ticket Info Schemas and Types', () => {
  describe('authorizationTicketInfoSchema', () => {
    it('validates a correct authorization ticket info object', () => {
      const validInfo: AuthorizationTicketInfo = {
        context: 'some-context',
      };
      expect(() =>
        authorizationTicketInfoSchema.parse(validInfo)
      ).not.toThrow();
    });

    it('allows null context', () => {
      const nullContextInfo = {
        context: null,
      };
      expect(() =>
        authorizationTicketInfoSchema.parse(nullContextInfo)
      ).not.toThrow();
    });

    it('allows undefined context', () => {
      const undefinedContextInfo: AuthorizationTicketInfo = {};
      expect(() =>
        authorizationTicketInfoSchema.parse(undefinedContextInfo)
      ).not.toThrow();
    });

    it('rejects non-string context', () => {
      const invalidInfo = {
        context: 123,
      };
      expect(() => authorizationTicketInfoSchema.parse(invalidInfo)).toThrow();
    });
  });

  describe('nullableButOptionalAuthorizationTicketInfoSchema', () => {
    it('allows AuthorizationTicketInfo', () => {
      const info: AuthorizationTicketInfo = {
        context: 'some-context',
      };
      expect(
        nullableButOptionalAuthorizationTicketInfoSchema.parse(info)
      ).toEqual(info);
    });

    it('allows undefined', () => {
      expect(
        nullableButOptionalAuthorizationTicketInfoSchema.parse(undefined)
      ).toBeUndefined();
    });

    it('treats null as undefined', () => {
      expect(
        nullableButOptionalAuthorizationTicketInfoSchema.parse(null)
      ).toBeUndefined();
    });
  });
});
