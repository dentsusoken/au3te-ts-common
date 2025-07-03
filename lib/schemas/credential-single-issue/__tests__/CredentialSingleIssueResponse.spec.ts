import { describe, expect, it } from 'vitest';
import {
  credentialSingleIssueResponseSchema,
  CredentialSingleIssueActionEnum,
} from '../CredentialSingleIssueResponse';

describe('credentialSingleIssueResponseSchema', () => {
  it('should validate a successful credential issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: '{"credential":"eyJhbGciOiJSUzI1NiIsInR5cCI6..."}',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a successful JWT credential issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK_JWT,
      responseContent: 'eyJhbGciOiJSUzI1NiIsInR5cCI6...',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a successful deferred issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: 'txn_123',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate a successful encrypted deferred issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED_JWT,
      responseContent: 'eyJhbGciOiJSUzI1NiIsInR5cCI6...',
      transactionId: 'txn_123',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate an error response', () => {
    const errorResponse = {
      action: CredentialSingleIssueActionEnum.BAD_REQUEST,
      responseContent:
        '{"error":"invalid_request","error_description":"Invalid format"}',
    };

    const result = credentialSingleIssueResponseSchema.parse(errorResponse);
    expect(result).toEqual(errorResponse);
  });

  it('should validate an unauthorized response', () => {
    const unauthorizedResponse = {
      action: CredentialSingleIssueActionEnum.UNAUTHORIZED,
      responseContent: 'Bearer error="invalid_token"',
    };

    const result =
      credentialSingleIssueResponseSchema.parse(unauthorizedResponse);
    expect(result).toEqual(unauthorizedResponse);
  });

  it('should validate a forbidden response', () => {
    const forbiddenResponse = {
      action: CredentialSingleIssueActionEnum.FORBIDDEN,
      responseContent:
        '{"error":"forbidden","error_description":"Feature not enabled"}',
    };

    const result = credentialSingleIssueResponseSchema.parse(forbiddenResponse);
    expect(result).toEqual(forbiddenResponse);
  });

  it('should validate an internal server error response', () => {
    const serverErrorResponse = {
      action: CredentialSingleIssueActionEnum.INTERNAL_SERVER_ERROR,
      responseContent:
        '{"error":"server_error","error_description":"Internal error"}',
    };

    const result =
      credentialSingleIssueResponseSchema.parse(serverErrorResponse);
    expect(result).toEqual(serverErrorResponse);
  });

  it('should validate a caller error response', () => {
    const callerErrorResponse = {
      action: CredentialSingleIssueActionEnum.CALLER_ERROR,
      responseContent:
        '{"error":"invalid_request","error_description":"Missing order"}',
    };

    const result =
      credentialSingleIssueResponseSchema.parse(callerErrorResponse);
    expect(result).toEqual(callerErrorResponse);
  });

  it('should validate when optional fields are null', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: null,
      transactionId: null,
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate when optional fields are undefined', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate empty responseContent string', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: '',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate empty transactionId string', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":""}',
      transactionId: '',
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate minimal valid response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
    };

    const result = credentialSingleIssueResponseSchema.parse(validResponse);
    expect(result).toEqual(validResponse);
  });

  it('should validate real-world example', () => {
    const realWorldResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: JSON.stringify({
        credential:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        format: 'jwt_vc_json',
        c_nonce: 'nonce-123',
        c_nonce_expires_in: 300,
      }),
    };

    const result = credentialSingleIssueResponseSchema.parse(realWorldResponse);
    expect(result).toEqual(realWorldResponse);
  });

  // Failure cases
  it('should reject missing required action field', () => {
    const invalidResponse = {
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject invalid action value', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as number', () => {
    const invalidResponse = {
      action: 123,
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as boolean', () => {
    const invalidResponse = {
      action: true,
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as null', () => {
    const invalidResponse = {
      action: null,
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject action as undefined', () => {
    const invalidResponse = {
      action: undefined,
      responseContent: '{"credential":"..."}',
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as number', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: 123,
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as boolean', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: true,
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as object', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: { credential: '...' },
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject responseContent as array', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: ['credential', '...'],
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject transactionId as number', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: 123,
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject transactionId as boolean', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: true,
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject transactionId as object', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: { id: 'txn_123' },
    };

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject empty object', () => {
    const invalidResponse = {};

    const result =
      credentialSingleIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = credentialSingleIssueResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = credentialSingleIssueResponseSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 =
      credentialSingleIssueResponseSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = credentialSingleIssueResponseSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = credentialSingleIssueResponseSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = credentialSingleIssueResponseSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});
