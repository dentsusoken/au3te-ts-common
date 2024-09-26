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
import { nullableButOptionalStringSchema } from './stringSchema';
import { nullableButOptionalBooleanSchema } from './booleanSchema';

/**
 * Schema definition for a property object using Zod.
 *
 * @typedef {Object} PropertySchema
 * @property {import('./stringSchema').NullableButOptionalString} key - The key of the property. Can be a string, null, or undefined.
 * @property {import('./stringSchema').NullableButOptionalString} value - The value of the property. Can be a string, null, or undefined.
 * @property {import('./booleanSchema').NullableButOptionalBoolean} hidden - Indicates if the property is hidden. Can be a boolean, null, or undefined.
 *
 * @type {import('zod').ZodObject<PropertySchema>}
 */
export const propertySchema = z.object({
  key: nullableButOptionalStringSchema,
  value: nullableButOptionalStringSchema,
  hidden: nullableButOptionalBooleanSchema,
});

export type Property = z.infer<typeof propertySchema>;

type OptionalPropertyArray = Property[] | undefined;

export const nullableButOptionalPropertyArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.array(propertySchema).optional()
) as z.ZodType<OptionalPropertyArray>;
