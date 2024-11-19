/*
 * Copyright (C) 2021-2024 Authlete, Inc.
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
import { grantScopeSchema } from './GrantScope';
import { authzDetailsSchema } from './AuthzDetails';

/**
 * Schema for Grant.
 *
 * This schema holds the same information as the response from the Grant
 * Management Endpoint on the grant management action 'query' does.
 *
 * @example
 * ```json
 * {
 *    "scopes":[
 *       {
 *          "scope":"contacts read write",
 *          "resource":[
 *             "https://rs.example.com/api"
 *          ]
 *       },
 *       {
 *          "scope":"openid"
 *       }
 *    ],
 *    "claims":[
 *       "given_name",
 *       "nickname",
 *       "email",
 *       "email_verified"
 *    ],
 *    "authorization_details":[
 *       {
 *          "type":"account_information",
 *          "actions":[
 *             "list_accounts",
 *             "read_balances",
 *             "read_transactions"
 *          ],
 *          "locations":[
 *             "https://example.com/accounts"
 *          ]
 *       }
 *    ]
 * }
 * ```
 *
 * @see https://openid.net/specs/fapi-grant-management.html
 *      Grant Management for OAuth 2.0
 *
 * @since 3.1
 */
export const grantSchema = z.object({
  /**
   * The grant scopes.
   *
   * Each element represents a scope with optional resource indicators.
   */
  scopes: z.array(grantScopeSchema).nullish(),

  /**
   * The claims.
   *
   * List of claim names that the client application is allowed to request.
   */
  claims: z.array(z.string()).nullish(),

  /**
   * The authorization details.
   *
   * Structured data that represents authorization details in accordance with
   * RFC 9396 OAuth 2.0 Rich Authorization Requests.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9396.html
   *      RFC 9396 OAuth 2.0 Rich Authorization Requests
   */
  authorizationDetails: authzDetailsSchema.nullish(),
});

/**
 * Type definition for Grant.
 *
 * This type represents a grant in the OAuth 2.0 context, including scopes,
 * claims, and authorization details.
 *
 * @example
 * ```typescript
 * const grant: Grant = {
 *   scopes: [
 *     {
 *       scope: "contacts read write",
 *       resource: ["https://rs.example.com/api"]
 *     },
 *     {
 *       scope: "openid"
 *     }
 *   ],
 *   claims: ["given_name", "email"],
 *   authorizationDetails: {
 *     type: "account_information",
 *     actions: ["read_balances"],
 *     locations: ["https://example.com/accounts"]
 *   }
 * };
 * ```
 */
export type Grant = z.infer<typeof grantSchema>;
