import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { addressSchema, Address } from '../Address';

describe('Address schema', () => {
  describe('addressSchema', () => {
    it('should accept a complete address object', () => {
      const completeAddress: Address = {
        formatted: '123 Main St, Anytown, CA 12345, USA',
        streetAddress: '123 Main St',
        locality: 'Anytown',
        region: 'CA',
        postalCode: '12345',
        country: 'USA',
      };

      const result = addressSchema.parse(completeAddress);
      expect(result).toEqual(completeAddress);
    });

    it('should accept an address with some fields missing', () => {
      const partialAddress = {
        formatted: '123 Main St, Anytown, CA 12345, USA',
        streetAddress: '123 Main St',
        locality: 'Anytown',
        // region, postalCode, country are missing
      };

      const result = addressSchema.parse(partialAddress);
      expect(result).toEqual(partialAddress);
    });

    it('should accept an address with null values', () => {
      const addressWithNulls: Address = {
        formatted: null,
        streetAddress: null,
        locality: null,
        region: null,
        postalCode: null,
        country: null,
      };

      const result = addressSchema.parse(addressWithNulls);
      expect(result).toEqual(addressWithNulls);
    });

    it('should accept an address with undefined values', () => {
      const addressWithUndefined: Address = {
        formatted: undefined,
        streetAddress: undefined,
        locality: undefined,
        region: undefined,
        postalCode: undefined,
        country: undefined,
      };

      const result = addressSchema.parse(addressWithUndefined);
      expect(result).toEqual(addressWithUndefined);
    });

    it('should accept an empty object', () => {
      const emptyAddress = {};

      const result = addressSchema.parse(emptyAddress);
      expect(result).toEqual(emptyAddress);
    });

    it('should accept an address with mixed null and string values', () => {
      const mixedAddress: Address = {
        formatted: '123 Main St, Anytown, CA 12345, USA',
        streetAddress: null,
        locality: 'Anytown',
        region: undefined,
        postalCode: '12345',
        country: null,
      };

      const result = addressSchema.parse(mixedAddress);
      expect(result).toEqual(mixedAddress);
    });

    it('should reject non-string values for address fields', () => {
      const invalidAddress = {
        formatted: 123,
        streetAddress: true,
        locality: ['Anytown'],
        region: { state: 'CA' },
        postalCode: 12345,
        country: null, // null is valid
      };

      const result = addressSchema.safeParse(invalidAddress);
      expect(result.success).toBe(false);
    });

    it('should reject non-object values', () => {
      const invalidValues = [
        'not an address',
        123,
        true,
        ['address'],
        null,
        undefined,
      ];

      invalidValues.forEach((value) => {
        const result = addressSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = z.infer<typeof addressSchema>;
      type ExpectedType = Address;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should handle Japanese address format', () => {
      const japaneseAddress: Address = {
        formatted: '〒100-0001 東京都千代田区千代田1-1',
        streetAddress: '千代田1-1',
        locality: '千代田区',
        region: '東京都',
        postalCode: '100-0001',
        country: '日本',
      };

      const result = addressSchema.parse(japaneseAddress);
      expect(result).toEqual(japaneseAddress);
    });

    it('should handle European address format', () => {
      const europeanAddress: Address = {
        formatted: '123 Rue de la Paix, 75001 Paris, France',
        streetAddress: '123 Rue de la Paix',
        locality: 'Paris',
        region: 'Île-de-France',
        postalCode: '75001',
        country: 'France',
      };

      const result = addressSchema.parse(europeanAddress);
      expect(result).toEqual(europeanAddress);
    });
  });
});
