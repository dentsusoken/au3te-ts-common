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
 * Represents the possible actions for a token response.
 * @typedef {('INVALID_CLIENT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'PASSWORD' | 'OK' | 'TOKEN_EXCHANGE' | 'JWT_BEARER' | 'ID_TOKEN_REISSUABLE')} Action
 */
type Action =
  | 'INVALID_CLIENT'
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'PASSWORD'
  | 'OK'
  | 'TOKEN_EXCHANGE'
  | 'JWT_BEARER'
  | 'ID_TOKEN_REISSUABLE';

/**
 * Represents a response for a token request.
 */
export class TokenResponse {
  /**
   * Creates an instance of TokenResponse.
   * @param {Action} action - The action of the token response.
   * @param {string} [responseContent] - The optional response content.
   * @param {string} [dpopNonce] - The DPoP (Demonstration of Proof-of-Possession) nonce associated with the token response.
   */
  constructor(
    public action: Action,
    public responseContent?: string,
    public dpopNonce?: string
  ) {}
}
