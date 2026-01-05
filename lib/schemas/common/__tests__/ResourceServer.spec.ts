import { describe, it, expect } from 'vitest';
import { resourceServerSchema } from '../ResourceServer';

describe('resourceServerSchema', () => {
  it('should validate a valid resource server', () => {
    const validResourceServer = {
      id: 'rs1',
      authenticationType: 'BASIC',
      secret: 'secret',
      uri: 'https://rs1.example.com',
      introspectionSignAlg: 'RS256',
      introspectionEncryptionAlg: 'RSA-OAEP-256',
      introspectionEncryptionEnc: 'A128GCM',
      sharedKeyForIntrospectionResponseSign: 'sharedKeySign',
      sharedKeyForIntrospectionResponseEncryption: 'sharedKeyEnc',
      publicKeyForIntrospectionResponseEncryption: 'publicKeyEnc',
    };

    const result = resourceServerSchema.safeParse(validResourceServer);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResourceServer);
    }
  });

  it('should validate a valid resource server with minimal fields', () => {
    const validResourceServer = {
      id: 'rs1',
      authenticationType: 'BEARER',
      secret: 'secret',
      uri: 'https://rs1.example.com',
    };

    const result = resourceServerSchema.safeParse(validResourceServer);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResourceServer);
    }
  });

  it('should validate with null/undefined optional fields', () => {
    const validResourceServer = {
      id: 'rs1',
      authenticationType: 'BASIC',
      secret: 'secret',
      uri: 'https://rs1.example.com',
      introspectionSignAlg: null,
      introspectionEncryptionAlg: undefined,
    };

    const result = resourceServerSchema.safeParse(validResourceServer);
    expect(result.success).toBe(true);
  });

  it('should reject invalid URI', () => {
    const invalidResourceServer = {
      id: 'rs1',
      authenticationType: 'BASIC',
      secret: 'secret',
      uri: 'not-a-url',
    };

    const result = resourceServerSchema.safeParse(invalidResourceServer);
    expect(result.success).toBe(false);
  });

  it('should reject invalid algorithms', () => {
    const invalidResourceServer = {
      id: 'rs1',
      authenticationType: 'BASIC',
      secret: 'secret',
      uri: 'https://rs1.example.com',
      introspectionSignAlg: 'INVALID_ALG',
    };

    const result = resourceServerSchema.safeParse(invalidResourceServer);
    expect(result.success).toBe(false);
  });

  it('should reject invalid authentication type', () => {
    const invalidResourceServer = {
      id: 'rs1',
      authenticationType: 'INVALID_TYPE',
      secret: 'secret',
      uri: 'https://rs1.example.com',
    };

    const result = resourceServerSchema.safeParse(invalidResourceServer);
    expect(result.success).toBe(false);
  });
});

