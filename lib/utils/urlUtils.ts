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
 * Converts an unknown value to a string.
 *
 * @param {unknown} value - The value to be converted to a string.
 * @returns {string} The string representation of the input value.
 */
const toString = (value: unknown): string =>
  typeof value === 'string' ? value : String(value);

/**
 * Converts a JSON object to a URL query string.
 *
 * This function takes a JSON object and transforms it into a URL-encoded query string.
 * It handles nested arrays and skips null or undefined values.
 *
 * @param {Record<string, unknown>} json - The JSON object to be converted.
 * @returns {string} The URL-encoded query string representation of the input JSON object.
 *
 * @example
 * const json = { name: 'John', age: 30, hobbies: ['reading', 'swimming'] };
 * const queryString = jsonToQueryString(json);
 * console.log(queryString); // Output: "name=John&age=30&hobbies=reading&hobbies=swimming"
 */
export const urlEncodeFormData = (data: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v != null) {
            searchParams.append(key, toString(v));
          }
        });
      } else {
        searchParams.append(key, toString(value));
      }
    }
  });

  return searchParams.toString();
};
