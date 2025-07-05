/*
 * Copyright (C) 2012024 Authlete, Inc.
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
import { clientAuthMethodSchema } from '../common/ClientAuthMethod';
import { grantTypeSchema } from '../common/GrantType';
import { propertySchema } from '../common/Property';
import { pairSchema } from '../common/Pair';
import { authzDetailsSchema } from '../common/AuthzDetails';
import { tokenInfoSchema } from '../common/TokenInfo';
import { stringArraySchema } from '../common/stringSchema';
import { tokenTypeSchema } from '../common/TokenType';

/**
 * Zod schema for the action of a token response.
 * The action indicates how the service implementation should handle the response.
 *
 * @remarks
 * When the value is `INVALID_CLIENT`:
 * - Client authentication failed (e.g., unknown client, invalid client credentials)
 * - The service implementation should return either 400 Bad Request or 401 Unauthorized
 * - If the client attempted authentication via Authorization header, must return 401
 * - Must include WWW-Authenticate header if returning 401
 * - Use responseContent as the response body
 *
 * When the value is `INTERNAL_SERVER_ERROR`:
 * - The request from the service implementation was wrong
 * - An error occurred in Authlete
 * - The service implementation should return 500 Internal Server Error
 * - Use responseContent as the response body
 *
 * When the value is `BAD_REQUEST`:
 * - The request from the client application is invalid
 * - The service implementation should return 400 Bad Request
 * - Use responseContent as the response body
 *
 * When the value is `PASSWORD`:
 * - The request from the client application is valid
 * - The grant_type is "password"
 * - The service implementation should validate the credentials
 * - Call /auth/token/issue API with the ticket if credentials are valid
 * - Call /auth/token/fail API with the ticket if credentials are invalid
 *
 * When the value is `OK`:
 * - The request from the client application is valid
 * - An access token and optionally other tokens are ready to be issued
 * - The service implementation should return 200 OK
 * - Use responseContent as the response body
 *
 * When the value is `TOKEN_EXCHANGE`:
 * - The request is a valid token exchange request (RFC 8693)
 * - The request has passed basic validation steps
 * - The service implementation should process according to token exchange rules
 *
 * When the value is `JWT_BEARER`:
 * - The request uses JWT Bearer Token flow (RFC 7523)
 * - The service implementation should process according to JWT Bearer rules
 *
 * When the value is `ID_TOKEN_REISSUABLE`:
 * - An ID Token can be reissued
 * - The service implementation may reissue an ID Token if needed
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * @see https://www.rfc-editor.org/rfc/rfc6749.html#section-5.2 OAuth 2.0 Error Response
 * @see https://www.rfc-editor.org/rfc/rfc8693.html OAuth 2.0 Token Exchange
 * @see https://www.rfc-editor.org/rfc/rfc7523.html JWT Profile for OAuth 2.0 Client Authentication and Authorization Grants
 */
const actionSchema = z.enum([
  'INVALID_CLIENT',
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'PASSWORD',
  'OK',
  'TOKEN_EXCHANGE',
  'JWT_BEARER',
  'ID_TOKEN_REISSUABLE',
]);

/**
 * Response from Authlete's /auth/token API.
 *
 * The service implementation should retrieve the value of `action` from the response
 * and take appropriate steps according to the value:
 *
 * When `action` is `INVALID_CLIENT`:
 * - Client authentication failed
 * - Return 400 Bad Request or 401 Unauthorized
 * - Use responseContent as response body
 * - Add WWW-Authenticate header if client used Authorization header
 *
 * When `action` is `INTERNAL_SERVER_ERROR`:
 * - Request was wrong or error occurred in Authlete
 * - Return 500 Internal Server Error
 * - Use responseContent as response body
 *
 * When `action` is `BAD_REQUEST`:
 * - Request from client is invalid
 * - Return 400 Bad Request
 * - Use responseContent as response body
 *
 * When `action` is `PASSWORD`:
 * - Valid request with grant_type=password
 * - Validate resource owner credentials (username/password)
 * - Call /auth/token/issue API with ticket if valid
 * - Call /auth/token/fail API with ticket if invalid
 *
 * When `action` is `OK`:
 * - Valid request and token ready to be issued
 * - Return 200 OK
 * - Use responseContent as response body
 *
 * When `action` is `TOKEN_EXCHANGE`:
 * - Valid token exchange request
 * - Process according to RFC 8693
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * If dpopNonce is returned, add this header:
 * ```http
 * DPoP-Nonce: {dpopNonce value}
 * ```
 *
 * @see https://www.rfc-editor.org/rfc/rfc6749.html OAuth 2.0
 * @see https://www.rfc-editor.org/rfc/rfc8693.html OAuth 2.0 Token Exchange
 * @see https://www.rfc-editor.org/rfc/rfc9449.html OAuth 2.0 Demonstrating Proof of Possession (DPoP)
 */
export const tokenResponseSchema = apiResponseSchema.extend({
  /**
   * (REQUIRED) The action that the implementation should take.
   * This value indicates how the service implementation should handle the response.
   */
  action: actionSchema,

  /**
   * (OPTIONAL) Response content to return to the client.
   * This JSON string should be used as the response body to the client.
   */
  responseContent: z.string().nullish(),

  /**
   * (OPTIONAL) Username from resource owner password credentials grant.
   * Available when the grant type is "password".
   */
  username: z.string().nullish(),

  /**
   * (OPTIONAL) Password from resource owner password credentials grant.
   * Available when the grant type is "password".
   */
  password: z.string().nullish(),

  /**
   * (OPTIONAL) Ticket used for token operations.
   * This value is required when calling /auth/token/issue or /auth/token/fail APIs.
   */
  ticket: z.string().nullish(),

  /**
   * (OPTIONAL) Issued access token.
   * The access token that was issued by this token request.
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) Access token expiration time in milliseconds since epoch.
   * The time at which the access token will expire.
   */
  accessTokenExpiresAt: z.number().nullish(),

  /**
   * (OPTIONAL) Access token duration in seconds.
   * The duration of validity for the access token.
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) Issued refresh token.
   * The refresh token that was issued by this token request.
   */
  refreshToken: z.string().nullish(),

  /**
   * (OPTIONAL) Refresh token expiration time in milliseconds since epoch.
   * The time at which the refresh token will expire.
   */
  refreshTokenExpiresAt: z.number().nullish(),

  /**
   * (OPTIONAL) Refresh token duration in seconds.
   * The duration of validity for the refresh token.
   */
  refreshTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) Issued ID token.
   * The ID token that was issued by this token request.
   */
  idToken: z.string().nullish(),

  /**
   * (OPTIONAL) Grant type of the token request.
   * The grant type used in the token request.
   */
  grantType: grantTypeSchema.nullish(),

  /**
   * (OPTIONAL) Client ID.
   * The client identifier of the client application.
   */
  clientId: z.number().nullish(),

  /**
   * (OPTIONAL) Client ID alias.
   * The alias of the client ID used in this request.
   */
  clientIdAlias: z.string().nullish(),

  /**
   * (OPTIONAL) Flag indicating if client ID alias was used.
   * True if the client ID alias was used in this request.
   */
  clientIdAliasUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) Client entity ID.
   * The entity ID of the client.
   */
  clientEntityId: z.string().url().nullish(),

  /**
   * (OPTIONAL) Flag indicating if client entity ID was used.
   * True if the client entity ID was used in this request.
   */
  clientEntityIdUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) Subject (resource owner) identifier.
   * The identifier of the resource owner who authorized the client application.
   */
  subject: z.string().nullish(),

  /**
   * (OPTIONAL) Scopes granted to the access token.
   * The scopes that were granted to the access token.
   */
  scopes: stringArraySchema.nullish(),

  /**
   * (OPTIONAL) Properties associated with the access token.
   * Additional properties that are associated with the access token.
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) Access token in JWT format.
   * The access token in JWT format if the service is configured to issue JWT access tokens.
   */
  jwtAccessToken: z.string().nullish(),

  /**
   * (OPTIONAL) Client authentication method.
   * The method used to authenticate the client.
   */
  clientAuthMethod: clientAuthMethodSchema.nullish(),

  /**
   * (OPTIONAL) Target resources for the access token.
   * The resources that the access token is intended to be used at.
   */
  resources: z.array(z.string().url()).nullish(),

  /**
   * (OPTIONAL) Resources actually associated with the access token.
   * The resources that were actually associated with the issued access token.
   */
  accessTokenResources: z.array(z.string().url()).nullish(),

  /**
   * (OPTIONAL) Authorization details.
   * Detailed authorization information as defined in OAuth 2.0 Rich Authorization Requests.
   */
  authorizationDetails: authzDetailsSchema.nullish(),

  /**
   * (OPTIONAL) Grant identifier.
   * The identifier of the grant that this token is associated with.
   */
  grantId: z.string().nullish(),

  /**
   * (OPTIONAL) Service attributes.
   * The attributes of the service that processed this request.
   */
  serviceAttributes: z.array(pairSchema).nullish(),

  /**
   * (OPTIONAL) Client attributes.
   * The attributes of the client application.
   */
  clientAttributes: z.array(pairSchema).nullish(),

  /**
   * (OPTIONAL) Audiences for the access token.
   * The intended audiences of the access token.
   */
  audiences: stringArraySchema.nullish(),

  /**
   * (OPTIONAL) Requested token type for token exchange.
   * The type of token requested in a token exchange request.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html
   */
  requestedTokenType: tokenTypeSchema.nullish(),

  /**
   * (OPTIONAL) Subject token for token exchange.
   * The security token that represents the identity of the party on behalf of whom the request is being made.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html
   */
  subjectToken: z.string().nullish(),

  /**
   * (OPTIONAL) Subject token type for token exchange.
   * An identifier for the security token type of the subject token.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html
   */
  subjectTokenType: tokenTypeSchema.nullish(),

  /**
   * (OPTIONAL) Information about the subject token.
   * Additional information about the subject token in a token exchange request.
   */
  subjectTokenInfo: tokenInfoSchema.nullish(),

  /**
   * (OPTIONAL) Actor token for token exchange.
   * The security token that represents the identity of the acting party.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html
   */
  actorToken: z.string().nullish(),

  /**
   * (OPTIONAL) Actor token type for token exchange.
   * An identifier for the security token type of the actor token.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html
   */
  actorTokenType: tokenTypeSchema.nullish(),

  /**
   * (OPTIONAL) Information about the actor token.
   * Additional information about the actor token in a token exchange request.
   */
  actorTokenInfo: tokenInfoSchema.nullish(),

  /**
   * (OPTIONAL) Assertion for assertion grant.
   * The assertion used in an assertion grant type request.
   * @see https://www.rfc-editor.org/rfc/rfc7521.html
   */
  assertion: z.string().nullish(),

  /**
   * (OPTIONAL) Flag indicating if previous refresh token was used.
   * True if the request used a previous refresh token that was kept for a short time.
   * @since Authlete 2.3
   */
  previousRefreshTokenUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) Client nonce for credential issuance.
   * The nonce value for credential issuance in the pre-authorized code flow.
   * @since Authlete 3.0
   */
  cnonce: z.string().nullish(),

  /**
   * (OPTIONAL) Client nonce expiration time in milliseconds since epoch.
   * The time at which the client nonce will expire.
   * @since Authlete 3.0
   */
  cnonceExpiresAt: z.number().nullish(),

  /**
   * (OPTIONAL) Client nonce duration in seconds.
   * The duration of validity for the client nonce.
   * @since Authlete 3.0
   */
  cnonceDuration: z.number().nullish(),

  /**
   * (OPTIONAL) Claims requested to be included in reissued ID tokens.
   * The claims that were requested to be included in ID tokens.
   * @since Authlete 3.0
   */
  requestedIdTokenClaims: stringArraySchema.nullish(),

  /**
   * (OPTIONAL) DPoP nonce to be used in DPoP-Nonce header.
   * The nonce value that should be included in the DPoP-Nonce header.
   * @see https://www.rfc-editor.org/rfc/rfc9449.html
   */
  dpopNonce: z.string().nullish(),

  /**
   * (OPTIONAL) Scopes associated with the refresh token.
   * The scopes that are associated with the refresh token.
   * @since Authlete 3.0
   */
  refreshTokenScopes: stringArraySchema.nullish(),
});

/**
 * Type representing a token response.
 * Inferred from the tokenResponseSchema.
 */
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
