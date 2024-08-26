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

import { ClientAuthMethod } from '../types/ClientAuthMethod';
import { ApiResponse } from './ApiResponse';

/**
 * Represents the possible actions for a pushed authorization request response.
 * @typedef {('CREATED' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'PAYLOAD_TOO_LARGE' | 'INTERNAL_SERVER_ERROR')} Action
 */
type Action =
  | 'CREATED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'PAYLOAD_TOO_LARGE'
  | 'INTERNAL_SERVER_ERROR';

/**
 * Represents a response for a pushed authorization request.
 * @extends ApiResponse
 */
export class PushedAuthReqResponse extends ApiResponse {
  /**
   * Creates an instance of PushedAuthReqResponse.
   * @param {Action} action - The action of the pushed authorization request response.
   * @param {string} [responseContent] - The optional response content.
   * @param {ClientAuthMethod} [clientAuthMethod] - The client authentication method used.
   * @param {URL} [requestUri] - The request URI.
   * @param {string} [dpopNonce] - The DPoP (Demonstration of Proof-of-Possession) nonce.
   */
  constructor(
    public action: Action,
    public responseContent?: string,
    public clientAuthMethod?: ClientAuthMethod,
    public requestUri?: URL,
    public dpopNonce?: string
  ) {
    super();
  }

  /**
   * Returns a string representation of the PushedAuthReqResponse instance.
   * @returns {string} The string representation of the instance.
   */
  public toString(): string {
    return `action=${this.action}, responseContent=${this.responseContent}, clientAuthMethod=${this.clientAuthMethod}, requestUri=${this.requestUri}`;
  }
}
