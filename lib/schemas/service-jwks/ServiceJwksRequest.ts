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
 * The request parameters of Authlete's /service/jwks/get API.
 *
 * @typedef {Object} ServiceJwksRequest
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 */

import { z } from 'zod';

/**
 * Zod schema for the request parameters of Authlete's /service/jwks/get API.
 *
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * @example
 * // Valid schema usage
 * const validRequest = {
 *  pretty: true,
 * };
 * serviceJwksRequestSchema.parse(validRequest);
 *
 */
export const serviceJwksRequestSchema = z.object({
  pretty: z.boolean().nullish(),
});

/**
 * Represents the structure of the request parameters of Authlete's /service/jwks/get API.
 * This type is inferred from the `serviceJwksRequestSchema`.
 *
 * @typedef {Object} ServiceJwksRequest
 * @property {boolean|undefined|null} pretty - If `pretty=true` is given to the Authlete API, the returned JSON is
 * formatted in a human-friendly way.
 *
 * @example
 * // Usage of ServiceJwksRequest type
 * const request: ServiceJwksRequest = {
 *  pretty: true
 * };
 *
 */
export type ServiceJwksRequest = z.infer<typeof serviceJwksRequestSchema>;
