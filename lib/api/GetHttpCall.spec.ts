import { describe, it, expect, vi } from 'vitest';
import { GetHttpCall } from './GetHttpCall';

describe('GetHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/data';
  const auth = 'Bearer token';
  const request = { key1: 'value1', key2: { nested: 'value' } };

  it('should create a valid URL with search params', () => {
    const getHttpCall = new GetHttpCall(baseUrl, path, auth, request);
    expect(getHttpCall.url.href).toEqual(
      'https://api.example.com/data?key1=value1&key2=%7B%22nested%22%3A%22value%22%7D'
    );
  });

  it('should have the correct request options', () => {
    const getHttpCall = new GetHttpCall(baseUrl, path, auth, request);
    expect(getHttpCall.requestInit).toEqual({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: auth,
      },
    });
  });

  it('should execute the HTTP GET request', async () => {
    const mockResponse = new Response('{"data": "test"}');
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const getHttpCall = new GetHttpCall(baseUrl, path, auth, request);
    const response = await getHttpCall.call();

    expect(global.fetch).toHaveBeenCalledWith(
      getHttpCall.url,
      getHttpCall.requestInit
    );
    expect(response).toEqual(mockResponse);
  });
});
