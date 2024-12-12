import { describe, it, expect } from 'vitest';
import { serviceJwksRequestSchema } from './ServiceJwksRequest';

describe('serviceConfigurationRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      pretty: true,
    };

    const result = serviceJwksRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result = serviceJwksRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
  });
});
