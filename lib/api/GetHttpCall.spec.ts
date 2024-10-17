import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaType } from '../utils';
import { GetHttpCall } from './GetHttpCall';

describe('GetHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/users';
  const auth = 'Bearer token123';
  const parameters = { name: 'John Doe', email: 'john@example.com' };

  let GETHttpCall: GetHttpCall;

  const fetch = vi.fn();
  global.fetch = fetch;

  beforeEach(() => {
    GETHttpCall = new GetHttpCall(baseUrl, path, auth, parameters);
    vi.resetAllMocks();
  });

  it('should construct with correct parameters', () => {
    expect(GETHttpCall['baseUrl']).toBe(baseUrl);
    expect(GETHttpCall['path']).toBe(path);
    expect(GETHttpCall['auth']).toBe(auth);
    expect(GETHttpCall['parameters']).toEqual(parameters);
  });

  it('should initialize request property correctly', () => {
    const searchParams = new URLSearchParams(parameters);
    expect(GETHttpCall.request).toBeInstanceOf(Request);
    expect(GETHttpCall.request.url).toBe(
      `${baseUrl}${path}?${searchParams.toString()}`
    );
    expect(GETHttpCall.request.method).toBe('GET');
    expect(GETHttpCall.request.headers.get('Content-Type')).toBe(
      MediaType.APPLICATION_JSON_UTF8
    );
    expect(GETHttpCall.request.headers.get('Authorization')).toBe(auth);
  });

  it('should call fetch with correct request when call() is invoked', async () => {
    const mockResponse = new Response(JSON.stringify({ id: 1 }), {
      status: 201,
    });
    fetch.mockResolvedValue(mockResponse);

    await GETHttpCall.call();

    expect(fetch).toHaveBeenCalledWith(GETHttpCall.request);
  });

  it('should return the Response from fetch', async () => {
    const mockResponse = new Response(JSON.stringify({ id: 1 }), {
      status: 201,
    });
    fetch.mockResolvedValue(mockResponse);

    const response = await GETHttpCall.call();

    expect(response).toBe(mockResponse);
    expect(await response.json()).toEqual({ id: 1 });
    expect(response.status).toBe(201);
  });

  it('should throw an error if fetch fails', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValue(new Error(errorMessage));

    await expect(GETHttpCall.call()).rejects.toThrow(errorMessage);
  });

  it('should handle empty parameters object', () => {
    const emptyGETHttpCall = new GetHttpCall(baseUrl, path, auth, {});
    expect(emptyGETHttpCall.request.url).toBe(`${baseUrl}${path}`);
  });

  it('should handle special characters in URL', () => {
    const searchParams = new URLSearchParams(parameters);
    const specialPath = '/users?id=123&type=special';
    const specialGETHttpCall = new GetHttpCall(
      baseUrl,
      specialPath,
      auth,
      parameters
    );
    expect(specialGETHttpCall.request.url).toBe(
      `${baseUrl}${specialPath}&${searchParams.toString()}`
    );
  });
});
