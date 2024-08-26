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

import { Prompt } from '../types/Prompt';
import { AuthzDetails } from './AuthzDetails';
import { Client } from './Client';
import { DynamicScope } from './DynamicScope';
import { Scope } from './Scope';
import { Service } from './Service';

/**
 * Represents the possible actions for an authorization response.
 * @typedef {('INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'LOCATION' | 'FORM' | 'NO_INTERACTION' | 'INTERACTION')} Action
 */
type Action =
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'LOCATION'
  | 'FORM'
  | 'NO_INTERACTION'
  | 'INTERACTION';

/**
 * Represents a response for an authorization request.
 */
export class AuthorizationResponse {
  /**
   * The response content.
   * @type {string | undefined}
   */
  responseContent?: string;

  /**
   * The service associated with the authorization response.
   * @type {Service | undefined}
   */
  service?: Service;

  /**
   * The client associated with the authorization response.
   * @type {Client | undefined}
   */
  client?: Client;

  /**
   * The maximum age of the authorization response.
   * @type {number | undefined}
   */
  maxAge?: number;

  /**
   * The scopes associated with the authorization response.
   * @type {Scope[] | undefined}
   */
  scopes?: Scope[];

  /**
   * The dynamic scopes associated with the authorization response.
   * @type {DynamicScope[] | undefined}
   */
  dynamicScopes?: DynamicScope[];

  /**
   * The claims associated with the authorization response.
   * @type {string[] | undefined}
   */
  claims?: string[];

  /**
   * The claims to be included in the user info response.
   * @type {string[] | undefined}
   */
  claimsAtUserInfo?: string[];

  /**
   * The authentication context class references (ACRs) associated with the authorization response.
   * @type {string[] | undefined}
   */
  acrs?: string[];

  /**
   * The subject of the authorization response.
   * @type {string | undefined}
   */
  subject?: string;

  /**
   * The login hint associated with the authorization response.
   * @type {string | undefined}
   */
  loginHint?: string;

  /**
   * The prompts associated with the authorization response.
   * @type {Prompt[] | undefined}
   */
  prompts?: Prompt[];

  /**
   * The ID token claims associated with the authorization response.
   * @type {string | undefined}
   */
  idTokenClaims?: string;

  /**
   * The authorization details associated with the authorization response.
   * @type {AuthzDetails | undefined}
   */
  authorizationDetails?: AuthzDetails;

  /**
   * The purpose of the authorization response.
   * @type {string | undefined}
   */
  purpose?: string;

  /**
   * The user info claims associated with the authorization response.
   * @type {string | undefined}
   */
  userInfoClaims?: string;

  /**
   * The ticket associated with the authorization response.
   * @type {string | undefined}
   */
  ticket?: string;

  /**
   * The claims locales associated with the authorization response.
   * @type {string[] | undefined}
   */
  claimsLocales?: string[];

  /**
   * The requested claims for the transaction.
   * @type {string[] | undefined}
   */
  requestedClaimsForTx?: string[];

  /**
   * The requested verified claims for the transaction.
   * @type {string[] | undefined}
   */
  requestedVerifiedClaimsForTx?: string[];

  /**
   * Creates an instance of AuthorizationResponse.
   * @param {Action} action - The action of the authorization response.
   */
  constructor(public action: Action) {}
}
