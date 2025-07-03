/*
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

import { z } from 'zod';

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
export const addressSchema = z
  .object({
    formatted: z.string().nullish(),
    streetAddress: z.string().nullish(),
    locality: z.string().nullish(),
    region: z.string().nullish(),
    postalCode: z.string().nullish(),
    country: z.string().nullish(),
  })
  .strict();

/**
 * Type representing an address with optional fields.
 * All fields are nullable and optional strings.
 */
export type Address = z.infer<typeof addressSchema>;
