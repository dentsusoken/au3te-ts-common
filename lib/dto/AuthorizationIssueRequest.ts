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

import { AuthzDetails } from './AuthzDetails';
import { Property } from './Property';

/**
 * Represents a request for issuing an authorization.
 */
export class AuthorizationIssueRequest {
  /**
   * The ticket associated with the authorization request.
   * @type {string | undefined}
   */
  ticket?: string;

  /**
   * The subject of the authorization request.
   * @type {string | undefined}
   */
  subject?: string;

  /**
   * The subject (alternative property name).
   * @type {string | undefined}
   */
  sub?: string;

  /**
   * The time of the authentication.
   * @type {number | undefined}
   */
  authTime?: number;

  /**
   * The Authentication Context Class Reference (ACR).
   * @type {string | undefined}
   */
  acr?: string;

  /**
   * The claims associated with the authorization request.
   * @type {string | undefined}
   */
  claims?: string;

  /**
   * The properties associated with the authorization request.
   * @type {Property[] | undefined}
   */
  properties?: Property[];

  /**
   * The scopes associated with the authorization request.
   * @type {string[] | undefined}
   */
  scopes?: string[];

  /**
   * The ID token header parameters.
   * @type {string | undefined}
   */
  idtHeaderParams?: string;

  /**
   * The authorization details.
   * @type {AuthzDetails | undefined}
   */
  authorizationDetails?: AuthzDetails;

  /**
   * The consented claims.
   * @type {string[] | undefined}
   */
  consentedClaims?: string[];

  /**
   * The claims for the transaction.
   * @type {string | undefined}
   * @private
   */
  #claimsForTx?: string;

  /**
   * The verified claims for the transaction.
   * @type {string[] | undefined}
   * @private
   */
  #verifiedClaimsForTx?: string[];

  /**
   * The JWT claims.
   * @type {string | undefined}
   */
  jwtAtClaims?: string;

  /**
   * The access token.
   * @type {string | undefined}
   */
  accessToken?: string;

  /**
   * The ID token audience type.
   * @type {string | undefined}
   */
  idTokenAudType?: string;

  /**
   * The duration of the access token.
   * @type {number | undefined}
   */
  accessTokenDuration?: number;

  /**
   * Gets the claims for the transaction.
   * @returns {string | undefined} The claims for the transaction.
   */
  get claimsForTx(): string | undefined {
    return this.#claimsForTx;
  }

  /**
   * Sets the claims for the transaction.
   * @param {string | Record<string, unknown> | undefined} claims - The claims for the transaction.
   */
  set claimsForTx(claims: string | Record<string, unknown> | undefined) {
    if (!claims) {
      this.#claimsForTx = undefined;
    } else if (typeof claims === 'string') {
      this.#claimsForTx = claims;
    } else if (Object.keys(claims).length === 0) {
      this.#claimsForTx = undefined;
    } else {
      this.#claimsForTx = JSON.stringify(claims);
    }
  }

  /**
   * Gets the verified claims for the transaction.
   * @returns {string[] | undefined} The verified claims for the transaction.
   */
  get verifiedClaimsForTx(): string[] | undefined {
    return this.#verifiedClaimsForTx;
  }

  /**
   * Sets the verified claims for the transaction.
   * @param {string[] | Record<string, unknown>[] | undefined} claims - The verified claims for the transaction.
   */
  set verifiedClaimsForTx(
    claims: string[] | Record<string, unknown>[] | undefined
  ) {
    if (!claims) {
      this.#verifiedClaimsForTx = undefined;
    } else if (claims.length == 0) {
      this.#verifiedClaimsForTx = undefined;
    } else if (claims.every((claim) => typeof claim === 'string')) {
      this.#verifiedClaimsForTx = claims as string[];
    } else {
      this.#verifiedClaimsForTx = claims.map((c) => JSON.stringify(c));
    }
  }
}
