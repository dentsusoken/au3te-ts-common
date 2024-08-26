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
import { authzDetailsElementSchema } from './AuthzDetailsElement';

/**
 * Zod schema for AuthzDetails
 * @typedef {Object} AuthzDetailsSchema
 * @property {AuthzDetailsElement[]} [elements] - The elements of the authorization details.
 */
export const authzDetailsSchema = z.object({
  elements: z.array(authzDetailsElementSchema).optional(),
});

/**
 * Type representing authorization details.
 * @typedef {Object} AuthzDetails
 * @property {AuthzDetailsElement[]} [elements] - The elements of the authorization details.
 */
export type AuthzDetails = z.infer<typeof authzDetailsSchema>;
