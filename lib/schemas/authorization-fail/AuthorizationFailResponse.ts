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
 * Response from Authlete's /auth/authorization/fail API.
 *
 * Authlete's /auth/authorization/fail API returns JSON which can be mapped to this class.
 * The service implementation should retrieve the value of "action" from the response and
 * take the following steps according to the value.
 *
 * @typedef {Object} AuthorizationFailResponse
 * @property {string} action - The action to be taken.
 *
 * @description
 * Possible values for the `action` property:
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
 * @property {string} LOCATION
 * When the value of "action" is "LOCATION", it means that
 * the response to the client application should be "302 Found"
 * with "Location" header.
 *
 * @remarks
 * The `responseContent` field returns a redirect URI to which the error
 * should be reported, so it can be used as the value of "Location" header.
 *
 * The following illustrates the response which the service implementation
 * should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 302 Found
 * Location: (The value returned from responseContent)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * @property {string} FORM
 * When the value of "action" is "FORM", it means that
 * the response to the client application should be "200 OK"
 * with an HTML which triggers redirection by JavaScript. This happens
 * when the authorization request from the client contains
 * `response_mode=form_post` request parameter.
 *
 * @remarks
 * The `responseContent` field returns an HTML which satisfies the
 * requirements of `response_mode=form_post`, so it can be used
 * as the entity body of the response.
 *
 * The following illustrates the response which the service implementation
 * should generate and return to the client application:
 *
 * ```http
 * HTTP/1.1 200 OK
 * Content-Type: text/html;charset=UTF-8
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value returned from responseContent)
 * ```
 *
 * @see {@link https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html|OAuth 2.0 Form Post Response Mode}
 * for more information about the form_post response mode.
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { nullableButOptionalStringSchema } from '../common/stringSchema';

const actionSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'LOCATION',
  'FORM',
]);

/**
 * Schema for the authorization fail response.
 *
 * This schema defines the structure of a response from Authlete's `/auth/authorization/fail` API.
 * It extends the base API response schema with additional fields specific to authorization failure.
 *
 * @typedef {Object} AuthorizationFailResponse
 * @property {('INTERNAL_SERVER_ERROR'|'BAD_REQUEST'|'LOCATION'|'FORM')} action - Indicates the action that should be taken in response to the authorization failure.
 * @property {string|null} [responseContent] - Contains the content of the response that should be sent to the client. The exact content depends on the action.
 *
 * @remarks
 * The `action` property determines how the authorization server should respond to the client:
 * - INTERNAL_SERVER_ERROR: Indicates a server error. The server should respond with a 500 Internal Server Error.
 * - BAD_REQUEST: Indicates an invalid request. The server should respond with a 400 Bad Request.
 * - LOCATION: Indicates that the client should be redirected. The `responseContent` will contain the redirect URL.
 * - FORM: Indicates that an HTML form should be sent to the client. The `responseContent` will contain the HTML.
 *
 * The `responseContent` field, when present, provides the actual content to be sent to the client,
 * such as error descriptions, redirect URLs, or HTML content.
 *
 * @see {@link https://docs.authlete.com/#auth-authorization-fail|Authlete API Reference: /auth/authorization/fail}
 */
export const authorizationFailResponseSchema = apiResponseSchema.extend({
  action: actionSchema,
  responseContent: nullableButOptionalStringSchema,
});

/**
 * Type definition for the AuthorizationFailResponse, inferred from the Zod schema.
 *
 * This type represents the structure of an authorization fail response object.
 * It is derived from the `authorizationFailResponseSchema` and ensures type safety
 * when working with authorization fail responses.
 *
 * @typedef {z.infer<typeof authorizationFailResponseSchema>} AuthorizationFailResponse
 */
export type AuthorizationFailResponse = z.infer<
  typeof authorizationFailResponseSchema
>;
