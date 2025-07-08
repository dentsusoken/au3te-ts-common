/*
 * Copyright (C) 2014-2014 Authlete, Inc.
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
 * A string value with a language tag
 *
 * @typedef {string} LanguageTag
 * @see {@link http://en.wikipedia.org/wiki/IETF_language_tag|Language tag}
 *
 * @author Takahiko Kawasaki
 */

import { z } from 'zod';

/**
 * Schema for a tagged value.
 *
 * @type {z.ZodType<TaggedValue>}
 */
export const taggedValueSchema = z.object({
  tag: z.string().nullish(),
  value: z.string().nullish(),
});

/**
 * Represents a value with an associated language tag.
 *
 * @typedef {Object} TaggedValue
 * @property {string|undefined} [tag] - The language tag, e.g., 'en' for English.
 * @property {string|undefined} [value] - The value associated with the language tag.
 */

export type TaggedValue = z.input<typeof taggedValueSchema>;
