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
    expect(endpoint.buildUnknownActionMessage).toBeDefined();
  });

  it('should use provided options when initializing', () => {
    const mockBuildErrorMessage = vi.fn();
    const mockBuildEndpointErrorMessage = vi.fn();
    const mockOutputErrorMessage = vi.fn();
    const mockProcessError = vi.fn();
    const mockBuildUnknownActionMessage = vi.fn();

    const endpoint = new CommonEndpoint(testPath, {
      buildErrorMessage: mockBuildErrorMessage,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
      outputErrorMessage: mockOutputErrorMessage,
      processError: mockProcessError,
      buildUnknownActionMessage: mockBuildUnknownActionMessage,
    });

    expect(endpoint.path).toBe(testPath);
    expect(endpoint.buildErrorMessage).toBe(mockBuildErrorMessage);
    expect(endpoint.buildEndpointErrorMessage).toBe(
      mockBuildEndpointErrorMessage
    );
    expect(endpoint.outputErrorMessage).toBe(mockOutputErrorMessage);
    expect(endpoint.processError).toBe(mockProcessError);
    expect(endpoint.buildUnknownActionMessage).toBe(
      mockBuildUnknownActionMessage
    );
  });

  it('should create a custom processError function when not provided', async () => {
    const endpoint = new CommonEndpoint(testPath);

    expect(endpoint.processError).toBeDefined();
    expect(typeof endpoint.processError).toBe('function');

    const testError = new Error('Test error');
    const errorMessage = await endpoint.processError(testError);

    expect(errorMessage).toContain(testPath);
    expect(errorMessage).toContain('Test error');

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

  it('should create a custom buildUnknownActionMessage function when not provided', () => {
    const endpoint = new CommonEndpoint(testPath);

    expect(endpoint.buildUnknownActionMessage).toBeDefined();
    expect(typeof endpoint.buildUnknownActionMessage).toBe('function');

    const unknownAction = 'TEST_ACTION';
    const message = endpoint.buildUnknownActionMessage(unknownAction);

    expect(message).toContain(testPath);
    expect(message).toContain(`unknown action: ${unknownAction}`);
  });

  it('should use provided buildUnknownActionMessage function if available', () => {
    const mockBuildUnknownActionMessage = vi.fn();
    const endpoint = new CommonEndpoint(testPath, {
      buildUnknownActionMessage: mockBuildUnknownActionMessage,
    });

    expect(endpoint.buildUnknownActionMessage).toBe(
      mockBuildUnknownActionMessage
    );
  });

  it('should create buildUnknownActionMessage with correct parameters', () => {
    const mockBuildEndpointErrorMessage = vi
      .fn()
      .mockReturnValue('Custom unknown action message');

    const endpoint = new CommonEndpoint(testPath, {
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
    });

    const unknownAction = 'TEST_ACTION';
    endpoint.buildUnknownActionMessage(unknownAction);

    expect(mockBuildEndpointErrorMessage).toHaveBeenCalledWith(
      testPath,
      `unknown action: ${unknownAction}`
    );
  });
});
