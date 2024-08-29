import { describe, it, expect, vi } from 'vitest';
import { PostHttpCall } from './PostHttpCall';

describe('PostHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/data';
  const auth = 'Bearer token';
  const request = { key: 'value' };

  it('should create the correct URL', () => {
    const postHttpCall = new PostHttpCall(baseUrl, path, auth, request);
    expect(postHttpCall.url.href).toEqual('https://api.example.com/data');
  });

  it('should have the correct request options', () => {
    const postHttpCall = new PostHttpCall(baseUrl, path, auth, request);
    expect(postHttpCall.requestInit).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: auth,
      },
      body: JSON.stringify(request),
    });
  });

  it('should execute the HTTP POST request', async () => {
    const mockResponse = new Response('{"data": "test"}');
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const postHttpCall = new PostHttpCall(baseUrl, path, auth, request);
    const response = await postHttpCall.call();

    expect(global.fetch).toHaveBeenCalledWith(
      postHttpCall.url,
      postHttpCall.requestInit
    );
    expect(response).toEqual(mockResponse);
  });
});
