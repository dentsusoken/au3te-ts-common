import { describe, expect, it } from 'vitest';
import {
  baseClientAuthRequestSchema,
  type BaseClientAuthRequest,
} from './BaseClientAuthRequest';

describe('BaseClientAuthRequest', () => {
  it('should accept valid request with required fields', () => {
    const validRequest: BaseClientAuthRequest = {
      parameters: 'grant_type=client_credentials',
    };

    const result = baseClientAuthRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should accept request with all optional fields', () => {
    const fullRequest: BaseClientAuthRequest = {
      parameters: 'grant_type=client_credentials',
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

    const result = baseClientAuthRequestSchema.safeParse(fullRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullRequest);
    }
  });

  it('should reject request without required parameters', () => {
    const invalidRequest = {};

    const result = baseClientAuthRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should accept request with null values for optional fields', () => {
    const requestWithNulls: BaseClientAuthRequest = {
      parameters: 'grant_type=client_credentials',
      clientId: null,
      clientSecret: null,
      clientCertificate: null,
      clientCertificatePath: null,
      dpop: null,
      htm: null,
      htu: null,
      dpopNonceRequired: null,
      oauthClientAttestation: null,
      oauthClientAttestationPop: null,
    };

    const result = baseClientAuthRequestSchema.safeParse(requestWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithNulls);
    }
  });

  it('should reject invalid property types', () => {
    const invalidTypes = {
      parameters: 123, // should be string
      clientId: true, // should be string
      clientSecret: {}, // should be string
      clientCertificatePath: 'not-an-array', // should be array
      dpopNonceRequired: 'true', // should be boolean
    };

    const result = baseClientAuthRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should handle empty arrays for array fields', () => {
    const requestWithEmptyArrays: BaseClientAuthRequest = {
      parameters: 'grant_type=client_credentials',
      clientCertificatePath: [],
    };

    const result = baseClientAuthRequestSchema.safeParse(
      requestWithEmptyArrays
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.clientCertificatePath).toEqual([]);
    }
  });
});
