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
import { nullableButOptionalStringSchema } from '../common/stringSchema';

const reasonSchema = z.enum([
  /**
   * Unknown reason.
   *
   * This represents an unspecified or unknown error condition.
   *
   * @remarks
   * When this reason is used, it will result in an error response
   * with `error=server_error`. This should be used sparingly and
   * only when no other specific error reason applies.
   *
   * In OAuth 2.0 and OpenID Connect flows, `server_error` indicates
   * that the authorization server encountered an unexpected condition
   * that prevented it from fulfilling the request.
   *
   * It's generally recommended to provide more specific error reasons
   * when possible to help diagnose and resolve issues.
   */
  'UNKNOWN',
  /**
   * The authorization request from the client application contained
   * `prompt=none`, but any end-user has not logged in.
   *
   * This error occurs when the client requests a non-interactive authentication
   * process, but there is no authenticated user session.
   *
   * @see {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|OpenID Connect Core 1.0, 3.1.2.1. Authentication Request}
   * for details on the `prompt` request parameter.
   *
   * @remarks
   * Using this reason will result in an error response with `error=login_required`.
   * This indicates that the Authorization Server requires End-User authentication
   * to proceed with the request.
   */
  'NOT_LOGGED_IN',
  /**
   * Indicates that the service cannot properly handle the max_age requirement.
   *
   * This error occurs when the authorization request contains a non-zero `max_age` parameter
   * or the client's configuration has a non-zero `default_max_age`, but the service
   * implementation cannot properly handle this requirement, typically because it does not
   * manage authentication times for end-users.
   *
   * @see {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|OpenID Connect Core 1.0, 3.1.2.1. Authentication Request}
   * for details on the `max_age` request parameter.
   *
   * @see {@link http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata|OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata}
   * for details on the `default_max_age` configuration parameter.
   *
   * @remarks
   * Using this reason will result in an error response with `error=login_required`.
   * This indicates that the Authorization Server requires End-User re-authentication
   * to proceed with the request, as it cannot determine if the existing authentication
   * satisfies the max age requirement.
   */
  'MAX_AGE_NOT_SUPPORTED',
  /**
   * Indicates that re-authentication is required due to expired max_age.
   *
   * This error occurs when the authorization request contains `prompt=none`,
   * but the time specified by the `max_age` request parameter or the `default_max_age`
   * client configuration parameter has elapsed since the end-user's last authentication.
   *
   * @see {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|OpenID Connect Core 1.0, 3.1.2.1. Authentication Request}
   * for details on the `prompt` and `max_age` request parameters.
   *
   * @see {@link http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata|OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata}
   * for details on the `default_max_age` configuration parameter.
   *
   * @remarks
   * Using this reason will result in an error response with `error=login_required`.
   * This indicates that the Authorization Server requires End-User re-authentication
   * to proceed with the request, as the existing authentication has exceeded the
   * maximum allowed age.
   */
  'EXCEEDS_MAX_AGE',
  /**
   * Indicates a mismatch between the requested subject and the authenticated user.
   *
   * This error occurs when the authorization request from the client application
   * specifies a particular value for the `sub` (subject) claim, but this value
   * does not match the current end-user. This can happen in two scenarios:
   *
   * 1. When `prompt=none` is used and the current session user doesn't match.
   * 2. After authentication, if the authenticated user doesn't match the requested subject.
   *
   * @remarks
   * Using this reason will result in an error response with `error=login_required`.
   * This indicates that the Authorization Server requires End-User authentication
   * to proceed with the request, as the current user does not match the requested subject.
   *
   * The `sub` claim in an ID token represents the subject identifier, which is
   * typically a unique identifier for the end-user. When a client requests a specific
   * `sub` value, it's expecting to interact with a particular user. If this doesn't
   * match the actual authenticated user, it's a security concern that needs to be addressed.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#IDToken|OpenID Connect Core 1.0, Section 2. ID Token}
   * for more information about the `sub` claim in ID Tokens.
   */
  'DIFFERENT_SUBJECT',
  /**
   * Indicates that the Authentication Context Class Reference (ACR) requirement was not met.
   *
   * This error occurs when the authorization request from the client application includes
   * an "acr" claim in the "claims" request parameter, marked as essential, but the ACR
   * performed for the end-user does not match any of the requested ACRs.
   *
   * @remarks
   * The error response depends on the version of the Authlete server:
   * - For Authlete server version 2.2 or older: `error=login_required`
   * - For newer versions: `error=unmet_authentication_requirements`
   *
   * The `unmet_authentication_requirements` error indicates that the Authorization Server
   * requires the Client to make a new Authentication Request because the originally
   * requested ACR could not be met.
   *
   * @see {@link https://openid.net/specs/openid-connect-unmet-authentication-requirements-1_0.html|OpenID Connect Core Error Code unmet_authentication_requirements}
   * for details about the `unmet_authentication_requirements` error.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#acrSemantics|OpenID Connect Core 1.0, Section 5.5.1.1}
   * for more information about ACR usage in OpenID Connect.
   */
  'ACR_NOT_SATISFIED',
  /**
   * Indicates that the end-user denied the authorization request.
   *
   * This error occurs when the end-user explicitly refuses to grant authorization
   * to the client application.
   *
   * @remarks
   * Using this reason will result in an error response with `error=access_denied`.
   * This error code is defined in the OAuth 2.0 specification and indicates that
   * the resource owner or authorization server denied the request.
   *
   * In the context of an OpenID Connect authorization flow, this typically happens
   * when the user is presented with a consent screen and chooses not to grant the
   * requested permissions to the client application.
   *
   * @see {@link https://tools.ietf.org/html/rfc6749#section-4.1.2.1|OAuth 2.0 RFC 6749, Section 4.1.2.1}
   * for more information about the `access_denied` error.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError|OpenID Connect Core 1.0, Section 3.1.2.6}
   * for how this error is handled in OpenID Connect.
   */
  'DENIED',
  /**
   * Indicates a server error occurred during the authorization process.
   *
   * This error represents an unexpected condition that prevented the server
   * from fulfilling the authorization request.
   *
   * @remarks
   * Using this reason will result in an error response with `error=server_error`.
   *
   * The `server_error` error code is defined in the OAuth 2.0 specification and
   * indicates that the authorization server encountered an unexpected condition
   * that prevented it from fulfilling the request.
   *
   * This error should be used sparingly and only when no other more specific
   * error code is applicable. It's generally recommended to provide more
   * specific error reasons when possible to help diagnose and resolve issues.
   *
   * @see {@link https://tools.ietf.org/html/rfc6749#section-4.1.2.1|OAuth 2.0 RFC 6749, Section 4.1.2.1}
   * for more information about the `server_error` error.
   *
   * @since 1.3
   */
  'SERVER_ERROR',
  /**
   * Indicates that the end-user was not authenticated.
   *
   * This error occurs when the authorization server requires end-user authentication
   * to proceed with the request, but the end-user is not currently authenticated.
   *
   * @remarks
   * Using this reason will result in an error response with `error=login_required`.
   *
   * The `login_required` error code is defined in the OpenID Connect Core 1.0
   * specification and indicates that the Authorization Server requires End-User
   * authentication. This typically means that the client needs to prompt the
   * End-User for re-authentication.
   *
   * This error might occur in scenarios such as:
   * - When the client includes `prompt=none` in the authorization request, but
   *   there is no active session for the end-user.
   * - When the authentication session has expired and re-authentication is necessary.
   * - When the authorization server's policy requires fresh authentication for the
   *   requested scopes or resources.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError|OpenID Connect Core 1.0, Section 3.1.2.6}
   * for more information about the `login_required` error.
   *
   * @since 1.3
   */
  'NOT_AUTHENTICATED',
  /**
   * Indicates that the authorization server cannot obtain an account selection choice from the end-user.
   *
   * This error occurs when the authorization server requires the end-user to select
   * an account, but is unable to obtain this selection.
   *
   * @remarks
   * Using this reason will result in an error response with `error=account_selection_required`.
   *
   * The `account_selection_required` error indicates that the Authorization Server
   * requires the end-user to select an account for completing the request but it
   * cannot obtain an account selection choice from the end-user.
   *
   * This error might occur in scenarios such as:
   * - When the client requests authorization for a specific account, but the user
   *   has multiple accounts and hasn't selected one.
   * - When the authorization server's policy requires explicit account selection
   *   for certain types of requests or scopes.
   *
   * When receiving this error, the client should re-initiate the authorization
   * request, possibly with a prompt for account selection.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError|OpenID Connect Core 1.0, Section 3.1.2.6}
   * for more information about authentication errors in OpenID Connect.
   *
   * @since 2.11
   */
  'ACCOUNT_SELECTION_REQUIRED',
  /**
   * Indicates that the authorization server cannot obtain consent from the end-user.
   *
   * This error occurs when the authorization server requires the end-user's consent
   * to proceed with the authorization request, but is unable to obtain it.
   *
   * @remarks
   * Using this reason will result in an error response with `error=consent_required`.
   *
   * The `consent_required` error indicates that the Authorization Server
   * requires end-user consent for the requested scope or action, but it
   * cannot obtain this consent.
   *
   * This error might occur in scenarios such as:
   * - When the client requests access to resources or scopes that require
   *   explicit user consent, but the user hasn't provided it.
   * - When the authorization server's policy requires fresh consent for
   *   certain types of requests or scopes.
   * - When `prompt=none` is used in the request, but the server determines
   *   that user interaction is necessary to obtain consent.
   *
   * When receiving this error, the client should re-initiate the authorization
   * request, possibly with a prompt for user consent.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError|OpenID Connect Core 1.0, Section 3.1.2.6}
   * for more information about authentication errors in OpenID Connect.
   *
   * @since 2.11
   */
  'CONSENT_REQUIRED',
  /**
   * Indicates that the authorization server needs interaction with the end-user.
   *
   * This error occurs when the authorization server determines that it needs to
   * interact with the end-user to complete the authorization request, but such
   * interaction is not possible in the current context.
   *
   * @remarks
   * Using this reason will result in an error response with `error=interaction_required`.
   *
   * The `interaction_required` error indicates that the Authorization Server
   * requires End-User interaction of some form to proceed. This error may be
   * returned when the `prompt` parameter in the Authorization Request is set to `none`,
   * but the Authorization Server determines that the End-User must be prompted
   * for some action.
   *
   * This error might occur in scenarios such as:
   * - When additional information or consent is required from the user.
   * - When the user needs to re-authenticate due to a policy requirement.
   * - When the authorization request includes `prompt=none`, but the server
   *   determines that user interaction is necessary.
   *
   * When receiving this error, the client should re-initiate the authorization
   * request without setting `prompt=none`, allowing for user interaction.
   *
   * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError|OpenID Connect Core 1.0, Section 3.1.2.6}
   * for more information about authentication errors in OpenID Connect.
   *
   * @since 2.11
   */
  'INTERACTION_REQUIRED',
  /**
   * Indicates that the requested resource is invalid, missing, unknown, or malformed.
   *
   * This error occurs when the authorization server cannot process or validate
   * the resource indicator provided in the authorization request.
   *
   * @remarks
   * Using this reason will result in an error response with `error=invalid_target`.
   *
   * The `invalid_target` error is defined in the "Resource Indicators for OAuth 2.0"
   * specification. It indicates that the requested resource is invalid, missing,
   * unknown, or malformed.
   *
   * This error might occur in scenarios such as:
   * - When the client specifies a resource that doesn't exist or is not recognized
   *   by the authorization server.
   * - When the format of the resource indicator is incorrect or cannot be parsed.
   * - When the client is not authorized to access the specified resource.
   *
   * When receiving this error, the client should review the resource indicator
   * used in the request and ensure it's correct and the client is authorized to
   * access it.
   *
   * @see {@link https://tools.ietf.org/html/draft-ietf-oauth-resource-indicators|Resource Indicators for OAuth 2.0}
   * for more information about resource indicators and related errors.
   *
   * @since 2.62
   */
  'INVALID_TARGET',
]);

/**
 * Schema for the authorization fail request.
 *
 * This schema defines the structure of a request to indicate that an authorization attempt has failed.
 * It is used in conjunction with Authlete's `/auth/authorization/fail` API.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure. Must be one of the predefined enum values.
 * @property {string|null} [ticket] - The ticket value received from the authorization server. Can be null or omitted.
 * @property {string|null} [description] - Additional description of the failure. Can be null or omitted.
 *
 * @remarks
 * The `reason` property is crucial as it determines the specific error response that will be sent to the client.
 * Different reasons may result in different error codes (e.g., `login_required`, `consent_required`, `interaction_required`).
 *
 * The `ticket` is typically a value received from a previous API call and is used to associate this failure with a specific authorization request.
 *
 * The `description` can be used to provide more detailed information about the failure, which may be useful for debugging or logging purposes.
 *
 * @see {@link https://docs.authlete.com/#auth-authorization-fail|Authlete API Reference: /auth/authorization/fail}
 */
export const authorizationFailRequestSchema = z.object({
  reason: reasonSchema,
  ticket: nullableButOptionalStringSchema,
  description: nullableButOptionalStringSchema,
});

/**
 * Type definition for the AuthorizationFailRequest, inferred from the Zod schema.
 *
 * This type represents the structure of an authorization fail request object.
 * It is derived from the `authorizationFailRequestSchema` and ensures type safety
 * when working with authorization fail requests.
 *
 * @typedef {z.infer<typeof authorizationFailRequestSchema>} AuthorizationFailRequest
 */
export type AuthorizationFailRequest = z.infer<
  typeof authorizationFailRequestSchema
>;
