import { describe, it, expect, vi } from 'vitest';
import { createBuildUnknownActionMessage } from './buildUnknownActionMessage';

describe('createBuildUnknownActionMessage', () => {
  it('should create a function that builds unknown action messages', () => {
    const mockBuildApiErrorMessage = vi.fn(
      (message) => `Error at /test/path: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      buildApiErrorMessage: mockBuildApiErrorMessage,
    });

    expect(typeof buildUnknownActionMessage).toBe('function');
  });

  it('should call buildEndpointErrorMessage with correct parameters', () => {
    const mockBuildApiErrorMessage = vi.fn(
      (path, message) => `Error at ${path}: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      buildApiErrorMessage: mockBuildApiErrorMessage,
    });

    const unknownAction = 'TEST_ACTION';
    buildUnknownActionMessage('/test/path', unknownAction);

    expect(mockBuildApiErrorMessage).toHaveBeenCalledWith(
      '/test/path',
      `Unknown action: ${unknownAction}`
    );
  });

  it('should return the correct unknown action message', () => {
    const mockBuildApiErrorMessage = vi.fn(
      (path, message) => `Error at ${path}: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      buildApiErrorMessage: mockBuildApiErrorMessage,
    });

    const unknownAction = 'TEST_ACTION';
    const result = buildUnknownActionMessage('/test/path', unknownAction);

    expect(result).toBe(
      `Error at /test/path: Unknown action: ${unknownAction}`
    );
  });
});
