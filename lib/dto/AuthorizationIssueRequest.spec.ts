import { describe, it, expect } from 'vitest';
import { AuthorizationIssueRequest } from './AuthorizationIssueRequest';

describe('AuthorizationIssueRequest', () => {
  it('should set and get claimsForTx correctly', () => {
    const request = new AuthorizationIssueRequest();

    // Test setting claimsForTx with a string
    request.claimsForTx = 'claims';
    expect(request.claimsForTx).toBe('claims');

    // Test setting claimsForTx with an object
    request.claimsForTx = { name: 'John', age: 30 };
    expect(request.claimsForTx).toBe('{"name":"John","age":30}');

    // Test setting claimsForTx with undefined
    request.claimsForTx = undefined;
    expect(request.claimsForTx).toBeUndefined();

    // Test setting claimsForTx with an empty object
    request.claimsForTx = {};
    expect(request.claimsForTx).toBeUndefined();
  });

  it('should set and get verifiedClaimsForTx correctly', () => {
    const request = new AuthorizationIssueRequest();

    // Test setting verifiedClaimsForTx with an array of strings
    request.verifiedClaimsForTx = ['claim1', 'claim2'];
    expect(request.verifiedClaimsForTx).toEqual(['claim1', 'claim2']);

    // Test setting verifiedClaimsForTx with an array of objects
    request.verifiedClaimsForTx = [{ name: 'John' }, { age: 30 }];
    expect(request.verifiedClaimsForTx).toEqual([
      '{"name":"John"}',
      '{"age":30}',
    ]);

    // Test setting verifiedClaimsForTx with undefined
    request.verifiedClaimsForTx = undefined;
    expect(request.verifiedClaimsForTx).toBeUndefined();

    // Test setting verifiedClaimsForTx with an empty array
    request.verifiedClaimsForTx = [];
    expect(request.verifiedClaimsForTx).toBeUndefined();
  });

  it('should initialize properties correctly', () => {
    const request = new AuthorizationIssueRequest();

    expect(request.ticket).toBeUndefined();
    expect(request.subject).toBeUndefined();
    expect(request.sub).toBeUndefined();
    expect(request.authTime).toBeUndefined();
    expect(request.acr).toBeUndefined();
    expect(request.claims).toBeUndefined();
    expect(request.properties).toBeUndefined();
    expect(request.scopes).toBeUndefined();
    expect(request.idtHeaderParams).toBeUndefined();
    expect(request.authorizationDetails).toBeUndefined();
    expect(request.consentedClaims).toBeUndefined();
    expect(request.jwtAtClaims).toBeUndefined();
    expect(request.accessToken).toBeUndefined();
    expect(request.idTokenAudType).toBeUndefined();
    expect(request.accessTokenDuration).toBeUndefined();
  });
});
