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
 * Response from Authlete's /service/jwks/get API.
 *
 * @typedef {Object} ServiceJwksResponse
 *
 */

import { z } from 'zod';

/**
 * Zod schema for response from Authlete's /service/jwks/get API.
 *
 * @example
 * // Valid schema usage
 * const validRequest = `{
 *  "jwks": {
 *    "keys": [
 *      {
 *        "kid": "1234567890",
 *        "alg": "RS256",
 *        "kty": "RSA",
 *        "use": "sig",
 *        "n": "...",
 *        "e": "..."
 *      }
 *    ]
 *  }
 * }`;
 * serviceJwksResponseSchema.parse(validRequest);
 *
 * @since 3.43
 */
export const serviceJwksResponseSchema = z.string();

/**
 * Represents the structure of the response from Authlete's /service/jwks/get API.
 * This type is inferred from the `ServiceJwksResponseSchema`.
 *
 * @typedef {Object} ServiceJwksResponse
 *
 * @example
 * // Usage of ServiceJwksResponse type
 * const request: ServiceJwksResponse = `{
 *  "jwks": {
 *    "keys": [
 *      {
 *        "kid": "1234567890",
 *        "alg": "RS256",
 *        "kty": "RSA",
 *        "use": "sig",
 *        "n": "...",
 *        "e": "..."
 *      }
 *    ]
 *  }
 * }`;
 *
 * @since 3.43
 */
export type ServiceJwksResponse = z.infer<typeof serviceJwksResponseSchema>;
