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
 * Zod schema for information about a credential request.
 * This schema represents information about a credential request sent to the credential endpoint
 * or information about a credential request in the credential_requests array in a batch credential request.
 *
 * @property {string} identifier - The identifier of the credential request.
 *                                Assigned by Authlete when /vci/single/parse or /vci/batch/parse API is used.
 *                                Used as a transaction ID. Format is a base64url string of 43 characters
 *                                with 256-bit entropy.
 *
 * @property {string} format - The value of the format parameter in the credential request.
 *                            Examples include "jwt_vc_json" and "vc+sd-jwt".
 *
 * @property {string|undefined|null} bindingKey - The binding key specified by the proof in the credential request.
 *                                               Format is JWK (RFC 7517 JSON Web Key).
 *                                               Null if the credential request does not contain a proof.
 *
 * @property {string[]|undefined|null} bindingKeys - The binding keys specified by the proofs in the credential request.
 *                                                  Each entry is a string representation of JWK.
 *                                                  Null if the credential request does not contain proofs.
 *
 * @property {string|undefined|null} details - The details of the credential request in JSON Object format.
 *                                            Contains the credential request content except format, proof,
 *                                            proofs, and credential_response_encryption parameters.
 *
 * @example
 * // Valid schema usage
 * const validInfo = {
 *   identifier: 'base64url_encoded_string',
 *   format: 'jwt_vc_json',
 *   bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
 *   bindingKeys: ['{"kty":"RSA","n":"abc...","e":"AQAB"}'],
 *   details: '{"credential_definition":{"type":["VerifiableCredential"]}}'
 * };
 * credentialRequestInfoSchema.parse(validInfo);
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [RFC 7517 JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517.html)
 */
export const credentialRequestInfoSchema = z.object({
  identifier: z.string(),
  format: z.string(),
  bindingKey: z.string().nullish(),
  bindingKeys: z.array(z.string()).nullish(),
  details: z.string().nullish(),
});

/**
 * Represents information about a credential request.
 * This type is inferred from the `credentialRequestInfoSchema`.
 *
 * The structure represents a credential request that can be either sent to the credential endpoint
 * directly or included in the credential_requests array of a batch credential request.
 *
 * @typedef {Object} CredentialRequestInfo
 *
 * @property {string} identifier - Unique identifier/transaction ID assigned by Authlete.
 *                                43 characters base64url string with 256-bit entropy.
 *
 * @property {string} format - Credential format identifier (e.g., "jwt_vc_json", "vc+sd-jwt").
 *
 * @property {string|undefined|null} bindingKey - JWK format binding key from the proof.
 *
 * @property {string[]|undefined|null} bindingKeys - Array of JWK format binding keys from proofs.
 *
 * @property {string|undefined|null} details - JSON Object containing credential request details,
 *                                            excluding certain parameters (format, proof, proofs,
 *                                            credential_response_encryption).
 *
 * Example Details Format:
 * When the original credential request is:
 * ```json
 * {
 *   "format": "jwt_vc_json",
 *   "credential_definition": {
 *     "type": ["VerifiableCredential", "UniversityDegreeCredential"]
 *   },
 *   "proof": {
 *     "proof_type": "jwt",
 *     "jwt": "eyJ...OzM"
 *   }
 * }
 * ```
 *
 * The details property will contain:
 * ```json
 * {
 *   "credential_definition": {
 *     "type": ["VerifiableCredential", "UniversityDegreeCredential"]
 *   }
 * }
 * ```
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [RFC 7517 JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517.html)
 */
export type CredentialRequestInfo = z.infer<typeof credentialRequestInfoSchema>;
