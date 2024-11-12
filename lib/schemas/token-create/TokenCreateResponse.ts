/*
 * Copyright (C) 2024-2024 Authlete, Inc.
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
import { nullableButOptionalNumberSchema } from '../common/numberSchema';
import { nullableButOptionalBooleanSchema } from '../common/booleanSchema';
import {
  nullableButOptionalStringSchema,
  nullableButOptionalStringArraySchema,
} from '../common/stringSchema';
import { nullableButOptionalGrantTypeSchema } from '../common/GrantType';
import { nullableButOptionalPropertyArraySchema } from '../common/Property';
import { nullableButOptionalAuthzDetailsSchema } from '../common/AuthzDetails';

/**
 * The code indicating how the response should be interpreted.
 *
 * When the value is 'INTERNAL_SERVER_ERROR':
 * - An error occurred on Authlete side
 * - The service implementation should return 500 Internal Server Error
 *
 * When the value is 'BAD_REQUEST':
 * - The request from the caller was wrong (e.g., missing grantType)
 * - The service implementation should return 400 Bad Request
 *
 * When the value is 'FORBIDDEN':
 * - The request from the caller was not allowed
 * - For example, when the client application identified by clientId does not belong to the service
 * - The service implementation should return 403 Forbidden
 *
 * When the value is 'OK':
 * - Everything was processed successfully
 * - An access token and optionally a refresh token were issued
 * - The service implementation should return 200 OK with the token response
 */
const actionSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'FORBIDDEN',
  'OK',
]);

/**
 * Response from Authlete's /auth/token/create API.
 *
 * The API is used to create an arbitrary access token in a special way
 * that is different from standard grant flows. The service implementation
 * should retrieve the value of 'action' from the response and take
 * appropriate steps according to the value.
 *
 * When action is 'INTERNAL_SERVER_ERROR':
 * - Return 500 Internal Server Error
 *
 * When action is 'BAD_REQUEST':
 * - Return 400 Bad Request
 *
 * When action is 'FORBIDDEN':
 * - Return 403 Forbidden
 *
 * When action is 'OK':
 * - Return 200 OK with the token response
 * - Access token can be found in accessToken field
 * - Refresh token (if issued) can be found in refreshToken field
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * @see https://docs.authlete.com/reference/token-create-response
 * @since 1.13
 */
export const tokenCreateResponseSchema = apiResponseSchema.extend({
  /**
   * (REQUIRED) The code indicating how the response should be interpreted.
   * See the description of the action enum above for details about each value.
   *
   * @since Authlete 1.1
   */
  action: actionSchema,

  /**
   * (OPTIONAL) The grant type for the newly issued access token.
   * This field indicates which grant type was used to create the access token.
   *
   * @since Authlete 1.1
   */
  grantType: nullableButOptionalGrantTypeSchema,

  /**
   * (OPTIONAL) The client ID associated with the newly issued access token.
   * This is the numeric identifier of the client application that requested the token.
   *
   * @since Authlete 1.1
   */
  clientId: nullableButOptionalNumberSchema,

  /**
   * (OPTIONAL) The subject (= unique identifier) of the user associated with
   * the newly issued access token.
   *
   * This value is null when the grant type is CLIENT_CREDENTIALS since that
   * grant type does not involve a user.
   *
   * @since Authlete 1.1
   */
  subject: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The scopes associated with the newly issued access token.
   * These scopes define what the token can be used for.
   *
   * @since Authlete 1.1
   */
  scopes: nullableButOptionalStringArraySchema,

  /**
   * (OPTIONAL) The newly issued access token.
   * This is the actual token value that can be used to access protected resources.
   *
   * @since Authlete 1.1
   */
  accessToken: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The token type of the access token.
   * Typically "Bearer" or "DPoP". This value should be used in the Authorization
   * header when using the access token.
   *
   * @since Authlete 1.1
   */
  tokenType: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The duration of the newly issued access token in seconds.
   * After this duration, the token will expire and can no longer be used.
   *
   * @since Authlete 1.1
   */
  expiresIn: nullableButOptionalNumberSchema,

  /**
   * (OPTIONAL) The date at which the newly issued access token will expire.
   * This is the absolute time of expiration in milliseconds since Unix epoch (1970-01-01).
   *
   * @since Authlete 1.1
   */
  expiresAt: nullableButOptionalNumberSchema,

  /**
   * (OPTIONAL) The newly issued refresh token.
   * This token can be used to obtain a new access token when the current one expires.
   *
   * This is null when:
   * - The grant type is IMPLICIT (implicit flow does not issue refresh tokens)
   * - The grant type is CLIENT_CREDENTIALS (client credentials flow does not issue refresh tokens)
   * - The service is not configured to issue refresh tokens
   *
   * @since Authlete 1.1
   */
  refreshToken: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The properties associated with the access token.
   * These are additional key-value pairs that can be used to store custom data
   * with the access token.
   *
   * @since 1.34
   */
  properties: nullableButOptionalPropertyArraySchema,

  /**
   * (OPTIONAL) The newly issued access token in JWT format.
   *
   * This field is populated only if the service is configured to issue JWT access
   * tokens (i.e., if the accessTokenSignAlg property of the service is set).
   * When available, this JWT contains standard claims like 'iss', 'sub', 'exp',
   * as well as any custom claims specified in the service configuration.
   *
   * @since 3.11
   */
  jwtAccessToken: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The authorization details associated with the access token.
   *
   * This represents fine-grained authorization data as defined in OAuth 2.0
   * Rich Authorization Requests (RAR). It provides detailed information about
   * what the token is authorized to access.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9396.html
   * @since 2.99
   */
  authorizationDetails: nullableButOptionalAuthzDetailsSchema,

  /**
   * (OPTIONAL) Flag indicating whether the access token is for an external attachment.
   *
   * When true, this indicates the access token is meant to be used to access
   * external attachments as defined in OpenID Connect for Identity Assurance 1.0.
   *
   * @see https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments
   * @since 3.16
   */
  forExternalAttachment: nullableButOptionalBooleanSchema,

  /**
   * (OPTIONAL) The unique token identifier.
   *
   * This is a unique identifier for the access token that can be used
   * for token management operations like revocation.
   *
   * @since Authlete 3.0
   */
  tokenId: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) The scopes associated with the refresh token.
   *
   * These scopes define what can be requested when using the refresh token
   * to obtain new access tokens. They may differ from the access token scopes.
   *
   * @since Authlete 3.0
   */
  refreshTokenScopes: nullableButOptionalStringArraySchema,

  /**
   * (OPTIONAL) The client Identifier associated with the newly issued access token.
   *
   * This is the string identifier of the client application, as opposed to
   * the numeric clientId. This field is available when the client was identified
   * using the clientIdentifier in the request.
   *
   * @since Authlete 3.0
   */
  clientIdentifier: nullableButOptionalStringSchema,
});

/**
 * Type definition for the response from Authlete's /auth/token/create API.
 * This type is inferred from the tokenCreateResponseSchema.
 */
export type TokenCreateResponse = z.infer<typeof tokenCreateResponseSchema>;
