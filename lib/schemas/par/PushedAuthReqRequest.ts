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

/**
 * Request to Authlete's `/api/pushed_auth_req` API.
 *
 * The authorization server can implement a pushed authorization request
 * endpoint which is defined in "OAuth 2.0 Pushed Authorization Requests"
 * by using the Authlete API.
 *
 * Request parameters to the API are as follows:
 *
 * @typedef {Object} PushedAuthReqRequest
 * @property {string} parameters - (REQUIRED) Request parameters that the pushed authorization request endpoint of the
 * authorization server implementation received from the client application.
 * Its format is `application/x-www-form-urlencoded`.
 * @property {string} [clientId] - (OPTIONAL) The client ID extracted from the `Authorization` header of the request
 * to the pushed authorization request endpoint. If the pushed authorization request endpoint of the authorization server
 * implementation supports Basic Authentication as a means of client authentication, and the request from the client application
 * contained its client ID in the `Authorization` header, the value should be extracted and set to this parameter.
 * @property {string} [clientSecret] - (OPTIONAL) The client secret extracted from the `Authorization` header of the
 * request to the pushed authorization request endpoint. If the pushed authorization request endpoint of the authorization server
 * implementation supports Basic Authentication as a means of client authentication, and the request from the client application
 * contained its client secret in the `Authorization` header, the value should be extracted and set to this parameter.
 * @property {string} [clientCertificate] - (OPTIONAL) The client certificate used in the TLS connection between the client
 * application and the pushed authorization request endpoint of the authorization server.
 * @property {string[]} [clientCertificatePath] - (OPTIONAL) The client certificate path presented by the client during client
 * authentication. Each element is a string in PEM format.
 * @property {string} [dpop] - (OPTIONAL) The value of the `DPoP` HTTP header.
 * See <a href="https://www.rfc-editor.org/rfc/rfc9449.html">RFC 9449 OAuth
 * 2.0 Demonstrating Proof of Possession (DPoP)</a> for details.
 *
 * @property {string} [htm] - (OPTIONAL) The HTTP method of the PAR request. In normal cases, the value is
 * "POST". When this parameter is omitted, "POST" is used
 * as the default value.
 * See <a href="https://www.rfc-editor.org/rfc/rfc9449.html">RFC 9449 OAuth
 * 2.0 Demonstrating Proof of Possession (DPoP)</a> for details.
 *
 * @property {string} [htu] - (OPTIONAL) The URL of the PAR endpoint, without query or path components. If omitted,
 * the `pushedAuthReqEndpoint` property of `Service` is used as
 * the default value.
 * See <a href="https://www.rfc-editor.org/rfc/rfc9449.html">RFC 9449 OAuth
 * 2.0 Demonstrating Proof of Possession (DPoP)</a> for details.
 *
 * @property {boolean} [dpopNonceRequired] - (OPTIONAL; Authlete 3.0 onwards) The flag indicating whether to require
 * the DPoP proof JWT to include the `nonce` claim. Even if the service's `dpopNonceRequired`
 * property is false, calling the `/pushed_auth_req` API with this
 * `dpopNonceRequired` parameter true will force the Authlete API to
 * check whether the DPoP proof JWT includes the expected nonce value.
 *
 * @property {string} [oauthClientAttestation] - (OPTIONAL; Authlete 3.0 onwards) The value of the `OAuth-Client-Attestation` HTTP header, which is
 * defined in the specification of <a href=
 * "https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/"
 * >OAuth 2.0 Attestation-Based Client Authentication</a>.
 *
 * @property {string} [oauthClientAttestationPop] - (OPTIONAL; Authlete 3.0 onwards) The value of the `OAuth-Client-Attestation-PoP` HTTP header, which is
 * defined in the specification of <a href=
 * "https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/"
 * >OAuth 2.0 Attestation-Based Client Authentication</a>.
 */

import { z } from 'zod';

/**
 * Schema for the request to Authlete's /api/pushed_auth_req API.
 *
 * The authorization server can implement a pushed authorization request
 * endpoint which is defined in "OAuth 2.0 Pushed Authorization Requests"
 * by using the Authlete API.
 *
 * @since 2.51
 */
export const pushedAuthReqRequestSchema = z.object({
  /**
   * Request parameters of the request to the pushed authorization request
   * endpoint.
   */
  parameters: z.string(),

  /**
   * Client ID extracted from the Authorization header.
   */
  clientId: z.string().nullish(),

  /**
   * Client secret extracted from the Authorization header.
   */
  clientSecret: z.string().nullish(),

  /**
   * Client certificate.
   */
  clientCertificate: z.string().nullish(),

  /**
   * Client certificate path.
   */
  clientCertificatePath: z.array(z.string()).nullish(),

  /**
   * DPoP Header
   *
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  dpop: z.string().nullish(),

  /**
   * HTTP Method (for DPoP validation).
   *
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  htm: z.string().nullish(),

  /**
   * HTTP URL base (for DPoP validation).
   *
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  htu: z.string().nullish(),

  /**
   * Whether to check if the DPoP proof JWT includes the expected nonce value.
   *
   * @since Authlete 3.0
   */
  dpopNonceRequired: z.boolean().nullish(),

  /**
   * The value of the OAuth-Client-Attestation HTTP header.
   *
   * @see OAuth 2.0 Attestation-Based Client Authentication
   */
  oauthClientAttestation: z.string().nullish(),

  /**
   * The value of the OAuth-Client-Attestation-PoP HTTP header.
   *
   * @see OAuth 2.0 Attestation-Based Client Authentication
   */
  oauthClientAttestationPop: z.string().nullish(),
});

/**
 * Type definition for the request to Authlete's /api/pushed_auth_req API.
 */
export type PushedAuthReqRequest = z.infer<typeof pushedAuthReqRequestSchema>;
