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

import { CredentialRequestInfo } from './CredentialRequestInfo';

/**
 * Represents the possible actions for a credential single parse response.
 * @typedef {('OK' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR')} Action
 */
type Action =
  | 'OK'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR';

/**
 * Represents a response for a credential single parse request.
 */
export class CredentialSingleParseResponse {
  /**
   * Creates an instance of CredentialSingleParseResponse.
   * @param {Action} action - The action of the credential single parse response.
   * @param {string} [responseContent] - The optional response content.
   * @param {CredentialRequestInfo} [info] - The optional credential request information.
   */
  constructor(
    public action: Action,
    public responseContent?: string,
    public info?: CredentialRequestInfo
  ) {}
}
