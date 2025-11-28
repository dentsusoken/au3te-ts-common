import { describe, it, expect } from 'vitest';
import {
  oidcCallbackParamsSchema,
  type OidcCallbackParams,
} from '../OidcCallbackParams';

describe('OidcCallbackParams', () => {
  describe('oidcCallbackParamsSchema', () => {
    it('should accept a valid OidcCallbackParams object with all fields', () => {
      const validParams: OidcCallbackParams = {
        state: 'state123',
        codeVerifier: 'verifier123',
      };
      const result = oidcCallbackParamsSchema.parse(validParams);
      expect(result).toEqual(validParams);
    });

    it('should accept a valid OidcCallbackParams object without optional fields', () => {
      const minimalParams: OidcCallbackParams = {
        state: 'state123',
      };
      const result = oidcCallbackParamsSchema.parse(minimalParams);
      expect(result).toEqual(minimalParams);
    });

    it('should accept a valid OidcCallbackParams object with null optional fields', () => {
      const paramsWithNulls: OidcCallbackParams = {
        state: 'state123',
        codeVerifier: null,
      };
      const result = oidcCallbackParamsSchema.parse(paramsWithNulls);
      expect(result).toEqual(paramsWithNulls);
    });

    it('should accept a valid OidcCallbackParams object with undefined optional fields', () => {
      const paramsWithUndefined: OidcCallbackParams = {
        state: 'state123',
        codeVerifier: undefined,
      };
      const result = oidcCallbackParamsSchema.parse(paramsWithUndefined);
      expect(result).toEqual(paramsWithUndefined);
    });

    it('should reject an OidcCallbackParams object with missing required fields', () => {
      const invalidParams = [{}, { codeVerifier: 'verifier123' }];

      invalidParams.forEach((invalidParam) => {
        const result = oidcCallbackParamsSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
      });
    });

    it('should reject an OidcCallbackParams object with invalid field types', () => {
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
        const result = oidcCallbackParamsSchema.safeParse(invalidParam);
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
        const result = oidcCallbackParamsSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const paramsWithEmptyStrings: OidcCallbackParams = {
        state: '',
      };
      const result = oidcCallbackParamsSchema.parse(paramsWithEmptyStrings);
      expect(result).toEqual(paramsWithEmptyStrings);
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof oidcCallbackParamsSchema._type;
      type ExpectedType = OidcCallbackParams;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

