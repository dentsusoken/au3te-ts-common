/*
 * Copyright (C) 2017-2023 Authlete, Inc.
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
 * Response from Authlete's `/api/auth/introspection/standard` API.
 * Note that the API and `/api/auth/introspection` API are different.
 * `/api/auth/introspection/standard` API exists to help your
 * authorization server provide its own introspection API which complies
 * with [RFC 7662](https://tools.ietf.org/html/rfc7662) (OAuth
 * 2.0 Token Introspection).
 *
 * Authlete's `/api/auth/introspection/standard` API returns JSON
 * which can be mapped to this class. The implementation of the
 * introspection endpoint of your authorization server should retrieve the
 * value of `"action"` from the response and take the following steps
 * according to the value.
 *
 * - **{@link Action.INTERNAL_SERVER_ERROR INTERNAL_SERVER_ERROR}**
 *
 *   When the value of `"action"` is `"INTERNAL_SERVER_ERROR"`,
 *   it means that the request from your system to Authlete
 *   ({@link StandardIntrospectionRequest}) was wrong or that an error
 *   occurred in Authlete.
 *
 *   In either case, from the viewpoint of the resource server, it is an
 *   error on the server side. Therefore, the introspection endpoint of
 *   your authorization server should generate a response to the resource
 *   server with the HTTP status of `"500 Internal Server Error"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which describes
 *   the error, so it can be used as the entity body of the response if
 *   you want. Note that, however, [RFC 7662](https://tools.ietf.org/html/rfc7662)
 *   does not mention anything about the response body of error responses.
 *
 *   The following illustrates an example response which the introspection
 *   endpoint of your authorization server generates and returns to the
 *   resource server.
 *
 *   ```
 *   HTTP/1.1 500 Internal Server Error
 *   Content-Type: application/json
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * - **{@link Action.BAD_REQUEST BAD_REQUEST}**
 *
 *   When the value of `"action"` is `"BAD_REQUEST"`, it means
 *   that the request from the resource server is invalid. This happens
 *   when the request from the resource server did not include the `token`
 *   request parameter. See "[2.1. Introspection Request](https://tools.ietf.org/html/rfc7662#section-2.1)"
 *   in RFC 7662 for details about requirements for introspection requests.
 *
 *   The HTTP status of the response returned to the resource server
 *   should be `"400 Bad Request"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which describes
 *   the error, so it can be used as the entity body of the response if
 *   you want. Note that, however, [RFC 7662](https://tools.ietf.org/html/rfc7662)
 *   does not mention anything about the response body of error responses.
 *
 *   The following illustrates an example response which the introspection
 *   endpoint of your authorization server generates and returns to the
 *   resource server.
 *
 *   ```
 *   HTTP/1.1 400 Bad Request
 *   Content-Type: application/json
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * - **{@link Action.OK OK}**
 *
 *   When the value of `"action"` is `"OK"`, it means that
 *   the request from the resource server is valid.
 *
 *   The HTTP status of the response returned to the resource server
 *   must be `"200 OK"` and its content type must be `"application/json"`.
 *
 *   {@link #getResponseContent()} returns a JSON string which complies
 *   with the introspection response defined in "[2.2. Introspection Response](https://tools.ietf.org/html/rfc7662#section-2.2)"
 *   in RFC 7662.
 *
 *   The following illustrates the response which the introspection endpoint
 *   of your authorization server should generate and return to the resource
 *   server.
 *
 *   ```
 *   HTTP/1.1 200 OK
 *   Content-Type: application/json
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * - **{@link Action.JWT JWT}**
 *
 *   When the value of `"action"` is `"JWT"`, it means that
 *   the request from the resource server is valid and a JWT is returned
 *   to the resource server as the introspection response.
 *
 *   The HTTP status of the response returned to the resource server
 *   must be `"200 OK"` and its content type must be `"application/token-introspection+jwt"`.
 *
 *   {@link #getResponseContent()} returns a JWT which complies with the
 *   introspection response defined in "[JWT Response for OAuth Token Introspection](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response)".
 *
 *   The following illustrates the response which the introspection endpoint
 *   of your authorization server should generate and return to the resource
 *   server.
 *
 *   ```
 *   HTTP/1.1 200 OK
 *   Content-Type: application/token-introspection+jwt
 *
 *   (The value returned from #getResponseContent())
 *   ```
 *
 * Note that RFC 7662 says *"To prevent token scanning attacks,
 * **the endpoint MUST also require some form of authorization**
 * to access this endpoint"*. This means that you have to protect
 * your introspection endpoint in some way or other. Authlete does
 * not care about how your introspection endpoint is protected. In
 * most cases, as mentioned in RFC 7662, `"401 Unauthorized"`
 * is a proper response when an introspection request does not
 * satisfy authorization requirements imposed by your introspection
 * endpoint.
 *
 * @see [RFC 7662, OAuth 2.0 Token Introspection](http://tools.ietf.org/html/rfc7662)
 * @see [JWT Response for OAuth Token Introspection](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-introspection-response)
 * @see StandardIntrospectionRequest
 * @see AuthleteApi#standardIntrospection(StandardIntrospectionRequest)
 *
 * @author Takahiko Kawasaki
 * @author Hideki Ikeda
 *
 * @since 2.7
 * @since Authlete 1.1.7
 */
import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';

const actionSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'OK',
  'JWT',
]);

/**
 * Zod schema for the response from Authlete's `/api/auth/introspection/standard` API.
 *
 * @property {string|null|undefined} [action] - The action that the introspection endpoint of your
 * authorization server should take.
 * @property {string|null|undefined} [responseContent] - The content that the introspection endpoint
 * of your authorization server should return to the resource server.
 *
 * @see {@link https://tools.ietf.org/html/rfc7662 RFC 7662, OAuth 2.0 Token Introspection}
 */
export const standardIntrospectionResponseSchema = apiResponseSchema.extend({
  action: actionSchema.nullish(),
  responseContent: z.string().nullish(),
});

/**
 * Response from Authlete's `/api/auth/introspection/standard` API.
 *
 * @typedef {Object} StandardIntrospectionResponse
 * @property {string} [resultCode] - The code indicating the result of the API call.
 * @property {string} [resultMessage] - A short message indicating the result of the API call.
 * @property {string|null|undefined} [action] - The next action.
 * @property {string|null|undefined} [responseContent] - The response content.
 */
export type StandardIntrospectionResponse = z.infer<
  typeof standardIntrospectionResponseSchema
>;
