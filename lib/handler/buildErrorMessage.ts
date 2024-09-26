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

import { ResponseError } from '../api/ResponseError';
import { runAsyncCatching } from '../utils/result';

/**
 * Type definition for a function that builds an error message from an Error object.
 *
 * @param {Error} error - The Error object to build the message from.
 * @returns {Promise<string>} A promise that resolves to the built error message.
 */
export type BuildErrorMessage = (error: Error) => Promise<string>;

/**
 * Builds an error message for a ResponseError object.
 *
 * @param {ResponseError} error - The ResponseError object to build the message from.
 * @returns {Promise<string>} A promise that resolves to the built error message.
 * @description This function attempts to build the error message with the response body using the `buildMessageWithBody` method of the ResponseError object.
 * If the `buildMessageWithBody` method fails, it falls back to the `message` property of the ResponseError object.
 */
export const buildResponseErrorMessage = async (
  error: ResponseError
): Promise<string> => {
  const result = await runAsyncCatching(() => error.buildMessageWithBody());

  return result.getOrDefault(error.message);
};

/**
 * Default implementation of the BuildErrorMessage function.
 *
 * @param {Error} error - The Error object to build the message from.
 * @returns {Promise<string>} A promise that resolves to the built error message.
 * @description This function checks if the provided error is an instance of ResponseError.
 * If it is, it calls the `buildResponseErrorMessage` function to build the error message.
 * If it is not, it returns the `message` property of the Error object.
 */
export const defaultBuildErrorMessage: BuildErrorMessage = async (error) => {
  if (error instanceof ResponseError) {
    return buildResponseErrorMessage(error);
  }

  return error.message;
};
