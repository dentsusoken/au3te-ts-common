/*
 * Copyright (C) 2014-2018 Authlete, Inc.
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
 * Zod schema for JWE Encryption Algorithm (enc).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-5.1 RFC 7518, 5.1. "enc" (Encryption Algorithm) Header Parameter Values for JWE}
 *
 * @example
 * // Valid schema usage
 * jweEncSchema.parse('A128CBC-HS256');
 * jweEncSchema.parse('A128GCM');
 *
 */
export const jweEncSchema = z.enum([
  'A128CBC-HS256',
  'A192CBC-HS384',
  'A256CBC-HS512',
  'A128GCM',
  'A192GCM',
  'A256GCM',
]);

/**
 * JWE Encryption Algorithm (enc).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-5.1 RFC 7518, 5.1. "enc" (Encryption Algorithm) Header Parameter Values for JWE}
 *
 * @typedef {string} JWEEnc
 *
 * @example
 * // Usage of JWEEnc type
 * const enc: JWEEnc = 'A128CBC-HS256';
 *
 */
export type JWEEnc = z.infer<typeof jweEncSchema>;
