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
 * Zod schema for the client authentication method.
 * Accepts the following values (case-insensitive) and transforms to lowercase:
 * - 'none'
 * - 'client_secret_basic'
 * - 'client_secret_post'
 * - 'client_secret_jwt'
 * - 'private_key_jwt'
 * - 'tls_client_auth'
 * - 'self_signed_tls_client_auth'
 * - 'attest_jwt_client_auth'
 */
export const clientAuthMethodSchema = z
  .string()
  .transform((v) => v.toLowerCase())
  .pipe(
    z.union([
      z.literal('none'),
      z.literal('client_secret_basic'),
      z.literal('client_secret_post'),
      z.literal('client_secret_jwt'),
      z.literal('private_key_jwt'),
      z.literal('tls_client_auth'),
      z.literal('self_signed_tls_client_auth'),
      z.literal('attest_jwt_client_auth'),
    ])
  );

/**
 * Type representing the valid client authentication methods.
 * Inferred from the `clientAuthMethodSchema`.
 * @typedef {string} ClientAuthMethod
 */
export type ClientAuthMethod = z.infer<typeof clientAuthMethodSchema>;
