import { describe, it, expect } from 'vitest';
import { credentialIssuerMetadataRequestSchema } from '../CredentialIssuerMetadataRequest';

describe('credentialIssuerMetadataRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = { pretty: true };
    const result = credentialIssuerMetadataRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};
    const result = credentialIssuerMetadataRequestSchema.parse(minimalRequest);
    expect(result).toEqual(minimalRequest);
  });

  it('should allow pretty as false', () => {
    const req = { pretty: false };
    const result = credentialIssuerMetadataRequestSchema.parse(req);
    expect(result).toEqual(req);
  });

  it('should allow pretty as null', () => {
    const req = { pretty: null };
    const result = credentialIssuerMetadataRequestSchema.parse(req);
    expect(result).toEqual(req);
  });

  it('should allow pretty as undefined', () => {
    const req = { pretty: undefined };
    const result = credentialIssuerMetadataRequestSchema.parse(req);
    expect(result).toEqual(req);
  });

  it('should reject pretty as string', () => {
    const req = { pretty: 'true' };
    const result = credentialIssuerMetadataRequestSchema.safeParse(req);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as number', () => {
    const req = { pretty: 1 };
    const result = credentialIssuerMetadataRequestSchema.safeParse(req);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as array', () => {
    const req = { pretty: [true] };
    const result = credentialIssuerMetadataRequestSchema.safeParse(req);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as object', () => {
    const req = { pretty: { value: true } };
    const result = credentialIssuerMetadataRequestSchema.safeParse(req);
    expect(result.success).toBe(false);
  });

  it('should allow extra properties (non-strict)', () => {
    const req = { pretty: true, extra: 123 };
    const result = credentialIssuerMetadataRequestSchema.parse(req);
    expect(result).toEqual({ pretty: true });
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialIssuerMetadataRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialIssuerMetadataRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialIssuerMetadataRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialIssuerMetadataRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialIssuerMetadataRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialIssuerMetadataRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });
});
