import { describe, it, expect } from 'vitest';
import { createProcessError } from './processError';
import { vi } from 'vitest';

describe('createProcessError', () => {
  it('should build and output the error message successfully', async () => {
    const buildApiErrorMessage = vi.fn().mockReturnValue('API error message');
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildApiErrorMessage: buildApiErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    await processError(error);

    expect(buildApiErrorMessage).toHaveBeenCalledTimes(1);
    expect(buildApiErrorMessage).toHaveBeenCalledWith('Test error');
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith('API error message');
  });

  it('should handle errors during building the error message', async () => {
    const buildApiErrorMessage = vi.fn().mockImplementation(() => {
      throw new Error('Error building message');
    });
    const outputErrorMessage = vi.fn().mockResolvedValue(undefined);

    const processError = createProcessError({
      buildApiErrorMessage,
      outputErrorMessage,
    });

    const error = new Error('Test error');
    await processError(error);

    expect(buildApiErrorMessage).toHaveBeenCalled();
    expect(outputErrorMessage).toHaveBeenCalledTimes(1);
    expect(outputErrorMessage).toHaveBeenCalledWith(error.message);
  });

  it('should handle errors during outputting the error message', async () => {
    const buildApiErrorMessage = vi.fn().mockReturnValue('API error message');
    const outputErrorMessage = vi
      .fn()
      .mockRejectedValue(new Error('Output error'));
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    try {
      const processError = createProcessError({
        buildApiErrorMessage,
        outputErrorMessage,
      });

      const error = new Error('Test error');
      await processError(error);

      expect(buildApiErrorMessage).toHaveBeenCalledTimes(1);
      expect(buildApiErrorMessage).toHaveBeenCalledWith('Test error');
      expect(outputErrorMessage).toHaveBeenCalledTimes(1);
      expect(outputErrorMessage).toHaveBeenCalledWith('API error message');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
