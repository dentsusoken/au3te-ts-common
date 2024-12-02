import { describe, it, expect } from 'vitest';
import {
  CREDENTIAL_TYPE_SINGLE,
  CREDENTIAL_TYPE_BATCH,
  CREDENTIAL_TYPE_DEFERRED,
  credentialTypes,
  credentialTypeSchema,
} from './CredentialType';

describe('CredentialType', () => {
  it('should define correct constant values', () => {
    expect(CREDENTIAL_TYPE_SINGLE).toBe('single');
    expect(CREDENTIAL_TYPE_BATCH).toBe('batch');
    expect(CREDENTIAL_TYPE_DEFERRED).toBe('deferred');
  });

  it('should include all supported types in credentialTypes array', () => {
    expect(credentialTypes).toEqual(['single', 'batch', 'deferred']);
    expect(credentialTypes.length).toBe(3);
  });

  describe('credentialTypeSchema', () => {
    it('should validate valid credential types', () => {
      expect(credentialTypeSchema.parse('single')).toBe('single');
      expect(credentialTypeSchema.parse('batch')).toBe('batch');
      expect(credentialTypeSchema.parse('deferred')).toBe('deferred');
    });

    it('should validate uppercase input by converting to lowercase', () => {
      expect(credentialTypeSchema.parse('SINGLE')).toBe('single');
      expect(credentialTypeSchema.parse('BATCH')).toBe('batch');
      expect(credentialTypeSchema.parse('DEFERRED')).toBe('deferred');
    });

    it('should throw error for invalid types', () => {
      expect(() => credentialTypeSchema.parse('invalid')).toThrow();
      expect(() => credentialTypeSchema.parse('')).toThrow();
      expect(() => credentialTypeSchema.parse(null)).toThrow();
      expect(() => credentialTypeSchema.parse(undefined)).toThrow();
    });
  });
});
