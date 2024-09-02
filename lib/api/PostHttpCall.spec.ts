import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaType } from '../utils';
import { PostHttpCall } from './PostHttpCall';

describe('PostHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/users';
  const auth = 'Bearer token123';
  const request = { name: 'John Doe', email: 'john@example.com' };

  let postHttpCall: PostHttpCall;

  const fetch = vi.fn();
  global.fetch = fetch;

  beforeEach(() => {
    postHttpCall = new PostHttpCall(baseUrl, path, auth, request);
    vi.resetAllMocks();
  });

  it('should construct with correct parameters', () => {
    expect(postHttpCall['baseUrl']).toBe(baseUrl);
    expect(postHttpCall['path']).toBe(path);
    expect(postHttpCall['auth']).toBe(auth);
    expect(postHttpCall['request']).toEqual(request);
  });

  it('should call fetch with correct URL and options', async () => {
    const mockResponse = new Response(JSON.stringify({ id: 1 }), {
      status: 201,
    });
    fetch.mockResolvedValue(mockResponse);

    await postHttpCall.call();

    expect(fetch).toHaveBeenCalledWith(new URL(`${baseUrl}${path}`), {
      method: 'POST',
      headers: {
        'Content-Type': MediaType.APPLICATION_JSON_UTF8,
        Authorization: auth,
      },
      body: JSON.stringify(request),
    });
  });

  it('should return the Response from fetch', async () => {
    const mockResponse = new Response(JSON.stringify({ id: 1 }), {
      status: 201,
    });
    fetch.mockResolvedValue(mockResponse);

    const response = await postHttpCall.call();

    expect(response).toBe(mockResponse);
    expect(await response.json()).toEqual({ id: 1 });
    expect(response.status).toBe(201);
  });

  it('should throw an error if fetch fails', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValue(new Error(errorMessage));

    await expect(postHttpCall.call()).rejects.toThrow(errorMessage);
  });
});
