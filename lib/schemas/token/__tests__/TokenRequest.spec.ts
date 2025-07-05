import { describe, expect, it } from 'vitest';
import { tokenRequestSchema, type TokenRequest } from '../TokenRequest';

describe('TokenRequest', () => {
  describe('valid requests', () => {
    it('should accept minimal valid token request', () => {
      const validRequest: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
      };

      const result = tokenRequestSchema.parse(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should accept token request with all base client auth fields', () => {
      const fullBaseRequest: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        clientId: 'client123',
        clientSecret: 'secret456',
        clientCertificate: 'cert789',
        clientCertificatePath: ['cert1', 'cert2'],
        dpop: 'dpop-token',
        htm: 'POST',
        htu: 'https://server.example.com/token',
        dpopNonceRequired: true,
        oauthClientAttestation: 'attestation-data',
        oauthClientAttestationPop: 'attestation-pop',
      };

      const result = tokenRequestSchema.parse(fullBaseRequest);
      expect(result).toEqual(fullBaseRequest);
    });

    it('should accept token request with all token-specific fields', () => {
      const fullTokenRequest: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        properties: [
          { key: 'prop1', value: 'value1', hidden: false },
          { key: 'prop2', value: 'value2', hidden: true },
          { key: null, value: null, hidden: null },
        ],
        jwtAtClaims: '{"sub":"user123","iat":1234567890}',
        accessToken: 'access-token-123',
        accessTokenDuration: 3600,
        refreshTokenDuration: 86400,
      };

      const result = tokenRequestSchema.parse(fullTokenRequest);
      expect(result).toEqual(fullTokenRequest);
    });

    it('should accept token request with complete fields', () => {
      const completeRequest: TokenRequest = {
        parameters:
          'grant_type=authorization_code&code=abc123&redirect_uri=https://client.example.com/callback',
        clientId: 'client123',
        clientSecret: 'secret456',
        clientCertificate: 'cert789',
        clientCertificatePath: ['cert1', 'cert2'],
        dpop: 'dpop-token',
        htm: 'POST',
        htu: 'https://server.example.com/token',
        dpopNonceRequired: true,
        oauthClientAttestation: 'attestation-data',
        oauthClientAttestationPop: 'attestation-pop',
        properties: [
          { key: 'prop1', value: 'value1', hidden: false },
          { key: 'prop2', value: 'value2', hidden: true },
        ],
        jwtAtClaims: '{"sub":"user123","iat":1234567890,"exp":1234571490}',
        accessToken: 'access-token-123',
        accessTokenDuration: 3600,
        refreshTokenDuration: 86400,
      };

      const result = tokenRequestSchema.parse(completeRequest);
      expect(result).toEqual(completeRequest);
    });

    it('should accept request with null token-specific optional fields', () => {
      const requestWithNulls: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        properties: null,
        jwtAtClaims: null,
        accessToken: null,
        accessTokenDuration: null,
        refreshTokenDuration: null,
      };

      const result = tokenRequestSchema.parse(requestWithNulls);
      expect(result).toEqual(requestWithNulls);
    });

    it('should accept request with empty properties array', () => {
      const requestWithEmptyProps: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        properties: [],
      };

      const result = tokenRequestSchema.parse(requestWithEmptyProps);
      expect(result).toEqual(requestWithEmptyProps);
    });

    it('should accept request with partial property objects', () => {
      const requestWithPartialProps: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        properties: [
          { key: 'key1', value: 'value1' },
          { key: null, value: null },
          { hidden: true },
          {},
        ],
      };

      const result = tokenRequestSchema.parse(requestWithPartialProps);
      expect(result).toEqual(requestWithPartialProps);
    });
  });

  describe('invalid requests', () => {
    it('should reject request without required parameters field', () => {
      const invalidRequest = {};

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['parameters']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string parameters', () => {
      const invalidRequest = {
        parameters: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['parameters']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string clientId', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        clientId: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientId']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string clientSecret', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        clientSecret: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientSecret']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string clientCertificate', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        clientCertificate: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientCertificate']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-array clientCertificatePath', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        clientCertificatePath: 'not-an-array',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['clientCertificatePath']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string dpop', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        dpop: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['dpop']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string htm', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        htm: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['htm']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string htu', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        htu: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['htu']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-boolean dpopNonceRequired', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        dpopNonceRequired: 'true',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['dpopNonceRequired']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string oauthClientAttestation', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        oauthClientAttestation: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['oauthClientAttestation']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string oauthClientAttestationPop', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        oauthClientAttestationPop: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'oauthClientAttestationPop',
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-array properties', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        properties: 'not-an-array',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['properties']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string jwtAtClaims', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        jwtAtClaims: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['jwtAtClaims']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-string accessToken', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        accessToken: 123,
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessToken']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-number accessTokenDuration', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        accessTokenDuration: '3600',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['accessTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with non-number refreshTokenDuration', () => {
      const invalidRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        refreshTokenDuration: '86400',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['refreshTokenDuration']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should reject request with multiple invalid fields', () => {
      const invalidRequest = {
        parameters: 123,
        clientId: 456,
        properties: 'not-an-array',
        accessTokenDuration: '3600',
      };

      const result = tokenRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should accept request with empty string parameters', () => {
      const requestWithEmptyParams: TokenRequest = {
        parameters: '',
      };

      const result = tokenRequestSchema.parse(requestWithEmptyParams);
      expect(result).toEqual(requestWithEmptyParams);
    });

    it('should accept request with very long parameters string', () => {
      const longParams =
        'grant_type=authorization_code&code=' + 'a'.repeat(1000);
      const requestWithLongParams: TokenRequest = {
        parameters: longParams,
      };

      const result = tokenRequestSchema.parse(requestWithLongParams);
      expect(result).toEqual(requestWithLongParams);
    });

    it('should accept request with zero duration values', () => {
      const requestWithZeroDurations: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        accessTokenDuration: 0,
        refreshTokenDuration: 0,
      };

      const result = tokenRequestSchema.parse(requestWithZeroDurations);
      expect(result).toEqual(requestWithZeroDurations);
    });

    it('should accept request with negative duration values', () => {
      const requestWithNegativeDurations: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        accessTokenDuration: -1,
        refreshTokenDuration: -3600,
      };

      const result = tokenRequestSchema.parse(requestWithNegativeDurations);
      expect(result).toEqual(requestWithNegativeDurations);
    });

    it('should accept request with large duration values', () => {
      const requestWithLargeDurations: TokenRequest = {
        parameters: 'grant_type=authorization_code&code=abc123',
        accessTokenDuration: Number.MAX_SAFE_INTEGER,
        refreshTokenDuration: Number.MAX_SAFE_INTEGER,
      };

      const result = tokenRequestSchema.parse(requestWithLargeDurations);
      expect(result).toEqual(requestWithLargeDurations);
    });
  });
});
