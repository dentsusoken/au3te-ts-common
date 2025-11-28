import { describe, it, expect } from 'vitest';
import {
  saml2ClientConfigSchema,
  type Saml2ClientConfig,
} from '../Saml2ClientConfig';

describe('Saml2ClientConfig', () => {
  describe('saml2ClientConfigSchema', () => {
    it('should accept a valid Saml2ClientConfig object with all fields', () => {
      const validConfig: Saml2ClientConfig = {
        entityId: 'https://sp.example.com',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
        singleLogoutServiceUrl: 'https://sp.example.com/slo',
        signingCertificate: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
        encryptionCertificate: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
        nameIdFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      };
      const result = saml2ClientConfigSchema.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    it('should accept a valid Saml2ClientConfig object without optional fields', () => {
      const minimalConfig: Saml2ClientConfig = {
        entityId: 'https://sp.example.com',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
      };
      const result = saml2ClientConfigSchema.parse(minimalConfig);
      expect(result).toEqual(minimalConfig);
    });

    it('should accept a valid Saml2ClientConfig object with null optional fields', () => {
      const configWithNulls: Saml2ClientConfig = {
        entityId: 'https://sp.example.com',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
        singleLogoutServiceUrl: null,
        signingCertificate: null,
        encryptionCertificate: null,
        nameIdFormat: null,
      };
      const result = saml2ClientConfigSchema.parse(configWithNulls);
      expect(result).toEqual(configWithNulls);
    });

    it('should accept a valid Saml2ClientConfig object with undefined optional fields', () => {
      const configWithUndefined: Saml2ClientConfig = {
        entityId: 'https://sp.example.com',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
        singleLogoutServiceUrl: undefined,
        signingCertificate: undefined,
        encryptionCertificate: undefined,
        nameIdFormat: undefined,
      };
      const result = saml2ClientConfigSchema.parse(configWithUndefined);
      expect(result).toEqual(configWithUndefined);
    });

    it('should reject a Saml2ClientConfig object with empty entityId', () => {
      const invalidConfig = {
        entityId: '',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
      };
      const result = saml2ClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a Saml2ClientConfig object with invalid assertionConsumerServiceUrl', () => {
      const invalidUrls = [
        'not-a-url',
        'http://',
        'https://',
        '://example.com',
        'example.com',
      ];

      invalidUrls.forEach((invalidUrl) => {
        const invalidConfig = {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: invalidUrl,
        };
        const result = saml2ClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a Saml2ClientConfig object with invalid singleLogoutServiceUrl', () => {
      const invalidConfig = {
        entityId: 'https://sp.example.com',
        assertionConsumerServiceUrl: 'https://sp.example.com/acs',
        singleLogoutServiceUrl: 'not-a-url',
      };
      const result = saml2ClientConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a Saml2ClientConfig object with missing required fields', () => {
      const invalidConfigs = [
        {},
        { entityId: 'https://sp.example.com' },
        { assertionConsumerServiceUrl: 'https://sp.example.com/acs' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2ClientConfigSchema.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a Saml2ClientConfig object with invalid field types', () => {
      const invalidConfigs = [
        {
          entityId: 123,
          assertionConsumerServiceUrl: 'https://sp.example.com/acs',
        },
        {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: {},
        },
        {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: 'https://sp.example.com/acs',
          singleLogoutServiceUrl: 123,
        },
        {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: 'https://sp.example.com/acs',
          nameIdFormat: [],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2ClientConfigSchema.safeParse(invalidConfig);
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
        const result = saml2ClientConfigSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept valid URL formats', () => {
      const validUrls = [
        'https://sp.example.com/acs',
        'http://localhost:3000/acs',
        'https://sp.example.com:8080/path/to/acs',
        'https://subdomain.example.com/acs',
      ];

      validUrls.forEach((url) => {
        const validConfig: Saml2ClientConfig = {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: url,
        };
        const result = saml2ClientConfigSchema.parse(validConfig);
        expect(result.assertionConsumerServiceUrl).toBe(url);
      });
    });

    it('should accept valid NameID formats', () => {
      const validNameIdFormats = [
        'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
        'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
      ];

      validNameIdFormats.forEach((format) => {
        const validConfig: Saml2ClientConfig = {
          entityId: 'https://sp.example.com',
          assertionConsumerServiceUrl: 'https://sp.example.com/acs',
          nameIdFormat: format,
        };
        const result = saml2ClientConfigSchema.parse(validConfig);
        expect(result.nameIdFormat).toBe(format);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof saml2ClientConfigSchema._type;
      type ExpectedType = Saml2ClientConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

