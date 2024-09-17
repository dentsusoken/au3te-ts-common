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
import {
  nullableButOptionalStringArraySchema,
  nullableButOptionalStringSchema,
} from './stringSchema';

/**
 * Schema for an Authorization Details element as defined in OAuth 2.0 Rich Authorization Requests.
 *
 * This schema allows for additional properties beyond those explicitly defined.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
 */
export const authzDetailsElementSchema = z
  .object({
    type: nullableButOptionalStringSchema,
    locations: nullableButOptionalStringArraySchema,
    actions: nullableButOptionalStringArraySchema,
    datatypes: nullableButOptionalStringArraySchema,
    identifier: nullableButOptionalStringSchema,
    privileges: nullableButOptionalStringArraySchema,
  })
  .passthrough();

/**
 * Represents an Authorization Details element.
 *
 * @typedef {Object} AuthzDetailsElement
 * @property {string|undefined} [type] - The type of the authorization details element.
 * @property {string[]|undefined} [locations] - The locations this element applies to.
 * @property {string[]|undefined} [actions] - The actions allowed by this element.
 * @property {string[]|undefined} [datatypes] - The data types this element applies to.
 * @property {string|undefined} [identifier] - A unique identifier for the resource.
 * @property {string[]|undefined} [privileges] - The privileges granted by this element.
 */
export type AuthzDetailsElement = z.infer<typeof authzDetailsElementSchema>;

/**
 * Represents an optional array of Authorization Details elements.
 *
 * @typedef {AuthzDetailsElement[]|undefined} OptionalAuthzDetailsElementArray
 */
type OptionalAuthzDetailsElementArray = AuthzDetailsElement[] | undefined;

/**
 * Schema for a nullable but optional array of Authorization Details elements.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of authzDetailsElementSchema. This allows the schema to
 * accept null, undefined, or a valid array of AuthzDetailsElement objects.
 *
 * @type {z.ZodType<OptionalAuthzDetailsElementArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalAuthzDetailsElementArraySchema.parse(null); // returns undefined
 * nullableButOptionalAuthzDetailsElementArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalAuthzDetailsElementArraySchema.parse([
 *   { type: 'example', actions: ['read'] },
 *   { type: 'another', locations: ['https://example.com'] }
 * ]); // returns the array of AuthzDetailsElement objects
 *
 * @example
 * // Invalid input
 * nullableButOptionalAuthzDetailsElementArraySchema.parse('not an array'); // throws ZodError
 */
export const nullableButOptionalAuthzDetailsElementArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(z.array(authzDetailsElementSchema))
) as z.ZodType<OptionalAuthzDetailsElementArray>;
