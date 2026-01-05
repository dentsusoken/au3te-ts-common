/*
 * Copyright (C) 2014-2023 Authlete, Inc.
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
 * Zod schema for JWS Algorithm (alg).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-3.1 RFC 7518, 3.1. "alg" (Algorithm) Header Parameter Values for JWS}
 *
 * @example
 * // Valid schema usage
 * jwsAlgSchema.parse('HS256');
 * jwsAlgSchema.parse('RS256');
 *
 */
export const jwsAlgSchema = z.enum([
  'none',
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'PS256',
  'PS384',
  'PS512',
  'ES256K',
  'EdDSA',
]);

/**
 * JWS Algorithm (alg).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-3.1 RFC 7518, 3.1. "alg" (Algorithm) Header Parameter Values for JWS}
 *
 * @typedef {string} JWSAlg
 *
 * @example
 * // Usage of JWSAlg type
 * const alg: JWSAlg = 'HS256';
 *
 */
export type JWSAlg = z.infer<typeof jwsAlgSchema>;
