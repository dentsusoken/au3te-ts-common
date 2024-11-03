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

import { UserConfiguration } from './UserConfiguration';
import { GetByCredentials, simpleGetByCredentials } from './getByCredentials';

/**
 * Default implementation of UserConfiguration interface.
 * Provides basic user management functionality for testing and development.
 *
 * @implements {UserConfiguration}
 */
export class UserConfigurationImpl implements UserConfiguration {
  /**
   * Default implementation of user credential verification.
   * Uses a simple in-memory user store for testing purposes.
   *
   * @type {GetByCredentials}
   * @see simpleGetByCredentials
   */
  getByCredentials: GetByCredentials = simpleGetByCredentials;
}
