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
import { nullableButOptionalAuthzDetailsElementArraySchema } from './AuthzDetailsElement';

/**
 * Schema for Authorization Details as defined in OAuth 2.0 Rich Authorization Requests.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
 */
export const authzDetailsSchema = z.object({
  elements: nullableButOptionalAuthzDetailsElementArraySchema,
});

/**
 * Represents the Authorization Details structure.
 *
 * @typedef {Object} AuthzDetails
 * @property {AuthzDetailsElement[]|undefined} [elements] - An array of Authorization Details elements.
 */
export type AuthzDetails = z.infer<typeof authzDetailsSchema>;

/**
 * Represents an optional Authorization Details structure.
 *
 * @typedef {AuthzDetails|undefined} OptionalAuthzDetails
 */
type OptionalAuthzDetails = AuthzDetails | undefined;

/**
 * Schema for a nullable but optional Authorization Details structure.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional authzDetailsSchema. This allows the schema to
 * accept null, undefined, or a valid AuthzDetails object.
 *
 * @type {z.ZodType<OptionalAuthzDetails>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalAuthzDetailsSchema.parse(null); // returns undefined
 * nullableButOptionalAuthzDetailsSchema.parse(undefined); // returns undefined
 * nullableButOptionalAuthzDetailsSchema.parse({
 *   elements: [{ type: 'example', actions: ['read'] }]
 * }); // returns the AuthzDetails object
 *
 * @example
 * // Invalid input
 * nullableButOptionalAuthzDetailsSchema.parse('not an object'); // throws ZodError
 */
export const nullableButOptionalAuthzDetailsSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(authzDetailsSchema)
) as z.ZodType<OptionalAuthzDetails>;
