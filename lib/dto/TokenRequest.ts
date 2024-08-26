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

import { Property } from './Property';

/**
 * Represents a token request.
 */
export class TokenRequest {
  /**
   * The parameters of the token request.
   * @type {string | undefined}
   */
  parameters?: string;

  /**
   * The client ID associated with the token request.
   * @type {string | undefined}
   */
  clientId?: string;

  /**
   * The client secret associated with the token request.
   * @type {string | undefined}
   */
  clientSecret?: string;

  /**
   * The client certificate associated with the token request.
   * @type {string | undefined}
   */
  clientCertificate?: string;

  /**
   * The properties associated with the token request.
   * @type {Property[] | undefined}
   */
  properties?: Property[];

  /**
   * The client certificate path associated with the token request.
   * @type {string[] | undefined}
   */
  clientCertificatePath?: string[];

  /**
   * The DPoP (Demonstration of Proof-of-Possession) associated with the token request.
   * @type {string | undefined}
   */
  dpop?: string;

  /**
   * The HTM (HTTP Method) associated with the token request.
   * @type {string | undefined}
   */
  htm?: string;

  /**
   * The HTU (HTTP URI) associated with the token request.
   * @type {string | undefined}
   */
  htu?: string;
}
