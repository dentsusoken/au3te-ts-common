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

import { UserHandlerConfiguration } from './UserHandlerConfiguration';
import { AddUser } from './addUser';
import { GetByCredentials } from './getByCredentials';
import { GetBySubject } from './getBySubject';
import { GetMdocClaimsBySubjectAndDoctype } from './getMdocClaimsBySubjectAndDoctype';
import { mockGetByCredentials } from './mockGetByCredentials';
import { mockGetBySubject } from './mockGetBySubject';
import { mockGetMdocClaimsBySubjectAndDoctype } from './mockGetMdocClaimsBySubjectAndDoctype';
import { User } from '../../schemas/common/User';

/**
 * Default implementation of UserHandlerConfiguration interface.
 * Provides mock user management functionality for testing and development purposes.
 * This implementation uses an in-memory store with predefined user data.
 *
 * @implements {UserHandlerConfiguration}
 * @example
 * const userHandler = new UserHandlerConfigurationImpl();
 *
 * // Authenticate user
 * const user1 = await userHandler.getByCredentials('inga', 'inga');
 *
 * // Lookup user by subject
 * const user2 = await userHandler.getBySubject('1004');
 */
export class UserHandlerConfigurationImpl<
  U extends User = User,
  T extends keyof Omit<U, 'loginId' | 'password'> = never
> implements UserHandlerConfiguration<U, T>
{
  /**
   * Implementation of user authentication by credentials.
   * Uses a mock implementation that searches a predefined set of users.
   * Suitable for testing and development environments only.
   *
   * @type {GetByCredentials}
   * @see mockGetByCredentials
   */
  getByCredentials: GetByCredentials<U, T> = mockGetByCredentials as GetByCredentials<U, T>;

  /**
   * Implementation of user lookup by subject identifier.
   * Uses a mock implementation that searches a predefined set of users.
   * The subject identifier follows the OpenID Connect specification.
   *
   * @type {GetBySubject}
   * @see mockGetBySubject
   */
  getBySubject: GetBySubject<U> = mockGetBySubject as GetBySubject<U>;

  /**
   * Implementation of mdoc claims retrieval by subject and document type.
   * Uses a mock implementation that searches a predefined set of mdocs.
   *
   * @type {GetMdocClaimsBySubjectAndDoctype}
   * @see mockGetMdocClaimsBySubjectAndDoctype
   */
  getMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype =
    mockGetMdocClaimsBySubjectAndDoctype as GetMdocClaimsBySubjectAndDoctype;

  /**
   * Implementation of user addition.
   * Uses a mock implementation that does nothing.
   *
   * @type {AddUser}
   * @see mockAddUser
   */
  addUser: AddUser = async () => {
    return Promise.resolve();
  };
}
