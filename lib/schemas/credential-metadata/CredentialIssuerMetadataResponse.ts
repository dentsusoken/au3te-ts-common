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

/**
 * Response from Authlete's /vci/metadata API.
 *
 * @typedef {Object} CredentialIssuerMetadataResponse
 *
 * The Authlete API is supposed to be used from within the implementation of
 * the credential issuer metadata endpoint
 * (`/.well-known/openid-credential-issuer`).
 *
 * Authlete's `/vci/metadata` API returns JSON which can be mapped to
 * this class. The credential issuer implementation should retrieve the
 * value of `action` from the response and take the following steps
 * according to the value.
 *
 * @remarks
 * When the value of the `action` response
 * parameter is `OK`, it means that Authlete
 * could prepare credential issuer metadata successfully.
 *
 * In this case, the implementation of the credential issuer metadata endpoint
 * `/.well-known/openid-credential-issuer` of the credential issuer
 * should return an HTTP response with the HTTP status code `200 OK`
 * and the content type `application/json`. The message body of the
 * response has been prepared by Authlete's `/vci/metadata` API and it
 * is available as the `responseContent` response parameter.
 *
 * The implementation of the credential issuer metadata endpoint can construct
 * an HTTP response by doing like below.
 *
 * ```http
 * 200 OK
 * Content-Type: application/json
 * (Other HTTP headers)
 * ```
 *
 * @remarks
 * When the value of the `action` response
 * parameter is `NOT_FOUND`, it means that
 * the service configuration has not enabled the feature of Verifiable
 * Credentials and so the credential issuer metadata endpoint should not be
 * accessed.
 *
 * In this case, the implementation of the credential issuer metadata endpoint
 * of the credential issuer should return an HTTP response with the HTTP status
 * code `404 Not Found` and the content type `application/json`.
 * The message body (= error information in the JSON format) of the response
 * has been prepared by Authlete's `/vci/metadata` API and it is available
 * as the `responseContent` response parameter.
 *
 * The implementation of the credential issuer metadata endpoint can construct
 * an HTTP response by doing like below.
 *
 * ```http
 * 404 Not Found
 * Content-Type: application/json
 * (Other HTTP headers)
 * ```
 *
 * @remarks
 * When the value of the `action` response
 * parameter is `INTERNAL_SERVER_ERROR`,
 * it means that an unexpected error has occurred on Authlete side or the
 * service has not been set up properly yet.
 *
 * In this case, a simple implementation of the credential issuer metadata
 * endpoint would return an HTTP response with the HTTP status code
 * `500 Internal Server Error` and the content type
 * `application/json`. The message body (= error information in the JSON
 * format) of the response has been prepared by Authlete's `/vci/metadata`
 * API and it is available as the `responseContent` response parameter.
 *
 * Such simple implementation of the credential issuer metadata endpoint can
 * construct an HTTP response by doing like below.
 *
 * ```http
 * 500 Internal Server Error
 * Content-Type: application/json
 * (Other HTTP headers)
 * ```
 *
 * However, in real commercial deployments, it is rare for a credential issuer
 * to return `500 Internal Server Error` when it encounters an
 * unexpected internal error. It's up to implementations of credential issuers
 * what they actually return in the case of internal server error.
 *
 * @since 3.55
 * @since Authlete 3.0
 *
 * @see [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
 *
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { nullableButOptionalStringSchema } from '../common/stringSchema';

/**
 * Zod schema for the action of a credential issuer metadata request response.
 * Allowed values: 'OK', 'NOT_FOUND', 'INTERNAL_SERVER_ERROR'.
 */
const actionSchema = z.enum(['OK', 'NOT_FOUND', 'INTERNAL_SERVER_ERROR']);

/**
 * Zod schema for validating the response of a credential issuer metadata request.
 * This schema extends the base API response schema with additional fields specific to the credential issuer metadata request.
 *
 * @property {string} action - The action to be taken. Validated by the {@link actionSchema}.
 * @property {string|null|undefined} responseContent - The content of the response. Can be a string, null, or undefined.
 *
 * @see {@link actionSchema} for details on the action validation.
 */
export const credentialIssuerMetadataResponseSchema = apiResponseSchema.extend({
  action: actionSchema,
  responseContent: nullableButOptionalStringSchema,
});

/**
 * Type representing a credential issuer metadata request response.
 * Inferred from the `credentialIssuerMetadataResponseSchema`.
 *
 * @typedef {Object} CredentialIssuerMetadataResponse
 *
 * @property {string} action - The action of the credential issuer metadata request response.
 * @property {string} [responseContent] - The optional response content.
 */
export type CredentialIssuerMetadataResponse = z.infer<
  typeof credentialIssuerMetadataResponseSchema
>;