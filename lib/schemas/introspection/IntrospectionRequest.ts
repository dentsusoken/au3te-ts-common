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
import { pairSchema } from '../common/Pair';

/**
 * Schema for the request to Authlete's /auth/introspection API.
 *
 * The authorization server can implement an introspection endpoint which is defined
 * in RFC 7662 by using the Authlete API.
 *
 * @see IntrospectionResponse
 *
 * @see https://www.rfc-editor.org/rfc/rfc7662.html
 *      RFC 7662 OAuth 2.0 Token Introspection
 */
export const introspectionRequestSchema = z.object({
  /**
   * (REQUIRED) An access token to introspect.
   *
   * This parameter is the access token that the protected resource endpoint
   * has received from the client application. The purpose of the introspection
   * API is to get information about the access token.
   */
  token: z.string(),

  /**
   * (OPTIONAL) Scopes that should be covered by the access token.
   *
   * If the array contains a scope which is not covered by the access token,
   * Authlete's /auth/introspection API returns FORBIDDEN as the action and
   * insufficient_scope as the error code.
   *
   * If this parameter is omitted, the /auth/introspection API does not perform
   * scope checking.
   */
  scopes: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) The subject (= unique identifier) that should be associated with
   * the access token.
   *
   * If the specified subject is different from the one associated with the access
   * token, Authlete's /auth/introspection API returns FORBIDDEN as the action and
   * invalid_request as the error code.
   *
   * If this parameter is omitted, the /auth/introspection API does not perform
   * subject checking.
   */
  subject: z.string().nullish(),

  /**
   * (OPTIONAL) The client certificate used in the mutual TLS connection established
   * between the client application and the protected resource endpoint.
   *
   * If the access token is bound to a client certificate, this parameter is used
   * for validation.
   *
   * @see https://www.rfc-editor.org/rfc/rfc8705.html
   *      RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens
   */
  clientCertificate: z.string().nullish(),

  /**
   * (OPTIONAL) The value of the DPoP HTTP header.
   *
   * This header contains a signed JWT which includes the public key that is paired
   * with the private key used to sign it.
   *
   * If the access token is bound to a public key via DPoP, this parameter is used
   * for validation.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9449.html
   *      RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  dpop: z.string().nullish(),

  /**
   * (OPTIONAL) The HTTP method of the request to the protected resource endpoint.
   *
   * This field is used to validate the DPoP header. Additionally, it is used as
   * the value of the @method derived component of HTTP message signatures.
   *
   * If the access token is bound to a public key via DPoP, this parameter is used
   * for validation.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9449.html
   *      RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   *
   * @see https://www.rfc-editor.org/rfc/rfc9421.html#section-2.2.1
   *      RFC 9421 HTTP Message Signatures, Section 2.2.1. Method
   */
  htm: z.string().nullish(),

  /**
   * (OPTIONAL) The URL of the protected resource endpoint.
   *
   * This field is used to validate the DPoP header.
   *
   * If the access token is bound to a public key via DPoP, this parameter is used
   * for validation.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9449.html
   *      RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  htu: z.string().nullish(),

  /**
   * (OPTIONAL) Resource indicators that should be covered by the access token.
   *
   * If this parameter is specified and the access token does not cover the
   * specified resource indicators, Authlete's /auth/introspection API returns
   * FORBIDDEN as the action.
   *
   * If this parameter is omitted, the /auth/introspection API does not perform
   * resource indicator checking.
   *
   * @see https://www.rfc-editor.org/rfc/rfc8707.html
   *      RFC 8707 Resource Indicators for OAuth 2.0
   */
  resources: z.array(z.string().url()).nullish(),

  /**
   * (OPTIONAL) The full URI of the resource request, including the query part, if any.
   *
   * This parameter is used as the value of the @target-uri derived component for
   * HTTP message signatures. Additionally, other derived components such as
   * @authority, @scheme, @path, @query and @query-param are computed from this
   * parameter.
   *
   * When this parameter is omitted, the value of the htu parameter is used. The
   * htu parameter represents the URL of the resource endpoint, which is identical
   * to the target URI of the resource request as long as the request does not
   * include a query component.
   *
   * @since Authlete 2.3.27
   *
   * @see https://www.rfc-editor.org/rfc/rfc9421.html#section-2.2.2
   *      RFC 9421 HTTP Message Signatures, Section 2.2.2. Target URI
   */
  targetUri: z.string().url().nullish(),

  /**
   * (OPTIONAL) The HTTP headers included in the resource request.
   *
   * They are used to compute component values, which will be part of the signature
   * base for HTTP message signatures.
   *
   * Each header is represented as a key-value pair where:
   * - key: The name of the HTTP header
   * - value: The value of the HTTP header
   *
   * @example
   * ```typescript
   * const headers = [
   *   { key: 'Content-Type', value: 'application/json' },
   *   { key: 'Authorization', value: 'Bearer xyz...' }
   * ];
   * ```
   *
   * @since Authlete 2.3
   *
   * @see https://www.rfc-editor.org/rfc/rfc9421.html
   *      RFC 9421 HTTP Message Signatures
   */
  headers: z.array(pairSchema).nullish(),

  /**
   * (OPTIONAL) The flag indicating whether the resource request contains a request body.
   *
   * When the resource request must comply with the HTTP message signing requirements
   * defined in the FAPI 2.0 Message Signing specification, the "content-digest"
   * component identifier must be included in the signature base of the HTTP message
   * signature if the resource request contains a request body.
   *
   * When this parameter is true, Authlete checks whether "content-digest" is included
   * in the signature base, if the FAPI profile applies to the resource request.
   *
   * @since Authlete 2.3.27
   */
  requestBodyContained: z.boolean().nullish(),

  /**
   * (OPTIONAL) Authentication Context Class Reference values.
   *
   * One of these values must be satisfied by the user authentication performed
   * during the course of issuing the access token.
   *
   * If this parameter is specified and none of the specified ACR values is
   * satisfied, Authlete's /auth/introspection API returns FORBIDDEN as the action
   * and invalid_request as the error code.
   *
   * If this parameter is omitted, the /auth/introspection API does not perform
   * ACR checking.
   *
   * @since Authlete 2.3
   *
   * @see https://www.rfc-editor.org/rfc/rfc9470.html
   *      RFC 9470 OAuth 2.0 Step Up Authentication Challenge Protocol
   */
  acrValues: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) The maximum authentication age in seconds.
   *
   * This is the maximum allowable elapsed time since the user authentication was
   * performed during the course of issuing the access token.
   *
   * If this parameter is specified with a positive value and the elapsed time
   * exceeds the maximum authentication age, Authlete's /auth/introspection API
   * returns FORBIDDEN as the action and invalid_request as the error code.
   *
   * If this parameter is omitted or has a value of 0 or less, the
   * /auth/introspection API does not perform max age checking.
   *
   * @since Authlete 2.3
   *
   * @see https://www.rfc-editor.org/rfc/rfc9470.html
   *      RFC 9470 OAuth 2.0 Step Up Authentication Challenge Protocol
   */
  maxAge: z.number().int().nullish(),

  /**
   * (OPTIONAL) The flag indicating whether to require the DPoP proof JWT to include
   * the nonce claim.
   *
   * If this parameter is true or if the service's dpopNonceRequired property is
   * true, the /auth/introspection API checks if the DPoP proof JWT includes the
   * expected nonce value. In this case, the response from the /auth/introspection
   * API will include the dpopNonce response parameter, which should be used as
   * the value of the DPoP-Nonce HTTP header.
   *
   * @since Authlete 3.0
   *
   * @see https://www.rfc-editor.org/rfc/rfc9449.html
   *      RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  dpopNonceRequired: z.boolean().nullish(),
});

/**
 * Type definition for the request to Authlete's /auth/introspection API.
 *
 * @see https://www.rfc-editor.org/rfc/rfc7662.html
 *      RFC 7662 OAuth 2.0 Token Introspection
 */
export type IntrospectionRequest = z.infer<typeof introspectionRequestSchema>;
