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
 * Schema for the request to Authlete's /auth/token API.
 *
 * The authorization server can implement a token endpoint which is defined
 * in RFC 6749 by using the Authlete API.
 */
export const tokenRequestSchema = z.object({
  /**
   * (REQUIRED) OAuth 2.0 token request parameters which are the request parameters
   * that the OAuth 2.0 token endpoint of the service implementation received from
   * the client application.
   *
   * The value is the entire entity body (which is formatted in
   * application/x-www-form-urlencoded) of the request from the client application.
   */
  parameters: z.string(),

  /**
   * (OPTIONAL) The client ID extracted from Authorization header of the token
   * request from the client application.
   */
  clientId: z.string().nullish(),

  /**
   * (OPTIONAL) The client secret extracted from Authorization header of the token
   * request from the client application.
   */
  clientSecret: z.string().nullish(),

  /**
   * (OPTIONAL) The client certificate from the MTLS of the token request from
   * the client application.
   */
  clientCertificate: z.string().nullish(),

  /**
   * (OPTIONAL) The certificate path presented by the client during client
   * authentication. The certificates are strings in PEM format.
   */
  clientCertificatePath: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) Extra properties to associate with an access token.
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) The value of the DPoP HTTP header.
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  dpop: z.string().nullish(),

  /**
   * (OPTIONAL) The HTTP method of the token request. In normal cases, the value is
   * "POST". When this parameter is omitted, "POST" is used as the default value.
   */
  htm: z.string().nullish(),

  /**
   * (OPTIONAL) The URL of the token endpoint. If omitted, the tokenEndpoint property
   * of Service is used as the default value.
   */
  htu: z.string().nullish(),

  /**
   * (OPTIONAL) Additional claims in JSON object format that are added to the payload
   * part of the JWT access token.
   * @since Authlete 2.3
   */
  jwtAtClaims: z.string().nullish(),

  /**
   * (OPTIONAL) The representation of an access token that may be issued as a result
   * of the Authlete API call.
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) The duration of the access token in seconds.
   * @since Authlete 2.2.41
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of the refresh token in seconds.
   * @since Authlete 2.3.20
   */
  refreshTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) The flag indicating whether to require
   * the DPoP proof JWT to include the nonce claim.
   */
  dpopNonceRequired: z.boolean().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) The value of the OAuth-Client-Attestation HTTP header.
   */
  oauthClientAttestation: z.string().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) The value of the OAuth-Client-Attestation-PoP HTTP header.
   */
  oauthClientAttestationPop: z.string().nullish(),
});

/**
 * Type definition for the request to Authlete's /auth/token API.
 */
export type TokenRequest = z.infer<typeof tokenRequestSchema>;
