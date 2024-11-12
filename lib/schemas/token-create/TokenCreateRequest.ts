/*
 * Copyright (C) 20124 Authlete, Inc.
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
import { propertySchema } from '../common/Property';
import { grantTypeSchema } from '../common/GrantType';
import { authzDetailsSchema } from '../common/AuthzDetails';

/**
 * Schema for the request to Authlete's /auth/token/create API.
 *
 * The API is used to create an arbitrary access token in a special way
 * that is different from standard grant flows.
 *
 * @see TokenCreateResponse
 * @since 1.13
 */
export const tokenCreateRequestSchema = z.object({
  /**
   * (REQUIRED) The grant type for a newly created access token.
   * One of the following. REFRESH_TOKEN is not allowed.
   *
   * - AUTHORIZATION_CODE
   * - IMPLICIT
   * - PASSWORD
   * - CLIENT_CREDENTIALS
   * - CIBA (Authlete 2.1 onwards)
   * - DEVICE_CODE (Authlete 2.1 onwards)
   * - TOKEN_EXCHANGE (Authlete 2.3 onwards)
   * - JWT_BEARER (Authlete 2.3 onwards)
   * - PRE_AUTHORIZED_CODE (Authlete 3.0 onwards)
   *
   * When grantType is either IMPLICIT or CLIENT_CREDENTIALS,
   * a refresh token is not issued.
   */
  grantType: grantTypeSchema,

  /**
   * (CONDITIONALLY REQUIRED) The client ID that will be associated with
   * a newly created access token.
   *
   * This parameter is required unless clientIdentifier is specified.
   */
  clientId: z.number().nullish(),

  /**
   * (CONDITIONALLY REQUIRED) The subject (= unique identifier) of the user who will be
   * associated with a newly created access token.
   *
   * This parameter is ignored when the grant type is CLIENT_CREDENTIALS.
   * This parameter is optional when the grant type is JWT_BEARER.
   * In other cases, this parameter is required.
   *
   * When specified, the value must consist of only ASCII characters and its length
   * must not exceed 100.
   */
  subject: z.string().nullish(),

  /**
   * (OPTIONAL) The scopes which will be associated with a newly created access token.
   *
   * Scopes that are not supported by the service cannot be specified and
   * requesting them will cause an error.
   */
  scopes: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) The duration of a newly created access token in seconds.
   *
   * If the value is 0, the duration is determined according to the settings of the service.
   * This parameter is ignored if accessTokenPersistent is true.
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of a newly created refresh token in seconds.
   *
   * If the value is 0, the duration is determined according to the settings of the service.
   *
   * A refresh token is not created (1) if the service does not support REFRESH_TOKEN,
   * or (2) if the specified grant type is either IMPLICIT or CLIENT_CREDENTIALS.
   */
  refreshTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) Extra properties to associate with a newly created access token.
   *
   * Keys of extra properties will be used as labels of top-level entries in a JSON response
   * containing an access token which is returned from an authorization server.
   *
   * The following keys should not be used as they are reserved:
   * - access_token
   * - token_type
   * - expires_in
   * - refresh_token
   * - scope
   * - error
   * - error_description
   * - error_uri
   * - id_token
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) Flag indicating whether to emulate that the client ID alias is used
   * instead of the original numeric client ID when a new access token is created.
   *
   * This has an effect only on the value of the 'aud' claim in a response from
   * UserInfo endpoint. When you access the UserInfo endpoint with an access token
   * which has been created with this property true, the client ID alias is used
   * as the value of the 'aud' claim in the response.
   *
   * Note that if a client ID alias is not assigned to the client, this property
   * has no effect (it is always regarded as false).
   */
  clientIdAliasUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) Flag indicating whether to emulate that the entity ID is used
   * as a client ID when a new access token is created.
   */
  clientEntityIdUsed: z.boolean().nullish(),

  /**
   * (OPTIONAL) The value of the access token.
   *
   * The API generates an access token by default. However, if you want to migrate
   * existing access tokens from an old system to Authlete, you can specify the value
   * of a newly created access token using this parameter.
   *
   * Note that if the hash value of the specified access token already exists in
   * Authlete's database, the access token cannot be inserted and the API will
   * report an error.
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) The value of the refresh token.
   *
   * The API may generate a refresh token by default. However, if you want to migrate
   * existing refresh tokens from an old system to Authlete, you can specify the value
   * of a newly created refresh token using this parameter.
   *
   * Note that if the hash value of the specified refresh token already exists in
   * Authlete's database, the refresh token cannot be inserted and the API will
   * report an error.
   */
  refreshToken: z.string().nullish(),

  /**
   * (OPTIONAL) Flag indicating whether the access token expires or not.
   *
   * By default, all access tokens expire after a period of time determined by their
   * service. If this parameter is true then the access token will not automatically
   * expire and must be revoked or deleted manually at the service.
   *
   * If this parameter is true, the accessTokenDuration parameter is ignored.
   */
  accessTokenPersistent: z.boolean().nullish(),

  /**
   * (OPTIONAL) The thumbprint of the MTLS certificate bound to this token.
   *
   * If this field is set, a certificate with the corresponding value MUST be
   * presented with the access token when it is used by a client.
   */
  certificateThumbprint: z.string().nullish(),

  /**
   * (OPTIONAL) The thumbprint of the public key used for DPoP presentation of this token.
   *
   * If this field is set, a DPoP proof signed with the corresponding private key
   * MUST be presented with the access token when it is used by a client. Additionally,
   * the token's token_type will be set to 'DPoP'.
   */
  dpopKeyThumbprint: z.string().nullish(),

  /**
   * (OPTIONAL) The authorization details.
   *
   * This represents the value of the "authorization_details" request parameter which
   * is defined in "OAuth 2.0 Rich Authorization Requests".
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
   */
  authorizationDetails: z.optional(z.nullable(authzDetailsSchema)),

  /**
   * (OPTIONAL) The resources.
   *
   * This represents the value of one or more "resource" request parameters which
   * is defined in "RFC8707 Resource Indicators for OAuth 2.0".
   *
   * @see https://www.rfc-editor.org/rfc/rfc8707.html
   */
  resources: z.array(z.string().url()).nullish(),

  /**
   * (OPTIONAL) Flag indicating whether the access token is for an external attachment.
   *
   * @see https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments
   */
  forExternalAttachment: z.boolean().nullish(),

  /**
   * (OPTIONAL) Additional claims in JSON object format that are added to the payload
   * part of the JWT access token.
   *
   * This parameter has meaning only when the format of access tokens issued by this
   * service is JWT. In other words, it has meaning only when the accessTokenSignAlg
   * property of the Service holds a non-null value.
   */
  jwtAtClaims: z.string().nullish(),

  /**
   * (OPTIONAL) The Authentication Context Class Reference of the user authentication
   * that the authorization server performed during the course of issuing the access token.
   *
   * Note that this parameter is ignored in cases where the subject parameter is
   * missing or ignored.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9470.html
   */
  acr: z.string().nullish(),

  /**
   * (OPTIONAL) The time when the user authentication was performed during the course
   * of issuing the access token.
   *
   * Note that this parameter is ignored in cases where the subject parameter is
   * missing or ignored.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9470.html
   */
  authTime: z.number().nullish(),

  /**
   * (OPTIONAL) The client Identifier that will be associated with a newly created access token.
   *
   * This parameter can be used instead of clientId to specify the client.
   *
   * @since Authlete 3.0
   */
  clientIdentifier: z.string().nullish(),
});

/**
 * Type definition for the request to Authlete's /auth/token/create API.
 */
export type TokenCreateRequest = z.infer<typeof tokenCreateRequestSchema>;
