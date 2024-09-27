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
import { ApiClient } from '../api/ApiClient';

/**
 * Represents a function that processes an API request and returns a promise of the response.
 * @template REQ - The type of the request object, must extend object.
 * @template RES - The type of the response.
 * @param {REQ} apiRequest - The API request object.
 * @returns {Promise<RES>} A promise that resolves to the API response.
 */
export type ProcessApiRequest<REQ extends object, RES> = (
  apiRequest: REQ
) => Promise<RES>;

/**
 * Creates a function to process an API request.
 * @template REQ - The type of the request object, must extend object.
 * @template RES - The type of the response.
 * @param {string} path - The API endpoint path.
 * @param {z.ZodType<RES>} schema - The Zod schema for validating the response.
 * @param {ApiClient} apiClient - The API client instance.
 * @returns {ProcessApiRequest<REQ, RES>} A function that processes the API request.
 */
export const createProcessApiRequest =
  <REQ extends object, RES>(
    path: string,
    schema: z.ZodType<RES>,
    apiClient: ApiClient
  ): ProcessApiRequest<REQ, RES> =>
  (apiRequest) =>
    apiClient.callPostApi(path, schema, apiRequest);
