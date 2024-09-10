import { describe, it, expect, vi } from 'vitest';
import { createBuildUnknownActionMessage } from './buildUnknownActionMessage';

describe('createBuildUnknownActionMessage', () => {
  const testPath = '/test/path';

  it('should create a function that builds unknown action messages', () => {
    const mockBuildEndpointErrorMessage = vi.fn(
      (path, message) => `Error at ${path}: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      path: testPath,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
    });

    expect(typeof buildUnknownActionMessage).toBe('function');
  });

  it('should call buildEndpointErrorMessage with correct parameters', () => {
    const mockBuildEndpointErrorMessage = vi.fn(
      (path, message) => `Error at ${path}: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      path: testPath,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
    });

    const unknownAction = 'TEST_ACTION';
    buildUnknownActionMessage(unknownAction);

    expect(mockBuildEndpointErrorMessage).toHaveBeenCalledWith(
      testPath,
      `unknown action: ${unknownAction}`
    );
  });

  it('should return the correct unknown action message', () => {
    const mockBuildEndpointErrorMessage = vi.fn(
      (path, message) => `Error at ${path}: ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      path: testPath,
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
    });

    const unknownAction = 'TEST_ACTION';
    const result = buildUnknownActionMessage(unknownAction);

    expect(result).toBe(
      `Error at ${testPath}: unknown action: ${unknownAction}`
    );
  });

  it('should work with different paths and actions', () => {
    const mockBuildEndpointErrorMessage = vi.fn(
      (path, message) => `${path} - ${message}`
    );
    const buildUnknownActionMessage = createBuildUnknownActionMessage({
      path: '/another/path',
      buildEndpointErrorMessage: mockBuildEndpointErrorMessage,
    });

    const unknownAction = 'ANOTHER_ACTION';
    const result = buildUnknownActionMessage(unknownAction);

    expect(result).toBe(`/another/path - unknown action: ${unknownAction}`);
  });
});
