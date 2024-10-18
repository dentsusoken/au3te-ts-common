import { describe, it, expect } from 'vitest';
import { serviceConfigurationRequestSchema } from './ServiceConfigurationRequest';

describe('serviceConfigurationRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      pretty: true,
      patch:
        '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]',
    };

    const result = serviceConfigurationRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result = serviceConfigurationRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
  });
});
