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
 * Standard media type for JSON content.
 */
export const APPLICATION_JSON_MEDIA_TYPE = 'application/json';

/**
 * Content type for JSON with UTF-8 encoding.
 */
export const APPLICATION_JSON_UTF8_CONTENT_TYPE = `${APPLICATION_JSON_MEDIA_TYPE};charset=utf-8`;

/**
 * Media type for URL-encoded form data.
 */
export const APPLICATION_FORM_URLENCODED_MEDIA_TYPE =
  'application/x-www-form-urlencoded';

/**
 * Media type for HTML content.
 */
export const TEXT_HTML_MEDIA_TYPE = 'text/html';

/**
 * Media type for plain text content.
 */
export const TEXT_PLAIN_MEDIA_TYPE = 'text/plain';

/**
 * Media type for JWT (JSON Web Token) content.
 */
export const APPLICATION_JWT_MEDIA_TYPE = 'application/jwt';

/**
 * Compares two media types for equality.
 *
 * This function checks if the target media type matches the expected type.
 * It handles cases where the target type might include additional parameters.
 *
 * @param {string} expectedType - The expected media type.
 * @param {string | undefined} targetType - The target media type to compare against.
 * @returns {boolean} True if the types match, false otherwise.
 */
export const isMediaTypeEqual = (
  expectedType: string,
  targetType: string | undefined
): boolean => {
  if (!targetType) {
    return false;
  }

  if (expectedType === targetType) {
    return true;
  }

  const mediaTypeOnly = targetType.split(';')[0];

  return expectedType === mediaTypeOnly;
};

/**
 * Checks if the given media type is JSON.
 *
 * @param {string | undefined} type - The media type to check.
 * @returns {boolean} True if the type is JSON, false otherwise.
 */
export const isJsonType = (type: string | undefined) =>
  isMediaTypeEqual(APPLICATION_JSON_MEDIA_TYPE, type);

/**
 * Checks if the given media type is URL-encoded form data.
 *
 * @param {string | undefined} type - The media type to check.
 * @returns {boolean} True if the type is URL-encoded form data, false otherwise.
 */
export const isFormUrlEncodedType = (type: string | undefined) =>
  isMediaTypeEqual(APPLICATION_FORM_URLENCODED_MEDIA_TYPE, type);
