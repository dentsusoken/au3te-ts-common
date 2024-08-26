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
 * Represents the response headers.
 * @typedef {Record<string, unknown>} ResponseHeaders
 */
type ResponseHeaders = Record<string, unknown>;

/**
 * Represents an exception thrown by the Authlete API.
 * @extends Error
 */
export class AuthleteApiException extends Error {
  /**
   * Creates an instance of AuthleteApiException.
   * @param {string} message - The error message.
   * @param {number} [statusCode=0] - The HTTP status code of the response.
   * @param {string} [statusMessage] - The HTTP status message of the response.
   * @param {string} [responseBody] - The response body.
   * @param {ResponseHeaders} [responseHeaders] - The response headers.
   */
  constructor(
    public message: string,
    public statusCode?: number,
    public statusMessage?: string,
    public responseBody?: string,
    public responseHeaders?: ResponseHeaders
  ) {
    super(message);
    this.statusCode = statusCode || 0;
  }
}
