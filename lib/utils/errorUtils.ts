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
 * Converts an unknown value to a string representation for error messages.
 *
 * @param {unknown} e - The value to convert to an error message.
 * @returns {string} The string representation of the value for error messages.
 *
 * @example
 * getErrorMessage(undefined); // returns 'undefined'
 * getErrorMessage(null); // returns 'null'
 * getErrorMessage('Something went wrong'); // returns 'Something went wrong'
 * getErrorMessage(new Error('An error occurred')); // returns 'An error occurred'
 * getErrorMessage({ code: 'ERR_INVALID_DATA' }); // returns '{"code":"ERR_INVALID_DATA"}'
 */
export const getErrorMessage = (e: unknown): string => {
  if (e === undefined) {
    return 'undefined';
  }

  if (e === null) {
    return 'null';
  }

  if (typeof e === 'string') {
    return e;
  }

  if (e instanceof Error) {
    return e.message;
  }

  return JSON.stringify(e);
};

/**
 * Converts an unknown value to an Error object.
 *
 * @param {unknown} e - The value to convert to an Error object.
 * @returns {Error} An Error object representing the provided value.
 *
 * @example
 * convertToError(new Error('An error occurred')); // returns the same Error object
 * convertToError('Something went wrong'); // returns a new Error object with the message 'Something went wrong'
 * convertToError(404); // returns a new Error object with the message '404'
 * convertToError({ code: 'ERR_INVALID_DATA' }); // returns a new Error object with the message '{"code":"ERR_INVALID_DATA"}'
 */
export const convertToError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }

  return new Error(getErrorMessage(e));
};

export const responseToError = (response: Response): Error => {
  const { status, statusText } = response;
  const message = `Invalid response with status ${status} ${statusText}`;

  return new Error(message);
};
