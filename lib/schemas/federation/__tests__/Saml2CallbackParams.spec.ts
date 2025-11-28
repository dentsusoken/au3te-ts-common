import { describe, it, expect } from 'vitest';
import {
  saml2CallbackParamsSchema,
  type Saml2CallbackParams,
} from '../Saml2CallbackParams';

describe('Saml2CallbackParams', () => {
  describe('saml2CallbackParamsSchema', () => {
    it('should accept a valid Saml2CallbackParams object with all fields', () => {
      const validParams: Saml2CallbackParams = {
        relayState: 'relay-state-123',
        samlResponse: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+...',
      };
      const result = saml2CallbackParamsSchema.parse(validParams);
      expect(result).toEqual(validParams);
    });

    it('should accept a valid Saml2CallbackParams object without optional fields', () => {
      const minimalParams: Saml2CallbackParams = {
        relayState: 'relay-state-123',
      };
      const result = saml2CallbackParamsSchema.parse(minimalParams);
      expect(result).toEqual(minimalParams);
    });

    it('should accept a valid Saml2CallbackParams object with null optional fields', () => {
      const paramsWithNulls: Saml2CallbackParams = {
        relayState: 'relay-state-123',
        samlResponse: null,
      };
      const result = saml2CallbackParamsSchema.parse(paramsWithNulls);
      expect(result).toEqual(paramsWithNulls);
    });

    it('should accept a valid Saml2CallbackParams object with undefined optional fields', () => {
      const paramsWithUndefined: Saml2CallbackParams = {
        relayState: 'relay-state-123',
        samlResponse: undefined,
      };
      const result = saml2CallbackParamsSchema.parse(paramsWithUndefined);
      expect(result).toEqual(paramsWithUndefined);
    });

    it('should reject a Saml2CallbackParams object with missing required fields', () => {
      const invalidParams = [{}, { samlResponse: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+...' }];

      invalidParams.forEach((invalidParam) => {
        const result = saml2CallbackParamsSchema.safeParse(invalidParam);
        expect(result.success).toBe(false);
      });
    });

    it('should reject a Saml2CallbackParams object with invalid field types', () => {
      const invalidParams = [
        {
          relayState: 123,
          samlResponse: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+...',
        },
        {
          relayState: 'relay-state-123',
          samlResponse: {},
        },
        {
          relayState: [],
          samlResponse: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+...',
        },
        {
          relayState: 'relay-state-123',
          samlResponse: [],
        },
      ];

      invalidParams.forEach((invalidParam) => {
        const result = saml2CallbackParamsSchema.safeParse(invalidParam);
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
        const result = saml2CallbackParamsSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should accept empty strings for required fields', () => {
      const paramsWithEmptyStrings: Saml2CallbackParams = {
        relayState: '',
      };
      const result = saml2CallbackParamsSchema.parse(paramsWithEmptyStrings);
      expect(result).toEqual(paramsWithEmptyStrings);
    });

    it('should accept base64 encoded SAML responses', () => {
      const base64Responses = [
        'PD94bWwgdmVyc2lvbj0iMS4wIj8+',
        'PHNhbWwycDpSZXNwb25zZSB4bWxuczpzYW1sMnA9InVybjpvYXNpczpuYW1lczp0Yz',
        'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
      ];

      base64Responses.forEach((response) => {
        const validParams: Saml2CallbackParams = {
          relayState: 'relay-state-123',
          samlResponse: response,
        };
        const result = saml2CallbackParamsSchema.parse(validParams);
        expect(result.samlResponse).toBe(response);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof saml2CallbackParamsSchema._type;
      type ExpectedType = Saml2CallbackParams;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});

