import { describe, it, expect } from 'vitest';
import {
  saml2ServerConfigSchema,
  type Saml2ServerConfig,
} from '../Saml2ServerConfig';

describe('Saml2ServerConfig', () => {
  describe('saml2ServerConfigSchema', () => {
    const mockSigningCertificate =
      '-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\n-----END CERTIFICATE-----';

    it('should accept a valid Saml2ServerConfig object with all fields', () => {
      const validConfig: Saml2ServerConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        singleLogoutServiceUrl: 'https://idp.example.com/slo',
        signingCertificate: mockSigningCertificate,
        encryptionCertificate: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
      };
      const result = saml2ServerConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid Saml2ServerConfig object without optional fields', () => {
      const minimalConfig: Saml2ServerConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        signingCertificate: mockSigningCertificate,
      };
      const result = saml2ServerConfigSchema.parse(minimalConfig);
      expect(result).toEqual(minimalConfig);
    });

    it('should accept a valid Saml2ServerConfig object with null optional fields', () => {
      const configWithNulls: Saml2ServerConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        singleLogoutServiceUrl: null,
        signingCertificate: mockSigningCertificate,
        encryptionCertificate: null,
      };
      const result = saml2ServerConfigSchema.parse(configWithNulls);
      expect(result).toEqual(configWithNulls);
    });

    it('should accept a valid Saml2ServerConfig object with undefined optional fields', () => {
      const configWithUndefined: Saml2ServerConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        singleLogoutServiceUrl: undefined,
        signingCertificate: mockSigningCertificate,
        encryptionCertificate: undefined,
      };
      const result = saml2ServerConfigSchema.parse(configWithUndefined);
      expect(result).toEqual(configWithUndefined);
    });

    it('should reject a Saml2ServerConfig object with empty entityId', () => {
      const invalidConfig = {
        entityId: '',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        signingCertificate: mockSigningCertificate,
      };
      const result = saml2ServerConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a Saml2ServerConfig object with invalid singleSignOnServiceUrl', () => {
      const invalidUrls = [
        'not-a-url',
        'http://',
        'https://',
        '://example.com',
        'example.com',
      ];

      invalidUrls.forEach((invalidUrl) => {
        const invalidConfig = {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: invalidUrl,
          signingCertificate: mockSigningCertificate,
        };
        const result = saml2ServerConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a Saml2ServerConfig object with empty signingCertificate', () => {
      const invalidConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        signingCertificate: '',
      };
      const result = saml2ServerConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a Saml2ServerConfig object with invalid singleLogoutServiceUrl', () => {
      const invalidConfig = {
        entityId: 'https://idp.example.com',
        singleSignOnServiceUrl: 'https://idp.example.com/sso',
        signingCertificate: mockSigningCertificate,
        singleLogoutServiceUrl: 'not-a-url',
      };
      const result = saml2ServerConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a Saml2ServerConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { entityId: 'https://idp.example.com' },
        {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: 'https://idp.example.com/sso',
        },
        {
          entityId: 'https://idp.example.com',
          signingCertificate: mockSigningCertificate,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2ServerConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a Saml2ServerConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          entityId: 123,
          singleSignOnServiceUrl: 'https://idp.example.com/sso',
          signingCertificate: mockSigningCertificate,
        },
        {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: {},
          signingCertificate: mockSigningCertificate,
        },
        {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: 'https://idp.example.com/sso',
          signingCertificate: [],
        },
        {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: 'https://idp.example.com/sso',
          signingCertificate: mockSigningCertificate,
          singleLogoutServiceUrl: 123,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2ServerConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object values', () => {
      const invalidValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        [],
        () => {},
      ];

      invalidValues.forEach((value) => {
        const result = saml2ServerConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept valid URL formats', () => {
      const validUrls = [
        'https://idp.example.com/sso',
        'http://localhost:3000/sso',
        'https://idp.example.com:8080/path/to/sso',
        'https://subdomain.example.com/sso',
      ];

      validUrls.forEach((url) => {
        const validConfig: Saml2ServerConfig = {
          entityId: 'https://idp.example.com',
          singleSignOnServiceUrl: url,
          signingCertificate: mockSigningCertificate,
        };
        const result = saml2ServerConfigSchema.parse(validConfig);
        expect(result.singleSignOnServiceUrl).toBe(url);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof saml2ServerConfigSchema._type;
      type ExpectedType = Saml2ServerConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

