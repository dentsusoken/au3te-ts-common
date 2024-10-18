import { describe, it, expect } from 'vitest';
import { credentialIssuerMetadataRequestSchema } from './CredentialIssuerMetadataRequest';

describe('credentialIssuerMetadataRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      pretty: true,
    };

    const result =
      credentialIssuerMetadataRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result =
      credentialIssuerMetadataRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
  });
});
