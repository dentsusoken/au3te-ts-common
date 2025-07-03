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
 * Information about a ticket that has been issued from the
 * {@code /auth/authorization} API.
 *
 * @since 3.88
 * @since Authlete 3.0
 */

import { z } from 'zod';

/**
 * Zod schema for authorization ticket information.
 *
 * This schema defines the structure of an authorization ticket
 * issued from the /auth/authorization API.
 *
 * @typedef {Object} AuthorizationTicketInfo
 * @property {string} [context] - The context of the authorization ticket.
 */
export const authorizationTicketInfoSchema = z.object({
  context: z.string().nullish(),
});

/**
 * Represents the structure of an authorization ticket information.
 *
 * This type is inferred from the `authorizationTicketInfoSchema` and includes
 * the context of the authorization ticket, which is an optional string.
 *
 * @typedef {Object} AuthorizationTicketInfo
 * @property {string|undefined} [context] - The context of the authorization ticket.
 */
export type AuthorizationTicketInfo = z.infer<
  typeof authorizationTicketInfoSchema
>;
