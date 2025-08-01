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
 * Response from Authlete's /service/configuration API.
 *
 * @typedef {Object} ServiceConfigurationResponse
 *
 *
 * @since 3.43
 * @see [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
 *
 */

import { z } from 'zod';

/**
 * Zod schema for response from Authlete's /service/configuration API.
 *
 * @example
 * // Valid schema usage
 * const validResponse = `{
 *  "issuer": "https://example.com",
 *  "authorization_endpoint": "https://example.com/api/authorization",
 *  "token_endpoint": "https://example.com/api/token",
 *  "userinfo_endpoint": "https://example.com/api/userinfo",
 *  "jwks_uri": "https://example.com/api/jwks"
 * }`;
 * serviceConfigurationResponseSchema.parse(validResponse);
 *
 * @since 3.43
 */
export const serviceConfigurationResponseSchema = z.string();

/**
 * Represents the structure of the response from Authlete's /service/configuration API.
 * This type is inferred from the `serviceConfigurationResponseSchema`.
 *
 * @typedef {Object} ServiceConfigurationResponse
 *
 * @example
 * // Usage of ServiceConfigurationResponse type
 * const response: ServiceConfigurationResponse = `{
 *  "issuer": "https://example.com",
 *  "authorization_endpoint": "https://example.com/api/authorization",
 *  "token_endpoint": "https://example.com/api/token",
 *  "userinfo_endpoint": "https://example.com/api/userinfo",
 *  "jwks_uri": "https://example.com/api/jwks"
 * }`;
 *
 * @since 3.43
 */
export type ServiceConfigurationResponse = z.input<
  typeof serviceConfigurationResponseSchema
>;
