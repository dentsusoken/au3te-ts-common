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
 * Extract the access token from form parameters.
 *
 * @param input - The input string formatted in application/x-www-form-urlencoded
 * @returns The extracted access token, or undefined if not found
 */
const extractFromFormParameters = (input: string): string | undefined => {
  try {
    const params = new URLSearchParams(input);
    const token = params.get('access_token');
    return token ?? undefined;
  } catch {
    return undefined;
  }
};

/**
 * Extract the access token embedded in the input string.
 *
 * This method assumes that the input string comes from one of
 * the following three places that are mentioned in "RFC 6750
 * (OAuth 2.0 Bearer Token Usage), 2. Authenticated Requests".
 *
 * 1. Authorization Request Header Field
 * 2. Form-Encoded Body Parameter
 * 3. URI Query Parameter
 *
 * To be concrete, this method assumes that the format of the
 * input string is either of the following two.
 *
 * 1. "Bearer {access-token}"
 * 2. Parameters formatted in application/x-www-form-urlencoded
 *    containing access_token={access-token}.
 *
 * @param input - The input string to be parsed
 * @returns The extracted access token, or undefined if not found
 * @see {@link http://tools.ietf.org/html/rfc6750 RFC 6750 (OAuth 2.0 Bearer Token Usage)}
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
  return extractFromFormParameters(input);
};
