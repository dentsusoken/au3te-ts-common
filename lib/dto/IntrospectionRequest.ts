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
 * Represents an introspection request.
 */
export class IntrospectionRequest {
  /**
   * The token to be introspected.
   * @type {string | undefined}
   */
  token?: string;

  /**
   * The scopes associated with the token.
   * @type {string[] | undefined}
   */
  scopes?: string[];

  /**
   * The subject associated with the token.
   * @type {string | undefined}
   */
  subject?: string;

  /**
   * The client certificate associated with the token.
   * @type {string | undefined}
   */
  clientCertificate?: string;

  /**
   * The DPoP (Demonstration of Proof-of-Possession) associated with the token.
   * @type {string | undefined}
   */
  dpop?: string;

  /**
   * The HTM (HTTP Method) associated with the token.
   * @type {string | undefined}
   */
  htm?: string;

  /**
   * The HTU (HTTP URI) associated with the token.
   * @type {string | undefined}
   */
  htu?: string;
}
