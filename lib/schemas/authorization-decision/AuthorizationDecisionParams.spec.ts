import { describe, it, expect } from 'vitest';
import {
  authorizationDecisionParams,
  AuthorizationDecisionParams,
} from './AuthorizationDecisionParams';

describe('authorizationDecisionParams', () => {
  it('should validate a correct object', () => {
    const validParams: AuthorizationDecisionParams = {
      ticket: 'valid-ticket',
      claimNames: ['name', 'email'],
      claimLocales: ['en', 'ja'],
      idTokenClaim: 'id-token-claim',
      requestedClaimsForTx: ['claim1', 'claim2'],
      requestedVerifiedClaimsForTx: ['verified1', 'verified2'],
    };

    expect(() => authorizationDecisionParams.parse(validParams)).not.toThrow();
  });

  it('should allow all fields to be undefined', () => {
    const undefinedParams: AuthorizationDecisionParams = {};

    expect(() =>
      authorizationDecisionParams.parse(undefinedParams)
    ).not.toThrow();
  });

  it('should allow all fields to be undefined', () => {
    const nullParams: AuthorizationDecisionParams = {
      ticket: undefined,
      claimNames: undefined,
      claimLocales: undefined,
      idTokenClaim: undefined,
      requestedClaimsForTx: undefined,
      requestedVerifiedClaimsForTx: undefined,
    };

    expect(() => authorizationDecisionParams.parse(nullParams)).not.toThrow();
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

    expect(() => authorizationDecisionParams.parse(invalidParams)).toThrow();
  });
});
