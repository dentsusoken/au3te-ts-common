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
import { nullableButOptionalStringSchema } from './stringSchema';

/**
 * Schema for an address object.
 *
 * @property formatted - Full formatted address as a single string
 * @property streetAddress - Street name and number
 * @property locality - City/ward/town/village
 * @property region - State/prefecture/province
 * @property postalCode - Postal/ZIP code
 * @property country - Country name
 */
export const addressSchema = z.object({
  formatted: nullableButOptionalStringSchema,
  streetAddress: nullableButOptionalStringSchema,
  locality: nullableButOptionalStringSchema,
  region: nullableButOptionalStringSchema,
  postalCode: nullableButOptionalStringSchema,
  country: nullableButOptionalStringSchema,
});

/**
 * Type representing an address with optional fields.
 * All fields are nullable and optional strings.
 */
export type Address = z.infer<typeof addressSchema>;

/**
 * Type representing an optional Address object.
 */
type OptionalAddress = Address | undefined;

/**
 * Schema for a nullable but optional address object.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional addressSchema. This allows the schema to
 * accept null, undefined, or a valid Address object.
 *
 * @example
 * // Valid inputs
 * nullableButOptionalAddressSchema.parse(null); // returns undefined
 * nullableButOptionalAddressSchema.parse(undefined); // returns undefined
 * nullableButOptionalAddressSchema.parse({
 *   formatted: '123 Main St, City',
 *   streetAddress: '123 Main St'
 * }); // returns the Address object
 */
export const nullableButOptionalAddressSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(addressSchema)
) as z.ZodType<OptionalAddress>;
