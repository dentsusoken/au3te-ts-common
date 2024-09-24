import { describe, it, expect } from 'vitest';
import {
  authorizationFailResponseSchema,
  AuthorizationFailResponse,
} from './AuthorizationFailResponse';
import { z } from 'zod';

describe('authorizationFailResponseSchema', () => {
  it('should validate a correct response', () => {
    const validResponse: AuthorizationFailResponse = {
      resultCode: 'A000000',
      resultMessage: 'Success',
      action: 'LOCATION',
      responseContent: 'https://example.com/callback',
    };
    expect(authorizationFailResponseSchema.parse(validResponse)).toEqual(
      validResponse
    );
  });

  it('should allow undefined for responseContent', () => {
    const response: AuthorizationFailResponse = {
      resultCode: 'A000000',
      resultMessage: 'Success',
      action: 'BAD_REQUEST',
      responseContent: undefined,
    };
    expect(authorizationFailResponseSchema.parse(response)).toEqual(response);
  });

  it('should allow omitting responseContent', () => {
    const response = {
      resultCode: 'A000000',
      resultMessage: 'Success',
      action: 'FORM',
    };
    expect(authorizationFailResponseSchema.parse(response)).toEqual(response);
  });

  it('should throw an error for invalid action', () => {
    const invalidResponse = {
      resultCode: 'A000000',
      resultMessage: 'Success',
      action: 'INVALID_ACTION',
    };
    expect(() =>
      authorizationFailResponseSchema.parse(invalidResponse)
    ).toThrow(z.ZodError);
  });
});
