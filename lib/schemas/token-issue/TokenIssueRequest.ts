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
import { propertySchema } from '../common/Property';

/**
 * Schema for the request to Authlete's /auth/token/issue API.
 *
 * The authorization server can implement a token endpoint which is defined
 * in RFC 6749 by using the Authlete API.
 *
 * @see TokenResponse
 */
export const tokenIssueRequestSchema = z.object({
  /**
   * (REQUIRED) The ticket issued by Authlete's /auth/token API to the
   * service implementation. It is the value of "ticket" contained in
   * the response from Authlete's /auth/token API (TokenResponse).
   */
  ticket: z.string(),

  /**
   * (REQUIRED) The subject (= unique identifier) of the authenticated user.
   *
   * @since 1.13
   */
  subject: z.string(),

  /**
   * (OPTIONAL) Extra properties to associate with a newly created access token.
   *
   * Note that properties parameter is accepted only when Content-Type of the request
   * is application/json, so don't use application/x-www-form-urlencoded if you want
   * to specify properties.
   *
   * Keys listed below should not be used and they would be ignored on the server side
   * even if they were used. It's because they are reserved in RFC 6749 and OpenID
   * Connect Core 1.0:
   * - access_token
   * - token_type
   * - expires_in
   * - refresh_token
   * - scope
   * - error
   * - error_description
   * - error_uri
   * - id_token
   *
   * Note that there is an upper limit on the total size of extra properties.
   * On the server side, the properties will be:
   * 1. converted to a multidimensional string array
   * 2. converted to JSON
   * 3. encrypted by AES/CBC/PKCS5Padding
   * 4. encoded by base64url
   * and then stored into the database. The length of the resultant string must
   * not exceed 65,535 bytes.
   *
   * @since 1.30
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) Additional claims in JSON object format that are added to the payload
   * part of the JWT access token.
   *
   * This request parameter has a meaning only when the format of access tokens
   * issued by this service is JWT. In other words, it has a meaning only when
   * the accessTokenSignAlg property of the Service holds a non-null value.
   *
   * @since Authlete 2.3
   */
  jwtAtClaims: z.string().nullish(),

  /**
   * (OPTIONAL) The representation of an access token that may be issued as a result
   * of the Authlete API call.
   *
   * Basically, it is the Authlete server's role to generate an access token.
   * However, some systems may have inflexible restrictions on the format of
   * access tokens. Such systems may use this accessToken request parameter to
   * specify the representation of an access token by themselves instead of
   * leaving the access token generation task to the Authlete server.
   *
   * Usually, the Authlete server:
   * 1. generates a random 256-bit value
   * 2. base64url-encodes the value into a 43-character string
   * 3. uses the resultant string as the representation of an access token
   *
   * Make sure that the entropy of the value of the accessToken request parameter
   * is big enough. The entropy does not necessarily have to be equal to or greater
   * than 256 bits. For example, 192-bit random values (which will become 32-character
   * strings when encoded by base64url) may be enough.
   *
   * @since Authlete 2.2.27
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) The duration of the access token in seconds.
   *
   * When this request parameter holds a positive integer, it is used as the
   * duration of the access token. In other cases, this request parameter is
   * ignored.
   *
   * @since Authlete 2.2.41
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of the refresh token in seconds.
   *
   * When this request parameter holds a positive integer, it is used as the
   * duration of the refresh token. In other cases, this request parameter is
   * ignored.
   *
   * @since Authlete 2.3.20
   */
  refreshTokenDuration: z.number().nullish(),
});

/**
 * Type definition for the request to Authlete's /auth/token/issue API.
 */
export type TokenIssueRequest = z.infer<typeof tokenIssueRequestSchema>;
