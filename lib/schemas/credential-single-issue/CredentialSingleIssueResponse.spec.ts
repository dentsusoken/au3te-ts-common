import { describe, expect, it } from 'vitest';
import {
  credentialSingleIssueResponseSchema,
  CredentialSingleIssueActionEnum,
} from './CredentialSingleIssueResponse';

describe('credentialSingleIssueResponseSchema', () => {
  it('should validate a successful credential issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: '{"credential":"eyJhbGciOiJSUzI1NiIsInR5cCI6..."}',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate a successful JWT credential issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK_JWT,
      responseContent: 'eyJhbGciOiJSUzI1NiIsInR5cCI6...',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate a successful deferred issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: 'txn_123',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate a successful encrypted deferred issuance response', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED_JWT,
      responseContent: 'eyJhbGciOiJSUzI1NiIsInR5cCI6...',
      transactionId: 'txn_123',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate an error response', () => {
    const errorResponse = {
      action: CredentialSingleIssueActionEnum.BAD_REQUEST,
      responseContent:
        '{"error":"invalid_request","error_description":"Invalid format"}',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(errorResponse)
    ).not.toThrow();
  });

  it('should validate an unauthorized response', () => {
    const unauthorizedResponse = {
      action: CredentialSingleIssueActionEnum.UNAUTHORIZED,
      responseContent: 'Bearer error="invalid_token"',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(unauthorizedResponse)
    ).not.toThrow();
  });

  it('should validate when optional fields are null', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: null,
      transactionId: null,
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should validate when optional fields are undefined', () => {
    const validResponse = {
      action: CredentialSingleIssueActionEnum.OK,
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it('should throw error when action is missing', () => {
    const invalidResponse = {
      responseContent: '{"credential":"..."}',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(invalidResponse)
    ).toThrow();
  });

  it('should throw error when action is invalid', () => {
    const invalidResponse = {
      action: 'INVALID_ACTION',
      responseContent: '{"credential":"..."}',
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(invalidResponse)
    ).toThrow();
  });

  it('should throw error when responseContent is not a string when provided', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.OK,
      responseContent: { credential: '...' },
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(invalidResponse)
    ).toThrow();
  });

  it('should throw error when transactionId is not a string when provided', () => {
    const invalidResponse = {
      action: CredentialSingleIssueActionEnum.ACCEPTED,
      responseContent: '{"transaction_id":"txn_123"}',
      transactionId: 123,
    };

    expect(() =>
      credentialSingleIssueResponseSchema.parse(invalidResponse)
    ).toThrow();
  });
});
