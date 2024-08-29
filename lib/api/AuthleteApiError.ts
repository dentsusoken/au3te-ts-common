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
 * Stringifies a Response object for logging purposes.
 * @param {Response} [response] - The Response object to stringify.
 * @returns {string} The stringified Response object, or 'undefined' if response is undefined.
 */
const stringifyResponse = (response?: Response): string => {
  if (!response) {
    return 'undefined';
  }

  const { status, statusText, headers } = response;

  return JSON.stringify({ status, statusText, headers }, undefined, 2);
};

/**
 * Creates an error message for AuthleteApiError.
 * @param {URL} url - The URL of the failed request.
 * @param {RequestInit} requestInit - The options of the failed request.
 * @param {Error} [cause] - The cause of the error, if any.
 * @param {Response} [response] - The Response object of the failed request, if any.
 * @returns {string} The error message.
 */
const createMessage = (
  url: URL,
  requestInit: RequestInit,
  cause?: Error,
  response?: Response
): string =>
  `Authlete API failure url: ${url}, requestInit: ${JSON.stringify(
    requestInit,
    undefined,
    2
  )}, cause: ${cause}, response: ${stringifyResponse(response)}`;

/**
 * Custom error class for Authlete API failures.
 * @extends Error
 */
export class AuthleteApiError extends Error {
  static {
    this.prototype.name = 'AuthleteApiError';
  }

  /**
   * Creates a new instance of AuthleteApiError.
   * @param {URL} url - The URL of the failed request.
   * @param {RequestInit} requestInit - The options of the failed request.
   * @param {Error} [cause] - The cause of the error, if any.
   * @param {Response} [response] - The Response object of the failed request, if any.
   */
  constructor(
    public url: URL,
    public requestInit: RequestInit,
    public cause?: Error,
    public response?: Response
  ) {
    super(createMessage(url, requestInit, cause, response));
  }
}
