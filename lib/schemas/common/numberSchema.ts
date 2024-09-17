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

type OptionalNumber = number | undefined;

/**
 * Represents a number that can be undefined.
 *
 * @typedef {number|undefined} OptionalNumber
 */

/**
 * Schema for a nullable but optional number.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional number schema. This allows the schema to
 * accept null, undefined, or a valid number.
 *
 * @type {z.ZodType<OptionalNumber>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalNumberSchema.parse(null); // returns undefined
 * nullableButOptionalNumberSchema.parse(undefined); // returns undefined
 * nullableButOptionalNumberSchema.parse(42); // returns 42
 * nullableButOptionalNumberSchema.parse(3.14); // returns 3.14
 *
 * @example
 * // Invalid inputs
 * nullableButOptionalNumberSchema.parse("42"); // throws ZodError
 * nullableButOptionalNumberSchema.parse({}); // throws ZodError
 * nullableButOptionalNumberSchema.parse([]); // throws ZodError
 *
 * @see {@link https://zod.dev/|Zod documentation} for more information on Zod schemas
 */
export const nullableButOptionalNumberSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.number().optional()
) as z.ZodType<OptionalNumber>;
