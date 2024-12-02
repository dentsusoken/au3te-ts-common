import { describe, expect, it } from 'vitest';
import { credentialSingleIssueRequestSchema } from './CredentialSingleIssueRequest';

describe('credentialSingleIssueRequestSchema', () => {
  it('should validate a valid request with all required fields', () => {
    const validRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
      },
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(validRequest)
    ).not.toThrow();
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

    expect(() =>
      credentialSingleIssueRequestSchema.parse(validRequest)
    ).not.toThrow();
  });

  it('should throw error when accessToken is missing', () => {
    const invalidRequest = {
      order: {
        requestIdentifier: 'abc123',
      },
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('should throw error when order is missing', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('should throw error when requestIdentifier in order is missing', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        credentialPayload: '{"vct":"Diploma"}',
      },
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
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

    expect(() =>
      credentialSingleIssueRequestSchema.parse(validRequest)
    ).not.toThrow();
  });

  it('should throw error when credentialDuration is not a number', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        credentialDuration: '3600',
      },
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('should throw error when issuanceDeferred is not a boolean', () => {
    const invalidRequest = {
      accessToken: 'example_access_token',
      order: {
        requestIdentifier: 'abc123',
        issuanceDeferred: 'true',
      },
    };

    expect(() =>
      credentialSingleIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });
});
