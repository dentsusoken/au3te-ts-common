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
 * Represents a function that builds an error message for endpoint API failures.
 *
 * This type defines a function that takes a path and an original error message,
 * and returns a formatted error message string.
 *
 * @typedef {Function} BuildEndpointErrorMessage
 * @param {string} path - The API endpoint path where the error occurred.
 * @param {string} originalMessage - The original error message.
 * @returns {string} A formatted error message string.
 *
 * @example
 * const buildMessage: BuildEndpointErrorMessage = (path, message) =>
 *   `Error at ${path}: ${message}`;
 *
 * const errorMessage = buildMessage('/api/users', 'Not found');
 * console.log(errorMessage); // "Error at /api/users: Not found"
 */
export type BuildEndpointErrorMessage = (
  path: string,
  originalMessage: string
) => string;

/**
 * Default implementation of the BuildEndpointErrorMessage function.
 *
 * @param {string} path - The API endpoint path where the error occurred.
 * @param {string} originalMessage - The original error message.
 * @returns {string} A formatted error message string.
 * @throws {Error} If path or originalMessage is empty.
 */
export const defaultBuildEndpointErrorMessage: BuildEndpointErrorMessage = (
  path,
  originalMessage
) => {
  if (!path || !originalMessage) {
    throw new Error('Path and original message must not be empty');
  }
  return `Endpoint(${path}) API Failure: ${originalMessage}`;
};
