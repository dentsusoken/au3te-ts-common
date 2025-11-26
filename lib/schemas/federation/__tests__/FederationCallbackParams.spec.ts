import { describe, it, expect } from 'vitest';
import {
  federationCallbackParamsSchema,
  type FederationCallbackParams,
} from '../FederationCallbackParams';

describe('FederationCallbackParams', () => {
  describe('federationCallbackParamsSchema', () => {
    it('should accept a valid FederationCallbackParams object with all fields', () => {
      const validParams: FederationCallbackParams = {
        protocol: 'oidc',
        state: 'state123',
        codeVerifier: 'verifier123',
      };
      const result = federationCallbackParamsSchema.parse(validParams);
      expect(result).toEqual(validParams);
    });

    it('should accept a valid FederationCallbackParams object without optional fields', () => {
      const minimalParams: FederationCallbackParams = {
        protocol: 'oidc',
        state: 'state123',
      };
      const result = federationCallbackParamsSchema.parse(minimalParams);
      expect(result).toEqual(minimalParams);
    });

    it('should accept a valid FederationCallbackParams object with null optional fields', () => {
      const paramsWithNulls: FederationCallbackParams = {
        protocol: 'oidc',
        state: 'state123',
        codeVerifier: null,
      };
      const result = federationCallbackParamsSchema.parse(paramsWithNulls);
      expect(result).toEqual(paramsWithNulls);
    });

    it('should accept a valid FederationCallbackParams object with undefined optional fields', () => {
      const paramsWithUndefined: FederationCallbackParams = {
        protocol: 'oidc',
        state: 'state123',
        codeVerifier: undefined,
      };
      const result = federationCallbackParamsSchema.parse(paramsWithUndefined);
      expect(result).toEqual(paramsWithUndefined);
    });

    it('should reject a FederationCallbackParams object with missing required fields', () => {
      const invalidParams = [{}, { codeVerifier: 'verifier123' }];

      invalidParams.forEach((invalidParam) => {
        const result = federationCallbackParamsSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationCallbackParams object with invalid field types', () => {
      const invalidParams = [
        {
          state: 123,
          codeVerifier: 'verifier123',
        },
        {
          state: 'state123',
          codeVerifier: {},
        },
        {
          state: [],
          codeVerifier: 'verifier123',
        },
        {
          state: 'state123',
          codeVerifier: [],
        },
      ];

      invalidParams.forEach((invalidParam) => {
        const result = federationCallbackParamsSchema.safeParse(invalidParam);
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
        const result = federationCallbackParamsSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const paramsWithEmptyStrings: FederationCallbackParams = {
        protocol: 'oidc',
        state: '',
      };
      const result = federationCallbackParamsSchema.parse(paramsWithEmptyStrings);
      expect(result).toEqual(paramsWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationCallbackParamsSchema._type;
      type ExpectedType = FederationCallbackParams;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

