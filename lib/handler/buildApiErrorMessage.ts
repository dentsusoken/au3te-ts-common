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
 * Represents a function that builds an API error message.
 * @typedef {function} BuildApiErrorMessage
 * @param {string} path - The API path where the error occurred.
 * @param {string} errorMessage - The error message to be included.
 * @returns {string} The formatted API error message.
 */
export type BuildApiErrorMessage = (
  path: string,
  errorMessage: string
) => string;

/**
 * Default implementation of the BuildApiErrorMessage function.
 * @type {BuildApiErrorMessage}
 * @param {string} path - The API path where the error occurred.
 * @param {string} errorMessage - The error message to be included.
 * @returns {string} The formatted API error message.
 * @throws {Error} If the path or errorMessage is empty.
 */
export const defaultBuildApiErrorMessage: BuildApiErrorMessage = (
  path,
  errorMessage
) => {
  if (!path) {
    throw new Error('Path must not be empty');
  }

  if (!errorMessage) {
    throw new Error('Error message must not be empty');
  }

  return `API(${path}) failure: ${errorMessage}`;
};
