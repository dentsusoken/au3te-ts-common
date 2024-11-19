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
 * Schema for scope representation in a grant.
 *
 * This schema represents the same information as each entry in the "scopes"
 * array in the response from the Grant Management Endpoint on the grant
 * management action 'query' does.
 *
 * @see https://openid.net/specs/fapi-grant-management.html
 *      Grant Management for OAuth 2.0
 *
 * @since 3.1
 */
export const grantScopeSchema = z.object({
  /**
   * Space-delimited scopes.
   *
   * This field represents a set of permissions as a space-delimited string.
   * For example: "read write profile"
   */
  scope: z.string().nullish(),

  /**
   * List of resource indicators.
   *
   * Each element in this array represents a resource indicator that identifies
   * a protected resource. Resource indicators are typically URIs.
   *
   * @see https://www.rfc-editor.org/rfc/rfc8707.html
   *      Resource Indicators for OAuth 2.0
   */
  resource: z.array(z.string()).nullish(),
});

/**
 * Type definition for scope representation in a grant.
 *
 * This type represents a scope in the context of grant management, including
 * both the scope string and associated resource indicators.
 *
 * @example
 * ```typescript
 * const grantScope: GrantScope = {
 *   scope: "read write profile",
 *   resource: [
 *     "https://api.example.com/v1",
 *     "https://api.example.com/v2"
 *   ]
 * };
 * ```
 */
export type GrantScope = z.infer<typeof grantScopeSchema>;
