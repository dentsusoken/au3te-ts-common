import { describe, it, expect } from 'vitest';
import { AbstractApiClient } from './AbstractApiClient';
import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import {
  AuthorizationResponse,
  authorizationResponseSchema,
} from '../schemas/authorization/AuthorizationResponse';
import {
  PushedAuthReqResponse,
  pushedAuthReqResponseSchema,
} from '../schemas/par/PushedAuthReqResponse';
import { AuthorizationFailRequest } from '../schemas/authorization-fail/AuthorizationFailRequest';
import {
  AuthorizationFailResponse,
  authorizationFailResponseSchema,
} from '../schemas/authorization-fail/AuthorizationFailResponse';

class ApiClientImpl extends AbstractApiClient {
  readonly baseUrl: string;
  readonly auth: string;
  readonly pushAuthorizationRequestPath: string;
  readonly authorizationPath: string;
  readonly authorizationFailPath: string;

  constructor() {
    super();
    this.baseUrl = process.env.API_BASE_URL || '';
    this.auth = 'Bearer ' + process.env.ACCESS_TOKEN;
    this.pushAuthorizationRequestPath = `/api/${process.env.API_KEY}/pushed_auth_req`;
    this.authorizationPath = `/api/${process.env.API_KEY}/auth/authorization`;
    this.authorizationFailPath = `/api/${process.env.API_KEY}/auth/authorization/fail`;
  }
}

const apiClient = new ApiClientImpl();

const testPushAuthorizationRequest =
  async (): Promise<PushedAuthReqResponse> => {
    const request: PushedAuthReqRequest = {
      parameters:
        'scope=org.iso.18013.5.1.mDL+openid&redirect_uri=eudi-openid4ci%3A%2F%2Fauthorize%2F&response_type=code&client_id=tw24.wallet.dentsusoken.com',
    };

    const response = await apiClient.callPostApi(
      apiClient.pushAuthorizationRequestPath,
      pushedAuthReqResponseSchema,
      request
    );

    expect(response).toBeDefined();
    expect(response.action).toBe('CREATED');
    expect(response.resultCode).toBeDefined();
    expect(response.resultMessage).toBeDefined();
    expect(response.responseContent).toBeDefined();
    expect(response.clientAuthMethod).toBe('none');
    expect(response.requestUri).toBeDefined();
    expect(response.dpopNonce).toBeUndefined();

    return response;
  };

const testAuthorization = async (
  parResponse: PushedAuthReqResponse
): Promise<AuthorizationResponse> => {
  const authorizationRequest: PushedAuthReqRequest = {
    parameters: `client_id=tw24.wallet.dentsusoken.com&request_uri=${encodeURIComponent(
      parResponse.requestUri!
    )}`,
  };

  const authorizationResponse = await apiClient.callPostApi(
    apiClient.authorizationPath,
    authorizationResponseSchema,
    authorizationRequest
  );

  expect(authorizationResponse).toBeDefined();
  expect(authorizationResponse.action).toBe('INTERACTION');
  expect(authorizationResponse.service).toBeDefined();
  expect(authorizationResponse.client).toBeDefined();
  expect(authorizationResponse.ticket).toBeDefined();

  return authorizationResponse;
};

const testAuthorizationFail = async (
  authorizationResponse: AuthorizationResponse
): Promise<AuthorizationFailResponse> => {
  const authorizationFailRequest: AuthorizationFailRequest = {
    reason: 'NOT_LOGGED_IN',
    ticket: authorizationResponse.ticket,
  };

  const authorizationFailResponse = await apiClient.callPostApi(
    apiClient.authorizationFailPath,
    authorizationFailResponseSchema,
    authorizationFailRequest
  );

  expect(authorizationFailResponse).toBeDefined();
  expect(authorizationFailResponse.resultCode).toBe('A060301');
  expect(authorizationFailResponse.action).toBe('LOCATION');

  return authorizationFailResponse;
};

describe('AbstractApiClient', () => {
  describe('pushAuthorizationRequest', () => {
    it('should successfully push an authorization request', async () => {
      await testPushAuthorizationRequest();
    }, 10000);
  });

  describe('authorization', () => {
    it('should successfully post an authorization', async () => {
      const parResponse = await testPushAuthorizationRequest();
      await testAuthorization(parResponse);
    }, 10000);
  });

  describe('authorizationFail', () => {
    it('should successfully post an authorization fail', async () => {
      const parResponse = await testPushAuthorizationRequest();
      const authorizationResponse = await testAuthorization(parResponse);
      await testAuthorizationFail(authorizationResponse);
    }, 10000);
  });
});
