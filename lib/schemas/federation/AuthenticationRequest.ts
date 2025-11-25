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

import { z } from 'zod';

/**
 * Schema for authentication request parameters used in federation flows.
 */
export const authenticationRequestSchema = z.object({
  /**
   * The response type for the authorization request.
   */
  response_type: z.string(),

  /**
   * The scope of the authorization request.
   */
  scope: z.string(),

  /**
   * The client identifier.
   */
  client_id: z.string(),

  /**
   * The redirect URI where the authorization response will be sent.
   */
  redirect_uri: z.string(),

  /**
   * An opaque value used to maintain state between the request and callback.
   */
  state: z.string(),

  /**
   * The code challenge for PKCE (Proof Key for Code Exchange).
   */
  code_challenge: z.string().nullish(),

  /**
   * The code challenge method for PKCE.
   */
  code_challenge_method: z.string().nullish(),
});

/**
 * Type definition for AuthenticationRequest.
 */
export type AuthenticationRequest = z.infer<typeof authenticationRequestSchema>;