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

import { GetBySubject } from './getBySubject';
import { mockUsers } from './mockUsers';

/**
 * Implements a mock user lookup service by subject identifier.
 * Performs a simple search against a static user repository using the subject identifier.
 * This implementation is intended for testing and development purposes only.
 *
 * @implements {GetBySubject}
 * @param subject - The unique subject identifier to search for
 * @returns {Promise<User | undefined>} Returns a Promise that resolves to:
 *                                     - User object if subject matches
 *                                     - undefined if no matching user is found
 * @example
 * const user = await mockGetBySubject('1004');
 * if (user) {
 *   console.log('User found:', user.name);
 * }
 */
export const mockGetBySubject: GetBySubject = async (subject) => {
  return mockUsers.find((user) => user.subject === subject);
};
