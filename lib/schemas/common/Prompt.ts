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
 * Zod schema for validating prompt values.
 *
 * This schema preprocesses the input by converting it to lowercase if it's a string,
 * and then validates it against the predefined prompt values using `z.enum`.
 * The resulting schema accepts values of type `Prompt`, which is a union of the predefined prompts.
 *
 * @example
 * const validPrompt = promptSchema.parse('login');
 * // validPrompt: 'login'
 *
 * const validPromptCaseInsensitive = promptSchema.parse('LOGIN');
 * // validPromptCaseInsensitive: 'login'
 *
 * const invalidPrompt = promptSchema.parse('invalid');
 * // throws a ZodError
 */
export const promptSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(prompts)
) as z.ZodType<Prompt>;
