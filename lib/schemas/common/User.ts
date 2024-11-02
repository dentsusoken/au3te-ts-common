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
import { nullableButOptionalAddressSchema } from './Address';
import { nullableButOptionalBooleanSchema } from './booleanSchema';

/**
 * Schema for a user object containing OpenID Connect standard claims.
 *
 * @property subject - Unique identifier for the user
 * @property loginId - User's login identifier
 * @property password - User's password
 * @property name - User's full name
 * @property email - User's email address
 * @property address - User's address information
 * @property phoneNumber - User's phone number
 * @property code - User's verification code
 * @property phoneNumberVerified - Whether phone number is verified
 * @property emailVerified - Whether email is verified
 * @property givenName - User's given name
 * @property familyName - User's family name
 * @property middleName - User's middle name
 * @property nickname - User's nickname
 * @property profile - URL of user's profile page
 * @property picture - URL of user's profile picture
 * @property website - URL of user's website
 * @property gender - User's gender
 * @property zoneinfo - User's timezone
 * @property locale - User's locale
 * @property preferredUsername - User's preferred username
 * @property birthdate - User's birthdate
 * @property updatedAt - Time the user's information was last updated
 */
export const userSchema = z.object({
  subject: z.string(),
  loginId: nullableButOptionalStringSchema,
  password: nullableButOptionalStringSchema,
  name: nullableButOptionalStringSchema,
  email: nullableButOptionalStringSchema,
  address: nullableButOptionalAddressSchema,
  phoneNumber: nullableButOptionalStringSchema,
  code: nullableButOptionalStringSchema,
  phoneNumberVerified: nullableButOptionalBooleanSchema,
  emailVerified: nullableButOptionalBooleanSchema,
  givenName: nullableButOptionalStringSchema,
  familyName: nullableButOptionalStringSchema,
  middleName: nullableButOptionalStringSchema,
  nickname: nullableButOptionalStringSchema,
  profile: nullableButOptionalStringSchema,
  picture: nullableButOptionalStringSchema,
  website: nullableButOptionalStringSchema,
  gender: nullableButOptionalStringSchema,
  zoneinfo: nullableButOptionalStringSchema,
  locale: nullableButOptionalStringSchema,
  preferredUsername: nullableButOptionalStringSchema,
  birthdate: nullableButOptionalStringSchema,
  updatedAt: nullableButOptionalStringSchema,
});

/**
 * Type representing a user with OpenID Connect standard claims.
 * Most fields are nullable and optional strings, except for 'subject'
 * which is required, and verification flags which are boolean.
 */
export type User = z.infer<typeof userSchema>;

/**
 * Type representing an optional User object.
 */
type OptionalUser = User | undefined;

/**
 * Schema for a nullable but optional user object.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional userSchema. This allows the schema to
 * accept null, undefined, or a valid User object.
 *
 * @example
 * // Valid inputs
 * nullableButOptionalUserSchema.parse(null); // returns undefined
 * nullableButOptionalUserSchema.parse(undefined); // returns undefined
 * nullableButOptionalUserSchema.parse({
 *   subject: '123',
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * }); // returns the User object
 */
export const nullableButOptionalUserSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.optional(userSchema)
) as z.ZodType<OptionalUser>;
