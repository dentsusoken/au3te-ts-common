/*
 * Copyright (C) 2019-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */

import { z } from 'zod';

/**
 * Array of valid client authentication methods.
 * @readonly
 * @type {readonly string[]}
 */
export const clientAuthMethods = [
  'none',
  'client_secret_basic',
  'client_secret_post',
  'client_secret_jwt',
  'private_key_jwt',
  'tls_client_auth',
  'self_signed_tls_client_auth',
  'attest_jwt_client_auth',
] as const;

/**
 * Zod schema for client authentication methods.
 *
 * @description This schema preprocesses the input value by converting it to lowercase if it's a string,
 * and then validates it against the predefined client authentication methods using `z.enum`.
 * The resulting schema accepts values of type `ClientAuthMethod`, which is a union of the predefined methods.
 *
 * @example
 * const validMethod = clientAuthMethodSchema.parse('client_secret_basic');
 * // validMethod: 'client_secret_basic'
 *
 * const validMethodCaseInsensitive = clientAuthMethodSchema.parse('CLIENT_SECRET_BASIC');
 * // validMethodCaseInsensitive: 'client_secret_basic'
 *
 * const invalidMethod = clientAuthMethodSchema.parse('invalid_method');
 * // throws a ZodError
 */
export type ClientAuthMethod = (typeof clientAuthMethods)[number];

/**
 * Zod schema for client authentication methods.
 * This schema validates and normalizes client authentication method strings.
 *
 * Behavior:
 * - If the input is a non-empty string, it will be converted to lowercase.
 * - The lowercased string must match one of the predefined client authentication methods.
 * - If the input is not a string or is an empty string, it will be passed through as-is
 *   (which will likely result in a validation error).
 * - Any input that doesn't match a predefined client authentication method will result in a validation error.
 *
 * @example
 * clientAuthMethodSchema.parse("NONE") // => "none"
 * clientAuthMethodSchema.parse("CLIENT_SECRET_BASIC") // => "client_secret_basic"
 * clientAuthMethodSchema.parse("none") // => "none"
 * clientAuthMethodSchema.parse("INVALID_METHOD") // => throws ZodError
 * clientAuthMethodSchema.parse("") // => throws ZodError
 * clientAuthMethodSchema.parse(null) // => throws ZodError
 */
export const clientAuthMethodSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(clientAuthMethods)
) as z.ZodType<ClientAuthMethod>;
