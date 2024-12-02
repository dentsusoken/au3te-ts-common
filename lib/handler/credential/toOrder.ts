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

import { CredentialRequestInfo } from '../../schemas/credential/CredentialRequestInfo';
import { CredentialIssuanceOrder } from '../../schemas/credential/CredentialIssuanceOrder';
import { CredentialType } from './types';
import { IntrospectionResponse } from '../../schemas/introspection/IntrospectionResponse';
import { GetBySubject } from '../user/getBySubject';
import { CheckPermissions } from './checkPermissions';
import { CollectClaims } from './collectClaims';
import { BadRequestError } from '../BadRequestError';
import { CreateOrder } from './createOrder';
import { BuildRequestedCredential } from './buildRequestedCredential';

/**
 * Parameters for converting credential request information into a credential issuance order.
 *
 * @property credentialType - The type of credential being requested (e.g., 'single')
 * @property credentialRequestInfo - Contains format, details, and identifier for the request
 * @property introspectionResponse - Contains subject and issuable credentials information
 */
type ToOrderParams = {
  credentialType: CredentialType;
  credentialRequestInfo: CredentialRequestInfo;
  introspectionResponse: IntrospectionResponse;
};

/**
 * Function type for converting credential request information into a credential issuance order.
 *
 * This function processes a credential request and generates a credential issuance order by:
 * 1. Validating the request and subject
 * 2. Retrieving user information
 * 3. Checking permissions
 * 4. Collecting claims
 * 5. Creating the final order
 *
 * @param params - Parameters for credential issuance order creation
 * @returns Promise<CredentialIssuanceOrder> - Contains:
 * - requestIdentifier: The original request identifier
 * - credentialPayload: JSON string of claims
 * - issuanceDeferred: True if claims collection is deferred
 * - credentialDuration: Validity period of the credential
 *
 * @throws {BadRequestError} When:
 * - Subject is missing or invalid
 * - User not found in the system
 * - Insufficient permissions for requested credential
 * - Invalid credential format or type
 */
export type ToOrder = (
  params: ToOrderParams
) => Promise<CredentialIssuanceOrder>;

/**
 * Parameters for creating a ToOrder function.
 *
 * @property getBySubject - Function to retrieve user by subject identifier
 * @property checkPermissions - Function to validate credential issuance permissions
 * @property buildRequestedCredential - Function to build requested credential from issuable credential
 * @property collectClaims - Function to gather and format credential claims
 * @property createOrder - Function to create the final credential issuance order
 */
type CreateToOrderParams = {
  getBySubject: GetBySubject;
  checkPermissions: CheckPermissions;
  buildRequestedCredential: BuildRequestedCredential;
  collectClaims: CollectClaims;
  createOrder: CreateOrder;
};

/**
 * Creates a ToOrder function with the provided dependencies.
 *
 * @param params - Configuration parameters containing required dependencies
 * @returns ToOrder function that processes credential requests
 */
export const createToOrder =
  ({
    getBySubject,
    checkPermissions,
    buildRequestedCredential,
    collectClaims,
    createOrder,
  }: CreateToOrderParams): ToOrder =>
  async ({ credentialType, credentialRequestInfo, introspectionResponse }) => {
    const { subject, issuableCredentials: issuableCredentialsJson } =
      introspectionResponse;
    const { details, identifier: requestIdentifier } = credentialRequestInfo;

    if (!subject) {
      throw new BadRequestError('invalid_request', 'Subject is required');
    }

    const user = await getBySubject(subject);

    if (!user) {
      throw new BadRequestError('invalid_credential_request', 'User not found');
    }

    if (!issuableCredentialsJson) {
      throw new BadRequestError(
        'invalid_credential_request',
        'Issuable credentials are required'
      );
    }

    if (!details) {
      throw new BadRequestError(
        'invalid_credential_request',
        'Requested credential is required'
      );
    }

    const issuableCredentials = JSON.parse(issuableCredentialsJson);
    const requestedCredential = JSON.parse(details);

    const issuableCredential = await checkPermissions({
      credentialType,
      issuableCredentials,
      requestedCredential,
    });
    const claims = await collectClaims({
      credentialType,
      user,
      requestedCredential: buildRequestedCredential({
        issuableCredential,
        requestedCredential,
      }),
    });

    return createOrder(requestIdentifier, claims);
  };
