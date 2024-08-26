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
 * Zod schema for dynamic scope.
 * @typedef {Object} DynamicScopeSchema
 * @property {string} [name] - The name of the dynamic scope.
 * @property {string} [value] - The value of the dynamic scope.
 */
export const dynamicScopeSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Type representing a dynamic scope.
 * @typedef {Object} DynamicScope
 * @property {string} [name] - The name of the dynamic scope.
 * @property {string} [value] - The value of the dynamic scope.
 */
export type DynamicScope = z.infer<typeof dynamicScopeSchema>;
