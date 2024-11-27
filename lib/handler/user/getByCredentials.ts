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

import { User } from '../../schemas/common/User';

/**
 * Type definition for a function that retrieves a user by their login credentials.
 *
 * @param loginId - The user's login identifier
 * @param password - The user's password
 * @returns A promise that resolves to either a User object if credentials match, or undefined if no match is found
 */
export type GetByCredentials = (
  loginId: string,
  password: string
) => Promise<User | undefined>;
