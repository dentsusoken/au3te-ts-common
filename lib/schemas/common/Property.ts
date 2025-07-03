/**
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
 * Property that consists of a string key and a string value.
 *
 * This class is used mainly to represent an extra property
 * that is associated with an access token. Some Authlete APIs
 * (such as `/api/auth/token` API) accept an array of
 * properties via `properties` request parameter and
 * associate the properties with an access token.
 *
 * @author Takahiko Kawasaki
 * @since 1.32
 */

import { z } from 'zod';

/**
 * Zod schema for a property object.
 *
 * This schema defines a property with a string key, a string value, and a hidden flag.
 *
 * @typedef {Object} Property
 * @property {string|undefined} [key] - The key of the property.
 * @property {string|undefined} [value] - The value associated with the key.
 * @property {boolean|undefined} [hidden] - A flag indicating if the property is hidden.
 */
export const propertySchema = z.object({
  key: z.string().nullish(),
  value: z.string().nullish(),
  hidden: z.boolean().nullish(),
});

/**
 * Represents a property object with optional fields.
 */
export type Property = z.infer<typeof propertySchema>;
