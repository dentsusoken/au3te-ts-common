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
 * Zod schema for API response.
 * @typedef {Object} ApiResponseSchema
 * @property {string} [resultCode] - The result code of the API response.
 * @property {string} [resultMessage] - The result message of the API response.
 */
export const apiResponseSchema = z.object({
  resultCode: z.string().nullish(),
  resultMessage: z.string().nullish(),
});
