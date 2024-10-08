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

export const buildAuthorizationPageModel = (
  authzRes: AuthorizationResponse,
  user: User
): AuthorizationPageModel => {
  const service = authzRes.service;
  const client = authzRes.client;

  const purpose = authzRes.purpose;
  const verifiedClaimsForIdToken = extractRequestedClaims(
    authzRes.idTokenClaims
  );
  const verifiedClaimsForUserInfo = extractRequestedClaims(
    authzRes.userInfoClaims
  );
  const identityAssuranceRequired =
    purpose !== undefined ||
    verifiedClaimsForIdToken !== undefined ||
    verifiedClaimsForUserInfo !== undefined;
  const authorizationDetailsResult = runCatching(() => {
    if (authzRes.authorizationDetails) {
      return JSON.stringify(authzRes.authorizationDetails);
    }

    return undefined;
  });
  authorizationDetailsResult.onFailure(console.error);
  const authorizationDetails =
    authorizationDetailsResult.getOrDefault(undefined);

  const pageModel: AuthorizationPageModel = {
    serviceName: service?.serviceName,
    clientName: client?.clientName,
    description: client?.description,
    logoUri: client?.logoUri,
    policyUri: client?.policyUri,
    tosUri: client?.tosUri,
    scopes: computeScopes(authzRes.scopes, authzRes.dynamicScopes),
    loginId: authzRes.subject ?? authzRes.loginHint,
    loginIdReadOnly: authzRes.subject ? 'readonly' : undefined,
    authorizationDetails,
    user,
    purpose,
    verifiedClaimsForIdToken,
    verifiedClaimsForUserInfo,
    identityAssuranceRequired,
    claimsForUserInfo: authzRes.claimsAtUserInfo,
  };

  return pageModel;
};
