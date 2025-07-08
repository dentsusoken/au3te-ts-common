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
import { credentialRequestInfoSchema } from '../credential/CredentialRequestInfo';

/**
 * Enum representing possible actions that the credential endpoint should take.
 * These actions determine how the credential endpoint should respond to the request.
 *
 * @enum {string}
 * @property {string} OK - The credential request is valid.
 * @property {string} BAD_REQUEST - The credential request is invalid.
 * @property {string} UNAUTHORIZED - The access token is missing or invalid.
 * @property {string} FORBIDDEN - Verifiable Credentials feature is not enabled.
 * @property {string} INTERNAL_SERVER_ERROR - An error occurred on Authlete side.
 */
export const CredentialSingleParseActionEnum = {
  OK: 'OK',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

/**
 * Zod schema for the response from Authlete's /vci/single/parse API.
 * The response is a JSON object that can be mapped to this schema. The API caller
 * should retrieve the value of the `action` parameter from the API response and
 * take appropriate action accordingly.
 *
 * @property {Action} action - The next action that the credential endpoint should take.
 *                            Based on this value, the implementation should take one of
 *                            the following actions:
 *
 *   - OK: The credential request is valid. The implementation should proceed to call
 *         the /vci/single/issue API to issue a credential or transaction ID.
 *
 *   - BAD_REQUEST: The credential request is invalid. Return a 400 response with
 *                  responseContent as the JSON body.
 *
 *   - UNAUTHORIZED: The access token is invalid. Return a 401 response with
 *                   responseContent as the WWW-Authenticate header value.
 *
 *   - FORBIDDEN: The Verifiable Credentials feature is not enabled. Return a 403
 *                response with responseContent as the JSON body. This occurs when
 *                either the service's verifiableCredentialsEnabled property is false
 *                or when the Authlete server doesn't support the feature.
 *
 *   - INTERNAL_SERVER_ERROR: An error occurred on Authlete side. Return a 500
 *                           response with responseContent as the JSON body.
 *
 * @property {string|undefined|null} responseContent - The content of the response that
 *                                                    should be returned to the request
 *                                                    sender. The format varies depending
 *                                                    on the action value:
 *   - OK: null
 *   - UNAUTHORIZED: String suitable as WWW-Authenticate header value
 *   - Others: JSON string conforming to "Credential Error Response" specification
 *
 * @property {CredentialRequestInfo|undefined|null} info - Information about the credential
 *                                                        request. This property contains
 *                                                        parsed and validated information
 *                                                        from the original request.
 *
 * Important Implementation Notes:
 * 1. The implementation of the credential endpoint should call the /auth/introspection
 *    API to validate the access token BEFORE calling this API.
 * 2. The validation performed by this API on the access token is limited and not
 *    exhaustive (e.g., no certificate binding check as per RFC 8705).
 * 3. For INTERNAL_SERVER_ERROR responses in production, consider returning a more
 *    generic error response instead of the detailed one provided by responseContent.
 *
 * @example
 * // Success case example
 * const successResponse = {
 *   action: 'OK',
 *   info: {
 *     identifier: 'txn_id',
 *     format: 'jwt_vc_json',
 *     details: '{"credential_definition":{"type":["VerifiableCredential"]}}'
 *   }
 * };
 *
 * // Error case example
 * const errorResponse = {
 *   action: 'BAD_REQUEST',
 *   responseContent: '{"error":"invalid_request","error_description":"Invalid format"}'
 * };
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 * @see [RFC 8705 - OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
 */
export const credentialSingleParseResponseSchema = z.object({
  action: z.enum([
    'OK',
    'BAD_REQUEST',
    'UNAUTHORIZED',
    'FORBIDDEN',
    'INTERNAL_SERVER_ERROR',
  ] as const),
  responseContent: z.string().nullish(),
  info: credentialRequestInfoSchema.nullish(),
});

/**
 * Type representing the response from Authlete's /vci/single/parse API.
 * This type is inferred from the `credentialSingleParseResponseSchema`.
 *
 * The response contains information about how to handle the credential request
 * and what response should be sent back to the client. The implementation must
 * handle each action type appropriately according to the OpenID4VCI specification.
 *
 * Detailed HTTP Response Guidelines based on action:
 *
 * 1. OK (200):
 *    - Proceed with credential issuance by calling /vci/single/issue API
 *    - No direct HTTP response should be sent yet
 *
 * 2. BAD_REQUEST (400):
 *    ```http
 *    HTTP/1.1 400 Bad Request
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 3. UNAUTHORIZED (401):
 *    ```http
 *    HTTP/1.1 401 Unauthorized
 *    WWW-Authenticate: {responseContent}
 *    ```
 *
 * 4. FORBIDDEN (403):
 *    ```http
 *    HTTP/1.1 403 Forbidden
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *    Note: This typically indicates a configuration issue that should be
 *    resolved before deployment to production.
 *
 * 5. INTERNAL_SERVER_ERROR (500):
 *    ```http
 *    HTTP/1.1 500 Internal Server Error
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *    Production Consideration: Consider replacing the responseContent with
 *    a more generic error message in production environments.
 *
 * Implementation Requirements:
 * 1. Always check the action field first to determine the response type
 * 2. Include appropriate Cache-Control headers in error responses
 * 3. Set correct Content-Type headers based on the response type
 * 4. Handle the responseContent according to the action type
 * 5. Implement proper error logging for INTERNAL_SERVER_ERROR cases
 *
 * @since 3.66
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export type CredentialSingleParseResponse = z.input<
  typeof credentialSingleParseResponseSchema
>;
