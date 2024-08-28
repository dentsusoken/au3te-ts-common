import { describe, it, expect } from 'vitest';
import { pushedAuthReqRequestSchema } from './PushedAuthReqRequest';

describe('pushedAuthReqRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      parameters: 'response_type=code&client_id=123&scope=openid',
      clientId: 'client123',
      clientSecret: 'secret456',
      clientCertificate:
        '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
      clientCertificatePath: [
        '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
      ],
      dpop: 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwiY3J2IjoiUC0yNTYiLCJ4IjoibnV0NVVTRGJTOUhNOHNQZDNGUkpVaUxYekhYWFhqbW9HdlhpaHRMTFNjbyIsInkiOiJuMmVYTEpCQzlwVUlCX2hzN0xDVnNZbGhTeHI5VzN3eHJDdkUyNGpITG5VIn19.eyJodG0iOiJQT1NUIiwiaHR1IjoiaHR0cHM6Ly9zZXJ2ZXIuZXhhbXBsZS5jb20vcHVzaGVkLWF1dGhvcml6YXRpb24tcmVxdWVzdCIsImlhdCI6MTU2MjI2MjYxNiwianRpIjoiLWNvdGdvOUNBT3BXYnZMNngyUHRzUSJ9.KlhE_AS6vU4u-JMzZS-CtILaAXvmvCvKM6E9gXrU4qpBNPQbLAUYA-oJZGgPDa9hKc1XLLdYNFRCEHdQHnfJBg',
      htm: 'POST',
      htu: 'https://server.example.com/pushed-authorization-request',
      dpopNonceRequired: false,
      oauthClientAttestation: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...',
      oauthClientAttestationPop: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...',
    };

    const result = pushedAuthReqRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should require parameters field', () => {
    const invalidRequest = {
      clientId: 'client123',
    };

    const result = pushedAuthReqRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {
      parameters: 'response_type=code&client_id=123&scope=openid',
    };

    const result = pushedAuthReqRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
  });

  it('should validate clientCertificatePath as an array of strings', () => {
    const requestWithInvalidCertPath = {
      parameters: 'response_type=code&client_id=123&scope=openid',
      clientCertificatePath: ['valid cert', 123],
    };

    const result = pushedAuthReqRequestSchema.safeParse(
      requestWithInvalidCertPath
    );
    expect(result.success).toBe(false);
  });

  it('should validate dpopNonceRequired as a boolean', () => {
    const requestWithInvalidDpopNonceRequired = {
      parameters: 'response_type=code&client_id=123&scope=openid',
      dpopNonceRequired: 'true',
    };

    const result = pushedAuthReqRequestSchema.safeParse(
      requestWithInvalidDpopNonceRequired
    );
    expect(result.success).toBe(false);
  });
});
