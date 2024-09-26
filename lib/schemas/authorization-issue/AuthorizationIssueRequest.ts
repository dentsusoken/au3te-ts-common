/**
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
 * Request to Authlete's /auth/authorization/issue API.
 *
 * @typedef {Object} AuthorizationIssueRequest
 * @property {string} ticket - The ticket issued by Authlete's /auth/authorization API
 * to the service implementation. It is the value of "ticket"
 * contained in the response from Authlete's /auth/authorization API (AuthorizationResponse).
 * This parameter is REQUIRED.
 *
 * @description
 * This object represents the request parameters for the /auth/authorization/issue API.
 * The API is used to issue an authorization code, an ID token, and/or an access token
 * after the authorization server has successfully authenticated the end-user and obtained
 * authorization from them.
 *
 * Parameters for issuing an authorization code
 * @param {string} subject The user account managed by the service that has granted authorization to the client application.
 * This parameter is required unless the authorization request has come with `response_type=none`
 * (which means the client application did not request any token to be returned).
 * For details about `response_type=none`, see "4. None Response Type"
 * (http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#none) in OAuth 2.0 Multiple Response Type Encoding Practices.
 *
 * Parameters for issuing an authorization code
 * @param {number} [authTime] The time when the authentication of the end-user occurred.
 * @param {string} [acr] The Authentication Context Class Reference performed for the end-user authentication.
 *
 * Parameters for issuing an authorization code.
 * @param {Object} [claims] The claims of the end-user (= pieces of information about the end-user) in JSON format.
 * See "OpenID Connect Core 1.0, 5.1. Standard Claims" for details about the format.
 *
 * @param {Object} [idtHeaderParams] JSON that represents additional JWS header parameters for ID tokens
 * that may be issued based on the authorization request.
 *
 * @param {Object} [properties] Extra properties to associate with an access token and/or an authorization code
 * that may be issued by this request. Note that `properties` parameter is accepted only when Content-Type of
 * the request is application/json, so don't use application/x-www-form-urlencoded if you want to specify
 * `properties` parameter.
 *
 * @param {string[]} [scopes] Scopes to associate with an access token and/or an authorization code.
 * If this field is `null`, the scopes specified in the original authorization request from the client
 * application are used. In other cases, including the case of an empty array, the specified scopes will
 * replace the original scopes contained in the original authorization request.
 *
 * Even scopes that are not included in the original authorization request can be specified. However,
 * as an exception, `"openid"` scope is ignored on the server side if it is not included in the original
 * request. It is because the existence of `"openid"` scope considerably changes the validation steps
 * and because adding `"openid"` triggers generation of an ID token (although the client application has
 * not requested it) and the behavior is a major violation against the specification.
 *
 * If you add `"offline_access"` scope although it is not included in the original request, keep in mind
 * that the specification requires explicit consent from the user for the scope
 * (OpenID Connect Core 1.0, 11. Offline Access). When `"offline_access"` is included in the original
 * request, the current implementation of Authlete's `/auth/authorization` API checks whether the request
 * has come along with `prompt` request parameter and the value includes `"consent"`. However, note that
 * the implementation of Authlete's `/auth/authorization/issue` API does not perform such checking if
 * `"offline_access"` scope is added via this `scopes` parameter.
 *
 * @param {string} [sub] The value of the `sub` claim. If the value of this request parameter is not empty,
 * it is used as the value of the `sub` claim. Otherwise, the value of the `subject` request parameter is
 * used as the value of the `sub` claim. The main purpose of this parameter is to hide the actual value of
 * the subject from client applications.
 *
 * Note that even if this `sub` parameter is not empty, the value of the `subject` request parameter is used
 * as the value of the subject which is associated with the access token.
 *
 * @param {Object} [authorizationDetails] The value of the `authorization_details` to associate with the token.
 * If this value is `null`, the authorization details on the original request are used. If this value is set,
 * its contents completely override the authorization details set in the original request.
 *
 * @param {string[]} [consentedClaims] Claims that the user has consented for the client application to know.
 * If this value is `null` or empty, Authlete computes the value from the consented scopes (e.g. `profile`)
 * and the claims included in the JSON of the `claims` request parameter.
 *
 * The value of this parameter is an array of claim names. For example, if the user has consented for the
 * client application to know the user's email address and phone number, the value of this parameter should
 * be `["email", "phone_number"]`.
 *
 * If the `claims` request parameter contains a claim which is not included in this `consentedClaims` parameter,
 * Authlete removes the claim from the value of the `claims` request parameter when Authlete generates an ID
 * token. In other words, claims that are not explicitly consented by the user will not be embedded in an ID
 * token.
 *
 * @param {string} [claimsForTx] Claim data that are referenced when Authlete computes values of <i>transformed claims</i>.
 *
 * The value of this parameter is a JSON string which contains claim values. For example, if the value of this
 * parameter is `{"given_name":"Takahiko","family_name":"Kawasaki"}`, transformed claims which reference
 * `"${given_name}"` and/or `"${family_name}"` can be computed successfully.
 *
 * @param {string[]} [verifiedClaimsForTx] Verified claim data that are referenced when Authlete computes values of <i>transformed claims</i>.
 *
 * The value of this parameter is an array of JSON strings. Each element in the array represents a claim
 * that has been verified by some means. For example, if the user's email address has been verified,
 * the claim can be expressed as `{"email":"john@example.com","email_verified":true}`.
 *
 * See the description of `verifiedClaimsForTx` field for details.
 *
 * @param {Object} [jwtAtClaims] Additional claims in JSON object format that are added to the payload part of the JWT access token.
 *
 * The value of this parameter is a JSON object. The keys and values of the object represent claim names
 * and their values, respectively. For example, if the access token should include `iss` claim and `exp`
 * claim, the value of this parameter should be `{"iss":"https://example.com","exp":1516239022}`.
 *
 * @property {string} [accessToken] The representation of an access token that may be issued as a result of the Authlete API call. Available from Authlete 2.2.27 onwards.
 *
 * @property {('string'|'array')} [idTokenAudType] The type of the `aud` claim of the ID token being issued. Valid values are "string" and "array". Available from Authlete 2.3.3 onwards.
 *
 * @property {number} [accessTokenDuration] The duration of the access token that may be issued as a result of the Authlete API call.
 *
 * @see AuthorizationResponse
 * @see {@link http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims|OpenID Connect Core 1.0, 5.1. Standard Claims}
 */

import { z } from 'zod';
import {
  nullableButOptionalStringArraySchema,
  nullableButOptionalStringSchema,
} from '../common/stringSchema';
import { nullableButOptionalNumberSchema } from '../common/numberSchema';
import { nullableButOptionalPropertyArraySchema } from '../common/Property';
import { nullableButOptionalAuthzDetailsSchema } from '../common/AuthzDetails';

export const authorizationIssueRequestSchema = z.object({
  /**
   * The ticket issued by Authlete's endpoint.
   */
  ticket: z.string(),

  /**
   * The subject (end-user) managed by the service.
   */
  subject: nullableButOptionalStringSchema,

  /**
   * The value of the 'sub' claim in an ID token.
   * When this field is empty, 'subject' is used.
   */
  sub: nullableButOptionalStringSchema,

  /**
   * Get the value of {@code "authTime"} which is the time
   * when the authentication of the end-user occurred.
   *
   * The time when the end-user authentication occurred.
   * It is the number of seconds since 1970-01-01.
   */
  authTime: nullableButOptionalNumberSchema,

  /**
   * The authentication context class reference.
   */
  acr: nullableButOptionalStringSchema,

  /**
   * Claims in JSON format.
   */
  claims: nullableButOptionalStringSchema,

  /**
   * Extra properties to associate with an access token and/or
   * an authorization code.
   */
  properties: nullableButOptionalPropertyArraySchema,

  /**
   * Scopes to associate with an access token and/or an authorization code.
   * If this field is {@code null}, the scopes specified in the original
   * authorization request from the client application are used. In other
   * cases, including the case of an empty array, the scopes here will
   * replace the original scopes contained in the original request.
   */
  scopes: nullableButOptionalStringArraySchema,

  /**
   * JSON that represents additional JWS header parameters for ID tokens
   * that may be issued based on the authorization request.
   *
   * @since 2.76
   */
  idtHeaderParams: nullableButOptionalStringSchema,

  /**
   * The authorization details to associate with the access token.
   */
  authorizationDetails: nullableButOptionalAuthzDetailsSchema,

  /**
   * Claims that the user has consented for the client application to know.
   *
   * @since 3.7
   */
  consentedClaims: nullableButOptionalStringArraySchema,

  /**
   * Claim key-value pairs that are used to compute values of transformed
   * claims. The format is JSON.
   *
   * @since 3.8
   */
  claimsForTx: nullableButOptionalStringSchema,

  /**
   * Verified claim key-value pairs that are used to compute values of
   * transformed claims. The format of each element is JSON.
   *
   * @since 3.8
   */
  verifiedClaimsForTx: nullableButOptionalStringArraySchema,

  /**
   * Additional claims that are added to the payload part of the JWT
   * access token.
   *
   * @since 3.23
   * @since Authlete 2.3
   */
  jwtAtClaims: nullableButOptionalStringSchema,

  /**
   * The representation of an access token that may be issued as a
   * result of the Authlete API call.
   *
   * @since 3.24
   * @since Authlete 2.2.27
   */
  accessToken: nullableButOptionalStringSchema,

  /**
   * The type of the {@code aud} claim in the ID token being issued.
   *
   * @since 3.57
   * @since Authlete 2.3.3
   */
  idTokenAudType: nullableButOptionalStringSchema,

  /**
   * The duration of the access token that may be issued as a result
   * of the Authlete API call.
   *
   * @since 3.65
   * @since Authlete 2.2.41
   * @since Authlete 2.3.5
   * @since Authlete 3.0
   */
  accessTokenDuration: nullableButOptionalNumberSchema,
});

/**
 * Represents the request structure for issuing an authorization.
 * This type is inferred from the `authorizationIssueRequestSchema` Zod schema.
 *
 * @typedef {Object} AuthorizationIssueRequest
 * @property {string} ticket - The ticket issued by Authlete's endpoint.
 * @property {string|null|undefined} [subject] - The subject (end-user) managed by the service.
 * @property {string|null|undefined} [sub] - The value of the 'sub' claim in an ID token. When empty, 'subject' is used.
 * @property {number|null|undefined} [authTime] - The time when the end-user authentication occurred (seconds since 1970-01-01).
 * @property {string|null|undefined} [acr] - The authentication context class reference.
 * @property {string|null|undefined} [claims] - Claims in JSON format.
 * @property {Array<{key: string, value: string, hidden: boolean}>|null|undefined} [properties] - Extra properties to associate with an access token and/or an authorization code.
 * @property {string[]|null|undefined} [scopes] - Scopes to associate with an access token and/or an authorization code.
 * @property {string|null|undefined} [idtHeaderParams] - JSON representing additional JWS header parameters for ID tokens.
 * @property {Array<Object>|null|undefined} [authorizationDetails] - The authorization details to associate with the access token.
 * @property {string[]|null|undefined} [consentedClaims] - Claims that the user has consented for the client application to know.
 * @property {string|null|undefined} [claimsForTx] - Claim key-value pairs used to compute values of transformed claims (JSON format).
 * @property {string[]|null|undefined} [verifiedClaimsForTx] - Verified claim key-value pairs used to compute values of transformed claims (JSON format for each element).
 * @property {string|null|undefined} [jwtAtClaims] - Additional claims added to the payload part of the JWT access token.
 * @property {string|null|undefined} [accessToken] - The representation of an access token that may be issued.
 * @property {string|null|undefined} [idTokenAudType] - The type of the 'aud' claim in the ID token being issued.
 * @property {number|null|undefined} [accessTokenDuration] - The duration of the access token that may be issued.
 */
export type AuthorizationIssueRequest = z.infer<
  typeof authorizationIssueRequestSchema
>;
