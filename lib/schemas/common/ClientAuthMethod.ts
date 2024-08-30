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
const clientAuthMethods = [
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
 * Type representing valid client authentication methods.
 * @typedef {typeof clientAuthMethods[number]} ClientAuthMethod
 */
export type ClientAuthMethod = (typeof clientAuthMethods)[number];

/**
 * Zod schema for validating and transforming client authentication methods.
 * This schema accepts a string input, transforms it to lowercase,
 * and validates it against the list of valid client authentication methods.
 *
 * @type {z.ZodType<ClientAuthMethod>}
 */
export const clientAuthMethodSchema = z
  .string()
  .transform((v) => v.toLowerCase() as ClientAuthMethod)
  .refine((v): v is ClientAuthMethod => clientAuthMethods.includes(v), {
    message: 'Invalid client authentication method',
  }) as z.ZodType<ClientAuthMethod>;
