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
 * Interface for the constructor options of the CommonEndpoint class.
 * @interface
 * @property {BuildErrorMessage} buildErrorMessage - Function to build the original error message.
 * @property {BuildEndpointErrorMessage} buildEndpointErrorMessage - Function to build the endpoint-specific error message.
 * @property {OutputErrorMessage} outputErrorMessage - Function to output the error message.
 */
export interface CommonEndpointConstructorOptions {
  buildErrorMessage: BuildErrorMessage;
  buildEndpointErrorMessage: BuildEndpointErrorMessage;
  outputErrorMessage: OutputErrorMessage;
}

/**
 * Default constructor options for the CommonEndpoint class.
 * @type {CommonEndpointConstructorOptions}
 */
const defaultConstructorOptions: CommonEndpointConstructorOptions = {
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
   * @param {CommonEndpointConstructorOptions} [options=defaultConstructorOptions] - The constructor options.
   */
  constructor(
    path: string,
    options: CommonEndpointConstructorOptions = defaultConstructorOptions
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
   * @param {unknown} e - The error object.
   * @returns {Promise<void>}
   */
  async processError(e: unknown): Promise<void> {
    const originalMessage = await this.buildErrorMessage(e);
    const errorMessage = this.buildEndpointErrorMessage(
      this.path,
      originalMessage
    );
    await this.outputErrorMessage(errorMessage);
  }
}
