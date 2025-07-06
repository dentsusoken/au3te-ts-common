import { describe, expect, it } from 'vitest';
import {
  tokenFailRequestSchema,
  type TokenFailRequest,
} from '../TokenFailRequest';

describe('TokenFailRequest', () => {
  describe('success cases', () => {
    it('should parse valid token fail request with required fields', () => {
      const validRequest: TokenFailRequest = {
        ticket: 'ticket123',
        reason: 'UNKNOWN',
      };
      const result = tokenFailRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should parse all valid reason values', () => {
      const reasons: TokenFailRequest['reason'][] = [
        'UNKNOWN',
        'INVALID_RESOURCE_OWNER_CREDENTIALS',
        'INVALID_TARGET',
      ];
      reasons.forEach((reason) => {
        const request: TokenFailRequest = {
          ticket: 'ticket123',
          reason,
        };
        const result = tokenFailRequestSchema.parse(request);
        expect(result.reason).toBe(reason);
      });
    });
  });

  describe('failure cases', () => {
    it('should fail when required fields are missing', () => {
      const invalidRequest = {};
      const result = tokenFailRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);

      const missingReason = { ticket: 'ticket123' };
      const result2 = tokenFailRequestSchema.safeParse(missingReason);
      expect(result2.success).toBe(false);

      const missingTicket = { reason: 'UNKNOWN' };
      const result3 = tokenFailRequestSchema.safeParse(missingTicket);
      expect(result3.success).toBe(false);
    });

    it('should fail for invalid reason values', () => {
      const request = {
        ticket: 'ticket123',
        reason: 'INVALID_REASON',
      };
      const result = tokenFailRequestSchema.safeParse(request);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid property types', () => {
      const invalidTypes = {
        ticket: 123, // should be string
        reason: true, // should be string enum
      };
      const result = tokenFailRequestSchema.safeParse(invalidTypes);
      expect(result.success).toBe(false);
    });

    it('should ignore additional properties', () => {
      const requestWithExtra = {
        ticket: 'ticket123',
        reason: 'UNKNOWN',
        extraProperty: 'should not be here',
      };
      const result = tokenFailRequestSchema.safeParse(requestWithExtra);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty('extraProperty');
        expect(result.data.ticket).toBe('ticket123');
        expect(result.data.reason).toBe('UNKNOWN');
      }
    });
  });

  describe('edge cases', () => {
    it('should fail for null or undefined fields', () => {
      const nullRequest = { ticket: null, reason: null };
      const result = tokenFailRequestSchema.safeParse(nullRequest);
      expect(result.success).toBe(false);

      const undefinedRequest = { ticket: undefined, reason: undefined };
      const result2 = tokenFailRequestSchema.safeParse(undefinedRequest);
      expect(result2.success).toBe(false);
    });

    it('should parse with empty string ticket (if allowed)', () => {
      const request = { ticket: '', reason: 'UNKNOWN' };
      const result = tokenFailRequestSchema.safeParse(request);
      // Zod string() allows empty string by default
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ticket).toBe('');
      }
    });

    it('should parse with long string values', () => {
      const longString = 'a'.repeat(1000);
      const request = { ticket: longString, reason: 'UNKNOWN' };
      const result = tokenFailRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ticket).toBe(longString);
      }
    });
  });
});
