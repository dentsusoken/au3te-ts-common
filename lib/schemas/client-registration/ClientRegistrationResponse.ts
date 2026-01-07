/*
 * Copyright (C) 2018-2021 Authlete, Inc.
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
 * Response from Authlete's `/api/client/registration` API.
 *
 * Authlete's `/api/client/register` API returns JSON which can be
 * mapped to this class. The implementation of client registration endpoint
 * should retrieve the value of `"action"` from the response and take
 * the following steps according to the value.
 *
 * - **{@link Action.INTERNAL_SERVER_ERROR INTERNAL_SERVER_ERROR}**
 *
 *   When the value of `"action"` is `"INTERNAL_SERVER_ERROR"`,
 *   it means that the request from the endpoint implementation ({@link ClientRegistrationRequest})
 *   was wrong or that an error occurred in Authlete.
 *
 *   In either case, from a viewpoint of the client application, it is an
 *   error on the server side. Therefore, the endpoint implementation should
 *   generate a response to the client application with the HTTP status of
 *   `"500 Internal Server Error"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which describes
 *   the error, so it can be used as the entity body of the response.
 *
 *   The following illustrates the response which the endpoint implementation
 *   should generate and return to the client application.
 *
 *   ```
 *   HTTP/1.1 500 Internal Server Error
 *   Content-Type: application/json
 *   Cache-Control: no-store
 *   Pragma: no-cache
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * - **{@link Action.BAD_REQUEST BAD_REQUEST}**
 *
 *   When the value of `"action"` is `"BAD_REQUEST"`, it means
 *   that the request from the client application is invalid.
 *
 *   The HTTP status of the response returned to the client application
 *   must be `"400 Bad Request"` and the content type must be
 *   `"application/json"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which describes
 *   the error, so it can be used as the entity body of the response.
 *
 *   The following illustrates the response which the endpoint implementation
 *   should generate and return to the client application.
 *
 *   ```
 *   HTTP/1.1 400 Bad Request
 *   Content-Type: application/json
 *   Cache-Control: no-store
 *   Pragma: no-cache
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * - **{@link Action.UNAUTHORIZED UNAUTHORIZED}**
 *
 *   When the value of `"action"` is `"UNAUTHORIZED"`, it means that
 *   the registration access token used by the client configuration request
 *   ([RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html)) is
 *   invalid, or the client application which the token is tied to does not exist
 *   any longer or is invalid.
 *
 *   The HTTP status of the response returned to the client application must be
 *   `"401 Unauthorized"` and the content type must be
 *   `"application/json"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which describes the
 *   error, so it can be used as the entity body of the response.
 *
 *   The following illustrates the response which the endpoint implementation
 *   should generate and return to the client application.
 *
 *   ```
 *   HTTP/1.1 401 Unauthorized
 *   Content-Type: application/json
 *   Cache-Control: no-store
 *   Pragma: no-cache
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 *   NOTE: The `UNAUTHORIZED` enum value was added recently (in October, 2021).
 *   See the description of {@link Service#setUnauthorizedOnClientConfigSupported(boolean)}
 *   for details.
 *
 * - **{@link Action.CREATED CREATED}**
 *
 *   When the value of `"action"` is `"CREATED"`, it means that the
 *   client registration request was valid and a client application has been
 *   registered successfully.
 *
 *   In this case, the HTTP status of the response returned to the client
 *   application must be `"201 Created"` as described in "[3.2.1. Client Information Response](https://tools.ietf.org/html/rfc7591#section-3.2.1)"
 *   of [RFC 7591](https://tools.ietf.org/html/rfc7591).
 *
 *   The following illustrates the response which the endpoint implementation
 *   should generate and return to the client application.
 *
 *   ```
 *   HTTP/1.1 201 Created
 *   Content-Type: application/json
 *   Cache-Control: no-store
 *   Pragma: no-cache
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * @since 2.22
 * @since Authlete 2.0.0
 */
import { z } from 'zod';
import { apiResponseSchema } from '../common';

/**
 * Zod schema for the action to be taken after a client registration API call.
 */
const actionSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'CREATED',
  'UPDATED',
  'DELETED',
  'OK',
]);

/**
 * Zod schema for the response from Authlete's `/api/client/registration` API.
 *
 * @property {string} action - The action that the endpoint implementation should take.
 * @property {string|null|undefined} [responseContent] - The content that the endpoint implementation should return to the client application.
 *
 * @see {@link https://tools.ietf.org/html/rfc7591 RFC 7591, OAuth 2.0 Dynamic Client Registration Protocol}
 */
export const clientRegistrationResponseSchema = apiResponseSchema.extend({
  action: actionSchema,
  responseContent: z.string().nullish(),
});

/**
 * Response from Authlete's `/api/client/registration` API.
 *
 * @typedef {Object} ClientRegistrationResponse
 * @property {string} [resultCode] - The code indicating the result of the API call.
 * @property {string} [resultMessage] - A short message indicating the result of the API call.
 * @property {string} action - The next action.
 * @property {string|null|undefined} [responseContent] - The response content.
 */
export type ClientRegistrationResponse = z.infer<
  typeof clientRegistrationResponseSchema
>;
