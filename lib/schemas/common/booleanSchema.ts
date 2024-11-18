/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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
 * Represents a boolean value that can be undefined.
 *
 * @typedef {boolean|undefined} OptionalBoolean
 */
type OptionalBoolean = boolean | undefined;

/**
 * Schema for a nullable but optional boolean.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional boolean schema. This allows the schema to
 * accept null, undefined, or a valid boolean value.
 *
 * @type {z.ZodType<OptionalBoolean>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalBooleanSchema.parse(null); // returns undefined
 * nullableButOptionalBooleanSchema.parse(undefined); // returns undefined
 * nullableButOptionalBooleanSchema.parse(true); // returns true
 * nullableButOptionalBooleanSchema.parse(false); // returns false
 *
 * @example
 * // Invalid inputs
 * nullableButOptionalBooleanSchema.parse("true"); // throws ZodError
 * nullableButOptionalBooleanSchema.parse(1); // throws ZodError
 * nullableButOptionalBooleanSchema.parse({}); // throws ZodError
 */
export const nullableButOptionalBooleanSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.boolean().optional()
) as z.ZodType<OptionalBoolean>;
