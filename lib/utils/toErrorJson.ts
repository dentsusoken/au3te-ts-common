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

import { errorJson } from './errorJson';

/**
 * Converts an error code and message into a JSON error response string.
 *
 * If the error message is already a valid JSON object string, returns it as-is.
 * Otherwise, creates a new error JSON object with the provided code and message.
 *
 * @param errorCode - The error code to include in the response
 * @param errorMessage - The error message or JSON string
 * @returns A JSON string containing the error details
 *
 * @example
 * // With regular string message
 * toErrorJson('invalid_request', 'Missing parameter')
 * // Returns: {"error":"invalid_request","error_description":"Missing parameter"}
 *
 * @example
 * // With JSON object message
 * toErrorJson('error', '{"detail":"Custom error"}')
 * // Returns: {"detail":"Custom error"}
 */
export const toErrorJson = (errorCode: string, errorMessage: string) => {
  try {
    const parsed = JSON.parse(errorMessage);
    if (
      parsed != null &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed)
    ) {
      return errorMessage;
    }
  } catch {
    // If parsing fails, treat as a regular string
  }

  return errorJson(errorCode, errorMessage);
};
