import { describe, it, expect } from 'vitest';
import { serviceConfigurationRequestSchema } from '../ServiceConfigurationRequest';

describe('serviceConfigurationRequestSchema', () => {
  it('should validate a valid request with all fields', () => {
    const validRequest = {
      pretty: true,
      patch:
        '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]',
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a request with only pretty field', () => {
    const validRequest = {
      pretty: true,
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a request with only patch field', () => {
    const validRequest = {
      patch: '[{"op":"add","path":"/custom_metadata","value":"custom_value"}]',
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should allow missing optional fields', () => {
    const minimalRequest = {};

    const result = serviceConfigurationRequestSchema.parse(minimalRequest);
    expect(result).toEqual(minimalRequest);
  });

  it('should validate when optional fields are null', () => {
    const validRequest = {
      pretty: null,
      patch: null,
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate when optional fields are undefined', () => {
    const validRequest = {
      pretty: undefined,
      patch: undefined,
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate empty string for patch field', () => {
    const validRequest = {
      pretty: false,
      patch: '',
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate real-world examples', () => {
    const examples = [
      {
        pretty: true,
        patch:
          '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]',
      },
      {
        pretty: false,
        patch:
          '[{"op":"add","path":"/custom_metadata","value":"custom_value"}]',
      },
      {
        pretty: true,
        patch:
          '[{"op":"add","path":"/acr_values_supported/0","value":"acr0"},{"op":"add","path":"/acr_values_supported/-","value":"acr2"}]',
      },
      {
        pretty: false,
        patch:
          '[{"op":"add","path":"/mtls_endpoint_aliases/token_endpoint","value":"https://as.example.com/mtls/token"}]',
      },
      {
        pretty: true,
        patch: '[{"op":"remove","path":"/acr_values_supported"}]',
      },
    ];

    examples.forEach((example) => {
      const result = serviceConfigurationRequestSchema.parse(example);
      expect(result).toEqual(example);
    });
  });

  it('should validate boolean values for pretty field', () => {
    const trueRequest = { pretty: true };
    const falseRequest = { pretty: false };

    const result1 = serviceConfigurationRequestSchema.parse(trueRequest);
    expect(result1).toEqual(trueRequest);

    const result2 = serviceConfigurationRequestSchema.parse(falseRequest);
    expect(result2).toEqual(falseRequest);
  });

  it('should validate complex JSON patch strings', () => {
    const validRequest = {
      pretty: true,
      patch: JSON.stringify([
        { op: 'replace', path: '/subject_types_supported', value: ['public'] },
        { op: 'add', path: '/custom_metadata', value: { key: 'value' } },
        { op: 'remove', path: '/unwanted_field' },
      ]),
    };

    const result = serviceConfigurationRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  // Failure cases
  it('should reject pretty as string', () => {
    const invalidRequest = {
      pretty: 'true',
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as number', () => {
    const invalidRequest = {
      pretty: 1,
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as object', () => {
    const invalidRequest = {
      pretty: { value: true },
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject pretty as array', () => {
    const invalidRequest = {
      pretty: [true],
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject patch as boolean', () => {
    const invalidRequest = {
      patch: true,
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject patch as number', () => {
    const invalidRequest = {
      patch: 123,
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject patch as object', () => {
    const invalidRequest = {
      patch: { op: 'replace', path: '/test', value: 'test' },
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject patch as array', () => {
    const invalidRequest = {
      patch: [{ op: 'replace', path: '/test', value: 'test' }],
    };

    const result = serviceConfigurationRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = serviceConfigurationRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = serviceConfigurationRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      serviceConfigurationRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = serviceConfigurationRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = serviceConfigurationRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = serviceConfigurationRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
