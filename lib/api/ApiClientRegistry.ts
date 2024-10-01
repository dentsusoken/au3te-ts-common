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

import { ApiClient } from './ApiClient';

/**
 * A registry for managing a single instance of ApiClient.
 * This class follows the singleton pattern and provides static methods to register and retrieve the ApiClient.
 */
export class ApiClientRegistry {
  /** The single instance of ApiClient stored in the registry. */
  private static apiClient: ApiClient | undefined;

  /**
   * Private constructor to prevent instantiation.
   * @private
   */
  private constructor() {}

  /**
   * Retrieves the registered ApiClient instance.
   * @throws {Error} If no ApiClient has been registered.
   * @returns {ApiClient} The registered ApiClient instance.
   */
  static getApiClient(): ApiClient {
    if (this.apiClient) {
      return this.apiClient;
    }

    throw new Error('The API client not registered');
  }

  /**
   * Registers an ApiClient instance.
   * @param {ApiClient} apiClient - The ApiClient instance to register.
   */
  static registerApiClient(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
}
