import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaType } from '../utils';
import { PostHttpCall } from './PostHttpCall';

describe('PostHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/users';
  const auth = 'Bearer token123';
  const parameters = { name: 'John Doe', email: 'john@example.com' };

  let postHttpCall: PostHttpCall;

  const fetch = vi.fn();
  global.fetch = fetch;

  beforeEach(() => {
    postHttpCall = new PostHttpCall(baseUrl, path, auth, parameters);
    vi.resetAllMocks();
  });

  it('should construct with correct parameters', () => {
    expect(postHttpCall['baseUrl']).toBe(baseUrl);
    expect(postHttpCall['path']).toBe(path);
    expect(postHttpCall['auth']).toBe(auth);
    expect(postHttpCall['parameters']).toEqual(parameters);
  });

  it('should initialize request property correctly', () => {
    expect(postHttpCall.request).toBeInstanceOf(Request);
    expect(postHttpCall.request.url).toBe(`${baseUrl}${path}`);
    expect(postHttpCall.request.method).toBe('POST');
    expect(postHttpCall.request.headers.get('Content-Type')).toBe(
      MediaType.APPLICATION_JSON_UTF8
    );
    expect(postHttpCall.request.headers.get('Authorization')).toBe(auth);
  });

  it('should call fetch with correct request when call() is invoked', async () => {
    const mockResponse = new Response(JSON.stringify({ id: 1 }), {
      status: 201,
    });
    fetch.mockResolvedValue(mockResponse);

    await postHttpCall.call();

    expect(fetch).toHaveBeenCalledWith(postHttpCall.request);
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

  it('should handle empty parameters object', () => {
    const emptyPostHttpCall = new PostHttpCall(baseUrl, path, auth, {});
    expect(emptyPostHttpCall.request.url).toBe(`${baseUrl}${path}`);
  });

  it('should handle special characters in URL', () => {
    const specialPath = '/users?id=123&type=special';
    const specialPostHttpCall = new PostHttpCall(
      baseUrl,
      specialPath,
      auth,
      parameters
    );
    expect(specialPostHttpCall.request.url).toBe(`${baseUrl}${specialPath}`);
  });
});
