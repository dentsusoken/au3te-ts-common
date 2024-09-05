import { describe, it, expect } from 'vitest';
import { ResponseError } from './ResponseError';
import { HttpStatus } from '../utils';

describe('ResponseError', () => {
  const mockRequest = new Request('https://api.example.com/test');

  it('should create an instance with the correct name', () => {
    const mockResponse = new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    });

    const error = new ResponseError(mockResponse, mockRequest);

    expect(error.name).toBe('ResponseError');
  });

  it('should create an instance with the correct message', () => {
    const mockResponse = new Response(null, {
      status: 403,
      statusText: 'Forbidden',
    });

    const error = new ResponseError(mockResponse, mockRequest);

    const expectedMessage = `ResponseError: ${JSON.stringify(
      { status: 403, statusText: 'Forbidden' },
      undefined,
      2
    )}`;

    expect(error.message).toBe(expectedMessage);
  });

  it('should store the original response and request', () => {
    const mockResponse = new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const error = new ResponseError(mockResponse, mockRequest);

    expect(error.response).toBe(mockResponse);
    expect(error.request).toBe(mockRequest);
  });

  it('should be an instance of Error', () => {
    const mockResponse = new Response();
    const error = new ResponseError(mockResponse, mockRequest);

    expect(error).toBeInstanceOf(Error);
  });

  describe('buildMessageWithBody', () => {
    it('should build the message correctly', async () => {
      const response = new Response('{"error": "Test error"}', {
        status: 400,
        statusText: 'Bad Request',
      });
      const error = new ResponseError(response, mockRequest);

      const message = await error.buildMessageWithBody();

      expect(message).toEqual(
        'ResponseError: {\n' +
          '  "status": 400,\n' +
          '  "statusText": "Bad Request",\n' +
          '  "body": {\n' +
          '    "error": "Test error"\n' +
          '  }\n' +
          '}'
      );
    });

    it('should handle non-JSON response bodies', async () => {
      const response = new Response('Not a JSON', {
        status: 400,
        statusText: 'Bad Request',
      });
      const error = new ResponseError(response, mockRequest);
      const message = await error.buildMessageWithBody();

      expect(message).toEqual(
        'ResponseError: {\n' +
          '  "status": 400,\n' +
          '  "statusText": "Bad Request",\n' +
          '  "body": {}\n' +
          '}'
      );
    });

    it('should handle empty response bodies for NO_CONTENT', async () => {
      const response = new Response(undefined, {
        status: HttpStatus.NO_CONTENT,
        statusText: 'No Content',
      });
      const error = new ResponseError(response, mockRequest);

      const message = await error.buildMessageWithBody();

      expect(message).toEqual(
        'ResponseError: {\n  "status": 204,\n  "statusText": "No Content",\n  "body": {}\n}'
      );
    });
  });
});
