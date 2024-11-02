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

import * as base64 from 'base64-ts';

const CHALLENGE_PATTERN = /^Basic *([^ ]+) *$/i;

type Credentials = {
  userId: string | undefined;
  password: string | undefined;
};

const emptyCredentials: Credentials = {
  userId: undefined,
  password: undefined,
};

/**
 * Parses the Basic Authentication credentials from the input string.
 *
 * This function extracts the userId and password from a Basic Authentication
 * header value. It handles various edge cases, including empty inputs and
 * malformed credentials.
 *
 * @param {string | undefined} input - The input string containing the Basic Authentication credentials.
 *                                     It should be in the format "Basic base64EncodedCredentials".
 *
 * @returns {Credentials} An object containing the parsed credentials.
 *                        Both userId and password can be either a string or undefined.
 *
 * @property {string | undefined} userId - The extracted user ID.
 *                                         It's undefined if the input is invalid or the user ID is empty.
 * @property {string | undefined} password - The extracted password.
 *                                           It's undefined if the input is invalid, the password is empty,
 *                                           or no password is provided.
 *
 * @throws {Error} If there's an error decoding the Base64 credentials.
 *                 The error is caught, logged, and empty credentials are returned.
 *
 * @example
 * // Returns { userId: "user", password: "pass" }
 * parseBasicCredentials("Basic dXNlcjpwYXNz");
 *
 * @example
 * // Returns { userId: "user", password: undefined }
 * parseBasicCredentials("Basic dXNlcjo=");
 *
 * @example
 * // Returns { userId: undefined, password: undefined }
 * parseBasicCredentials("Bearer token");
 */
export const parseBasicCredentials = (
  input: string | undefined
): Credentials => {
  if (!input) {
    return { ...emptyCredentials };
  }

  const matcher = input.match(CHALLENGE_PATTERN);

  if (!matcher) {
    return { ...emptyCredentials };
  }

  try {
    const decoded = new TextDecoder('utf-8').decode(base64.decode(matcher[1]));
    const [userId, ...passwordParts] = decoded.split(':');
    const password = passwordParts.join(':');

    return {
      userId: userId || undefined,
      password: password || undefined,
    };
  } catch (error) {
    console.error('Error decoding Basic Auth credentials:', error);
    return { ...emptyCredentials };
  }
};
