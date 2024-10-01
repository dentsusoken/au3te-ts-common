import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ApiClientRegistry } from './ApiClientRegistry';
import { ApiClient } from './ApiClient';

const mockApiClient = {} as ApiClient;

describe('ApiClientRegistry', () => {
  beforeEach(() => {
    ApiClientRegistry.registerApiClient(mockApiClient);
  });

  afterEach(() => {
    // Clear the registered default API after each test
    ApiClientRegistry.registerApiClient(undefined as unknown as ApiClient);
  });

  it('should return the registered default API client', () => {
    const apiClient = ApiClientRegistry.getApiClient();
    expect(apiClient).toBe(mockApiClient);
  });

  it('should throw an error if the default API is not registered', () => {
    // Clear the registered default API
    ApiClientRegistry.registerApiClient(undefined as unknown as ApiClient);

    expect(() => ApiClientRegistry.getApiClient()).toThrowError(
      'The API client not registered'
    );
  });
});
