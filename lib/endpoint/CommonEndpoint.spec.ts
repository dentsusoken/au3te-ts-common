import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommonEndpoint } from './CommonEndpoint';
import { defaultBuildErrorMessage } from './buildErrorMessage';
import { defaultBuildEndpointErrorMessage } from './buildEndpointErrorMessage';
import { defaultOutputErrorMessage } from './outputErrorMessage';

describe('CommonEndpoint', () => {
  let endpoint: CommonEndpoint;

  beforeEach(() => {
    endpoint = new CommonEndpoint('/test');
  });

  it('should initialize with default options when not provided', () => {
    expect(endpoint['buildErrorMessage']).toBe(defaultBuildErrorMessage);
    expect(endpoint['buildEndpointErrorMessage']).toBe(
      defaultBuildEndpointErrorMessage
    );
    expect(endpoint['outputErrorMessage']).toBe(defaultOutputErrorMessage);
  });

  it('should initialize with provided options', () => {
    const buildErrorMessage = vi.fn();
    const buildEndpointErrorMessage = vi.fn();
    const outputErrorMessage = vi.fn();

    endpoint = new CommonEndpoint('/test', {
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
    });

    expect(endpoint['buildErrorMessage']).toBe(buildErrorMessage);
    expect(endpoint['buildEndpointErrorMessage']).toBe(
      buildEndpointErrorMessage
    );
    expect(endpoint['outputErrorMessage']).toBe(outputErrorMessage);
  });

  describe('processError', () => {
    it('should process the error correctly', async () => {
      const error = new Error('Test error');
      const originalMessage = 'Original error message';
      const errorMessage = 'Endpoint error message';

      const buildErrorMessageMock = vi.fn().mockResolvedValue(originalMessage);
      const buildEndpointErrorMessageMock = vi
        .fn()
        .mockReturnValue(errorMessage);
      const outputErrorMessageMock = vi.fn();

      endpoint['buildErrorMessage'] = buildErrorMessageMock;
      endpoint['buildEndpointErrorMessage'] = buildEndpointErrorMessageMock;
      endpoint['outputErrorMessage'] = outputErrorMessageMock;

      await endpoint.processError(error);

      expect(buildErrorMessageMock).toHaveBeenCalledWith(error);
      expect(buildEndpointErrorMessageMock).toHaveBeenCalledWith(
        '/test',
        originalMessage
      );
      expect(outputErrorMessageMock).toHaveBeenCalledWith(errorMessage);
    });
  });
});
