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

import { BadRequestError } from '../BadRequestError';
import { CheckPermissions } from './checkPermissions';
import { MSO_MDOC } from './constants';
import { containsRequestedClaims } from './containsRequestedClaims';
import { matchDoctype } from './matchDoctype';
import { matchFormat } from './matchFormat';
/**
 * Implements permission checking for mobile document (mdoc) credential issuance.
 * Verifies that the requested credential type and claims are allowed based on the user's permissions.
 *
 * @implements {CheckPermissions}
 * @throws {Error} If the credential type is not supported or requested claims are not permitted
 */
export const mdocCheckPermissions: CheckPermissions = async ({
  issuableCredentials,
  requestedCredential,
}) => {
  // Check if issuableCredentials is null, undefined, or empty array
  if (
    !issuableCredentials ||
    !Array.isArray(issuableCredentials) ||
    issuableCredentials.length === 0
  ) {
    throw new BadRequestError(
      'invalid_credential_request',
      'No credential can be issued with the access token.'
    );
  }

  // Check if any credential matches document type and has permitted claims
  const hasMatchingCredential = issuableCredentials.some(
    (issuableCredential) =>
      matchFormat(issuableCredential, MSO_MDOC) &&
      matchDoctype(issuableCredential, requestedCredential) &&
      containsRequestedClaims(issuableCredential, requestedCredential)
  );

  if (!hasMatchingCredential) {
    throw new BadRequestError(
      'invalid_credential_request',
      'The access token does not have permissions to request the credential.'
    );
  }
};
