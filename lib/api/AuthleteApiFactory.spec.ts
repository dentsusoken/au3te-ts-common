import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthleteApiFactory } from './AuthleteApiFactory';
import { AuthleteApi } from './AuthleteApi';
import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../schemas/par/PushedAuthReqResponse';

class MockAuthleteApi implements AuthleteApi {
  async pushAuthorizationRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    return { action: 'CREATED' } as PushedAuthReqResponse;
  }
}

describe('AuthleteApiFactory', () => {
  beforeEach(() => {
    AuthleteApiFactory.registerDefaultApi(new MockAuthleteApi());
  });

  afterEach(() => {
    // Clear the registered default API after each test
    AuthleteApiFactory.registerDefaultApi(undefined as unknown as AuthleteApi);
  });

  it('should return the registered default API', async () => {
    const api = await AuthleteApiFactory.getDefaultApi();
    expect(api).toBeInstanceOf(MockAuthleteApi);
  });

  it('should throw an error if the default API is not registered', async () => {
    // Clear the registered default API
    AuthleteApiFactory.registerDefaultApi(undefined as unknown as AuthleteApi);

    await expect(AuthleteApiFactory.getDefaultApi()).rejects.toThrowError(
      'The default API not registered'
    );
  });
});
