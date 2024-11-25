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
 * Zod schema for credential issuance order.
 *
 * <p>
 * Authlete APIs that may issue one or more verifiable credentials expect that
 * an API call contains one or more instructions for the credential issuance.
 * This schema represents such instructions.
 * </p>
 *
 * <h3>The {@code requestIdentifier} Property</h3>
 *
 * <p>
 * This mandatory property must be the identifier that has been assigned
 * to the credential request by the preceding Authlete API.
 * </p>
 *
 * <p>
 * The {@code /vci/single/parse} API parses a credential request that the
 * implementation of the credential endpoint receives. The response from
 * the API includes an identifier assigned to the credential request.
 * The identifier has to be set to this {@code requestIdentifier} property.
 * </p>
 *
 * <p>
 * Likewise, the {@code /vci/batch/parse} API parses a batch credential
 * request that the implementation of the batch credential endpoint
 * receives. The response from the API includes identifiers assigned to
 * each credential request in the batch credential request. A request to
 * the {@code /vci/batch/issue} API is expected to contain multiple
 * credential orders. Each order is represented by this schema and its
 * {@code requestIdentifier} property should hold an identifier that was
 * contained in the response from the {@code /vci/batch/parse} API.
 * </p>
 *
 * <h3>The {@code credentialPayload} Property</h3>
 *
 * <p>
 * This property is an additional content that will be added to the payload
 * of a credential to be issued. The format of this property must be a JSON
 * object if present. The necessity and content of this property depend on
 * the credential format.
 * </p>
 *
 * <h4>The {@code vc+sd-jwt} Format</h4>
 *
 * <p>
 * When the credential format is "{@code vc+sd-jwt}", the {@code credentialPayload}
 * property is mandatory. It must contain at least the "{@code vct}" claim
 * whose value is a string, and typically it is expected to contain some claims
 * about the user such as the "{@code sub}" claim and the "{@code family_name}"
 * claim.
 * </p>
 *
 * <pre>
 * {
 *   "vct": "Diploma",
 *   "sub": "79301273",
 *   "family_name": "Kawasaki"
 * }
 * </pre>
 *
 * <p>
 * The following claims are added by Authlete even if they are not included in
 * the {@code credentialPayload} property.
 * </p>
 *
 * <ul>
 * <li>{@code iss}
 * <li>{@code iat}
 * <li>{@code exp} (only when the credential has an expiration time.)
 * <li>{@code cnf} (only when the credential request included a key proof.)
 * </ul>
 *
 * <h4>The {@code mso_mdoc} Format</h4>
 *
 * <p>
 * This format identifier represents the <b>mdoc</b> format which is defined in
 * the "ISO/IEC 18013-5:2021" standard.
 * </p>
 *
 * <p>
 * When the credential format is "{@code mso_mdoc}", the {@code credentialPayload}
 * property is mandatory. It must contain at least the "{@code doctype}" property
 * and the "{@code claims}" property.
 * </p>
 *
 * <h3>The {@code issuanceDeferred} Property</h3>
 *
 * <p>
 * This boolean property indicates whether to defer credential issuance.
 * </p>
 *
 * <p>
 * When the value of this property is {@code true}, a transaction ID is issued
 * instead of a credential. That is, the response from the credential issuer
 * will contain the "{@code transaction_id}" parameter instead of the
 * "{@code credential}" parameter.
 * </p>
 *
 * <p>
 * When {@code true}, other properties than {@code requestIdentifier} will not
 * be referenced.
 * </p>
 *
 * <h3>The {@code credentialDuration} Property</h3>
 *
 * <p>
 * This optional property specifies the duration of the credential in seconds.
 * </p>
 *
 * <p>
 * The value of this property and the value of the "{@code credentialDuration}"
 * property of the service are used as input to determine the final duration
 * of the credential. The table below indicates how the duration is determined.
 * </p>
 *
 * <table>
 *   <tr>
 *     <th>Request Property</th>
 *     <th>Service Property</th>
 *     <th>Result</th>
 *   </tr>
 *   <tr>
 *     <td>0 or omitted</td>
 *     <td>0</td>
 *     <td>The credential won't expire.</td>
 *   </tr>
 *   <tr>
 *     <td>0 or omitted</td>
 *     <td>positive number</td>
 *     <td>The value of the service property is used as the duration.</td>
 *   </tr>
 *   <tr>
 *     <td>positive number</td>
 *     <td>any</td>
 *     <td>The value of the request property is used as the duration.</td>
 *   </tr>
 *   <tr>
 *     <td>negative number</td>
 *     <td>any</td>
 *     <td>The credential won't expire.</td>
 *   </tr>
 * </table>
 *
 * <h3>The {@code signingKeyId} Property</h3>
 *
 * <p>
 * This optional property specifies the key ID of the private key that should
 * be used for signing the credential.
 * </p>
 *
 * <p>
 * The key ID should be found in the JWK Set of the credential issuer, which
 * is the content of the {@code credentialJwks} property of the service.
 * </p>
 *
 * <p>
 * If this property is omitted, Authlete will automatically select one private
 * key from the JWK Set.
 * </p>
 *
 * @example
 * // Valid schema usage
 * const validOrder = {
 *   requestIdentifier: 'abc123',
 *   credentialPayload: '{"vct":"Diploma","sub":"79301273"}',
 *   issuanceDeferred: false,
 *   credentialDuration: 3600,
 *   signingKeyId: 'key-1'
 * };
 * credentialIssuanceOrderSchema.parse(validOrder);
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [Selective Disclosure for JWTs (SD-JWT)](https://datatracker.ietf.org/doc/draft-ietf-oauth-selective-disclosure-jwt/)
 */
export const credentialIssuanceOrderSchema = z.object({
  requestIdentifier: z.string(),
  credentialPayload: z.string().nullish(),
  issuanceDeferred: z.boolean().nullish(),
  credentialDuration: z.number().nullish(),
  signingKeyId: z.string().nullish(),
});

/**
 * Represents a credential issuance order.
 * This type is inferred from the `credentialIssuanceOrderSchema`.
 *
 * <p>
 * The structure represents instructions for credential issuance that are used
 * by Authlete APIs. Each property in this type corresponds to a specific aspect
 * of the credential issuance process.
 * </p>
 *
 * @typedef {Object} CredentialIssuanceOrder
 *
 * @property {string} requestIdentifier
 *           The identifier assigned to the credential request by the preceding
 *           Authlete API. Must be set to the identifier returned from
 *           /vci/single/parse, /vci/batch/parse, or /vci/deferred/parse API.
 *
 * @property {string|undefined|null} credentialPayload
 *           Additional content to be added to the credential payload.
 *           Must be a JSON object string if present. The format depends on
 *           the credential format (e.g., vc+sd-jwt, mso_mdoc).
 *
 * @property {boolean|undefined|null} issuanceDeferred
 *           Flag indicating whether to defer credential issuance.
 *           If true, a transaction ID is issued instead of a credential.
 *
 * @property {number|undefined|null} credentialDuration
 *           Duration of the credential in seconds.
 *           - Positive number: Used as duration
 *           - 0: Uses service default duration
 *           - Negative number: Credential won't expire
 *
 * @property {string|undefined|null} signingKeyId
 *           Key ID of the private key for signing the credential.
 *           Should exist in the service's credentialJwks.
 *           If omitted, Authlete selects automatically.
 *
 * @since 3.67
 * @since Authlete 3.0
 */
export type CredentialIssuanceOrder = z.infer<
  typeof credentialIssuanceOrderSchema
>;
