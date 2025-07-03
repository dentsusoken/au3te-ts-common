import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  serviceJwksResponseSchema,
  ServiceJwksResponse,
} from '../ServiceJwksResponse';

describe('serviceJwksResponseSchema', () => {
  describe('valid string cases', () => {
    it('should validate a valid JSON string response', () => {
      const validResponse: ServiceJwksResponse = `{
        "jwks": {
          "keys": [
            {
              "kid": "1234567890",
              "alg": "RS256",
              "kty": "RSA",
              "use": "sig",
              "n": "...",
              "e": "..."
            }
          ]
        }
      }`;

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a simple string', () => {
      const validResponse = 'simple string response';

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate an empty string', () => {
      const validResponse = '';

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a whitespace-only string', () => {
      const validResponse = '   \t\n  ';

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a string with special characters', () => {
      const validResponse = 'special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a string with newlines and tabs', () => {
      const validResponse = 'line1\nline2\tline3\r\nline4';

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a complex JSON string', () => {
      const validResponse = `{
        "jwks": {
          "keys": [
            {
              "kid": "key1",
              "alg": "RS256",
              "kty": "RSA",
              "use": "sig",
              "n": "modulus",
              "e": "exponent"
            },
            {
              "kid": "key2",
              "alg": "ES256",
              "kty": "EC",
              "use": "sig",
              "crv": "P-256",
              "x": "x-coordinate",
              "y": "y-coordinate"
            }
          ]
        }
      }`;

      const result = serviceJwksResponseSchema.parse(validResponse);
      expect(result).toBe(validResponse);
    });

    it('should validate a real-world JWKS response', () => {
      const realWorldResponse = `{
        "keys": [
          {
            "kty": "RSA",
            "kid": "2023-01-01",
            "use": "sig",
            "alg": "RS256",
            "n": "n4EPtAOCc9AlkeQHPzHStgAbgs7bTZLwUBZdR8_KuKPEHLd4rHVTeT-O-XV2jRojdNhxJWTDvNd7nqQ0VEiZQHz_AJmSCpMaJMRBSFKrKb2wqVwGU_NsYOYL-QtiWN2lbzcEe6XC0dApr5ydQLrHqkHHig3RBordaZ6Aj-oBHqFEHYpPe7Tpe-OfVfHd1E6cS6M1FZcD1NNLYD5lFH4PI9bTwPwVZUlzKevQ6etXLJ4lTqNMpgrjVG0X8tqmkq8OlGflRy64FJb6n6nbgZ-yLB8O6fdK0R8tZcU2lW4_U3ejtoKm9JDsjWcj56YIRlcfZ3ay2d4r5o3C2UZHXqAA",
            "e": "AQAB"
          }
        ]
      }`;

      const result = serviceJwksResponseSchema.parse(realWorldResponse);
      expect(result).toBe(realWorldResponse);
    });

    it('should validate a minimal valid response', () => {
      const minimalResponse = '{}';

      const result = serviceJwksResponseSchema.parse(minimalResponse);
      expect(result).toBe(minimalResponse);
    });

    it('should validate a very long string', () => {
      const longString = 'a'.repeat(10000);

      const result = serviceJwksResponseSchema.parse(longString);
      expect(result).toBe(longString);
    });

    it('should validate a malformed JSON string (still valid as string)', () => {
      const malformedJson = '{ "invalid": json, missing: quotes }';

      const result = serviceJwksResponseSchema.parse(malformedJson);
      expect(result).toBe(malformedJson);
    });
  });

  describe('invalid cases', () => {
    it('should reject null value', () => {
      const result = serviceJwksResponseSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should reject undefined value', () => {
      const result = serviceJwksResponseSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject object value', () => {
      const invalidResponse = {
        jwks: {
          keys: [
            {
              kid: '1234567890',
              alg: 'RS256',
              kty: 'RSA',
              use: 'sig',
              n: '...',
              e: '...',
            },
          ],
        },
      };

      const result = serviceJwksResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it('should reject number value', () => {
      const result = serviceJwksResponseSchema.safeParse(123);
      expect(result.success).toBe(false);
    });

    it('should reject boolean value', () => {
      const result1 = serviceJwksResponseSchema.safeParse(true);
      expect(result1.success).toBe(false);
      const result2 = serviceJwksResponseSchema.safeParse(false);
      expect(result2.success).toBe(false);
    });

    it('should reject array value', () => {
      const result = serviceJwksResponseSchema.safeParse([
        'not',
        'a',
        'string',
      ]);
      expect(result.success).toBe(false);
    });

    it('should reject function value', () => {
      const result = serviceJwksResponseSchema.safeParse(() => 'function');
      expect(result.success).toBe(false);
    });

    it('should reject symbol value', () => {
      const result = serviceJwksResponseSchema.safeParse(Symbol('test'));
      expect(result.success).toBe(false);
    });
  });

  describe('type inference', () => {
    it('should infer the correct output type', () => {
      type SchemaType = z.infer<typeof serviceJwksResponseSchema>;
      type ExpectedType = ServiceJwksResponse;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });
  });
});
