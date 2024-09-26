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
 * Type definition for a function that handles output error messages.
 * @param {string} errorMessage - The error message to be logged.
 * @returns {Promise<void>} A promise that resolves when the error message has been handled.
 */
export type OutputErrorMessage = (errorMessage: string) => Promise<void>;

/**
 * Default function to handle output error messages asynchronously.
 * @param {string} errorMessage - The error message to be logged.
 * @returns {Promise<void>} A promise that resolves when the error message has been logged.
 */
export const defaultOutputErrorMessage: OutputErrorMessage = async (
  errorMessage
) => {
  if (errorMessage) {
    console.error(errorMessage);
  }
};
