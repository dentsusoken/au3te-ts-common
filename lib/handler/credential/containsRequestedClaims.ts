/*
 * Copyright (C) 2014-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */
/**
 * Checks if the issuable credential contains all the requested claims
 */

import { CLAIMS } from './constants';
import { containsAllProperties } from '../../utils/containsAllProperties';
import { MdocCredential } from './types';

/**
 * Checks if an issuable credential contains all the claims requested in another credential.
 *
 * @param issuableCredential - The credential that can potentially be issued
 * @param requestedCredential - The credential being requested
 * @returns True if the issuable credential contains all requested claims, false otherwise.
 *          Also returns true if no claims are requested, and false if claims are requested
 *          but the issuable credential has no claims.
 */
export const containsRequestedClaims = (
  issuableCredential: MdocCredential,
  requestedCredential: Record<string, unknown> | undefined
): boolean => {
  const issuableClaims = issuableCredential[CLAIMS];
  const requestedClaims = requestedCredential?.[CLAIMS];

  // If no claims are requested, any issuable credential is valid
  if (!requestedClaims) {
    return true;
  }

  // If claims are requested but issuable credential has no claims
  if (!issuableClaims) {
    return false;
  }

  // Check if all requested claims are included in issuable claims
  return containsAllProperties(
    issuableClaims,
    requestedClaims as Record<string, unknown>,
    3,
    1
  );
};
