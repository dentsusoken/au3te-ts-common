import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthleteApiFactory } from './AuthleteApiFactory';
import { AuthleteApi } from './AuthleteApi';

const mockAuthleteApi = {} as AuthleteApi;

describe('AuthleteApiFactory', () => {
  beforeEach(() => {
    AuthleteApiFactory.registerDefaultApi(mockAuthleteApi);
  });

  afterEach(() => {
    // Clear the registered default API after each test
    AuthleteApiFactory.registerDefaultApi(undefined as unknown as AuthleteApi);
  });

  it('should return the registered default API', () => {
    const api = AuthleteApiFactory.getDefaultApi();
    expect(api).toBe(mockAuthleteApi);
  });

  it('should throw an error if the default API is not registered', () => {
    // Clear the registered default API
    AuthleteApiFactory.registerDefaultApi(undefined as unknown as AuthleteApi);

    expect(() => AuthleteApiFactory.getDefaultApi()).toThrowError(
      'The default API not registered'
    );
  });
});
