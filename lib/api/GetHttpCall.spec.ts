import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MediaType } from '../utils';
import { GetHttpCall } from './GetHttpCall';

describe('GetHttpCall', () => {
  const baseUrl = 'https://api.example.com';
  const path = '/users';
  const auth = 'Bearer token123';
  const request = { id: 1, filter: 'active' };

  let getHttpCall: GetHttpCall;

  const fetch = vi.fn();
  global.fetch = fetch;

  beforeEach(() => {
    getHttpCall = new GetHttpCall(baseUrl, path, auth, request);
    vi.resetAllMocks();
  });

  it('should construct with correct parameters', () => {
    expect(getHttpCall['baseUrl']).toBe(baseUrl);
    expect(getHttpCall['path']).toBe(path);
    expect(getHttpCall['auth']).toBe(auth);
    expect(getHttpCall['request']).toEqual(request);
  });

  it('should call fetch with correct URL and options', async () => {
    const mockResponse = new Response(JSON.stringify({ data: 'success' }), {
      status: 200,
    });
    fetch.mockResolvedValue(mockResponse);

    await getHttpCall.call();

    const expectedUrl = new URL(`${baseUrl}${path}`);
    expectedUrl.searchParams.append('id', '1');
    expectedUrl.searchParams.append('filter', 'active');

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': MediaType.APPLICATION_JSON_UTF8,
        Authorization: auth,
      },
    });
  });

  it('should handle complex request parameters', async () => {
    const complexRequest = {
      simple: 'value',
      array: [1, 2, 3],
      object: { key: 'value' },
    };
    getHttpCall = new GetHttpCall(baseUrl, path, auth, complexRequest);

    const mockResponse = new Response(JSON.stringify({ data: 'success' }), {
      status: 200,
    });
    fetch.mockResolvedValue(mockResponse);

    await getHttpCall.call();

    const expectedUrl = new URL(`${baseUrl}${path}`);
    expectedUrl.searchParams.append('simple', 'value');
    expectedUrl.searchParams.append('array', JSON.stringify([1, 2, 3]));
    expectedUrl.searchParams.append('object', JSON.stringify({ key: 'value' }));

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
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
});
