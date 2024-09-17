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
 * Array of valid prompt values for OAuth 2.0 and OpenID Connect.
 *
 * @type {readonly ["none", "login", "consent", "select_account", "create"]}
 */
export const prompts = [
  'none',
  'login',
  'consent',
  'select_account',
  'create',
] as const;

/**
 * Represents a valid prompt value.
 *
 * @typedef {typeof prompts[number]} Prompt
 */
export type Prompt = (typeof prompts)[number];

/**
 * Represents an optional array of Prompt values.
 *
 * @typedef {Prompt[]|undefined} OptionalPromptArray
 */
type OptionalPromptArray = Prompt[] | undefined;

/**
 * Schema for validating a single Prompt value.
 *
 * This schema preprocesses the input to convert string values to lowercase,
 * and then validates against the enum of valid prompt values.
 *
 * @type {z.ZodType<Prompt>}
 */
export const promptSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(prompts)
) as z.ZodType<Prompt>;

/**
 * Schema for a nullable but optional array of Prompt values.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional array of promptSchema. This allows the schema to
 * accept null, undefined, or a valid array of Prompt values.
 *
 * In OAuth 2.0 and OpenID Connect, the 'prompt' parameter is used to specify
 * the type of authentication and consent experience the user should encounter.
 *
 * @type {z.ZodType<OptionalPromptArray>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalPromptArraySchema.parse(null); // returns undefined
 * nullableButOptionalPromptArraySchema.parse(undefined); // returns undefined
 * nullableButOptionalPromptArraySchema.parse(['login', 'consent']); // returns ['login', 'consent']
 *
 * @example
 * // Invalid input
 * nullableButOptionalPromptArraySchema.parse(['invalid']); // throws ZodError
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|OpenID Connect Core 1.0 - Authentication Request}
 */
export const nullableButOptionalPromptArraySchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.optional(z.array(promptSchema))
) as z.ZodType<OptionalPromptArray>;
