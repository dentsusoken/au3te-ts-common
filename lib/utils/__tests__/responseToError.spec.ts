import { describe, it, expect } from 'vitest';
import { responseToError } from '../responseToError';

describe('responseToError', () => {
  it('should create error with correct message for 404 status', () => {
    const response = new Response(undefined, {
      status: 404,
      statusText: 'Not Found',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid response with status 404 Not Found');
  });

  it('should create error with correct message for 500 status', () => {
    const response = new Response(undefined, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      'Invalid response with status 500 Internal Server Error'
    );
  });

  it('should create error with correct message for 400 status', () => {
    const response = new Response(undefined, {
      status: 400,
      statusText: 'Bad Request',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid response with status 400 Bad Request');
  });

  it('should create error with correct message for 401 status', () => {
    const response = new Response(undefined, {
      status: 401,
      statusText: 'Unauthorized',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid response with status 401 Unauthorized');
  });

  it('should create error with correct message for 403 status', () => {
    const response = new Response(undefined, {
      status: 403,
      statusText: 'Forbidden',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid response with status 403 Forbidden');
  });

  it('should create error with correct message for 422 status', () => {
    const response = new Response(undefined, {
      status: 422,
      statusText: 'Unprocessable Entity',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      'Invalid response with status 422 Unprocessable Entity'
    );
  });

  it('should create error with correct message for status with empty statusText', () => {
    const response = new Response(undefined, {
      status: 418,
      statusText: '',
    });

    const error = responseToError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid response with status 418 ');
  });
});
