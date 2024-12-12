import { describe, it, expect } from 'vitest';
import { credentialIssuerJwksRequestSchema } from './CredentialIssuerJwksRequest';

describe('credentialIssuerJwksRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      pretty: true,
    };

    const result = credentialIssuerJwksRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result = credentialIssuerJwksRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
  });
});
