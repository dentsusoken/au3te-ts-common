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
import { taggedValueSchema } from './TaggedValue';
import { pairSchema } from './Pair';

/**
 * Zod schema for a scope object.
 *
 * This schema defines the structure of a scope in the OAuth 2.0 / OpenID Connect context.
 *
 * @typedef {Object} ScopeSchema
 * @property {string|undefined} [name] - The name of the scope.
 * @property {boolean|undefined} [defaultEntry] - Indicates if this is a default scope.
 * @property {string|undefined} [description] - A description of the scope.
 * @property {Array<TaggedValue>|undefined} [descriptions] - Localized descriptions of the scope.
 * @property {Array<Pair>|undefined} [attributes] - Additional attributes associated with the scope.
 */
export const scopeSchema = z.object({
  name: z.string().nullish(),
  defaultEntry: z.boolean().nullish(),
  description: z.string().nullish(),
  descriptions: z.array(taggedValueSchema).nullish(),
  attributes: z.array(pairSchema).nullish(),
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

export type Scope = z.input<typeof scopeSchema>;
