import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { saml2SpConfigSchemas, type Saml2SpConfig } from '../Saml2SpConfig';

describe('Saml2SpConfig', () => {
  describe('saml2SpConfigSchemas', () => {
    // Given: Valid Saml2SpConfig object with all fields
    // When: Parsing valid config object
    // Then: Should accept valid config object
    it('should accept a valid Saml2SpConfig object with all fields', () => {
      const validConfig: Saml2SpConfig = {
        metadata: '<EntityDescriptor>...</EntityDescriptor>',
        entityID: 'https://example.com/sp',
        authnRequestsSigned: true,
        wantAssertionsSigned: true,
        wantMessageSigned: true,
        wantLogoutResponseSigned: true,
        wantLogoutRequestSigned: true,
        privateKey: '-----BEGIN PRIVATE KEY-----...',
        privateKeyPass: 'password123',
        isAssertionEncrypted: true,
        requestSignatureAlgorithm: 'RS256',
        encPrivateKey: '-----BEGIN PRIVATE KEY-----...',
        encPrivateKeyPass: 'password123',
        assertionConsumerService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/acs',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
        signatureConfig: {
          prefix: 'ds',
          location: {
            reference: '/samlp:Response/saml:Assertion',
            action: 'append',
          },
        },
        loginRequestTemplate: {
          context: 'login request template',
        },
        logoutRequestTemplate: {
          context: 'logout request template',
        },
        signingCert: '-----BEGIN CERTIFICATE-----...',
        encryptCert: ['-----BEGIN CERTIFICATE-----...'],
        transformationAlgorithms: ['algorithm1', 'algorithm2'],
        nameIDFormat: [
          'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
        ],
        allowCreate: true,
        relayState: 'relay-state-value',
        clockDrifts: [-300, 300],
      };
      const result = saml2SpConfigSchemas.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    // Given: Valid Saml2SpConfig object without optional fields
    // When: Parsing valid config object without optional fields
    // Then: Should accept valid config object without optional fields
    it('should accept a valid Saml2SpConfig object without optional fields', () => {
      const validConfig: Saml2SpConfig = {};
      const result = saml2SpConfigSchemas.parse(validConfig);
      expect(result).toEqual(validConfig);
    });

    // Given: Valid config with string signingCert
    // When: Parsing config with string signingCert
    // Then: Should accept config with string signingCert
    it('should accept a config with string signingCert', () => {
      const validConfig: Saml2SpConfig = {
        signingCert: '-----BEGIN CERTIFICATE-----...',
      };
      const result = saml2SpConfigSchemas.parse(validConfig);
      expect(result.signingCert).toBe('-----BEGIN CERTIFICATE-----...');
    });

    // Given: Valid config with array signingCert
    // When: Parsing config with array signingCert
    // Then: Should accept config with array signingCert
    it('should accept a config with array signingCert', () => {
      const validConfig: Saml2SpConfig = {
        signingCert: [
          '-----BEGIN CERTIFICATE-----...',
          '-----BEGIN CERTIFICATE-----...',
        ],
      };
      const result = saml2SpConfigSchemas.parse(validConfig);
      expect(Array.isArray(result.signingCert)).toBe(true);
    });

    // Given: Valid config with clockDrifts tuple
    // When: Parsing config with clockDrifts tuple
    // Then: Should accept config with clockDrifts tuple
    it('should accept a config with clockDrifts tuple', () => {
      const validConfig: Saml2SpConfig = {
        clockDrifts: [-300, 300],
      };
      const result = saml2SpConfigSchemas.parse(validConfig);
      expect(result.clockDrifts).toEqual([-300, 300]);
    });

    // Given: Invalid clockDrifts tuple
    // When: Parsing config with invalid clockDrifts
    // Then: Should reject config with invalid clockDrifts
    it('should reject a config with invalid clockDrifts', () => {
      const invalidConfigs = [
        {
          clockDrifts: [-300], // wrong length
        },
        {
          clockDrifts: [-300, 300, 600], // wrong length
        },
        {
          clockDrifts: ['-300', '300'], // wrong types
        },
        {
          clockDrifts: null,
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid assertionConsumerService array
    // When: Parsing config with invalid assertionConsumerService
    // Then: Should reject config with invalid assertionConsumerService
    it('should reject a config with invalid assertionConsumerService', () => {
      const invalidConfigs = [
        {
          assertionConsumerService: null,
        },
        {
          assertionConsumerService: 'string',
        },
        {
          assertionConsumerService: [null],
        },
        {
          assertionConsumerService: [
            {
              // missing required fields
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid singleLogoutService array
    // When: Parsing config with invalid singleLogoutService
    // Then: Should reject config with invalid singleLogoutService
    it('should reject a config with invalid singleLogoutService', () => {
      const invalidConfigs = [
        {
          singleLogoutService: null,
        },
        {
          singleLogoutService: 'string',
        },
        {
          singleLogoutService: [null],
        },
        {
          singleLogoutService: [
            {
              // missing required fields
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid field types
    // When: Parsing config with invalid field types
    // Then: Should reject config with invalid field types
    it('should reject a config with invalid field types', () => {
      const invalidConfigs = [
        { metadata: null },
        { entityID: 123 },
        { authnRequestsSigned: 'true' },
        { wantAssertionsSigned: 1 },
        { privateKey: 123 },
        { isAssertionEncrypted: 'true' },
        { nameIDFormat: 'string' },
        { transformationAlgorithms: 'string' },
        { allowCreate: 'true' },
        { relayState: 123 },
        { signatureConfig: 'string' },
        { loginRequestTemplate: 'string' },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2SpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Non-object values
    // When: Parsing non-object values
    // Then: Should reject non-object values
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
        const result = saml2SpConfigSchemas.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid config object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2SpConfigSchemas>;
      type ExpectedType = Saml2SpConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
