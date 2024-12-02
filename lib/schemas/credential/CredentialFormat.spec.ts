import { describe, it, expect } from 'vitest';
import {
  CREDENTIAL_FORMAT_VC_SD_JWT,
  CREDENTIAL_FORMAT_MSO_MDOC,
  credentialFormats,
  credentialFormatSchema,
} from './CredentialFormat';

describe('CredentialFormat', () => {
  it('should define correct constant values', () => {
    expect(CREDENTIAL_FORMAT_VC_SD_JWT).toBe('vc+sd-jwt');
    expect(CREDENTIAL_FORMAT_MSO_MDOC).toBe('mso_mdoc');
  });

  it('should include all supported formats in credentialFormats array', () => {
    expect(credentialFormats).toEqual(['vc+sd-jwt', 'mso_mdoc']);
    expect(credentialFormats.length).toBe(2);
  });

  describe('credentialFormatSchema', () => {
    it('should validate valid credential formats', () => {
      expect(credentialFormatSchema.parse('vc+sd-jwt')).toBe('vc+sd-jwt');
      expect(credentialFormatSchema.parse('mso_mdoc')).toBe('mso_mdoc');
    });

    it('should validate uppercase input by converting to lowercase', () => {
      expect(credentialFormatSchema.parse('VC+SD-JWT')).toBe('vc+sd-jwt');
      expect(credentialFormatSchema.parse('MSO_MDOC')).toBe('mso_mdoc');
    });

    it('should throw error for invalid formats', () => {
      expect(() => credentialFormatSchema.parse('invalid')).toThrow();
      expect(() => credentialFormatSchema.parse('')).toThrow();
      expect(() => credentialFormatSchema.parse(null)).toThrow();
      expect(() => credentialFormatSchema.parse(undefined)).toThrow();
    });
  });
});
