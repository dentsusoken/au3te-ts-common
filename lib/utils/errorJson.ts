/*
 * Copyright (C) 2024 Dentsusoken, Inc.
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
 * Creates a JSON string representing an error response.
 *
 * @param errorCode - The error code to include in the response
 * @param errorMessage - The error description message
 * @returns A JSON string containing the error code and description
 *
 * @example
 * const json = errorJson('invalid_request', 'Missing required parameter');
 * // Returns: {"error":"invalid_request","error_description":"Missing required parameter"}
 */
export const errorJson = (errorCode: string, errorMessage: string) =>
  JSON.stringify({
    error: errorCode,
    error_description: errorMessage,
  });
