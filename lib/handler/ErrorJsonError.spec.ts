import { describe, it, expect } from 'vitest';
import { ErrorJsonError } from './ErrorJsonError';

describe('ErrorJsonError', () => {
  // Should create an error with the correct name and message
  it('should set the correct error name and formatted message', () => {
    const error = new ErrorJsonError('invalid_request', 'Invalid request');

    expect(error.name).toBe('ErrorJsonError');
    expect(error.message).toBe(
      '{"error":"invalid_request","error_description":"Invalid request"}'
    );
  });

  // Should be instance of Error and ErrorJsonError
  it('should be instance of Error and ErrorJsonError', () => {
    const error = new ErrorJsonError('server_error', 'Internal error');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ErrorJsonError);
  });

  // Should handle empty error description
  it('should handle empty error description', () => {
    const error = new ErrorJsonError('access_denied', '');

    expect(error.message).toBe(
      '{"error":"access_denied","error_description":""}'
    );
  });
});
