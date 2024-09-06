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
 * Zod schema for a string that can be undefined or null.
 *
 * @type {z.ZodSchema<string | undefined>}
 * @description This schema preprocesses the input value by converting null to undefined,
 * and then validates it as an optional string using `z.string().optional()`.
 * The resulting schema accepts values of type `string | undefined`.
 *
 * @example
 * const validString = nullableButOptionalStringSchema.parse('hello');
 * // validString: 'hello'
 *
 * const validUndefined = nullableButOptionalStringSchema.parse(undefined);
 * // validUndefined: undefined
 *
 * const validNull = nullableButOptionalStringSchema.parse(null);
 * // validNull: undefined
 *
 * const invalidValue = nullableButOptionalStringSchema.parse(123);
 * // throws a ZodError
 */
export const nullableButOptionalStringSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.string().optional()
);

/**
 * Zod schema for a URL string that can be undefined or null.
 *
 * @type {z.ZodSchema<string | undefined>}
 * @description This schema preprocesses the input value by converting null to undefined,
 * and then validates it as an optional URL string using `z.string().url().optional()`.
 * The resulting schema accepts values of type `string | undefined`, where the string must be a valid URL.
 *
 * @example
 * const validUrl = nullableButOptionalUrlStringSchema.parse('https://example.com');
 * // validUrl: 'https://example.com'
 *
 * const validUndefined = nullableButOptionalUrlStringSchema.parse(undefined);
 * // validUndefined: undefined
 *
 * const validNull = nullableButOptionalUrlStringSchema.parse(null);
 * // validNull: undefined
 *
 * const invalidUrl = nullableButOptionalUrlStringSchema.parse('invalid-url');
 * // throws a ZodError
 */
export const nullableButOptionalUrlStringSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.string().url().optional()
);
