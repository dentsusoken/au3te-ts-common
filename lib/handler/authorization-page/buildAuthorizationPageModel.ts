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
import { runCatching } from '@vecrea/oid4vc-core/utils';
import { AuthorizationPageModel } from '../../schemas/authorization-page/AuthorizationPageModel';
import { ComputeScopes, defaultComputeScopes } from './computeScopes';
import {
  defaultExtractRequestedClaims,
  ExtractRequestedClaims,
} from './extractRequestedClaims';
import { FederationRegistry } from '../../schemas/federation';

/**
 * Builds an AuthorizationPageModel based on the given authorization response and user.
 * @param {AuthorizationResponse} authorizationResponse - The authorization response object.
 * @param {User | undefined} user - The user object, if available.
 * @returns {AuthorizationPageModel} The constructed authorization page model.
 */
export type BuildAuthorizationPageModel = (
  authorizationResponse: AuthorizationResponse,
  user: User | undefined
) => AuthorizationPageModel;

/**
 * Parameters for creating a BuildAuthorizationPageModel function.
 */
type CreateBuildAuthorizationPageModelParams = {
  computeScopes: ComputeScopes;
  extractRequestedClaims: ExtractRequestedClaims;
  federationRegistry?: FederationRegistry;
};

/**
 * Creates a function to build an AuthorizationPageModel.
 * @param {CreateBuildAuthorizationPageModelParams} params - The parameters for creating the function.
 * @returns {BuildAuthorizationPageModel} A function that builds an AuthorizationPageModel.
 */
export const createBuildAuthorizationPageModel =
  ({
    computeScopes,
    extractRequestedClaims,
    federationRegistry,
  }: CreateBuildAuthorizationPageModelParams): BuildAuthorizationPageModel =>
  (authorizationResponse, user) => {
    const service = authorizationResponse.service;
    const client = authorizationResponse.client;

    const purpose = authorizationResponse.purpose;
    const verifiedClaimsForIdToken = extractRequestedClaims(
      authorizationResponse.idTokenClaims ?? undefined
    );
    const verifiedClaimsForUserInfo = extractRequestedClaims(
      authorizationResponse.userInfoClaims ?? undefined
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
        authorizationResponse.scopes ?? undefined,
        authorizationResponse.dynamicScopes ?? undefined
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
      federationRegistry,
    };

    return pageModel;
  };

/**
 * Default implementation of BuildAuthorizationPageModel using default compute scopes and extract requested claims functions.
 */
export const defaultBuildAuthorizationPageModel: BuildAuthorizationPageModel =
  createBuildAuthorizationPageModel({
    computeScopes: defaultComputeScopes,
    extractRequestedClaims: defaultExtractRequestedClaims,
    federationRegistry: undefined,
  });
