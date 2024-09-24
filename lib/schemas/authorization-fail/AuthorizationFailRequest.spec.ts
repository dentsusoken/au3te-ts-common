import { describe, it, expect } from 'vitest';
import {
  authorizationFailRequestSchema,
  AuthorizationFailRequest,
} from './AuthorizationFailRequest';

describe('AuthorizationFailRequest', () => {
  it('should validate a correct request', () => {
    const validRequest: AuthorizationFailRequest = {
      reason: 'UNKNOWN',
      ticket: 'some-ticket',
      description: 'Some description',
    };
    expect(authorizationFailRequestSchema.parse(validRequest)).toEqual(
      validRequest
    );
  });

  it('should allow null values for optional fields', () => {
    const request = {
      reason: 'NOT_LOGGED_IN',
      ticket: null,
      description: null,
    };

    const parsed = authorizationFailRequestSchema.parse(request);

    expect(parsed).toEqual({
      reason: 'NOT_LOGGED_IN',
      ticket: undefined,
      description: undefined,
    });
  });

  it('should allow omitting optional fields', () => {
    const request = {
      reason: 'NOT_LOGGED_IN',
    };

    const parsed = authorizationFailRequestSchema.parse(request);

    expect(parsed).toEqual({
      reason: 'NOT_LOGGED_IN',
      ticket: undefined,
      description: undefined,
    });
  });

  it('should throw an error for invalid reason', () => {
    const invalidRequest = {
      reason: 'INVALID_REASON',
      ticket: 'some-ticket',
    };
    expect(() =>
      authorizationFailRequestSchema.parse(invalidRequest)
    ).toThrow();
  });
});
