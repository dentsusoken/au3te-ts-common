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
 * Note: The `patch` request parameter is supported since Authlete 2.2.36.
 *
 * @since 3.43
 *
 * @see [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
 * @see [RFC 6902 JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902)
 *
 */

import { z } from 'zod';

/**
 * Zod schema for response from Authlete's /service/configuration API.
 *
 * @example
 * // Valid schema usage
 * const validRequest = `{
 *  pretty: true,
 *  patch: '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]'
 * }`;
 * serviceConfigurationResponseSchema.parse(validRequest);
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
 * const request: ServiceConfigurationResponse = {
 *  pretty: true,
 *  patch: '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]'
 * };
 *
 * @since 3.43
 */
export type ServiceConfigurationResponse = z.infer<
  typeof serviceConfigurationResponseSchema
>;
