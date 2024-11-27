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
      requestedVerifiedClaimsForTx: [
        { array: ['verified1', 'verified2'] },
        { array: ['verified3'] },
      ],
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
      idTokenClaims: {},
      requestedClaimsForTx: ['valid', {}],
      requestedVerifiedClaimsForTx: ['not-array', {}],
    };

    expect(() =>
      authorizationDecisionParamsSchema.parse(invalidParams)
    ).toThrow();
  });

  it('should validate requestedVerifiedClaimsForTx as array of stringArray objects', () => {
    const params: AuthorizationDecisionParams = {
      requestedVerifiedClaimsForTx: [
        { array: ['claim1', 'claim2'] },
        { array: ['claim3'] },
        { array: [] },
      ],
    };

    expect(() => authorizationDecisionParamsSchema.parse(params)).not.toThrow();
  });

  it('should reject invalid requestedVerifiedClaimsForTx structures', () => {
    const invalidParams = {
      requestedVerifiedClaimsForTx: [
        ['invalid'],
        'not-an-array',
        { array: [123] },
      ],
    };

    expect(() =>
      authorizationDecisionParamsSchema.parse(invalidParams)
    ).toThrow();
  });
});
