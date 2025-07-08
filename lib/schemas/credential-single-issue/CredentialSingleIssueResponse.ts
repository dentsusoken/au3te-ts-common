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
 * Enum representing possible actions that the credential endpoint should take.
 * These actions determine how the credential endpoint should respond to the request.
 *
 * @enum {string}
 * @property {string} OK - A credential was issued successfully. Return 200 with application/json.
 * @property {string} OK_JWT - A credential was issued successfully and should be encrypted. Return 200 with application/jwt.
 * @property {string} ACCEPTED - A transaction ID was issued successfully. Return 202 with application/json.
 * @property {string} ACCEPTED_JWT - A transaction ID was issued and should be encrypted. Return 202 with application/jwt.
 * @property {string} BAD_REQUEST - The credential request is invalid.
 * @property {string} UNAUTHORIZED - The access token is missing or invalid.
 * @property {string} FORBIDDEN - Verifiable Credentials feature is not enabled.
 * @property {string} INTERNAL_SERVER_ERROR - An error occurred on Authlete side.
 * @property {string} CALLER_ERROR - The API call is invalid.
 */
export const CredentialSingleIssueActionEnum = {
  OK: 'OK',
  OK_JWT: 'OK_JWT',
  ACCEPTED: 'ACCEPTED',
  ACCEPTED_JWT: 'ACCEPTED_JWT',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  CALLER_ERROR: 'CALLER_ERROR',
} as const;

/**
 * Zod schema for the response from Authlete's /vci/single/issue API.
 * The response is a JSON object that can be mapped to this schema. The API caller
 * should retrieve the value of the `action` parameter from the API response and
 * take appropriate action accordingly.
 *
 * @property {Action} action - The next action that the credential endpoint should take.
 *                            Based on this value, the implementation should take one of
 *                            the following actions:
 *
 *   - OK: Return 200 OK with application/json content type.
 *         The responseContent contains the credential.
 *
 *   - OK_JWT: Return 200 OK with application/jwt content type.
 *            The responseContent contains the encrypted credential.
 *
 *   - ACCEPTED: Return 202 Accepted with application/json content type.
 *              The responseContent contains the transaction ID.
 *
 *   - ACCEPTED_JWT: Return 202 Accepted with application/jwt content type.
 *                  The responseContent contains the encrypted transaction ID.
 *
 *   - BAD_REQUEST: Return 400 Bad Request with responseContent as JSON body.
 *
 *   - UNAUTHORIZED: Return 401 with responseContent as WWW-Authenticate header value.
 *
 *   - FORBIDDEN: Return 403 with responseContent as JSON body.
 *                Occurs when verifiableCredentialsEnabled is false.
 *
 *   - INTERNAL_SERVER_ERROR: Return 500 with responseContent as JSON body.
 *
 *   - CALLER_ERROR: API call is invalid (e.g., missing order parameter).
 *                   Should be fixed before deployment.
 *
 * @property {string|undefined|null} responseContent - The content of the response that
 *                                                    should be returned to the request
 *                                                    sender. The format varies depending
 *                                                    on the action value.
 *
 * @property {string|undefined|null} transactionId - The issued transaction ID.
 *                                                  Present when issuanceDeferred is true
 *                                                  in the credential order.
 *
 * Important Implementation Notes:
 * 1. Always check the action field first to determine the response type
 * 2. Include appropriate Cache-Control headers in responses
 * 3. Set correct Content-Type headers based on the action
 * 4. For INTERNAL_SERVER_ERROR in production, consider using a generic error message
 *
 * @example
 * // Success case example
 * const successResponse = {
 *   action: 'OK',
 *   responseContent: '{"credential":"eyJhbGciOiJSUzI1NiIsInR5cCI6..."}',
 * };
 *
 * // Deferred case example
 * const deferredResponse = {
 *   action: 'ACCEPTED',
 *   responseContent: '{"transaction_id":"txn_123"}',
 *   transactionId: 'txn_123'
 * };
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export const credentialSingleIssueResponseSchema = z.object({
  action: z.enum([
    'OK',
    'OK_JWT',
    'ACCEPTED',
    'ACCEPTED_JWT',
    'BAD_REQUEST',
    'UNAUTHORIZED',
    'FORBIDDEN',
    'INTERNAL_SERVER_ERROR',
    'CALLER_ERROR',
  ] as const),
  responseContent: z.string().nullish(),
  transactionId: z.string().nullish(),
});

/**
 * Type representing the response from Authlete's /vci/single/issue API.
 * This type is inferred from the `credentialSingleIssueResponseSchema`.
 *
 * The response contains information about how to handle the credential issuance
 * and what response should be sent back to the client. The implementation must
 * handle each action type appropriately according to the OpenID4VCI specification.
 *
 * Detailed HTTP Response Guidelines based on action:
 *
 * 1. OK (200):
 *    ```http
 *    HTTP/1.1 200 OK
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 2. OK_JWT (200):
 *    ```http
 *    HTTP/1.1 200 OK
 *    Content-Type: application/jwt
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 3. ACCEPTED (202):
 *    ```http
 *    HTTP/1.1 202 Accepted
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 4. ACCEPTED_JWT (202):
 *    ```http
 *    HTTP/1.1 202 Accepted
 *    Content-Type: application/jwt
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 5. BAD_REQUEST (400):
 *    ```http
 *    HTTP/1.1 400 Bad Request
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 6. UNAUTHORIZED (401):
 *    ```http
 *    HTTP/1.1 401 Unauthorized
 *    WWW-Authenticate: {responseContent}
 *    ```
 *
 * 7. FORBIDDEN (403):
 *    ```http
 *    HTTP/1.1 403 Forbidden
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * 8. INTERNAL_SERVER_ERROR (500):
 *    ```http
 *    HTTP/1.1 500 Internal Server Error
 *    Content-Type: application/json
 *    Cache-Control: no-store
 *
 *    {responseContent}
 *    ```
 *
 * Implementation Requirements:
 * 1. Always check the action field first to determine the response type
 * 2. Include appropriate Cache-Control headers in responses
 * 3. Set correct Content-Type headers based on the action
 * 4. Handle the responseContent according to the action type
 * 5. Implement proper error logging for INTERNAL_SERVER_ERROR cases
 * 6. Store transactionId when present for deferred credential issuance
 *
 * @since 3.67
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 */
export type CredentialSingleIssueResponse = z.input<
  typeof credentialSingleIssueResponseSchema
>;
