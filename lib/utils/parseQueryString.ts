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
 * Parses a URL query string into a key-value object.
 *
 * @param queryString - The query string to parse. Can optionally start with '?'
 * @returns An object containing the parsed query parameters as key-value pairs
 *
 * @example
 * // Returns { foo: 'bar', baz: 'qux' }
 * parseQueryString('?foo=bar&baz=qux')
 *
 * // Also works without leading '?'
 * // Returns { foo: 'bar' }
 * parseQueryString('foo=bar')
 *
 * // Returns empty object for empty string
 * // Returns {}
 * parseQueryString('')
 */
export const parseQueryString = (
  queryString: string
): Record<string, string> => {
  // Remove leading '?' if present
  const normalizedQuery = queryString.startsWith('?')
    ? queryString.slice(1)
    : queryString;

  // Return empty object if query string is empty
  if (!normalizedQuery) {
    return {};
  }

  const searchParams = new URLSearchParams(normalizedQuery);
  return Object.fromEntries(searchParams.entries());
};
