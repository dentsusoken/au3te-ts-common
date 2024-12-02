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

import { AddMdocDateClaims } from './mdoc/addMdocDateClaims';
import { BuildMdocClaims } from './mdoc/buildMdocClaims';
import { BuildMdocSubClaims } from './mdoc/buildMdocSubClaims';
import { BuildRequestedCredential } from './buildRequestedCredential';
import { CheckPermissions } from './checkPermissions';
import { CollectClaims } from './collectClaims';
import { ComputeCredentialDuration } from './computeCredentialDuration';
import { ContainsRequestedMdocClaims } from './mdoc/containsRequestedMdocClaims';
import { CreateOrder } from './createOrder';
import { GetToOrder } from './getToOrder';
import { ToOrder } from './toOrder';

export interface CommonCredentialHandlerConfiguration {
  /**
   * ContainsRequestedMdocClaims handler for mDoc credential issuance.
   */
  containsRequestedMdocClaims: ContainsRequestedMdocClaims;

  /**
   * CheckPermissions handler for mDoc credential issuance.
   */
  mdocCheckPermissions: CheckPermissions;

  /**
   * AddMdocDateClaims handler for mDoc credential issuance.
   */
  addMdocDateClaims: AddMdocDateClaims;

  /**
   * BuildMdocSubClaims handler for mDoc credential issuance.
   */
  buildMdocSubClaims: BuildMdocSubClaims;

  /**
   * BuildMdocClaims handler for mDoc credential issuance.
   */
  buildMdocClaims: BuildMdocClaims;

  /**
   * BuildRequestedCredential handler for mDoc credential issuance.
   */
  buildRequestedCredential: BuildRequestedCredential;

  /**
   * CollectClaims handler for mDoc credential issuance.
   */
  mdocCollectClaims: CollectClaims;

  /**
   * ComputeCredentialDuration handler for mDoc credential issuance.
   */
  mdocComputeCredentialDuration: ComputeCredentialDuration;

  /**
   * CreateOrder handler for mDoc credential issuance.
   */
  mdocCreateOrder: CreateOrder;

  /**
   * ToOrder handler for mDoc credential issuance.
   */
  mdocToOrder: ToOrder;

  /**
   * Function that returns a ToOrder handler based on the credential format.
   */
  getToOrder: GetToOrder;
}
