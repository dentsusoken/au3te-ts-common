/*
 * Copyright (C) 2017-2023 Authlete, Inc.
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
 * Request to Authlete's `/api/auth/introspection/standard` API.
 * Note that the API and `/api/auth/introspection` API are different.
 * `/api/auth/introspection/standard` API exists to help your
 * authorization server provide its own introspection API which complies
 * with [RFC 7662](https://tools.ietf.org/html/rfc7662) (OAuth
 * 2.0 Token Introspection).
 *
 * - **`parameters`** (REQUIRED)
 *
 *   Request parameters which comply with the introspection request
 *   defined in "[2.1. Introspection Request](https://tools.ietf.org/html/rfc7662#section-2.1)"
 *   in RFC 7662. The following is an example value of `parameters`.
 *
 *   ```
 *   token=pNj1h24a4geA_YHilxrshkRkxJDsyXBZWKp3hZ5ND7A&token_type_hint=access_token
 *   ```
 *
 *   The implementation of the introspection endpoint of your
 *   authorization server will receive an HTTP POST [[RFC 7231](https://tools.ietf.org/html/rfc7231)] request with
 *   parameters in the "`application/x-www-form-urlencoded`"
 *   format. It is the entity body of the request that Authlete's
 *   `/api/auth/introspection/standard` API expects as the
 *   value of `parameters`.
 *
 * - **`withHiddenProperties`** (OPTIONAL)
 *
 *   Flag indicating whether to include hidden properties in the output.
 *
 *   Authlete has a mechanism whereby to associate arbitrary key-value pairs
 *   with an access token. Each key-value pair has a `hidden` attribute.
 *   By default, key-value pairs whose `hidden` attribute is true are
 *   not embedded in the standard introspection output.
 *
 *   If the `withHiddenProperties` request parameter is given and its
 *   value is `true`, `/api/auth/introspection/standard` API
 *   includes all the associated key-value pairs into the output regardless
 *   of the value of the `hidden` attribute.
 *
 * - **`rsUri`** (CONDITIONALLY REQUIRED)
 *
 *   The URI of the resource server making the introspection request.
 *
 *   If the `rsUri` request parameter is given and the token has
 *   audience values, Authlete checks if the value of the `rsUri`
 *   request parameter is contained in the audience values. If not contained,
 *   Authlete generates an introspection response with the `active`
 *   property set to `false`.
 *
 *   The `rsUri` request parameter is required when the resource server
 *   requests a JWT introspection response, i.e., when the value of the
 *   `httpAcceptHeader` request parameter is set to `"application/token-introspection+jwt"`.
 *
 * - **`httpAcceptHeader`** (OPTIONAL)
 *
 *   The value of the HTTP `Accept` header in the introspection
 *   request.
 *
 *   If the value of the `httpAcceptHeader` request parameter is
 *   `"application/token-introspection+jwt"`, Authlete generates
 *   a JWT introspection response. See "[4. Requesting a JWT Response](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response#section-4)"
 *   of "[JWT Response for OAuth Token Introspection](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response)" for more details.
 *
 * - **`introspectionSignAlg`** (OPTIONAL)
 *
 *   The JWS `alg` algorithm for signing the introspection response.
 *   This parameter corresponds to `introspection_signed_response_alg`
 *   defined in "[6. Client Metadata](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response#section-6)"
 *   of "JWT Response for OAuth Token Introspection".
 *
 *   The default value is `RS256`.
 *
 * - **`introspectionEncryptionAlg`** (OPTIONAL)
 *
 *   The JWE `alg` algorithm for encrypting the introspection response.
 *   This parameter corresponds to `introspection_encrypted_response_alg`
 *   defined in "6. Client Metadata" of "JWT Response for OAuth Token Introspection".
 *
 *   If the `introspectionEncryptionAlg` request parameter is specified,
 *   Authlete generates a JWT introspection response encrypted with the
 *   algorithm by this property and the algorithm specified by the `introspectionEncryptionEnc` request parameter.
 *
 * - **`introspectionEncryptionEnc`** (OPTIONAL)
 *
 *   The JWE `enc` algorithm for encrypting the introspection
 *   response. This parameter corresponds to `introspection_encrypted_response_enc`
 *   defined in "6. Client Metadata" of "JWT Response for OAuth Token Introspection".
 *
 *   The default value is `A128CBC_HS256`.
 *
 * - **`sharedKeyForSign`** (CONDITIONALLY REQUIRED)
 *
 *   The shared key for signing the introspection response with a symmetric
 *   algorithm.
 *
 *   The `sharedKeyForSign` request parameter is required when the
 *   introspection response is requested to be signed with a symmetric
 *   algorithm.
 *
 * - **`sharedKeyForEncryption`** (CONDITIONALLY REQUIRED)
 *
 *   The shared key for encrypting the introspection response with a symmetric
 *   algorithm.
 *
 *   The `sharedKeyForEncryption` request parameter is required
 *   when the introspection response is requested to be encrypted with a
 *   symmetric algorithm.
 *
 * - **`publicKeyForEncryption`** (CONDITIONALLY REQUIRED)
 *
 *   The public key for signing the introspection response with an asymmetric
 *   algorithm.
 *
 *   The `publicKeyForEncryption` request parameter is required
 *   when the introspection response is requested to be encrypted with an
 *   asymmetric algorithm.
 *
 * @see [RFC 7662, OAuth 2.0 Token Introspection](https://tools.ietf.org/html/rfc7662)
 * @see [JWT Response for OAuth Token Introspection](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response)
 * @see StandardIntrospectionResponse
 * @see AuthleteApi#standardIntrospection(StandardIntrospectionRequest)
 *
 * @author Takahiko Kawasaki
 * @author Hideki Ikeda
 *
 * @since 2.7
 */

import { z } from 'zod';
import { jwsAlgSchema } from '../jose/JWSAlg';
import { jweAlgSchema } from '../jose/JWEAlg';
import { jweEncSchema } from '../jose/JWEEnc';

/**
 * Zod schema for the request to Authlete's `/api/auth/introspection/standard` API.
 *
 * Note that the API and `/api/auth/introspection` API are different.
 * `/api/auth/introspection/standard` API exists to help your
 * authorization server provide its own introspection API which complies
 * with [RFC 7662](https://tools.ietf.org/html/rfc7662) (OAuth
 * 2.0 Token Introspection).
 *
 * @property {string} parameters - Request parameters which comply with the introspection request
 * defined in "[2.1. Introspection Request](https://tools.ietf.org/html/rfc7662#section-2.1)"
 * in RFC 7662.
 *
 * @property {boolean|null|undefined} [withHiddenProperties] - Flag indicating whether to include hidden properties in the output.
 * Authlete has a mechanism whereby to associate arbitrary key-value pairs
 * with an access token. Each key-value pair has a `hidden` attribute.
 * By default, key-value pairs whose `hidden` attribute is true are
 * not embedded in the standard introspection output.
 *
 * @property {string|null|undefined} [rsUri] - The URI of the resource server making the introspection request.
 * Required when the resource server requests a JWT introspection response.
 *
 * @property {string|null|undefined} [httpAcceptHeader] - The value of the HTTP `Accept` header in the introspection request.
 * If `"application/token-introspection+jwt"`, Authlete generates a JWT introspection response.
 *
 * @property {JWSAlg|null|undefined} [introspectionSignAlg] - The JWS `alg` algorithm for signing the introspection response.
 *
 * @property {JWEAlg|null|undefined} [introspectionEncryptionAlg] - The JWE `alg` algorithm for encrypting the introspection response.
 *
 * @property {JWEEnc|null|undefined} [introspectionEncryptionEnc] - The JWE `enc` algorithm for encrypting the introspection response.
 *
 * @property {string|null|undefined} [sharedKeyForSign] - The shared key for signing the introspection response with a symmetric algorithm.
 *
 * @property {string|null|undefined} [sharedKeyForEncryption] - The shared key for encrypting the introspection response with a symmetric algorithm.
 *
 * @property {string|null|undefined} [publicKeyForEncryption] - The public key for encrypting the introspection response with an asymmetric algorithm.
 *
 * @see {@link https://tools.ietf.org/html/rfc7662 RFC 7662, OAuth 2.0 Token Introspection}
 * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response JWT Response for OAuth Token Introspection}
 */
export const standardIntrospectionRequestSchema = z.object({
  parameters: z.string(),
  withHiddenProperties: z.boolean().nullish(),
  rsUri: z.string().nullish(),
  httpAcceptHeader: z.string().nullish(),
  introspectionSignAlg: jwsAlgSchema.nullish(),
  introspectionEncryptionAlg: jweAlgSchema.nullish(),
  introspectionEncryptionEnc: jweEncSchema.nullish(),
  sharedKeyForSign: z.string().nullish(),
  sharedKeyForEncryption: z.string().nullish(),
  publicKeyForEncryption: z.string().nullish(),
});

/**
 * Request to Authlete's `/api/auth/introspection/standard` API.
 *
 * @typedef {Object} StandardIntrospectionRequest
 * @property {string} parameters - OAuth 2.0 introspection request parameters.
 * @property {boolean|null|undefined} [withHiddenProperties] - Whether to include hidden properties.
 * @property {string|null|undefined} [rsUri] - URI of the resource server.
 * @property {string|null|undefined} [httpAcceptHeader] - HTTP Accept header value.
 * @property {JWSAlg|null|undefined} [introspectionSignAlg] - Signing algorithm.
 * @property {JWEAlg|null|undefined} [introspectionEncryptionAlg] - Encryption algorithm.
 * @property {JWEEnc|null|undefined} [introspectionEncryptionEnc] - Encryption encoding.
 * @property {string|null|undefined} [sharedKeyForSign] - Shared key for signing.
 * @property {string|null|undefined} [sharedKeyForEncryption] - Shared key for encryption.
 * @property {string|null|undefined} [publicKeyForEncryption] - Public key for encryption.
 */
export type StandardIntrospectionRequest = z.infer<
  typeof standardIntrospectionRequestSchema
>;
