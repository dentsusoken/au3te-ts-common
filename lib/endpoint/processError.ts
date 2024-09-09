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

import {
  BuildErrorMessage,
  defaultBuildErrorMessage,
} from './buildErrorMessage';
import {
  BuildEndpointErrorMessage,
  defaultBuildEndpointErrorMessage,
} from './buildEndpointErrorMessage';
import {
  OutputErrorMessage,
  defaultOutputErrorMessage,
} from './outputErrorMessage';
import { runAsyncCatching } from '../utils';

/**
 * Type definition for a function that processes an error and returns a promise that resolves to the error message.
 * @param {Error} error The error to process.
 * @param {string} path The path associated with the error.
 * @returns {Promise<string>} A promise that resolves to the processed error message.
 */
export type ProcessError = (error: Error, path: string) => Promise<string>;

/**
 * Interface for parameters to create a ProcessError function.
 */
export interface CreateProcessErrorParams {
  /**
   * Function to build the error message from the error.
   * @param {Error} error The error to build the message from.
   * @returns {Promise<string>} A promise that resolves to the built error message.
   */
  buildErrorMessage: BuildErrorMessage;

  /**
   * Function to build the endpoint error message from the path and original error message.
   * @param {string} path The path of the endpoint.
   * @param {string} originalMessage The original error message.
   * @returns {string} The built endpoint error message.
   */
  buildEndpointErrorMessage: BuildEndpointErrorMessage;

  /**
   * Function to output the error message.
   * @param {string} errorMessage The error message to output.
   * @returns {Promise<void>} A promise that resolves when the output is complete.
   */
  outputErrorMessage: OutputErrorMessage;
}

/**
 * Creates a ProcessError function based on the provided parameters.
 * @param {CreateProcessErrorParams} params Parameters to create the ProcessError function.
 * @returns {ProcessError} The created ProcessError function.
 */
export const createProcessError =
  ({
    buildErrorMessage,
    buildEndpointErrorMessage,
    outputErrorMessage,
  }: CreateProcessErrorParams): ProcessError =>
  async (e, path) => {
    const errorMessageResult = await runAsyncCatching(async () => {
      const originalMessage = await buildErrorMessage(e);

      return buildEndpointErrorMessage(path, originalMessage);
    });
    const errorMessage = errorMessageResult.getOrDefault(e.message);

    const outputResult = await runAsyncCatching(async () =>
      outputErrorMessage(errorMessage)
    );
    outputResult.onFailure(console.error);

    return errorMessage;
  };

/**
 * Default implementation of the ProcessError function.
 */
export const defaultProcessError: ProcessError = createProcessError({
  buildErrorMessage: defaultBuildErrorMessage,
  buildEndpointErrorMessage: defaultBuildEndpointErrorMessage,
  outputErrorMessage: defaultOutputErrorMessage,
});
