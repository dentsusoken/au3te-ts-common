import { describe, it, expect } from 'vitest';
import {
  CREDENTIAL_TYPE_SINGLE,
  CREDENTIAL_TYPE_BATCH,
  CREDENTIAL_TYPE_DEFERRED,
  credentialTypes,
  credentialTypeSchema,
} from '../CredentialType';

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
      const result1 = credentialTypeSchema.parse('single');
      expect(result1).toBe('single');
      const result2 = credentialTypeSchema.parse('batch');
      expect(result2).toBe('batch');
      const result3 = credentialTypeSchema.parse('deferred');
      expect(result3).toBe('deferred');
    });

    it('should validate uppercase input by converting to lowercase', () => {
      const result1 = credentialTypeSchema.parse('SINGLE');
      expect(result1).toBe('single');
      const result2 = credentialTypeSchema.parse('BATCH');
      expect(result2).toBe('batch');
      const result3 = credentialTypeSchema.parse('DEFERRED');
      expect(result3).toBe('deferred');
    });

    it('should validate mixed case input by converting to lowercase', () => {
      const result1 = credentialTypeSchema.parse('Single');
      expect(result1).toBe('single');
      const result2 = credentialTypeSchema.parse('Batch');
      expect(result2).toBe('batch');
      const result3 = credentialTypeSchema.parse('Deferred');
      expect(result3).toBe('deferred');
    });

    it('should validate already lowercase input', () => {
      credentialTypes.forEach((type) => {
        const result = credentialTypeSchema.parse(type);
        expect(result).toBe(type);
      });
    });

    it('should validate case-insensitive versions of all constants', () => {
      const upperCaseTypes = credentialTypes.map((type) => type.toUpperCase());
      upperCaseTypes.forEach((type, i) => {
        const result = credentialTypeSchema.parse(type);
        expect(result).toBe(credentialTypes[i]);
      });
    });

    it('should reject invalid type strings', () => {
      const result1 = credentialTypeSchema.safeParse('invalid');
      expect(result1.success).toBe(false);
      const result2 = credentialTypeSchema.safeParse('singl');
      expect(result2.success).toBe(false);
      const result3 = credentialTypeSchema.safeParse('batc');
      expect(result3.success).toBe(false);
      const result4 = credentialTypeSchema.safeParse('deferrd');
      expect(result4.success).toBe(false);
    });

    it('should reject empty string', () => {
      const result = credentialTypeSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject null value', () => {
      const result = credentialTypeSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should reject undefined value', () => {
      const result = credentialTypeSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject non-string values', () => {
      const result1 = credentialTypeSchema.safeParse(123);
      expect(result1.success).toBe(false);
      const result2 = credentialTypeSchema.safeParse(true);
      expect(result2.success).toBe(false);
      const result3 = credentialTypeSchema.safeParse({});
      expect(result3.success).toBe(false);
      const result4 = credentialTypeSchema.safeParse([]);
      expect(result4.success).toBe(false);
    });

    it('should reject whitespace-only strings', () => {
      const result1 = credentialTypeSchema.safeParse('   ');
      expect(result1.success).toBe(false);
      const result2 = credentialTypeSchema.safeParse('\t\n');
      expect(result2.success).toBe(false);
    });

    it('should reject strings with extra whitespace', () => {
      const result1 = credentialTypeSchema.safeParse(' single ');
      expect(result1.success).toBe(false);
      const result2 = credentialTypeSchema.safeParse('batch\t');
      expect(result2.success).toBe(false);
    });
  });
});
