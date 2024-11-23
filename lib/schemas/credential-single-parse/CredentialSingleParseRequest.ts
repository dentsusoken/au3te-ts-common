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

/**
 * Zod schema for the request parameters of Authlete's /vci/single/parse API.
 * This API is used to parse a credential request that the credential endpoint received.
 *
 * @property {string} accessToken - The access token that came along with the credential request.
 *                                 This token should be validated using the /auth/introspection API
 *                                 before making this request.
 *
 * @property {string} requestContent - The message body of the credential request in JSON format.
 *                                    The expected format is a JSON Object that contains at least
 *                                    the "format" parameter. This content represents the actual
 *                                    credential request that needs to be parsed.
 *
 * Important Note:
 * The implementation of the credential endpoint MUST call the /auth/introspection API
 * to check whether the access token is valid BEFORE calling the /vci/single/parse API.
 * The validation performed by the /vci/single/parse API on the access token is limited
 * and not exhaustive. For example, it does not check certificate binding (RFC 8705).
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *   accessToken: 'example_access_token',
 *   requestContent: '{"format": "jwt_vc", "types": ["VerifiableCredential"]}'
 * };
 * credentialSingleParseRequestSchema.parse(validRequest);
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
 */
export const credentialSingleParseRequestSchema = z.object({
  accessToken: z.string(),
  requestContent: z.string(),
});

/**
 * Represents the structure of the request parameters of Authlete's /vci/single/parse API.
 * This type is inferred from the `credentialSingleParseRequestSchema`.
 *
 * The /vci/single/parse API is designed to parse and validate credential requests received
 * by the credential endpoint. It performs various checks on the request content to ensure
 * it complies with the OpenID4VCI specification.
 *
 * @typedef {Object} CredentialSingleParseRequest
 *
 * @property {string} accessToken - The access token received with the credential request.
 *                                 This token must be previously validated using the
 *                                 /auth/introspection API. The token is used to associate
 *                                 the credential request with an authorized session.
 *
 * @property {string} requestContent - The JSON-formatted message body of the credential request.
 *                                    Must contain a "format" parameter and may include additional
 *                                    parameters as specified in the OpenID4VCI specification.
 *                                    The content is parsed and validated by the API to ensure
 *                                    it meets the required format and contains valid parameters.
 *
 * Implementation Requirements:
 * 1. Always validate the access token using /auth/introspection before this request
 * 2. Ensure the requestContent is a valid JSON string
 * 3. Handle any validation errors returned by the API appropriately
 *
 * @example
 * // Usage of CredentialSingleParseRequest type
 * const request: CredentialSingleParseRequest = {
 *   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   requestContent: JSON.stringify({
 *     format: 'jwt_vc',
 *     types: ['VerifiableCredential', 'UniversityDegreeCredential'],
 *     proof: {
 *       proof_type: 'jwt',
 *       jwt: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     }
 *   })
 * };
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
 */
export type CredentialSingleParseRequest = z.infer<
  typeof credentialSingleParseRequestSchema
>;
