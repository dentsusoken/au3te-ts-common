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
 * Decodes a Base64URL encoded string to UTF-8.
 *
 * @param str - The Base64URL encoded string
 * @returns The decoded UTF-8 string
 */
export const base64UrlDecode = (str: string): string => {
  if (str === '') {
    return '';
  }

  // Base64URL to Base64
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Check if the string is a valid Base64
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error(
      'The provided string is not a valid Base64URL encoded string.'
    );
  }

  try {
    // Base64 to UTF-8
    return Buffer.from(base64, 'base64').toString('utf-8');
  } catch (error) {
    throw new Error('Failed to decode the Base64URL string to UTF-8.');
  }
};
