/*
 * Copyright (C) 2014-2023 Authlete, Inc.
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
 * Request to Authlete's `/auth/authorization` API.
 *
 * @typedef {Object} AuthorizationRequest
 * @property {string} parameters - OAuth 2.0 authorization request parameters which are the
 * request parameters that the OAuth 2.0 authorization endpoint of the service implementation
 * received from the client application.
 *
 * The value of "parameters" is:
 * 1. The entire query string when the HTTP method of the request from the client
 *    application is "GET", or
 * 2. The entire entity body (which is formatted in `application/x-www-form-urlencoded`)
 *    when the HTTP method of the request from the client application is "POST".
 *
 * @property {string} [context] - An arbitrary text to be attached to the ticket that will be issued
 * from the `/auth/authorization` API.
 */

import { z } from 'zod';

/**
 * Zod schema for the authorization request to Authlete's `/auth/authorization` API.
 *
 * @property {string} parameters - OAuth 2.0 authorization request parameters.
 * These are the request parameters that the OAuth 2.0 authorization endpoint
 * of the service implementation received from the client application.
 *
 * The value of "parameters" is:
 * 1. The entire query string when the HTTP method of the request from the client
 *    application is "GET", or
 * 2. The entire entity body (which is formatted in `application/x-www-form-urlencoded`)
 *    when the HTTP method of the request from the client application is "POST".
 *
 * @property {string|null|undefined} [context] - An arbitrary text to be attached to the ticket
 * that will be issued from the `/auth/authorization` API. This property is optional and can be null.
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *   parameters: "response_type=code&client_id=123&redirect_uri=https://example.com/callback",
 *   context: "Additional information"
 * };
 * authorizationRequestSchema.parse(validRequest);
 *
 * @since 3.88
 * @since Authlete 3.0
 */
export const authorizationRequestSchema = z.object({
  parameters: z.string(),
  context: z.string().nullish(),
});

/**
 * Represents the structure of an authorization request to Authlete's `/auth/authorization` API.
 * This type is inferred from the `authorizationRequestSchema`.
 *
 * @typedef {Object} AuthorizationRequest
 * @property {string} parameters - OAuth 2.0 authorization request parameters.
 * @property {string|null|undefined} [context] - Optional context information.
 *
 * @example
 * // Usage of AuthorizationRequest type
 * const request: AuthorizationRequest = {
 *   parameters: "response_type=code&client_id=123&redirect_uri=https://example.com/callback",
 *   context: "Additional information"
 * };
 *
 * @since 3.88
 * @since Authlete 3.0
 */
export type AuthorizationRequest = z.infer<typeof authorizationRequestSchema>;
