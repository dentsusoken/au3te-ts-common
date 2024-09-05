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

import { HttpStatus } from '../utils/httpStatus';
import { runAsyncCatching } from '../utils/result';

/**
 * The name of the ResponseError class.
 * @constant {string}
 */
const NAME = 'ResponseError';

/**
 * Converts a Response object to a formatted JSON string.
 *
 * This function extracts the status and statusText from the Response object
 * and returns them as a formatted JSON string.
 *
 * @param {Response} response - The Response object to stringify.
 * @returns {string} A formatted JSON string containing the status and statusText.
 *
 * @example
 * const response = new Response('', { status: 404, statusText: 'Not Found' });
 * const stringified = stringifyResponse(response);
 * console.log(stringified);
 * // Output:
 * // {
 * //   "status": 404,
 * //   "statusText": "Not Found"
 * // }
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
   * The parsed body of the response. This is set when buildMessageWithBody is called.
   * @type {unknown | undefined}
   */
  body: unknown | undefined;

  /**
   * Sets the name of the error to 'ResponseError'.
   */
  static {
    this.prototype.name = NAME;
  }

  /**
   * Creates a new instance of ResponseError.
   *
   * @param {Response} response - The Response object associated with the error.
   * @param {Request} request - The Request object associated with the error.
   *
   * @example
   * const response = new Response('', { status: 404, statusText: 'Not Found' });
   * const request = new Request('https://api.example.com/data');
   * const error = new ResponseError(response, request);
   */
  constructor(public response: Response, public request: Request) {
    super(`${NAME}: ${stringifyResponse(response)}`);
  }

  /**
   * Builds a detailed error message including the response body.
   *
   * This method attempts to parse the response body as JSON. If the response
   * status is NO_CONTENT or if parsing fails, an empty object is used for the body.
   *
   * @returns {Promise<string>} A promise that resolves to the detailed error message.
   *
   * @example
   * const error = new ResponseError(response, request);
   * const detailedMessage = await error.buildMessageWithBody();
   * console.log(detailedMessage);
   * // Output:
   * // ResponseError: {
   * //   "status": 404,
   * //   "statusText": "Not Found",
   * //   "body": {
   * //     "message": "The requested resource was not found"
   * //   }
   * // }
   */
  async buildMessageWithBody(): Promise<string> {
    const status = this.response.status;
    const statusText = this.response.statusText;
    this.body =
      status !== HttpStatus.NO_CONTENT
        ? (await runAsyncCatching(() => this.response.json())).getOrDefault({})
        : {};

    this.message = `${NAME}: ${JSON.stringify(
      { status, statusText, body: this.body },
      undefined,
      2
    )}`;

    return this.message;
  }
}
