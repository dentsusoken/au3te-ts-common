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
 * Zod schema for scope.
 * @typedef {Object} ScopeSchema
 * @property {string} [name] - The name of the scope.
 * @property {string} [description] - The description of the scope.
 */
export const scopeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

/**
 * Type representing a scope.
 * @typedef {Object} Scope
 * @property {string} [name] - The name of the scope.
 * @property {string} [description] - The description of the scope.
 */
export type Scope = z.infer<typeof scopeSchema>;
