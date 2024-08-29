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
 * Represents an HTTP call that can be executed.
 */
export interface HttpCall {
  /**
   * The URL to make the HTTP request to.
   * @type {URL}
   */
  url: URL;

  /**
   * The options for the HTTP request.
   * @type {RequestInit}
   */
  requestInit: RequestInit;

  /**
   * Executes the HTTP call.
   *
   * @returns {Promise<Response>} A Promise that resolves to a Response object.
   */
  call(): Promise<Response>;
}
