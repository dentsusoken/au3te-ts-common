import { describe, it, expect } from 'vitest';
import { createProcessError } from './processError';
import { vi } from 'vitest';

describe('createProcessError', () => {
  it('should build and output the error message successfully', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockResolvedValue('Original error message');
    const buildApiErrorMessage = vi.fn().mockReturnValue('API error message');
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildErrorMessage,
      buildApiErrorMessage: buildApiErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const result = await processError(error);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildApiErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildApiErrorMessage).toHaveBeenCalledWith('Original error message');
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('API error message');
    expect(result).toBe('API error message');
  });

  it('should handle errors during building the error message', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Build error'));
    const buildApiErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error message');
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildErrorMessage,
      buildApiErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const result = await processError(error);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildApiErrorMessage).not.toHaveBeenCalled();
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith(error.message);
    expect(result).toBe(error.message);
  });

  it('should handle errors during outputting the error message', async () => {
    const buildErrorMessage = vi
      .fn()
      .mockResolvedValue('Original error message');
    const buildApiErrorMessage = vi.fn().mockReturnValue('API error message');
    const outputErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Output error'));

    const processError = createProcessError({
      buildErrorMessage,
      buildApiErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    const result = await processError(error);

    expect(buildErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildErrorMessage).toHaveBeenCalledWith(error);
    expect(buildApiErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildApiErrorMessage).toHaveBeenCalledWith('Original error message');
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('API error message');
    expect(result).toBe('API error message');
  });
});
