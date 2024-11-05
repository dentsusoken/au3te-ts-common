/*
 * Copyright (C) 202024 Authlete, Inc.
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
 * Values for grant_type.
 *
 * @see https://www.rfc-editor.org/rfc/rfc6749.html OAuth 2.0
 * @see https://openid.net/specs/openid-connect-core-1_0.html OpenID Connect Core 1.0
 * @see https://www.rfc-editor.org/rfc/rfc8693.html OAuth 2.0 Token Exchange
 * @see https://www.rfc-editor.org/rfc/rfc7521.html Assertion Framework for OAuth 2.0
 */
export const grantTypes = [
  /**
   * Authorization Code grant type.
   * Used to request tokens using an authorization code.
   * @since Authlete 1.1
   */
  'authorization_code',

  /**
   * Implicit grant type.
   * Not a value for grant_type but used in Dynamic Client Registration.
   * @since Authlete 1.1
   */
  'implicit',

  /**
   * Resource Owner Password Credentials grant type.
   * Used to request tokens using username and password.
   * @since Authlete 1.1
   */
  'password',

  /**
   * Client Credentials grant type.
   * Used to request tokens using client credentials.
   * @since Authlete 1.1
   */
  'client_credentials',

  /**
   * Refresh Token grant type.
   * Used to request new tokens using a refresh token.
   * @since Authlete 1.1
   */
  'refresh_token',

  /**
   * CIBA (Client Initiated Backchannel Authentication) grant type.
   * Used in CIBA flows.
   * @since Authlete 2.1
   */
  'urn:openid:params:grant-type:ciba',

  /**
   * Device Code grant type.
   * Used in Device Flow.
   * @since Authlete 2.1
   */
  'urn:ietf:params:oauth:grant-type:device_code',

  /**
   * Token Exchange grant type.
   * Used for token exchange.
   * @since Authlete 2.3
   */
  'urn:ietf:params:oauth:grant-type:token-exchange',

  /**
   * JWT Bearer grant type.
   * Used for JWT authorization grants.
   * @since Authlete 2.3
   */
  'urn:ietf:params:oauth:grant-type:jwt-bearer',

  /**
   * Pre-Authorized Code grant type.
   * Used in Pre-Authorized Code Flow for Verifiable Credential Issuance.
   * @since Authlete 3.0
   */
  'urn:ietf:params:oauth:grant-type:pre-authorized_code',
] as const;

/**
 * Type representing a grant type.
 */
export type GrantType = (typeof grantTypes)[number];

/**
 * Type representing an optional grant type.
 */
type OptionalGrantType = GrantType | undefined;

/**
 * Schema for validating grant types.
 * Converts input to lowercase before validation.
 */
export const grantTypeSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(grantTypes)
) as z.ZodType<GrantType>;

/**
 * Schema for validating optional grant types.
 * Converts null to undefined and validates using grantTypeSchema.
 */
export const nullableButOptionalGrantTypeSchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.optional(grantTypeSchema)
) as z.ZodType<OptionalGrantType>;
