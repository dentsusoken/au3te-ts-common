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

import { AuthorizationResponse } from '../../schemas/authorization/AuthorizationResponse';
import { User } from '../../schemas/common/User';
import { runCatching } from '../../utils';
import { AuthorizationPageModel } from './AuthorizationPageModel';
import { computeScopes } from './computeScopes';
import { extractRequestedClaims } from './extractRequestedClaims';

/**
 * Builds an AuthorizationPageModel from an AuthorizationResponse and User.
 *
 * This function processes the authorization response, extracts relevant information,
 * and constructs a page model for rendering the authorization page.
 *
 * @param {AuthorizationResponse} authorizationResponse - The response from the authorization server.
 * @param {User} user - The user object associated with the authorization request.
 * @returns {AuthorizationPageModel} A model containing all necessary information for the authorization page.
 */
export const buildAuthorizationPageModel = (
  authorizationResponse: AuthorizationResponse,
  user: User | undefined
): AuthorizationPageModel => {
  const service = authorizationResponse.service;
  const client = authorizationResponse.client;

  const purpose = authorizationResponse.purpose;
  const verifiedClaimsForIdToken = extractRequestedClaims(
    authorizationResponse.idTokenClaims
  );
  const verifiedClaimsForUserInfo = extractRequestedClaims(
    authorizationResponse.userInfoClaims
  );
  const identityAssuranceRequired =
    purpose !== undefined ||
    verifiedClaimsForIdToken !== undefined ||
    verifiedClaimsForUserInfo !== undefined;
  const authorizationDetailsResult = runCatching(() => {
    if (authorizationResponse.authorizationDetails) {
      return JSON.stringify(authorizationResponse.authorizationDetails);
    }

    return undefined;
  });
  authorizationDetailsResult.onFailure(console.error);
  const authorizationDetails =
    authorizationDetailsResult.getOrDefault(undefined);

  const pageModel: AuthorizationPageModel = {
    authorizationResponse,
    serviceName: service?.serviceName,
    clientName: client?.clientName,
    description: client?.description,
    logoUri: client?.logoUri,
    policyUri: client?.policyUri,
    tosUri: client?.tosUri,
    scopes: computeScopes(
      authorizationResponse.scopes,
      authorizationResponse.dynamicScopes
    ),
    loginId: authorizationResponse.subject ?? authorizationResponse.loginHint,
    loginIdReadOnly: authorizationResponse.subject ? 'readonly' : undefined,
    authorizationDetails,
    user,
    purpose,
    verifiedClaimsForIdToken,
    verifiedClaimsForUserInfo,
    identityAssuranceRequired,
    claimsForUserInfo: authorizationResponse.claimsAtUserInfo,
  };

  return pageModel;
};
