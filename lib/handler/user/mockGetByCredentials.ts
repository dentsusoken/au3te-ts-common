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

import { GetByCredentials } from './getByCredentials';
import { mockUsers } from './mockUsers';

/**
 * Implements a mock user authentication service.
 * Performs a simple credential verification against a static user repository.
 * This implementation is intended for testing and development purposes only.
 *
 * @implements {GetByCredentials}
 * @param loginId - Unique identifier for user authentication (typically username or email)
 * @param password - User's authentication credential
 * @returns {Promise<User | undefined>} Returns a Promise that resolves to:
 *                                     - User object if credentials match
 *                                     - undefined if no matching user is found
 * @example
 * const user = await mockGetByCredentials('inga', 'inga');
 * if (user) {
 *   console.log('Authentication successful:', user.name);
 * }
 */
export const mockGetByCredentials: GetByCredentials = async (
  loginId,
  password
) => {
  return mockUsers.find(
    (user) => user.loginId === loginId && user.password === password
  );
};
