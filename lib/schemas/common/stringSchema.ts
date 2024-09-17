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
 * Represents a string that can be either a string value or undefined.
 * This type is used in scenarios where a value is optional but cannot be null.
 */
type OptionalString = string | undefined;

/**
 * Represents an optional array of strings.
 *
 * @typedef {string[]|undefined} OptionalStringArray
 */
type OptionalStringArray = string[] | undefined;

/**
 * Schema for a string array object.
 *
 * This schema defines an object with a single property 'array'
 * which is an array of strings.
 */
export const stringArraySchema = z.object({
  array: z.array(z.string()),
});

/**
 * Represents a string array object.
 *
 * @typedef {Object} StringArray
 * @property {string[]} array - An array of strings.
 */
export type StringArray = z.infer<typeof stringArraySchema>;

/**
 * Represents an optional array of StringArray objects.
 *
 * This type can be either an array of StringArray objects or undefined.
 *
 * @typedef {StringArray[]|undefined} OptionalStringArrayArray
 */
type OptionalStringArrayArray = StringArray[] | undefined;

/**
 * Zod schema for a nullable but optional string.
 * This schema accepts null, undefined, or a string value.
 * - If the input is null, it will be transformed to undefined.
 * - If the input is a string or undefined, it will be passed through as-is.
 *
 * @example
 * nullableButOptionalStringSchema.parse("hello") // => "hello"
 * nullableButOptionalStringSchema.parse(null) // => undefined
 * nullableButOptionalStringSchema.parse(undefined) // => undefined
 */
export const nullableButOptionalStringSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.string().optional()
) as z.ZodType<OptionalString>;

/**
 * Schema for a nullable but optional array of strings.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of strings schema. This allows the schema to
 * accept null, undefined, or a valid array of strings.
 *
 * @type {z.ZodType<OptionalStringArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalStringArraySchema.parse(null); // returns undefined
 * nullableButOptionalStringArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalStringArraySchema.parse(['a', 'b', 'c']); // returns ['a', 'b', 'c']
 *
 * @example
 * // Invalid inputs
 * nullableButOptionalStringArraySchema.parse('not an array'); // throws ZodError
 * nullableButOptionalStringArraySchema.parse([1, 2, 3]); // throws ZodError
 */
export const nullableButOptionalStringArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.array(z.string()).optional()
) as z.ZodType<OptionalStringArray>;

/**
 * Schema for a nullable but optional array of StringArray objects.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of stringArraySchema. This allows the schema to
 * accept null, undefined, or a valid array of StringArray objects.
 *
 * @type {z.ZodType<OptionalStringArrayArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalStringArrayArraySchema.parse(null); // returns undefined
 * nullableButOptionalStringArrayArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalStringArrayArraySchema.parse([
 *   { array: ['a', 'b'] },
 *   { array: ['c', 'd'] }
 * ]); // returns the array of StringArray objects
 *
 * @example
 * // Invalid input
 * nullableButOptionalStringArrayArraySchema.parse('not an array'); // throws ZodError
 *
 * @see {@link stringArraySchema} for the underlying StringArray schema
 */
export const nullableButOptionalStringArrayArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.array(stringArraySchema).optional()
) as z.ZodType<OptionalStringArrayArray>;

/**
 * Zod schema for a nullable but optional URL string.
 * This schema accepts null, undefined, or a valid URL string.
 * - If the input is null, it will be transformed to undefined.
 * - If the input is a valid URL string, it will be passed through as-is.
 * - If the input is undefined, it will be passed through as-is.
 * - If the input is an invalid URL string, it will throw an error.
 *
 * @example
 * nullableButOptionalUrlStringSchema.parse("https://example.com") // => "https://example.com"
 * nullableButOptionalUrlStringSchema.parse(null) // => undefined
 * nullableButOptionalUrlStringSchema.parse(undefined) // => undefined
 * nullableButOptionalUrlStringSchema.parse("not a url") // => throws ZodError
 */
export const nullableButOptionalUrlStringSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.string().url().optional()
) as z.ZodType<OptionalString>;
