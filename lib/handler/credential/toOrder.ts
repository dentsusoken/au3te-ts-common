/*
 * Copyright (C) 2024 Authlete, Inc.
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

import { CredentialRequestInfo } from '../../schemas/credential/CredentialRequestInfo';
import { CredentialIssuanceOrder } from '../../schemas/credential/CredentialIssuanceOrder';
import { CredentialType } from './types';
import { IntrospectionResponse } from '../../schemas/introspection/IntrospectionResponse';

/**
 * Function type for converting credential request information into a credential issuance order.
 *
 * <p>
 * This function is responsible for processing a credential request and generating
 * an appropriate credential issuance order. The process involves validating the
 * request, checking permissions, and collecting necessary claims.
 * </p>
 *
 * <h3>Parameters</h3>
 *
 * <p>
 * The function takes three parameters:
 * </p>
 *
 * <ul>
 * <li>{@code credentialType} - The type of credential being requested.
 *     This determines how the credential will be formatted and what claims
 *     will be included.</li>
 *
 * <li>{@code credentialRequestInfo} - Information about the credential request.
 *     This includes the format, binding keys, and other details specific to
 *     the credential request.</li>
 *
 * <li>{@code introspectionResponse} - Response from token introspection.
 *     Contains information about the access token used in the request,
 *     including the subject (user) and permissions.</li>
 * </ul>
 *
 * <h3>Return Value</h3>
 *
 * <p>
 * The function returns a Promise that resolves to a {@link CredentialIssuanceOrder}.
 * The order contains instructions for issuing the credential, including:
 * </p>
 *
 * <ul>
 * <li>The identifier of the credential request</li>
 * <li>The credential payload (claims to be included)</li>
 * <li>Whether issuance should be deferred</li>
 * <li>The duration of the credential</li>
 * <li>The signing key ID (optional)</li>
 * </ul>
 *
 * <h3>Error Handling</h3>
 *
 * <p>
 * The function may throw exceptions in the following cases:
 * </p>
 *
 * <ul>
 * <li>Invalid credential request format or content</li>
 * <li>Insufficient permissions</li>
 * <li>User not found</li>
 * <li>Required claims not available</li>
 * <li>Other processing errors</li>
 * </ul>
 *
 * @param credentialType - The type of credential being requested
 * @param credentialRequestInfo - Information about the credential request
 * @param introspectionResponse - Response from token introspection
 *
 * @returns A Promise that resolves to a credential issuance order
 *
 * @throws {InvalidCredentialRequestException}
 *         The credential request is invalid
 *
 * @throws {VerifiableCredentialException}
 *         Other errors during processing
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export type ToOrder = (
  credentialType: CredentialType,
  credentialRequestInfo: CredentialRequestInfo,
  introspectionResponse: IntrospectionResponse
) => Promise<CredentialIssuanceOrder>;
