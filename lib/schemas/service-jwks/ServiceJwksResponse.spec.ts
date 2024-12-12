import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  serviceJwksResponseSchema,
  ServiceJwksResponse,
} from './ServiceJwksResponse';

describe('serviceConfigurationResponseSchema', () => {
  it('should validate a valid service configuration request response', () => {
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

    const result = serviceJwksResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validResponse);
  });

  it('should invalidate a response', () => {
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

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof serviceJwksResponseSchema>;
    type ExpectedType = ServiceJwksResponse;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});
