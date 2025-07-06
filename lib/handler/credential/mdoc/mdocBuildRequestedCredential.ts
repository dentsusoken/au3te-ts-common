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

import { buildRequestedClaims } from '../buildRequestedClaims';
import { CLAIMS } from '../constants';
import {
  BuildRequestedCredential,
  BuildRequestedCredentialParams,
} from '../buildRequestedCredential';

/**
 * Default implementation for building mDoc requested credential
 *
 * @param issuableCredential - The issuable credential containing available claims
 * @param requestedCredential - The requested credential to build
 * @returns The built credential claims
 */
export const defaultMdocBuildRequestedCredential: BuildRequestedCredential = ({
  issuableCredential,
  requestedCredential,
}: BuildRequestedCredentialParams): Record<string, unknown> => {
  // Handle undefined/null cases
  if (!issuableCredential && !requestedCredential) {
    return {};
  }

  if (!issuableCredential) {
    return requestedCredential || {};
  }

  if (!requestedCredential) {
    const credential: Record<string, unknown> = {};
    credential[CLAIMS] = buildRequestedClaims(issuableCredential[CLAIMS]);
    return credential;
  }

  // Handle empty objects
  const issuableClaims = issuableCredential[CLAIMS];
  const requestedClaims = requestedCredential[CLAIMS];

  if (!issuableClaims && !requestedClaims) {
    return {};
  }

  if (!requestedClaims) {
    const credential = { ...requestedCredential };
    credential[CLAIMS] = buildRequestedClaims(issuableClaims);
    return credential;
  }

  return requestedCredential;
};
