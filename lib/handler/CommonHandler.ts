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
  BuildApiErrorMessage,
  createBuildApiErrorMessage,
} from './buildApiErrorMessage';
import {
  BuildUnknownActionMessage,
  createBuildUnknownActionMessage,
} from './buildUnknownActionMessage';
import {
  defaultOutputErrorMessage,
  OutputErrorMessage,
} from './outputErrorMessage';
import { ProcessError, createProcessError } from './processError';

/**
 * Options for constructing a CommonHandler instance.
 * @typedef {Object} CommonHandlerConstructorOptions
 * @property {BuildApiErrorMessage} [buildApiErrorMessage] - Function to build API error messages.
 * @property {OutputErrorMessage} [outputErrorMessage] - Function to output error messages.
 * @property {ProcessError} [processError] - Function to process errors.
 * @property {BuildUnknownActionMessage} [buildUnknownActionMessage] - Function to build unknown action messages.
 */
export type CommonHandlerConstructorOptions = {
  buildApiErrorMessage?: BuildApiErrorMessage;
  outputErrorMessage?: OutputErrorMessage;
  processError?: ProcessError;
  buildUnknownActionMessage?: BuildUnknownActionMessage;
};

/**
 * Represents a common handler for API operations.
 */
export class CommonHandler {
  /** @readonly The API path. */
  readonly path: string;
  /** @readonly Function to build API error messages. */
  readonly buildApiErrorMessage: BuildApiErrorMessage;
  /** @readonly Function to output error messages. */
  readonly outputErrorMessage: OutputErrorMessage;
  /** @readonly Function to process errors. */
  readonly processError: ProcessError;
  /** @readonly Function to build unknown action messages. */
  readonly buildUnknownActionMessage: BuildUnknownActionMessage;

  /**
   * Creates an instance of CommonHandler.
   * @param {string} path - The API path.
   * @param {CommonHandlerConstructorOptions} [options={}] - Options for constructing the handler.
   */
  constructor(path: string, options: CommonHandlerConstructorOptions = {}) {
    this.path = path;
    this.buildApiErrorMessage =
      options.buildApiErrorMessage ?? createBuildApiErrorMessage(this.path);
    this.outputErrorMessage =
      options.outputErrorMessage ?? defaultOutputErrorMessage;
    this.processError =
      options.processError ??
      createProcessError({
        buildApiErrorMessage: this.buildApiErrorMessage,
        outputErrorMessage: this.outputErrorMessage,
      });
    this.buildUnknownActionMessage =
      options.buildUnknownActionMessage ??
      createBuildUnknownActionMessage({
        buildApiErrorMessage: this.buildApiErrorMessage,
      });
  }
}
