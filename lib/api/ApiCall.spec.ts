import { describe, it, expect, beforeEach, vi } from 'vitest';
import { z } from 'zod';
import { ApiCall } from './ApiCall';
import { HttpCall } from './HttpCall';
import { AuthleteApiError } from './AuthleteApiError';

describe('ApiCall', () => {
  const call = vi.fn();
  const httpCall: HttpCall = {
    url: new URL('https://api.example.com/endpoint'),
    requestInit: {
      method: 'GET',
    },
    call,
  };

  const schema = z.object({
    id: z.number(),
    name: z.string(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return parsed data on success', async () => {
    const data = { id: 1, name: 'John' };
    const response = new Response(JSON.stringify(data), { status: 200 });
    call.mockResolvedValueOnce(response);

    const apiCall = new ApiCall(httpCall, schema);
    const result = await apiCall.call();

    expect(httpCall.call).toHaveBeenCalledOnce();
    expect(result).toEqual(data);
  });

  it('should throw AuthleteApiError with response on non-2xx status', async () => {
    const response = new Response('Not Found', { status: 404 });
    call.mockResolvedValueOnce(response);

    const apiCall = new ApiCall(httpCall, schema);

    try {
      await apiCall.call();
    } catch (error) {
      expect(error).toBeInstanceOf(AuthleteApiError);
      expect((error as AuthleteApiError).response).toBe(response);
      expect((error as AuthleteApiError).cause).toBeUndefined();
    }
  });

  it('should throw AuthleteApiError with cause on httpCall.call failure', async () => {
    const cause = new Error('Network error');
    call.mockRejectedValueOnce(cause);

    const apiCall = new ApiCall(httpCall, schema);

    try {
      await apiCall.call();
    } catch (error) {
      expect(error).toBeInstanceOf(AuthleteApiError);
      expect((error as AuthleteApiError).cause).toBe(cause);
      expect((error as AuthleteApiError).response).toBeUndefined();
    }
  });

  it('should throw AuthleteApiError with cause on schema parse failure', async () => {
    const data = { id: '1', name: 'John' }; // id is string, not number
    const response = new Response(JSON.stringify(data), { status: 200 });
    call.mockResolvedValueOnce(response);

    const apiCall = new ApiCall(httpCall, schema);

    try {
      await apiCall.call();
      expect.fail();
    } catch (error) {
      expect(error).toBeInstanceOf(AuthleteApiError);
      expect((error as AuthleteApiError).cause).toBeInstanceOf(z.ZodError);
      expect((error as AuthleteApiError).response).toBeUndefined();
    }
  });
});
