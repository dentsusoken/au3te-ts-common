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
 * The request parameters of Authlete's /service/configuration API.
 *
 * @typedef {Object} ServiceConfigurationRequest
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * @property {string|undefined|null} patch - The /service/configuration API returns JSON that conforms to
 * [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html).
 * Implementations of the discovery
 * endpoint may modify the JSON before returning it as a discovery response.
 *
 * Although implementations of the discovery endpoint have perfect control
 * over the JSON, in some cases implementations may want to make the Authlete
 * API execute adjustments on Authlete side so that the implementations can
 * avoid modifying the received JSON after the API call.
 *
 * The `patch` request parameter has been added for the purpose.
 *
 * Implementations of the discovery endpoint may specify a **JSON Patch**
 * by the `patch` request parameter. If the request parameter is given,
 * the Authlete API applies the patch to the JSON before returning it to the
 * API caller.
 *
 * The value of the `patch` request parameter must conform to the format
 * that is defined in [RFC 6902
 * JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902).
 *
 * @example Example 1: Replace
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *    | jq .subject_types_supported
 *  [
 *    "public",
 *    "pairwise"
 *  ]
 * ```
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *      -d patch='[{"op":"replace","path":"/subject_types_supported","value":["public"]}]'
 *      | jq .subject_types_supported
 * [
 *   "public"
 * ]
 * ```
 *
 * @example Example 2: Add
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   | jq .custom_metadata
 * null
 * ```
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   -d patch='[{"op":"add","path":"/custom_metadata","value":"custom_value"}]'
 *   | jq .custom_metadata
 * "custom_value"
 * ```
 *
 * @example Example 3: Add Array Elements
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   | jq .acr_values_supported
 * [
 *   "acr1"
 * ]
 * ```
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   -d patch='[{"op":"add","path":"/acr_values_supported/0","value":"acr0"}]'
 *   | jq .acr_values_supported
 * [
 *   "acr0",
 *   "acr1"
 * ]
 * ```
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   -d patch='[{"op":"add","path":"/acr_values_supported/0","value":"acr0"},
 *              {"op":"add","path":"/acr_values_supported/-","value":"acr2"}]'
 *   | jq .acr_values_supported
 * [
 *   "acr0",
 *   "acr1",
 *   "acr2"
 * ]
 * ```
 *
 * @example Example 4: Add Object Elements
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   | jq .mtls_endpoint_aliases
 * {
 *   "authorization_endpoint": "https://as.example.com/mtls/authorize"
 * }
 * ```
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   -d patch='[{"op":"add","path":"/mtls_endpoint_aliases/token_endpoint","value":"https://as.example.com/mtls/token"}]'
 *   | jq .mtls_endpoint_aliases
 * {
 *   "authorization_endpoint": "https://as.example.com/mtls/authorize",
 *   "token_endpoint": "https://as.example.com/mtls/token"
 * }
 * ```
 *
 * @example Example 5: Remove
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   | jq .acr_values_supported
 * [
 *   "acr1"
 * ]
 * ```
 *
 * ```sh
 * $ curl -s -u $SERVICE_API_KEY:$SERVICE_API_SECRET $BASE_URL/api/service/configuration
 *   -d patch='[{"op":"remove","path":"/acr_values_supported"}]'
 *   | jq .acr_values_supported
 * null
 * ```
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
 * Zod schema for the request parameters of Authlete's /service/configuration API.
 *
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * @property {string|undefined|null} patch - The /service/configuration API returns JSON that conforms to
 * [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html).
 * Implementations of the discovery
 * endpoint may modify the JSON before returning it as a discovery response.
 *
 * Although implementations of the discovery endpoint have perfect control
 * over the JSON, in some cases implementations may want to make the Authlete
 * API execute adjustments on Authlete side so that the implementations can
 * avoid modifying the received JSON after the API call.
 *
 * The `patch` request parameter has been added for the purpose.
 *
 * Implementations of the discovery endpoint may specify a **JSON Patch**
 * by the `patch` request parameter. If the request parameter is given,
 * the Authlete API applies the patch to the JSON before returning it to the
 * API caller.
 *
 * The value of the `patch` request parameter must conform to the format
 * that is defined in [RFC 6902
 * JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902).
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *  pretty: true,
 *  patch: '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]'
 * };
 * serviceConfigurationRequestSchema.parse(validRequest);
 *
 * @since 3.43
 */
export const serviceConfigurationRequestSchema = z.object({
  pretty: z.boolean().nullish(),
  patch: z.string().nullish(),
});

/**
 * Represents the structure of the request parameters of Authlete's /service/configuration API.
 * This type is inferred from the `serviceConfigurationRequestSchema`.
 *
 * @typedef {Object} ServiceConfigurationRequest
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * @property {string|undefined|null} patch - The /service/configuration API returns JSON that conforms to
 * [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html).
 * Implementations of the discovery
 * endpoint may modify the JSON before returning it as a discovery response.
 *
 * Although implementations of the discovery endpoint have perfect control
 * over the JSON, in some cases implementations may want to make the Authlete
 * API execute adjustments on Authlete side so that the implementations can
 * avoid modifying the received JSON after the API call.
 *
 * The `patch` request parameter has been added for the purpose.
 *
 * Implementations of the discovery endpoint may specify a **JSON Patch**
 * by the `patch` request parameter. If the request parameter is given,
 * the Authlete API applies the patch to the JSON before returning it to the
 * API caller.
 *
 * The value of the `patch` request parameter must conform to the format
 * that is defined in [RFC 6902
 * JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902).
 *
 * @example
 * // Usage of ServiceConfigurationRequest type
 * const request: ServiceConfigurationRequest = {
 *  pretty: true,
 *  patch: '[{"op":"replace","path":"/subject_types_supported","value":["public"]}]'
 * };
 *
 * @since 3.43
 */
export type ServiceConfigurationRequest = z.infer<
  typeof serviceConfigurationRequestSchema
>;
