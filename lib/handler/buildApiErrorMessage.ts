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
 * Represents a function that builds an error message for API failures.
 *
 * This type defines a function that takes a path and an original error message,
 * and returns a formatted error message string.
 *
 * @typedef {Function} BuildEndpointErrorMessage
 * @param {string} originalMessage - The original error message.
 * @returns {string} A formatted API error message string.
 */
export type BuildApiErrorMessage = (originalMessage: string) => string;

/**
 * Creates a function to build API error messages.
 * @param {string} path - The API path.
 * @returns {BuildApiErrorMessage} A function that builds an error message.
 * @throws {Error} If the path is empty.
 */
export const createBuildApiErrorMessage = (
  path: string
): BuildApiErrorMessage => {
  if (!path) {
    throw new Error('Path must not be empty');
  }

  /**
   * Builds an API error message.
   * @param {string} originalMessage - The original error message.
   * @returns {string} The formatted error message.
   * @throws {Error} If the original message is empty.
   */
  return (originalMessage) => {
    if (!originalMessage) {
      throw new Error('Original message must not be empty');
    }
    return `API(${path}) failure: ${originalMessage}`;
  };
};
