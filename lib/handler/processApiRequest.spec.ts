import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { createProcessApiRequest } from './processApiRequest';
import { ApiClient } from '../api/ApiClient';

describe('createProcessApiRequest', () => {
  it('should process API request correctly and return the result', async () => {
    const mockApiClient = {
      callPostApi: vi.fn().mockResolvedValue({ success: true }),
    };

    const path = '/test-path';
    const schema = z.object({ success: z.boolean() });
    const apiRequest = { data: 'test' };

    const processApiRequest = createProcessApiRequest(
      path,
      schema,
      mockApiClient as unknown as ApiClient
    );

    const result = await processApiRequest(apiRequest);

    expect(mockApiClient.callPostApi).toHaveBeenCalledWith(
      path,
      schema,
      apiRequest
    );
    expect(result).toEqual({ success: true });
  });

  it('should propagate error when API client throws an error', async () => {
    const mockError = new Error('API error');
    const mockApiClient = {
      callPostApi: vi.fn().mockRejectedValue(mockError),
    };

    const path = '/test-path';
    const schema = z.object({ success: z.boolean() });
    const apiRequest = { data: 'test' };

    const processApiRequest = createProcessApiRequest(
      path,
      schema,
      mockApiClient as unknown as ApiClient
    );

    await expect(processApiRequest(apiRequest)).rejects.toThrow('API error');
  });
});
