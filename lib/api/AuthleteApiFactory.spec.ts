import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthleteApiFactory } from './AuthleteApiFactory';
import { AuthleteApi } from './AuthleteApi';
import { PushedAuthReqRequest } from '../dto/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../dto/PushedAuthReqResponse';
import { AuthorizationIssueRequest } from '../dto/AuthorizationIssueRequest';
import { AuthorizationIssueResponse } from '../dto/AuthorizationIssueResponse';
import { AuthorizationRequest } from '../dto/AuthorizationRequest';
import { AuthorizationResponse } from '../dto/AuthorizationResponse';
import { CredentialIssuerMetadataRequest } from '../dto/CredentialIssuerMetadataRequest';
import { CredentialIssuerMetadataResponse } from '../dto/CredentialIssuerMetadataResponse';
import { CredentialSingleIssueRequest } from '../dto/CredentialSingleIssueRequest';
import { CredentialSingleIssueResponse } from '../dto/CredentialSingleIssueResponse';
import { CredentialSingleParseRequest } from '../dto/CredentialSingleParseRequest';
import { CredentialSingleParseResponse } from '../dto/CredentialSingleParseResponse';
import { IntrospectionRequest } from '../dto/IntrospectionRequest';
import { IntrospectionResponse } from '../dto/IntrospectionResponse';
import { ServiceConfigurationRequest } from '../dto/ServiceConfigurationRequest';
import { TokenRequest } from '../dto/TokenRequest';
import { TokenResponse } from '../dto/TokenResponse';

class MockAuthleteApi implements AuthleteApi {
  async authorization(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: AuthorizationRequest
  ): Promise<AuthorizationResponse> {
    return new AuthorizationResponse('FORM');
  }

  async authorizationIssue(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse> {
    return new AuthorizationIssueResponse('FORM');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async token(_: TokenRequest): Promise<TokenResponse> {
    return new TokenResponse('OK');
  }

  async pushAuthorizationRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    return new PushedAuthReqResponse('CREATED');
  }

  async introspection(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: IntrospectionRequest
  ): Promise<IntrospectionResponse> {
    return new IntrospectionResponse('OK');
  }

  async credentialSingleParse(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: CredentialSingleParseRequest
  ): Promise<CredentialSingleParseResponse> {
    return new CredentialSingleParseResponse('OK');
  }

  async credentialSingleIssue(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: CredentialSingleIssueRequest
  ): Promise<CredentialSingleIssueResponse> {
    return new CredentialSingleIssueResponse('OK');
  }

  async getServiceConfiguration(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _request: ServiceConfigurationRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _pretty: boolean
  ): Promise<string> {
    return 'aaa';
  }

  async credentialIssuerMetadata(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _request: CredentialIssuerMetadataRequest
  ): Promise<CredentialIssuerMetadataResponse> {
    return new CredentialIssuerMetadataResponse('OK');
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
