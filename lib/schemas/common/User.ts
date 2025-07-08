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
import { addressSchema } from './Address';

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
  loginId: z.string().nullish(),
  password: z.string().nullish(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  address: addressSchema.nullish(),
  phoneNumber: z.string().nullish(),
  code: z.string().nullish(),
  phoneNumberVerified: z.boolean().nullish(),
  emailVerified: z.boolean().nullish(),
  givenName: z.string().nullish(),
  familyName: z.string().nullish(),
  middleName: z.string().nullish(),
  nickname: z.string().nullish(),
  profile: z.string().nullish(),
  picture: z.string().nullish(),
  website: z.string().nullish(),
  gender: z.string().nullish(),
  zoneinfo: z.string().nullish(),
  locale: z.string().nullish(),
  preferredUsername: z.string().nullish(),
  birthdate: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

/**
 * Type representing a user with OpenID Connect standard claims.
 * Most fields are nullable and optional strings, except for 'subject'
 * which is required, and verification flags which are boolean.
 */
export type User = z.input<typeof userSchema>;
