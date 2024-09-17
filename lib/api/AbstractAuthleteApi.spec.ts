import { describe, it, expect } from 'vitest';
import { AbstractAuthleteApi } from './AbstractAuthleteApi';
import { PushedAuthReqRequest } from 'au3te-ts-common/schemas.par';

class AuthleteApiImpl extends AbstractAuthleteApi {
  protected readonly baseUrl: string;
  protected readonly auth: string;
  protected readonly pushAuthorizationRequestPath: string;
  protected readonly authorizationPath: string;

  constructor() {
    super();
    this.baseUrl = process.env.API_BASE_URL || '';
    this.auth = 'Bearer ' + process.env.ACCESS_TOKEN;
    this.pushAuthorizationRequestPath = `/api/${process.env.API_KEY}/pushed_auth_req`;
    this.authorizationPath = `/api/${process.env.API_KEY}/auth/authorization`;
  }
}

describe('AbstractAuthleteApi', () => {
  const authleteApi = new AuthleteApiImpl();

  describe('pushAuthorizationRequest', () => {
    it('should successfully push an authorization request', async () => {
      const request: PushedAuthReqRequest = {
        parameters:
          'scope=org.iso.18013.5.1.mDL+openid&redirect_uri=eudi-openid4ci%3A%2F%2Fauthorize%2F&response_type=code&client_id=tw24.wallet.dentsusoken.com',
      };

      const response = await authleteApi.pushAuthorizationRequest(request);

      expect(response).toBeDefined();
      expect(response.action).toBe('CREATED');
      expect(response.resultCode).toBeDefined();
      expect(response.resultMessage).toBeDefined();
      expect(response.responseContent).toBeDefined();
      expect(response.clientAuthMethod).toBe('none');
      expect(response.requestUri).toBeDefined();
      expect(response.dpopNonce).toBeUndefined();
    }, 10000);

    it('should handle invalid request', async () => {
      const invalidRequest: PushedAuthReqRequest = {
        parameters: 'invalid_parameter=value',
      };

      const response = await authleteApi.pushAuthorizationRequest(
        invalidRequest
      );

      expect(response).toBeDefined();
      expect(response.action).toBe('UNAUTHORIZED');
      expect(response.resultCode).toBeDefined();
      expect(response.resultMessage).toBeDefined();
      expect(response.responseContent).toBeDefined();
      expect(response.clientAuthMethod).toBeUndefined();
      expect(response.requestUri).toBeUndefined();
      expect(response.dpopNonce).toBeUndefined();
    }, 10000);
  });

  describe('pushAuthorizationRequest', () => {
    it('should successfully post an authorization request', async () => {
      const parRequest: PushedAuthReqRequest = {
        parameters:
          'scope=org.iso.18013.5.1.mDL+openid&redirect_uri=eudi-openid4ci%3A%2F%2Fauthorize%2F&response_type=code&client_id=tw24.wallet.dentsusoken.com',
      };

      const parResponse = await authleteApi.pushAuthorizationRequest(
        parRequest
      );

      expect(parResponse).toBeDefined();
      expect(parResponse.action).toBe('CREATED');
      expect(parResponse.resultCode).toBeDefined();
      expect(parResponse.resultMessage).toBeDefined();
      expect(parResponse.responseContent).toBeDefined();
      expect(parResponse.clientAuthMethod).toBe('none');
      expect(parResponse.requestUri).toBeDefined();
      expect(parResponse.dpopNonce).toBeUndefined();

      const authorizationRequest: PushedAuthReqRequest = {
        parameters: `client_id=tw24.wallet.dentsusoken.com&request_uri=${encodeURIComponent(
          parResponse.requestUri!
        )}`,
      };

      const authorizationResponse = await authleteApi.authorization(
        authorizationRequest
      );
      console.log(authorizationResponse);

      expect(authorizationResponse).toBeDefined();
      expect(authorizationResponse.action).toBe('INTERACTION');
      expect(authorizationResponse.service).toBeDefined();
      expect(authorizationResponse.client).toBeDefined();
      expect(authorizationResponse.ticket).toBeDefined();
    }, 10000);
  });
});
