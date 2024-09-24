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

import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import { PushedAuthReqResponse } from '../schemas/par/PushedAuthReqResponse';
import { AuthorizationRequest } from '../schemas/authorization/AuthorizationRequest';
import { AuthorizationResponse } from '../schemas/authorization/AuthorizationResponse';
import {
  AuthorizationFailRequest,
  AuthorizationFailResponse,
} from '../schemas/authorization-fail';

/**
 * Represents the Authlete API interface.
 * @interface AuthleteApi
 */
export interface AuthleteApi {
  // /**
  //  * Issues an authorization.
  //  * @param {AuthorizationIssueRequest} request - The authorization issue request.
  //  * @returns {Promise<AuthorizationIssueResponse>} A promise that resolves to the authorization issue response.
  //  */
  // authorizationIssue(
  //   request: AuthorizationIssueRequest
  // ): Promise<AuthorizationIssueResponse>;

  // /**
  //  * Performs a token request.
  //  * @param {TokenRequest} request - The token request.
  //  * @returns {Promise<TokenResponse>} A promise that resolves to the token response.
  //  */
  // token(request: TokenRequest): Promise<TokenResponse>;

  /**
   * Call Authlete's {@code /api/pushed_auth_req} API..
   * @param {PushedAuthReqRequest} request - The pushed authorization request.
   * @returns {Promise<PushedAuthReqResponse>} A promise that resolves to the pushed authorization request response.
   */
  pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse>;

  /**
   * Performs an authorization request.
   * @param {AuthorizationRequest} request - The authorization request.
   * @returns {Promise<AuthorizationResponse>} A promise that resolves to the authorization response.
   */
  authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;

  /**
   * Sends an authorization failure request to Authlete's /auth/authorization/fail API.
   *
   * This function is used to notify Authlete about a failed authorization attempt.
   * It's typically called when the authorization server encounters an error or
   * when the end-user denies the authorization request.
   *
   * @async
   * @function authorizationFail
   * @param {AuthorizationFailRequest} request - The details of the authorization failure.
   * @param {string} request.reason - The reason for the authorization failure. Must be one of the predefined enum values.
   * @param {string|null} [request.ticket] - The ticket value received from the authorization server. Can be null or omitted.
   * @param {string|null} [request.description] - Additional description of the failure. Can be null or omitted.
   * @returns {Promise<AuthorizationFailResponse>} A promise that resolves to the response from Authlete's API.
   * @throws {Error} If the API call fails or returns an unexpected response.
   *
   * @typedef {Object} AuthorizationFailResponse
   * @property {('INTERNAL_SERVER_ERROR'|'BAD_REQUEST'|'LOCATION'|'FORM')} action - Indicates the action that should be taken in response to the authorization failure.
   * @property {string|null} [responseContent] - Contains the content of the response that should be sent to the client. The exact content depends on the action.
   *
   * @remarks
   * The `reason` parameter in the request determines the specific error response that will be sent to the client.
   * Different reasons may result in different error codes (e.g., `login_required`, `consent_required`, `interaction_required`).
   *
   * The response's `action` property determines how the authorization server should respond to the client:
   * - INTERNAL_SERVER_ERROR: Indicates a server error. The server should respond with a 500 Internal Server Error.
   * - BAD_REQUEST: Indicates an invalid request. The server should respond with a 400 Bad Request.
   * - LOCATION: Indicates that the client should be redirected. The `responseContent` will contain the redirect URL.
   * - FORM: Indicates that an HTML form should be sent to the client. The `responseContent` will contain the HTML.
   *
   * @see {@link https://docs.authlete.com/#auth-authorization-fail|Authlete API Reference: /auth/authorization/fail}
   */
  authorizationFail(
    request: AuthorizationFailRequest
  ): Promise<AuthorizationFailResponse>;

  // /**
  //  * Performs an introspection request.
  //  * @param {IntrospectionRequest} request - The introspection request.
  //  * @returns {Promise<IntrospectionResponse>} A promise that resolves to the introspection response.
  //  */
  // introspection(request: IntrospectionRequest): Promise<IntrospectionResponse>;

  // /**
  //  * Parses a single credential.
  //  * @param {CredentialSingleParseRequest} request - The credential single parse request.
  //  * @returns {Promise<CredentialSingleParseResponse>} A promise that resolves to the credential single parse response.
  //  */
  // credentialSingleParse(
  //   request: CredentialSingleParseRequest
  // ): Promise<CredentialSingleParseResponse>;

  // /**
  //  * Issues a single credential.
  //  * @param {CredentialSingleIssueRequest} request - The credential single issue request.
  //  * @returns {Promise<CredentialSingleIssueResponse>} A promise that resolves to the credential single issue response.
  //  */
  // credentialSingleIssue(
  //   request: CredentialSingleIssueRequest
  // ): Promise<CredentialSingleIssueResponse>;

  // /**
  //  * Retrieves the service configuration.
  //  * @param {ServiceConfigurationRequest} [request] - The service configuration request.
  //  * @param {boolean} [pretty=false] - Whether to format the response in a pretty way.
  //  * @returns {Promise<string>} A promise that resolves to the service configuration.
  //  */
  // getServiceConfiguration(
  //   request?: ServiceConfigurationRequest,
  //   pretty?: boolean
  // ): Promise<string>;

  // /**
  //  * Retrieves the credential issuer metadata.
  //  * @param {CredentialIssuerMetadataRequest} request - The credential issuer metadata request.
  //  * @returns {Promise<CredentialIssuerMetadataResponse>} A promise that resolves to the credential issuer metadata response.
  //  */
  // credentialIssuerMetadata(
  //   request: CredentialIssuerMetadataRequest
  // ): Promise<CredentialIssuerMetadataResponse>;
}
