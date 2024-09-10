import { describe, it, expect, vi } from 'vitest';
import { CommonEndpoint } from './CommonEndpoint';
import { defaultBuildErrorMessage } from './buildErrorMessage';
import { defaultBuildEndpointErrorMessage } from './buildEndpointErrorMessage';
import { defaultOutputErrorMessage } from './outputErrorMessage';

describe('CommonEndpoint', () => {
  const testPath = '/test/path';

  it('should initialize with default values when no options are provided', () => {
    const endpoint = new CommonEndpoint(testPath);

    expect(endpoint.path).toBe(testPath);
    expect(endpoint.buildErrorMessage).toBe(defaultBuildErrorMessage);
    expect(endpoint.buildEndpointErrorMessage).toBe(
      defaultBuildEndpointErrorMessage
    );
    expect(endpoint.outputErrorMessage).toBe(defaultOutputErrorMessage);
    expect(endpoint.processError).toBeDefined();
  });

  it('should use provided options when initializing', () => {
    const mockBuildErrorMessage = vi.fn();
    const mockBuildEndpointErrorMessage = vi.fn();
    const mockOutputErrorMessage = vi.fn();
    const mockProcessError = vi.fn();

    const endpoint = new CommonEndpoint(testPath, {
      buildErrorMessage: mockBuildErrorMessage,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
      outputErrorMessage: mockOutputErrorMessage,
      processError: mockProcessError,
    });

    expect(endpoint.path).toBe(testPath);
    expect(endpoint.buildErrorMessage).toBe(mockBuildErrorMessage);
    expect(endpoint.buildEndpointErrorMessage).toBe(
      mockBuildEndpointErrorMessage
    );
    expect(endpoint.outputErrorMessage).toBe(mockOutputErrorMessage);
    expect(endpoint.processError).toBe(mockProcessError);
  });

  it('should create a custom processError function when not provided', async () => {
    const endpoint = new CommonEndpoint(testPath);

    // Ensure processError is defined and is a function
    expect(endpoint.processError).toBeDefined();
    expect(typeof endpoint.processError).toBe('function');

    // Test the behavior of the created processError function
    const testError = new Error('Test error');
    const errorMessage = await endpoint.processError(testError);

    // Verify that the error message contains the path and the original error message
    expect(errorMessage).toContain(testPath);
    expect(errorMessage).toContain('Test error');

    // Optionally, spy on console.error to ensure it's not called
    const consoleErrorSpy = vi.spyOn(console, 'error');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should use provided processError function if available', () => {
    const mockProcessError = vi.fn();
    const endpoint = new CommonEndpoint(testPath, {
      processError: mockProcessError,
    });

    expect(endpoint.processError).toBe(mockProcessError);
  });

  it('should create processError with correct parameters', async () => {
    const mockBuildErrorMessage = vi.fn().mockResolvedValue('Test error');
    const mockBuildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Endpoint error');
    const mockOutputErrorMessage = vi.fn();

    const endpoint = new CommonEndpoint(testPath, {
      buildErrorMessage: mockBuildErrorMessage,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
      outputErrorMessage: mockOutputErrorMessage,
    });

    const testError = new Error('Test');
    await endpoint.processError(testError);

    expect(mockBuildErrorMessage).toHaveBeenCalledWith(testError);
    expect(mockBuildEndpointErrorMessage).toHaveBeenCalledWith(
      testPath,
      'Test error'
    );
    expect(mockOutputErrorMessage).toHaveBeenCalledWith('Endpoint error');
  });
});
