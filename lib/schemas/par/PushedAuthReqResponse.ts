/*
 * Copyright (C) 2019-2024 Authlete, Inc.
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
 * Response from Authlete's `/api/pushed_auth_req` API.
 *
 * Authlete's `/api/pushed_auth_req` API returns JSON which can be mapped
 * to this schema. The authorization server implementation should retrieve the
 * value of `action` from the response and take the following steps
 * according to the value.
 *
 * @remarks
 * When the value of `action` is `CREATED`, it means that the
 * authorization request has been registered successfully.
 *
 * The authorization server implementation should generate a response to the
 * client application with `201 Created` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which can
 * be used as the entity body of the response.
 *
 * Example response:
 * ```
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * When the value of `action` is `BAD_REQUEST`, it means that the
 * request was wrong.
 *
 * The authorization server implementation should generate a response to the
 * client application with `400 Bad Request` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which can
 * be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 400 Bad Request
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * When the value of `action` is `UNAUTHORIZED`, it means that
 * client authentication of the request failed.
 *
 * The authorization server implementation should generate a response to the
 * client application with `401 Unauthorized` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which can
 * be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 401 Unauthorized
 * WWW-Authenticate: (challenge)
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * When the value of `action` is `FORBIDDEN`, it means that the
 * client application is not allowed to use the pushed authorization request
 * endpoint.
 *
 * The authorization server implementation should generate a response to the
 * client application with `403 Forbidden` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which
 * describes the error, so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 403 Forbidden
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * When the value of `action` is `PAYLOAD_TOO_LARGE`, it means that
 * the size of the pushed authorization request is too large.
 *
 * The authorization server implementation should generate a response to the
 * client application with `413 Payload Too Large` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which
 * describes the error, so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 413 Payload Too Large
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means
 * that the API call from the authorization server implementation was wrong or
 * that an error occurred in Authlete.
 *
 * In either case, from a viewpoint of the client application, it is an error
 * on the server side. Therefore, the authorization server implementation
 * should generate a response to the client application with
 * `500 Internal Server Error` and `application/json`.
 *
 * The `responseContent` field returns a JSON string which
 * describes the error, so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 500 Internal Server Error
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @remarks
 * Since version 3.0, Authlete recognizes the `nonce` claim in DPoP
 * proof JWTs. If the `nonce` claim is required (= if the service's
 * `dpopNonceRequired` property is `true`, or the value of the
 * `dpopNonceRequired` request parameter passed to the Authlete API
 * is `true`), the Authlete API checks whether the `nonce`
 * claim in the presented DPoP proof JWT is identical to the expected value.
 *
 * If the `dpopNonce` response parameter from the API is not null, its
 * value is the expected nonce value for DPoP proof JWT. The expected value
 * needs to be conveyed to the client application as the value of the
 * `DPoP-Nonce` HTTP header.
 *
 * Example:
 * ```
 * DPoP-Nonce: (The value returned from dpopNonce)
 * ```
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9449.html|RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)}
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { clientAuthMethodSchema } from '../common/ClientAuthMethod';

/**
 * Zod schema for the action of a pushed authorization request response.
 * Allowed values: 'CREATED', 'BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'PAYLOAD_TOO_LARGE', 'INTERNAL_SERVER_ERROR'.
 */
const actionSchema = z.enum([
  'CREATED',
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'PAYLOAD_TOO_LARGE',
  'INTERNAL_SERVER_ERROR',
]);

/**
 * Zod schema for validating the response of a pushed authorization request.
 * This schema extends the base API response schema with additional fields specific to the pushed authorization request.
 *
 * @typedef {Object} PushedAuthReqResponse
 * @property {string} action - The action to be taken. Validated by the {@link actionSchema}.
 * @property {string|null|undefined} responseContent - The content of the response. Can be a string, null, or undefined.
 * @property {import('../common/ClientAuthMethod').ClientAuthMethod|null|undefined} clientAuthMethod - The client authentication method.
 *           Can be a valid ClientAuthMethod, null, or undefined. Validated by the {@link clientAuthMethodSchema}.
 * @property {string|null|undefined} requestUri - The request URI. Must be a valid URL if present.
 * @property {string|null|undefined} dpopNonce - The DPoP nonce. Can be a string, null, or undefined.
 *
 * @see {@link actionSchema} for details on the action validation.
 * @see {@link clientAuthMethodSchema} from '../common/ClientAuthMethod' for details on the client authentication method validation.
 */
export const pushedAuthReqResponseSchema = apiResponseSchema.extend({
  action: actionSchema,
  responseContent: z.string().nullish(),
  clientAuthMethod: clientAuthMethodSchema.nullish(),
  requestUri: z.string().url().nullish(),
  dpopNonce: z.string().nullish(),
});

/**
 * Type representing a pushed authorization request response.
 * Inferred from the `pushedAuthReqResponseSchema`.
 * @typedef {Object} PushedAuthReqResponse
 * @property {string} action - The action of the pushed authorization request response.
 * @property {string} [responseContent] - The optional response content.
 * @property {ClientAuthMethod} [clientAuthMethod] - The optional client authentication method.
 * @property {string} [requestUri] - The optional request URI.
 * @property {string} [dpopNonce] - The optional DPoP (Demonstration of Proof-of-Possession) nonce.
 */
export type PushedAuthReqResponse = z.input<typeof pushedAuthReqResponseSchema>;
