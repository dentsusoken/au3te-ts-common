/*
 * Copyright (C) 2014-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AuthorizationResponse } from '../../schemas/authorization';
import { Pair } from '../../schemas/common/Pair';
import { Scope } from '../../schemas/common/Scope';
import { User } from '../../schemas/common/User';

/**
 * Model to hold data which are referred to in an authorization page.
 */
export type AuthorizationPageModel = {
  /**
   * Represents the response from an authorization server for an authorization request.
   * This type encapsulates the data returned after a client's authorization request
   * in the OAuth 2.0 and OpenID Connect protocols.
   */
  authorizationResponse: AuthorizationResponse;
  /**
   * The name of the service.
   */
  serviceName?: string;

  /**
   * The name of the client application.
   */
  clientName?: string;

  /**
   * The description of the client application.
   */
  description?: string;

  /**
   * The URL of the logo image of the client application.
   */
  logoUri?: string;

  /**
   * The URL of the homepage of the client application.
   */
  clientUri?: string;

  /**
   * The URL of the policy page of the client application.
   */
  policyUri?: string;

  /**
   * The URL of "Terms of Service" page of the client application.
   */
  tosUri?: string;

  /**
   * Scopes requested by the authorization request.
   */
  scopes?: Scope[];

  /**
   * The login ID that should be used as the initial value for the
   * login ID field in the authorization page.
   */
  loginId?: string;

  /**
   * This variable holds {@code "readonly"} when the initial value
   * of the login ID should not be changed.
   */
  loginIdReadOnly?: string;

  /**
   * Currently logged in user, could be null if no user is logged in.
   */
  user?: User;

  /**
   * The content of the {@code authorization_details} request parameter
   * in JSON format. See "OAuth 2.0 Rich Authorization Requests".
   *
   * @since 2.23
   */
  authorizationDetails?: string;

  /**
   * The value of the {@code purpose} request parameter.
   *
   * @since 2.25
   */
  purpose?: string;

  /**
   * Verified claims requested for the ID token.
   *
   * @since 2.26
   */
  verifiedClaimsForIdToken?: Pair[];

  /**
   * Flag indicating whether the authorization request requests
   * all possible verified claims for the ID token.
   *
   * @since 2.26
   */
  allVerifiedClaimsForIdTokenRequested?: boolean;

  /**
   * Verified claims requested for the userinfo.
   *
   * @since 2.26
   */
  verifiedClaimsForUserInfo?: Pair[];

  /**
   * Flag indicating whether the authorization request requests
   * all possible verified claims for the userinfo.
   *
   * @since 2.26
   */
  allVerifiedClaimsForUserInfoRequested?: boolean;

  /**
   * Flag indicating whether behaviors for Identity Assurance are
   * required.
   *
   * @since 2.26
   */
  identityAssuranceRequired?: boolean;

  /**
   * Flag indicating whether this type assumes that the old format of
   * {@code "verified_claims"} is used. "Old" here means the 2nd
   * Implementer's Draft of OpenID Connect for Identity Assurance 1.0.
   *
   * @since 2.42
   */
  oldIdaFormatUsed?: boolean;

  /**
   * Claims that the client application requests to be embedded in
   * the ID token.
   *
   * @since 2.56
   */
  claimsForIdToken?: string[];

  /**
   * Claims that the client application requests to be embedded in
   * userinfo responses.
   *
   * @since 2.56
   */
  claimsForUserInfo?: string[];
};
