import { describe, it, expect, vi } from 'vitest';
import { defaultOutputErrorMessage } from '../outputErrorMessage';

describe('defaultOutputErrorMessage', () => {
  it('should log the error message to the console', async () => {
    const errorMessage = 'Test error message';
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await defaultOutputErrorMessage(errorMessage);

    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
    consoleErrorSpy.mockRestore();
  });

  it('should not log anything if the error message is empty', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await defaultOutputErrorMessage('');

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
