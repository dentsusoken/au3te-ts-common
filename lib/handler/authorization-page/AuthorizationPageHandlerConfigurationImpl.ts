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

import {
  BuildAuthorizationPageModel,
  createBuildAuthorizationPageModel,
} from './buildAuthorizationPageModel';
import { ComputeScopes, defaultComputeScopes } from './computeScopes';
import {
  defaultExtractRequestedClaims,
  ExtractRequestedClaims,
} from './extractRequestedClaims';
import { AuthorizationPageHandlerConfiguration } from './AuthorizationPageHandlerConfiguration';
import { FederationsConfig } from '../../schemas/federation';

/**
 * Parameters for the constructor of AuthorizationPageHandlerConfigurationImpl.
 */
type AuthorizationPageHandlerConfigurationImplConstructorParams = {
  federationsConfig?: FederationsConfig;
};

/**
 * Implementation of the AuthorizationPageHandlerConfiguration interface.
 * This class provides default implementations for handling authorization page configurations.
 */
export class AuthorizationPageHandlerConfigurationImpl
  implements AuthorizationPageHandlerConfiguration
{
  /**
   * Function to compute scopes for the authorization page.
   * Uses the default implementation from computeScopes module.
   */
  computeScopes: ComputeScopes = defaultComputeScopes;

  /**
   * Function to extract requested claims from the authorization request.
   * Uses the default implementation from extractRequestedClaims module.
   */
  extractRequestedClaims: ExtractRequestedClaims =
    defaultExtractRequestedClaims;

  /**
   * Configuration for federations.
   */
  federationsConfig?: FederationsConfig;

  /**
   * Function to build the authorization page model.
   * Created using the default factory function with computeScopes, extractRequestedClaims, and federationsConfig.
   * This is a getter to ensure that changes to federationsConfig are reflected.
   */
  buildAuthorizationPageModel: BuildAuthorizationPageModel;

  /**
   * Constructor for AuthorizationPageHandlerConfigurationImpl.
   * @param federationsConfig - Configuration for federations.
   */
  constructor({
    federationsConfig,
  }: AuthorizationPageHandlerConfigurationImplConstructorParams = {}) {
    this.federationsConfig = federationsConfig;

    this.buildAuthorizationPageModel = createBuildAuthorizationPageModel({
      computeScopes: this.computeScopes,
      extractRequestedClaims: this.extractRequestedClaims,
      federationsConfig: this.federationsConfig,
    });
  }
}
