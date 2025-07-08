/*
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

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { propertySchema } from '../common/Property';
import { authzDetailsSchema } from '../common/AuthzDetails';
import { pairSchema } from '../common/Pair';

/**
 * The action that the service implementation should take.
 *
 * When the value is `INTERNAL_SERVER_ERROR`:
 * - The request from the service implementation was wrong or an error occurred in Authlete
 * - The service implementation should return 500 Internal Server Error
 * - Use responseContent as the response body
 *
 * When the value is `OK`:
 * - The token request was valid and an access token is ready to be issued
 * - The service implementation should return 200 OK
 * - Use responseContent as the response body
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 */
const actionSchema = z.enum(['INTERNAL_SERVER_ERROR', 'OK']);

/**
 * Response from Authlete's /auth/token/issue API.
 *
 * The service implementation should retrieve the value of `action` from the response
 * and take appropriate steps according to the value.
 *
 * When `action` is `INTERNAL_SERVER_ERROR`:
 * - Request was wrong or error occurred in Authlete
 * - Return 500 Internal Server Error
 * - Use responseContent as response body
 *
 * When `action` is `OK`:
 * - Valid request and token ready to be issued
 * - Return 200 OK
 * - Use responseContent as response body
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 */
export const tokenIssueResponseSchema = apiResponseSchema.extend({
  /**
   * (REQUIRED) The action that the implementation should take.
   */
  action: actionSchema,

  /**
   * (OPTIONAL) Response content to return to the client.
   * This JSON string should be used as the response body to the client.
   */
  responseContent: z.string().nullish(),

  /**
   * (OPTIONAL) The newly issued access token.
   * If the service is configured to issue JWT-based access tokens,
   * a JWT-based access token is issued additionally.
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) The date in milliseconds since the Unix epoch at which
   * the access token will expire.
   */
  accessTokenExpiresAt: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of the access token in seconds.
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The refresh token.
   * Available only when the service supports refresh token flow.
   */
  refreshToken: z.string().nullish(),

  /**
   * (OPTIONAL) The date in milliseconds since the Unix epoch at which
   * the refresh token will expire.
   */
  refreshTokenExpiresAt: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of the refresh token in seconds.
   */
  refreshTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The client ID.
   */
  clientId: z.number().nullish(),

  /**
   * (OPTIONAL) The client ID alias.
   */
  clientIdAlias: z.string().nullish(),

  /**
   * (OPTIONAL) Flag indicating if client ID alias was used.
   */
  clientIdAliasUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) The entity ID of the client.
   * @since Authlete 2.3
   */
  clientEntityId: z.string().url().nullish(),

  /**
   * (OPTIONAL) Flag indicating if client entity ID was used.
   * @since Authlete 2.3
   */
  clientEntityIdUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) The subject (resource owner) identifier.
   */
  subject: z.string().nullish(),

  /**
   * (OPTIONAL) Scopes granted to the access token.
   */
  scopes: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) Properties associated with the access token.
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) Access token in JWT format.
   * Available only when the service is configured to issue JWT access tokens.
   */
  jwtAccessToken: z.string().nullish(),

  /**
   * (OPTIONAL) Target resources for the access token.
   * See "Resource Indicators for OAuth 2.0" for details.
   */
  accessTokenResources: z.array(z.string().url()).nullish(),

  /**
   * (OPTIONAL) Authorization details.
   * Represents the value of the "authorization_details" request parameter
   * defined in OAuth 2.0 Rich Authorization Requests.
   */
  authorizationDetails: authzDetailsSchema.nullish(),

  /**
   * (OPTIONAL) Service attributes.
   * @since Authlete 2.2
   */
  serviceAttributes: z.array(pairSchema).nullish(),

  /**
   * (OPTIONAL) Client attributes.
   * @since Authlete 2.2
   */
  clientAttributes: z.array(pairSchema).nullish(),

  /**
   * (OPTIONAL) Scopes associated with the refresh token.
   * @since Authlete 3.0
   */
  refreshTokenScopes: z.array(z.string()).nullish(),
});

/**
 * Type representing a token issue response.
 * Inferred from the tokenIssueResponseSchema.
 */
export type TokenIssueResponse = z.input<typeof tokenIssueResponseSchema>;
