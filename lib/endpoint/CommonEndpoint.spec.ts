import { describe, it, expect, vi } from 'vitest';
import { CommonEndpoint } from './CommonEndpoint';
import { defaultProcessError } from './processError';

describe('CommonEndpoint', () => {
  it('should initialize with default processError when no options are provided', () => {
    const endpoint = new CommonEndpoint();

    expect(endpoint.processError).toBe(defaultProcessError);
  });

  it('should initialize with default processError when not provided', () => {
    const endpoint = new CommonEndpoint({});

    expect(endpoint.processError).toBe(defaultProcessError);
  });

  it('should initialize with provided processError', () => {
    const mockProcessError = vi.fn().mockResolvedValue('Mock error message');
    const endpoint = new CommonEndpoint({ processError: mockProcessError });

    expect(endpoint.processError).toBe(mockProcessError);
  });

  it('should call processError with error and path', async () => {
    const mockProcessError = vi.fn().mockResolvedValue('Mock error message');
    const endpoint = new CommonEndpoint({ processError: mockProcessError });
    const error = new Error('Test error');
    const path = '/test';

    await endpoint.processError(error, path);

    expect(mockProcessError).toHaveBeenCalledTimes(1);
    expect(mockProcessError).toHaveBeenCalledWith(error, path);
  });
});
