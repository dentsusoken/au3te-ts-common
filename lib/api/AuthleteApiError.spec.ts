import { describe, it, expect } from 'vitest';
import { AuthleteApiError } from './AuthleteApiError';

describe('AuthleteApiError', () => {
  const url = new URL('https://api.example.com/endpoint');
  const requestInit: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'value' }),
  };

  it('should create an instance with cause', () => {
    const cause = new Error('Original error');
    const error = new AuthleteApiError(url, requestInit, cause);

    expect(error).toBeInstanceOf(AuthleteApiError);
    expect(error.message).toContain('Authlete API failure');
    expect(error.message).toContain(url.toString());
    expect(error.message).toContain(JSON.stringify(requestInit, undefined, 2));
    expect(error.message).toContain(cause.toString());
    expect(error.cause).toBe(cause);
    expect(error.response).toBeUndefined();
  });

  it('should create an instance with response', () => {
    const response = new Response('Not Found', { status: 404 });
    const responseContent = {
      status: 404,
      statusText: '',
      headers: {},
    };
    const error = new AuthleteApiError(url, requestInit, undefined, response);

    expect(error).toBeInstanceOf(AuthleteApiError);
    expect(error.message).toContain('Authlete API failure');
    expect(error.message).toContain(url.toString());
    expect(error.message).toContain(JSON.stringify(requestInit, undefined, 2));
    expect(error.message).toContain(
      `response: ${JSON.stringify(responseContent, undefined, 2)}`
    );
    expect(error.cause).toBeUndefined();
    expect(error.response).toBe(response);
  });

  it('should capture stack trace', () => {
    const error = new AuthleteApiError(url, requestInit);
    expect(error.stack).toContain('AuthleteApiError');
    expect(error.stack).toContain(__filename);
  });
});
