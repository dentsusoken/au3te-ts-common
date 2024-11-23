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

/**
 * Regular expression to parse Authorization header.
 * Matches "Bearer" followed by one or more non-space characters,
 * case-insensitive.
 */
const CHALLENGE_PATTERN = /^Bearer *([^ ]+) *$/i;

/**
 * Extracts a Bearer token from an Authorization header according to RFC 6750 specifications.
 *
 * This function parses the input string to extract an OAuth 2.0 Bearer token from
 * the Authorization Request Header Field as defined in RFC 6750 Section 2.1.
 *
 * The expected format is: "Bearer {token}"
 *
 * @param input - The string to parse, typically the Authorization header value
 * @returns The extracted Bearer token if found, undefined otherwise
 * @example
 * // Authorization header
 * parseBearerToken('Bearer abc123') // returns 'abc123'
 * parseBearerToken('bearer ABC123') // returns 'ABC123' (case-insensitive)
 * parseBearerToken('Basic abc123') // returns undefined (wrong scheme)
 *
 * @see {@link https://tools.ietf.org/html/rfc6750#section-2.1 RFC 6750 Section 2.1 - Authorization Request Header Field}
 * @since 2.70
 */
export const parseBearerToken = (
  input: string | undefined
): string | undefined => {
  if (!input) {
    return undefined;
  }

  const matcher = input.match(CHALLENGE_PATTERN);

  if (matcher) {
    // Return the value as is. Note that it is not Base64-encoded.
    // See https://www.ietf.org/mail-archive/web/oauth/current/msg08489.html
    return matcher[1];
  }

  // Assume that the input is formatted in application/x-www-form-urlencoded
  return undefined;
};
