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

import { z } from 'zod';
import { authorizationResponseSchema } from '../authorization';
import { pairSchema } from '../common/Pair';
import { scopeSchema } from '../common/Scope';
import { userSchema } from '../common/User';

/**
 * Schema for authorization page model.
 * This schema defines the structure and types of data which are referred to in an authorization page.
 */
export const authorizationPageModelSchema = z.object({
  /**
   * Represents the response from an authorization server for an authorization request.
   * This type encapsulates the data returned after a client's authorization request
   * in the OAuth 2.0 and OpenID Connect protocols.
   */
  authorizationResponse: authorizationResponseSchema,

  /**
   * The name of the service.
   */
  serviceName: z.string().nullish(),

  /**
   * The name of the client application.
   */
  clientName: z.string().nullish(),

  /**
   * The description of the client application.
   */
  description: z.string().nullish(),

  /**
   * The URL of the logo image of the client application.
   */
  logoUri: z.string().nullish(),

  /**
   * The URL of the homepage of the client application.
   */
  clientUri: z.string().nullish(),

  /**
   * The URL of the policy page of the client application.
   */
  policyUri: z.string().nullish(),

  /**
   * The URL of "Terms of Service" page of the client application.
   */
  tosUri: z.string().nullish(),

  /**
   * Scopes requested by the authorization request.
   */
  scopes: z.array(scopeSchema).nullish(),

  /**
   * The login ID that should be used as the initial value for the
   * login ID field in the authorization page.
   */
  loginId: z.string().nullish(),

  /**
   * This variable holds {@code "readonly"} when the initial value
   * of the login ID should not be changed.
   */
  loginIdReadOnly: z.string().nullish(),

  /**
   * Currently logged in user, could be null if no user is logged in.
   */
  user: userSchema.nullish(),

  /**
   * The content of the {@code authorization_details} request parameter
   * in JSON format. See "OAuth 2.0 Rich Authorization Requests".
   *
   * @since 2.23
   */
  authorizationDetails: z.string().nullish(),

  /**
   * The value of the {@code purpose} request parameter.
   *
   * @since 2.25
   */
  purpose: z.string().nullish(),

  /**
   * Verified claims requested for the ID token.
   *
   * @since 2.26
   */
  verifiedClaimsForIdToken: z.array(pairSchema).nullish(),

  /**
   * Flag indicating whether the authorization request requests
   * all possible verified claims for the ID token.
   *
   * @since 2.26
   */
  allVerifiedClaimsForIdTokenRequested: z.boolean().nullish(),

  /**
   * Verified claims requested for the userinfo.
   *
   * @since 2.26
   */
  verifiedClaimsForUserInfo: z.array(pairSchema).nullish(),

  /**
   * Flag indicating whether the authorization request requests
   * all possible verified claims for the userinfo.
   *
   * @since 2.26
   */
  allVerifiedClaimsForUserInfoRequested: z.boolean().nullish(),

  /**
   * Flag indicating whether behaviors for Identity Assurance are
   * required.
   *
   * @since 2.26
   */
  identityAssuranceRequired: z.boolean().nullish(),

  /**
   * Flag indicating whether this type assumes that the old format of
   * {@code "verified_claims"} is used. "Old" here means the 2nd
   * Implementer's Draft of OpenID Connect for Identity Assurance 1.0.
   *
   * @since 2.42
   */
  oldIdaFormatUsed: z.boolean().nullish(),

  /**
   * Claims that the client application requests to be embedded in
   * the ID token.
   *
   * @since 2.56
   */
  claimsForIdToken: z.array(z.string()).nullish(),

  /**
   * Claims that the client application requests to be embedded in
   * userinfo responses.
   *
   * @since 2.56
   */
  claimsForUserInfo: z.array(z.string()).nullish(),
});

/**
 * Type definition for AuthorizationPageModel.
 * This type is inferred from the authorizationPageModelSchema.
 */
export type AuthorizationPageModel = z.infer<
  typeof authorizationPageModelSchema
>;
