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
 * Media types (MIME types) for HTTP content.
 *
 * This object contains constants for commonly used media types in HTTP communications.
 * These types are used in Content-Type headers and for content negotiation.
 *
 * @see https://www.iana.org/assignments/media-types/media-types.xhtml
 */
export const MediaType = {
  /** Media type for JSON data */
  APPLICATION_JSON: 'application/json',
  /** Media type for JSON data with UTF-8 encoding */
  APPLICATION_JSON_UTF8: 'application/json;charset=utf-8',
  /** Media type for URL-encoded form data */
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  /** Media type for HTML content */
  TEXT_HTML: 'text/html',
  /** Media type for plain text content */
  TEXT_PLAIN: 'text/plain',
  /** Media type for plain text content  with UTF-8 encoding */
  TEXT_PLAIN_UTF8: 'text/plain;charset=utf-8',
  /** Media type for XML data */
  APPLICATION_XML: 'application/xml',
  /** Media type for binary data */
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  /** Media type for PDF documents */
  APPLICATION_PDF: 'application/pdf',
  /** Media type for JPEG images */
  IMAGE_JPEG: 'image/jpeg',
  /** Media type for PNG images */
  IMAGE_PNG: 'image/png',
  /** Media type for SVG images */
  IMAGE_SVG: 'image/svg+xml',
  /** Media type for CSS stylesheets */
  TEXT_CSS: 'text/css',
  /** Media type for JavaScript code */
  APPLICATION_JAVASCRIPT: 'application/javascript',
} as const;

/**
 * Type representing all possible media types.
 */
export type MediaType = (typeof MediaType)[keyof typeof MediaType];

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
  isMediaTypeEqual(MediaType.APPLICATION_JSON, type);

/**
 * Checks if the given media type is URL-encoded form data.
 *
 * @param {string | undefined} type - The media type to check.
 * @returns {boolean} True if the type is URL-encoded form data, false otherwise.
 */
export const isFormUrlEncodedType = (type: string | undefined) =>
  isMediaTypeEqual(MediaType.APPLICATION_FORM_URLENCODED, type);
