import { describe, it, expect } from 'vitest';
import {
  authorizationIssueRequestSchema,
  AuthorizationIssueRequest,
} from './AuthorizationIssueRequest';

describe('authorizationIssueRequest', () => {
  const validRequest: AuthorizationIssueRequest = {
    ticket: 'valid-ticket',
    subject: 'test-subject',
    sub: 'test-sub',
    authTime: 1234567890,
    acr: 'test-acr',
    claims: '{"claim1": "value1"}',
    properties: [{ key: 'prop1', value: 'value1' }],
    scopes: ['scope1', 'scope2'],
    idtHeaderParams: '{"alg": "RS256"}',
    authorizationDetails: {
      elements: [{ type: 'payment_initiation', actions: ['read', 'write'] }],
    },
    consentedClaims: ['claim1', 'claim2'],
    claimsForTx: '{"tx_claim1": "value1"}',
    verifiedClaimsForTx: ['{"verified_claim1": "value1"}'],
    jwtAtClaims: '{"additional_claim": "value"}',
    accessToken: 'test-access-token',
    idTokenAudType: 'array',
    accessTokenDuration: 3600,
  };

  it('validates a correct request object', () => {
    expect(() =>
      authorizationIssueRequestSchema.parse(validRequest)
    ).not.toThrow();
  });

  it('requires ticket to be a string', () => {
    const invalidRequest = { ...validRequest, ticket: 123 };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('allows null and undefined for optional fields', () => {
    const nullRequest = { ...validRequest, subject: null, sub: undefined };
    expect(() =>
      authorizationIssueRequestSchema.parse(nullRequest)
    ).not.toThrow();
  });

  it('validates authTime as a number', () => {
    const invalidRequest = { ...validRequest, authTime: '1234567890' };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('validates properties as an array of Property objects', () => {
    const invalidRequest = {
      ...validRequest,
      properties: [{ key: 1 }],
    };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('validates scopes as an array of strings', () => {
    const invalidRequest = { ...validRequest, scopes: ['valid', 123] };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('validates authorizationDetails schema', () => {
    const invalidRequest = {
      ...validRequest,
      authorizationDetails: [{ invalid: 'detail' }],
    };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('allows an empty object', () => {
    const emptyRequest = { ticket: 'valid-ticket' };
    expect(() =>
      authorizationIssueRequestSchema.parse(emptyRequest)
    ).not.toThrow();
  });

  it('validates accessTokenDuration as a number', () => {
    const invalidRequest = { ...validRequest, accessTokenDuration: '3600' };
    expect(() =>
      authorizationIssueRequestSchema.parse(invalidRequest)
    ).toThrow();
  });

  it('correctly infers the AuthorizationIssueRequest type', () => {
    const request: AuthorizationIssueRequest = validRequest;
    expect(authorizationIssueRequestSchema.parse(request)).toEqual(request);
  });
});
