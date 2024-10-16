import { describe, it, expect } from 'vitest';
import {
  authorizationDecisionParamsSchema,
  AuthorizationDecisionParams,
} from './AuthorizationDecisionParams';

describe('authorizationDecisionParams', () => {
  it('should validate a correct object', () => {
    const validParams: AuthorizationDecisionParams = {
      ticket: 'valid-ticket',
      claimNames: ['name', 'email'],
      claimLocales: ['en', 'ja'],
      idTokenClaims: 'id-token-claim',
      requestedClaimsForTx: ['claim1', 'claim2'],
      requestedVerifiedClaimsForTx: [{ array: ['verified1', 'verified2'] }],
    };

    expect(() =>
      authorizationDecisionParamsSchema.parse(validParams)
    ).not.toThrow();
  });

  it('should allow all fields to be undefined', () => {
    const undefinedParams: AuthorizationDecisionParams = {};

    expect(() =>
      authorizationDecisionParamsSchema.parse(undefinedParams)
    ).not.toThrow();
  });

  it('should allow all fields to be undefined', () => {
    const nullParams: AuthorizationDecisionParams = {
      ticket: undefined,
      claimNames: undefined,
      claimLocales: undefined,
      idTokenClaims: undefined,
      requestedClaimsForTx: undefined,
      requestedVerifiedClaimsForTx: undefined,
    };

    expect(() =>
      authorizationDecisionParamsSchema.parse(nullParams)
    ).not.toThrow();
  });

  it('should reject invalid types', () => {
    const invalidParams = {
      ticket: 123,
      claimNames: 'not an array',
      claimLocales: [123],
      idTokenClaim: {},
      requestedClaimsForTx: ['valid', ['invalid']],
      requestedVerifiedClaimsForTx: [{}],
    };

    expect(() =>
      authorizationDecisionParamsSchema.parse(invalidParams)
    ).toThrow();
  });
});
