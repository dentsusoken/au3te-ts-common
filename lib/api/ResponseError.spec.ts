import { describe, it, expect } from 'vitest';
import { ResponseError } from './ResponseError';

describe('ResponseError', () => {
  it('should create an instance with the correct name', () => {
    const mockResponse = new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    });

    const error = new ResponseError(mockResponse);

    expect(error.name).toBe('ResponseError');
  });

  it('should create an instance with the correct message', () => {
    const mockResponse = new Response(null, {
      status: 403,
      statusText: 'Forbidden',
    });

    const error = new ResponseError(mockResponse);

    const expectedMessage = `Response Error: ${JSON.stringify(
      { status: 403, statusText: 'Forbidden' },
      undefined,
      2
    )}`;

    expect(error.message).toBe(expectedMessage);
  });

  it('should store the original response', () => {
    const mockResponse = new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const error = new ResponseError(mockResponse);

    expect(error.response).toBe(mockResponse);
  });

  it('should be an instance of Error', () => {
    const mockResponse = new Response();
    const error = new ResponseError(mockResponse);

    expect(error).toBeInstanceOf(Error);
  });
});
