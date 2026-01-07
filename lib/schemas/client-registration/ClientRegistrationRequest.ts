/*
 * Copyright (C) 2018 Authlete, Inc.
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
 * Zod schema for the request to Authlete's `/api/client/registration` API.
 *
 * @property {string|null|undefined} [json] - The client metadata in JSON format.
 * @property {string|null|undefined} [token] - The registration access token.
 * @property {string|null|undefined} [clientId] - The client identifier.
 *
 * @see {@link https://tools.ietf.org/html/rfc7591 RFC 7591, OAuth 2.0 Dynamic Client Registration Protocol}
 * @example
 * // Valid schema usage
 * const validRequest = {
 *   json: '{"client_name": "My Client", "redirect_uris": ["https://example.com/callback"]}',
 *   token: "reg-access-token-123"
 * };
 * clientRegistrationRequestSchema.parse(validRequest);
 */
export const clientRegistrationRequestSchema = z.object({
  json: z.string().nullish(),
  token: z.string().nullish(),
  clientId: z.string().nullish(),
});

/**
 * Request to Authlete's `/api/client/registration` API.
 *
 * @typedef {Object} ClientRegistrationRequest
 * @property {string|null|undefined} [json] - The client metadata in JSON format.
 * @property {string|null|undefined} [token] - The registration access token.
 * @property {string|null|undefined} [clientId] - The client identifier.
 *
 * @example
 * // Usage of ClientRegistrationRequest type
 * const request: ClientRegistrationRequest = {
 *   json: '{"client_name": "My Client"}',
 *   token: "reg-access-token-123"
 * };
 */
export type ClientRegistrationRequest = z.infer<
  typeof clientRegistrationRequestSchema
>;
