import { describe, it, expect } from 'vitest';
import { AuthleteApiException } from './AuthleteApiException';

describe('AuthleteApiException', () => {
  it('should create an instance with the provided properties', () => {
    const message = 'An error occurred';
    const statusCode = 400;
    const statusMessage = 'Bad Request';
    const responseBody = 'Invalid request';
    const responseHeaders = { 'Content-Type': 'application/json' };

    const exception = new AuthleteApiException(
      message,
      statusCode,
      statusMessage,
      responseBody,
      responseHeaders
    );

    expect(exception.message).toBe(message);
    expect(exception.statusCode).toBe(statusCode);
    expect(exception.statusMessage).toBe(statusMessage);
    expect(exception.responseBody).toBe(responseBody);
    expect(exception.responseHeaders).toEqual(responseHeaders);
  });

  it('should create an instance with default values when optional properties are omitted', () => {
    const message = 'An error occurred';

    const exception = new AuthleteApiException(message);

    expect(exception.message).toBe(message);
    expect(exception.statusCode).toBe(0);
    expect(exception.statusMessage).toBeUndefined();
    expect(exception.responseBody).toBeUndefined();
    expect(exception.responseHeaders).toBeUndefined();
  });

  it('should be an instance of Error', () => {
    const exception = new AuthleteApiException('An error occurred');

    expect(exception).toBeInstanceOf(Error);
  });
});
