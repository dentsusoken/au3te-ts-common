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
import { apiResponseSchema } from '../common/ApiResponse';

/**
 * The action that the service implementation should take.
 *
 * When the value is `INTERNAL_SERVER_ERROR`:
 * - The request from the service implementation was wrong or an error occurred in Authlete
 * - The service implementation should return 500 Internal Server Error
 * - Use responseContent as the response body
 *
 * When the value is `BAD_REQUEST`:
 * - Authlete's /auth/token/fail API successfully generated an error response
 * - The service implementation should return 400 Bad Request
 * - Use responseContent as the response body
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 */
const actionSchema = z.enum(['INTERNAL_SERVER_ERROR', 'BAD_REQUEST']);

/**
 * Response from Authlete's /auth/token/fail API.
 *
 * The service implementation should retrieve the value of `action` from the response
 * and take appropriate steps according to the value.
 *
 * When `action` is `INTERNAL_SERVER_ERROR`:
 * - Request was wrong or error occurred in Authlete
 * - Return 500 Internal Server Error
 * - Use responseContent as response body
 *
 * When `action` is `BAD_REQUEST`:
 * - Error response successfully generated
 * - Return 400 Bad Request
 * - Use responseContent as response body
 *
 * All responses should include these headers:
 * ```http
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 */
export const tokenFailResponseSchema = apiResponseSchema.extend({
  /**
   * (REQUIRED) The action that the implementation should take.
   */
  action: actionSchema,

  /**
   * (OPTIONAL) Response content to return to the client.
   * This JSON string should be used as the response body to the client.
   */
  responseContent: z.string().nullish(),
});

/**
 * Type representing a token fail response.
 * Inferred from the tokenFailResponseSchema.
 */
export type TokenFailResponse = z.input<typeof tokenFailResponseSchema>;
