import { describe, expect, it } from 'vitest';
import { credentialSingleIssueRequestSchema } from '../CredentialSingleIssueRequest';

describe('credentialSingleIssueRequestSchema', () => {
  it('should validate a valid request with all required fields', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate a valid request with all optional fields', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialPayload: '{"vct":"Diploma","sub":"79301273"}',
        issuanceDeferred: false,
        credentialDuration: 3600,
        signingKeyId: 'key-1',
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate when optional fields in order are null', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialPayload: null,
        issuanceDeferred: null,
        credentialDuration: null,
        signingKeyId: null,
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate when optional fields in order are undefined', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialPayload: undefined,
        issuanceDeferred: undefined,
        credentialDuration: undefined,
        signingKeyId: undefined,
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate complex real-world example', () => {
    const realWorldRequest = {
      accessToken:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      order: {
        requestIdentifier: 'req_1234567890abcdef',
        credentialPayload: JSON.stringify({
          vct: 'UniversityDegree',
          sub: 'did:example:1234567890abcdef',
          family_name: 'Smith',
          given_name: 'John',
          degree: {
            type: 'BachelorDegree',
            name: 'Bachelor of Science',
            major: 'Computer Science',
          },
          graduation_date: '2023-06-15',
        }),
        issuanceDeferred: false,
        credentialDuration: 15768000, // 6 months
        signingKeyId: 'key_2023_01',
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(realWorldRequest);
    expect(result).toEqual(realWorldRequest);
  });

  it('should validate empty accessToken', () => {
    const validRequest = {
      accessToken: '',
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  it('should validate empty requestIdentifier', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: '',
      },
    };

    const result = credentialSingleIssueRequestSchema.parse(validRequest);
    expect(result).toEqual(validRequest);
  });

  // Failure cases
  it('should reject missing accessToken', () => {
    const invalidRequest = {
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject missing order', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject missing requestIdentifier in order', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        credentialPayload: '{"vct":"Diploma"}',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid accessToken type', () => {
    const invalidRequest = {
      accessToken: 123,
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as boolean', () => {
    const invalidRequest = {
      accessToken: true,
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as null', () => {
    const invalidRequest = {
      accessToken: null,
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject accessToken as undefined', () => {
    const invalidRequest = {
      accessToken: undefined,
      order: {
        requestIdentifier: 'abc123',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid order type', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: 'not-an-order',
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject order as null', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: null,
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject order as undefined', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: undefined,
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid requestIdentifier type', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 123,
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject credentialDuration as string', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialDuration: '3600',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject issuanceDeferred as string', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        issuanceDeferred: 'true',
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject credentialPayload as object', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialPayload: { vct: 'Diploma' },
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject signingKeyId as number', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        signingKeyId: 123,
      },
    };

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidRequest = {};

    const result = credentialSingleIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialSingleIssueRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialSingleIssueRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialSingleIssueRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialSingleIssueRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialSingleIssueRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialSingleIssueRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
