import { describe, it, expect } from 'vitest';
import { credentialIssuanceOrderSchema } from './CredentialIssuanceOrder';

describe('CredentialIssuanceOrder Schema', () => {
  // Test valid cases
  it('should validate a complete valid issuance order', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: '{"vct":"Diploma","sub":"79301273"}',
      issuanceDeferred: false,
      credentialDuration: 3600,
      signingKeyId: 'key-1',
    };

    expect(() => credentialIssuanceOrderSchema.parse(validOrder)).not.toThrow();
  });

  it('should validate with only required fields', () => {
    const minimalOrder = {
      requestIdentifier: 'abc123',
    };

    expect(() =>
      credentialIssuanceOrderSchema.parse(minimalOrder)
    ).not.toThrow();
  });

  // Test required fields
  it('should require requestIdentifier', () => {
    const invalidOrder = {
      credentialPayload: '{"vct":"Diploma"}',
      issuanceDeferred: false,
    };

    expect(() => credentialIssuanceOrderSchema.parse(invalidOrder)).toThrow();
  });

  // Test optional fields
  it('should accept null for optional fields', () => {
    const orderWithNulls = {
      requestIdentifier: 'abc123',
      credentialPayload: null,
      issuanceDeferred: null,
      credentialDuration: null,
      signingKeyId: null,
    };

    expect(() =>
      credentialIssuanceOrderSchema.parse(orderWithNulls)
    ).not.toThrow();
  });

  it('should accept undefined for optional fields', () => {
    const orderWithUndefined = {
      requestIdentifier: 'abc123',
      credentialPayload: undefined,
      issuanceDeferred: undefined,
      credentialDuration: undefined,
      signingKeyId: undefined,
    };

    expect(() =>
      credentialIssuanceOrderSchema.parse(orderWithUndefined)
    ).not.toThrow();
  });

  // Test field types
  it('should validate credentialDuration as number', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: 3600,
    };

    expect(() => credentialIssuanceOrderSchema.parse(validOrder)).not.toThrow();
  });

  it('should reject invalid credentialDuration type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      credentialDuration: '3600', // string instead of number
    };

    expect(() => credentialIssuanceOrderSchema.parse(invalidOrder)).toThrow();
  });

  // Test with complex credential payload
  it('should accept complex credentialPayload as JSON string', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      credentialPayload: JSON.stringify({
        vct: 'Diploma',
        sub: '79301273',
        family_name: 'Kawasaki',
        additional_data: {
          field1: 'value1',
          field2: ['value2', 'value3'],
        },
      }),
    };

    expect(() => credentialIssuanceOrderSchema.parse(validOrder)).not.toThrow();
  });

  // Test issuanceDeferred behavior
  it('should validate issuanceDeferred as boolean', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: true,
    };

    expect(() => credentialIssuanceOrderSchema.parse(validOrder)).not.toThrow();
  });

  it('should reject invalid issuanceDeferred type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      issuanceDeferred: 'true', // string instead of boolean
    };

    expect(() => credentialIssuanceOrderSchema.parse(invalidOrder)).toThrow();
  });

  // Test signingKeyId format
  it('should validate signingKeyId as string', () => {
    const validOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: 'key-1',
    };

    expect(() => credentialIssuanceOrderSchema.parse(validOrder)).not.toThrow();
  });

  it('should reject invalid signingKeyId type', () => {
    const invalidOrder = {
      requestIdentifier: 'abc123',
      signingKeyId: 123, // number instead of string
    };

    expect(() => credentialIssuanceOrderSchema.parse(invalidOrder)).toThrow();
  });
});
