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
 * Schema for failure reasons of token requests.
 */
export const tokenFailReasonSchema = z.enum([
  /**
   * Unknown reason.
   *
   * @remarks
   * Using this reason will result in "error":"server_error".
   */
  'UNKNOWN',

  /**
   * The resource owner's credentials (username and password) contained in the token
   * request whose flow is "Resource Owner Password Credentials" are invalid.
   *
   * @remarks
   * Using this reason will result in "error":"invalid_request".
   */
  'INVALID_RESOURCE_OWNER_CREDENTIALS',

  /**
   * The requested resource is invalid, missing, unknown, or malformed.
   * See "Resource Indicators for OAuth 2.0" for details.
   *
   * @remarks
   * Using this reason will result in "error":"invalid_target".
   *
   * @since 2.62
   */
  'INVALID_TARGET',
]);

/**
 * Type definition for TokenFailReason, inferred from the Zod schema.
 */
export type TokenFailReason = z.infer<typeof tokenFailReasonSchema>;

/**
 * Request for Authlete's /auth/token/fail API.
 *
 * @see TokenResponse
 */
export const tokenFailRequestSchema = z.object({
  /**
   * The ticket issued by Authlete's /auth/token API to the service implementation.
   * It is the value of "ticket" contained in the response from Authlete's
   * /auth/token API (TokenResponse).
   *
   * @required
   */
  ticket: z.string(),

  /**
   * The reason of the failure of the token request.
   * See the description of TokenResponse as to which reason should be chosen.
   *
   * @required
   */
  reason: tokenFailReasonSchema,
});

/**
 * Type definition for the request to Authlete's /auth/token/fail API.
 *
 * @see TokenResponse
 */
export type TokenFailRequest = z.infer<typeof tokenFailRequestSchema>;
