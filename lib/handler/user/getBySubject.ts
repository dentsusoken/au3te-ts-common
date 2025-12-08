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
 * Type definition for a function that retrieves a user by their subject identifier.
 * The subject identifier is a unique identifier for the user in the context of OpenID Connect.
 * This is typically used to look up user information after authentication has been completed.
 *
 * @typeParam U - The user type that extends the base User type. Defaults to User.
 *                This allows the function to work with extended user types that include
 *                additional properties beyond the base User interface.
 *
 * @param subject - The unique subject identifier of the user as defined in the OpenID Connect specification.
 *                  This is a string that uniquely identifies the user within the identity provider's system.
 *
 * @returns A Promise that resolves to:
 *          - A User object of type U if a user with the given subject is found
 *          - undefined if no user with the given subject identifier exists
 *
 * @example
 * ```typescript
 * // Basic usage with default User type
 * const getUser: GetBySubject = async (subject) => {
 *   return await findUserBySubject(subject);
 * };
 *
 * // Usage with extended user type
 * interface ExtendedUser extends User {
 *   customField: string;
 * }
 *
 * const getExtendedUser: GetBySubject<ExtendedUser> = async (subject) => {
 *   return await findExtendedUserBySubject(subject);
 * };
 * ```
 */
export type GetBySubject<U extends User = User> = (
  subject: string
) => Promise<U | undefined>;
