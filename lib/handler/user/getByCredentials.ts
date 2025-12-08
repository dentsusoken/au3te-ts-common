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
 * This function authenticates a user using their login identifier and password,
 * and optionally accepts additional user properties that must be present in the returned user object.
 *
 * @typeParam U - The user type that extends the base User type. Defaults to User.
 * @typeParam T - A union of User property keys (excluding 'loginId' and 'password') that must be present
 *                in the options parameter. When T is never (default), the options parameter is undefined.
 *                When T is specified, all properties in T must be provided in the options object.
 *
 * @param loginId - The user's login identifier (typically username or email address)
 * @param password - The user's password for authentication
 * @param options - Optional object containing required user properties specified by type parameter T.
 *                  If T is never, this parameter is undefined and can be omitted.
 *                  If T is specified (e.g., 'subject' | 'email'), all properties in T must be provided
 *                  and will be required (non-nullable) in the options object.
 *
 * @returns A Promise that resolves to:
 *          - A User object of type U if the credentials match and a user is found
 *          - undefined if no matching user is found or credentials are invalid
 *
 * @example
 * ```typescript
 * // Basic usage without options (T defaults to never)
 * const getUser: GetByCredentials = async (loginId, password) => {
 *   // options parameter is undefined here
 *   return await findUser(loginId, password);
 * };
 *
 * // Usage with required options (T specifies required properties)
 * const getUserWithOptions: GetByCredentials<User, 'subject' | 'email'> = async (
 *   loginId,
 *   password,
 *   options
 * ) => {
 *   // options.subject and options.email are required here
 *   // Both properties are non-nullable (Required<Pick<User, 'subject' | 'email'>>)
 *   return await findUser(loginId, password, options);
 * };
 * ```
 */
export type GetByCredentials<
  U extends User = User,
  T extends keyof Omit<U, 'loginId' | 'password'> = never
> = (
  loginId: string,
  password: string,
  options?: Required<Pick<U, T>>
) => Promise<U | undefined>;
