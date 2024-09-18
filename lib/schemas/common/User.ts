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
 * Schema for user data.
 *
 * This schema defines the structure of a user object, which includes
 * a subject identifier. The subject is a unique identifier for the user
 * within the context of the authorization server.
 */
export const userSchema = z.object({
  /**
   * The subject identifier for the user.
   *
   * This should be a string that uniquely identifies the user. It must
   * consist of only ASCII characters and its length must be equal to or
   * less than 100 characters, as per Authlete's requirements.
   */
  subject: z.string(),
});

/**
 * Represents a user in the system.
 *
 * This type is inferred from the userSchema and represents the structure
 * of a user object after validation.
 *
 * @typedef {Object} User
 * @property {string} subject - The unique identifier for the user.
 */
export type User = z.infer<typeof userSchema>;
