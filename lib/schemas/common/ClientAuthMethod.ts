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
 * @type {z.ZodSchema<ClientAuthMethod>}
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

export const clientAuthMethodSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(clientAuthMethods)
);

export const nullableButOptionalClientAuthMethodSchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.optional(clientAuthMethodSchema)
);
