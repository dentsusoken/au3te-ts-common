import { describe, it, expect } from 'vitest';
import { ResponseError } from './ResponseError';

describe('ResponseError', () => {
  it('should be instantiated correctly', () => {
    const message = 'Error message';
    const response = new Response();
    const error = new ResponseError(message, response);

    expect(error).toBeInstanceOf(ResponseError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.response).toBe(response);
  });

  it('should have the correct name property', () => {
    const error = new ResponseError('Error', new Response());
    expect(error.name).toBe('ResponseError');
  });

  it('should generate a stack trace', () => {
    const error = new ResponseError('Error', new Response());
    expect(error.stack).toBeDefined();
  });
});
