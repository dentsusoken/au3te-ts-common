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

import { CLAIMS } from '../constants';
import { containsAllProperties } from '../../../utils/containsAllProperties';

/**
 * Function type for checking if an issuable credential contains all requested claims.
 * @param issuableCredential The credential that can be issued.
 * @param requestedCredential The credential requested by the client.
 * @returns True if the issuable credential contains all requested claims, false otherwise.
 */
export type ContainsRequestedMdocClaims = (
  issuableCredential: Record<string, unknown>,
  requestedCredential: Record<string, unknown>
) => boolean;

/**
 * Creates a function to check if an issuable credential contains all requested claims.
 * @param maxRecursionDepth Maximum depth for recursive property checking. Defaults to 3.
 * @returns A function that checks if requested claims are contained in issuable claims.
 */
export const createContainsRequestedMdocClaims =
  (maxRecursionDepth = 3): ContainsRequestedMdocClaims =>
  /**
   * Checks if the issuable credential contains all the requested claims.
   * @param issuableCredential The credential that can be issued.
   * @param requestedCredential The credential requested by the client.
   * @returns True if the issuable credential contains all requested claims, false otherwise.
   */
  (issuableCredential, requestedCredential): boolean => {
    const issuableClaims = issuableCredential?.[CLAIMS] as Record<
      string,
      unknown
    >;
    const requestedClaims = requestedCredential?.[CLAIMS] as Record<
      string,
      unknown
    >;

    if (!issuableClaims) {
      return false;
    }

    if (!requestedClaims) {
      return true;
    }

    // Check if all requested claims are included in issuable claims
    return containsAllProperties(
      issuableClaims,
      requestedClaims,
      maxRecursionDepth,
      1
    );
  };
