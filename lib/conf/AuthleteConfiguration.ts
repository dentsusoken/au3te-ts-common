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

/**
 * Represents the configuration for Authlete.
 * @interface AuthleteConfiguration
 */
export interface AuthleteConfiguration {
  /**
   * The version of the Authlete API.
   * @type {string}
   */
  apiVersion: string;

  /**
   * The base URL of the Authlete API.
   * @type {string}
   */
  baseUrl: string;

  /**
   * The service API key for authentication.
   * @type {string}
   */
  serviceApiKey: string;

  /**
   * The service access token for authentication.
   * @type {string}
   */
  serviceAccessToken: string;
}
