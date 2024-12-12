/*
 * Copyright (C) 2023 Authlete, Inc.
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
 * Request to Authlete's {@code /vci/jwks} API.
 *
 *
 * @typedef {Object} CredentialIssuerJwksRequest
 *
 * The Authlete API can be used to implement an endpoint that returns the
 * JWK Set document of the credential issuer that contains public keys only.
 *
 * @since 3.72
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */

import { z } from 'zod';

/**
 * Zod schema for the request parameters of Authlete's /vci/jwks API.
 *
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * The Authlete API is supposed to be used from within the implementation of
 * the credential issuer jwks endpoint
 * `/api/vci/jwks`.
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *  pretty: true,
 * };
 * credentialIssuerJwksRequestSchema.parse(validRequest);
 *
 * @since 3.72
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export const credentialIssuerJwksRequestSchema = z.object({
  pretty: z.boolean().nullish(),
});

/**
 * Represents the structure of the request parameters of Authlete's /vci/jwks API.
 * This type is inferred from the `credentialIssuerJwksRequestSchema`.
 *
 * @typedef {Object} CredentialIssuerJwksRequest
 *
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * The Authlete API is supposed to be used from within the implementation of
 * the credential issuer jwks endpoint
 * `/api/vci/jwks`.
 *
 * @example
 * // Usage of CredentialIssuerJwksRequest type
 * const request: CredentialIssuerJwksRequest = {
 *  pretty: true,
 * };
 *
 * @since 3.72
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export type CredentialIssuerJwksRequest = z.infer<
  typeof credentialIssuerJwksRequestSchema
>;
