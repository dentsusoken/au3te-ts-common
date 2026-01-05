import { describe, it, expect } from 'vitest';
import { standardIntrospectionRequestSchema } from '../StandardIntrospectionRequest';

describe('standardIntrospectionRequestSchema', () => {
  it('should validate a valid request with minimal fields', () => {
    const validRequest = {
      parameters: 'token=someToken',
    };

    const result = standardIntrospectionRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should validate a valid request with all fields', () => {
    const validRequest = {
      parameters: 'token=someToken&token_type_hint=access_token',
      withHiddenProperties: true,
      rsUri: 'https://rs.example.com',
      httpAcceptHeader: 'application/token-introspection+jwt',
      introspectionSignAlg: 'RS256',
      introspectionEncryptionAlg: 'RSA-OAEP-256',
      introspectionEncryptionEnc: 'A128GCM',
      sharedKeyForSign: 'sharedSign',
      sharedKeyForEncryption: 'sharedEnc',
      publicKeyForEncryption: 'publicEnc',
    };

    const result = standardIntrospectionRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should allow null/undefined for optional fields', () => {
    const validRequest = {
      parameters: 'token=someToken',
      withHiddenProperties: null,
      rsUri: undefined,
    };

    const result = standardIntrospectionRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should reject invalid fields', () => {
    const invalidRequest = {
      parameters: 123, // Should be string
    };

    const result = standardIntrospectionRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid algorithms', () => {
    const invalidRequest = {
      parameters: 'token=someToken',
      introspectionSignAlg: 'INVALID_ALG',
    };

    const result = standardIntrospectionRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});

