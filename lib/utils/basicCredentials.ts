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

import { decodeBase64 } from 'u8a-utils';

/**
 * Regular expression pattern to match Basic Authentication header format.
 * Matches "Basic" followed by optional spaces, then the base64-encoded credentials.
 */
const CHALLENGE_PATTERN = /^Basic *([^ ]+) *$/i;

/**
 * TextDecoder instance for converting binary data to UTF-8 string.
 * Reused across function calls for better performance.
 */
const decoder = new TextDecoder();

/**
 * Represents parsed Basic Authentication credentials.
 */
type Credentials = {
  /** The extracted user ID. Undefined if invalid or empty. */
  userId: string | undefined;
  /** The extracted password. Undefined if invalid, empty, or not provided. */
  password: string | undefined;
};

/**
 * Default empty credentials object.
 * Used as a fallback when parsing fails or input is invalid.
 */
const emptyCredentials: Credentials = {
  userId: undefined,
  password: undefined,
};

/**
 * Parses Basic Authentication credentials from an HTTP Authorization header.
 *
 * This function extracts the userId and password from a Basic Authentication
 * header value. It handles various edge cases, including empty inputs and
 * malformed credentials.
 *
 * The function expects the input to be in the format "Basic base64EncodedCredentials"
 * where the base64-encoded string contains "user:password" in UTF-8 encoding.
 *
 * @param input - The Authorization header value containing Basic Authentication credentials.
 *                Should be in the format "Basic base64EncodedCredentials".
 *                Can be undefined for invalid or missing headers.
 *
 * @returns An object containing the parsed credentials.
 *          Both userId and password can be undefined if parsing fails.
 *
 * @throws {Error} If there's an error decoding the Base64 credentials.
 *                 The error is caught, logged, and empty credentials are returned.
 *
 * @example
 * // Valid Basic Auth header
 * parseBasicCredentials("Basic dXNlcjpwYXNz");
 * // Returns: { userId: "user", password: "pass" }
 *
 * @example
 * // User without password
 * parseBasicCredentials("Basic dXNlcjo=");
 * // Returns: { userId: "user", password: undefined }
 *
 * @example
 * // Invalid header format
 * parseBasicCredentials("Bearer token");
 * // Returns: { userId: undefined, password: undefined }
 *
 * @example
 * // Empty or undefined input
 * parseBasicCredentials(undefined);
 * // Returns: { userId: undefined, password: undefined }
 *
 * @see {@link https://tools.ietf.org/html/rfc7617|RFC 7617 - The 'Basic' HTTP Authentication Scheme}
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
    const decoded = decoder.decode(decodeBase64(matcher[1]));
    const [userId, ...passwordParts] = decoded.split(':');
    const password = passwordParts.join(':');

    return {
      userId: userId || undefined,
      password: password || undefined,
    };
  } catch (error) {
    console.log('Error decoding Basic Auth credentials:', error);
    return { ...emptyCredentials };
  }
};
