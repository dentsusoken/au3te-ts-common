/*
 * Copyright (C) 2019-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */

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

/**
 * Represents the Authlete API interface.
 * @interface AuthleteApi
 */
export interface AuthleteApi {
  /**
   * Performs an authorization request.
   * @param {AuthorizationRequest} request - The authorization request.
   * @returns {Promise<AuthorizationResponse>} A promise that resolves to the authorization response.
   */
  authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;

  /**
   * Issues an authorization.
   * @param {AuthorizationIssueRequest} request - The authorization issue request.
   * @returns {Promise<AuthorizationIssueResponse>} A promise that resolves to the authorization issue response.
   */
  authorizationIssue(
    request: AuthorizationIssueRequest
  ): Promise<AuthorizationIssueResponse>;

  /**
   * Performs a token request.
   * @param {TokenRequest} request - The token request.
   * @returns {Promise<TokenResponse>} A promise that resolves to the token response.
   */
  token(request: TokenRequest): Promise<TokenResponse>;

  /**
   * Pushes an authorization request.
   * @param {PushedAuthReqRequest} request - The pushed authorization request.
   * @returns {Promise<PushedAuthReqResponse>} A promise that resolves to the pushed authorization request response.
   */
  pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse>;

  /**
   * Performs an introspection request.
   * @param {IntrospectionRequest} request - The introspection request.
   * @returns {Promise<IntrospectionResponse>} A promise that resolves to the introspection response.
   */
  introspection(request: IntrospectionRequest): Promise<IntrospectionResponse>;

  /**
   * Parses a single credential.
   * @param {CredentialSingleParseRequest} request - The credential single parse request.
   * @returns {Promise<CredentialSingleParseResponse>} A promise that resolves to the credential single parse response.
   */
  credentialSingleParse(
    request: CredentialSingleParseRequest
  ): Promise<CredentialSingleParseResponse>;

  /**
   * Issues a single credential.
   * @param {CredentialSingleIssueRequest} request - The credential single issue request.
   * @returns {Promise<CredentialSingleIssueResponse>} A promise that resolves to the credential single issue response.
   */
  credentialSingleIssue(
    request: CredentialSingleIssueRequest
  ): Promise<CredentialSingleIssueResponse>;

  /**
   * Retrieves the service configuration.
   * @param {ServiceConfigurationRequest} [request] - The service configuration request.
   * @param {boolean} [pretty=false] - Whether to format the response in a pretty way.
   * @returns {Promise<string>} A promise that resolves to the service configuration.
   */
  getServiceConfiguration(
    request?: ServiceConfigurationRequest,
    pretty?: boolean
  ): Promise<string>;

  /**
   * Retrieves the credential issuer metadata.
   * @param {CredentialIssuerMetadataRequest} request - The credential issuer metadata request.
   * @returns {Promise<CredentialIssuerMetadataResponse>} A promise that resolves to the credential issuer metadata response.
   */
  credentialIssuerMetadata(
    request: CredentialIssuerMetadataRequest
  ): Promise<CredentialIssuerMetadataResponse>;
}
