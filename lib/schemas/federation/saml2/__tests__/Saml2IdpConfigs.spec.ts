import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { saml2IdpConfigSchemas } from '../Saml2IdpConfigs';

type Saml2IdpConfig = z.infer<typeof saml2IdpConfigSchemas>;

describe('Saml2IdpConfigs', () => {
  describe('saml2IdpConfigSchemas', () => {
    // Given: Valid Saml2IdpConfig object with all fields
    // When: Parsing valid config object
    // Then: Should accept valid config object
    it('should accept a valid Saml2IdpConfig object with all fields', () => {
      const validConfig: Saml2IdpConfig = {
        metadata: '<EntityDescriptor>...</EntityDescriptor>',
        requestSignatureAlgorithm: 'RS256',
        loginResponseTemplate: {
          context: 'login response template',
        },
        logoutRequestTemplate: {
          context: 'logout request template',
        },
        generateID: () => 'generated-id-123',
        entityID: 'https://example.com/idp',
        privateKey: '-----BEGIN PRIVATE KEY-----...',
        privateKeyPass: 'password123',
        signingCert: '-----BEGIN CERTIFICATE-----...',
        encryptCert: ['-----BEGIN CERTIFICATE-----...'],
        nameIDFormat: [
          'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
        ],
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
        isAssertionEncrypted: true,
        encPrivateKey: '-----BEGIN PRIVATE KEY-----...',
        encPrivateKeyPass: 'password123',
        messageSigningOrder: 'signThenEncrypt',
        wantLogoutRequestSigned: true,
        wantLogoutResponseSigned: true,
        wantAuthnRequestsSigned: true,
        wantLogoutRequestSignedResponseSigned: true,
        tagPrefix: {
          saml: 'urn:oasis:names:tc:SAML:2.0:assertion',
        },
      };
      const result = saml2IdpConfigSchemas.parse(validConfig);
      expect(result.metadata).toBe(validConfig.metadata);
      expect(result.entityID).toBe(validConfig.entityID);
      expect(typeof result.generateID).toBe('function');
      expect(result.generateID()).toBeTypeOf('string');
      expect(result.singleSignOnService).toEqual(validConfig.singleSignOnService);
      expect(result.singleLogoutService).toEqual(validConfig.singleLogoutService);
    });

    // Given: Valid Saml2IdpConfig object with only required fields
    // When: Parsing valid config object with only required fields
    // Then: Should accept valid config object with only required fields
    it('should accept a valid Saml2IdpConfig object with only required fields', () => {
      const validConfig: Saml2IdpConfig = {
        generateID: () => 'generated-id-123',
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.parse(validConfig);
      expect(typeof result.generateID).toBe('function');
      expect(result.generateID()).toBeTypeOf('string');
      expect(result.singleSignOnService).toEqual(validConfig.singleSignOnService);
      expect(result.singleLogoutService).toEqual(validConfig.singleLogoutService);
    });

    // Given: Valid config with string signingCert
    // When: Parsing config with string signingCert
    // Then: Should accept config with string signingCert
    it('should accept a config with string signingCert', () => {
      const validConfig: Saml2IdpConfig = {
        generateID: () => 'generated-id-123',
        signingCert: '-----BEGIN CERTIFICATE-----...',
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.parse(validConfig);
      expect(result.signingCert).toBe('-----BEGIN CERTIFICATE-----...');
    });

    // Given: Valid config with array signingCert
    // When: Parsing config with array signingCert
    // Then: Should accept config with array signingCert
    it('should accept a config with array signingCert', () => {
      const validConfig: Saml2IdpConfig = {
        generateID: () => 'generated-id-123',
        signingCert: [
          '-----BEGIN CERTIFICATE-----...',
          '-----BEGIN CERTIFICATE-----...',
        ],
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.parse(validConfig);
      expect(Array.isArray(result.signingCert)).toBe(true);
    });

    // Given: Missing required fields
    // When: Parsing config without required fields
    // Then: Should reject config without required fields
    it('should reject a config without generateID field', () => {
      const invalidConfig = {
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a config without singleSignOnService field', () => {
      const invalidConfig = {
        generateID: () => 'generated-id-123',
        singleLogoutService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            Location: 'https://example.com/slo',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject a config without singleLogoutService field', () => {
      const invalidConfig = {
        generateID: () => 'generated-id-123',
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
      };
      const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    it('should reject an empty config object', () => {
      const invalidConfig = {};
      const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    // Given: Invalid singleSignOnService array
    // When: Parsing config with invalid singleSignOnService
    // Then: Should reject config with invalid singleSignOnService
    // Note: Empty array is actually valid for z.array(), so we test with invalid items instead
    it('should reject a config with invalid singleSignOnService items', () => {
      const invalidConfigs = [
        {
          generateID: () => 'generated-id-123',
          singleSignOnService: [
            {
              // missing required fields
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
        {
          generateID: () => 'generated-id-123',
          singleSignOnService: [null],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid singleLogoutService array
    // When: Parsing config with invalid singleLogoutService
    // Then: Should reject config with invalid singleLogoutService
    // Note: Empty array is actually valid for z.array(), so we test with invalid items instead
    it('should reject a config with invalid singleLogoutService items', () => {
      const invalidConfig = {
        generateID: () => 'generated-id-123',
        singleSignOnService: [
          {
            Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            Location: 'https://example.com/sso',
          },
        ],
        singleLogoutService: [
          {
            // missing required fields
          },
        ],
      };
      const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });

    // Given: Invalid generateID function
    // When: Parsing config with invalid generateID
    // Then: Should reject config with invalid generateID
    // Note: zod's z.function() only checks if it's a function, not the return type at runtime
    it('should reject a config with invalid generateID', () => {
      const invalidConfigs = [
        {
          generateID: null,
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
        {
          generateID: 'string',
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
        expect(result.success).toBe(false);
      });
    });

    // Given: Invalid field types
    // When: Parsing config with invalid field types
    // Then: Should reject config with invalid field types
    it('should reject a config with invalid field types', () => {
      const invalidConfigs = [
        {
          generateID: () => 'generated-id-123',
          metadata: null,
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
        {
          generateID: () => 'generated-id-123',
          isAssertionEncrypted: 'true',
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
        {
          generateID: () => 'generated-id-123',
          nameIDFormat: 'string',
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
        {
          generateID: () => 'generated-id-123',
          tagPrefix: 'string',
          singleSignOnService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              Location: 'https://example.com/sso',
            },
          ],
          singleLogoutService: [
            {
              Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
              Location: 'https://example.com/slo',
            },
          ],
        },
      ];

      invalidConfigs.forEach((invalidConfig) => {
        const result = saml2IdpConfigSchemas.safeParse(invalidConfig);
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
        const result = saml2IdpConfigSchemas.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    // Given: Valid config object
    // When: Checking type inference
    // Then: Should infer the correct output type
    it('should infer the correct output type', () => {
      type SchemaType = z.input<typeof saml2IdpConfigSchemas>;
      type ExpectedType = Saml2IdpConfig;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
