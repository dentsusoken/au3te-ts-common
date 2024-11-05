import { describe, it, expect } from 'vitest';
import { AbstractApiClient } from './AbstractApiClient';
import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import { authorizationResponseSchema } from '../schemas/authorization/AuthorizationResponse';
import { pushedAuthReqResponseSchema } from '../schemas/par/PushedAuthReqResponse';
import { AuthorizationFailRequest } from '../schemas/authorization-fail/AuthorizationFailRequest';
import { authorizationFailResponseSchema } from '../schemas/authorization-fail/AuthorizationFailResponse';
import { AuthorizationIssueRequest } from '../schemas/authorization-issue/AuthorizationIssueRequest';
import { authorizationIssueResponseSchema } from '../schemas/authorization-issue/AuthorizationIssueResponse';

class ApiClientImpl extends AbstractApiClient {
  readonly baseUrl: string;
  readonly auth: string;
  readonly pushAuthorizationRequestPath: string;
  readonly authorizationPath: string;
  readonly authorizationFailPath: string;
  readonly authorizationIssuePath: string;
  readonly serviceConfigurationPath: string;
  readonly credentialIssuerMetadataPath: string;

  constructor() {
    super();
    this.baseUrl = process.env.API_BASE_URL || '';
    this.auth = 'Bearer ' + process.env.ACCESS_TOKEN;
    this.pushAuthorizationRequestPath = `/api/${process.env.API_KEY}/pushed_auth_req`;
    this.authorizationPath = `/api/${process.env.API_KEY}/auth/authorization`;
    this.authorizationFailPath = `/api/${process.env.API_KEY}/auth/authorization/fail`;
    this.authorizationIssuePath = `/api/${process.env.API_KEY}/auth/authorization/issue`;
    this.serviceConfigurationPath = `/api/${process.env.API_KEY}/service/configuration`;
    this.credentialIssuerMetadataPath = `/api/${process.env.API_KEY}/vci/metadata`;
  }
}

const apiClient = new ApiClientImpl();

const testPushAuthorizationRequest = async () => {
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

  return response.requestUri!;
};

const testAuthorization = async (requestUri: string) => {
  const request: PushedAuthReqRequest = {
    parameters: `client_id=tw24.wallet.dentsusoken.com&request_uri=${encodeURIComponent(
      requestUri!
    )}`,
  };

  const response = await apiClient.callPostApi(
    apiClient.authorizationPath,
    authorizationResponseSchema,
    request
  );

  expect(response).toBeDefined();
  expect(response.action).toBe('INTERACTION');
  expect(response.service).toBeDefined();
  expect(response.client).toBeDefined();
  expect(response.ticket).toBeDefined();

  return response.ticket!;
};

const testAuthorizationFail = async (ticket: string) => {
  const request: AuthorizationFailRequest = {
    reason: 'NOT_LOGGED_IN',
    ticket,
  };

  const response = await apiClient.callPostApi(
    apiClient.authorizationFailPath,
    authorizationFailResponseSchema,
    request
  );
  //console.log(response);

  expect(response).toBeDefined();
  expect(response.resultCode).toBe('A060301');
  expect(response.action).toBe('LOCATION');

  return response;
};

const testAuthorizationIssue = async (ticket: string) => {
  const request: AuthorizationIssueRequest = {
    ticket,
    subject: '1004',
  };

  const response = await apiClient.callPostApi(
    apiClient.authorizationIssuePath,
    authorizationIssueResponseSchema,
    request
  );
  //console.log(response);

  expect(response).toBeDefined();
  expect(response.resultCode).toBe('A040001');
  expect(response.action).toBe('LOCATION');
  expect(
    response.responseContent?.startsWith('eudi-openid4ci://authorize/?code=')
  ).toBe(true);
  expect(response.authorizationCode).toBeDefined();

  return response;
};

describe('AbstractApiClient', () => {
  describe('pushAuthorizationRequest', () => {
    it('should successfully push an authorization request', async () => {
      await testPushAuthorizationRequest();
    }, 10000);
  });

  describe('authorization', () => {
    it('should successfully post an authorization', async () => {
      const requestUri = await testPushAuthorizationRequest();
      await testAuthorization(requestUri);
    }, 10000);
  });

  describe('authorizationFail', () => {
    it('should successfully post an authorization fail', async () => {
      const requestUri = await testPushAuthorizationRequest();
      const ticket = await testAuthorization(requestUri);
      await testAuthorizationFail(ticket);
    }, 10000);
  });

  describe('authorizationIssue', () => {
    it('should successfully post an authorization issue', async () => {
      const requestUri = await testPushAuthorizationRequest();
      const ticket = await testAuthorization(requestUri);
      await testAuthorizationIssue(ticket);
    }, 10000);
  });
});
