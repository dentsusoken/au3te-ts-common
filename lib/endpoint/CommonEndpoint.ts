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
  BuildEndpointErrorMessage,
  defaultBuildEndpointErrorMessage,
} from './buildEndpointErrorMessage';
import {
  BuildErrorMessage,
  defaultBuildErrorMessage,
} from './buildErrorMessage';
import {
  defaultOutputErrorMessage,
  OutputErrorMessage,
} from './outputErrorMessage';

/**
 * Interface representing the constructor options for the CommonEndpoint class.
 *
 * @interface
 * @property {BuildErrorMessage} [buildErrorMessage] - Optional function to build the error message.
 * If not provided, the default implementation will be used.
 * @property {BuildEndpointErrorMessage} [buildEndpointErrorMessage] - Optional function to build the endpoint-specific error message.
 * If not provided, the default implementation will be used.
 * @property {OutputErrorMessage} [outputErrorMessage] - Optional function to output the error message.
 * If not provided, the default implementation will be used.
 */
export interface CommonEndpointConstructorOptions {
  buildErrorMessage?: BuildErrorMessage;
  buildEndpointErrorMessage?: BuildEndpointErrorMessage;
  outputErrorMessage?: OutputErrorMessage;
}

/**
 * Default constructor options for the CommonEndpoint class.
 * @type {CommonEndpointConstructorOptions}
 */
export const defaultCommonEndpointConstructorOptions: CommonEndpointConstructorOptions =
  {
    buildErrorMessage: defaultBuildErrorMessage,
    buildEndpointErrorMessage: defaultBuildEndpointErrorMessage,
    outputErrorMessage: defaultOutputErrorMessage,
  };

/**
 * Common endpoint class for handling errors.
 * @class
 */
export class CommonEndpoint {
  /**
   * The path of the endpoint.
   * @type {string}
   * @protected
   */
  protected path: string;

  /**
   * Function to build the original error message.
   * @type {BuildErrorMessage}
   * @protected
   */
  protected buildErrorMessage: BuildErrorMessage;

  /**
   * Function to build the endpoint-specific error message.
   * @type {BuildEndpointErrorMessage}
   * @protected
   */
  protected buildEndpointErrorMessage: BuildEndpointErrorMessage;

  /**
   * Function to output the error message.
   * @type {OutputErrorMessage}
   * @protected
   */
  protected outputErrorMessage: OutputErrorMessage;

  /**
   * Creates an instance of the CommonEndpoint class.
   * @constructor
   * @param {string} path - The path of the endpoint.
   * @param {CommonEndpointConstructorOptions} [options=defaultCommonEndpointConstructorOptions] - The constructor options.
   */
  constructor(
    path: string,
    options: CommonEndpointConstructorOptions = defaultCommonEndpointConstructorOptions
  ) {
    this.path = path;
    this.buildErrorMessage =
      options.buildErrorMessage ?? defaultBuildErrorMessage;
    this.buildEndpointErrorMessage =
      options.buildEndpointErrorMessage ?? defaultBuildEndpointErrorMessage;
    this.outputErrorMessage =
      options.outputErrorMessage ?? defaultOutputErrorMessage;
  }

  /**
   * Processes the error for the endpoint.
   * @async
   * @param {Error} e - The error object.
   * @returns {Promise<string>}
   */
  async processError(e: Error): Promise<string> {
    const originalMessage = await this.buildErrorMessage(e);
    const errorMessage = this.buildEndpointErrorMessage(
      this.path,
      originalMessage
    );
    await this.outputErrorMessage(errorMessage);

    return errorMessage;
  }
}
