import { describe, it, expect } from 'vitest';
import { BadRequestError } from './BadRequestError';
import { ErrorJsonError } from './ErrorJsonError';

describe('BadRequestError', () => {
  // Should create an error with the correct name and message
  it('should set the correct error name and formatted message', () => {
    const error = new BadRequestError('invalid_request', 'Invalid request');

    expect(error.name).toBe('BadRequestError');
    expect(error.message).toBe(
      '{"error":"invalid_request","error_description":"Invalid request"}'
    );
  });

  // Should be instance of Error, ErrorJsonError and BadRequestError
  it('should maintain proper inheritance chain', () => {
    const error = new BadRequestError(
      'invalid_client',
      'Client authentication failed'
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ErrorJsonError);
    expect(error).toBeInstanceOf(BadRequestError);
  });

  // Should handle empty error description
  it('should handle empty error description', () => {
    const error = new BadRequestError('invalid_scope', '');

    expect(error.message).toBe(
      '{"error":"invalid_scope","error_description":""}'
    );
  });
});
