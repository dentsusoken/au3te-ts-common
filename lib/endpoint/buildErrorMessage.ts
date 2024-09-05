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

import { getErrorMessage } from '../utils/errorUtils';
import { ResponseError } from '../api/ResponseError';
import { runAsyncCatching } from '../utils/result';

/**
 * Represents a function that builds an error message from any type of error.
 */
export type BuildErrorMessage = (error: unknown) => Promise<string>;

/**
 * Builds a detailed error message for ResponseError.
 * Attempts to use buildMessageWithBody, falling back to the error message if that fails.
 *
 * @param {ResponseError} error - The ResponseError to process
 * @returns {Promise<string>} A promise that resolves to the error message
 */
export const buildResponseErrorMessage = async (
  error: ResponseError
): Promise<string> =>
  (await runAsyncCatching(() => error.buildMessageWithBody()))
    .recover(() => error.message)
    .getOrThrow();

/**
 * Default implementation of the BuildErrorMessage function.
 *
 * This function provides a standard way to build error messages for different types of errors.
 * It handles ResponseError instances specially, using a dedicated method to build the message.
 * For all other error types, it uses a generic error message getter.
 *
 * @type {BuildErrorMessage}
 * @async
 * @param {unknown} error - The error to process. This can be of any type.
 * @returns {Promise<string>} A promise that resolves to the formatted error message.
 *
 * @example
 * // Using with a ResponseError
 * const responseError = new ResponseError(response, request);
 * const message = await defaultBuildErrorMessage(responseError);
 * console.log(message); // Outputs a formatted message specific to ResponseError
 *
 * @example
 * // Using with a standard Error
 * const error = new Error("Something went wrong");
 * const message = await defaultBuildErrorMessage(error);
 * console.log(message); // Outputs "Something went wrong"
 *
 * @example
 * // Using with a non-Error object
 * const nonError = { message: "Unexpected issue" };
 * const message = await defaultBuildErrorMessage(nonError);
 * console.log(message); // Outputs a string representation of the object
 */
export const defaultBuildErrorMessage: BuildErrorMessage = async (error) => {
  if (error instanceof ResponseError) {
    return buildResponseErrorMessage(error);
  }

  return getErrorMessage(error);
};
