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
import { credentialIssuanceOrderSchema } from '../credential/CredentialIssuanceOrder';

/**
 * Zod schema for the request parameters of Authlete's /vci/single/issue API.
 * This API is used to issue a credential or a transaction ID based on the provided order.
 *
 * @property {string} accessToken - The access token that was presented at the credential endpoint.
 *                                 This token should be validated using the /auth/introspection API
 *                                 before making this request.
 *
 * @property {CredentialIssuanceOrder} order - The instruction for credential issuance.
 *                                            Contains the necessary information to issue
 *                                            a credential.
 *
 * Important Note:
 * The implementation of the credential endpoint MUST call the APIs in the following order:
 * 1. /auth/introspection - to validate the access token
 * 2. /vci/single/parse - to parse and validate the credential request
 * 3. /vci/single/issue - to issue the credential
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *   accessToken: 'example_access_token',
 *   order: {
 *     requestIdentifier: 'abc123',
 *     credentialPayload: '{"vct":"Diploma","sub":"79301273"}',
 *     issuanceDeferred: false,
 *     credentialDuration: 3600,
 *     signingKeyId: 'key-1'
 *   }
 * };
 * credentialSingleIssueRequestSchema.parse(validRequest);
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export const credentialSingleIssueRequestSchema = z.object({
  accessToken: z.string(),
  order: credentialIssuanceOrderSchema,
});

/**
 * Represents the structure of the request parameters of Authlete's /vci/single/issue API.
 * This type is inferred from the `credentialSingleIssueRequestSchema`.
 *
 * The /vci/single/issue API is designed to issue credentials based on the provided
 * credential issuance order. It generates either a credential or a transaction ID
 * that should be returned from the credential endpoint.
 *
 * @typedef {Object} CredentialSingleIssueRequest
 *
 * @property {string} accessToken - The access token received at the credential endpoint.
 *                                 Must be previously validated using the /auth/introspection API.
 *
 * @property {CredentialIssuanceOrder} order - The instruction containing all necessary
 *                                            information for issuing a credential.
 *                                            See CredentialIssuanceOrder for details.
 *
 * Implementation Requirements:
 * 1. Always validate the access token using /auth/introspection first
 * 2. Parse the credential request using /vci/single/parse before issuing
 * 3. Handle any errors returned by the API appropriately
 *
 * @example
 * // Usage of CredentialSingleIssueRequest type
 * const request: CredentialSingleIssueRequest = {
 *   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   order: {
 *     requestIdentifier: 'abc123',
 *     credentialPayload: '{"vct":"UniversityDegree","sub":"12345"}',
 *     issuanceDeferred: false,
 *     credentialDuration: 86400,
 *     signingKeyId: 'signing-key-1'
 *   }
 * };
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export type CredentialSingleIssueRequest = z.infer<
  typeof credentialSingleIssueRequestSchema
>;
