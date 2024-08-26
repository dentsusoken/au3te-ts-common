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
 * Represents the possible actions for an introspection response.
 * @typedef {('INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'OK')} Action
 */
type Action =
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'OK';

/**
 * Represents a response for an introspection request.
 */
export class IntrospectionResponse {
  /**
   * Creates an instance of IntrospectionResponse.
   * @param {Action} action - The action of the introspection response.
   * @param {string} [subject] - The subject associated with the token.
   * @param {string} [responseContent] - The optional response content.
   * @param {string} [issuableCredentials] - The issuable credentials associated with the token.
   * @param {string} [dpopNonce] - The DPoP (Demonstration of Proof-of-Possession) nonce associated with the token.
   */
  constructor(
    public action: Action,
    public subject?: string,
    public responseContent?: string,
    public issuableCredentials?: string,
    public dpopNonce?: string
  ) {}
}
