/*
 * Copyright (C) 20142024 Authlete, Inc.
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

import { CredentialIssuanceOrder } from '../../schemas/credential/CredentialIssuanceOrder';
import { ComputeCredentialDuration } from './computeCredentialDuration';

/**
 * Function type for creating a credential issuance order from claims data.
 *
 * This function creates a credential issuance order by:
 * 1. Computing the credential duration
 * 2. Converting claims to JSON string
 * 3. Determining if issuance should be deferred
 *
 * @param requestIdentifier - Unique identifier for the credential request
 * @param claims - Object containing the claims to be included in the credential
 *
 * @returns CredentialIssuanceOrder - Contains:
 * - requestIdentifier: The provided request identifier
 * - credentialPayload: JSON string of claims (if available)
 * - issuanceDeferred: True if no claims are provided
 * - credentialDuration: Computed validity period of the credential
 *
 * @since 3.67
 * @since Authlete 3.0
 */
export type CreateOrder = (
  requestIdentifier: string,
  claims: Record<string, unknown>
) => CredentialIssuanceOrder;

type CreateCreateOrderParams = {
  computeCredentialDuration: ComputeCredentialDuration;
};

/**
 * Creates a CreateOrder function with the provided dependencies.
 *
 * @param params - Configuration parameters
 * @param params.computeCredentialDuration - Function to compute credential validity duration
 * @returns CreateOrder function
 */
export const createCreateOrder =
  ({ computeCredentialDuration }: CreateCreateOrderParams): CreateOrder =>
  (requestIdentifier, claims) => {
    const credentialDuration = computeCredentialDuration();
    const credentialPayload = claims ? JSON.stringify(claims) : undefined;
    const issuanceDeferred = credentialPayload == null;
    const order: CredentialIssuanceOrder = {
      requestIdentifier,
      credentialPayload,
      issuanceDeferred,
      credentialDuration,
    };

    return order;
  };
