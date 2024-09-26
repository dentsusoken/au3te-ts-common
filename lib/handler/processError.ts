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

import { BuildErrorMessage } from './buildErrorMessage';
import { BuildApiErrorMessage } from './buildApiErrorMessage';
import { OutputErrorMessage } from './outputErrorMessage';
import { runAsyncCatching } from '../utils/result';

/**
 * Parameters for creating a ProcessError function.
 * @typedef {Object} CreateProcessErrorParams
 * @property {BuildErrorMessage} buildErrorMessage - Function to build the initial error message.
 * @property {BuildApiErrorMessage} buildApiErrorMessage - Function to build the error message for API.
 * @property {OutputErrorMessage} outputErrorMessage - Function to output the final error message.
 */
export type CreateProcessErrorParams = {
  buildErrorMessage: BuildErrorMessage;
  buildApiErrorMessage: BuildApiErrorMessage;
  outputErrorMessage: OutputErrorMessage;
};

/**
 * A function that processes an error and returns a promise resolving to an error message.
 * @typedef {Function} ProcessError
 * @param {Error} error - The error to process.
 * @returns {Promise<string>} A promise that resolves to the processed error message.
 */
export type ProcessError = (error: Error) => Promise<string>;

/**
 * Creates a ProcessError function based on the provided parameters.
 *
 * @function createProcessError
 * @param {CreateProcessErrorParams} params - Parameters to create the ProcessError function.
 * @returns {ProcessError} The created ProcessError function.
 *
 * @description
 * This function creates a ProcessError function that handles error processing in the following steps:
 * 1. Builds an initial error message using the provided buildErrorMessage function.
 * 2. Constructs an error message for API using the buildEndpointErrorMessage function.
 * 3. Attempts to output the error message using the outputErrorMessage function.
 * 4. If any step fails, it falls back to using the original error message.
 * 5. Any failure in outputting the error message is logged to the console.
 */
export const createProcessError =
  ({
    buildErrorMessage,
    buildApiErrorMessage,
    outputErrorMessage,
  }: CreateProcessErrorParams): ProcessError =>
  async (e) => {
    const errorMessageResult = await runAsyncCatching(async () => {
      const originalMessage = await buildErrorMessage(e);
      return buildApiErrorMessage(originalMessage);
    });
    const errorMessage = errorMessageResult.getOrDefault(e.message);

    const outputResult = await runAsyncCatching(
      async () => await outputErrorMessage(errorMessage)
    );
    outputResult.onFailure(console.error);

    return errorMessage;
  };
