import { describe, it, expect } from 'vitest';
import {
  CREDENTIAL_FORMAT_VC_SD_JWT,
  CREDENTIAL_FORMAT_MSO_MDOC,
  credentialFormats,
  credentialFormatSchema,
} from '../CredentialFormat';

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
      const result1 = credentialFormatSchema.parse('vc+sd-jwt');
      expect(result1).toBe('vc+sd-jwt');

      const result2 = credentialFormatSchema.parse('mso_mdoc');
      expect(result2).toBe('mso_mdoc');
    });

    it('should validate uppercase input by converting to lowercase', () => {
      const result1 = credentialFormatSchema.parse('VC+SD-JWT');
      expect(result1).toBe('vc+sd-jwt');

      const result2 = credentialFormatSchema.parse('MSO_MDOC');
      expect(result2).toBe('mso_mdoc');
    });

    it('should validate mixed case input by converting to lowercase', () => {
      const result1 = credentialFormatSchema.parse('Vc+Sd-Jwt');
      expect(result1).toBe('vc+sd-jwt');

      const result2 = credentialFormatSchema.parse('Mso_Mdoc');
      expect(result2).toBe('mso_mdoc');
    });

    it('should validate already lowercase input', () => {
      const result1 = credentialFormatSchema.parse('vc+sd-jwt');
      expect(result1).toBe('vc+sd-jwt');

      const result2 = credentialFormatSchema.parse('mso_mdoc');
      expect(result2).toBe('mso_mdoc');
    });

    it('should reject invalid format strings', () => {
      const result1 = credentialFormatSchema.safeParse('invalid');
      expect(result1.success).toBe(false);

      const result2 = credentialFormatSchema.safeParse('vc-jwt');
      expect(result2.success).toBe(false);

      const result3 = credentialFormatSchema.safeParse('mdoc');
      expect(result3.success).toBe(false);

      const result4 = credentialFormatSchema.safeParse('vc_sd_jwt');
      expect(result4.success).toBe(false);
    });

    it('should reject empty string', () => {
      const result = credentialFormatSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject null value', () => {
      const result = credentialFormatSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should reject undefined value', () => {
      const result = credentialFormatSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject non-string values', () => {
      const result1 = credentialFormatSchema.safeParse(123);
      expect(result1.success).toBe(false);

      const result2 = credentialFormatSchema.safeParse(true);
      expect(result2.success).toBe(false);

      const result3 = credentialFormatSchema.safeParse({});
      expect(result3.success).toBe(false);

      const result4 = credentialFormatSchema.safeParse([]);
      expect(result4.success).toBe(false);
    });

    it('should reject whitespace-only strings', () => {
      const result1 = credentialFormatSchema.safeParse('   ');
      expect(result1.success).toBe(false);

      const result2 = credentialFormatSchema.safeParse('\t\n');
      expect(result2.success).toBe(false);
    });

    it('should reject strings with extra whitespace', () => {
      const result1 = credentialFormatSchema.safeParse(' vc+sd-jwt ');
      expect(result1.success).toBe(false);

      const result2 = credentialFormatSchema.safeParse('mso_mdoc\t');
      expect(result2.success).toBe(false);
    });

    it('should reject similar but incorrect formats', () => {
      const result1 = credentialFormatSchema.safeParse('vc+sdjwt');
      expect(result1.success).toBe(false);

      const result2 = credentialFormatSchema.safeParse('vc-sd-jwt');
      expect(result2.success).toBe(false);

      const result3 = credentialFormatSchema.safeParse('mso-mdoc');
      expect(result3.success).toBe(false);

      const result4 = credentialFormatSchema.safeParse('msomdoc');
      expect(result4.success).toBe(false);
    });

    it('should validate all constants from credentialFormats array', () => {
      credentialFormats.forEach((format) => {
        const result = credentialFormatSchema.parse(format);
        expect(result).toBe(format);
      });
    });

    it('should validate case-insensitive versions of all constants', () => {
      const upperCaseFormats = credentialFormats.map((format) =>
        format.toUpperCase()
      );
      upperCaseFormats.forEach((format) => {
        const result = credentialFormatSchema.parse(format);
        expect(result).toBe(format.toLowerCase());
      });
    });
  });
});
