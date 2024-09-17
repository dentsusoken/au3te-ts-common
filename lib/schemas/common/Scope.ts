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

/**
 * Information about a scope of a service.
 *
 * @see <a href="http://tools.ietf.org/html/rfc6749#section-3.3"
 *      > RFC 6749 (OAuth 2.0), 3.3. Access Token Scope</a>
 *
 * @author Takahiko Kawasaki
 */

import { z } from 'zod';
import { nullableButOptionalStringSchema } from './stringSchema';
import { nullableButOptionalBooleanSchema } from './booleanSchema';
import { nullableButOptionalTaggedValueArraySchema } from './TaggedValue';
import { nullableButOptionalPairArraySchema } from './Pair';

/**
 * Zod schema for validating Scope objects.
 *
 * This schema uses nullableButOptional schemas for its properties, which means:
 * - null values are converted to undefined
 * - undefined values are allowed
 * - when a value is provided, it must match the specified type
 *
 * @type {z.ZodType<Scope>}
 */
export const scopeSchema = z.object({
  name: nullableButOptionalStringSchema,
  defaultEntry: nullableButOptionalBooleanSchema,
  description: nullableButOptionalStringSchema,
  descriptions: nullableButOptionalTaggedValueArraySchema,
  attributes: nullableButOptionalPairArraySchema,
});

/**
 * Represents a scope in the OAuth 2.0 / OpenID Connect context.
 *
 * @typedef {Object} Scope
 * @property {string|undefined} [name] - The name of the scope.
 * @property {boolean|undefined} [defaultEntry] - Indicates if this is a default scope.
 * @property {string|undefined} [description] - A description of the scope.
 * @property {Array<{tag: string|undefined, value: string|undefined}>|undefined} [descriptions] - Localized descriptions of the scope.
 * @property {Array<{key: string|undefined, value: string|undefined}>|undefined} [attributes] - Additional attributes associated with the scope.
 */

export type Scope = z.infer<typeof scopeSchema>;

/**
 * Represents an optional scope.
 *
 * @typedef {Scope|undefined} OptionalScope
 */
type OptionalScope = Scope | undefined;

/**
 * Represents an optional array of scopes.
 *
 * @typedef {Scope[]|undefined} OptionalScopeArray
 */
type OptionalScopeArray = Scope[] | undefined;

/**
 * Schema for a nullable but optional scope.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional scopeSchema. This allows the schema to
 * accept null, undefined, or a valid Scope object.
 *
 * @type {z.ZodType<OptionalScope>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalScopeSchema.parse(null); // returns undefined
 * nullableButOptionalScopeSchema.parse(undefined); // returns undefined
 * nullableButOptionalScopeSchema.parse({ name: 'read', description: 'Read access' }); // returns the Scope object
 *
 * @example
 * // Invalid input
 * nullableButOptionalScopeSchema.parse('not an object'); // throws ZodError
 *
 * @see {@link scopeSchema} for the underlying scope schema
 */
export const nullableButOptionalScopeSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(scopeSchema)
) as z.ZodType<OptionalScope>;

/**
 * Schema for a nullable but optional array of scopes.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of scopeSchema. This allows the schema to
 * accept null, undefined, or a valid array of Scope objects.
 *
 * In OAuth 2.0 and OpenID Connect, scopes represent permissions requested by
 * the client application. This schema is particularly useful for handling
 * the 'scopes' parameter in authorization requests and responses.
 *
 * @type {z.ZodType<OptionalScopeArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalScopeArraySchema.parse(null); // returns undefined
 * nullableButOptionalScopeArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalScopeArraySchema.parse([
 *   { name: 'read', description: 'Read access' },
 *   { name: 'write', description: 'Write access' }
 * ]); // returns the array of Scope objects
 *
 * @example
 * // Invalid input
 * nullableButOptionalScopeArraySchema.parse('not an array'); // throws ZodError
 *
 * @see {@link scopeSchema} for the underlying scope schema
 * @see {@link https://tools.ietf.org/html/rfc6749#section-3.3|OAuth 2.0 Scope}
 */
export const nullableButOptionalScopeArraySchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(z.array(scopeSchema))
) as z.ZodType<OptionalScopeArray>;
