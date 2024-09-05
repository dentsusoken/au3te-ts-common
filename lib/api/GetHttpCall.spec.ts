import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaType } from '../utils';
import { GetHttpCall } from './GetHttpCall';

describe('GetHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/users';
  const auth = 'Bearer token123';
  const parameters = { id: 1, filter: 'active' };

  let getHttpCall: GetHttpCall;

  const fetch = vi.fn();
  global.fetch = fetch;

  beforeEach(() => {
    getHttpCall = new GetHttpCall(baseUrl, path, auth, parameters);
    vi.resetAllMocks();
  });

  it('should construct with correct parameters', () => {
    expect(getHttpCall['baseUrl']).toBe(baseUrl);
    expect(getHttpCall['path']).toBe(path);
    expect(getHttpCall['auth']).toBe(auth);
    expect(getHttpCall['parameters']).toEqual(parameters);
  });

  it('should initialize request property correctly', () => {
    expect(getHttpCall.request).toBeInstanceOf(Request);
    expect(getHttpCall.request.url).toBe(
      `${baseUrl}${path}?id=1&filter=active`
    );
    expect(getHttpCall.request.method).toBe('GET');
    expect(getHttpCall.request.headers.get('Content-Type')).toBe(
      MediaType.APPLICATION_JSON_UTF8
    );
    expect(getHttpCall.request.headers.get('Authorization')).toBe(auth);
  });

  it('should call fetch with correct request when call() is invoked', async () => {
    const mockResponse = new Response(JSON.stringify({ data: 'success' }), {
      status: 200,
    });
    fetch.mockResolvedValue(mockResponse);

    await getHttpCall.call();

    expect(fetch).toHaveBeenCalledWith(getHttpCall.request);
  });

  it('should return the Response from fetch', async () => {
    const mockResponse = new Response(JSON.stringify({ data: 'success' }), {
      status: 200,
    });
    fetch.mockResolvedValue(mockResponse);

    const response = await getHttpCall.call();

    expect(response).toBe(mockResponse);
    expect(await response.json()).toEqual({ data: 'success' });
    expect(response.status).toBe(200);
  });

  it('should throw an error if fetch fails', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValue(new Error(errorMessage));

    await expect(getHttpCall.call()).rejects.toThrow(errorMessage);
  });

  it('should handle empty parameters object', () => {
    const emptyGetHttpCall = new GetHttpCall(baseUrl, path, auth, {});
    expect(emptyGetHttpCall.request.url).toBe(`${baseUrl}${path}`);
  });

  it('should handle special characters in URL', () => {
    const specialPath = '/users/search';
    const specialParameters = { query: 'John Doe', type: 'full name' };
    const specialGetHttpCall = new GetHttpCall(
      baseUrl,
      specialPath,
      auth,
      specialParameters
    );
    expect(specialGetHttpCall.request.url).toBe(
      `${baseUrl}${specialPath}?query=John%20Doe&type=full%20name`
    );
  });

  it('should handle non-string parameter values', () => {
    const complexParameters = { id: 1, data: { name: 'John', age: 30 } };
    const complexGetHttpCall = new GetHttpCall(
      baseUrl,
      path,
      auth,
      complexParameters
    );
    expect(complexGetHttpCall.request.url).toBe(
      `${baseUrl}${path}?id=1&data=%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D`
    );
  });
});
