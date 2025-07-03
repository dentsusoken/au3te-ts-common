/**
 * Copyright (C) 2014-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Response from Authlete's /auth/authorization/issue API.
 *
 * Authlete's /auth/authorization/issue API returns JSON which can be mapped to this class.
 * The service implementation should retrieve the value of "action" from the response and
 * take the following steps according to the value.
 *
 * @description
 * When the value of "action" is "INTERNAL_SERVER_ERROR":
 * It means that the request from the service implementation (AuthorizationIssueRequest) was wrong
 * or that an error occurred in Authlete.
 *
 * In either case, from the viewpoint of the client application, it is an error on the server side.
 * Therefore, the service implementation should generate a response to the client application
 * with the HTTP status of "500 Internal Server Error".
 *
 * The responseContent field returns a JSON string which describes the error,
 * so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the service implementation should generate
 * and return to the client application:
 *
 * HTTP/1.1 500 Internal Server Error
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 *
 * @description
 * When the value of "action" is "BAD_REQUEST":
 * It means that the ticket is no longer valid (deleted or expired) and that the
 * reason of the invalidity was probably due to the end-user's too-delayed
 * response to the authorization UI.
 *
 * The HTTP status of the response returned to the client application should
 * be "400 Bad Request" and the content type should be "application/json"
 * although OAuth 2.0 specification does not mention the format of the error response.
 *
 * The responseContent field returns a JSON string which describes
 * the error, so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the service implementation
 * should generate and return to the client application:
 *
 * HTTP/1.1 400 Bad Request
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 *
 * @description
 * When the value of "action" is "LOCATION":
 * It means that the response to the client application should be "302 Found"
 * with "Location" header.
 *
 * The responseContent field returns a redirect URI which contains
 * (1) an authorization code, an ID token and/or an access token (on
 * success) or (2) an error code (on failure), so it can be used as the
 * value of "Location" header.
 *
 * The following illustrates the response which the service implementation
 * should generate and return to the client application:
 *
 * HTTP/1.1 302 Found
 * Location: (The value of the responseContent field)
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * @description
 * When the value of "action" is "FORM":
 * It means that the response to the client application should be "200 OK"
 * with an HTML which triggers redirection by JavaScript. This happens
 * when the authorization request from the client contains
 * response_mode=form_post request parameter.
 *
 * The responseContent field returns an HTML which satisfies the
 * requirements of response_mode=form_post, so it can be used
 * as the entity body of the response.
 *
 * The following illustrates the response which the service implementation
 * should generate and return to the client application:
 *
 * HTTP/1.1 200 OK
 * Content-Type: text/html;charset=UTF-8
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { authorizationTicketInfoSchema } from '../common/AuthorizationTicketInfo';

const actionSchema = z.enum([
  /**
   * The request from the service implementation was wrong or
   * an error occurred in Authlete, so the service implementation
   * should return {@code "500 Internal Server Error"} to the
   * client application.
   */
  'INTERNAL_SERVER_ERROR',

  /**
   * The ticket was no longer valid. The service implementation
   * should return {@code "400 Bad Request}" to the client application.
   */
  'BAD_REQUEST',

  /**
   * The service implementation should return {@code "302 Found"}
   * to the client application with {@code "Location"} header.
   */
  'LOCATION',

  /**
   * The service implementation should return {@code "200 OK"}
   * to the client application with an HTML which triggers
   * redirection.
   */
  'FORM',
]);

export const authorizationIssueResponseSchema = apiResponseSchema.extend({
  /**
   * The next action that the service implementation should take.
   */
  action: actionSchema,

  /**
   * The response content which can be used as the entity body
   * of the response returned to the client application.
   */
  responseContent: z.string().nullish(),

  /**
   * The access token. An access token is issued when the
   * `response_type` request parameter of the authorization
   * request includes `token`.
   *
   * If the service is configured to issue JWT-based access tokens,
   * a JWT-based access token is issued additionally. In that case,
   * the `jwtAccessToken` field returns the JWT-based access token.
   *
   * @type {string|undefined}
   * @since 1.34
   *
   * @see jwtAccessToken
   */
  accessToken: z.string().nullish(),

  /**
   * The date in seconds since the Unix epoch at which
   * the access token will expire.
   *
   * If an access token is not issued, this value is 0.
   *
   * @type {number|undefined}
   * @since 1.34
   */
  accessTokenExpiresAt: z.number().nullish(),

  /**
   * The duration of the access token in seconds.
   *
   * This value represents the time period for which the access token is valid,
   * starting from the moment it was issued.
   *
   * @type {number|undefined}
   * @since 1.34
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * The newly issued ID token.
   *
   * An ID token is issued when the `response_type` request parameter
   * of the authorization request includes `id_token`.
   *
   * @type {string|undefined}
   * @since 1.34
   */
  idToken: z.string().nullish(),

  /**
   * The newly issued authorization code.
   *
   * An authorization code is issued when the `response_type` request parameter
   * of the authorization request includes `code`.
   *
   * @type {string|undefined}
   * @since 1.34
   */
  authorizationCode: z.string().nullish(),

  /**
   * The newly issued access token in JWT format.
   *
   * If the authorization server is configured to issue JWT-based access
   * tokens (= if `Service.accessTokenSignAlg` returns a non-null value),
   * a JWT-based access token is issued along with the original
   * random-string one.
   *
   * Regarding the detailed format of the JWT-based access token, see the
   * description of the `Service` class.
   *
   * @type {string|undefined}
   * @see accessToken
   * @since 2.37
   */
  jwtAccessToken: z.string().nullish(),

  /**
   * The information attached to the ticket that was presented to the
   * `/auth/authorization/issue` API.
   *
   * @type {AuthorizationTicketInfo|undefined}
   * @since 3.88
   * @since Authlete 3.0
   */
  ticketInfo: authorizationTicketInfoSchema.nullish(),
});

/**
 * Represents the response structure for an authorization issue request.
 * This type is inferred from the `authorizationIssueResponseSchema` Zod schema.
 *
 * @typedef {Object} AuthorizationIssueResponse
 * @property {('INTERNAL_SERVER_ERROR'|'BAD_REQUEST'|'LOCATION'|'FORM')} action - The next action that the service implementation should take.
 * @property {string|null} [responseContent] - The response content which can be used as the entity body of the response returned to the client application.
 * @property {string|null} [accessToken] - The access token issued when the `response_type` request parameter includes `token`.
 * @property {number|null} [accessTokenExpiresAt] - The expiration date of the access token in seconds since the Unix epoch.
 * @property {number|null} [accessTokenDuration] - The duration of the access token in seconds.
 * @property {string|null} [idToken] - The newly issued ID token when the `response_type` includes `id_token`.
 * @property {string|null} [authorizationCode] - The newly issued authorization code when the `response_type` includes `code`.
 * @property {string|null} [jwtAccessToken] - The newly issued access token in JWT format, if the server is configured to issue JWT-based tokens.
 * @property {Object|null} [ticketInfo] - The information attached to the ticket presented to the `/auth/authorization/issue` API.
 */
export type AuthorizationIssueResponse = z.infer<
  typeof authorizationIssueResponseSchema
>;
