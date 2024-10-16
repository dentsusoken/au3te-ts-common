import { describe, it, expect, vi } from 'vitest';
import { CommonHandler } from './CommonHandler';
import { defaultOutputErrorMessage } from './outputErrorMessage';

describe('CommonEndpoint', () => {
  const testPath = '/test/path';

  it('should initialize with default values when no options are provided', () => {
    const endpoint = new CommonHandler(testPath);

    expect(endpoint.path).toBe(testPath);
    expect(endpoint.buildApiErrorMessage).toBeDefined();
    expect(endpoint.outputErrorMessage).toBe(defaultOutputErrorMessage);
    expect(endpoint.processError).toBeDefined();
    expect(endpoint.buildUnknownActionMessage).toBeDefined();
  });

  it('should use provided options when initializing', () => {
    const mockBuildApiErrorMessage = vi.fn();
    const mockOutputErrorMessage = vi.fn();
    const mockProcessError = vi.fn();
    const mockBuildUnknownActionMessage = vi.fn();

    const endpoint = new CommonHandler(testPath, {
      buildApiErrorMessage: mockBuildApiErrorMessage,
      outputErrorMessage: mockOutputErrorMessage,
      processError: mockProcessError,
      buildUnknownActionMessage: mockBuildUnknownActionMessage,
    });

    expect(endpoint.path).toBe(testPath);
    expect(endpoint.buildApiErrorMessage).toBe(mockBuildApiErrorMessage);
    expect(endpoint.outputErrorMessage).toBe(mockOutputErrorMessage);
    expect(endpoint.processError).toBe(mockProcessError);
    expect(endpoint.buildUnknownActionMessage).toBe(
      mockBuildUnknownActionMessage
    );
  });
});
