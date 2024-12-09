import { describe, it, expect, beforeEach, vi } from 'vitest';
import { z } from 'zod';
import { ApiCall } from './ApiCall';
import { HttpCall } from './HttpCall';

describe('ApiCall', () => {
  const call = vi.fn();
  const httpCall: HttpCall = {
    request: new Request('https://example.com'),
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

  it('should throw ResponseError on non-ok status', async () => {
    const response = new Response(undefined, {
      status: 404,
      statusText: 'Not Found',
    });
    call.mockResolvedValueOnce(response);

    try {
      const apiCall = new ApiCall(httpCall, schema);
      await apiCall.call();
      expect.fail('error');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Invalid response with status 404 Not Found');
      } else {
        expect.fail('Expected error to be an instance of Error');
      }
    }

    expect(call).toHaveBeenCalledTimes(1);
  });

  it('should propagate error on httpCall.call failure', async () => {
    const networkError = new Error('Network error');
    call.mockRejectedValueOnce(networkError);

    const apiCall = new ApiCall(httpCall, schema);

    try {
      await apiCall.call();
      expect.fail('Expected ApiCall to throw an error, but it did not');
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBe(networkError);
        expect(error.message).toBe('Network error');
      } else {
        expect.fail('Expected error to be an instance of Error');
      }
    }

    expect(call).toHaveBeenCalledTimes(1);
  });

  it('should throw ZodError on schema parse failure', async () => {
    const data = { id: '1', name: 'John' }; // id is string, not number
    const response = new Response(JSON.stringify(data), { status: 200 });
    call.mockResolvedValueOnce(response);

    const apiCall = new ApiCall(httpCall, schema);

    await expect(apiCall.call()).rejects.toThrow(z.ZodError);
  });

  it('should handle empty response bodies', async () => {
    const response = new Response(undefined, { status: 204 });
    call.mockResolvedValueOnce(response);

    const emptySchema = z.object({
      id: z.number().optional(),
    });
    const apiCall = new ApiCall(httpCall, emptySchema);

    const result = await apiCall.call();
    expect(result).toEqual({});
  });

  it('should handle empty response bodies with callGet', async () => {
    const data = `{ id: 1, name: 'John' }`;
    const response = new Response(data, { status: 200 });
    call.mockResolvedValueOnce(response);

    const apiCall = new ApiCall(httpCall, z.string());
    const result = await apiCall.callGet();
    expect(result).toEqual(data);
  });
});
