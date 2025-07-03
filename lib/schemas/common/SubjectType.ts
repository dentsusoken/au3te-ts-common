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
 * An array of valid subject types.
 *
 * @constant {readonly string[]}
 */
export const subjectTypes = ['public', 'pairwise'] as const;

/**
 * Type representing a valid subject type.
 *
 * @typedef {('public' | 'pairwise')} SubjectType
 */
export type SubjectType = (typeof subjectTypes)[number];

/**
 * Zod schema for validating and transforming subject types.
 *
 * This schema preprocesses the input to convert it to lowercase if it's a string,
 * and then validates it against the defined subject types.
 *
 * @type {z.ZodType<SubjectType>}
 */
export const subjectTypeSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(subjectTypes)
) as z.ZodType<SubjectType>;
