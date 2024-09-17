/*
 * Copyright (C) 2014-2014 Authlete, Inc.
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
 * A pair of a string key and a string value.
 *
 * @since 1.39
 *
 * @author Takahiko Kawasaki
 */

import { z } from 'zod';
import { nullableButOptionalStringSchema } from './stringSchema';

/**
 * Schema for a key-value pair.
 *
 * @type {z.ZodType<Pair>}
 */
export const pairSchema = z.object({
  key: nullableButOptionalStringSchema,
  value: nullableButOptionalStringSchema,
});

/**
 * Represents a key-value pair.
 *
 * @typedef {Object} Pair
 * @property {string|undefined} [key] - The key of the pair.
 * @property {string|undefined} [value] - The value associated with the key.
 */
export type Pair = z.infer<typeof pairSchema>;

/**
 * Represents an optional array of Pair objects.
 *
 * @typedef {Pair[]|undefined} OptionalPairArray
 */
type OptionalPairArray = Pair[] | undefined;

/**
 * Schema for a nullable but optional array of key-value pairs.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of pairSchema. This allows the schema to
 * accept null, undefined, or a valid array of Pair objects.
 *
 * @type {z.ZodType<OptionalPairArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalPairArraySchema.parse(null); // returns undefined
 * nullableButOptionalPairArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalPairArraySchema.parse([
 *   { key: 'name', value: 'John' },
 *   { key: 'age', value: '30' }
 * ]); // returns the array of Pair objects
 *
 * @example
 * // Invalid input
 * nullableButOptionalPairArraySchema.parse('not an array'); // throws ZodError
 */
export const nullableButOptionalPairArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(z.array(pairSchema))
) as z.ZodType<OptionalPairArray>;
