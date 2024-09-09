import { describe, it, expect } from 'vitest';
import { createProcessError } from './processError';
import { vi } from 'vitest';

describe('createProcessError', () => {
  it('should build and output the error message successfully', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockResolvedValue('Original error message');
    const buildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error message');
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const path = '/test';
    const result = await processError(error, path);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildEndpointErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildEndpointErrorMessage).toHaveBeenCalledWith(
      path,
      'Original error message'
    );
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('Endpoint error message');
    expect(result).toBe('Endpoint error message');
  });

  it('should handle errors during building the error message', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Build error'));
    const buildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error message');
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const path = '/test';
    const result = await processError(error, path);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildEndpointErrorMessage).not.toHaveBeenCalled();
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith(error.message);
    expect(result).toBe(error.message);
  });

  it('should handle errors during outputting the error message', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockResolvedValue('Original error message');
    const buildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error message');
    const outputErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Output error'));

    const processError = createProcessError({
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const path = '/test';
    const result = await processError(error, path);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildEndpointErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildEndpointErrorMessage).toHaveBeenCalledWith(
      path,
      'Original error message'
    );
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('Endpoint error message');
    expect(result).toBe('Endpoint error message');
  });

  it('should handle errors during outputting the error message and log the error', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockResolvedValue('Original error message');
    const buildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error message');
    const outputErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Output error'));
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const processError = createProcessError({
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const path = '/test';
    const result = await processError(error, path);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildEndpointErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildEndpointErrorMessage).toHaveBeenCalledWith(
      path,
      'Original error message'
    );
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('Endpoint error message');
    expect(result).toBe('Endpoint error message');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Output error'));
  });
});
