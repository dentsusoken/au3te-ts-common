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
import { propertySchema } from '../common/Property';
import { pushedAuthReqRequestSchema } from '../par/PushedAuthReqRequest';

/**
 * Schema for the request to Authlete's /auth/token API.
 *
 * The authorization server can implement a token endpoint which is defined
 * in RFC 6749 by using the Authlete API.
 */
export const tokenRequestSchema = pushedAuthReqRequestSchema.extend({
  /**
   * (OPTIONAL) Extra properties to associate with an access token.
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * (OPTIONAL) Additional claims in JSON object format that are added to the payload
   * part of the JWT access token.
   * @since Authlete 2.3
   */
  jwtAtClaims: z.string().nullish(),

  /**
   * (OPTIONAL) The representation of an access token that may be issued as a result
   * of the Authlete API call.
   */
  accessToken: z.string().nullish(),

  /**
   * (OPTIONAL) The duration of the access token in seconds.
   * @since Authlete 2.2.41
   */
  accessTokenDuration: z.number().nullish(),

  /**
   * (OPTIONAL) The duration of the refresh token in seconds.
   * @since Authlete 2.3.20
   */
  refreshTokenDuration: z.number().nullish(),
});

/**
 * Type definition for the request to Authlete's /auth/token API.
 */
export type TokenRequest = z.infer<typeof tokenRequestSchema>;
