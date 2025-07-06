import { describe, expect, it } from 'vitest';
import {
  tokenIssueRequestSchema,
  type TokenIssueRequest,
} from '../TokenIssueRequest';

describe('TokenIssueRequest', () => {
  describe('success cases', () => {
    it('should parse valid token issue request with required fields', () => {
      const validRequest: TokenIssueRequest = {
        ticket: 'ticket123',
        subject: 'user123',
      };
      const result = tokenIssueRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should parse token issue request with all fields', () => {
      const fullRequest: TokenIssueRequest = {
        ticket: 'ticket123',
        subject: 'user123',
        properties: [{ key: 'prop1', value: 'value1' }],
        jwtAtClaims: '{"sub":"user123","name":"John Doe"}',
        accessToken: 'custom-access-token',
        accessTokenDuration: 3600,
        refreshTokenDuration: 86400,
      };
      const result = tokenIssueRequestSchema.parse(fullRequest);
      expect(result).toEqual(fullRequest);
    });

    it('should parse request with optional fields', () => {
      const requestWithOptionals: TokenIssueRequest = {
        ticket: 'ticket123',
        subject: 'user123',
        properties: [{ key: 'prop1', value: 'value1' }],
        accessTokenDuration: 3600,
      };
      const result = tokenIssueRequestSchema.parse(requestWithOptionals);
      expect(result).toEqual(requestWithOptionals);
    });

    it('should parse request with null values for optional fields', () => {
      const requestWithNulls: TokenIssueRequest = {
        ticket: 'ticket123',
        subject: 'user123',
        properties: null,
        jwtAtClaims: null,
        accessToken: null,
        accessTokenDuration: null,
        refreshTokenDuration: null,
      };
      const result = tokenIssueRequestSchema.parse(requestWithNulls);
      expect(result.properties).toBeNull();
      expect(result.jwtAtClaims).toBeNull();
      expect(result.accessToken).toBeNull();
      expect(result.accessTokenDuration).toBeNull();
      expect(result.refreshTokenDuration).toBeNull();
    });

    it('should parse request with empty arrays for array fields', () => {
      const requestWithEmptyArrays: TokenIssueRequest = {
        ticket: 'ticket123',
        subject: 'user123',
        properties: [],
      };
      const result = tokenIssueRequestSchema.parse(requestWithEmptyArrays);
      expect(result.properties).toEqual([]);
    });

    it('should parse request with valid JWT claims format', () => {
      const validJwtClaims = {
        ticket: 'ticket123',
        subject: 'user123',
        jwtAtClaims: '{"sub":"user123","name":"John Doe"}',
      };
      const result = tokenIssueRequestSchema.parse(validJwtClaims);
      expect(result.jwtAtClaims).toBe('{"sub":"user123","name":"John Doe"}');
    });
  });

  describe('failure cases', () => {
    it('should fail when required fields are missing', () => {
      const invalidRequest = {};
      const result = tokenIssueRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);

      const missingSubject = { ticket: 'ticket123' };
      const result2 = tokenIssueRequestSchema.safeParse(missingSubject);
      expect(result2.success).toBe(false);

      const missingTicket = { subject: 'user123' };
      const result3 = tokenIssueRequestSchema.safeParse(missingTicket);
      expect(result3.success).toBe(false);
    });

    it('should fail for invalid property types', () => {
      const invalidTypes = {
        ticket: 123, // should be string
        subject: true, // should be string
        accessTokenDuration: '3600', // should be number
        refreshTokenDuration: '86400', // should be number
        properties: 'not-an-array', // should be array
      };
      const result = tokenIssueRequestSchema.safeParse(invalidTypes);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid JWT claims format', () => {
      const invalidJwtClaims = {
        ticket: 'ticket123',
        subject: 'user123',
        jwtAtClaims: 123, // should be string
      };
      const result = tokenIssueRequestSchema.safeParse(invalidJwtClaims);
      expect(result.success).toBe(false);
    });

    it('should fail for invalid properties array structure', () => {
      const invalidProperties = {
        ticket: 'ticket123',
        subject: 'user123',
        properties: [
          { key: 123, value: 'value1' }, // key should be string
          { key: 'key2', value: 456 }, // value should be string
        ],
      };
      const result = tokenIssueRequestSchema.safeParse(invalidProperties);
      expect(result.success).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should fail for null or undefined fields', () => {
      const nullRequest = { ticket: null, subject: null };
      const result = tokenIssueRequestSchema.safeParse(nullRequest);
      expect(result.success).toBe(false);

      const undefinedRequest = { ticket: undefined, subject: undefined };
      const result2 = tokenIssueRequestSchema.safeParse(undefinedRequest);
      expect(result2.success).toBe(false);
    });

    it('should parse with empty string values', () => {
      const request = { ticket: '', subject: '' };
      const result = tokenIssueRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ticket).toBe('');
        expect(result.data.subject).toBe('');
      }
    });

    it('should parse with long string values', () => {
      const longString = 'a'.repeat(1000);
      const request = { ticket: longString, subject: longString };
      const result = tokenIssueRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ticket).toBe(longString);
        expect(result.data.subject).toBe(longString);
      }
    });

    it('should parse with zero numeric values', () => {
      const request = {
        ticket: 'ticket123',
        subject: 'user123',
        accessTokenDuration: 0,
        refreshTokenDuration: 0,
      };
      const result = tokenIssueRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accessTokenDuration).toBe(0);
        expect(result.data.refreshTokenDuration).toBe(0);
      }
    });

    it('should parse with negative numeric values', () => {
      const request = {
        ticket: 'ticket123',
        subject: 'user123',
        accessTokenDuration: -3600,
        refreshTokenDuration: -86400,
      };
      const result = tokenIssueRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accessTokenDuration).toBe(-3600);
        expect(result.data.refreshTokenDuration).toBe(-86400);
      }
    });

    it('should parse with large numeric values', () => {
      const request = {
        ticket: 'ticket123',
        subject: 'user123',
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
        refreshTokenDuration: Number.MAX_SAFE_INTEGER,
      };
      const result = tokenIssueRequestSchema.safeParse(request);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accessTokenDuration).toBe(Number.MAX_SAFE_INTEGER);
        expect(result.data.refreshTokenDuration).toBe(Number.MAX_SAFE_INTEGER);
      }
    });
  });
});
