/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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

import { BuildApiErrorMessage } from './buildApiErrorMessage';
import { OutputErrorMessage } from './outputErrorMessage';
import { runAsyncCatching, runCatching } from '@vecrea/oid4vc-core/utils';

export type ProcessError = (path: string, error: Error) => Promise<void>;

/**
 * Parameters for creating a ProcessError function.
 * @typedef {Object} CreateProcessErrorParams
 * @property {BuildApiErrorMessage} buildApiErrorMessage - Function to build the error message for API.
 * @property {OutputErrorMessage} outputErrorMessage - Function to output the final error message.
 */
export type CreateProcessErrorParams = {
  buildApiErrorMessage: BuildApiErrorMessage;
  outputErrorMessage: OutputErrorMessage;
};

export const createProcessError =
  ({
    buildApiErrorMessage,
    outputErrorMessage,
  }: CreateProcessErrorParams): ProcessError =>
  async (path, error) => {
    const errorMessageResult = await runCatching(() => {
      return buildApiErrorMessage(path, error.message);
    });
    const errorMessage = errorMessageResult.getOrDefault(error.message);

    const outputResult = await runAsyncCatching(
      async () => await outputErrorMessage(errorMessage)
    );
    outputResult.onFailure(console.error);
  };
