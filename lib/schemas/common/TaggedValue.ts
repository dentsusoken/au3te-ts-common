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
 * A string value with a language tag
 *
 * @typedef {string} LanguageTag
 * @see {@link http://en.wikipedia.org/wiki/IETF_language_tag|Language tag}
 *
 * @author Takahiko Kawasaki
 */

import { z } from 'zod';
import { nullableButOptionalStringSchema } from './stringSchema';

/**
 * Schema for a tagged value.
 *
 * @type {z.ZodType<TaggedValue>}
 */
export const taggedValueSchema = z.object({
  tag: nullableButOptionalStringSchema,
  value: nullableButOptionalStringSchema,
});

/**
 * Represents a value with an associated language tag.
 *
 * @typedef {Object} TaggedValue
 * @property {string|undefined} [tag] - The language tag, e.g., 'en' for English.
 * @property {string|undefined} [value] - The value associated with the language tag.
 */

export type TaggedValue = z.infer<typeof taggedValueSchema>;

/**
 * Represents an optional array of TaggedValue objects.
 *
 * @typedef {TaggedValue[]|undefined} OptionalTaggedValueArray
 */
type OptionalTaggedValueArray = TaggedValue[] | undefined;

/**
 * Schema for a nullable but optional array of tagged values.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of taggedValueSchema. This allows the schema to
 * accept null, undefined, or a valid array of TaggedValue objects.
 *
 * @type {z.ZodType<OptionalTaggedValueArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalTaggedValueArraySchema.parse(null); // returns undefined
 * nullableButOptionalTaggedValueArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalTaggedValueArraySchema.parse([
 *   { tag: 'en', value: 'Hello' },
 *   { tag: 'fr', value: 'Bonjour' }
 * ]); // returns the array of TaggedValue objects
 *
 * @example
 * // Invalid input
 * nullableButOptionalTaggedValueArraySchema.parse('not an array'); // throws ZodError
 */
export const nullableButOptionalTaggedValueArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(z.array(taggedValueSchema))
) as z.ZodType<OptionalTaggedValueArray>;
