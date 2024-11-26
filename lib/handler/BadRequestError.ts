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

import { ErrorJsonError } from './ErrorJsonError';

/**
 * Error class for HTTP 400 Bad Request responses.
 * Extends ErrorJsonError to provide JSON-formatted error messages
 * specifically for bad request scenarios.
 */
export class BadRequestError extends ErrorJsonError {
  /**
   * Creates a new BadRequestError instance.
   *
   * @param errorCode - The OAuth 2.0/OIDC error code (e.g., 'invalid_request')
   * @param errorMessage - The human-readable error description
   */
  constructor(errorCode: string, errorMessage: string) {
    super(errorCode, errorMessage);
    this.name = 'BadRequestError';
  }
}
