import { describe, expect, it } from 'vitest';
import {
  tokenFailResponseSchema,
  type TokenFailResponse,
} from '../TokenFailResponse';

describe('TokenFailResponse', () => {
  describe('success cases', () => {
    it('should parse valid token fail response with required fields', () => {
      const validResponse: TokenFailResponse = {
        action: 'BAD_REQUEST',
        responseContent: '{"error": "invalid_request"}',
      };
      const result = tokenFailResponseSchema.parse(validResponse);
      expect(result).toEqual(validResponse);
    });

    it('should parse response with INTERNAL_SERVER_ERROR action', () => {
      const response: TokenFailResponse = {
        action: 'INTERNAL_SERVER_ERROR',
        responseContent: '{"error": "server_error"}',
      };
      const result = tokenFailResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should parse response with all valid action values', () => {
      const actions: TokenFailResponse['action'][] = [
        'INTERNAL_SERVER_ERROR',
        'BAD_REQUEST',
      ];
      actions.forEach((action) => {
        const response: TokenFailResponse = {
          action,
          responseContent: '{"error": "err"}',
        };
        const result = tokenFailResponseSchema.parse(response);
        expect(result.action).toBe(action);
      });
    });

    it('should parse response without optional responseContent', () => {
      const response = {
        action: 'BAD_REQUEST',
      };
      const result = tokenFailResponseSchema.parse(response);
      expect(result.responseContent).toBeUndefined();
    });
  });

  describe('failure cases', () => {
    it('should fail when required action is missing', () => {
      const invalidResponse = {
        responseContent: '{"error": "invalid_request"}',
      };
      const result = tokenFailResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid action values', () => {
      const invalidActions = [
        'INVALID_ACTION',
        'bad_request',
        '',
        123,
        null,
        undefined,
        {},
        [],
      ];
      invalidActions.forEach((action) => {
        const response = {
          action,
          responseContent: '{"error": "invalid_request"}',
        };
        const result = tokenFailResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
      });
    });

    it('should fail for invalid responseContent types', () => {
      const invalidResponses = [
        {
          action: 'BAD_REQUEST',
          responseContent: 123,
        },
        {
          action: 'BAD_REQUEST',
          responseContent: {},
        },
        {
          action: 'BAD_REQUEST',
          responseContent: [],
        },
      ];
      invalidResponses.forEach((response) => {
        const result = tokenFailResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
      });
    });

    it('should ignore additional properties', () => {
      const responseWithExtra = {
        action: 'BAD_REQUEST',
        responseContent: '{"error": "invalid_request"}',
        extraProperty: 'should not be here',
      };
      const result = tokenFailResponseSchema.safeParse(responseWithExtra);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty('extraProperty');
        expect(result.data.action).toBe('BAD_REQUEST');
      }
    });
  });

  describe('edge cases', () => {
    it('should fail for null or undefined fields', () => {
      const nullResponse = { action: null, responseContent: null };
      const result = tokenFailResponseSchema.safeParse(nullResponse);
      expect(result.success).toBe(false);

      const undefinedResponse = {
        action: undefined,
        responseContent: undefined,
      };
      const result2 = tokenFailResponseSchema.safeParse(undefinedResponse);
      expect(result2.success).toBe(false);
    });

    it('should parse with empty string responseContent', () => {
      const response = { action: 'BAD_REQUEST', responseContent: '' };
      const result = tokenFailResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.responseContent).toBe('');
      }
    });

    it('should parse with long string values', () => {
      const longString = 'a'.repeat(1000);
      const response = { action: 'BAD_REQUEST', responseContent: longString };
      const result = tokenFailResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.responseContent).toBe(longString);
      }
    });
  });
});
