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
 * Converts a Response object to a formatted JSON string.
 *
 * This function extracts the status and statusText from the Response object
 * and returns them as a formatted JSON string.
 *
 * @param {Response} response - The Response object to stringify.
 * @returns {string} A formatted JSON string containing the status and statusText.
 */
const stringifyResponse = (response: Response): string => {
  const { status, statusText } = response;

  return JSON.stringify({ status, statusText }, undefined, 2);
};

/**
 * Custom error class for handling Response errors.
 *
 * This class extends the built-in Error class and provides additional
 * functionality for handling errors related to HTTP responses.
 *
 * @extends Error
 */
export class ResponseError extends Error {
  /**
   * Sets the name of the error to 'ResponseError'.
   */
  static {
    this.prototype.name = 'ResponseError';
  }

  /**
   * Creates a new instance of ResponseError.
   *
   * @param {Response} response - The Response object associated with the error.
   */
  constructor(public response: Response) {
    super(`Response Error: ${stringifyResponse(response)}`);
  }
}
