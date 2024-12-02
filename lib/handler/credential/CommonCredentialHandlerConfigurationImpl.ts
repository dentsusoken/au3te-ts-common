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

import { createBuildMdocClaims } from './mdoc/buildMdocClaims';
import { createBuildMdocSubClaims } from './mdoc/buildMdocSubClaims';
import { createContainsRequestedMdocClaims } from './mdoc/containsRequestedMdocClaims';
import { createMdocCheckPermissions } from './mdoc/mdocCheckPermissions';
import { createMdocCollectClaims } from './mdoc/mdocCollectClaims';
import { defaultMdocComputeCredentialDuration } from './mdoc/mdocComputeCredentialDuration';
import { createGetToOrder } from './getToOrder';
import { defaultAddMdocDateClaims } from './mdoc/addMdocDateClaims';
import type { CommonCredentialHandlerConfiguration } from './CommonCredentialHandlerConfiguration';
import { UserHandlerConfiguration } from '../user/UserHandlerConfiguration';
import { createToOrder } from './toOrder';
import { createCreateOrder } from './createOrder';
import { defaultMdocBuildRequestedCredential } from './mdoc/mdocBuildRequestedCredential';

/**
 * Parameter type definition for the constructor of CommonCredentialHandlerConfigurationImpl
 */
export type CommonCredentialHandlerConfigurationImplConstructorParams = {
  /** User handler configuration */
  userHandlerConfiguration: UserHandlerConfiguration;
};

/**
 * Implementation class of CommonCredentialHandlerConfiguration
 * Provides all necessary handlers for mDoc credential operations
 * @implements {CommonCredentialHandlerConfiguration}
 */
export class CommonCredentialHandlerConfigurationImpl
  implements CommonCredentialHandlerConfiguration
{
  /** Function to check if requested mDoc claims are contained */
  containsRequestedMdocClaims;
  /** Function to check permissions for mDoc credentials */
  mdocCheckPermissions;
  /** Function to add date claims to mDoc */
  addMdocDateClaims;
  /** Function to build sub-claims for mDoc */
  buildMdocSubClaims;
  /** Function to build claims for mDoc */
  buildMdocClaims;
  /** Function to build requested credential for mDoc */
  buildRequestedCredential;
  /** Function to collect claims for mDoc */
  mdocCollectClaims;
  /** Function to compute the duration of mDoc credentials */
  mdocComputeCredentialDuration;
  /** Function to create an order for mDoc */
  mdocCreateOrder;
  /** Function to convert to an order for mDoc */
  mdocToOrder;
  /** Function to get ToOrder function based on credential format */
  getToOrder;

  /**
   * Constructor for CommonCredentialHandlerConfigurationImpl
   * @param userHandlerConfiguration - User handler configuration for managing user-related operations
   */
  constructor({
    userHandlerConfiguration,
  }: {
    userHandlerConfiguration: UserHandlerConfiguration;
  }) {
    // Initialization of each property (comments omitted)
    this.containsRequestedMdocClaims = createContainsRequestedMdocClaims(10);

    this.mdocCheckPermissions = createMdocCheckPermissions({
      containsRequestedMdocClaims: this.containsRequestedMdocClaims,
    });

    this.addMdocDateClaims = defaultAddMdocDateClaims;

    this.buildMdocSubClaims = createBuildMdocSubClaims({
      addMdocDateClaims: this.addMdocDateClaims,
    });

    this.buildMdocClaims = createBuildMdocClaims({
      buildMdocSubClaims: this.buildMdocSubClaims,
    });

    this.buildRequestedCredential = defaultMdocBuildRequestedCredential;

    this.mdocCollectClaims = createMdocCollectClaims({
      getMdocClaimsBySubjectAndDoctype:
        userHandlerConfiguration.getMdocClaimsBySubjectAndDoctype,
      buildMdocClaims: this.buildMdocClaims,
    });

    this.mdocComputeCredentialDuration = defaultMdocComputeCredentialDuration;

    this.mdocCreateOrder = createCreateOrder({
      computeCredentialDuration: this.mdocComputeCredentialDuration,
    });

    this.mdocToOrder = createToOrder({
      getBySubject: userHandlerConfiguration.getBySubject,
      checkPermissions: this.mdocCheckPermissions,
      buildRequestedCredential: this.buildRequestedCredential,
      collectClaims: this.mdocCollectClaims,
      createOrder: this.mdocCreateOrder,
    });

    this.getToOrder = createGetToOrder({
      mdocToOrder: this.mdocToOrder,
    });
  }
}
