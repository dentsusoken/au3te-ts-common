import { describe, it, expect } from 'vitest';
import {
  federationProtocolSchema,
  type FederationProtocol,
} from '../FederationProtocol';

describe('FederationProtocol', () => {
  describe('federationProtocolSchema', () => {
    it('should accept "oidc" as a valid protocol', () => {
      const result = federationProtocolSchema.parse('oidc');
      expect(result).toBe('oidc');
    });

    it('should accept "saml2" as a valid protocol', () => {
      const result = federationProtocolSchema.parse('saml2');
      expect(result).toBe('saml2');
    });

    it('should reject invalid protocol values', () => {
      const invalidValues = [
        'oidc2',
        'saml',
        'SAML2',
        'OIDC',
        'openid',
        '',
        'invalid',
        123,
        null,
        undefined,
        {},
        [],
      ];

      invalidValues.forEach((value) => {
        const result = federationProtocolSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationProtocolSchema._type;
      type ExpectedType = FederationProtocol;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

