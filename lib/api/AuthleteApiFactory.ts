/*
 * Copyright (C) 2019-2024 Authlete, Inc.
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

import { AuthleteApi } from './AuthleteApi';

/**
 * Factory class for creating and managing instances of AuthleteApi.
 */
export class AuthleteApiFactory {
  /**
   * The default instance of AuthleteApi.
   * @type {AuthleteApi | undefined}
   * @private
   */
  private static defaultApi: AuthleteApi | undefined = undefined;

  /**
   * Private constructor to prevent instantiation of the factory class.
   * @private
   */
  private constructor() {}

  /**
   * Retrieves the default instance of AuthleteApi.
   * @returns {Promise<AuthleteApi>} A promise that resolves to the default AuthleteApi instance.
   * @throws {Error} If the default API is not registered.
   */
  static async getDefaultApi(): Promise<AuthleteApi> {
    if (this.defaultApi) {
      return this.defaultApi;
    }

    throw new Error('The default API not registered');
  }

  /**
   * Registers the default instance of AuthleteApi.
   * @param {AuthleteApi} defaultApi - The default AuthleteApi instance to register.
   */
  static registerDefaultApi(defaultApi: AuthleteApi) {
    this.defaultApi = defaultApi;
  }
}
