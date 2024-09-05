import { describe, it, expect, vi } from 'vitest';
import { ResponseError } from '../api/ResponseError';
import {
  buildResponseErrorMessage,
  defaultBuildErrorMessage,
} from './buildErrorMessage';

describe('buildResponseErrorMessage', () => {
  it('should return the result of buildMessageWithBody when successful', async () => {
    const buildMessageWithBody = vi
      .fn()
      .mockResolvedValue('Detailed error message');
    const error = {
      name: 'ResponseError',
      request: {} as Request,
      response: {} as Response,
      body: undefined,
      message: 'Test error',
      buildMessageWithBody,
    } as ResponseError;

    const result = await buildResponseErrorMessage(error);
    expect(result).toBe('Detailed error message');
    expect(buildMessageWithBody).toHaveBeenCalled();
  });

  it('should fall back to error.message when buildMessageWithBody fails', async () => {
    const buildMessageWithBody = vi
      .fn()
      .mockRejectedValue(new Error('Build failed'));
    const error = {
      name: 'ResponseError',
      request: {} as Request,
      response: {} as Response,
      body: undefined,
      message: 'Test error',
      buildMessageWithBody,
    } as ResponseError;

    const result = await buildResponseErrorMessage(error);
    expect(result).toBe('Test error');
    expect(buildMessageWithBody).toHaveBeenCalled();
  });
});

describe('defaultBuildErrorMessage', () => {
  it('should use buildResponseErrorMessage for ResponseError', async () => {
    const error = new ResponseError(new Response('{"aaa":1}'), {} as Request);

    const result = await defaultBuildErrorMessage(error);
    expect(result).toBe(
      'ResponseError: {\n' +
        '  "status": 200,\n' +
        '  "statusText": "",\n' +
        '  "body": {\n' +
        '    "aaa": 1\n' +
        '  }\n' +
        '}'
    );
  });

  it('should use getErrorMessage for non-ResponseError', async () => {
    const error = new Error('Regular error');

    const result = await defaultBuildErrorMessage(error);
    expect(result).toBe('Regular error');
  });

  it('should handle non-Error objects', async () => {
    const nonError = { message: 'Not an error' };

    const result = await defaultBuildErrorMessage(nonError);
    expect(result).toBe('{"message":"Not an error"}');
  });
});
