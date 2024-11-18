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
 * Matches "DPoP" followed by one or more non-space characters,
 * case-insensitive.
 */
const CHALLENGE_PATTERN = /^DPoP *([^ ]+) *$/i;

/**
 * Extract the DPoP access token embedded in the input string.
 *
 * This method assumes that the input string comes from the
 * Authorization Request Header Field.
 *
 * @param input - The input string to be parsed.
 * @returns The extracted DPoP access token, or undefined if not found.
 * @since 2.70
 */
export const parseDpopToken = (
  input: string | undefined
): string | undefined => {
  if (!input) {
    return undefined;
  }

  const matcher = input.match(CHALLENGE_PATTERN);

  if (!matcher) {
    return undefined;
  }

  // Return the value as is. Note that it is not Base64-encoded.
  // See https://www.ietf.org/mail-archive/web/oauth/current/msg08489.html
  return matcher[1];
};
