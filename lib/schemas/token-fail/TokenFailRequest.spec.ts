import { describe, expect, it } from 'vitest';
import {
  tokenFailRequestSchema,
  type TokenFailRequest,
} from './TokenFailRequest';

describe('TokenFailRequest', () => {
  it('should accept valid token fail request with required fields', () => {
    const validRequest: TokenFailRequest = {
      ticket: 'ticket123',
      reason: 'UNKNOWN',
    };

    const result = tokenFailRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should reject request without required fields', () => {
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

  it('should accept all valid reason values', () => {
    const reasons = [
      'UNKNOWN',
      'INVALID_RESOURCE_OWNER_CREDENTIALS',
      'INVALID_TARGET',
    ];

    reasons.forEach((reason) => {
      const request: TokenFailRequest = {
        ticket: 'ticket123',
        reason: reason as TokenFailRequest['reason'],
      };

      const result = tokenFailRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.reason).toBe(reason);
      }
    });
  });

  it('should reject invalid reason values', () => {
    const request = {
      ticket: 'ticket123',
      reason: 'INVALID_REASON',
    };

    const result = tokenFailRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject invalid property types', () => {
    const invalidTypes = {
      ticket: 123, // should be string
      reason: true, // should be string enum
    };

    const result = tokenFailRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should reject additional properties', () => {
    const requestWithExtra = {
      ticket: 'ticket123',
      reason: 'UNKNOWN',
      extraProperty: 'should not be here',
    };

    const result = tokenFailRequestSchema.safeParse(requestWithExtra);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty('extraProperty');
    }
  });
});
