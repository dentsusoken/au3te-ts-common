import { describe, it, expect } from 'vitest';
import {
  federationParamsSchema,
  type FederationParams,
} from '../FederationParams';

describe('FederationParams', () => {
  describe('federationParamsSchema', () => {
    it('should accept a valid FederationParams object with all fields', () => {
      const validParams: FederationParams = {
        state: 'state123',
        codeVerifier: 'verifier123',
      };
      const result = federationParamsSchema.parse(validParams);
      expect(result).toEqual(validParams);
    });

    it('should accept a valid FederationParams object without optional fields', () => {
      const minimalParams: FederationParams = {
        state: 'state123',
      };
      const result = federationParamsSchema.parse(minimalParams);
      expect(result).toEqual(minimalParams);
    });

    it('should accept a valid FederationParams object with null optional fields', () => {
      const paramsWithNulls: FederationParams = {
        state: 'state123',
        codeVerifier: null,
      };
      const result = federationParamsSchema.parse(paramsWithNulls);
      expect(result).toEqual(paramsWithNulls);
    });

    it('should accept a valid FederationParams object with undefined optional fields', () => {
      const paramsWithUndefined: FederationParams = {
        state: 'state123',
        codeVerifier: undefined,
      };
      const result = federationParamsSchema.parse(paramsWithUndefined);
      expect(result).toEqual(paramsWithUndefined);
    });

    it('should reject a FederationParams object with missing required fields', () => {
      const invalidParams = [{}, { codeVerifier: 'verifier123' }];

      invalidParams.forEach((invalidParam) => {
        const result = federationParamsSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a FederationParams object with invalid field types', () => {
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
        const result = federationParamsSchema.safeParse(invalidParam);
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
        const result = federationParamsSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const paramsWithEmptyStrings: FederationParams = {
        state: '',
      };
      const result = federationParamsSchema.parse(paramsWithEmptyStrings);
      expect(result).toEqual(paramsWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof federationParamsSchema._type;
      type ExpectedType = FederationParams;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

